import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-white pt-10 pb-8 sm:pt-16 sm:pb-10 md:pt-20 md:pb-12 border-t border-concrete">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 sm:gap-10 md:gap-12">
        
          {/* Kolom 1: Logo & Deskripsi */}
          <div className="sm:col-span-2 md:col-span-4 space-y-3 sm:space-y-4">
            <Link href="/" className="inline-block relative w-32 h-9 sm:w-36 sm:h-10">
              <Image
                src="/img/MGS.png"
                alt="Logo MGS Jaya Abadi"
                fill
                sizes="160px"
                className="object-contain object-left"
              />
            </Link>
            <p className="text-xs sm:text-sm leading-relaxed text-iron/80 max-w-sm">
              Produsen dan distributor snack makanan ringan tradisional. Menghadirkan kerenyahan dan cita rasa bumbu khas nusantara sejak tahun 2002.
            </p>
          </div>

          {/* Kolom 2 & 3: Navigasi & Produk Kami (2 Kolom Berdampingan di Mobile) */}
          <div className="sm:col-span-2 md:col-span-4 grid grid-cols-2 gap-4 sm:gap-8">
            {/* Navigasi */}
            <div>
              <h4 className="font-barlow text-navy text-xs sm:text-sm font-bold uppercase tracking-wider mb-2.5 sm:mb-4">
                Navigasi
              </h4>
              <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-iron font-medium">
                <li><Link href="/produk" className="hover:text-royal transition-colors">Semua Produk</Link></li>
                <li><Link href="/tentang" className="hover:text-royal transition-colors">Tentang Kami</Link></li>
                <li><Link href="/grosir" className="hover:text-royal transition-colors">Kemitraan Grosir</Link></li>
                <li><Link href="/artikel" className="hover:text-royal transition-colors">Artikel & Tips</Link></li>
                <li><Link href="/kontak" className="hover:text-royal transition-colors">Hubungi Kami</Link></li>
              </ul>
            </div>

            {/* Produk Kami */}
            <div>
              <h4 className="font-barlow text-navy text-xs sm:text-sm font-bold uppercase tracking-wider mb-2.5 sm:mb-4">
                Produk Kami
              </h4>
              <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-iron font-medium">
                <li><Link href="/produk/makaroni-pedas" className="hover:text-royal transition-colors">Makaroni Pedas</Link></li>
                <li><Link href="/produk/basreng-pedas" className="hover:text-royal transition-colors">Basreng Pedas</Link></li>
                <li><Link href="/produk/mie-lidi-bumbu" className="hover:text-royal transition-colors">Mie Lidi Bumbu</Link></li>
                <li><Link href="/produk" className="hover:text-royal transition-colors text-royal font-semibold">Lihat Semua →</Link></li>
              </ul>
            </div>
          </div>

          {/* Kolom 4: Kontak & Lokasi */}
          <div className="sm:col-span-2 md:col-span-4 pt-1 sm:pt-0">
            <h4 className="font-barlow text-navy text-xs sm:text-sm font-bold uppercase tracking-wider mb-2.5 sm:mb-4">
              Kontak & Lokasi
            </h4>
            <address className="not-italic text-xs sm:text-sm space-y-2 sm:space-y-2.5 text-iron leading-relaxed">
              <div>
                <strong className="text-navy block font-semibold">Pabrik & Gudang:</strong>
                RT.10/RW.03, Simo, Sumuragung, Kec. Baureno, Bojonegoro, Jawa Timur 62192
              </div>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-4 gap-y-1 pt-0.5">
                <div>
                  <strong className="text-navy font-semibold">WhatsApp: </strong>
                  <a href="https://wa.me/6281333560417" target="_blank" rel="noopener noreferrer" className="hover:text-royal underline">
                    0813-3356-0417
                  </a>
                </div>
                <div>
                  <strong className="text-navy font-semibold">Email: </strong>
                  <a href="mailto:halo@mgs.my.id" className="hover:text-royal">
                    halo@mgs.my.id
                  </a>
                </div>
              </div>
            </address>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Links */}
        <div className="mt-8 sm:mt-12 pt-5 sm:pt-6 border-t border-concrete/70 flex flex-col sm:flex-row justify-between items-center gap-2.5 sm:gap-4 text-[11px] sm:text-xs text-iron/70 text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} MGS Jaya Abadi. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Link href="/kebijakan-privasi" className="hover:text-royal transition-colors">Kebijakan Privasi</Link>
            <span>&middot;</span>
            <Link href="/syarat-ketentuan" className="hover:text-royal transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
