/**
 * Repoint photos stored in the database at the local copies.
 *
 * Database rows are materialised from the content files when a listing is
 * claimed, so any row created before the photos were downloaded still holds an
 * upload.wikimedia.org URL. Those rows win over the file seed, which is why one
 * of them was still hotlinking after the files were fixed. This also copies in
 * the real author/licence fields, so DB-backed listings attribute properly too.
 *
 *   node scripts/backfill-photo-urls.mjs          # report only
 *   node scripts/backfill-photo-urls.mjs --apply  # write
 */
import { readFile, access } from "node:fs/promises";
import { createHash } from "node:crypto";
import { PrismaClient } from "@prisma/client";

/**
 * The download script names files by a hash of the remote URL, so the mapping
 * can be recomputed here rather than depending on a manifest that only records
 * the most recent run.
 */
async function localFor(remoteUrl) {
  const name = `${createHash("sha1").update(remoteUrl).digest("hex").slice(0, 10)}.webp`;
  try {
    await access(`public/photos/${name}`);
    return `/photos/${name}`;
  } catch {
    return null;
  }
}

const apply = process.argv.includes("--apply");
const prisma = new PrismaClient();

/** slug -> photos[], read back from the content files (the corrected source). */
async function fileCredits() {
  const byUrl = new Map();
  for (const f of ["attractions.ts", "guides.ts", "daytrips.ts"]) {
    let text;
    try {
      text = await readFile(`src/content/data/${f}`, "utf8");
    } catch {
      continue;
    }
    // Each corrected photo block: local url followed by its attribution.
    const re =
      /url: "(\/photos\/[^"]+)",\s*\n\s*alt: \{[^}]*\},\s*\n\s*author: "([^"]*)",\s*\n\s*license: "([^"]*)",(?:\s*\n\s*licenseUrl: "([^"]*)",)?(?:\s*\n\s*sourceUrl: "([^"]*)",)?/g;
    for (const m of text.matchAll(re)) {
      byUrl.set(m[1], {
        author: m[2],
        license: m[3],
        licenseUrl: m[4],
        sourceUrl: m[5],
      });
    }
  }
  return byUrl;
}

async function main() {
  // The content files are the source of truth for attribution once the
  // download script has run; no intermediate manifest is needed.
  const credits = await fileCredits();


  const rows = await prisma.place.findMany({ select: { id: true, slug: true, photos: true } });
  let changed = 0;

  for (const row of rows) {
    const photos = Array.isArray(row.photos) ? row.photos : [];
    if (!photos.length) continue;
    let touched = false;

    const next = [];
    for (const p of photos) {
      if (!p || typeof p !== "object" || typeof p.url !== "string") {
        next.push(p);
        continue;
      }
      let url = p.url;

      // Map a remote URL to its downloaded copy.
      const local = await localFor(url);
      if (local) {
        url = local;
        touched = true;
      }
      if (!url.startsWith("/photos/")) {
        if (url.includes("upload.wikimedia.org")) {
          console.log(`  ! ${row.slug}: no local copy for ${url.slice(0, 70)}…`);
        }
        next.push(p);
        continue;
      }

      const meta = credits.get(url);
      if (!meta) {
        next.push({ ...p, url });
        continue;
      }

      const merged = { ...p, url };
      delete merged.credit;
      if (meta.author) merged.author = meta.author;
      if (meta.license) merged.license = meta.license;
      if (meta.licenseUrl) merged.licenseUrl = meta.licenseUrl;
      if (meta.sourceUrl) merged.sourceUrl = meta.sourceUrl;
      touched = true;
      next.push(merged);
    }

    if (!touched) continue;
    changed++;
    console.log(`${apply ? "FIX " : "WOULD FIX "}${row.slug}`);
    for (const p of next) console.log(`      · ${p.url}  ${p.license ?? ""}`);
    if (apply) {
      await prisma.place.update({ where: { id: row.id }, data: { photos: next } });
    }
  }

  console.log(
    `\n${changed} place row(s) ${apply ? "updated" : "would be updated"}.` +
      (apply ? "" : "\nRe-run with --apply to write."),
  );
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
