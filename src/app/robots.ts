import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      // `/*?*` below keeps query-driven duplicates out of the index, and it
      // also matches `/_next/image?url=…`, which is how every optimised
      // photograph on this site is served. Naming those routes explicitly
      // wins, because a more specific Allow beats a broader Disallow —
      // without it Googlebot is refused every image the site has.
      allow: ["/", "/_next/image", "/_next/static"],
      // Guard against accidental indexing of internal/query-driven routes.
      disallow: ["/api/", "/*?*", "/list/", "/dashboard/", "/admin/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
