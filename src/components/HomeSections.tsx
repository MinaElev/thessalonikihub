import { ArrowRight, TrainFront, Waves } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { Container, SectionHeading } from "@/components/ui";
import { cityMonths } from "@/content/data/months";
import { metroStations } from "@/content/data/metro";
import { areas } from "@/content/data/areas";
import { dishes } from "@/content/data/dishes";
import {
  areaHref,
  areasHref,
  dishHref,
  metroHref,
  metroStationHref,
  monthHref,
  whatToEatHref,
  whenToVisitHref,
} from "@/lib/links";

/**
 * Homepage sections for the editorial content — months, metro, areas, dishes.
 *
 * Each one deliberately takes a different shape. The page already carries three
 * card grids, and a fourth, fifth and sixth would make the homepage one long
 * repetition; a month is best read as a row you scan across, a metro network as
 * a line, neighbourhoods as a directory, dishes as a short list. The form
 * follows what the content actually is.
 */

interface Labels {
  kicker: string;
  title: string;
  intro: string;
  viewAll: string;
}

function Heading({ labels, href }: { labels: Labels; href: string }) {
  return (
    <SectionHeading
      kicker={labels.kicker}
      title={labels.title}
      action={
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2"
        >
          {labels.viewAll} <ArrowRight className="h-4 w-4" />
        </Link>
      }
    />
  );
}

/**
 * The twelve months as a row you scan across, each carrying its real average
 * high — the figure a visitor is actually deciding on.
 */
export function MonthsStrip({
  locale,
  labels,
  nowLabel,
  currentMonth,
}: {
  locale: Locale;
  labels: Labels;
  nowLabel: string;
  /** 1-12. Passed in so the server renders a stable, cacheable page. */
  currentMonth: number;
}) {
  return (
    <section className="py-10">
      <Container>
        <Heading labels={labels} href={whenToVisitHref()} />
        <p className="-mt-4 mb-5 text-muted">{labels.intro}</p>

        <ul className="flex snap-x gap-2 overflow-x-auto pb-2">
          {cityMonths.map((m) => {
            const isNow = m.number === currentMonth;
            return (
              <li key={m.slug} className="snap-start">
                <Link
                  href={monthHref(m.slug)}
                  className={`flex w-24 shrink-0 flex-col items-center gap-1 rounded-2xl border px-3 py-3 text-center transition hover:-translate-y-0.5 hover:shadow-md ${
                    isNow
                      ? "border-brand-300 bg-brand-50"
                      : "border-slate-100 bg-white shadow-sm hover:border-brand-200"
                  }`}
                >
                  <span className="text-sm font-bold text-ink">
                    {pick(m.name, locale).slice(0, 3)}
                  </span>
                  <span className="text-lg font-extrabold tabular-nums text-brand-700">
                    {m.tempHigh}°
                  </span>
                  {m.seaSwimmable ? (
                    <Waves className="h-3.5 w-3.5 text-brand-500" aria-hidden="true" />
                  ) : (
                    <span className="h-3.5" />
                  )}
                  {isNow ? (
                    <span className="text-[0.6rem] font-bold uppercase tracking-wide text-brand-600">
                      {nowLabel}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

const BRANCH_STYLE = {
  trunk: "bg-brand-600",
  kalamaria: "bg-accent-600",
  "nea-elvetia": "bg-slate-400",
} as const;

/**
 * The network drawn as a line rather than a grid of cards: stations sit in
 * running order on a rule, coloured by branch, the way a metro map reads.
 */
export function MetroLine({
  locale,
  labels,
  branchLabels,
}: {
  locale: Locale;
  labels: Labels;
  branchLabels: { trunk: string; kalamaria: string; neaElvetia: string };
}) {
  const ordered = [...metroStations].sort((a, b) => a.order - b.order);

  return (
    <section className="border-y border-slate-100 bg-slate-50/60 py-12">
      <Container>
        <Heading labels={labels} href={metroHref()} />
        <p className="-mt-4 mb-6 max-w-2xl text-muted">{labels.intro}</p>

        <div className="overflow-x-auto pb-3">
          <ol className="flex min-w-max items-start gap-0">
            {ordered.map((s, i) => (
              <li key={s.slug} className="flex flex-col items-center">
                <div className="flex items-center">
                  {/* Track to the left of the dot, except at the start. */}
                  <span
                    className={`h-1 w-10 ${i === 0 ? "bg-transparent" : BRANCH_STYLE[s.branch]}`}
                    aria-hidden="true"
                  />
                  <Link
                    href={metroStationHref(s.slug)}
                    className="group relative flex flex-col items-center"
                    title={pick(s.blurb, locale)}
                  >
                    <span
                      className={`block h-3.5 w-3.5 rounded-full ring-4 ring-slate-50 transition group-hover:scale-125 ${BRANCH_STYLE[s.branch]}`}
                    />
                  </Link>
                  <span
                    className={`h-1 w-10 ${
                      i === ordered.length - 1 ? "bg-transparent" : BRANCH_STYLE[s.branch]
                    }`}
                    aria-hidden="true"
                  />
                </div>
                <Link
                  href={metroStationHref(s.slug)}
                  className="mt-2 block w-24 text-center text-xs font-medium leading-tight text-slate-600 hover:text-brand-700"
                >
                  {pick(s.name, locale)}
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
          {(
            [
              ["trunk", branchLabels.trunk],
              ["kalamaria", branchLabels.kalamaria],
              ["nea-elvetia", branchLabels.neaElvetia],
            ] as const
          ).map(([branch, label]) => (
            <li key={branch} className="inline-flex items-center gap-2">
              <span className={`h-2 w-6 rounded-full ${BRANCH_STYLE[branch]}`} aria-hidden="true" />
              {label}
            </li>
          ))}
          <li className="inline-flex items-center gap-1.5 text-brand-700">
            <TrainFront className="h-3.5 w-3.5" aria-hidden="true" />
            {metroStations.length}
          </li>
        </ul>
      </Container>
    </section>
  );
}

/** Neighbourhoods as a plain directory: many links, little furniture. */
export function AreasDirectory({ locale, labels }: { locale: Locale; labels: Labels }) {
  return (
    <section className="py-12">
      <Container>
        <Heading labels={labels} href={areasHref()} />
        <p className="-mt-4 mb-6 max-w-2xl text-muted">{labels.intro}</p>

        <ul className="grid gap-x-8 gap-y-px sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a) => (
            <li key={a.slug} className="border-b border-slate-100">
              <Link
                href={areaHref(a.slug)}
                className="group flex items-baseline gap-3 py-2.5"
              >
                <span className="shrink-0 font-semibold text-ink group-hover:text-brand-700">
                  {pick(a.name, locale)}
                </span>
                {/* At phone widths the name alone is the useful part; the blurb
                    beside it only had room to be cut off mid-word. */}
                <span className="hidden min-w-0 flex-1 truncate text-sm text-muted sm:block">
                  {pick(a.blurb, locale)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Dishes as a short list, each with the time of day locals actually eat it. */
export function DishesRow({ locale, labels }: { locale: Locale; labels: Labels }) {
  return (
    <section className="border-t border-slate-100 py-12">
      <Container>
        <Heading labels={labels} href={whatToEatHref()} />
        <p className="-mt-4 mb-6 max-w-2xl text-muted">{labels.intro}</p>

        <ul className="flex flex-wrap gap-3">
          {dishes.map((d) => (
            <li key={d.slug}>
              <Link
                href={dishHref(d.slug)}
                className="group flex flex-col rounded-2xl border border-slate-200 px-5 py-3 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-sm"
              >
                <span className="font-bold text-ink group-hover:text-brand-700">
                  {pick(d.name, locale)}
                </span>
                <span className="text-xs text-muted">{pick(d.whenToEat, locale)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
