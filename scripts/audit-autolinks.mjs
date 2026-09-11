/**
 * Show every link the auto-linker inserted, with its surrounding sentence.
 *
 * Automatic linking is only worth having if each link is one a person would
 * have written by hand, so this prints them for reading rather than counting
 * them. A wrong link inside a sentence is more damaging than a missing one.
 *
 *   node scripts/audit-autolinks.mjs [baseUrl]
 */
const BASE = (process.argv[2] ?? "http://localhost:3100").replace(/\/$/, "");

async function pool(items, worker, n = 8) {
  const out = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(n, items.length) }, async () => {
      while (i < items.length) {
        const idx = i++;
        out[idx] = await worker(items[idx]);
      }
    }),
  );
  return out;
}

/** Links inside the rendered prose block, with a little context either side. */
function proseLinks(html) {
  const found = [];
  // The prose block, as rendered (not the RSC payload that follows it).
  const block = /class="prose-content[^"]*">([\s\S]*?)<\/div>/.exec(html)?.[1];
  if (!block) return found;
  for (const m of block.matchAll(/<a\s[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const before = block
      .slice(Math.max(0, m.index - 90), m.index)
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ");
    const after = block
      .slice(m.index + m[0].length, m.index + m[0].length + 60)
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ");
    found.push({
      href: m[1],
      text: m[2].replace(/<[^>]+>/g, "").trim(),
      before: before.trim(),
      after: after.trim(),
    });
  }
  return found;
}

async function main() {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (m) => new URL(m[1]).pathname.replace(/\/$/, "") || "/",
  );

  const results = await pool(paths, async (p) => {
    try {
      const r = await fetch(`${BASE}${p === "/" ? "" : p}`);
      if (!r.ok) return { path: p, links: [] };
      return { path: p, links: proseLinks(await r.text()) };
    } catch {
      return { path: p, links: [] };
    }
  });

  const withLinks = results.filter((r) => r.links.length);
  const total = results.reduce((s, r) => s + r.links.length, 0);

  console.log(`Auto-links across ${paths.length} pages\n${"=".repeat(72)}`);
  console.log(`${total} links in prose, on ${withLinks.length} pages\n`);

  // Anything linked from a lowercase word would be a false positive.
  const suspicious = results.flatMap((r) =>
    r.links
      .filter((l) => l.text && l.text[0] === l.text[0].toLowerCase())
      .map((l) => ({ ...l, path: r.path })),
  );
  if (suspicious.length) {
    console.log(`!! ${suspicious.length} links anchored on a lowercase word:`);
    for (const s of suspicious.slice(0, 20)) {
      console.log(`   ${s.path}  "${s.text}" -> ${s.href}`);
    }
    console.log();
  } else {
    console.log("No link is anchored on a lowercase word.\n");
  }

  // Self-links would be a bug.
  const self = results.flatMap((r) =>
    r.links.filter((l) => l.href.replace(/^\/en/, "") === r.path).map((l) => ({ ...l, path: r.path })),
  );
  console.log(self.length ? `!! ${self.length} self-links` : "No self-links.");
  console.log();

  console.log("Sample, with context:");
  console.log("-".repeat(72));
  const flat = results.flatMap((r) => r.links.map((l) => ({ ...l, path: r.path })));
  for (const l of flat.slice(0, 22)) {
    console.log(`  ${l.path}`);
    console.log(`    …${l.before.slice(-58)} [${l.text}] ${l.after.slice(0, 34)}…`);
    console.log(`    -> ${l.href}`);
  }

  console.log("\nMost-linked targets:");
  console.log("-".repeat(72));
  const counts = new Map();
  for (const l of flat) counts.set(l.href, (counts.get(l.href) ?? 0) + 1);
  for (const [href, n] of [...counts].sort((a, b) => b[1] - a[1]).slice(0, 12)) {
    console.log(`  ${String(n).padStart(3)}  ${href}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
