import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mgs.my.id";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/mgs-admin/", "/api/"], // Block admin panel and API routes from search crawlers
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
