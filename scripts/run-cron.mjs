/**
 * Triggers the scheduled event import by hand.
 *
 *   node scripts/run-cron.mjs            # against production
 *   node scripts/run-cron.mjs local      # against http://localhost:3000
 *
 * Exists because calling it directly is awkward: on Windows `curl` is a
 * PowerShell alias for Invoke-WebRequest, which wants a hashtable rather than
 * a -H string, and CRON_SECRET lives in Vercel rather than the shell. This
 * reads the secret the same way the app does and prints what came back.
 */
import { config } from "dotenv";
import { existsSync } from "node:fs";

// .env.local first: that is where `vercel env pull` writes production values.
for (const file of [".env.local", ".env"]) {
  if (existsSync(file)) config({ path: file, override: false });
}

const secret = process.env.CRON_SECRET;
if (!secret) {
  console.error(
    "  CRON_SECRET not found in .env.local or .env.\n" +
      "  Pull it from Vercel first:  npx vercel env pull .env.local",
  );
  process.exit(1);
}

const base =
  process.argv[2] === "local"
    ? "http://localhost:3000"
    : (process.env.NEXT_PUBLIC_SITE_URL ?? "https://thessalonikihub.gr");

const url = `${base}/api/cron/import-events`;
console.log(`  POST-ing nothing, GET-ing ${url}\n`);

const started = Date.now();
const response = await fetch(url, {
  headers: { Authorization: `Bearer ${secret}` },
});
const seconds = ((Date.now() - started) / 1000).toFixed(1);

const body = await response.text();
let parsed;
try {
  parsed = JSON.parse(body);
} catch {
  console.error(`  HTTP ${response.status} in ${seconds}s — not JSON:\n${body.slice(0, 600)}`);
  process.exit(1);
}

console.log(JSON.stringify(parsed, null, 2));
console.log(`\n  HTTP ${response.status} in ${seconds}s`);

if (parsed.ok) {
  const { imported = 0, autoPublished = 0, retiredEvents = 0 } = parsed;
  console.log(
    `\n  ${imported} new event(s) imported, ${autoPublished} of them published ` +
      `automatically, ${retiredEvents} retired as finished.`,
  );
  if (imported > 0 && autoPublished === 0) {
    console.log(
      "  Nothing auto-published: the model judged the source excerpts too thin\n" +
        "  to write from, so they are waiting at /admin. That is the intended\n" +
        "  behaviour, not a failure.",
    );
  }
}
