import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

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
    <section className="bg-offwhite py-14 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-12">
          <SectionEyebrow label="Katalog Kami" />
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-5xl text-navy uppercase tracking-tight">
            Produk Pilihan
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
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
                className="group bg-white border border-concrete rounded-xl overflow-hidden hover:border-royal hover:shadow-lg hover:shadow-navy/5 transition-all duration-300 flex flex-col"
              >
                {/* Product Image Area */}
                <div className="relative aspect-[4/3] bg-offwhite flex items-center justify-center border-b border-concrete overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content Area */}
                <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-grow">
                  <h3 className="font-display font-bold text-sm sm:text-base md:text-xl text-navy uppercase tracking-wide mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-iron text-[11px] sm:text-xs md:text-sm mb-2 sm:mb-3 md:mb-4 line-clamp-1">
                    {product.variants.length} Varian | {sizes.join(" · ")}
                  </p>

                  <hr className="mb-2.5 sm:mb-3 md:mb-4 border-concrete" />

                  <div className="mb-3 sm:mb-4 md:mb-6">
                    <div className="text-royal font-bold text-xs sm:text-sm md:text-base lg:text-lg leading-snug">
                      {minPrice === maxPrice
                        ? `Rp ${minPrice.toLocaleString("id-ID")}`
                        : `Rp ${minPrice.toLocaleString("id-ID")} - ${maxPrice.toLocaleString("id-ID")}`
                      }
                      <span className="text-[10px] sm:text-xs text-iron font-normal"> / pcs</span>
                    </div>
                    <div className="text-iron text-[10px] sm:text-xs md:text-sm mt-0.5">
                      Mulai Rp {minPriceWholesale.toLocaleString("id-ID")} (grosir)
                    </div>
                  </div>

                  <Link href={`/produk/${product.slug}`} className="mt-auto">
                    <Button variant="dark" size="sm" className="w-full text-xs sm:text-sm py-1.5 sm:py-2">
                      Lihat Detail
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 sm:mt-12 flex justify-center">
          <Link href="/produk" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              className="w-full sm:w-auto border-navy text-navy hover:bg-navy hover:text-white cursor-pointer justify-center"
            >
              Lihat Semua Produk
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
