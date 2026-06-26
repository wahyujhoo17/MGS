import type { Metadata } from "next";
import { Barlow_Condensed, Barlow, Inter } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "MGS Jaya Abadi — Produsen & Grosir Snack Tradisional",
  description: "Produsen dan grosir snack makanan ringan tradisional: makaroni, basreng, mie lidi. Melayani eceran dan reseller seluruh Indonesia.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${barlowCondensed.variable} ${barlow.variable} ${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
