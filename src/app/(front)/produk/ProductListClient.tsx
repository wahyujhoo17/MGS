"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface MappedProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  isSelfProduced: boolean;
  category: string;
  sizes: string[];
  tastes: string[];
  minPrice: number;
  maxPrice: number;
  minPriceWholesale: number;
  imageUrl: string;
  variantsCount: number;
}

interface Props {
  initialProducts: MappedProduct[];
}

export default function ProductListClient({ initialProducts }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChip, setActiveChip] = useState<string>("Semua");

  const filteredProducts = initialProducts.filter((p) => {
    if (
      searchQuery &&
      !p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    if (activeChip !== "Semua" && p.category !== activeChip.toLowerCase())
      return false;
    return true;
  });

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-16">
        {/* Page Header */}
        <section className="bg-offwhite pt-16 pb-24 text-navy relative border-b border-concrete">
          <div className="max-w-7xl mx-auto px-6">
            <SectionEyebrow label="Katalog Lengkap" />
            <h1 className="font-display font-bold text-5xl md:text-6xl uppercase tracking-tight mb-4">
              Katalog Produk Kami
            </h1>
            <p className="text-iron max-w-xl text-lg">
              Dari makaroni pedas hingga basreng gurih. Temukan berbagai pilihan makanan ringan untuk konsumsi pribadi atau grosir toko Anda.
            </p>
          </div>
        </section>

        <div className="bg-offwhite min-h-[50vh] pb-24">
          {/* Filter Bar (Sticky) */}
          <div className="sticky top-20 z-30 bg-white border-b border-concrete py-3 shadow-sm">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-2">
                {/* Search Input */}
                <div className="w-full md:w-1/3">
                  <input
                    type="text"
                    placeholder="Cari produk..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-concrete bg-offwhite px-4 py-2 text-sm focus:outline-none focus:border-royal focus:ring-1 focus:ring-royal transition-all rounded-[4px] text-navy"
                  />
                </div>

                {/* Chips Jenis */}
                <div className="flex overflow-x-auto gap-3 hide-scrollbar pb-1">
                  {["Semua", "Makaroni", "Basreng", "Mie-Lidi", "Keripik", "Lainnya"].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => setActiveChip(chip)}
                      className={cn(
                        "px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-[4px] whitespace-nowrap transition-colors border cursor-pointer",
                        activeChip === chip
                          ? "bg-royal border-royal text-white"
                          : "bg-transparent border-concrete text-iron hover:border-iron"
                      )}
                    >
                      {chip.replace("-", " ")}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white border border-concrete rounded-[8px] overflow-hidden hover:border-royal hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] bg-offwhite flex items-center justify-center border-b border-concrete overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-display font-bold text-xl text-navy uppercase tracking-wide mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-iron text-sm mb-4 line-clamp-1">
                      {product.variantsCount} Varian | {product.sizes.join(", ")}
                    </p>
                    <hr className="mb-4" />
                    <div className="mb-6">
                      <div className="text-royal font-semibold text-lg">
                        {product.minPrice === product.maxPrice
                          ? `Rp ${product.minPrice.toLocaleString("id-ID")}`
                          : `Rp ${product.minPrice.toLocaleString("id-ID")} - Rp ${product.maxPrice.toLocaleString("id-ID")}`
                        }
                        <span className="text-sm text-iron font-normal"> / pcs</span>
                      </div>
                      <div className="text-iron text-sm">
                        Mulai Rp {product.minPriceWholesale.toLocaleString("id-ID")} (grosir)
                      </div>
                    </div>
                    <Link href={`/produk/${product.slug}`} className="mt-auto">
                      <Button variant="dark" size="full">
                        Lihat Detail →
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-24 text-center">
                <p className="text-iron font-medium">
                  Tidak ada produk yang cocok dengan pencarian Anda.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveChip("Semua");
                  }}
                  className="mt-4 text-royal font-bold uppercase underline cursor-pointer"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
