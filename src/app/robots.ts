import { MetadataRoute } from "next";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  let baseUrl = "https://mgs.my.id";
  try {
    const headersList = await headers();
    const host = headersList.get("host");
    if (host) {
      const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
      const proto = isLocal ? "http" : "https";
      baseUrl = `${proto}://${host}`;
    }
  } catch (e) {
    console.error("Failed to read headers for robots:", e);
    if (process.env.NEXT_PUBLIC_SITE_URL) {
      baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    }
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"], // Block admin panel and API routes from search crawlers
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
