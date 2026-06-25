import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { products } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';

export function FeaturedProducts() {
  const featured = products.slice(0, 4); // Ambil 4 produk pertama

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
          {featured.map((product) => (
            <div
              key={product.id}
              className="group bg-white border border-concrete rounded-[8px] overflow-hidden hover:border-royal hover:shadow-lg hover:shadow-navy/5 transition-all duration-300 flex flex-col"
            >
              {/* Product Image Area */}
              <div className="relative aspect-[4/3] bg-offwhite flex items-center justify-center border-b border-concrete overflow-hidden">
                <div className="relative w-full h-full">
                  <img src="/img/product_snack.png" alt={product.name} className="w-full h-full object-cover opacity-90 mix-blend-darken hover:scale-105 transition-transform duration-500" />
                </div>
              </div>

              {/* Content Area */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-display font-bold text-xl text-navy uppercase tracking-wide mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-iron text-sm mb-4 line-clamp-1">
                  {product.variants.join(' · ')} | {product.weight}
                </p>

                <hr className="mb-4" />

                <div className="mb-6">
                  <div className="text-royal font-semibold text-lg">
                    Rp {product.priceRetail.toLocaleString('id-ID')} <span className="text-sm text-iron font-normal">/ pcs</span>
                  </div>
                  <div className="text-iron text-sm">
                    Rp {product.priceWholesale.toLocaleString('id-ID')} (grosir)
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
        
        <div className="mt-12 flex justify-center">
          <Link href="/produk">
             <Button variant="secondary" className="border-navy text-navy hover:bg-navy hover:text-white">
               Lihat Semua Produk
             </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
