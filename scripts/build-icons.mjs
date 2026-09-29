/**
 * Raster icons, rendered from src/app/icon.svg.
 *
 * An SVG icon covers modern browser tabs and nothing else. Every browser
 * still asks for /favicon.ico whether or not one is declared, iOS asks for
 * an apple-touch-icon before it will use anything better, and an installable
 * web app needs real PNG sizes in its manifest — all three were 404s on
 * every page load, and saving the site to an iPhone home screen produced a
 * blank tile.
 *
 * Next.js file conventions do the wiring: src/app/favicon.ico,
 * src/app/apple-icon.png and src/app/icon.png are picked up automatically.
 * The manifest points at the /icons/*.png written here.
 *
 *   node scripts/build-icons.mjs
 */
import sharp from "sharp";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const SRC = "src/app/icon.svg";
const svg = await readFile(SRC);

/** Density high enough that the 64px artboard renders crisply at 512. */
const render = (size) =>
  sharp(svg, { density: 512 }).resize(size, size, { fit: "contain" }).png();

// The App Router conventions.
await render(180).toFile("src/app/apple-icon.png");
await render(32).toFile("src/app/icon.png");

/*
 * A real .ico, not a PNG renamed. Old Windows browsers and several crawlers
 * read the header, and a 16+32+48 stack is what they expect. Built by hand
 * because sharp has no ICO encoder: the format is a 6-byte header, one
 * 16-byte directory entry per image, then the images themselves — PNG-inside-
 * ICO is valid and has been since Vista.
 */
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => render(s).toBuffer()));

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // 1 = icon
header.writeUInt16LE(sizes.length, 4);

let offset = 6 + 16 * sizes.length;
const entries = sizes.map((size, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(size === 256 ? 0 : size, 0); // width, 0 means 256
  e.writeUInt8(size === 256 ? 0 : size, 1); // height
  e.writeUInt8(0, 2); // palette size, 0 for truecolour
  e.writeUInt8(0, 3); // reserved
  e.writeUInt16LE(1, 4); // colour planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(pngs[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += pngs[i].length;
  return e;
});

await writeFile("src/app/favicon.ico", Buffer.concat([header, ...entries, ...pngs]));

// Manifest icons: maskable so Android crops them to its own shape without
// clipping the letter, plus the plain sizes installers look for.
await mkdir("public/icons", { recursive: true });
for (const size of [192, 512]) {
  await render(size).toFile(`public/icons/icon-${size}.png`);
}

console.log("  src/app/favicon.ico        16+32+48");
console.log("  src/app/apple-icon.png     180x180");
console.log("  src/app/icon.png           32x32");
console.log("  public/icons/icon-192.png  192x192");
console.log("  public/icons/icon-512.png  512x512");
