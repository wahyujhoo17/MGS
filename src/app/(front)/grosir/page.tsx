import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { Button } from '@/components/ui/Button';
import { buildWALink } from '@/lib/whatsapp';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Kemitraan Grosir & Reseller — MGS Jaya Abadi",
  description: "Bergabung menjadi mitra reseller grosir snack MGS Jaya Abadi. Dapatkan harga pabrik langsung, pengiriman aman, dan margin usaha menjanjikan.",
};

export default function GrosirPage() {
  const resellerWAMsg = "Halo MGS Jaya Abadi,\n\nSaya tertarik untuk menjadi Reseller/Mitra Grosir produk MGS.\n\nMohon info syarat dan ketentuan serta katalog daftar harga grosir terbaru. Terima kasih!";

  const faqs = [
    {
      q: "Berapa minimal pemesanan untuk mendapatkan harga grosir?",
      a: "Minimum order untuk harga grosir/reseller adalah mulai 1 lusin (12 pcs) per varian ukuran produk. Untuk pembelian skala besar/kartonan, silakan langsung hubungi admin pemasaran kami demi mendapatkan penawaran logistik khusus."
    },
    {
      q: "Bagaimana sistem pengiriman pesanan?",
      a: "Untuk wilayah Jawa Timur dan jalur utama pulau Jawa, kami mendistribusikan pesanan langsung menggunakan armada truk logistik MGS sesuai jadwal mingguan untuk meminimalkan ongkos kirim. Untuk area di luar jangkauan armada kami atau luar Jawa, pengiriman dialihkan menggunakan ekspedisi kargo tepercaya (Kalog, Indah Cargo, JTR, dll)."
    },
    {
      q: "Apakah diperbolehkan menjual kembali dengan brand sendiri (white label)?",
      a: "Tidak secara umum. Seluruh produk grosir didistribusikan dengan kemasan bermerek resmi 'MGS Jaya Abadi' untuk melindungi standar kualitas pasar dan reputasi brand. Pengemasan ulang tanpa izin tertulis dilarang."
    },
    {
      q: "Apakah produk MGS sudah memiliki izin resmi?",
      a: "Tentu. Seluruh fasilitas produksi kami terdaftar secara resmi. Produk MGS telah tersertifikasi Halal serta memiliki izin edar regulasi P-IRT dari Dinas Kesehatan dan Nomor Induk Berusaha (NIB) BKPM."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20">

        {/* Section 1: Hero */}
        <section className="bg-charcoal py-20 md:py-32 text-white relative overflow-hidden border-b border-concrete">
          {/* Decorative element */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-steel/30 bg-navy/60 mb-6 md:mb-8">
                <span className="flex h-2 w-2 rounded-full bg-steel animate-pulse" />
                <span className="font-barlow font-bold text-[10px] text-steel uppercase tracking-widest">
                  Peluang Usaha Camilan
                </span>
              </div>
              <h1 className="font-display font-bold text-5xl md:text-7xl uppercase tracking-tight mb-8 leading-[1.05]">
                Raih Margin Lebih<br />
                <span className="text-steel">Bersama MGS Jaya Abadi</span>
              </h1>
              <p className="text-concrete text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
                Bergabunglah dengan jaringan ratusan grosir dan reseller kami di seluruh pulau Jawa. Dapatkan akses langsung produk kualitas pabrik dengan harga termurah tangan pertama.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={buildWALink(resellerWAMsg)} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="lg" className="bg-royal border border-royal text-white hover:bg-navy transition-all duration-300">
                    Daftar Sebagai Reseller →
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Keunggulan */}
        <section className="bg-offwhite py-16 md:py-24 border-b border-concrete">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 text-center">
              <SectionEyebrow label="Keuntungan Kemitraan" className="justify-center" />
              <h2 className="font-display font-bold text-4xl md:text-5xl text-navy uppercase tracking-tight">
                Mengapa Memilih Kami?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-8 border border-concrete hover:border-royal hover:shadow-md transition-all duration-300">
                <div className="text-3xl mb-4 text-royal">🏷️</div>
                <h3 className="font-display font-bold text-xl uppercase text-navy mb-3">Harga Tangan Pertama</h3>
                <p className="text-iron text-sm leading-relaxed">
                  Dapatkan harga grosir langsung dari pabrik produksi kami untuk memaksimalkan keuntungan atau margin penjualan toko Anda.
                </p>
              </div>
              <div className="bg-white p-8 border border-concrete hover:border-royal hover:shadow-md transition-all duration-300">
                <div className="text-3xl mb-4 text-royal">📦</div>
                <h3 className="font-display font-bold text-xl uppercase text-navy mb-3">Atur MOQ Fleksibel</h3>
                <p className="text-iron text-sm leading-relaxed">
                  Kami memahami kebutuhan bisnis Anda. Memulai usaha dengan kami sangat mudah berkat persyaratan minimum order yang ringan.
                </p>
              </div>
              <div className="bg-white p-8 border border-concrete hover:border-royal hover:shadow-md transition-all duration-300">
                <div className="text-3xl mb-4 text-royal">🚚</div>
                <h3 className="font-display font-bold text-xl uppercase text-navy mb-3">Logistik Mandiri</h3>
                <p className="text-iron text-sm leading-relaxed">
                  Didukung armada logistik internal milik sendiri untuk pengiriman rute terjadwal pulau Jawa dengan ongkos yang jauh lebih hemat.
                </p>
              </div>
              <div className="bg-white p-8 border border-concrete hover:border-royal hover:shadow-md transition-all duration-300">
                <div className="text-3xl mb-4 text-royal">🛡️</div>
                <h3 className="font-display font-bold text-xl uppercase text-navy mb-3">Kualitas Terjamin</h3>
                <p className="text-iron text-sm leading-relaxed">
                  Diproduksi higienis dengan perizinan P-IRT & Halal resmi demi keselamatan konsumen serta kemantapan operasional bisnis Anda.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Cara Kerja */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 text-center">
              <SectionEyebrow label="Alur Kemitraan" className="justify-center" />
              <h2 className="font-display font-bold text-4xl md:text-5xl text-navy uppercase tracking-tight">
                3 Langkah Mudah Bermitra
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative">
              <div className="relative flex flex-col items-center text-center px-4">
                <div className="w-16 h-16 rounded-full bg-navy text-white flex items-center justify-center font-display font-bold text-2xl mb-6 shadow-md shadow-navy/20">
                  1
                </div>
                <h3 className="font-display font-bold text-2xl text-navy uppercase mb-3">Hubungi Pemasaran</h3>
                <p className="text-iron text-sm md:text-base leading-relaxed max-w-xs">
                  Hubungi kami via WhatsApp untuk mendapatkan katalog penawaran, daftar harga grosir, serta memeriksa slot agen di wilayah Anda.
                </p>
              </div>
              <div className="relative flex flex-col items-center text-center px-4">
                <div className="w-16 h-16 rounded-full bg-navy text-white flex items-center justify-center font-display font-bold text-2xl mb-6 shadow-md shadow-navy/20">
                  2
                </div>
                <h3 className="font-display font-bold text-2xl text-navy uppercase mb-3">Pilih Produk & Varian</h3>
                <p className="text-iron text-sm md:text-base leading-relaxed max-w-xs">
                  Tentukan jumlah pesanan (min. 12 pcs per varian) dan pilih rasa/ukuran yang paling diminati oleh pasar target lokal Anda.
                </p>
              </div>
              <div className="relative flex flex-col items-center text-center px-4">
                <div className="w-16 h-16 rounded-full bg-navy text-white flex items-center justify-center font-display font-bold text-2xl mb-6 shadow-md shadow-navy/20">
                  3
                </div>
                <h3 className="font-display font-bold text-2xl text-navy uppercase mb-3">Kirim & Mulai Penjualan</h3>
                <p className="text-iron text-sm md:text-base leading-relaxed max-w-xs">
                  Pesanan Anda akan dikemas dengan aman dan langsung didistribusikan ke alamat gudang Anda menggunakan ekspedisi pilihan atau armada kami.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: FAQ */}
        <section className="bg-offwhite py-16 md:py-24 border-t border-concrete">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-12 text-center">
              <SectionEyebrow label="Tanya Jawab" className="justify-center" />
              <h2 className="font-display font-bold text-4xl text-navy uppercase tracking-tight">
                Pertanyaan Umum Reseller
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-white border border-concrete p-5 md:p-6 transition-all duration-300 open:border-royal shadow-sm rounded-[4px]"
                >
                  <summary className="flex items-center justify-between font-display font-bold text-lg md:text-xl text-navy uppercase tracking-wide cursor-pointer list-none">
                    <span>{faq.q}</span>
                    <span className="text-royal group-open:rotate-180 transition-transform duration-300">&darr;</span>
                  </summary>
                  <p className="mt-4 text-iron leading-relaxed text-sm md:text-base border-t border-concrete pt-4">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: CTA Akhir */}
        <section className="bg-royal py-20 text-white text-center px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-bold text-4xl md:text-5xl uppercase tracking-tight mb-4">
              Gabung Kemitraan MGS Sekarang
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto">
              Segera hubungi tim marketing kami untuk mendapatkan katalog resmi beserta list harga reseller spesial.
            </p>
            <a
              href={buildWALink(resellerWAMsg)}
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
