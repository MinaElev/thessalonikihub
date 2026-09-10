/**
 * Push the photo arrays from the content files into the matching database rows.
 *
 * The repository merges file content with database rows and the database wins,
 * so a listing that was ever claimed keeps whatever photo its row holds. After
 * changing a photo in the content files, the row has to follow or the site goes
 * on serving the old image.
 *
 *   node scripts/sync-photos-to-db.mjs          # report only
 *   node scripts/sync-photos-to-db.mjs --apply  # write
 */
import { readFile } from "node:fs/promises";
import { PrismaClient } from "@prisma/client";

const apply = process.argv.includes("--apply");
const prisma = new PrismaClient();

/** Parse `slug` -> photos[] straight out of a content file. */
async function photosBySlug(file) {
  const text = await readFile(`src/content/data/${file}`, "utf8");
  const out = new Map();
  const idxs = [...text.matchAll(/slug: "/g)].map((m) => m.index);
  for (let k = 0; k < idxs.length; k++) {
    const chunk = text.slice(idxs[k], idxs[k + 1] ?? text.length);
    const slug = /slug: "([^"]+)"/.exec(chunk)?.[1];
    if (!slug) continue;
    const block = /photos: \[([\s\S]*?)\n {4}\],/.exec(chunk);
    if (!block) continue;

    const photos = [];
    for (const p of block[1].split(/\n\s*\{\s*\n/).slice(1)) {
      const url = /url: "([^"]+)"/.exec(p)?.[1];
      if (!url) continue;
      const altEl = /alt: \{[\s\S]*?el: "((?:[^"\\]|\\.)*)"/.exec(p)?.[1];
      const altEn = /alt: \{[\s\S]*?en: "((?:[^"\\]|\\.)*)"/.exec(p)?.[1];
      const photo = { url, alt: {} };
      if (altEl) photo.alt.el = altEl.replace(/\\"/g, '"');
      if (altEn) photo.alt.en = altEn.replace(/\\"/g, '"');
      for (const field of ["author", "license", "licenseUrl", "sourceUrl", "credit"]) {
        const v = new RegExp(`${field}: "([^"]+)"`).exec(p)?.[1];
        if (v) photo[field] = v;
      }
      photos.push(photo);
    }
    if (photos.length) out.set(slug, photos);
  }
  return out;
}

async function main() {
  const wanted = new Map();
  for (const f of ["attractions.ts", "restaurants.ts", "accommodations.ts", "services.ts"]) {
    for (const [slug, photos] of await photosBySlug(f)) wanted.set(slug, photos);
  }

  const rows = await prisma.place.findMany({ select: { id: true, slug: true, photos: true } });
  let changed = 0;

  for (const row of rows) {
    const next = wanted.get(row.slug);
    if (!next) continue;
    const current = JSON.stringify(row.photos ?? []);
    if (current === JSON.stringify(next)) continue;

    changed++;
    const was = Array.isArray(row.photos) && row.photos[0]?.url ? row.photos[0].url : "(none)";
    console.log(`${apply ? "SYNC " : "WOULD SYNC "}${row.slug}`);
    console.log(`      ${was}`);
    console.log(`   -> ${next[0].url}`);
    if (apply) {
      await prisma.place.update({ where: { id: row.id }, data: { photos: next } });
    }
  }

  console.log(
    `\n${changed} row(s) ${apply ? "updated" : "would be updated"}.` +
      (apply ? "" : "\nRe-run with --apply to write."),
  );
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
