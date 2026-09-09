/**
 * A normalized event coming from an external source (iCal, RSS, Eventbrite …),
 * before it is turned into a ThessalonikiHub EventItem and moderated.
 */
export interface ExternalEvent {
  /** Stable id from the source (iCal UID, Eventbrite id, or a content hash). */
  externalId: string;
  /** Source identifier, e.g. "ical", "rss", "eventbrite". */
  source: string;
  /** Link back to the original listing (attribution + user click-through). */
  sourceUrl?: string;
  title: string;
  description?: string;
  /** ISO 8601 start datetime. */
  startsAt: string;
  /** ISO 8601 end datetime, if known. */
  endsAt?: string;
  location?: string;
}

export type SourceKind = "ical" | "rss" | "eventbrite";

export interface SourceConfig {
  kind: SourceKind;
  /** Feed URL (iCal/RSS) or Eventbrite organization/venue query. */
  url?: string;
  /** Eventbrite API token (server-only). */
  token?: string;
  /** A short label, e.g. "megaron", used in the source id. */
  label?: string;
}
