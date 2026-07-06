import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

interface Props {
  params: Promise<{ slug: string }>;
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article || !article.published) {
    return {
      title: "Artikel Tidak Ditemukan",
    };
  }

  const plainText = stripHtml(article.content);
  const description = plainText.substring(0, 150) + "...";

  return {
    title: `${article.title} — MGS Jaya Abadi`,
    description: description,
    openGraph: {
      title: article.title,
      description: description,
      type: "article",
      publishedTime: article.createdAt.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      images: article.coverImage ? [
        {
          url: article.coverImage,
          alt: article.title,
        }
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: description,
      images: article.coverImage ? [article.coverImage] : [],
    }
  };
}

export default async function ArtikelDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article || !article.published) {
    notFound();
  }

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

          <div className="bg-white border border-concrete rounded-[4px] p-6 sm:p-12 shadow-sm">
            {/* Header */}
            <header className="mb-8 pb-6 border-b border-concrete text-left">
              <span className="font-barlow text-[10px] font-bold text-royal uppercase tracking-widest block mb-3">
                {formattedDate} • Info Resmi
              </span>
              <h1 className="font-display font-bold text-4xl sm:text-5xl text-navy uppercase leading-tight tracking-tight">
                {article.title}
              </h1>
              <div className="mt-4 flex items-center text-xs font-semibold text-iron uppercase tracking-wider font-barlow">
                <span>Diposkan oleh Admin Pemasaran</span>
              </div>
            </header>

            {/* Cover Image */}
            {article.coverImage && (
              <div className="relative w-full aspect-[16/9] rounded-[4px] border border-concrete overflow-hidden mb-10 shadow-sm">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 900px"
                />
              </div>
            )}

            {/* Article Content Rendered */}
            <div className="article-content max-w-none text-left mb-12">
              <div
                className="text-iron break-words text-[15px] sm:text-[16px]"
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
              <div className="grid gap-6 sm:grid-cols-3">
                {recentArticles.map((recent) => (
                  <div key={recent.id} className="group bg-white border border-concrete p-4 rounded-[4px] hover:border-royal hover:shadow-md transition-all duration-300">
                    <Link href={`/artikel/${recent.slug}`} className="block">
                      <div className="relative aspect-[16/10] w-full rounded-[4px] overflow-hidden bg-offwhite mb-4 border border-concrete">
                        {recent.coverImage ? (
                          <Image
                            src={recent.coverImage}
                            alt={recent.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, 250px"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-xs text-iron/40 font-mono italic">
                            No Image
                          </div>
                        )}
                      </div>
                      <h4 className="font-display font-bold text-base text-navy group-hover:text-royal line-clamp-2 transition-colors uppercase leading-snug">
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
