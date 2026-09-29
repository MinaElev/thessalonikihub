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

  /*
   * The brand suffix is a nicety; the page's own words are the point.
   *
   * Google renders about 60 characters of a title and drops the rest, so on
   * a long one "| ThessalonikiHub" was spending seventeen of them on a name
   * that got truncated away anyway — the film festival page read
   * "Thessaloniki International Film Festival — what it is, when and where |
   * Thessalo". Append it only when it fits.
   *
   * A title that already opens with the site name never gets it twice: the
   * homepage carries its own tagline after the name.
   */
  const fullTitle = title.startsWith(site.name)
    ? title
    : `${title} | ${site.name}`.length <= 60
      ? `${title} | ${site.name}`
      : title;

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
    // Every page declares the feed. It has to live here rather than in the
    // layout: a page's own `alternates` replaces the layout's wholesale, so a
    // feed declared once at the root is dropped from every page below it.
    alternates: {
      canonical,
      languages,
      types: { "application/atom+xml": `${site.url}/feed.xml` },
    },
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

/**
 * A meta description of a useful length, built from text the page already
 * shows.
 *
 * Google renders about 155 characters of it and a search result is often the
 * only sentence anyone reads before deciding whether to click. Ninety-seven
 * pages here were handing it a fragment — `/for/families` offered the whole
 * of "Θεσσαλονίκη με παιδιά.", twenty-two characters, and the rest of the
 * snippet was filled by Google with whatever it scraped.
 *
 * The first part is always kept whole, even when it is long; later parts are
 * added only while they fit, and a part that would overflow is cut at the
 * last sentence that fits rather than mid-word. Nothing is invented to pad
 * the length — a short description is better than a padded one, so a page
 * with only a short line to give keeps it.
 */
export function composeDescription(
  parts: (string | null | undefined)[],
  max = 155,
): string {
  const clean = (s: string) =>
    s
      // Strip the markdown these intros are written in: ** for bold, [text](href)
      // for links. A description is plain text and renders the asterisks
      // literally otherwise.
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*_`#>]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const usable = parts.filter((p): p is string => Boolean(p?.trim())).map(clean);
  if (!usable.length) return "";

  // Compare on letters and digits alone, so a blurb ending in "." and an
  // intro opening with the same words still count as the same sentence.
  const norm = (s: string) =>
    s.toLowerCase().replace(/[^\p{L}\p{N} ]/gu, "").replace(/\s+/g, " ").trim();
  // ";" is the Greek question mark, so it ends a sentence here.
  const firstSentence = (s: string) => {
    const m = /^[\s\S]*?[.!?;](\s|$)/.exec(s);
    return m ? m[0].trim() : s;
  };

  let out = usable[0];
  for (let part of usable.slice(1)) {
    if (out.length >= max) break;
    /*
     * Several of these intros open by restating the blurb above them, word
     * for word — "Πρώτη φορά στη Θεσσαλονίκη;" then "Πρώτη φορά στη
     * Θεσσαλονίκη; Ξεκίνα από…" — which produced a description that said the
     * same sentence twice. Drop what has already been said and keep the rest.
     */
    const opener = firstSentence(part);
    if (norm(opener) === norm(out)) part = part.slice(opener.length).trimStart();
    if (!part) continue;
    const room = max - out.length - 1;
    if (room < 30) break;
    if (part.length <= room) {
      out = `${out} ${part}`;
      continue;
    }
    /*
     * Prefer to end on a finished sentence. Greek ends a question with ";"
     * and separates clauses with "·", and several of these intros open with
     * a question — checking only for "." left those pages with nothing
     * appended at all, which was the whole problem.
     *
     * Where no sentence ends in the space available, cut at a word boundary
     * and mark it. A description that runs past the limit is truncated by
     * the search engine anyway; the one thing not to do is leave the slot
     * almost empty.
     */
    const head = part.slice(0, room);
    const stop = Math.max(
      ...[". ", "? ", "! ", "; "].map((e) => head.lastIndexOf(e)),
    );
    if (stop > 40) {
      out = `${out} ${head.slice(0, stop + 1).trim()}`;
    } else {
      const word = head.lastIndexOf(" ");
      if (word > 40) out = `${out} ${head.slice(0, word).trim()}…`;
    }
    break;
  }
  return out;
}

/** Serialise a JSON-LD object for injection via a <script> tag. */
export function jsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data);
}
