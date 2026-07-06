import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Kebijakan Privasi — MGS Jaya Abadi",
  description: "Kebijakan privasi resmi penggunaan website MGS Jaya Abadi. Kami menjaga keamanan data informasi pelanggan dan mitra dengan aman.",
  alternates: {
    canonical: "/kebijakan-privasi",
  },
};

export default function KebijakanPrivasiPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-16 bg-offwhite min-h-[100dvh]">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-24">
          <div className="bg-white border border-concrete p-8 md:p-12 shadow-sm">
            <SectionEyebrow label="Legalitas" />
            <h1 className="font-display font-bold text-4xl md:text-5xl text-navy uppercase mb-8">
              Kebijakan Privasi
            </h1>
            <p className="text-xs text-iron/60 mb-8">Terakhir diperbarui: 6 Juli 2026</p>

            <div className="space-y-6 text-iron leading-relaxed text-sm md:text-base">
              <p>
                MGS Jaya Abadi berkomitmen penuh dalam melindungi dan menghormati privasi data kunjungan serta informasi kontak yang Anda berikan melalui website kami (<code>mgs.my.id</code>).
              </p>

              <div>
                <h2 className="font-display font-semibold text-xl text-navy uppercase mb-3">1. Informasi yang Kami Kumpulkan</h2>
                <p>
                  Kami hanya mengumpulkan informasi yang Anda kirimkan secara sukarela melalui formulir kontak atau aplikasi WhatsApp, termasuk namun tidak terbatas pada: nama lengkap, nomor telepon (WhatsApp), pesan tertulis, dan status kemitraan (konsumen umum atau calon reseller).
                </p>
              </div>

              <div>
                <h2 className="font-display font-semibold text-xl text-navy uppercase mb-3">2. Penggunaan Informasi</h2>
                <p>Informasi yang kami kumpulkan digunakan secara eksklusif untuk:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Memproses pesanan produk snack tradisional Anda.</li>
                  <li>Memverifikasi pendaftaran program kemitraan reseller/grosir.</li>
                  <li>Mengirimkan informasi harga terbaru atau katalog fisik/digital jika diminta.</li>
                  <li>Menanggapi pertanyaan, kritik, atau saran yang Anda kirimkan ke pusat layanan kami.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display font-semibold text-xl text-navy uppercase mb-3">3. Keamanan Data</h2>
                <p>
                  Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang wajar untuk mencegah kehilangan, penyalahgunaan, atau perubahan data informasi Anda. Data kontak Anda tersimpan dalam lingkungan internal bisnis yang tepercaya dan tidak akan pernah dijual atau dibagikan ke pihak ketiga di luar MGS Jaya Abadi untuk tujuan pemasaran komersial pihak luar.
                </p>
              </div>

              <div>
                <h2 className="font-display font-semibold text-xl text-navy uppercase mb-3">4. Cookies & Pelacakan</h2>
                <p>
                  Website ini dapat menggunakan cookies atau teknologi pemantauan eksternal seperti Google Analytics untuk menganalisis statistik traffic, melacak pola kunjungan, dan melacak efisiensi performa navigasi demi peningkatan pengalaman navigasi web pengguna.
                </p>
              </div>

              <div>
                <h2 className="font-display font-semibold text-xl text-navy uppercase mb-3">5. Kontak Kami</h2>
                <p>
                  Jika Anda memiliki pertanyaan tentang kebijakan privasi kami atau pengelolaan informasi Anda, silakan hubungi kami melalui surel di <strong>halo@mgs.my.id</strong> atau telepon/WhatsApp resmi di <strong>0813-3356-0417</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
