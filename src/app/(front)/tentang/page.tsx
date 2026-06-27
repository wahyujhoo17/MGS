import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Tentang Pabrik & Produksi — MGS Jaya Abadi",
  description: "Mengenal lebih dekat pabrik produksi snack tradisional MGS Jaya Abadi. Industri UMKM lokal dengan armada ekspedisi mandiri yang mengutamakan kualitas, kebersihan, dan amanah.",
};

export default function TentangPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20">
        
        {/* Section 1: Hero */}
        <section className="bg-offwhite py-16 md:py-24 lg:py-32 overflow-hidden border-b border-concrete">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="mb-6">
                  <SectionEyebrow label="Tentang MGS Jaya Abadi" />
                </div>
                <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight mb-8 text-navy leading-[1.05]">
                  Pusat Snack Pedas<br />
                  MGS JAYA ABADI
                </h1>
                <p className="text-xl md:text-2xl text-iron leading-relaxed mb-8 max-w-lg">
                  Mengenal lebih dekat fasilitas produksi di balik ribuan bungkus camilan gurih yang didistribusikan setiap harinya ke seluruh Indonesia.
                </p>
              </div>
              <div className="order-1 lg:order-2 relative aspect-[4/3] lg:aspect-square w-full flex items-center justify-center">
                <img src="/img/spicy_factory_hero.png" alt="Pabrik Produksi UMKM MGS" className="w-full h-auto max-h-full object-contain filter drop-shadow-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: UMKM & Pemberdayaan */}
        <section className="bg-white py-16 md:py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
              <div className="relative aspect-[4/3] bg-charcoal w-full overflow-hidden shadow-xl group">
                <img src="/img/team_mgs.jpg" alt="Tim Produksi UMKM MGS" className="w-full h-full object-cover filter sepia-[0.3] hover:sepia-0 transition-all duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none"></div>
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-concrete bg-offwhite mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-royal" aria-hidden="true" />
                  <span className="font-barlow text-[10px] font-bold uppercase tracking-widest text-navy">
                    Penggerak Ekonomi Lokal
                  </span>
                </div>
                <h2 className="font-display font-bold text-4xl md:text-5xl text-navy uppercase leading-[1.1] mb-6 tracking-tight">
                  Kekuatan UMKM.<br />Pemberdayaan Wanita.
                </h2>
                <div className="space-y-6 text-iron leading-relaxed text-lg font-medium">
                  <p>
                    Kunci dari konsistensi kualitas MGS Jaya Abadi tidak hanya terletak pada mesin produksi, tetapi pada dedikasi puluhan ibu-ibu dan wanita hebat di sekitar lingkungan pabrik yang menjadi tulang punggung operasional kami.
                  </p>
                  <p>
                    Sebagai industri UMKM yang terus berkembang, kami berkomitmen untuk membuka lapangan pekerjaan dan memberdayakan komunitas lokal. Setiap bungkus camilan yang Anda nikmati adalah hasil kerja keras tangan-tangan terampil yang berjuang untuk kesejahteraan keluarganya.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2.5: Distribusi & Logistik */}
        <section className="bg-offwhite py-16 md:py-24 lg:py-32 border-t border-concrete">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
               {/* Image Side */}
               <div className="w-full lg:w-1/2 relative">
                  <div className="aspect-[4/3] bg-white w-full overflow-hidden shadow-2xl relative flex items-center justify-center p-8">
                     <img src="/img/truck_delivery.jpg" alt="Armada Logistik MGS" className="w-full h-auto object-contain scale-110" />
                  </div>
                  {/* Floating Stat Card */}
                  <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-white p-6 md:p-8 shadow-xl border border-concrete max-w-[240px]">
                     <div className="font-display font-black text-4xl text-navy uppercase mb-1">Seluruh<br/><span className="text-royal">Jawa</span></div>
                     <p className="text-iron font-barlow text-sm uppercase tracking-widest">Jangkauan Ekspedisi</p>
                  </div>
               </div>
               
               {/* Text Side */}
               <div className="w-full lg:w-1/2 lg:pl-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-royal/20 bg-white shadow-sm mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-royal animate-pulse" aria-hidden="true" />
                    <span className="font-barlow text-[10px] font-bold uppercase tracking-widest text-navy">
                      Jaringan Distribusi
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-4xl md:text-5xl text-navy uppercase leading-[1.1] mb-6 tracking-tight">
                    Distribusi Logistik<br />Tanpa Kendala.
                  </h2>
                  <p className="text-lg text-iron leading-relaxed mb-8 max-w-lg">
                    Kami tidak hanya sekadar memproduksi. MGS Jaya Abadi memiliki fasilitas bongkar muat dan beroperasi secara mandiri dengan <strong>armada ekspedisi milik sendiri</strong>. Kami mengontrol penuh seluruh jalur distribusi pulau Jawa tanpa pihak ketiga, memastikan agen kami menerima produk lebih cepat, lebih aman, dan bebas dari biaya pengiriman yang membengkak.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-concrete">
                     <div>
                       <div className="font-display font-bold text-3xl text-navy mb-1">Efisien</div>
                       <div className="font-barlow text-xs uppercase tracking-widest text-iron">Operasional Terpadu</div>
                     </div>
                     <div>
                       <div className="font-display font-bold text-3xl text-navy mb-1">Aman</div>
                       <div className="font-barlow text-xs uppercase tracking-widest text-iron">Armada Sendiri</div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Section 3: Nilai Perusahaan */}
        <section className="bg-navy py-24 md:py-32 text-white relative overflow-hidden">
          {/* Accent Glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-royal/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 mb-8 backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-royal" aria-hidden="true" />
                  <span className="text-white font-barlow text-[10px] font-bold uppercase tracking-widest">
                    Nilai Perusahaan
                  </span>
                </div>
                <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight leading-[1.05] text-white">
                  Standar Pabrik.<br />
                  <span className="text-royal text-glow">Harga Grosir.</span>
                </h2>
              </div>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-md lg:text-right pb-2">
                Tiga pilar utama yang membuat produk MGS selalu dicari konsumen dan sangat menguntungkan bagi mitra agen kami.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-white/5 backdrop-blur-md p-8 md:p-12 border border-white/10 hover:border-royal/50 hover:bg-white/10 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute -bottom-6 -right-6 font-display font-bold text-[120px] leading-none text-white/5 group-hover:text-royal/10 transition-colors duration-300 pointer-events-none">01</div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl uppercase mb-4 text-white relative z-10">Kualitas</h3>
                  <p className="text-white/70 leading-relaxed text-lg relative z-10">Bahan baku diseleksi ketat. Tidak ada kompromi pada kualitas minyak goreng dan bumbu pedas rahasia kami.</p>
               </div>
               <div className="bg-white/5 backdrop-blur-md p-8 md:p-12 border border-white/10 hover:border-royal/50 hover:bg-white/10 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute -bottom-6 -right-6 font-display font-bold text-[120px] leading-none text-white/5 group-hover:text-royal/10 transition-colors duration-300 pointer-events-none">02</div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl uppercase mb-4 text-white relative z-10">Higienis</h3>
                  <p className="text-white/70 leading-relaxed text-lg relative z-10">Proses produksi dipantau ketat. Memenuhi standar sanitasi yang tinggi untuk industri makanan skala menengah.</p>
               </div>
               <div className="bg-white/5 backdrop-blur-md p-8 md:p-12 border border-white/10 hover:border-royal/50 hover:bg-white/10 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute -bottom-6 -right-6 font-display font-bold text-[120px] leading-none text-white/5 group-hover:text-royal/10 transition-colors duration-300 pointer-events-none">03</div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl uppercase mb-4 text-white relative z-10">Amanah</h3>
                  <p className="text-white/70 leading-relaxed text-lg relative z-10">Ketepatan timbangan, harga pabrik yang jujur, dan prioritas ketersediaan stok untuk para agen dan reseller.</p>
               </div>
            </div>
          </div>
        </section>

        {/* Section 4: Legalitas */}
        <section className="bg-white py-16 md:py-24 text-center border-t border-concrete">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-barlow font-bold text-xs uppercase tracking-[0.2em] mb-12 text-iron">
              LEGALITAS & SERTIFIKASI RESMI
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-80 hover:opacity-100 transition-opacity duration-300">
               <div className="flex flex-col items-center gap-4">
                  <img src="/img/logo_halal.svg" alt="Sertifikat Halal Indonesia" className="h-20 md:h-24 w-auto object-contain" />
                  <span className="font-barlow font-semibold text-[10px] uppercase tracking-widest text-iron">Tersertifikasi Halal</span>
               </div>
               <div className="flex flex-col items-center gap-4">
                  <img src="/img/logo_bkpm.png" alt="NIB OSS BKPM" className="h-16 md:h-20 w-auto object-contain" />
                  <span className="font-barlow font-semibold text-[10px] uppercase tracking-widest text-iron">NIB Terdaftar</span>
               </div>
               <div className="flex flex-col items-center gap-4">
                  <div className="h-16 md:h-20 flex items-center justify-center border-2 border-navy px-6">
                    <span className="font-display font-bold text-2xl text-navy tracking-widest uppercase">P-IRT</span>
                  </div>
                  <span className="font-barlow font-semibold text-[10px] uppercase tracking-widest text-iron">Dinas Kesehatan</span>
               </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
