/**
 * Generates a cover image per event category.
 *
 * Imported events arrive with no photograph and we will not take someone
 * else's, so a card, a social preview and a structured-data image all had
 * nothing to show. These are not pictures of the events — they are labelled
 * graphics in the site's own palette, which is the honest thing to put there:
 * a reader sees a category marker, not a photograph implying we were present.
 *
 *   node scripts/build-event-covers.mjs
 *
 * Writes 1200x630 WebP to public/photos/event-<category>.webp — the size
 * Facebook, X and LinkedIn all crop from without letterboxing.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const OUT = "public/photos";
const W = 1200;
const H = 630;

/** Brand tokens from src/app/globals.css, so these belong to the same family. */
const TEAL = { deep: "#06292b", mid: "#136b6d", bright: "#1ca8a6" };
const ACCENT = "#d04921";

/**
 * One per category, each with its own hue position and a mark that reads at
 * thumbnail size. Greek label, because that is the site's default language.
 */
const CATEGORIES = {
  concert: { label: "Συναυλία", hue: 0, mark: "waves" },
  theatre: { label: "Θέατρο", hue: 28, mark: "curtain" },
  dance: { label: "Χορός", hue: 52, mark: "arcs" },
  festival: { label: "Φεστιβάλ", hue: -22, mark: "bunting" },
  screening: { label: "Προβολή", hue: 14, mark: "beam" },
  exhibition: { label: "Έκθεση", hue: 40, mark: "frames" },
  talk: { label: "Ομιλία", hue: -10, mark: "lines" },
  workshop: { label: "Εργαστήρι", hue: 64, mark: "grid" },
  sport: { label: "Αθλητικά", hue: -34, mark: "track" },
  market: { label: "Αγορά", hue: 20, mark: "grid" },
  family: { label: "Για οικογένειες", hue: 46, mark: "arcs" },
  other: { label: "Εκδήλωση", hue: 8, mark: "lines" },
};

/** The decorative mark, drawn large and low-contrast so the label stays first. */
function mark(kind) {
  const stroke = 'stroke="#ffffff" fill="none" stroke-linecap="round" stroke-opacity="0.16"';
  switch (kind) {
    case "waves":
      return Array.from({ length: 7 }, (_, i) => {
        const y = 120 + i * 62;
        return `<path d="M760 ${y} q60 -44 120 0 t120 0 t120 0" ${stroke} stroke-width="14"/>`;
      }).join("");
    case "curtain":
      return Array.from({ length: 6 }, (_, i) => {
        const x = 780 + i * 72;
        return `<path d="M${x} 70 q26 250 0 500" ${stroke} stroke-width="18"/>`;
      }).join("");
    case "arcs":
      return Array.from({ length: 5 }, (_, i) => {
        const r = 90 + i * 68;
        return `<circle cx="1010" cy="330" r="${r}" ${stroke} stroke-width="12"/>`;
      }).join("");
    case "bunting":
      return Array.from({ length: 8 }, (_, i) => {
        const x = 750 + i * 62;
        return `<path d="M${x} 130 l31 78 l31 -78" ${stroke} stroke-width="12"/>`;
      }).join("") + `<path d="M750 130 h496" ${stroke} stroke-width="10"/>`;
    case "beam":
      return `<path d="M760 315 L1240 90 L1240 540 Z" ${stroke} stroke-width="14"/>
              <circle cx="740" cy="315" r="52" ${stroke} stroke-width="14"/>`;
    case "frames":
      return Array.from({ length: 3 }, (_, i) => {
        const x = 770 + i * 150;
        return `<rect x="${x}" y="${170 + (i % 2) * 60}" width="120" height="170" rx="8" ${stroke} stroke-width="12"/>`;
      }).join("");
    case "track":
      return Array.from({ length: 4 }, (_, i) => {
        const inset = i * 40;
        return `<rect x="${740 + inset}" y="${150 + inset}" width="${460 - inset * 2}" height="${330 - inset * 2}" rx="${165 - inset}" ${stroke} stroke-width="12"/>`;
      }).join("");
    case "grid":
      return Array.from({ length: 4 }, (_, r) =>
        Array.from({ length: 4 }, (_, c) =>
          `<rect x="${770 + c * 110}" y="${120 + r * 110}" width="76" height="76" rx="10" ${stroke} stroke-width="10"/>`,
        ).join(""),
      ).join("");
    default:
      return Array.from({ length: 6 }, (_, i) => {
        const y = 150 + i * 66;
        return `<path d="M770 ${y} h${200 + (i % 3) * 120}" ${stroke} stroke-width="16"/>`;
      }).join("");
  }
}

/** Rotate a hex colour's hue, so each category sits at its own point. */
function shiftHue(hex, deg) {
  const n = parseInt(hex.slice(1), 16);
  let [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => v / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
  }
  h = (h * 60 + deg + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  const t = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x]
    : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return "#" + t.map((v) => Math.round((v + m) * 255).toString(16).padStart(2, "0")).join("");
}

function svg({ label, hue, mark: markKind }) {
  const from = shiftHue(TEAL.deep, hue);
  const to = shiftHue(TEAL.mid, hue);
  const glow = shiftHue(TEAL.bright, hue);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.78" cy="0.4" r="0.6">
      <stop offset="0" stop-color="${glow}" stop-opacity="0.42"/>
      <stop offset="1" stop-color="${glow}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  ${mark(markKind)}
  <rect x="80" y="238" width="64" height="7" rx="3.5" fill="${ACCENT}"/>
  <text x="80" y="330" font-family="Inter, 'Segoe UI', Helvetica, Arial, sans-serif"
        font-size="76" font-weight="800" letter-spacing="-1.6" fill="#ffffff">${label}</text>
  <text x="80" y="386" font-family="Inter, 'Segoe UI', Helvetica, Arial, sans-serif"
        font-size="26" font-weight="500" fill="#ffffff" fill-opacity="0.72">στη Θεσσαλονίκη</text>
  <text x="80" y="556" font-family="Inter, 'Segoe UI', Helvetica, Arial, sans-serif"
        font-size="23" font-weight="700" letter-spacing="0.4" fill="#ffffff" fill-opacity="0.86">ThessalonikiHub</text>
</svg>`;
}

await mkdir(OUT, { recursive: true });

let total = 0;
for (const [key, config] of Object.entries(CATEGORIES)) {
  const file = `${OUT}/event-${key}.webp`;
  const info = await sharp(Buffer.from(svg(config)))
    .webp({ quality: 82 })
    .toFile(file);
  console.log(`  ${file.padEnd(42)} ${String(Math.round(info.size / 1024)).padStart(3)} KB  ${config.label}`);
  total += info.size;
}
console.log(`\n  ${Object.keys(CATEGORIES).length} covers, ${Math.round(total / 1024)} KB total`);
