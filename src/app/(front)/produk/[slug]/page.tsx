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

  const imageUrl = product.variants[0]?.imageUrl || "/img/product_snack.png";
  const fullImageUrl = imageUrl.startsWith("http")
    ? imageUrl
    : `/img/product_snack.png`; // Fallback to public folder path for local dynamic URLs or absolute paths if configured

  return {
    title: `${product.name} — MGS Jaya Abadi`,
    description: `Beli ${product.name} langsung dari produsen snack MGS Jaya Abadi. ${product.description}. Dapatkan harga eceran atau grosir termurah.`,
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

  return <ProductDetailClient product={product} />;
}
