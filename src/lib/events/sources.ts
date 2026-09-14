/**
 * What we know about individual feeds.
 *
 * Feeds differ in ways no generic parser can guess: whether `pubDate` is the
 * article's date or the event's, whether titles carry a city prefix, whether
 * the entries are worth indexing at all. Encoding that per source keeps the
 * parser honest — it reads what is there — while still letting us use a feed
 * whose conventions we have checked by hand.
 */

export interface FeedProfile {
  /** Matched against the item link's hostname. */
  host: string;
  /**
   * True when `pubDate` carries the event's own start, not the post date.
   * Only set this for a feed whose entries have been read and confirmed.
   */
  pubDateIsEventStart?: boolean;
  /** Prefix to strip from every title, e.g. a repeated city name. */
  titlePrefix?: RegExp;
  /**
   * Categories to keep. Anything else from this feed is dropped at import.
   * Omitted means keep everything.
   */
  allowCategories?: string[];
  /**
   * False when entries from this feed must never enter the sitemap, whatever
   * else happens to them. For a feed that publishes titles and no body, a page
   * would be a heading and a map pin — useful to a reader looking for tonight,
   * not something to put in front of a search engine.
   */
  indexable?: boolean;
  /** Map the feed's own category vocabulary onto our event types. */
  categoryTypes?: Record<string, string>;
}

/**
 * kinimatorama.net — a movement calendar, added deliberately for its cultural
 * listings only. It carries exact coordinates and an exact start time for
 * every entry, which no other feed we read does, but never a description.
 *
 * The category filter is the editorial line: concerts, festivals, theatre,
 * screenings and parties in, assemblies, marches and rallies out. It is a
 * blunt instrument — a screening can still carry a political title — which is
 * the other reason nothing from here is indexed.
 */
const KINIMATORAMA: FeedProfile = {
  host: "kinimatorama.net",
  pubDateIsEventStart: true,
  titlePrefix: /^Θεσσαλονίκη\s*[-–—]\s*/,
  allowCategories: ["συναυλία", "φεστιβάλ", "θέατρο", "προβολή", "πάρτυ", "γλέντι"],
  indexable: false,
  categoryTypes: {
    συναυλία: "concert",
    φεστιβάλ: "festival",
    θέατρο: "theatre",
    προβολή: "screening",
    πάρτυ: "other",
    γλέντι: "other",
  },
};

const PROFILES: FeedProfile[] = [KINIMATORAMA];

/** The profile for a feed URL, or null when we have no notes on it. */
export function profileFor(url: string | undefined): FeedProfile | null {
  if (!url) return null;
  let host: string;
  try {
    host = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
  return PROFILES.find((p) => host === p.host || host.endsWith(`.${p.host}`)) ?? null;
}
