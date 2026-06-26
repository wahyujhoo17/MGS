import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 md:pt-24 md:pb-12 border-t border-concrete">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 mb-16">
        
          {/* Kolom 1: Logo & Deskripsi */}
          <div className="space-y-6">
            <Link href="/" className="inline-block relative w-40 h-12">
              <Image src="/img/MGS.png" alt="MGS Logo" fill sizes="(max-width: 768px) 100vw, 200px" className="object-contain object-left" />
            </Link>
            <p className="text-sm leading-relaxed text-iron/80 pr-4">
              Produsen dan distributor snack makanan ringan tradisional. Menghadirkan kualitas pabrik untuk seluruh lapisan masyarakat sejak tahun 2002.
            </p>
          </div>

          {/* Kolom 2: Navigasi */}
          <div>
            <h4 className="font-barlow text-navy text-sm font-bold uppercase tracking-widest mb-6">Navigasi</h4>
            <ul className="space-y-4">
              <li><Link href="/produk" className="hover:text-royal transition-colors">Semua Produk</Link></li>
              <li><Link href="/tentang" className="hover:text-royal transition-colors">Tentang Kami</Link></li>
              <li><Link href="/kontak" className="hover:text-royal transition-colors">Hubungi Kami</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Produk Utama */}
          <div>
            <h4 className="font-barlow text-navy text-sm font-bold uppercase tracking-widest mb-6">Produk Kami</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/produk/makaroni-pedas" className="hover:text-royal transition-colors">Makaroni Pedas</Link></li>
              <li><Link href="/produk/basreng-pedas" className="hover:text-royal transition-colors">Baso Goreng (Basreng)</Link></li>
              <li><Link href="/produk/mie-lidi-bumbu" className="hover:text-royal transition-colors">Mie Lidi Bumbu</Link></li>
              <li><Link href="/produk" className="hover:text-royal transition-colors text-steel">Lihat Semua &rarr;</Link></li>
            </ul>
          </div>

          {/* Kolom 4: Kontak */}
          <div>
            <h4 className="font-barlow text-navy text-sm font-bold uppercase tracking-widest mb-6">Kontak & Lokasi</h4>
            <address className="not-italic text-sm space-y-4 text-iron/80">
              <p>
                <strong className="text-navy block font-semibold mb-1">Pabrik & Gudang</strong>
                Jl. Industri No. 45<br />
                Surabaya, Jawa Timur
              </p>
              <p>
                <strong className="text-navy block font-semibold mb-1">Telepon / WhatsApp</strong>
                0813-3356-0417
              </p>
              <p>
                <strong className="text-navy block font-semibold mb-1">Email</strong>
                halo@mgs.my.id
              </p>
            </address>
          </div>

        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-12 md:mt-20 pt-8 border-t border-concrete flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-iron/60">
        <p>&copy; 2025 MGS Jaya Abadi. All rights reserved.</p>
        {/* <p>Industrial Built.</p> */}
      </div>
    </footer>
  );
}
