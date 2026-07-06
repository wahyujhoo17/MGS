import type { Metadata } from "next";
import { Barlow_Condensed, Barlow, Inter } from "next/font/google";
import { GoogleAnalytics } from "@/components/shared/GoogleAnalytics";
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
  metadataBase: new URL("https://mgs.my.id"),
  title: "MGS Jaya Abadi — Produsen & Grosir Snack Tradisional",
  description: "Produsen dan grosir snack makanan ringan tradisional: makaroni, basreng, mie lidi. Melayani eceran dan reseller seluruh Indonesia.",
  keywords: ["MGS Jaya Abadi", "snack tradisional", "makaroni pedas", "grosir basreng", "mie lidi Bojonegoro", "produsen snack makanan ringan", "jual makaroni grosir"],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  openGraph: {
    title: "MGS Jaya Abadi — Produsen & Grosir Snack Tradisional",
    description: "Produsen dan grosir snack makanan ringan tradisional: makaroni, basreng, mie lidi. Melayani eceran dan reseller seluruh Indonesia.",
    url: "https://mgs.my.id",
    siteName: "MGS Jaya Abadi",
    images: [
      {
        url: "https://mgs.my.id/img/MGS.png",
        width: 800,
        height: 600,
        alt: "Logo MGS Jaya Abadi",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MGS Jaya Abadi — Produsen & Grosir Snack Tradisional",
    description: "Produsen dan grosir snack makanan ringan tradisional: makaroni, basreng, mie lidi. Melayani eceran dan reseller seluruh Indonesia.",
    images: ["https://mgs.my.id/img/MGS.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "additionalType": "FoodManufacturer",
    "name": "MGS Jaya Abadi",
    "image": "https://mgs.my.id/img/MGS.png",
    "logo": "https://mgs.my.id/img/MGS.png",
    "@id": "https://mgs.my.id",
    "url": "https://mgs.my.id",
    "telephone": "+6281333560417",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "RT.10/RW.03, Simo, Sumuragung",
      "addressLocality": "Bojonegoro",
      "addressRegion": "Jawa Timur",
      "postalCode": "62192",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -7.15097, // Approximate Bojonegoro latitude mapping coordinate
      "longitude": 112.01235 // Approximate longitude key based on region mapping
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "16:00"
    },
    "sameAs": [
      "https://shopee.co.id/mgsjayaabadi",
      "https://wa.me/6281333560417",
      "https://maps.google.com/maps?q=MGS+Jaya+Abadi+Bojonegoro"
    ]
  };

  return (
    <html
      lang="id"
      className={`${barlowCondensed.variable} ${barlow.variable} ${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
