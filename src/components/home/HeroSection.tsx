'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-[85dvh] lg:min-h-[95dvh] bg-offwhite flex items-center pt-32 pb-16 lg:pt-20 lg:pb-0 overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0 flex justify-end">
        <div className="w-full lg:w-[70%] h-full relative">
           <img src="/img/spicy_production.png" alt="Produksi Snack Pedas MGS" className="w-full h-full object-cover" />
           {/* Fade from left to right */}
           <div className="absolute inset-0 bg-gradient-to-r from-offwhite via-offwhite/90 lg:via-offwhite/50 to-transparent" />
           {/* Fade from bottom */}
           <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-offwhite to-transparent" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-iron/20 shadow-sm mb-6 md:mb-8">
              <span className="flex h-2 w-2 rounded-full bg-royal" aria-hidden="true" />
              <span className="font-barlow font-bold text-[10px] text-navy uppercase tracking-widest">
                PRODUSEN & GROSIR SNACK
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight uppercase mb-6 md:mb-8 text-navy"
          >
            Pabrik Snack Pedas.<br />
            <span className="text-royal">Kualitas Konsisten.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-iron text-base md:text-lg lg:text-xl leading-relaxed max-w-lg mb-8 md:mb-10"
          >
            MGS Jaya Abadi memproduksi aneka makanan ringan pedas dan gurih dengan standar kebersihan tinggi. Berkomitmen menjaga kerenyahan dan cita rasa bumbu yang khas di setiap kemasan untuk kepuasan pelanggan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-3 sm:gap-4"
          >
            <Link href="/produk">
              <Button variant="primary" size="lg">Lihat Produk</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
