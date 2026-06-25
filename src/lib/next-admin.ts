import { NextAdminOptions } from "@premieroctet/next-admin";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";

const s3Client = new S3Client({
  region: process.env.S3_REGION,
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || "",
    secretAccessKey: process.env.S3_SECRET_KEY || "",
  },
  forcePathStyle: true, // Typically required for MinIO/custom S3
});

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
      aliases: {
        id: "ID",
        name: "Nama Produk",
        slug: "Slug",
        description: "Deskripsi",
        priceRetail: "Harga Retail",
        priceWholesale: "Harga Grosir",
        minOrderWholesale: "Min. Order Grosir",
        isSelfProduced: "Produksi Sendiri",
        category: "Kategori",
        imageUrl: "Gambar Produk"
      },
      list: {
        display: ["name", "priceRetail", "priceWholesale", "category"],
      },
      edit: {
        fields: {
          imageUrl: {
            format: "file",
            handler: {
              upload: async (buffer, infos) => {
                const extension = infos.name.split(".").pop();
                const fileName = `products/${crypto.randomUUID()}.${extension}`;
                
                await s3Client.send(
                  new PutObjectCommand({
                    Bucket: process.env.S3_BUCKET,
                    Key: fileName,
                    Body: buffer,
                    ContentType: infos.type || undefined,
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
