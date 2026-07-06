'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-offwhite p-6">
      <div className="max-w-md w-full bg-white border border-concrete p-8 md:p-12 text-center shadow-sm">
        <span className="font-display font-black text-6xl text-danger tracking-tighter block mb-4">
          SYSTEM ERROR
        </span>
        <h1 className="font-display font-bold text-2xl md:text-3xl text-navy uppercase tracking-tight mb-4">
          Terjadi Kesalahan
        </h1>
        <p className="text-iron/80 text-sm md:text-base mb-8 leading-relaxed">
          Sistem gagal memproses permintaan Anda. Hal ini kemungkinan disebabkan oleh gangguan koneksi atau database.
        </p>
        <div className="flex flex-col gap-3">
          <Button variant="dark" size="full" onClick={() => reset()} className="cursor-pointer">
            Coba Lagi
          </Button>
          <Link href="/" className="w-full">
            <Button variant="ghost" size="full" className="border border-concrete text-iron hover:bg-offwhite cursor-pointer">
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
