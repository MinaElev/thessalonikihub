/**
 * Download the Wikimedia Commons photos used by the site and record their real
 * licence terms.
 *
 * Two problems this solves. Hotlinking upload.wikimedia.org gets rate-limited
 * (observed: HTTP 429 on the White Tower, the homepage's lead image), and
 * CC BY-SA requires naming the author, the licence and the source — none of
 * which the site had. Every field written here comes from the Commons API;
 * nothing is inferred, and a file whose metadata cannot be read is reported
 * rather than guessed at.
 *
 *   node scripts/fetch-photo-credits.mjs
 *
 * Writes WebP files to public/photos/ and a run log to
 * src/content/data/photo-credits.json (gitignored). The applied values live
 * inline in the content files, which are the source of truth afterwards.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public", "photos");
const MANIFEST = path.join(ROOT, "src", "content", "data", "photo-credits.json");
const API = "https://commons.wikimedia.org/w/api.php";
const UA = "ThessalonikiHub/1.0 (https://thessalonikihub.gr; site image attribution)";

/** Pull every upload.wikimedia.org URL out of the content files. */
async function collectUrls() {
  const files = [
    "attractions.ts",
    "restaurants.ts",
    "accommodations.ts",
    "services.ts",
    "daytrips.ts",
    "guides.ts",
  ];
  const urls = new Set();
  for (const f of files) {
    let text;
    try {
      text = await readFile(path.join(ROOT, "src", "content", "data", f), "utf8");
    } catch {
      continue;
    }
    for (const m of text.matchAll(/https:\/\/upload\.wikimedia\.org\/[^"'\s]+/g)) {
      urls.add(m[0]);
    }
  }
  return [...urls];
}

/**
 * Recover the Commons file title from an image URL. Thumbnail URLs repeat the
 * file name in the path, so the segment before a "NNNpx-" prefix is the source.
 */
function fileTitleFromUrl(url) {
  const parts = new URL(url).pathname.split("/");
  const last = decodeURIComponent(parts[parts.length - 1]);
  const isThumb = parts.includes("thumb");
  const name = isThumb ? decodeURIComponent(parts[parts.length - 2]) : last;
  return `File:${name}`;
}

/** Strip the HTML Commons returns inside its metadata fields. */
function plain(html) {
  if (!html) return undefined;
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim() || undefined;
}

async function fetchMeta(title) {
  const params = new URLSearchParams({
    action: "query",
    titles: title,
    prop: "imageinfo",
    iiprop: "extmetadata|url",
    format: "json",
    origin: "*",
  });
  const res = await fetch(`${API}?${params}`, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`API ${res.status} for ${title}`);
  const data = await res.json();
  const pages = data?.query?.pages ?? {};
  const page = Object.values(pages)[0];
  const info = page?.imageinfo?.[0];
  if (!info) throw new Error(`no imageinfo for ${title}`);
  const em = info.extmetadata ?? {};
  return {
    author: plain(em.Artist?.value),
    license: plain(em.LicenseShortName?.value),
    licenseUrl: plain(em.LicenseUrl?.value),
    sourceUrl: info.descriptionurl,
  };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const urls = await collectUrls();
  console.log(`Found ${urls.length} Wikimedia URLs`);

  const manifest = {};
  const problems = [];

  for (const url of urls) {
    const title = fileTitleFromUrl(url);
    const slug = createHash("sha1").update(url).digest("hex").slice(0, 10);
    const outName = `${slug}.webp`;
    try {
      const meta = await fetchMeta(title);
      if (!meta.author || !meta.license) {
        problems.push(`${title}: missing author or licence — NOT written`);
        continue;
      }

      const img = await fetch(url, { headers: { "User-Agent": UA } });
      if (!img.ok) throw new Error(`download ${img.status}`);
      const buf = Buffer.from(await img.arrayBuffer());

      // Bound both dimensions: capping width alone left a tall portrait at
      // 1600x2482. Photographs also vary
      // enormously in how well they compress, so step the quality down until
      // the file is a reasonable weight rather than trusting one setting.
      let out;
      for (const quality of [78, 68, 58, 50]) {
        out = await sharp(buf)
          .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
          .webp({ quality })
          .toBuffer();
        if (out.length <= 220_000) break;
      }
      await writeFile(path.join(OUT_DIR, outName), out);

      manifest[url] = {
        localUrl: `/photos/${outName}`,
        author: meta.author,
        license: meta.license,
        licenseUrl: meta.licenseUrl,
        sourceUrl: meta.sourceUrl,
        bytes: out.length,
      };
      console.log(`  ✓ ${outName}  ${(out.length / 1024).toFixed(0)}KB  ${meta.license}  ${meta.author.slice(0, 48)}`);
    } catch (e) {
      problems.push(`${title}: ${e.message}`);
    }
    // Be a considerate API client.
    await new Promise((r) => setTimeout(r, 400));
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`\nWrote ${Object.keys(manifest).length} entries to ${path.relative(ROOT, MANIFEST)} (run log)`);
  if (problems.length) {
    console.log(`\n${problems.length} need attention:`);
    for (const p of problems) console.log(`  ! ${p}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
