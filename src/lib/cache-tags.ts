/**
 * Tags for the cached database reads in `src/lib/repo.ts`.
 *
 * The repository reads every published place in one query and every recent
 * published event in another, then serves whole pages out of those two
 * results. Both are held in Next's data cache, so a burst of 345 pages being
 * built makes two queries rather than a thousand.
 *
 * The cost of holding them is staleness, which is what these tags buy back:
 * any action that writes a Place or an EventItem row invalidates the matching
 * tag, so a moderator's approval is visible on the next request instead of
 * whenever the cache happened to expire.
 */

export const TAG_PLACES = "repo:places";
export const TAG_EVENTS = "repo:events";

/** How long a read is reused when nothing invalidates it, in seconds. */
export const DATA_TTL = 300;
