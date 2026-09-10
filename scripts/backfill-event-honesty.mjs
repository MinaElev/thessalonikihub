/**
 * One-off backfill for events imported before the parser stopped inventing
 * data.
 *
 * Every RSS-imported row was written with a start time of 19:00 Europe/Athens
 * (the parser's hardcoded fallback), the city-centre coordinates, and the venue
 * "Θεσσαλονίκη" — none of which came from the source. This marks those values
 * as unknown rather than guessing at replacements: an unknown time is honest,
 * an invented one is not.
 *
 * Rows are only touched where the value still matches the fabricated default,
 * so anything a moderator has already corrected by hand is left alone.
 *
 *   node scripts/backfill-event-honesty.mjs          # report only
 *   node scripts/backfill-event-honesty.mjs --apply  # write
 */
import { PrismaClient } from "@prisma/client";

const apply = process.argv.includes("--apply");
const prisma = new PrismaClient();

const CENTER_LAT = 40.6401;
const CENTER_LNG = 22.9444;

/** 19:00 in Europe/Athens, whichever side of the DST switch the date falls. */
function isFabricatedTime(date) {
  const athens = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Athens",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
  return athens === "19:00";
}

async function main() {
  const rows = await prisma.eventItem.findMany({
    where: { source: { not: null } },
    select: {
      id: true,
      slug: true,
      startsAt: true,
      lat: true,
      lng: true,
      venue: true,
      timeKnown: true,
      textRewritten: true,
      status: true,
    },
  });

  console.log(`${rows.length} imported event rows\n`);
  let changed = 0;

  for (const r of rows) {
    const data = {};
    const notes = [];

    if (r.timeKnown && isFabricatedTime(r.startsAt)) {
      data.timeKnown = false;
      notes.push("time 19:00 -> unknown");
    }
    if (r.lat === CENTER_LAT && r.lng === CENTER_LNG) {
      data.lat = null;
      data.lng = null;
      data.area = null;
      notes.push("city-centre coords -> unknown");
    }
    const venueEl = r.venue && typeof r.venue === "object" ? r.venue.el : undefined;
    if (venueEl === "Θεσσαλονίκη") {
      data.venue = {};
      notes.push('venue "Θεσσαλονίκη" -> unknown');
    }
    if (r.textRewritten) {
      // The description is still the feed's own wording, so it must not be
      // treated as ours for indexing purposes.
      data.textRewritten = false;
      notes.push("text flagged as source's own (noindex)");
    }

    if (!notes.length) continue;
    changed++;
    console.log(`${apply ? "FIX " : "WOULD FIX "}${r.slug} [${r.status}]`);
    for (const n of notes) console.log(`      · ${n}`);

    if (apply) {
      await prisma.eventItem.update({ where: { id: r.id }, data });
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
