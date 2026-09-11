/**
 * Internal-link audit.
 *
 * Crawls every URL in the sitemap and measures the link graph, separating two
 * kinds of link that matter very differently:
 *
 *   - Template links (header, footer, nav) appear on nearly every page. They
 *     make a page reachable, but they carry the same signal everywhere and say
 *     nothing about what a particular page is about.
 *   - Contextual links sit inside the page's own prose. These are the ones that
 *     tell a search engine "this page is about that thing", and the ones a
 *     reader actually follows mid-sentence.
 *
 * A page can look well linked while having no contextual links at all, which is
 * why the two are counted apart.
 *
 *   node scripts/audit-internal-links.mjs [baseUrl]
 */
const BASE = (process.argv[2] ?? "https://thessalonikihub.gr").replace(/\/$/, "");
const CONCURRENCY = 8;

async function pool(items, worker) {
  const out = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
      while (i < items.length) {
        const idx = i++;
        out[idx] = await worker(items[idx]);
      }
    }),
  );
  return out;
}

/** Links inside <main>, minus anything in a <nav>. */
function extractLinks(html) {
  const main = /<main[^>]*>([\s\S]*)<\/main>/i.exec(html)?.[1] ?? html;
  const body = main.replace(/<nav[\s\S]*?<\/nav>/gi, "");

  const all = [...body.matchAll(/<a\s[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)].map((m) => ({
    href: m[1],
    text: m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
  }));

  // A prose link sits inside a <p> or an <li> that is not a card. Cards wrap
  // the whole tile in one <a>, which is navigation by another name.
  const prose = [];
  for (const m of body.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
    for (const a of m[1].matchAll(/<a\s[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)) {
      prose.push({
        href: a[1],
        text: a[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
      });
    }
  }
  return { all, prose };
}

function normalise(href) {
  if (!href) return null;
  if (/^(https?:)?\/\//i.test(href)) {
    try {
      const u = new URL(href, BASE);
      if (u.host !== new URL(BASE).host) return null; // external
      return u.pathname.replace(/\/$/, "") || "/";
    } catch {
      return null;
    }
  }
  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return null;
  if (!href.startsWith("/")) return null;
  return href.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
}

async function main() {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1]).pathname.replace(/\/$/, "") || "/");

  console.log(`Internal-link audit of ${BASE}\n${"=".repeat(62)}`);
  console.log(`Crawling ${paths.length} pages…\n`);

  const pages = await pool(paths, async (p) => {
    try {
      const r = await fetch(`${BASE}${p === "/" ? "" : p}`);
      if (!r.ok) return { path: p, status: r.status, all: [], prose: [] };
      const html = await r.text();
      const { all, prose } = extractLinks(html);
      return {
        path: p,
        status: 200,
        all: [...new Set(all.map((l) => normalise(l.href)).filter(Boolean))],
        prose: prose
          .map((l) => ({ to: normalise(l.href), text: l.text }))
          .filter((l) => l.to),
        words: (html.match(/>([^<]{40,})</g) ?? []).join(" ").split(/\s+/).length,
      };
    } catch (e) {
      return { path: p, status: 0, all: [], prose: [], error: e.message };
    }
  });

  const known = new Set(paths);

  // How often does each link target appear? A target on nearly every page is a
  // template link, not a contextual one.
  const appearsOn = new Map();
  for (const pg of pages) {
    for (const to of pg.all) appearsOn.set(to, (appearsOn.get(to) ?? 0) + 1);
  }
  const templateThreshold = Math.floor(pages.length * 0.8);
  const templateTargets = new Set(
    [...appearsOn].filter(([, n]) => n >= templateThreshold).map(([t]) => t),
  );

  // Inbound contextual links per page.
  const inbound = new Map(paths.map((p) => [p, new Set()]));
  const proseInbound = new Map(paths.map((p) => [p, new Set()]));
  for (const pg of pages) {
    for (const to of pg.all) {
      if (templateTargets.has(to)) continue;
      if (inbound.has(to) && to !== pg.path) inbound.get(to).add(pg.path);
    }
    for (const l of pg.prose) {
      if (proseInbound.has(l.to) && l.to !== pg.path) proseInbound.get(l.to).add(pg.path);
    }
  }

  const failed = pages.filter((p) => p.status !== 200);
  if (failed.length) console.log(`!! ${failed.length} pages failed to fetch\n`);

  console.log("Link volume");
  console.log("-".repeat(62));
  const totalAll = pages.reduce((s, p) => s + p.all.length, 0);
  const totalProse = pages.reduce((s, p) => s + p.prose.length, 0);
  console.log(`  links inside <main>, excluding <nav>   ${totalAll}`);
  console.log(`  of those, inside body prose (<p>)      ${totalProse}`);
  console.log(`  template targets (on >=80% of pages)   ${templateTargets.size}`);
  console.log(
    `  median links per page                  ${
      [...pages.map((p) => p.all.length)].sort((a, b) => a - b)[Math.floor(pages.length / 2)]
    }`,
  );
  console.log(
    `  median PROSE links per page            ${
      [...pages.map((p) => p.prose.length)].sort((a, b) => a - b)[Math.floor(pages.length / 2)]
    }`,
  );

  console.log("\nPages with no contextual inbound links (orphans)");
  console.log("-".repeat(62));
  const orphans = paths.filter((p) => p !== "/" && inbound.get(p).size === 0);
  if (!orphans.length) console.log("  none — every page is linked from somewhere other than the nav");
  for (const o of orphans.slice(0, 30)) console.log(`  ${o}`);
  if (orphans.length > 30) console.log(`  … ${orphans.length - 30} more`);
  console.log(`  total: ${orphans.length}`);

  console.log("\nPages with no inbound PROSE link");
  console.log("-".repeat(62));
  const noProse = paths.filter((p) => p !== "/" && proseInbound.get(p).size === 0);
  console.log(`  ${noProse.length} of ${paths.length} pages are never linked from inside a sentence`);

  console.log("\nPages with the fewest outgoing links");
  console.log("-".repeat(62));
  for (const pg of [...pages].sort((a, b) => a.all.length - b.all.length).slice(0, 12)) {
    console.log(`  ${String(pg.all.length).padStart(3)} out, ${String(pg.prose.length).padStart(2)} in prose   ${pg.path}`);
  }

  console.log("\nMost linked-to pages (contextual only)");
  console.log("-".repeat(62));
  for (const [p, set] of [...inbound].sort((a, b) => b[1].size - a[1].size).slice(0, 10)) {
    console.log(`  ${String(set.size).padStart(3)} inbound   ${p}`);
  }

  console.log("\nSample of real prose links found");
  console.log("-".repeat(62));
  const samples = pages.flatMap((p) => p.prose.map((l) => `${p.path}  ->  ${l.to}   "${l.text.slice(0, 40)}"`));
  for (const s of samples.slice(0, 10)) console.log(`  ${s}`);
  if (!samples.length) console.log("  none found");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
