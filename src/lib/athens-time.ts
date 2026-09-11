/**
 * Converting between a <input type="datetime-local"> value and a real instant.
 *
 * An event's time is always meant as Thessaloniki wall-clock time — that is
 * what types.ts promises and what an owner types into the form. But a bare
 * "2026-09-17T20:30" has no zone, so `new Date(value)` resolves it against
 * whatever zone the interpreter happens to be in: the owner's browser when it
 * runs on the client, and UTC when it runs on Vercel. Left alone, a 20:30
 * concert is stored as 23:30 every summer.
 *
 * These two helpers pin both directions to Europe/Athens explicitly, so the
 * result does not depend on where the code ran.
 */

const ATHENS = "Europe/Athens";

/** Athens' UTC offset in minutes at a given instant (+180 in summer, +120 in winter). */
function offsetMinutesAt(instant: Date): number {
  // "longOffset" renders as "GMT+03:00" — and as plain "GMT" at zero offset.
  const formatted = new Intl.DateTimeFormat("en-US", {
    timeZone: ATHENS,
    timeZoneName: "longOffset",
  }).format(instant);
  const match = /GMT([+-])(\d{2}):(\d{2})/.exec(formatted);
  if (!match) return 0;
  const sign = match[1] === "-" ? -1 : 1;
  return sign * (Number(match[2]) * 60 + Number(match[3]));
}

/**
 * Read a datetime-local value ("2026-09-17T20:30") as Athens wall-clock time.
 *
 * Returns null for empty or unparseable input, so a blank optional field stays
 * blank instead of becoming 1970.
 */
export function parseAthensLocal(value: string | null | undefined): Date | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(trimmed)) return null;

  // Read the wall-clock digits as if they were UTC, then subtract the offset
  // that Athens was on at roughly that moment. The guess is re-checked once:
  // on the two days a year the clocks move, the offset at the guessed instant
  // can differ from the offset at the real one.
  const asIfUtc = new Date(`${trimmed.slice(0, 16)}:00Z`);
  if (Number.isNaN(asIfUtc.getTime())) return null;

  let result = new Date(asIfUtc.getTime() - offsetMinutesAt(asIfUtc) * 60_000);
  const settled = new Date(asIfUtc.getTime() - offsetMinutesAt(result) * 60_000);
  if (settled.getTime() !== result.getTime()) result = settled;
  return result;
}

/** Render an instant as the Athens wall-clock value a datetime-local input wants. */
export function toAthensLocalInput(instant: Date | string | null | undefined): string {
  if (!instant) return "";
  const date = instant instanceof Date ? instant : new Date(instant);
  if (Number.isNaN(date.getTime())) return "";

  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: ATHENS,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  // en-CA renders midnight as "24" in some runtimes; normalise it to "00".
  const hour = get("hour") === "24" ? "00" : get("hour");
  return `${get("year")}-${get("month")}-${get("day")}T${hour}:${get("minute")}`;
}
