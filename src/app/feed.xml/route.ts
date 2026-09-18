import { getGuides } from "@/lib/repo";
import { site, absoluteUrl } from "@/lib/site";
import { pick } from "@/lib/types";
import { guideHref } from "@/lib/links";

/**
 * An Atom feed of the guides.
 *
 * The site had no feed at all, which meant the one kind of content here that
 * is genuinely periodical — the editorial guides — had no way of reaching
 * anyone who had not already arrived. A feed is the cheapest distribution a
 * site can have: readers subscribe, aggregators pick it up, and none of that
 * depends on a search engine deciding the domain is worth crawling yet.
 *
 * Guides only. Listings and metro stations are reference pages that get
 * revised rather than published, and a feed that re-announces them every time
 * a fare changes is a feed people unsubscribe from.
 */

export const dynamic = "force-static";
export const revalidate = 3600;

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Atom wants a full timestamp; the records carry a date. */
function stamp(date: string): string {
  const d = new Date(date);
  return Number.isNaN(d.getTime())
    ? new Date().toISOString()
    : d.toISOString();
}

export async function GET() {
  const locale = site.defaultLocale;
  const guides = [...getGuides()].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  );

  const self = `${site.url}/feed.xml`;
  const updated = guides.length ? stamp(guides[0].updatedAt) : new Date().toISOString();

  const entries = guides
    .map((g) => {
      const url = absoluteUrl(locale, guideHref(g));
      return `  <entry>
    <title>${esc(pick(g.title, locale))}</title>
    <link href="${esc(url)}"/>
    <id>${esc(url)}</id>
    <published>${stamp(g.publishedAt)}</published>
    <updated>${stamp(g.updatedAt)}</updated>
    <author><name>${esc(g.author)}</name></author>
    <summary type="text">${esc(pick(g.excerpt, locale))}</summary>
  </entry>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${locale}">
  <title>${esc(site.name)}</title>
  <subtitle>${esc(
    locale === "el"
      ? "Οδηγοί και ιστορίες για τη Θεσσαλονίκη"
      : "Guides and stories about Thessaloniki",
  )}</subtitle>
  <link href="${esc(self)}" rel="self" type="application/atom+xml"/>
  <link href="${esc(site.url)}" rel="alternate" type="text/html"/>
  <id>${esc(site.url)}/</id>
  <updated>${updated}</updated>
${entries}
</feed>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
