import type { ExternalEvent } from "./types";

/**
 * Minimal but practical iCalendar (RFC 5545) parser for VEVENTs.
 * Handles line folding, escaped text, and the common DTSTART/DTEND forms
 * (UTC "Z", floating local, VALUE=DATE, and TZID params — kept as-is).
 */

function unfold(text: string): string[] {
  const raw = text.replace(/\r\n/g, "\n").split("\n");
  const lines: string[] = [];
  for (const line of raw) {
    if ((line.startsWith(" ") || line.startsWith("\t")) && lines.length) {
      lines[lines.length - 1] += line.slice(1);
    } else {
      lines.push(line);
    }
  }
  return lines;
}

function unescape(v: string): string {
  return v
    .replace(/\\n/gi, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\");
}

/** True for an all-day value (VALUE=DATE), which states no clock time. */
function isAllDay(value: string, params: string): boolean {
  return /VALUE=DATE/i.test(params) || /^\d{8}$/.test(value);
}

/** Convert an iCal date/time value to an ISO string. */
function toIso(value: string, params: string): string | null {
  // All-day: VALUE=DATE:20260115
  if (isAllDay(value, params)) {
    const m = value.match(/^(\d{4})(\d{2})(\d{2})/);
    if (m) return new Date(`${m[1]}-${m[2]}-${m[3]}T00:00:00`).toISOString();
  }
  // Date-time: 20260115T190000Z  or  20260115T190000
  const m = value.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z)?/);
  if (m) {
    const [, y, mo, d, h, mi, s, z] = m;
    const iso = `${y}-${mo}-${d}T${h}:${mi}:${s}${z ? "Z" : ""}`;
    const date = new Date(iso);
    return isNaN(date.getTime()) ? null : date.toISOString();
  }
  const fallback = new Date(value);
  return isNaN(fallback.getTime()) ? null : fallback.toISOString();
}

export function parseICal(text: string, source = "ical"): ExternalEvent[] {
  const lines = unfold(text);
  const events: ExternalEvent[] = [];
  let cur: Record<string, { value: string; params: string }> | null = null;

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      cur = {};
      continue;
    }
    if (line === "END:VEVENT") {
      if (cur) {
        const get = (k: string) => cur![k]?.value;
        const start = cur["DTSTART"]
          ? toIso(cur["DTSTART"].value, cur["DTSTART"].params)
          : null;
        const title = get("SUMMARY");
        if (start && title) {
          const end = cur["DTEND"]
            ? toIso(cur["DTEND"].value, cur["DTEND"].params)
            : null;
          events.push({
            externalId: get("UID") || `${title}-${start}`,
            source,
            sourceUrl: get("URL") || undefined,
            title: unescape(title),
            description: get("DESCRIPTION")
              ? unescape(get("DESCRIPTION")!)
              : undefined,
            startsAt: start,
            timeKnown: !isAllDay(cur["DTSTART"].value, cur["DTSTART"].params),
            endsAt: end ?? undefined,
            location: get("LOCATION") ? unescape(get("LOCATION")!) : undefined,
          });
        }
      }
      cur = null;
      continue;
    }
    if (!cur) continue;
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const keyPart = line.slice(0, idx);
    const value = line.slice(idx + 1);
    const [key, ...paramParts] = keyPart.split(";");
    cur[key.toUpperCase()] = { value, params: paramParts.join(";") };
  }

  return events;
}
