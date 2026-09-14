import { athensDayStart } from "@/lib/athens-time";

/**
 * Which weekend "this weekend" means, in Thessaloniki time.
 *
 * The page exists because the question is asked every week — and the answer
 * has to be the weekend a reader is actually planning. That is not simply
 * "the next Saturday": someone reading on Saturday afternoon means today and
 * tomorrow, and someone reading on Sunday night means the weekend coming, not
 * the one ending in three hours.
 *
 * The cut is Monday. From Monday to Sunday, "this weekend" is the Friday,
 * Saturday and Sunday of that same week; after Sunday ends, it rolls forward.
 */

export interface Weekend {
  /** Friday 00:00 Athens. */
  from: Date;
  /** Monday 00:00 Athens — the exclusive end of Sunday. */
  to: Date;
  /** The three days, for rendering a column each. */
  days: Date[];
  /** True while the weekend is already running. */
  inProgress: boolean;
}

/** Day of the week in Athens, 0 = Sunday, as JavaScript counts. */
function athensWeekday(instant: Date): number {
  const label = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Athens",
    weekday: "short",
  }).format(instant);
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(label);
}

const DAY_MS = 24 * 60 * 60 * 1000;

export function currentWeekend(now: Date = new Date()): Weekend {
  const today = athensDayStart(now);
  const weekday = athensWeekday(now);

  // Distance to this week's Friday: negative once Friday has passed, which is
  // what keeps Saturday and Sunday pointing at the weekend already under way.
  const offsetToFriday = weekday === 0 ? -2 : 5 - weekday;

  const from = new Date(today.getTime() + offsetToFriday * DAY_MS);
  const to = new Date(from.getTime() + 3 * DAY_MS);

  return {
    from,
    to,
    days: [0, 1, 2].map((i) => new Date(from.getTime() + i * DAY_MS)),
    inProgress: now >= from,
  };
}

/** Does an event fall inside the window, including one that spans into it? */
export function overlapsWeekend(
  startsAt: string,
  endsAt: string | null | undefined,
  weekend: Weekend,
): boolean {
  const start = new Date(startsAt);
  const end = endsAt ? new Date(endsAt) : start;
  return end >= weekend.from && start < weekend.to;
}

/** Which of the three days an event belongs under, or null if it spans them. */
export function dayIndexIn(startsAt: string, weekend: Weekend): number {
  const start = new Date(startsAt);
  const index = Math.floor((start.getTime() - weekend.from.getTime()) / DAY_MS);
  // An event that began before Friday still belongs at the top of Friday.
  return Math.min(Math.max(index, 0), 2);
}
