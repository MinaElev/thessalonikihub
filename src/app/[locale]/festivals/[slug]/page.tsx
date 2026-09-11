import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  PartyPopper,
  CalendarDays,
  MapPin,
  TrainFront,
  Globe,
  ArrowRight,
  History,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { EventCard } from "@/components/EventCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MarkdownBody } from "@/components/MarkdownBody";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import {
  areaHref,
  festivalHref,
  metroStationHref,
  monthHref,
} from "@/lib/links";
import { getUpcomingEvents } from "@/lib/repo";
import { getArea } from "@/content/data/areas";
import { getMetroStation } from "@/content/data/metro";
import { getCityMonth } from "@/content/data/months";
import { festivals, getFestival, getFestivals } from "@/content/data/festivals";

export function generateStaticParams() {
  return festivals.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const f = getFestival(slug);
  if (!f) return {};
  const name = pick(f.name, locale);
  return buildMetadata({
    locale,
    path: festivalHref(slug),
    title:
      locale === "el"
        ? `${name} — τι είναι, πότε γίνεται, πού`
        : `${name} — what it is, when and where`,
    description: pick(f.blurb, locale),
  });
}

export default async function FestivalPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const f = getFestival(slug);
  if (!f) notFound();

  const el = locale === "el";
  const name = pick(f.name, locale);
  const area = f.area ? getArea(f.area) : undefined;
  const station = f.metroStation ? getMetroStation(f.metroStation) : undefined;
  const month = getCityMonth(f.monthSlug);
  const others = getFestivals().filter((x) => x.slug !== f.slug);

  // Anything already in the events database that falls in this festival's month.
  const upcoming = await getUpcomingEvents(60);
  const events = upcoming
    .filter((e) => new Date(e.startsAt).getMonth() + 1 === f.month)
    .slice(0, 4);

  return (
    <Container className="py-4">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Festival",
          name,
          description: pick(f.blurb, locale),
          url: f.officialUrl,
          location: {
            "@type": "Place",
            name: el ? "Θεσσαλονίκη" : "Thessaloniki",
            address: {
              "@type": "PostalAddress",
              addressLocality: el ? "Θεσσαλονίκη" : "Thessaloniki",
              addressCountry: "GR",
            },
          },
          organizer: f.officialUrl
            ? { "@type": "Organization", url: f.officialUrl }
            : undefined,
        }}
      />

      <Breadcrumbs
        locale={locale}
        items={[
          { label: t("common.home"), href: "/" },
          { label: t("festivals.title"), href: "/festivals" },
          { label: pick(f.shortName, locale) },
        ]}
      />

      <header className="mb-6 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand-700">
            {pick(f.shortName, locale)}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted">
            <History className="h-3.5 w-3.5" /> {t("festivals.since")} {f.founded}
          </span>
        </div>
        <h1 className="mt-2 inline-flex items-start gap-2 text-3xl font-extrabold sm:text-4xl">
          <PartyPopper className="mt-1 h-7 w-7 shrink-0 text-brand-600" /> {name}
        </h1>
        <p className="mt-3 text-lg text-muted">{pick(f.blurb, locale)}</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0">
          <MarkdownBody locale={locale} selfHref={festivalHref(f.slug)}>
            {pick(f.long, locale)}
          </MarkdownBody>

          {events.length ? (
            <section className="mt-10">
              <h2 className="mb-4 text-2xl font-bold">
                {t("festivals.eventsThatMonth")}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {events.map((e) => (
                  <EventCard key={e.slug} event={e} locale={locale} />
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-10">
            <h2 className="mb-4 text-2xl font-bold">{t("festivals.others")}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={festivalHref(o.slug)}
                  className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {pick(o.monthLabel, locale)}
                  </span>
                  <span className="mt-1 font-bold text-brand-700 group-hover:text-brand-800">
                    {pick(o.name, locale)}
                  </span>
                  <span className="mt-1 text-sm text-muted">
                    {pick(o.blurb, locale)}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">
              {t("festivals.facts")}
            </h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted">{t("festivals.when")}</dt>
                <dd className="text-right font-semibold text-ink">
                  {pick(f.monthLabel, locale)}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">{t("festivals.since")}</dt>
                <dd className="text-right font-semibold tabular-nums text-ink">
                  {f.founded}
                </dd>
              </div>
            </dl>
            {f.officialUrl ? (
              <a
                href={f.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                <Globe className="h-4 w-4" /> {t("festivals.official")}
              </a>
            ) : null}
          </div>

          {month ? (
            <Link
              href={monthHref(month.slug)}
              className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-white p-5 text-sm font-semibold text-brand-700 shadow-sm transition hover:border-brand-200"
            >
              <CalendarDays className="h-4 w-4" />
              {el
                ? `Θεσσαλονίκη τον ${pick(month.nameAcc, locale)}`
                : `Thessaloniki in ${pick(month.name, locale)}`}
              <ArrowRight className="ml-auto h-4 w-4" />
            </Link>
          ) : null}

          {station ? (
            <Link
              href={metroStationHref(station.slug)}
              className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-white p-5 text-sm font-semibold text-brand-700 shadow-sm transition hover:border-brand-200"
            >
              <TrainFront className="h-4 w-4" />
              {t("festivals.nearestStation")}: {pick(station.name, locale)}
              <ArrowRight className="ml-auto h-4 w-4" />
            </Link>
          ) : null}

          {area ? (
            <Link
              href={areaHref(area.slug)}
              className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-white p-5 text-sm font-semibold text-brand-700 shadow-sm transition hover:border-brand-200"
            >
              <MapPin className="h-4 w-4" />
              {pick(area.name, locale)}
              <ArrowRight className="ml-auto h-4 w-4" />
            </Link>
          ) : null}

          <p className="text-xs text-muted">{t("festivals.disclaimer")}</p>
        </aside>
      </div>
    </Container>
  );
}
