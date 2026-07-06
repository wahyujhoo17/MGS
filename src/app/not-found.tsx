import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="front-layout flex flex-col min-h-[100dvh] bg-offwhite">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-24 px-6">
        <div className="max-w-md w-full bg-white border border-concrete p-8 md:p-12 text-center shadow-sm">
          <span className="font-display font-black text-7xl md:text-8xl text-navy tracking-tighter block mb-4">
            404
          </span>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-navy uppercase tracking-tight mb-4">
            Pesan Tidak Dapat Diproses
          </h1>
          <p className="text-iron/80 text-sm md:text-base mb-8 leading-relaxed">
            Halaman yang Anda cari tidak tersedia, sedang dalam pemeliharaan, atau telah dipindahkan ke alamat lain.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/" className="w-full">
              <Button variant="dark" size="full" className="cursor-pointer">
                Kembali ke Beranda
              </Button>
            </Link>
            <Link href="/produk" className="w-full">
              <Button variant="ghost" size="full" className="border border-concrete text-iron hover:bg-offwhite cursor-pointer">
                Lihat Katalog Produk
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
