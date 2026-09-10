import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { site, absoluteUrl } from "@/lib/site";

interface SeoInput {
  locale: Locale;
  /** In-app path WITHOUT locale prefix, e.g. "/stay/thessaloniki". */
  path: string;
  title: string;
  description: string;
  images?: string[];
  /** Set false for filtered/duplicate pages that must not be indexed. */
  index?: boolean;
  type?: "website" | "article";
}

/**
 * Build Next.js Metadata with correct canonical + hreflang alternates.
 *
 * Every page gets a self-referencing canonical and language alternates for all
 * locales, plus x-default → the Greek (default) URL. This is the backbone of
 * the multilingual SEO strategy.
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  images,
  index = true,
  type = "website",
}: SeoInput): Metadata {
  const canonical = absoluteUrl(locale, path);

  const languages: Record<string, string> = {};
  for (const l of site.locales) languages[l] = absoluteUrl(l, path);
  languages["x-default"] = absoluteUrl(site.defaultLocale, path);

  const fullTitle =
    title === site.name ? site.name : `${title} | ${site.name}`;

  // Fall back to the site's default social image when a page has none. This
  // stays a JPEG on purpose — several social scrapers still refuse WebP, while
  // the page itself loads the smaller /hero-thessaloniki.webp.
  const ogImages = (images && images.length ? images : [`${site.url}/hero-thessaloniki.jpg`]).map(
    (url) => (url.startsWith("http") ? url : `${site.url}${url}`),
  );

  return {
    // Absolute title bypasses the root layout's "%s | ThessalonikiHub" template
    // (fullTitle already includes the site name where appropriate).
    title: { absolute: fullTitle },
    description,
    alternates: { canonical, languages },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: site.name,
      locale: locale === "el" ? "el_GR" : "en_US",
      type,
      images: ogImages.map((url) => ({ url })),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ogImages,
    },
  };
}

/** Serialise a JSON-LD object for injection via a <script> tag. */
export function jsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data);
}
