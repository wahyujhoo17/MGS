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
  });

  if (!product) return {};

  return {
    title: `${product.name} — MGS Jaya Abadi`,
    description: `Beli ${product.name} langsung dari produsen snack MGS Jaya Abadi. ${product.description}. Dapatkan harga eceran atau grosir termurah.`,
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
