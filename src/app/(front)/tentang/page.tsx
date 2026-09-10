import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { buildWALink } from '@/lib/whatsapp';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  CalendarBlank,
  Package,
  UsersThree,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Plant,
  Scales,
  Sparkle,
} from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: "Tentang Pabrik & Produksi — MGS Jaya Abadi",
  description: "Mengenal fasilitas produksi dan armada logistik MGS Jaya Abadi di Bojonegoro. Dua dekade memproduksi aneka snack pedas dan gurih tradisional berkualitas tinggi.",
  alternates: {
    canonical: "/tentang",
  },
};

export default function TentangPage() {
  const stats = [
    {
      value: '2002',
      label: 'Tahun Berdiri',
      icon: CalendarBlank,
    },
    {
      value: '50+',
      label: 'Varian Produk',
      icon: Package,
    },
    {
      value: '500+',
      label: 'Reseller Aktif',
      icon: UsersThree,
    },
    {
      value: '100%',
      label: 'Halal & BPOM',
      icon: ShieldCheck,
    },
  ];

  const milestones = [
    {
      year: '2002',
      title: 'Awal Perintisan',
      desc: 'Dimulai dari racikan bumbu pedas daun jeruk rumahan di Desa Sumuragung, Bojonegoro.',
    },
    {
      year: '2012',
      title: 'Perluasan Fasilitas',
      desc: 'Peningkatan kapasitas mesin penggorengan skala pabrik untuk melayani pesanan distributor Jawa Timur.',
    },
    {
      year: '2020',
      title: 'Sertifikasi Resmi',
      desc: 'Penerbitan izin edar P-IRT dan Sertifikat Halal resmi Kemenag serta penetapan standar sanitasi ketat.',
    },
    {
      year: 'Sekarang',
      title: 'Armada & 50+ Varian',
      desc: 'Mengoperasikan armada ekspedisi truk sendiri dan menyuplai 500+ agen reseller di berbagai kota.',
    },
  ];

  const pillars = [
    {
      num: '01',
      title: 'Bahan Baku Pilihan',
      desc: 'Minyak goreng bermerek yang rutin diganti, cabai segar asli, dan rempah pilihan tanpa pengawet berbahaya.',
      icon: Plant,
    },
    {
      num: '02',
      title: 'Higienitas Terpadu',
      desc: 'Karyawan ber-APD sanitasi, ruang produksi teratur, dan sterilisasi alat sebelum & sesudah batch.',
      icon: ShieldCheck,
    },
    {
      num: '03',
      title: 'Timbangan Amanah',
      desc: 'Akurasi gramatur digital presisi dengan transparansi harga pabrik yang adil untuk para mitra.',
      icon: Scales,
    },
    {
      num: '04',
      title: 'Cita Rasa Otentik',
      desc: 'Perpaduan bumbu rempah daun jeruk gurih pedas yang meresap rata dengan kerenyahan snack tahan lama.',
      icon: Sparkle,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-16 selection:bg-steel/30">

        {/* =========================================================================
            SECTION 1: HERO (Prestigious Typographic — Mobile Optimized)
            ========================================================================= */}
        <section className="relative bg-navy text-white pt-16 pb-12 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24 overflow-hidden border-b border-white/10">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-royal/40 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-steel/15 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
            
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white mb-5 sm:mb-8">
              <span className="w-2 h-2 rounded-full bg-signal animate-pulse shrink-0" />
              <span className="font-barlow font-bold text-[10px] sm:text-xs uppercase tracking-widest text-steel">
                PRODUSEN & PABRIK SNACK · SEJAK 2002
              </span>
            </div>

            {/* Bold Display Headline */}
            <h1 className="font-display font-extrabold text-[clamp(2rem,6.2vw,4.8rem)] leading-[1.06] tracking-tight uppercase mb-5 sm:mb-8 text-white">
              Dedikasi Dua Dekade Menjaga Kualitas Snack Nusantara.
            </h1>

            {/* Subtext Paragraph */}
            <p className="text-concrete text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-12 font-normal">
              MGS Jaya Abadi adalah produsen makanan ringan tradisional berbasis di Bojonegoro, Jawa Timur. Kami memadukan resep bumbu pedas otentik dengan disiplin kebersihan pabrik modern, melayani pasokan grosir bagi ratusan mitra di seluruh Indonesia.
            </p>

            {/* Integrated Metrics Dock (Crisp 2x2 grid on mobile, horizontal on desktop) */}
            <div className="p-1 sm:p-2 rounded-2xl md:rounded-full bg-white/10 backdrop-blur-xl border border-white/15 shadow-xl max-w-4xl mx-auto">
              <div className="rounded-xl md:rounded-full bg-navy/85 border border-white/10 px-3 py-2.5 sm:px-6 sm:py-4 md:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-0 md:divide-x md:divide-white/15">
                  {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-start md:justify-center gap-2 sm:gap-3 p-1.5 sm:p-2"
                      >
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-steel/15 text-steel flex items-center justify-center shrink-0 border border-steel/20">
                          <Icon size={16} weight="bold" />
                        </div>
                        <div className="text-left min-w-0">
                          <div className="font-display font-extrabold text-base sm:text-xl md:text-2xl text-white tracking-tight leading-none mb-0.5 truncate">
                            {stat.value}
                          </div>
                          <div className="font-barlow font-bold text-[9px] sm:text-[10px] md:text-[11px] text-concrete uppercase tracking-wider leading-none truncate">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* =========================================================================
            SECTION 2: CERITA KAMI & RACIKAN KHAS (With Horizontal Milestones on Mobile)
            ========================================================================= */}
        <section className="py-12 sm:py-20 md:py-28 bg-white border-b border-concrete">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 lg:gap-16 items-center">
              
              {/* Narrative Column */}
              <div className="lg:col-span-6">
                <span className="font-barlow font-bold text-xs uppercase tracking-[0.2em] text-royal block mb-2 sm:mb-3">
                  SEJARAH & RACIKAN KHAS
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight text-navy leading-tight mb-4 sm:mb-6">
                  Dari Racikan Dapur Rumahan Hingga Menjadi Pilihan Nusantara.
                </h2>
                <div className="space-y-3 sm:space-y-4 text-iron text-sm sm:text-base md:text-lg leading-relaxed mb-5 sm:mb-8">
                  <p>
                    Perjalanan MGS Jaya Abadi dimulai pada tahun 2002 di Desa Sumuragung, Bojonegoro. Berangkat dari kecintaan pada camilan gurih tradisional, kami meracik bumbu pedas khas daun jeruk yang memiliki aroma wangi dan rasa gurih yang membekas di lidah.
                  </p>
                  <p>
                    Kami menggunakan rempah alami pilihan—cabai segar, bawang putih berkualitas, dan irisan daun jeruk segar—tanpa zat pewarna kimia atau pengawet berbahaya. Kerenyahan yang awet dan cita rasa bumbu yang meresap sempurna menjadi ciri khas yang kami rawat selama lebih dari dua dekade.
                  </p>
                </div>

                {/* 2 Key Highlights */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-concrete">
                  <div>
                    <div className="font-display font-bold text-base sm:text-xl text-navy leading-snug">100% Rempah Alami</div>
                    <div className="text-[10px] sm:text-xs text-iron font-barlow uppercase tracking-wider mt-0.5">Cabai Segar & Daun Jeruk</div>
                  </div>
                  <div>
                    <div className="font-display font-bold text-base sm:text-xl text-royal leading-snug">Kerenyahan Teruji</div>
                    <div className="text-[10px] sm:text-xs text-iron font-barlow uppercase tracking-wider mt-0.5">Teknik Goreng & Tiris Tepat</div>
                  </div>
                </div>
              </div>

              {/* Authentic Recipe & Snack Visual */}
              <div className="lg:col-span-6">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-concrete bg-white group">
                  <Image
                    src="/img/spicy_factory_hero.png"
                    alt="Racikan Bumbu Pedas dan Makaroni MGS Jaya Abadi"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-2.5 sm:p-3.5 rounded-xl bg-white/95 backdrop-blur-sm border border-white text-navy flex items-center justify-between shadow-md">
                    <div>
                      <div className="font-display font-bold text-xs sm:text-sm uppercase tracking-wide">Racikan Bumbu Daun Jeruk</div>
                      <div className="text-[9px] sm:text-[11px] text-iron font-barlow uppercase tracking-wider">Camilan Tradisional Pedas Gurih MGS</div>
                    </div>
                    <div className="inline-flex px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-royal/10 text-royal text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shrink-0">
                      Resep 2002
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* =============================================================
                FASE PERJALANAN KAMI:
                MOBILE -> Sleek Horizontal Snap Track (saves 80% vertical space!)
                DESKTOP -> 4-Column Grid
                ============================================================= */}
            <div className="mt-10 sm:mt-16 pt-6 sm:pt-12 border-t border-concrete">
              <div className="flex items-center justify-between mb-3 sm:mb-6">
                <span className="font-barlow font-bold text-xs uppercase tracking-[0.2em] text-iron">
                  FASE PERJALANAN KAMI
                </span>
                <span className="lg:hidden text-[10px] font-bold text-royal uppercase tracking-wider flex items-center gap-1 font-barlow">
                  <span>Geser</span>
                  <span>→</span>
                </span>
              </div>

              {/* Horizontal snap track on mobile, 4-column grid on desktop */}
              <div className="flex lg:grid lg:grid-cols-4 gap-3 sm:gap-6 overflow-x-auto pb-3 pt-1 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:mx-0 sm:px-0">
                {milestones.map((item, idx) => (
                  <div
                    key={idx}
                    className="w-[78vw] max-w-[290px] sm:w-auto lg:w-auto snap-center shrink-0 p-4 sm:p-5 rounded-2xl bg-offwhite border border-concrete/70 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-display font-extrabold text-xl sm:text-2xl text-royal">
                          {item.year}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-iron/70 font-barlow bg-white px-2 py-0.5 rounded-full border border-concrete/50">
                          0{idx + 1} / 04
                        </span>
                      </div>
                      <div className="font-display font-bold text-sm sm:text-base text-navy uppercase tracking-wide mb-1">
                        {item.title}
                      </div>
                      <p className="text-iron text-xs sm:text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>


        {/* =========================================================================
            SECTION 3: ARMADA LOGISTIK & DISTRIBUSI (Natural Truck Display)
            ========================================================================= */}
        <section className="py-12 sm:py-20 md:py-28 bg-offwhite border-b border-concrete">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 lg:gap-16 items-center">
              
              {/* Armada Truck Natural Showcase */}
              <div className="lg:col-span-6 space-y-4 sm:space-y-6">
                <div className="relative w-full aspect-[16/10] flex items-center justify-center">
                  <Image
                    src="/img/truck_delivery.png"
                    alt="Armada Truk Pengiriman Mandiri MGS Jaya Abadi"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain filter drop-shadow-xl"
                  />
                </div>

                {/* Warehouse Highlight */}
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white border border-concrete shadow-xs">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 relative rounded-lg overflow-hidden shrink-0 border border-concrete">
                    <Image
                      src="/img/warehouse_boxes.png"
                      alt="Gudang Stok MGS Siap Kirim"
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs sm:text-sm text-navy uppercase mb-0.5">
                      Kesiapan Gudang & Stok Terjadwal
                    </h4>
                    <p className="text-[11px] sm:text-xs text-iron leading-relaxed">
                      Sistem stok berputar cepat (FIFO) menjamin setiap karton yang dimuat selalu baru digoreng.
                    </p>
                  </div>
                </div>
              </div>

              {/* Narrative & Key Logistics Advantages */}
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-concrete mb-3 sm:mb-4 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-royal animate-pulse" />
                  <span className="font-barlow font-bold text-[10px] uppercase tracking-widest text-navy">
                    RANTAI PASOK & DISTRIBUSI MANDIRI
                  </span>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight text-navy leading-tight mb-3 sm:mb-6">
                  Distribusi Logistik Cepat Tanpa Perantara.
                </h2>

                <p className="text-iron text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-6">
                  MGS Jaya Abadi mengoperasikan <strong>armada ekspedisi truk dan pengiriman mandiri</strong>. Kami memegang kendali langsung dari jalur gudang pabrik menuju titik distributor dan agen besar di berbagai kota di pulau Jawa.
                </p>
                <p className="text-iron text-sm sm:text-base md:text-lg leading-relaxed mb-5 sm:mb-8">
                  Dengan mengeliminasi pihak ketiga, biaya pengiriman menjadi jauh lebih hemat dan jadwal pasokan dapat diprediksi dengan akurat, sehingga mitra agen tidak pernah kehabisan stok penjualan.
                </p>

                {/* Advantage Badges */}
                <div className="space-y-2 sm:space-y-3 mb-5 sm:mb-8">
                  <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                    <CheckCircle size={16} weight="bold" className="text-royal shrink-0 mt-0.5 sm:mt-0" />
                    <span className="text-navy font-semibold text-xs sm:text-sm md:text-base">Armada truk & pickup khusus milik pabrik MGS</span>
                  </div>
                  <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                    <CheckCircle size={16} weight="bold" className="text-royal shrink-0 mt-0.5 sm:mt-0" />
                    <span className="text-navy font-semibold text-xs sm:text-sm md:text-base">Pengemasan karton tebal khusus pengiriman antarkota & pulau</span>
                  </div>
                  <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                    <CheckCircle size={16} weight="bold" className="text-royal shrink-0 mt-0.5 sm:mt-0" />
                    <span className="text-navy font-semibold text-xs sm:text-sm md:text-base">Jaminan produk tiba dalam kondisi aman, renyah, dan rapi</span>
                  </div>
                </div>

                <Link
                  href="/grosir"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-navy hover:bg-royal text-white px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 shadow-sm"
                >
                  Pelajari Sistem Grosir Kami
                  <ArrowRight size={16} weight="bold" className="ml-2" />
                </Link>
              </div>

            </div>

          </div>
        </section>


        {/* =========================================================================
            SECTION 4: PEMBERDAYAAN LOKAL & TIM KERJA (Human Touch)
            ========================================================================= */}
        <section className="py-12 sm:py-20 md:py-28 bg-white border-b border-concrete">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Text & Impact */}
              <div className="lg:col-span-6">
                <span className="font-barlow font-bold text-xs uppercase tracking-[0.2em] text-royal block mb-2 sm:mb-3">
                  PEMBERDAYAAN LOKAL
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight text-navy leading-tight mb-3 sm:mb-6">
                  Tumbuh Bersama Puluhan Tenaga Kerja Lokal.
                </h2>
                <div className="space-y-3 sm:space-y-4 text-iron text-sm sm:text-base md:text-lg leading-relaxed mb-5 sm:mb-8">
                  <p>
                    Bagi MGS Jaya Abadi, konsistensi kerenyahan dan bumbu bukan hanya peran mesin produksi, melainkan ketelitian tangan-tangan terampil puluhan ibu-ibu dan pekerja lokal di lingkungan sekitar pabrik kami.
                  </p>
                  <p>
                    Kami bangga menjadi penggerak ekonomi keluarga di Bojonegoro, membuka lapangan kerja yang bermartabat, dan memberi nilai tambah nyata bagi masyarakat sekitar.
                  </p>
                </div>

                {/* 3 Clean Impact Numbers */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-concrete">
                  <div className="p-1 sm:p-0">
                    <div className="font-display font-extrabold text-lg sm:text-2xl md:text-3xl text-navy">50+</div>
                    <div className="text-[10px] sm:text-xs text-iron font-barlow uppercase tracking-wider mt-0.5">Pekerja Lokal</div>
                  </div>
                  <div className="p-1 sm:p-0">
                    <div className="font-display font-extrabold text-lg sm:text-2xl md:text-3xl text-royal">80%</div>
                    <div className="text-[10px] sm:text-xs text-iron font-barlow uppercase tracking-wider mt-0.5">Wanita & Ibu RT</div>
                  </div>
                  <div className="p-1 sm:p-0">
                    <div className="font-display font-extrabold text-lg sm:text-2xl md:text-3xl text-navy">100%</div>
                    <div className="text-[10px] sm:text-xs text-iron font-barlow uppercase tracking-wider mt-0.5">Produksi Sendiri</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Team Photo */}
              <div className="lg:col-span-6 space-y-2">
                <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-concrete bg-charcoal group">
                  <Image
                    src="/img/team_mgs.jpg"
                    alt="Tim Kerja & Tenaga Produksi MGS Jaya Abadi"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] sm:text-xs text-iron px-1">
                  <span className="font-semibold text-navy">Keluarga Besar MGS Jaya Abadi</span>
                  <span className="font-barlow uppercase tracking-wider">Bojonegoro, Jawa Timur</span>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* =========================================================================
            SECTION 5: EMPAT PILAR KUALITAS (Compact 2x2 on Mobile, 4-Col Desktop)
            ========================================================================= */}
        <section className="py-14 sm:py-24 md:py-32 bg-navy text-white relative overflow-hidden border-b border-white/10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-royal/20 rounded-full blur-[160px] pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 sm:mb-16 gap-3 sm:gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-2 sm:mb-4 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal shrink-0" />
                  <span className="font-barlow text-[10px] font-bold uppercase tracking-widest text-steel">
                    STANDAR KUALITAS PABRIK
                  </span>
                </div>
                <h2 className="font-display font-extrabold text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white leading-[1.06]">
                  Empat Prinsip Mutu.<br />
                  <span className="text-steel">Tanpa Kompromi.</span>
                </h2>
              </div>
              <p className="text-concrete text-xs sm:text-base md:text-lg max-w-md leading-relaxed">
                Prinsip operasional yang kami pegang teguh di setiap batch produksi untuk menjaga integritas produk dan kepuasan mitra.
              </p>
            </div>

            {/* 4 Pillars: 2x2 Grid on Mobile, 4-Column on Desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-8">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div key={idx} className="border-t border-white/20 pt-3 sm:pt-6">
                    <div className="flex items-center justify-between mb-2 sm:mb-4">
                      <span className="font-display font-extrabold text-lg sm:text-2xl text-steel">
                        {pillar.num}
                      </span>
                      <Icon size={18} weight="bold" className="text-steel" />
                    </div>
                    <h3 className="font-display font-bold text-xs sm:text-lg lg:text-xl uppercase mb-1 sm:mb-2 text-white leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-concrete/80 text-[11px] sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </section>


        {/* =========================================================================
            SECTION 6: LEGALITAS & SERTIFIKASI RESMI (Compact 3-Col Bar on Mobile)
            ========================================================================= */}
        <section className="py-12 sm:py-20 md:py-28 bg-white border-b border-concrete">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            
            <div className="max-w-2xl mx-auto mb-8 sm:mb-14">
              <span className="font-barlow font-bold text-xs uppercase tracking-[0.2em] text-royal block mb-1.5 sm:mb-3">
                LEGALITAS RESMI
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-navy mb-2 sm:mb-4">
                Tersertifikasi Resmi & Amanah
              </h2>
              <p className="text-iron text-xs sm:text-base leading-relaxed">
                Kami beroperasi dengan legalitas usaha dan izin pangan lengkap untuk menjamin keamanan mitra agen dan konsumen akhir.
              </p>
            </div>

            {/* 3 Certifications: 3-Column Compact Grid on Mobile & Desktop */}
            <div className="grid grid-cols-3 gap-2 sm:gap-6">
              
              <div className="p-3 sm:p-6 rounded-xl sm:rounded-2xl bg-offwhite border border-concrete flex flex-col items-center text-center justify-between">
                <div className="h-10 sm:h-16 md:h-20 w-12 sm:w-16 relative mb-2 sm:mb-4">
                  <Image
                    src="/img/logo_halal.svg"
                    alt="Sertifikat Halal Indonesia"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xs sm:text-base md:text-lg text-navy uppercase leading-tight">
                    Halal Indonesia
                  </h3>
                  <p className="text-iron text-[10px] sm:text-xs hidden sm:block mt-1 leading-relaxed">
                    BPJPH Kemenag RI. 100% Halal & Thayyib.
                  </p>
                  <span className="sm:hidden text-[9px] font-bold text-halal font-barlow uppercase block mt-1">Resmi</span>
                </div>
              </div>

              <div className="p-3 sm:p-6 rounded-xl sm:rounded-2xl bg-offwhite border border-concrete flex flex-col items-center text-center justify-between">
                <div className="h-10 sm:h-16 md:h-20 w-16 sm:w-24 relative mb-2 sm:mb-4 flex items-center justify-center">
                  <Image
                    src="/img/logo_bkpm.svg"
                    alt="NIB OSS BKPM"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xs sm:text-base md:text-lg text-navy uppercase leading-tight">
                    NIB OSS BKPM
                  </h3>
                  <p className="text-iron text-[10px] sm:text-xs hidden sm:block mt-1 leading-relaxed">
                    Kementerian Investasi RI.
                  </p>
                  <span className="sm:hidden text-[9px] font-bold text-royal font-barlow uppercase block mt-1">Terdaftar</span>
                </div>
              </div>

              <div className="p-3 sm:p-6 rounded-xl sm:rounded-2xl bg-offwhite border border-concrete flex flex-col items-center text-center justify-between">
                <div className="h-10 sm:h-16 md:h-20 w-12 sm:w-16 flex items-center justify-center rounded-lg sm:rounded-xl bg-white border-2 border-navy mb-2 sm:mb-4">
                  <span className="font-display font-extrabold text-xs sm:text-lg md:text-xl text-navy tracking-wider">P-IRT</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-xs sm:text-base md:text-lg text-navy uppercase leading-tight">
                    Dinas Kesehatan
                  </h3>
                  <p className="text-iron text-[10px] sm:text-xs hidden sm:block mt-1 leading-relaxed">
                    Uji sanitasi & keamanan pangan.
                  </p>
                  <span className="sm:hidden text-[9px] font-bold text-navy font-barlow uppercase block mt-1">Izin Edar</span>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* =========================================================================
            SECTION 7: CLOSING CONVERSION CTA (Mobile Full-Width Stack)
            ========================================================================= */}
        <section className="py-14 sm:py-24 md:py-32 bg-navy text-white text-center px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <span className="font-barlow font-bold text-xs uppercase tracking-[0.2em] text-steel block mb-2 sm:mb-4">
              KEMITRAAN PABRIK
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight mb-3 sm:mb-6 leading-tight">
              Siap Menjadi Mitra atau Mencoba Sampel Produk?
            </h2>
            <p className="text-concrete text-xs sm:text-base md:text-lg mb-6 sm:mb-10 leading-relaxed max-w-xl mx-auto font-normal">
              Kami membuka peluang kerjasama seluas-luasnya untuk reseller, distributor grosir, maupun toko snack di seluruh Indonesia.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
              <a
                href={buildWALink('Halo MGS Jaya Abadi, saya tertarik bermitra dan ingin informasi tentang produk pabrik Anda.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-navy hover:bg-steel hover:text-navy px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-200 shadow-lg"
              >
                Konsultasi via WhatsApp
                <ArrowRight size={16} weight="bold" className="ml-2" />
              </a>
              <Link
                href="/produk"
                className="w-full sm:w-auto inline-flex items-center justify-center border border-white/30 text-white hover:bg-white/10 px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-200"
              >
                Lihat Semua Produk
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
