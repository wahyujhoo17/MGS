import Link from 'next/link';

export function AboutSnippet() {
  return (
    <section className="bg-white py-16 md:py-24 lg:py-32 text-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
          
          <div className="order-2 lg:order-1 space-y-6 md:space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-iron/20 shadow-sm mb-4 md:mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-royal" aria-hidden="true" />
                <span className="text-navy font-barlow text-[10px] font-bold uppercase tracking-widest">
                  Tentang Kami
                </span>
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-navy uppercase leading-[1.1]">
                100% Produksi Sendiri.<br />Terpercaya Sejak 2002.
              </h2>
            </div>

            <div className="space-y-4 text-iron leading-relaxed max-w-lg text-lg">
              <p>
                MGS Jaya Abadi bukan sekadar merk dagang, melainkan fasilitas produksi skala menengah yang mengedepankan kualitas dan konsistensi rasa.
              </p>
              <p>
                Dengan mesin modern dan bahan baku pilihan, kami memastikan setiap bungkus yang sampai ke tangan konsumen, serta setiap karton yang didistribusikan reseller, memenuhi standar kualitas yang sama.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-y border-concrete">
              <div>
                <span className="block text-royal font-bold text-xl mb-2">✓</span>
                <span className="font-barlow font-bold text-xs uppercase tracking-wider text-navy">Pabrik Sendiri</span>
              </div>
              <div>
                <span className="block text-royal font-bold text-xl mb-2">✓</span>
                <span className="font-barlow font-bold text-xs uppercase tracking-wider text-navy">Bahan Pilihan</span>
              </div>
              <div>
                <span className="block text-royal font-bold text-xl mb-2">✓</span>
                <span className="font-barlow font-bold text-xs uppercase tracking-wider text-navy">Higienis</span>
              </div>
            </div>

            <Link 
              href="/tentang" 
              className="inline-flex items-center font-barlow font-bold text-sm uppercase tracking-widest text-navy hover:text-royal transition-colors"
            >
              Pelajari Lebih Lanjut <span className="ml-2 font-bold text-lg leading-none">→</span>
            </Link>
          </div>

          <div className="order-1 lg:order-2 relative">
             <div className="w-full aspect-[4/3] bg-charcoal relative overflow-hidden">
                <img src="/img/umkm_factory.png" alt="Fasilitas Produksi MGS" className="w-full h-full object-cover opacity-90" />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
