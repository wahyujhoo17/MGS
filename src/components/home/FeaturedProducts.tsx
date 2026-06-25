import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import prisma from "@/lib/prisma";
import Link from "next/link";

export async function FeaturedProducts() {
  const featured = await prisma.product.findMany({
    take: 4,
    include: {
      category: true,
      variants: {
        orderBy: {
          priceRetail: "asc",
        },
      },
    },
  });

  return (
    <section className="bg-offwhite py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <SectionEyebrow label="Katalog Kami" />
          <h2 className="font-display font-bold text-4xl md:text-5xl text-navy uppercase tracking-tight">
            Produk Pilihan
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => {
            const sizes = Array.from(new Set(product.variants.map((v) => v.size)));
            const retailPrices = product.variants.map((v) => v.priceRetail);
            const minPrice = retailPrices.length ? Math.min(...retailPrices) : 0;
            const maxPrice = retailPrices.length ? Math.max(...retailPrices) : 0;
            
            const wholesalePrices = product.variants.map((v) => v.priceWholesale);
            const minPriceWholesale = wholesalePrices.length ? Math.min(...wholesalePrices) : 0;
            
            const imageUrl = product.variants[0]?.imageUrl || "/img/product_snack.png";

            return (
              <div
                key={product.id}
                className="group bg-white border border-concrete rounded-[8px] overflow-hidden hover:border-royal hover:shadow-lg hover:shadow-navy/5 transition-all duration-300 flex flex-col"
              >
                {/* Product Image Area */}
                <div className="relative aspect-[4/3] bg-offwhite flex items-center justify-center border-b border-concrete overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content Area */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-display font-bold text-xl text-navy uppercase tracking-wide mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-iron text-sm mb-4 line-clamp-1">
                    {product.variants.length} Varian | {sizes.join(" · ")}
                  </p>

                  <hr className="mb-4" />

                  <div className="mb-6">
                    <div className="text-royal font-semibold text-lg">
                      {minPrice === maxPrice
                        ? `Rp ${minPrice.toLocaleString("id-ID")}`
                        : `Rp ${minPrice.toLocaleString("id-ID")} - Rp ${maxPrice.toLocaleString("id-ID")}`
                      }
                      <span className="text-sm text-iron font-normal"> / pcs</span>
                    </div>
                    <div className="text-iron text-sm">
                      Mulai Rp {minPriceWholesale.toLocaleString("id-ID")} (grosir)
                    </div>
                  </div>

                  <Link href={`/produk/${product.slug}`} className="mt-auto">
                    <Button variant="dark" size="full">
                      Lihat Detail →
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/produk">
            <Button
              variant="secondary"
              className="border-navy text-navy hover:bg-navy hover:text-white cursor-pointer"
            >
              Lihat Semua Produk
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
