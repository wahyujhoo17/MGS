import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { buildWALink, productOrderMessage } from '@/lib/whatsapp';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetail({ params }: Props) {
  const resolvedParams = await params;
  const product = products.find(p => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-16 bg-white min-h-[100dvh]">
        
        <div className="border-b border-concrete bg-offwhite py-4 px-6 text-sm">
           <div className="max-w-7xl mx-auto font-medium text-iron">
             <Link href="/produk" className="hover:text-navy">Produk</Link> / 
             <span className="text-navy ml-1 capitalize">{product.category.replace('-', ' ')}</span> / 
             <span className="text-navy ml-1">{product.name}</span>
           </div>
        </div>

        <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Kiri: Gallery */}
            <div className="space-y-4">
              <div className="aspect-square bg-offwhite border border-concrete p-0 flex items-center justify-center overflow-hidden">
                 <div className="w-full h-full bg-white flex items-center justify-center">
                    <img src="/img/product_snack.png" alt={product.name} className="w-full h-full object-cover mix-blend-darken" />
                 </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="aspect-square bg-offwhite border border-concrete p-2 flex items-center justify-center cursor-pointer hover:border-royal transition-colors">
                     <span className="font-mono text-concrete uppercase text-[10px]">Thumb {i}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Kanan: Info */}
            <div className="flex flex-col">
              <div className="mb-6 flex items-center gap-3">
                <Badge variant="halal">Halal</Badge>
              </div>

              <h1 className="font-display font-bold text-4xl md:text-5xl text-navy uppercase tracking-tight leading-none mb-4">
                {product.name}
              </h1>
              
              <p className="text-iron text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="mb-8">
                <h3 className="font-barlow font-bold text-xs text-navy uppercase tracking-widest mb-3">
                  Varian Tersedia:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map(variant => (
                    <span key={variant} className="border border-concrete text-navy px-3 py-1.5 text-sm rounded-[4px] font-medium bg-offwhite">
                      {variant}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tabel Harga */}
              <div className="mb-10 border border-concrete rounded-[4px] overflow-hidden">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-concrete">
                    <tr>
                      <th className="bg-offwhite px-4 py-4 font-semibold text-navy uppercase w-1/3">Eceran</th>
                      <td className="px-4 py-4 font-bold text-royal text-lg">Rp {product.priceRetail.toLocaleString('id-ID')}</td>
                    </tr>
                    <tr>
                      <th className="bg-offwhite px-4 py-4 font-semibold text-navy uppercase w-1/3">
                        Grosir <span className="block text-xs font-normal text-iron capitalize normal-case mt-1">(min. {product.minOrderWholesale} pcs)</span>
                      </th>
                      <td className="px-4 py-4 font-bold text-navy text-lg">Rp {product.priceWholesale.toLocaleString('id-ID')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-auto space-y-4">
                <a
                  href={buildWALink(productOrderMessage(product.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button variant="dark" size="full" className="text-base">
                    Pesan via WhatsApp →
                  </Button>
                </a>
                <Button variant="ghost" size="full" className="border border-concrete text-iron hover:bg-offwhite">
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
