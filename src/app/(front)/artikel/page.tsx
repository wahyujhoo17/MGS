import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Artikel & Info Terbaru — MGS Jaya Abadi",
  description: "Dapatkan tips bisnis kuliner, info produk camilan, peluang reseller dan grosir makanan ringan terpercaya di Indonesia dari MGS Jaya Abadi.",
  alternates: {
    canonical: "/artikel",
  },
  openGraph: {
    title: "Artikel & Info Terbaru — MGS Jaya Abadi",
    description: "Tips bisnis makanan ringan, panduan kemitraan reseller, dan artikel inspiratif dari MGS Jaya Abadi.",
    type: "website",
  },
};

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "");
}

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ArtikelPage(props: Props) {
  const searchParams = await props.searchParams;
  const page = typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
  const take = 9;
  const skip = (page > 0 ? page - 1 : 0) * take;

  const [articles, totalCount] = await Promise.all([
    prisma.article.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.article.count({ where: { published: true } })
  ]);

  const totalPages = Math.ceil(totalCount / take);

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20 bg-offwhite min-h-[100dvh]">

        {/* Banner Section */}
        <section className="bg-navy py-16 md:py-24 text-white relative overflow-hidden border-b border-concrete">
          {/* Subtle Decorative Backgrounds */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-royal/30 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-sky/20 rounded-full blur-[80px] translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-steel/30 bg-white/5 mb-6 font-barlow text-[10px] font-bold uppercase tracking-widest text-steel backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-signal animate-pulse" />
                Edutainment & Info Bisnis
              </div>
              <h1 className="font-display font-bold text-5xl md:text-6xl uppercase tracking-tight mb-6 text-white drop-shadow-sm">
                Artikel & <span className="text-steel">Kabar Terbaru</span>
              </h1>
              <p className="text-concrete text-lg leading-relaxed max-w-xl">
                Temukan tips sukses kuliner, ide pemasaran camilan, kisah inspiratif kemitraan reseller, serta update menarik dari MGS Jaya Abadi.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          {articles.length === 0 ? (
            <div className="text-center py-20 bg-white border border-concrete rounded-[4px] shadow-sm">
              <svg
                className="mx-auto h-12 w-12 text-iron/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 4a2 2 0 00-2-2h-3a2 2 0 00-2 2v5a2 2 0 002 2h3a2 2 0 002-2V9z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-display font-bold text-navy uppercase">Belum Ada Artikel</h3>
              <p className="mt-1 text-sm text-iron">
                Nantikan tips bisnis dan info menarik yang akan kami bagikan dalam waktu dekat.
              </p>
              <div className="mt-6">
                <Link
                  href="/produk"
                  className="inline-flex items-center justify-center bg-navy text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-royal hover:shadow-lg transition-all"
                >
                  Lihat Produk Kami
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => {
                const excerpt = stripHtml(article.content).substring(0, 110) + "...";
                const formattedDate = new Date(article.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });

                return (
                  
                  <article
                    key={article.id}
                    className="flex flex-col bg-white border border-concrete rounded-[4px] hover:border-royal hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    {/* Cover Wrap */}
                    <div className="relative aspect-[16/10] w-full bg-offwhite border-b border-concrete">
                      {article.coverImage ? (
                        <Image
                          src={article.coverImage}
                          alt={article.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-xs text-iron/40 italic font-mono bg-offwhite">
                          No Image Supplied
                        </div>
                      )}
                    </div>
                    {/* Content Wrap */}
                    <div className="flex flex-grow flex-col justify-between p-6">
                      <div className="space-y-3">
                        <span className="font-barlow text-[10px] font-bold text-royal uppercase tracking-widest block">
                          {formattedDate}
                        </span>
                        <Link href={`/artikel/${article.slug}`} className="block group">
                          <h2 className="font-display font-bold text-xl uppercase text-navy group-hover:text-royal transition-colors line-clamp-2 leading-tight">
                            {article.title}
                          </h2>
                        </Link>
                        <p className="text-iron text-sm leading-relaxed line-clamp-3">
                          {excerpt}
                        </p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-concrete flex">
                        <Link
                          href={`/artikel/${article.slug}`}
                          className="font-barlow font-bold text-xs uppercase tracking-wider text-royal hover:text-navy flex items-center gap-1 transition-colors"
                        >
                          Baca Selengkapnya
                          <span>&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-2">
              {page > 1 && (
                <Link
                  href={`/artikel?page=${page - 1}`}
                  className="px-5 py-2.5 text-xs font-bold bg-white border border-concrete text-navy hover:border-royal hover:text-royal transition-all rounded-[4px] uppercase tracking-widest"
                >
                  &larr; Sebelumnya
                </Link>
              )}
              <div className="px-5 py-2.5 text-xs font-bold text-iron bg-offwhite border border-concrete rounded-[4px] uppercase tracking-widest">
                Hal {page} / {totalPages}
              </div>
              {page < totalPages && (
                <Link
                  href={`/artikel?page=${page + 1}`}
                  className="px-5 py-2.5 text-xs font-bold bg-white border border-concrete text-navy hover:border-royal hover:text-royal transition-all rounded-[4px] uppercase tracking-widest"
                >
                  Selanjutnya &rarr;
                </Link>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
