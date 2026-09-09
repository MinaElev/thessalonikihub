import type { ExternalEvent, SourceConfig } from "./types";
import { parseICal } from "./ical";
import { parseRss } from "./rss";
import { fetchEventbrite } from "./eventbrite";
import { dedupe, futureOnly } from "./normalize";

// A realistic browser User-Agent — many sites (e.g. official tourism portals)
// return 403 to default bot agents.
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";

async function fetchText(url: string, accept: string): Promise<string> {
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: accept } });
  if (!res.ok) throw new Error(`Feed ${res.status}`);
  return res.text();
}

/** Fetch + normalize one source into external events. */
export async function fetchSource(cfg: SourceConfig): Promise<ExternalEvent[]> {
  if (cfg.kind === "ical") {
    if (!cfg.url) return [];
    const text = await fetchText(cfg.url, "text/calendar,application/octet-stream");
    return parseICal(text, cfg.label ? `ical:${cfg.label}` : "ical");
  }
  if (cfg.kind === "rss") {
    if (!cfg.url) return [];
    const text = await fetchText(cfg.url, "application/rss+xml,application/xml,text/xml");
    return parseRss(text, cfg.label ? `rss:${cfg.label}` : "rss");
  }
  if (cfg.kind === "eventbrite") {
    return fetchEventbrite({ token: cfg.token ?? "", organizationId: cfg.url });
  }
  return [];
}

/** Fetch several sources, dedupe, keep future events, sort by start. */
export async function previewSources(
  cfgs: SourceConfig[],
): Promise<ExternalEvent[]> {
  const all: ExternalEvent[] = [];
  for (const c of cfgs) {
    try {
      all.push(...(await fetchSource(c)));
    } catch (err) {
      console.error("event source failed:", c.kind, c.url, err);
    }
  }
  return futureOnly(dedupe(all)).sort((a, b) =>
    a.startsAt.localeCompare(b.startsAt),
  );
}
