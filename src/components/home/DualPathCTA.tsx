import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { buildWALink, resellerMessage } from '@/lib/whatsapp';

export function DualPathCTA() {
  return (
    <section className="bg-white border-y border-concrete">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-concrete">
          
          {/* Path 1: Konsumen */}
          <div className="p-6 sm:p-10 md:p-14 lg:p-20 flex flex-col justify-center">
            <h2 className="font-barlow font-semibold text-xs sm:text-sm text-royal uppercase tracking-[0.2em] mb-2 sm:mb-3">
              Untuk Konsumen
            </h2>
            <hr className="border-concrete w-12 sm:w-16 mb-5 sm:mb-8" />
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-10 flex-grow">
              <p className="font-display font-bold text-2xl sm:text-3xl text-navy uppercase leading-tight">
                Beli satuan langsung via WhatsApp.
              </p>
              <ul className="space-y-2.5 sm:space-y-3 font-medium text-iron text-sm sm:text-base">
                <li className="flex items-center gap-3"><span className="text-royal font-bold">✓</span> Pengiriman cepat</li>
                <li className="flex items-center gap-3"><span className="text-royal font-bold">✓</span> Produk fresh produksi baru</li>
                <li className="flex items-center gap-3"><span className="text-royal font-bold">✓</span> Berbagai varian rasa</li>
              </ul>
            </div>
            <Link href="/produk" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto justify-center py-3.5 sm:py-4">Pesan Sekarang</Button>
            </Link>
          </div>

          {/* Path 2: Reseller */}
          <div className="p-6 sm:p-10 md:p-14 lg:p-20 flex flex-col justify-center bg-offwhite/40">
            <h2 className="font-barlow font-semibold text-xs sm:text-sm text-navy uppercase tracking-[0.2em] mb-2 sm:mb-3">
              Untuk Reseller
            </h2>
            <hr className="border-navy w-12 sm:w-16 mb-5 sm:mb-8" />
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-10 flex-grow">
              <p className="font-display font-bold text-2xl sm:text-3xl text-charcoal uppercase leading-tight">
                Harga grosir khusus mitra.
              </p>
              <ul className="space-y-2.5 sm:space-y-3 font-medium text-iron text-sm sm:text-base">
                <li className="flex items-center gap-3"><span className="text-navy font-bold">✓</span> MOQ rendah mulai 1 lusin</li>
                <li className="flex items-center gap-3"><span className="text-navy font-bold">✓</span> Harga pabrik margin lebar</li>
                <li className="flex items-center gap-3"><span className="text-navy font-bold">✓</span> Stok stabil dan prioritas</li>
              </ul>
            </div>
            <a href={buildWALink(resellerMessage())} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button variant="dark" size="lg" className="w-full sm:w-auto justify-center py-3.5 sm:py-4">Daftar Reseller</Button>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
