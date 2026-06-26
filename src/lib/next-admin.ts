import { NextAdminOptions } from "@premieroctet/next-admin";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import sharp from "sharp";
import React from "react";
import CategorySelect from "@/components/admin/CategorySelect";
import VariantManager from "@/components/admin/VariantManager";
import prisma from "@/lib/prisma";

// A request-scoped WeakMap to pass parsed variants from beforeDb to afterDb hooks safely
const pendingVariants = new WeakMap<any, any[]>();

const s3Client = new S3Client({
  region: process.env.S3_REGION,
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || "",
    secretAccessKey: process.env.S3_SECRET_KEY || "",
  },
  forcePathStyle: true, // Typically required for MinIO/custom S3
});

// Helper function to delete an image URL from S3
async function deleteS3Image(url: string | null | undefined) {
  if (!url) return;
  const publicUrl = process.env.S3_PUBLIC_URL || "";
  let key: string | null = null;
  if (url.startsWith(publicUrl)) {
    key = url.replace(publicUrl, "").replace(/^\/+/, "");
  } else {
    try {
      const parsed = new URL(url);
      key = decodeURIComponent(parsed.pathname.replace(/^\/+/, ""));
    } catch (e) {
      // Not a valid URL
    }
  }

  if (key) {
    try {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: process.env.S3_BUCKET,
          Key: key,
        })
      );
      console.log(`Deleted S3 object: ${key}`);
    } catch (err) {
      console.error(`Failed to delete S3 object: ${key}`, err);
    }
  }
}

export const options: NextAdminOptions = {
  title: "MGS Admin Panel",
  externalLinks: [
    {
      label: "Keluar (Logout)",
      url: "/admin/logout",
    },
  ],
  model: {
    Product: {
      title: "Produk",
      toString: (product: any) => product.name,
      middlewares: {
        delete: async (product: any) => {
          // Fetch all variants of the product
          const variants = await prisma.productVariant.findMany({
            where: { productId: product.id }
          });
          // Delete all variant images from S3
          for (const variant of variants) {
            if (variant.imageUrl) {
              await deleteS3Image(variant.imageUrl);
            }
          }
          return true;
        }
      },
      aliases: {
        id: "ID",
        name: "Nama Produk",
        slug: "Slug",
        description: "Deskripsi",
        isSelfProduced: "Produksi Sendiri",
        category: "Kategori",
        categoryId: "Kategori",
        variants: "Varian Produk"
      },
      list: {
        display: ["name", "category"],
      },
      edit: {
        display: ["slug", "name", "description", "isSelfProduced", "category", "variants"],
        hooks: {
          beforeDb: async (data, mode, request) => {

            const variantsStr = (data as any).variants;
            if (typeof variantsStr === "string") {
              try {
                const parsed = JSON.parse(variantsStr);
                pendingVariants.set(request, parsed);
              } catch (e) {
                console.error("Failed to parse variants JSON in beforeDb:", e);
              }
            }
            delete (data as any).variants;
            return data;
          },
          afterDb: async (response, mode, request) => {
            const variants = pendingVariants.get(request);
            const productId = response.createdId || response.data?.id;

            if (productId) {
              // Fetch old variants to compare with new ones
              const oldVariants = await prisma.productVariant.findMany({
                where: { productId }
              });

              // Track new image URLs
              const newImageUrls = new Set(
                (variants || [])
                  .map((v: any) => v.imageUrl)
                  .filter(Boolean)
              );

              // Delete old images that are no longer in use
              for (const oldVariant of oldVariants) {
                if (oldVariant.imageUrl && !newImageUrls.has(oldVariant.imageUrl)) {
                  await deleteS3Image(oldVariant.imageUrl);
                }
              }

              // Delete existing variants and insert new ones
              await prisma.productVariant.deleteMany({
                where: { productId }
              });

              if (variants && variants.length > 0) {
                await prisma.productVariant.createMany({
                  data: variants.map((v: any) => ({
                    productId,
                    size: v.size,
                    taste: v.taste,
                    priceRetail: Number(v.priceRetail),
                    priceWholesale: Number(v.priceWholesale),
                    minOrderWholesale: Number(v.minOrderWholesale),
                    imageUrl: v.imageUrl,
                  }))
                });
              }
            }
            return response;
          }
        },
        fields: {},
        customFields: {
          category: {
            input: React.createElement(CategorySelect),
          },
          variants: {
            input: React.createElement(VariantManager),
          },
        },
      },
    },
    ProductVariant: {
      title: "Varian Produk",
      toString: (variant: any) => `${variant.size} - ${variant.taste} (Rp ${variant.priceRetail.toLocaleString()})`,
      middlewares: {
        delete: async (variant: any) => {
          if (variant.imageUrl) {
            await deleteS3Image(variant.imageUrl);
          }
          return true;
        }
      },
      aliases: {
        id: "ID",
        product: "Produk",
        size: "Ukuran/Berat",
        taste: "Rasa/Varian",
        priceRetail: "Harga Retail",
        priceWholesale: "Harga Grosir",
        minOrderWholesale: "Min. Order Grosir",
        imageUrl: "Gambar Varian"
      },
      list: {
        display: ["product", "size", "taste", "priceRetail", "priceWholesale"],
      },
      edit: {
        fields: {
          imageUrl: {
            format: "file",
            handler: {
              upload: async (buffer, infos) => {
                // Compress and convert the uploaded image to WebP with sharp
                const compressedBuffer = await sharp(buffer)
                  .resize({ width: 1000, withoutEnlargement: true }) // limit max width to 1000px
                  .webp({ quality: 80 }) // convert to WebP format, 80% quality
                  .toBuffer();

                const fileName = `variants/${crypto.randomUUID()}.webp`;
                
                await s3Client.send(
                  new PutObjectCommand({
                    Bucket: process.env.S3_BUCKET,
                    Key: fileName,
                    Body: compressedBuffer,
                    ContentType: "image/webp",
                  })
                );
                
                return `${process.env.S3_PUBLIC_URL}/${fileName}`;
              }
            }
          }
        }
      }
    },
    Category: {
      title: "Kategori",
      toString: (category: any) => category.name,
      list: {
        display: ["name", "slug"],
      }
    }
  }
};
