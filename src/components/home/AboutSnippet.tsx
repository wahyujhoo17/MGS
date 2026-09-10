import Link from 'next/link';
import Image from 'next/image';

export function AboutSnippet() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-24 lg:py-32 text-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-24 items-center">

          <div className="order-1 lg:order-1 space-y-5 sm:space-y-6 md:space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-offwhite border border-iron/20 shadow-xs mb-3 sm:mb-5">
                <div className="w-1.5 h-1.5 rounded-full bg-royal" aria-hidden="true" />
                <span className="text-navy font-barlow text-[10px] font-bold uppercase tracking-widest">
                  Tentang Kami
                </span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-5xl text-navy uppercase leading-[1.08]">
                100% Produksi Sendiri.<br />Terpercaya Sejak 2002.
              </h2>
            </div>

            <div className="space-y-3 sm:space-y-4 text-iron leading-relaxed max-w-lg text-sm sm:text-base md:text-lg">
              <p>
                MGS Jaya Abadi bukan sekadar merk dagang, melainkan fasilitas produksi skala menengah yang mengedepankan kualitas dan konsistensi rasa.
              </p>
              <p>
                Dengan mesin modern dan bahan baku pilihan, kami memastikan setiap bungkus yang sampai ke tangan konsumen, serta setiap karton yang didistribusikan reseller, memenuhi standar kualitas yang sama.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-6 py-5 sm:py-7 border-y border-concrete text-center sm:text-left">
              <div>
                <span className="block text-royal font-bold text-lg sm:text-xl mb-1 sm:mb-2">✓</span>
                <span className="font-barlow font-bold text-[10px] sm:text-xs uppercase tracking-wider text-navy">Pabrik Sendiri</span>
              </div>
              <div>
                <span className="block text-royal font-bold text-lg sm:text-xl mb-1 sm:mb-2">✓</span>
                <span className="font-barlow font-bold text-[10px] sm:text-xs uppercase tracking-wider text-navy">Bahan Pilihan</span>
              </div>
              <div>
                <span className="block text-royal font-bold text-lg sm:text-xl mb-1 sm:mb-2">✓</span>
                <span className="font-barlow font-bold text-[10px] sm:text-xs uppercase tracking-wider text-navy">Higienis</span>
              </div>
            </div>

            <Link
              href="/tentang"
              className="w-full sm:w-auto inline-flex items-center justify-center sm:justify-start py-3 sm:py-0 rounded-xl sm:rounded-none bg-offwhite sm:bg-transparent font-barlow font-bold text-xs sm:text-sm uppercase tracking-widest text-navy hover:text-royal transition-colors"
            >
              Pelajari Lebih Lanjut <span className="ml-2 font-bold text-base sm:text-lg leading-none">→</span>
            </Link>
          </div>

          <div className="order-2 lg:order-2 relative">
             <div className="w-full aspect-[16/10] sm:aspect-[4/3] rounded-2xl border border-concrete/80 shadow-md shadow-navy/5 relative overflow-hidden">
                <Image
                  src="/img/spicy_factory_hero.png"
                  alt="Fasilitas Produksi MGS"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
