import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Guard against accidental indexing of internal/query-driven routes.
      disallow: ["/api/", "/*?*"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
