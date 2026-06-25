import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hubungi Kami — MGS Jaya Abadi",
  description: "Ada pertanyaan atau ingin bermitra menjadi agen reseller? Hubungi pusat layanan pelanggan MGS Jaya Abadi via WhatsApp atau kirim pesan langsung.",
};

export default function KontakLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
