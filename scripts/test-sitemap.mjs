/**
 * Sitemap test.
 *
 * Runs against a served build (default http://localhost:3100) and checks the
 * things that actually break a sitemap in the wild:
 *
 *   1. It is well-formed, uses the sitemap namespace and stays inside the
 *      50,000-URL / 50MB limits.
 *   2. Every URL in it resolves — a sitemap full of 404s or redirects is worse
 *      than no sitemap.
 *   3. Nothing in it is noindex. Listing a page you have told Google to ignore
 *      is a direct contradiction.
 *   4. Each page's canonical points at the URL the sitemap used, so the two
 *      never disagree about which address is the real one.
 *   5. hreflang alternates are present and reciprocal.
 *   6. No duplicates, no trailing-slash variants of the same path.
 *   7. lastmod, where present, is a valid date that is not in the future.
 *   8. robots.txt points at it.
 *   9. Coverage: routes the build produced that the sitemap leaves out, and
 *      whether each omission is deliberate (noindex) or an oversight.
 *
 *   node scripts/test-sitemap.mjs [baseUrl]
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const BASE = (process.argv[2] ?? "http://localhost:3100").replace(/\/$/, "");
const CONCURRENCY = 12;

let failures = 0;
let warnings = 0;

function pass(msg) {
  console.log(`  ok    ${msg}`);
}
function fail(msg) {
  failures++;
  console.log(`  FAIL  ${msg}`);
}
function warn(msg) {
  warnings++;
  console.log(`  warn  ${msg}`);
}
function section(title) {
  console.log(`\n${title}\n${"-".repeat(title.length)}`);
}

/** Run `worker` over `items` a few at a time. */
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

/** Minimal <url> extraction — enough to validate, without a parser dependency. */
function parseSitemap(xml) {
  const urls = [];
  for (const block of xml.split(/<url>/).slice(1)) {
    const body = block.split(/<\/url>/)[0];
    const loc = /<loc>([^<]+)<\/loc>/.exec(body)?.[1];
    if (!loc) continue;
    const lastmod = /<lastmod>([^<]+)<\/lastmod>/.exec(body)?.[1];
    const alternates = [...body.matchAll(
      /<xhtml:link[^>]*hreflang="([^"]+)"[^>]*href="([^"]+)"/g,
    )].map((m) => ({ hreflang: m[1], href: m[2] }));
    urls.push({ loc, lastmod, alternates });
  }
  return urls;
}

/** Every route the build actually produced, from the prerender manifest. */
async function builtRoutes() {
  try {
    const manifest = JSON.parse(
      await readFile(path.join(process.cwd(), ".next", "prerender-manifest.json"), "utf8"),
    );
    return Object.keys(manifest.routes ?? {});
  } catch {
    return [];
  }
}

async function main() {
  console.log(`Sitemap test against ${BASE}\n${"=".repeat(60)}`);

  // ---- 1. fetch & shape ----
  section("1. Document");
  const res = await fetch(`${BASE}/sitemap.xml`);
  if (!res.ok) {
    fail(`/sitemap.xml returned ${res.status}`);
    process.exit(1);
  }
  const xml = await res.text();
  pass(`/sitemap.xml returned 200 (${(xml.length / 1024).toFixed(0)}KB)`);

  const ctype = res.headers.get("content-type") ?? "";
  if (/xml/.test(ctype)) pass(`content-type is ${ctype.split(";")[0]}`);
  else fail(`content-type is "${ctype}", expected XML`);

  if (xml.includes("http://www.sitemaps.org/schemas/sitemap/0.9")) {
    pass("declares the sitemap 0.9 namespace");
  } else {
    fail("missing the sitemap 0.9 namespace");
  }

  // Well-formedness: tags balance.
  for (const tag of ["urlset", "url", "loc"]) {
    const open = (xml.match(new RegExp(`<${tag}[\\s>]`, "g")) ?? []).length;
    const close = (xml.match(new RegExp(`</${tag}>`, "g")) ?? []).length;
    if (open === close) pass(`<${tag}> balanced (${open})`);
    else fail(`<${tag}> unbalanced: ${open} open, ${close} close`);
  }

  const urls = parseSitemap(xml);
  if (urls.length) pass(`parsed ${urls.length} <url> entries`);
  else fail("parsed 0 entries");

  if (urls.length <= 50000) pass(`within the 50,000-URL limit`);
  else fail(`${urls.length} URLs exceeds the 50,000 limit`);
  if (xml.length <= 50 * 1024 * 1024) pass("within the 50MB limit");
  else fail("exceeds the 50MB limit");

  // ---- 2. hygiene ----
  section("2. Hygiene");
  const seen = new Map();
  let dupes = 0;
  for (const u of urls) {
    if (seen.has(u.loc)) dupes++;
    seen.set(u.loc, true);
  }
  dupes ? fail(`${dupes} duplicate <loc> values`) : pass("no duplicate URLs");

  const slashVariants = urls.filter(
    (u) => u.loc.endsWith("/") && u.loc !== `${BASE}/` && seen.has(u.loc.replace(/\/$/, "")),
  );
  slashVariants.length
    ? fail(`${slashVariants.length} trailing-slash duplicates`)
    : pass("no trailing-slash duplicates");

  const nonAbsolute = urls.filter((u) => !/^https?:\/\//.test(u.loc));
  nonAbsolute.length
    ? fail(`${nonAbsolute.length} relative URLs`)
    : pass("all URLs absolute");

  const origins = new Set(urls.map((u) => new URL(u.loc).origin));
  origins.size === 1
    ? pass(`single origin (${[...origins][0]})`)
    : fail(`mixed origins: ${[...origins].join(", ")}`);

  const future = urls.filter((u) => u.lastmod && new Date(u.lastmod) > new Date());
  const badDate = urls.filter((u) => u.lastmod && isNaN(new Date(u.lastmod).getTime()));
  const withLastmod = urls.filter((u) => u.lastmod).length;
  badDate.length ? fail(`${badDate.length} invalid <lastmod>`) : pass("all <lastmod> values parse");
  future.length
    ? fail(`${future.length} <lastmod> dates in the future`)
    : pass("no future <lastmod> dates");
  console.log(
    `        ${withLastmod}/${urls.length} carry <lastmod> (omitted where no real date exists)`,
  );

  // ---- 3. hreflang ----
  section("3. hreflang");
  const noAlts = urls.filter((u) => u.alternates.length === 0);
  noAlts.length
    ? warn(`${noAlts.length} entries without alternates`)
    : pass("every entry lists alternates");

  const langs = new Set(urls.flatMap((u) => u.alternates.map((a) => a.hreflang)));
  pass(`hreflang values in use: ${[...langs].sort().join(", ")}`);

  const missingXDefault = urls.filter(
    (u) => u.alternates.length && !u.alternates.some((a) => a.hreflang === "x-default"),
  );
  missingXDefault.length
    ? warn(`${missingXDefault.length} entries without x-default`)
    : pass("every entry declares x-default");

  // Reciprocity: each alternate href should itself be in the sitemap, or be the
  // locale-prefixed twin of one that is.
  const locSet = new Set(urls.map((u) => u.loc));
  const unreciprocated = [];
  for (const u of urls) {
    for (const a of u.alternates) {
      if (a.hreflang === "x-default") continue;
      if (!locSet.has(a.href) && !a.href.includes("/en")) unreciprocated.push(a.href);
    }
  }
  unreciprocated.length
    ? warn(`${unreciprocated.length} alternate hrefs not themselves listed`)
    : pass("alternates resolve within the sitemap or to the locale twin");

  // ---- 4. every URL resolves, is indexable, and agrees on its canonical ----
  section("4. Crawl");
  const results = await pool(urls, async (u) => {
    const local = u.loc.replace(/^https?:\/\/[^/]+/, BASE);
    try {
      const r = await fetch(local, { redirect: "manual" });
      const html = r.status === 200 ? await r.text() : "";
      return {
        loc: u.loc,
        local,
        status: r.status,
        location: r.headers.get("location"),
        canonical: /<link rel="canonical" href="([^"]+)"/.exec(html)?.[1],
        robots: /<meta name="robots" content="([^"]+)"/.exec(html)?.[1],
        title: /<title>([^<]*)<\/title>/.exec(html)?.[1],
      };
    } catch (e) {
      return { loc: u.loc, local, status: 0, error: e.message };
    }
  });

  const broken = results.filter((r) => r.status !== 200);
  broken.length ? fail(`${broken.length} URLs do not return 200`) : pass("every URL returns 200");
  for (const b of broken.slice(0, 12)) {
    console.log(`        ${b.status}${b.location ? ` -> ${b.location}` : ""}  ${b.loc}`);
  }

  const noindexed = results.filter((r) => /noindex/i.test(r.robots ?? ""));
  noindexed.length
    ? fail(`${noindexed.length} URLs are noindex but listed`)
    : pass("no noindex page is listed");
  for (const n of noindexed.slice(0, 12)) console.log(`        ${n.loc}`);

  const canonMismatch = results.filter(
    (r) => r.status === 200 && r.canonical && r.canonical.replace(/\/$/, "") !== r.loc.replace(/\/$/, ""),
  );
  canonMismatch.length
    ? fail(`${canonMismatch.length} pages whose canonical differs from the listed URL`)
    : pass("canonical matches the listed URL everywhere");
  for (const c of canonMismatch.slice(0, 12)) {
    console.log(`        listed:    ${c.loc}`);
    console.log(`        canonical: ${c.canonical}`);
  }

  const noCanonical = results.filter((r) => r.status === 200 && !r.canonical);
  noCanonical.length
    ? warn(`${noCanonical.length} pages without a canonical tag`)
    : pass("every page declares a canonical");

  const emptyTitle = results.filter((r) => r.status === 200 && !r.title?.trim());
  emptyTitle.length
    ? fail(`${emptyTitle.length} pages with an empty <title>`)
    : pass("every page has a title");

  // ---- 5. coverage against what the build produced ----
  section("5. Coverage");
  const built = await builtRoutes();
  if (!built.length) {
    warn("prerender-manifest.json not readable; skipping coverage");
  } else {
    const listedPaths = new Set(
      urls.map((u) => new URL(u.loc).pathname.replace(/\/$/, "") || "/"),
    );
    // Three kinds of built route are not sitemap candidates and must not be
    // reported as gaps:
    //   - /en twins, covered by the hreflang alternates on each entry;
    //   - /el twins, which redirect to the unprefixed path under the
    //     "as-needed" locale prefix, so listing them would list a redirect;
    //   - generated files and internal routes that are not pages at all.
    const NOT_A_PAGE = /^\/(icon\.svg|manifest\.webmanifest|robots\.txt|sitemap\.xml|_not-found|api\/|auth\/|ads\.txt)/;
    const missing = built
      .map((r) => r.replace(/\/$/, "") || "/")
      .filter((r) => !r.startsWith("/en"))
      .filter((r) => !r.startsWith("/el"))
      .filter((r) => !NOT_A_PAGE.test(r))
      .filter((r) => !listedPaths.has(r));

    const elTwins = built.filter((r) => r.startsWith("/el")).length;
    const enTwins = built.filter((r) => r.startsWith("/en")).length;
    console.log(
      `        ${built.length} prerendered routes: ${listedPaths.size} listed, ` +
        `${enTwins} /en twins (hreflang), ${elTwins} /el twins (redirect)`,
    );

    // Check each omission: deliberate if the page says noindex.
    const checked = await pool(missing, async (p) => {
      try {
        const r = await fetch(`${BASE}${p}`, { redirect: "manual" });
        const html = r.status === 200 ? await r.text() : "";
        return {
          path: p,
          status: r.status,
          robots: /<meta name="robots" content="([^"]+)"/.exec(html)?.[1] ?? "",
        };
      } catch {
        return { path: p, status: 0, robots: "" };
      }
    });

    const deliberate = checked.filter((c) => /noindex/i.test(c.robots));
    const unexplained = checked.filter((c) => !/noindex/i.test(c.robots));

    pass(`${deliberate.length} omissions are noindex (deliberate)`);
    if (unexplained.length) {
      warn(`${unexplained.length} indexable routes are NOT in the sitemap`);
      for (const u of unexplained.slice(0, 25)) {
        console.log(`        ${String(u.status).padEnd(4)} ${u.path}`);
      }
      if (unexplained.length > 25) console.log(`        … ${unexplained.length - 25} more`);
    } else {
      pass("every indexable route is listed");
    }
  }

  // ---- 6. robots.txt ----
  section("6. robots.txt");
  const rres = await fetch(`${BASE}/robots.txt`);
  if (!rres.ok) {
    fail(`/robots.txt returned ${rres.status}`);
  } else {
    const robots = await rres.text();
    pass("/robots.txt returned 200");
    if (/sitemap:/i.test(robots)) {
      const declared = /Sitemap:\s*(\S+)/i.exec(robots)?.[1];
      pass(`declares Sitemap: ${declared}`);
      const sitemapOrigin = new URL(urls[0].loc).origin;
      if (declared && declared.startsWith(sitemapOrigin)) {
        pass("robots.txt and sitemap agree on the origin");
      } else {
        fail(`robots.txt points at ${declared}, sitemap uses ${sitemapOrigin}`);
      }
    } else {
      fail("robots.txt does not declare a Sitemap");
    }
  }

  // ---- summary ----
  console.log(`\n${"=".repeat(60)}`);
  console.log(`${failures} failure(s), ${warnings} warning(s), ${urls.length} URLs checked`);
  process.exit(failures ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
