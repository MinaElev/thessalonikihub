import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  TrainFront,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Link2,
  Bus,
  DoorOpen,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import Image from "next/image";
import { PlaceCard } from "@/components/PlaceCard";
import { PhotoCredit } from "@/components/PhotoCredit";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MarkdownBody } from "@/components/MarkdownBody";
import { MiniMapClient } from "@/components/map/MiniMapClient";
import { MetroLine } from "@/components/MetroLine";
import { RouteLinks } from "@/components/RouteLinks";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { areaHref, metroStationHref, mapsHref } from "@/lib/links";
import { getPlaceBySlug } from "@/lib/repo";
import { journeysFrom, stationFaqs } from "@/lib/metro-station";
import { getRoutesForStation } from "@/content/data/routes";
import { getArea } from "@/content/data/areas";
import {
  metroStations,
  getMetroStation,
  getMetroStations,
  linesFor,
  metroFacts,
  terminiFor,
} from "@/content/data/metro";

export function generateStaticParams() {
  return metroStations.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const station = getMetroStation(slug);
  if (!station) return {};
  const name = pick(station.name, locale);
  return buildMetadata({
    locale,
    path: metroStationHref(slug),
    // One generated pattern across eighteen stations reads as eighteen copies
    // of the same page. A hand-written title wins wherever there is one; the
    // pattern stays as the fallback.
    title: station.seoTitle
      ? pick(station.seoTitle, locale)
      : locale === "el"
        ? `Στάση μετρό ${name} — τι υπάρχει γύρω`
        : `${name} metro station — what's around`,
    description: station.seoDescription
      ? pick(station.seoDescription, locale)
      : pick(station.blurb, locale),
    images: station.photo ? [station.photo.url] : undefined,
  });
}

export default async function MetroStationPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const station = getMetroStation(slug);
  if (!station) notFound();

  const el = locale === "el";
  const name = pick(station.name, locale);
  const ordered = getMetroStations().filter(
    (s) => s.branch === "trunk" || s.branch === station.branch,
  );
  const index = ordered.findIndex((s) => s.slug === station.slug);
  const prev = index > 0 ? ordered[index - 1] : undefined;
  const next = index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : undefined;

  const journeys = journeysFrom(station, locale);
  const faqs = stationFaqs(station, locale);
  const { inbound, outbound } = terminiFor(station);
  const lines = linesFor(station);
  const area = station.area ? getArea(station.area) : undefined;
  const places = (
    await Promise.all((station.nearbyPlaces ?? []).map((s) => getPlaceBySlug(s)))
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <Container className="py-4">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SubwayStation",
          name,
          description: pick(station.blurb, locale),
          geo: {
            "@type": "GeoCoordinates",
            latitude: station.center.lat,
            longitude: station.center.lng,
          },
          address: {
            "@type": "PostalAddress",
            ...(station.address
              ? { streetAddress: pick(station.address, locale) }
              : {}),
            addressLocality: el ? "Θεσσαλονίκη" : "Thessaloniki",
            addressCountry: "GR",
          },
          url: absoluteUrl(locale, metroStationHref(station.slug)),
          ...(station.photo ? { image: station.photo.url } : {}),
          containedInPlace: {
            "@type": "City",
            name: el ? "Θεσσαλονίκη" : "Thessaloniki",
          },
          publicAccess: true,
          // Stated because the fare is in the verified network facts; nothing
          // here claims a timetable or a service the data does not carry.
          isAccessibleForFree: false,
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            opens: metroFacts.firstTrain,
            closes: metroFacts.lastTrainWeek,
          },
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />

      <Breadcrumbs
        locale={locale}
        items={[
          { label: t("common.home"), href: "/" },
          { label: t("metro.title"), href: "/metro" },
          { label: name },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <header className="mb-6 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              {t("metro.stationEyebrow")}
            </p>
            <h1 className="mt-1 inline-flex items-center gap-2 text-3xl font-extrabold sm:text-4xl">
              <TrainFront className="h-7 w-7 text-brand-600" /> {name}
            </h1>
            <p className="mt-3 text-lg text-muted">{pick(station.blurb, locale)}</p>
          </header>

          {station.photo ? (
            <figure className="mb-6">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-slate-100">
                <Image
                  src={station.photo.url}
                  alt={pick(station.photo.alt, locale)}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="object-cover"
                />
              </div>
              <PhotoCredit photo={station.photo} className="mt-2" />
            </figure>
          ) : null}

          <MarkdownBody locale={locale} selfHref={metroStationHref(station.slug)}>
            {pick(station.long, locale)}
          </MarkdownBody>

          <section className="mt-10">
            <h2 className="mb-1 text-2xl font-bold">{t("metro.journeysTitle")}</h2>
            <p className="mb-4 text-sm text-muted">
              {t("metro.journeysNote", {
                inbound: pick(inbound.name, locale),
                outbound: outbound
                  .map((o) => pick(o.name, locale))
                  .join(el ? " και " : " and "),
              })}
            </p>
            <div className="overflow-hidden rounded-2xl border border-slate-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-muted">
                  <tr>
                    <th scope="col" className="px-4 py-2 font-semibold">
                      {t("metro.destination")}
                    </th>
                    <th scope="col" className="px-4 py-2 font-semibold">
                      {t("metro.stopsAway")}
                    </th>
                    <th scope="col" className="hidden px-4 py-2 font-semibold sm:table-cell">
                      {t("metro.whatFor")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {journeys.map((j) => (
                    <tr key={j.slug}>
                      <th scope="row" className="px-4 py-2.5 font-semibold">
                        <Link
                          href={metroStationHref(j.slug)}
                          className="text-brand-700 hover:text-brand-800 hover:underline"
                        >
                          {j.name}
                        </Link>
                      </th>
                      <td className="whitespace-nowrap px-4 py-2.5 text-ink">
                        {j.stops}
                        {j.change ? (
                          <span className="ml-1.5 text-xs text-muted">
                            {t("metro.withChange")}
                          </span>
                        ) : null}
                      </td>
                      <td className="hidden px-4 py-2.5 text-muted sm:table-cell">
                        {j.reason}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {places.length ? (
            <section className="mt-10">
              <h2 className="mb-4 text-2xl font-bold">{t("metro.nearbyPlaces")}</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {places.map((p) => (
                  <PlaceCard key={p.slug} place={p} locale={locale} />
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-10">
            <h2 className="mb-4 text-2xl font-bold">{t("metro.faqTitle")}</h2>
            <div className="divide-y divide-slate-100 rounded-2xl border border-slate-100">
              {faqs.map((f, i) => (
                <details key={i} className="group p-4" open={i === 0}>
                  <summary className="cursor-pointer font-semibold text-ink">
                    {f.question}
                  </summary>
                  <p className="mt-2 text-sm text-muted">{f.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <RouteLinks
            locale={locale}
            routes={getRoutesForStation(station.slug)}
            title={t("routes.startsHere")}
          />

          <MetroLine locale={locale} current={station} />

          {/* Two bare station names gave no clue which way the line runs. */}
          <nav
            aria-label={t("metro.allStations")}
            className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-6"
          >
            {prev ? (
              <Link
                href={metroStationHref(prev.slug)}
                className="group inline-flex items-center gap-2 text-left"
              >
                <ArrowLeft className="h-4 w-4 shrink-0 text-brand-700 transition group-hover:-translate-x-0.5" />
                <span>
                  <span className="block text-xs uppercase tracking-wide text-muted">
                    {t("metro.prevStation")}
                  </span>
                  <span className="text-sm font-semibold text-brand-700">
                    {pick(prev.name, locale)}
                  </span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={metroStationHref(next.slug)}
                className="group inline-flex items-center gap-2 text-right"
              >
                <span>
                  <span className="block text-xs uppercase tracking-wide text-muted">
                    {t("metro.nextStation")}
                  </span>
                  <span className="text-sm font-semibold text-brand-700">
                    {pick(next.name, locale)}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-brand-700 transition group-hover:translate-x-0.5" />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">
              {t("metro.stationFacts")}
            </h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="shrink-0 text-muted">{t("metro.lineLabel")}</dt>
                <dd className="flex flex-wrap justify-end gap-1.5">
                  {lines.map((n) => (
                    <span
                      key={n}
                      className={`rounded px-1.5 py-0.5 text-xs font-bold text-white ${
                        n === "1" ? "bg-red-600" : "bg-blue-600"
                      }`}
                    >
                      {t("metro.lineN", { n })}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">{t("metro.branchLabel")}</dt>
                <dd className="text-right font-semibold text-ink">
                  {station.branch === "trunk"
                    ? t("metro.trunk")
                    : station.branch === "kalamaria"
                      ? t("metro.branchSouth")
                      : t("metro.branchEast")}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">{t("metro.openedLabel")}</dt>
                <dd className="text-right font-semibold text-ink">
                  {new Intl.DateTimeFormat(el ? "el-GR" : "en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(station.opened))}
                </dd>
              </div>
              {station.address ? (
                <div className="flex justify-between gap-3">
                  <dt className="shrink-0 text-muted">{t("metro.addressLabel")}</dt>
                  <dd className="text-right font-semibold text-ink">
                    {pick(station.address, locale)}
                  </dd>
                </div>
              ) : null}
              {station.platforms ? (
                <div className="flex justify-between gap-3">
                  <dt className="shrink-0 text-muted">{t("metro.platformsLabel")}</dt>
                  <dd className="text-right font-semibold text-ink">
                    {pick(station.platforms, locale)}
                  </dd>
                </div>
              ) : null}
              {station.stepFree ? (
                <div className="flex justify-between gap-3">
                  <dt className="shrink-0 text-muted">{t("metro.accessLabel")}</dt>
                  <dd className="text-right font-semibold text-ink">
                    {t("metro.stepFree")}
                  </dd>
                </div>
              ) : null}
            </dl>
            {station.exits?.length ? (
              <div className="mt-3 border-t border-slate-100 pt-3 text-sm">
                <span className="mb-1 flex items-center gap-1.5 font-semibold text-ink">
                  <DoorOpen className="h-4 w-4" /> {t("metro.exitsLabel")}
                </span>
                <ul className="list-disc space-y-0.5 pl-5 text-muted">
                  {station.exits.map((e, i) => (
                    <li key={i}>{pick(e, locale)}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {station.busLines?.length ? (
              <div className="mt-3 border-t border-slate-100 pt-3 text-sm">
                <span className="mb-1.5 flex items-center gap-1.5 font-semibold text-ink">
                  <Bus className="h-4 w-4" /> {t("metro.busLabel")}
                </span>
                <ul className="flex flex-wrap gap-1.5">
                  {station.busLines.map((b) => (
                    <li
                      key={b}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-ink"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {station.connections ? (
              <p className="mt-3 border-t border-slate-100 pt-3 text-sm text-muted">
                <span className="mb-1 flex items-center gap-1.5 font-semibold text-ink">
                  <Link2 className="h-4 w-4" /> {t("metro.connections")}
                </span>
                {pick(station.connections, locale)}
              </p>
            ) : null}
          </div>

          <div>
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-muted">
              {t("place.location")}
            </h2>
            <MiniMapClient lat={station.center.lat} lng={station.center.lng} label={name} />
            <p className="mt-2 text-xs text-muted">{t("metro.approx")}</p>
            <a
              href={mapsHref(station.center)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-700"
            >
              <MapPin className="h-4 w-4" /> {t("place.getDirections")}
            </a>
          </div>

          {area ? (
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-muted">
                {t("metro.servesArea")}
              </h2>
              <Link
                href={areaHref(area.slug)}
                className="inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-800"
              >
                <MapPin className="h-4 w-4" /> {pick(area.name, locale)}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-2 text-sm text-muted">{pick(area.blurb, locale)}</p>
            </div>
          ) : null}

          <Link
            href="/metro"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:gap-3"
          >
            <TrainFront className="h-4 w-4" /> {t("metro.allStations")}
          </Link>
        </aside>
      </div>
    </Container>
  );
}
