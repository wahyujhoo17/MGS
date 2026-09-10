'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { TrustBar } from '@/components/home/TrustBar';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from '@phosphor-icons/react';

export function HeroSection() {
  return (
    <section className="relative min-h-[auto] md:min-h-[90dvh] lg:min-h-[96dvh] bg-offwhite flex flex-col justify-between pt-4 sm:pt-8 lg:pt-14 pb-8 sm:pb-10 lg:pb-12 overflow-hidden">
      {/* Background Image with Ambient Gradient Fade */}
      <div className="absolute inset-0 z-0 flex justify-end pointer-events-none">
        <div className="w-full lg:w-[68%] h-full relative">
          <Image
            src="/img/spicy_production.png"
            alt="Produksi Snack Pedas MGS"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 68vw"
            className="object-cover object-center"
          />
          {/* Mobile protective readability tint */}
          <div className="absolute inset-0 bg-offwhite/85 sm:bg-offwhite/40 lg:bg-transparent" />
          {/* Radial & directional gradient fades for cinematic blend */}
          <div className="absolute inset-0 bg-gradient-to-r from-offwhite via-offwhite/95 lg:via-offwhite/65 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 sm:h-48 bg-gradient-to-t from-offwhite via-offwhite/80 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-20 sm:h-24 bg-gradient-to-b from-offwhite/50 to-transparent" />
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 my-auto pt-4 sm:pt-6 lg:pt-8">
        <div className="max-w-2xl">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-navy/10 shadow-xs mb-4 sm:mb-6">
              <span className="flex h-2 w-2 rounded-full bg-royal animate-pulse" aria-hidden="true" />
              <span className="font-barlow font-bold text-[10px] sm:text-[11px] text-navy uppercase tracking-widest">
                PRODUSEN & GROSIR SNACK
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-[clamp(1.9rem,6.8vw,4.5rem)] leading-[1.05] tracking-tight uppercase mb-4 sm:mb-6 text-navy"
          >
            Produsen Snack Pedas.<br />
            <span className="text-royal">Kualitas Terjaga.<br />
            Rasa Terpercaya.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-iron text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mb-6 sm:mb-8 font-normal"
          >
            MGS Jaya Abadi memproduksi aneka makanan ringan pedas dan gurih dengan standar kebersihan tinggi. Berkomitmen menjaga kerenyahan dan cita rasa bumbu yang khas di setiap kemasan.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4"
          >
            <Link href="/produk" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto justify-center group shadow-md shadow-navy/10 hover:shadow-xl hover:shadow-royal/20 transition-all duration-300 py-3.5 sm:py-4">
                Lihat Produk
                <ArrowRight size={16} weight="bold" className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
            <Link href="/grosir" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto justify-center backdrop-blur-sm bg-white/85 hover:bg-white border-navy/15 text-navy hover:border-navy transition-all duration-200 py-3.5 sm:py-4">
                Info Grosir & Kemitraan
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Integrated Minimalist Modern Trust Dock (Unified with Hero) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12 lg:mt-16">
        <TrustBar />
      </div>
    </section>
  );
}
