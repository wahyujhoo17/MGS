import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ProductDetailClient from "./ProductDetailClient";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await prisma.product.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      variants: {
        take: 1,
      },
    },
  });

  if (!product) return {};

  const rawImageUrl = product.variants[0]?.imageUrl || "/img/product_snack.png";
  const imageUrl = rawImageUrl.startsWith("http")
    ? rawImageUrl
    : `https://mgs.my.id${rawImageUrl.startsWith("/") ? "" : "/"}${rawImageUrl}`;

  return {
    title: `${product.name} — MGS Jaya Abadi`,
    description: `Beli ${product.name} langsung dari produsen snack MGS Jaya Abadi. ${product.description}. Dapatkan harga eceran atau grosir termurah.`,
    alternates: {
      canonical: `/produk/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} — MGS Jaya Abadi`,
      description: `Beli ${product.name} langsung dari produsen snack MGS Jaya Abadi. ${product.description}. Dapatkan harga eceran atau grosir termurah.`,
      url: `https://mgs.my.id/produk/${product.slug}`,
      siteName: "MGS Jaya Abadi",
      images: [
        {
          url: imageUrl,
          alt: product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — MGS Jaya Abadi`,
      description: `Beli ${product.name} langsung dari produsen snack MGS Jaya Abadi. ${product.description}. Dapatkan harga eceran atau grosir termurah.`,
      images: [imageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;

  const product = await prisma.product.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      category: true,
      variants: {
        orderBy: {
          priceRetail: "asc",
        },
      },
    },
  });

  if (!product || product.variants.length === 0) {
    notFound();
  }

  const lowestPrice = product.variants[0]?.priceRetail ?? 0;
  const highestPrice = product.variants[product.variants.length - 1]?.priceRetail ?? 0;
  const firstVariantImage = product.variants[0]?.imageUrl;
  const schemaImageUrl = firstVariantImage
    ? (firstVariantImage.startsWith("http") ? firstVariantImage : `https://mgs.my.id${firstVariantImage.startsWith("/") ? "" : "/"}${firstVariantImage}`)
    : "https://mgs.my.id/img/product_snack.png";

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": schemaImageUrl,
    "sku": product.slug,
    "brand": {
      "@type": "Brand",
      "name": "MGS Jaya Abadi"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "IDR",
      "lowPrice": lowestPrice,
      "highPrice": highestPrice,
      "offerCount": product.variants.length,
      "availability": "https://schema.org/InStock",
      "url": `https://mgs.my.id/produk/${product.slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
