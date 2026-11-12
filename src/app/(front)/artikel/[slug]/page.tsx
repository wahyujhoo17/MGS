import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { cache } from "react";
import { SITE_URL, absoluteUrl, articleDescription, toPlainText } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

// Satu query per request untuk generateMetadata + halaman
const getArticle = cache((slug: string) => prisma.article.findUnique({ where: { slug } }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article || !article.published) {
    return {
      title: "Artikel Tidak Ditemukan",
      robots: { index: false, follow: false },
    };
  }

  const description = articleDescription(article);
  const imageUrl = absoluteUrl(article.coverImage);
  const url = `${SITE_URL}/artikel/${slug}`;

  return {
    title: `${article.title} — MGS Jaya Abadi`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description,
      type: "article",
      url,
      siteName: "MGS Jaya Abadi",
      locale: "id_ID",
      publishedTime: article.createdAt.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      images: [{ url: imageUrl, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ArtikelDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article || !article.published) {
    notFound();
  }

  const articleUrl = `${SITE_URL}/artikel/${article.slug}`;
  const plainText = toPlainText(article.content);

  // Sumber eksternal yang dikutip di artikel → properti "citation"
  const citations = Array.from(
    new Set(
      Array.from(article.content.matchAll(/<a\s[^>]*href=["'](https?:\/\/[^"']+)["']/gi))
        .map((m) => m[1])
        .filter((u) => !u.startsWith(SITE_URL))
    )
  );

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": { "@type": "WebPage", "@id": articleUrl },
      "headline": article.title,
      "description": articleDescription(article, 200),
      "image": [absoluteUrl(article.coverImage)],
      "datePublished": article.createdAt.toISOString(),
      "dateModified": article.updatedAt.toISOString(),
      "inLanguage": "id-ID",
      "wordCount": plainText.split(" ").filter(Boolean).length,
      "author": {
        "@type": "Organization",
        "name": "MGS Jaya Abadi",
        "url": SITE_URL,
      },
      "publisher": {
        "@type": "Organization",
        "name": "MGS Jaya Abadi",
        "logo": { "@type": "ImageObject", "url": `${SITE_URL}/img/MGS.png` },
      },
      ...(citations.length > 0 ? { citation: citations } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Beranda", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": "Artikel", "item": `${SITE_URL}/artikel` },
        { "@type": "ListItem", "position": 3, "name": article.title, "item": articleUrl },
      ],
    },
  ];

  const formattedDate = new Date(article.createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const recentArticles = await prisma.article.findMany({
    where: {
      published: true,
      NOT: { id: article.id },
    },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-grow pt-20 bg-offwhite min-h-[100dvh]">

        {/* Breadcrumb Info */}
        <div className="border-b border-concrete bg-offwhite py-4 px-6 text-sm">
          <div className="max-w-7xl mx-auto font-medium text-iron">
            <Link href="/artikel" className="hover:text-navy">
              Artikel & Kabar
            </Link>{" "}
            / <span className="text-navy ml-1">{article.title}</span>
          </div>
        </div>

        <section className="max-w-4xl mx-auto px-6 py-12 md:py-20">

          {/* Back Link */}
          <div className="mb-8">
            <Link
              href="/artikel"
              className="inline-flex items-center text-xs font-bold text-iron hover:text-royal transition-colors uppercase tracking-widest font-barlow"
            >
              &larr; Kembali ke Artikel
            </Link>
          </div>

          <div className="bg-white border border-concrete rounded-[4px] p-6 sm:p-10 md:p-12 shadow-sm">
            {/* Header */}
            <header className="mb-8 pb-6 border-b border-concrete text-left">
              <span className="font-barlow text-[11px] font-bold text-royal uppercase tracking-widest block mb-3">
                {formattedDate} • Info Resmi
              </span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-navy uppercase leading-tight md:leading-tight tracking-tight">
                {article.title}
              </h1>
              <div className="mt-5 flex items-center text-xs font-semibold text-iron uppercase tracking-wider font-barlow">
                <span>Tim Redaksi MGS Jaya Abadi</span>
              </div>
            </header>

            {/* Cover Image */}
            {article.coverImage && (
              <figure className="relative w-full aspect-[16/9] rounded-[4px] border border-concrete/50 overflow-hidden mb-10 shadow-sm">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 900px"
                />
              </figure>
            )}

            {/* Article Content Rendered */}
            <div className="article-content max-w-none text-left mb-12">
              <div
                className="text-[#4a5568] break-words text-[16px] sm:text-[17px] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>

            {/* CTA Box Kemitraan */}
            <div className="p-8 bg-offwhite border border-concrete rounded-[4px] text-center mt-12">
              <h3 className="font-display font-bold text-xl text-navy uppercase mb-2">
                Ingin Menjadi Reseller MGS?
              </h3>
              <p className="text-sm text-iron leading-relaxed mb-6 max-w-lg mx-auto">
                Dapatkan slot reseller dan harga langsung dari pabrik. Nikmati keuntungan melimpah dari berbisnis makanan ringan bersama MGS.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link
                  href="/grosir"
                  className="inline-flex items-center justify-center bg-navy text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-royal transition-all rounded-[4px]"
                >
                  Kemitraan Grosir
                </Link>
                <a
                  href="https://wa.me/6281333560417?text=Halo%20MGS%20Jaya%20Abadi,%20saya%20tertarik%20bertanya%20mengenai%20kemitraan%20reseller..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-white border border-concrete text-navy px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-offwhite transition-all rounded-[4px]"
                >
                  Hubungi via WhatsApp
                </a>
              </div>
            </div>

          </div>

          {/* Recent Articles list below */}
          {recentArticles.length > 0 && (
            <div className="pt-16 mt-16 border-t border-concrete text-left">
              <h3 className="font-display font-bold text-2xl text-navy uppercase mb-8">
                Artikel MGS Lainnya
              </h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-6">
                {recentArticles.map((recent) => (
                  <div key={recent.id} className="group bg-white border border-concrete p-2 sm:p-4 rounded-[4px] hover:border-royal hover:shadow-md transition-all duration-300">
                    <Link href={`/artikel/${recent.slug}`} className="block">
                      <div className="relative aspect-[16/10] w-full rounded-[4px] overflow-hidden bg-offwhite mb-2 sm:mb-4 border border-concrete">
                        {recent.coverImage ? (
                          <Image
                            src={recent.coverImage}
                            alt={recent.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 33vw, 250px"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-[10px] sm:text-xs text-iron/40 font-mono italic">
                            No Image
                          </div>
                        )}
                      </div>
                      <h4 className="font-display font-bold text-[10px] sm:text-base text-navy group-hover:text-royal line-clamp-2 transition-colors uppercase leading-tight sm:leading-snug">
                        {recent.title}
                      </h4>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
