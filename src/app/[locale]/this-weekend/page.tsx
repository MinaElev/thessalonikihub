import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CalendarRange, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { EventCard } from "@/components/EventCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { getEvents, getPlaces } from "@/lib/repo";
import { currentWeekend, overlapsWeekend, dayIndexIn } from "@/lib/weekend";

/**
 * "What's on this weekend" — a stable URL answering a question that is asked
 * again every week.
 *
 * /today is deliberately kept out of the sitemap: it changes every day and is
 * empty on quiet ones. A weekend is the opposite. The URL never changes, the
 * content refreshes once a week, and Friday to Sunday in a city of a million
 * people is never empty — which makes it worth indexing where /today is not.
 *
 * Rendered per request so it is never a stale weekend, and revalidated by the
 * importer whenever events change.
 */
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "weekend" });
  return buildMetadata({
    locale,
    path: "/this-weekend",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function ThisWeekendPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const weekend = currentWeekend();
  const all = await getEvents();
  const events = all.filter((e) => overlapsWeekend(e.startsAt, e.endsAt, weekend));

  const byDay: [typeof events, typeof events, typeof events] = [[], [], []];
  for (const e of events) byDay[dayIndexIn(e.startsAt, weekend)].push(e);
  for (const column of byDay) {
    column.sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  }

  // Monuments that open on all three days, so the page still answers the
  // question on a weekend with a thin events programme.
  const monuments = (await getPlaces("discover"))
    .filter((p) => {
      const h = p.hours;
      return Boolean(h?.fri && h?.sat && h?.sun);
    })
    .slice(0, 6);

  const dayLabel = (d: Date) =>
    new Intl.DateTimeFormat(locale === "el" ? "el-GR" : "en-GB", {
      timeZone: "Europe/Athens",
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(d);

  const range = `${new Intl.DateTimeFormat(locale === "el" ? "el-GR" : "en-GB", {
    timeZone: "Europe/Athens",
    day: "numeric",
    month: "long",
  }).format(weekend.days[0])} – ${new Intl.DateTimeFormat(
    locale === "el" ? "el-GR" : "en-GB",
    { timeZone: "Europe/Athens", day: "numeric", month: "long" },
  ).format(weekend.days[2])}`;

  return (
    <Container>
      {/* An ItemList of the weekend's events: it describes a collection, which
          is what this page is, rather than pretending to be one event. */}
      {events.length ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: t("weekend.title"),
            numberOfItems: events.length,
            itemListElement: events.slice(0, 25).map((e, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: absoluteUrl(locale, `/events/${e.slug}`),
              name: pick(e.name, locale),
            })),
          }}
        />
      ) : null}

      <Breadcrumbs
        locale={locale}
        items={[
          { label: t("common.home"), href: "/" },
          { label: t("nav.weekend") },
        ]}
      />

      <header className="mb-8 max-w-2xl">
        <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent-600">
          <CalendarRange className="h-4 w-4" />
          {weekend.inProgress ? t("weekend.inProgress") : t("weekend.upcoming")} · {range}
        </p>
        <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">
          {t("weekend.title")}
        </h1>
        <p className="mt-3 text-lg text-muted">{t("weekend.subtitle")}</p>
      </header>

      {events.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-muted">
          {t("weekend.nothing")}
        </p>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          {weekend.days.map((day, i) => (
            <section key={day.toISOString()}>
              <h2 className="mb-3 border-b border-slate-200 pb-2 text-lg font-bold">
                {dayLabel(day)}
              </h2>
              {byDay[i].length === 0 ? (
                <p className="text-sm text-muted">{t("weekend.noneThatDay")}</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {byDay[i].map((e) => (
                    <EventCard key={e.slug} event={e} locale={locale} />
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      )}

      <p className="mt-8">
        <Link
          href="/events"
          className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:gap-2"
        >
          {t("weekend.moreEvents")} <ArrowRight className="h-4 w-4" />
        </Link>
      </p>

      {monuments.length ? (
        <section className="mt-14">
          <h2 className="text-2xl font-extrabold">{t("weekend.alsoOpen")}</h2>
          <p className="mt-1 text-muted">{t("weekend.alsoOpenIntro")}</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {monuments.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/discover/${p.slug}`}
                  className="flex h-full flex-col rounded-2xl border border-slate-100 p-4 transition hover:border-brand-200 hover:shadow-sm"
                >
                  <span className="font-semibold text-brand-700">
                    {pick(p.name, locale)}
                  </span>
                  <span className="mt-1 text-sm text-muted">
                    {p.hours?.sat}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </Container>
  );
}
