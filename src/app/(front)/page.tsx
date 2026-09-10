import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { DualPathCTA } from '@/components/home/DualPathCTA';
import { AboutSnippet } from '@/components/home/AboutSnippet';
import { Testimonials } from '@/components/home/Testimonials';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { buildWALink } from '@/lib/whatsapp';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-16 sm:pt-20">
        <HeroSection />
        <FeaturedProducts />
        <DualPathCTA />
        <AboutSnippet />
        <Testimonials />
        
        {/* CTA Akhir */}
        <section className="relative overflow-hidden bg-royal py-14 sm:py-20 md:py-24 text-white text-center px-4 sm:px-6">
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-navy/30 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-5xl uppercase tracking-tight mb-3 sm:mb-4 text-white leading-tight">
              Siap Bermitra dengan MGS Jaya Abadi?
            </h2>
            <p className="text-white/85 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-xl mx-auto font-normal leading-relaxed">
              Hubungi kami sekarang dan dapatkan penawaran harga grosir terbaik untuk bisnis Anda.
            </p>
            <a
              href={buildWALink('Halo MGS Jaya Abadi, saya tertarik bermitra.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-royal px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full hover:bg-offwhite hover:shadow-lg transition-all"
            >
              Hubungi via WhatsApp →
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
