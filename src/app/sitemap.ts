import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";
import { SITE_URL as baseUrl, absoluteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

// Tanggal revisi terakhir halaman statis (perbarui saat kontennya benar-benar berubah).
// Jangan pakai new Date(): tanggal yang selalu berubah membuat Google mengabaikan lastmod.
const STATIC_LAST_MODIFIED = new Date("2026-11-12");

const latest = (dates: Date[], fallback = STATIC_LAST_MODIFIED) =>
  dates.length ? new Date(Math.max(...dates.map((d) => d.getTime()))) : fallback;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let productEntries: MetadataRoute.Sitemap = [];
  let productDates: Date[] = [];
  try {
    const products = await prisma.product.findMany({
      select: { slug: true, updatedAt: true },
    });
    productDates = products.map((p) => p.updatedAt);
    productEntries = products.map((p) => ({
      url: `${baseUrl}/produk/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Failed to fetch products for sitemap:", error);
  }

  let articleEntries: MetadataRoute.Sitemap = [];
  let articleDates: Date[] = [];
  try {
    const articles = await prisma.article.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true, coverImage: true },
      orderBy: { createdAt: "desc" },
    });
    articleDates = articles.map((a) => a.updatedAt);
    articleEntries = articles.map((a) => ({
      url: `${baseUrl}/artikel/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
      ...(a.coverImage ? { images: [absoluteUrl(a.coverImage)] } : {}),
    }));
  } catch (error) {
    console.error("Failed to fetch articles for sitemap:", error);
  }

  return [
    {
      url: baseUrl,
      lastModified: latest([...productDates, ...articleDates]),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/produk`,
      lastModified: latest(productDates),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/grosir`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/artikel`,
      lastModified: latest(articleDates),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tentang`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/kontak`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...productEntries,
    ...articleEntries,
  ];
}
