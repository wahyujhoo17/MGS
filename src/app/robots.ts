import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mgsjayaabadi.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"], // Block admin panel and API routes from search crawlers
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
