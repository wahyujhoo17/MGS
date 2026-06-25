import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { buildWALink, resellerMessage } from '@/lib/whatsapp';

export function DualPathCTA() {
  return (
    <section className="bg-white border-y border-concrete">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-concrete">
          
          {/* Path 1: Konsumen */}
          <div className="p-12 md:p-16 lg:p-24 flex flex-col justify-center">
            <h2 className="font-barlow font-semibold text-sm text-royal uppercase tracking-[0.2em] mb-4">
              Untuk Konsumen
            </h2>
            <hr className="border-concrete w-16 mb-8" />
            <div className="space-y-6 mb-10 flex-grow">
              <p className="font-display font-bold text-3xl text-navy uppercase leading-tight">
                Beli satuan langsung via WhatsApp.
              </p>
              <ul className="space-y-3 font-medium text-iron">
                <li className="flex items-center gap-3"><span className="text-royal">✓</span> Pengiriman cepat</li>
                <li className="flex items-center gap-3"><span className="text-royal">✓</span> Produk fresh produksi baru</li>
                <li className="flex items-center gap-3"><span className="text-royal">✓</span> Berbagai varian rasa</li>
              </ul>
            </div>
            <Link href="/produk">
              <Button variant="primary" size="lg">Pesan Sekarang</Button>
            </Link>
          </div>

          {/* Path 2: Reseller */}
          <div className="p-12 md:p-16 lg:p-24 flex flex-col justify-center bg-offwhite/30">
            <h2 className="font-barlow font-semibold text-sm text-navy uppercase tracking-[0.2em] mb-4">
              Untuk Reseller
            </h2>
            <hr className="border-navy w-16 mb-8" />
            <div className="space-y-6 mb-10 flex-grow">
              <p className="font-display font-bold text-3xl text-charcoal uppercase leading-tight">
                Harga grosir khusus mitra.
              </p>
              <ul className="space-y-3 font-medium text-iron">
                <li className="flex items-center gap-3"><span className="text-navy">✓</span> MOQ rendah mulai 1 lusin</li>
                <li className="flex items-center gap-3"><span className="text-navy">✓</span> Harga pabrik margin lebar</li>
                <li className="flex items-center gap-3"><span className="text-navy">✓</span> Stok stabil dan prioritas</li>
              </ul>
            </div>
            <a href={buildWALink(resellerMessage())} target="_blank" rel="noopener noreferrer">
              <Button variant="dark" size="lg">Daftar Reseller</Button>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
