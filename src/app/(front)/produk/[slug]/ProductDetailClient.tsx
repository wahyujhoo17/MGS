"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { buildWALink, productOrderMessage } from "@/lib/whatsapp";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Variant {
  id: string;
  size: string;
  taste: string;
  priceRetail: number;
  priceWholesale: number;
  minOrderWholesale: number;
  imageUrl: string | null;
}

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  isSelfProduced: boolean;
  category: {
    name: string;
    slug: string;
  };
  variants: Variant[];
}

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  // Extract unique sizes and tastes
  const uniqueSizes = Array.from(new Set(product.variants.map((v) => v.size)));
  const uniqueTastes = Array.from(new Set(product.variants.map((v) => v.taste)));

  const [selectedSize, setSelectedSize] = useState(uniqueSizes[0]);
  
  // Find tastes available for the selected size to filter options
  const availableTastesForSize = product.variants
    .filter((v) => v.size === selectedSize)
    .map((v) => v.taste);
    
  const [selectedTaste, setSelectedTaste] = useState(
    availableTastesForSize.includes(uniqueTastes[0])
      ? uniqueTastes[0]
      : availableTastesForSize[0]
  );

  // If the taste selection is no longer available in the newly selected size, update it
  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    const available = product.variants
      .filter((v) => v.size === size)
      .map((v) => v.taste);
    if (!available.includes(selectedTaste)) {
      setSelectedTaste(available[0]);
    }
  };

  // Find the exact active variant based on size and taste
  let activeVariant = product.variants.find(
    (v) => v.size === selectedSize && v.taste === selectedTaste
  );

  // Fallback if no exact match
  if (!activeVariant) {
    activeVariant = product.variants.find((v) => v.size === selectedSize) || product.variants[0];
  }

  const retailPrice = activeVariant.priceRetail;
  const wholesalePrice = activeVariant.priceWholesale;
  const minOrder = activeVariant.minOrderWholesale;
  const imageUrl = activeVariant.imageUrl || "/img/product_snack.png";

  // Create a customized WA message specifying variant
  const waMsg = `Halo MGS Jaya Abadi, saya ingin memesan produk:\n\n*${product.name}*\n- Ukuran/Berat: ${selectedSize}\n- Varian/Rasa: ${selectedTaste}\n\nMohon informasi ketersediaan stock dan ongkos kirim. Terima kasih.`;

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-16 bg-white min-h-[100dvh]">
        <div className="border-b border-concrete bg-offwhite py-4 px-6 text-sm">
          <div className="max-w-7xl mx-auto font-medium text-iron">
            <Link href="/produk" className="hover:text-navy">
              Produk
            </Link>{" "}
            /
            <span className="text-navy ml-1 capitalize">
              {product.category.name}
            </span>{" "}
            / <span className="text-navy ml-1">{product.name}</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="aspect-square bg-offwhite border border-concrete p-0 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-white flex items-center justify-center">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover mix-blend-darken"
                  />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <div className="mb-6 flex items-center gap-3">
                <Badge variant="halal">Halal</Badge>
                {product.isSelfProduced && (
                  <span className="text-xs uppercase tracking-wider bg-navy text-white px-2 py-0.5 font-bold rounded-[4px]">
                    Produksi Sendiri
                  </span>
                )}
              </div>

              <h1 className="font-display font-bold text-4xl md:text-5xl text-navy uppercase tracking-tight leading-none mb-4">
                {product.name}
              </h1>

              <p className="text-iron text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Selector Varian (Ukuran/Berat) */}
              <div className="mb-6">
                <h3 className="font-barlow font-bold text-xs text-navy uppercase tracking-widest mb-3">
                  Pilih Ukuran / Berat:
                </h3>
                <div className="flex flex-wrap gap-3">
                  {uniqueSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeChange(size)}
                      className={cn(
                        "px-4 py-2 border text-sm font-semibold tracking-wide rounded-[4px] transition-colors cursor-pointer",
                        selectedSize === size
                          ? "bg-navy border-navy text-white"
                          : "bg-white border-concrete text-navy hover:border-navy"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector Varian (Rasa/Varian) */}
              <div className="mb-8">
                <h3 className="font-barlow font-bold text-xs text-navy uppercase tracking-widest mb-3">
                  Pilih Varian / Rasa:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {uniqueTastes.map((taste) => {
                    const isAvailable = availableTastesForSize.includes(taste);
                    return (
                      <button
                        key={taste}
                        disabled={!isAvailable}
                        onClick={() => setSelectedTaste(taste)}
                        className={cn(
                          "px-3 py-1.5 border text-sm rounded-[4px] font-medium transition-colors cursor-pointer",
                          selectedTaste === taste
                            ? "bg-royal border-royal text-white"
                            : isAvailable
                            ? "bg-offwhite border-concrete text-navy hover:border-royal"
                            : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                        )}
                      >
                        {taste}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tabel Harga */}
              <div className="mb-10 border border-concrete rounded-[4px] overflow-hidden">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-concrete">
                    <tr>
                      <th className="bg-offwhite px-4 py-4 font-semibold text-navy uppercase w-1/3">
                        Eceran
                      </th>
                      <td className="px-4 py-4 font-bold text-royal text-lg">
                        Rp {retailPrice.toLocaleString("id-ID")}
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-offwhite px-4 py-4 font-semibold text-navy uppercase w-1/3">
                        Grosir{" "}
                        <span className="block text-xs font-normal text-iron capitalize normal-case mt-1">
                          (min. {minOrder} pcs)
                        </span>
                      </th>
                      <td className="px-4 py-4 font-bold text-navy text-lg">
                        Rp {wholesalePrice.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto space-y-4">
                <a
                  href={buildWALink(waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button variant="dark" size="full" className="text-base cursor-pointer">
                    Pesan via WhatsApp →
                  </Button>
                </a>
                <Button
                  variant="ghost"
                  size="full"
                  className="border border-concrete text-iron hover:bg-offwhite cursor-pointer"
                >
                  Download Katalog PDF
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
