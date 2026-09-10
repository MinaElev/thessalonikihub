import type { EventItem } from "@/lib/types";

/**
 * Events (EVENTS / TODAY pillars).
 *
 * Intentionally empty. Events are time-sensitive and must be accurate, so they
 * will be added from authoritative sources (venues, official listings) or via
 * moderated submissions, never fabricated. Until then the Events and Today
 * pages render an empty state.
 */
export const events: EventItem[] = [];
