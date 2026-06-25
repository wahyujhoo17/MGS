import prisma from "@/lib/prisma";
import ProductListClient from "./ProductListClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Katalog Snack Tradisional — MGS Jaya Abadi",
  description: "Temukan katalog lengkap produk snack tradisional kami: makaroni pedas daun jeruk, basreng nendang, mie lidi, keripik pedas. Melayani grosir dan eceran.",
};

export const dynamic = "force-dynamic";

export default async function ProdukPage() {
  const dbProducts = await prisma.product.findMany({
    include: {
      category: true,
      variants: {
        orderBy: {
          priceRetail: "asc",
        },
      },
    },
  });

  const mappedProducts = dbProducts.map((p) => {
    // Unique list of sizes and tastes
    const sizes = Array.from(new Set(p.variants.map((v) => v.size)));
    const tastes = Array.from(new Set(p.variants.map((v) => v.taste)));

    // Min and Max prices for display
    const pricesRetail = p.variants.map((v) => v.priceRetail);
    const minPrice = pricesRetail.length ? Math.min(...pricesRetail) : 0;
    const maxPrice = pricesRetail.length ? Math.max(...pricesRetail) : 0;

    const pricesWholesale = p.variants.map((v) => v.priceWholesale);
    const minPriceWholesale = pricesWholesale.length ? Math.min(...pricesWholesale) : 0;

    // Use the first variant image as product image or fallback
    const imageUrl = p.variants[0]?.imageUrl || "/img/product_snack.png";

    return {
      id: p.id,
      slug: p.slug,
      name: p.name,
      description: p.description,
      isSelfProduced: p.isSelfProduced,
      category: p.category.slug,
      sizes,
      tastes,
      minPrice,
      maxPrice,
      minPriceWholesale,
      imageUrl,
      variantsCount: p.variants.length,
    };
  });

  return <ProductListClient initialProducts={mappedProducts} />;
}
