import { HeroSection } from '@/components/home/HeroSection';
import { TrustBar } from '@/components/home/TrustBar';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { DualPathCTA } from '@/components/home/DualPathCTA';
import { AboutSnippet } from '@/components/home/AboutSnippet';
import { Testimonials } from '@/components/home/Testimonials';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { buildWALink } from '@/lib/whatsapp';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-16">
        <HeroSection />
        <TrustBar />
        <FeaturedProducts />
        <DualPathCTA />
        <AboutSnippet />
        <Testimonials />
        
        {/* CTA Akhir */}
        <section className="bg-royal py-24 text-white text-center px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-bold text-4xl md:text-5xl uppercase tracking-tight mb-4">
              Siap Bermitra dengan MGS Jaya Abadi?
            </h2>
            <p className="text-steel text-lg mb-10">
              Hubungi kami sekarang dan dapatkan penawaran harga grosir terbaik untuk bisnis Anda.
            </p>
            <a
              href={buildWALink('Halo MGS Jaya Abadi, saya tertarik bermitra.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-royal px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-[4px] hover:bg-offwhite transition-colors"
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
