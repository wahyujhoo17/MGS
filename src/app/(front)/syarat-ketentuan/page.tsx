import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Syarat & Ketentuan — MGS Jaya Abadi",
  description: "Syarat dan ketentuan pembelian snack eceran dan program reseller grosir di pabrik MGS Jaya Abadi.",
};

export default function SyaratKetentuanPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-16 bg-offwhite min-h-[100dvh]">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-24">
          <div className="bg-white border border-concrete p-8 md:p-12 shadow-sm">
            <SectionEyebrow label="Legalitas" />
            <h1 className="font-display font-bold text-4xl md:text-5xl text-navy uppercase mb-8">
              Syarat & Ketentuan
            </h1>
            <p className="text-xs text-iron/60 mb-8">Terakhir diperbarui: 6 Juli 2026</p>

            <div className="space-y-6 text-iron leading-relaxed text-sm md:text-base">
              <p>
                Selamat datang di website resmi MGS Jaya Abadi. Silakan baca dan pahami syarat dan ketentuan penggunaan layanan serta pembelanjaan produk snack tradisional kami sebelum Anda mengajukan pesanan.
              </p>

              <div>
                <h2 className="font-display font-semibold text-xl text-navy uppercase mb-3">1. Ketentuan Pembelian</h2>
                <p>
                  Seluruh transaksi pemesanan produk diproses secara semi-manual melalui integrasi WhatsApp ke admin logistik kami. Harga produk yang tercantum di web dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya mengikuti fluktuasi bahan baku di pasar industri makanan.
                </p>
              </div>

              <div>
                <h2 className="font-display font-semibold text-xl text-navy uppercase mb-3">2. Program Reseller & Grosir</h2>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Pembelian dengan harga grosir memerlukan Minimum Order Quantity (MOQ) yang ditentukan (minimal 12 pcs per varian).</li>
                  <li>MGS Jaya Abadi berhak memverifikasi wilayah operasional calon reseller untuk menghindari konflik distribusi internal antar-agen di satu daerah khusus.</li>
                  <li>Reseller dilarang keras memotong atau merusak merk dagang asli &quot;MGS Jaya Abadi&quot; tanpa persetujuan tertulis resmi dari pihak manajemen kami.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display font-semibold text-xl text-navy uppercase mb-3">3. Pengiriman & Pengangkutan</h2>
                <p>
                  Pengiriman untuk area dalam pulau Jawa didukung oleh armada ekspedisi mandiri MGS Jaya Abadi mengikuti rute logistik mingguan kami. Pengiriman di luar pulau Jawa akan dialihkan menggunakan ekspedisi kargo tepercaya pihak ketiga atas kesepakatan tertulis bersama.
                </p>
              </div>

              <div>
                <h2 className="font-display font-semibold text-xl text-navy uppercase mb-3">4. Hak Cipta & Merek</h2>
                <p>
                  Seluruh konten, gambar, logo, salinan teks, materi desain visual, dan file digital pada website ini adalah properti milik MGS Jaya Abadi dan dilindungi secara hukum. Penggunaan tanpa izin tertulis dilarang keras.
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
