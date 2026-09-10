/**
 * Import the site owner's own photographs.
 *
 * Drop full-size files in the repository root (or image-sources/) named after
 * the slug they belong to — extra words after the slug are ignored, so
 * "agios-dimitrios Ναός Αγίου Δημητρίου.jpeg" is fine. This moves the original
 * into image-sources/ for safekeeping, writes a compressed WebP to
 * public/photos/<slug>.webp, and prints the slugs it handled so they can be
 * wired into the content files.
 *
 *   node scripts/import-own-photos.mjs [--apply]
 */
import { readdir, mkdir, rename, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "image-sources");
const OUT_DIR = path.join(ROOT, "public", "photos");
const apply = process.argv.includes("--apply");

/** Slugs the site knows about, so a mistyped filename is caught not guessed. */
const KNOWN = new Set([
  "white-tower", "rotunda", "arch-of-galerius", "roman-forum", "agios-dimitrios",
  "hagia-sophia", "panagia-chalkeon", "acheiropoietos", "vlatadon-monastery",
  "byzantine-walls", "heptapyrgion", "aristotelous-square", "nea-paralia",
  "archaeological-museum", "museum-of-byzantine-culture",
  "vergina", "mount-olympus", "edessa", "meteora", "chalkidiki",
]);

/** Greek filenames are common here, so match on a transliterated form too. */
const GREEK_ALIASES = {
  "ροτοντα": "rotunda",
  "ροτόντα": "rotunda",
  "αριστοτελους": "aristotelous-square",
  "αριστοτέλους": "aristotelous-square",
  "αψιδα του γαλεριου": "arch-of-galerius",
  "αψίδα του γαλερίου": "arch-of-galerius",
  "λευκος πυργος": "white-tower",
  "λευκός πύργος": "white-tower",
  "αρχαια αγορα": "roman-forum",
  "αρχαία αγορά": "roman-forum",
  "επταπυργιο": "heptapyrgion",
  "επταπύργιο": "heptapyrgion",
  "βυζαντινα τειχη": "byzantine-walls",
  "βυζαντινά τείχη": "byzantine-walls",
  "νεα παραλια": "nea-paralia",
  "νέα παραλία": "nea-paralia",
  "μονη βλαταδων": "vlatadon-monastery",
  "μονή βλατάδων": "vlatadon-monastery",
};

function slugFor(filename) {
  const base = filename.replace(/\.[^.]+$/, "");
  // A leading known slug wins ("agios-dimitrios Ναός …").
  const lead = base.toLowerCase().match(/^[a-z0-9-]+/)?.[0] ?? "";
  for (const known of KNOWN) {
    if (lead === known || lead.startsWith(known + "-") || lead === known.replace(/-/g, "")) {
      return known;
    }
  }
  const norm = base.toLowerCase().normalize("NFC").trim();
  if (GREEK_ALIASES[norm]) return GREEK_ALIASES[norm];
  for (const [gr, slug] of Object.entries(GREEK_ALIASES)) {
    if (norm.startsWith(gr)) return slug;
  }
  return null;
}

async function main() {
  await mkdir(SRC_DIR, { recursive: true });
  await mkdir(OUT_DIR, { recursive: true });

  const candidates = [];
  for (const dir of [ROOT, SRC_DIR]) {
    for (const f of await readdir(dir)) {
      if (!/\.(jpe?g|png|webp|avif)$/i.test(f)) continue;
      const full = path.join(dir, f);
      const s = await stat(full);
      if (!s.isFile()) continue;
      candidates.push({ dir, file: f, full });
    }
  }

  const done = [];
  const skipped = [];

  for (const { dir, file, full } of candidates) {
    const slug = slugFor(file);
    if (!slug) {
      if (dir === ROOT) skipped.push(file);
      continue;
    }

    const meta = await sharp(full).metadata();
    // Read the original's size before it is moved out from under us.
    const wasKb = Math.round((await stat(full)).size / 1024);
    // Step the quality down until the file is a sensible weight; photographs
    // vary far too much for one setting to serve them all.
    let out;
    for (const quality of [80, 72, 64, 56]) {
      out = await sharp(full)
        .rotate() // honour EXIF orientation before stripping it
        .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
        .webp({ quality })
        .toBuffer();
      if (out.length <= 220_000) break;
    }

    const outPath = path.join(OUT_DIR, `${slug}.webp`);
    if (apply) {
      await writeFile(outPath, out);
      if (dir === ROOT) {
        await rename(full, path.join(SRC_DIR, file));
      }
    }
    done.push({
      slug,
      file,
      from: `${meta.width}x${meta.height}`,
      kb: Math.round(out.length / 1024),
      wasKb,
    });
  }

  done.sort((a, b) => a.slug.localeCompare(b.slug));
  console.log(`${apply ? "Imported" : "Would import"} ${done.length} photo(s):\n`);
  for (const d of done) {
    console.log(
      `  ${d.slug.padEnd(24)} ${d.from.padEnd(11)} ${String(d.wasKb).padStart(5)}KB -> ${String(d.kb).padStart(4)}KB`,
    );
  }
  if (skipped.length) {
    console.log(`\nNot recognised (left alone):`);
    for (const s of skipped) console.log(`  ! ${s}`);
  }
  if (!apply) console.log("\nDry run — pass --apply to write.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
