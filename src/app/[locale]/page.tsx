import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Search, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { Container, SectionHeading } from "@/components/ui";
import { PlaceCard } from "@/components/PlaceCard";
import { EventCard } from "@/components/EventCard";
import { GuideCard } from "@/components/GuideCard";
import { pillars, site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { cityHref, collectionHref, pillarHref } from "@/lib/links";
import {
  getPlaces,
  getGuides,
  getEventsOnDay,
  getUpcomingEvents,
  getCollections,
} from "@/lib/repo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return buildMetadata({
    locale,
    path: "/",
    title: site.name,
    description: t("heroSubtitle"),
  });
}

const pillarOrder = [
  "stay",
  "eat",
  "drink",
  "discover",
  "events",
  "experiences",
  "services",
] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const attractions = (await getPlaces("discover")).slice(0, 6);
  const guides = getGuides().slice(0, 2);
  const eventsToday = await getEventsOnDay();
  const upcoming = await getUpcomingEvents(10);
  const todayList = (eventsToday.length ? eventsToday : upcoming).slice(0, 4);
  const quickIntents = getCollections().filter((c) => c.featured).slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <Image
          src="/hero-thessaloniki.jpg"
          alt={
            locale === "el"
              ? "Ο Λευκός Πύργος και η παραλία της Θεσσαλονίκης στο ηλιοβασίλεμα"
              : "The White Tower and Thessaloniki waterfront at sunset"
          }
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Brand overlay for legible white text over the photo */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950/90 via-brand-900/75 to-brand-800/55" />
        <Container className="relative py-16 sm:py-28">
          <div className="max-w-2xl animate-fade-up">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-200">
              {t("home.heroKicker")}
            </p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              {t("home.heroTitle")}
            </h1>
            <p className="mt-4 text-lg text-brand-50/90">
              {t("home.heroSubtitle")}
            </p>

            {/* Search (visual entry point; wires to Discover for now) */}
            <form
              action={`/${locale === "el" ? "" : locale + "/"}search`}
              className="mt-8 flex items-center gap-2 rounded-full bg-white p-2 shadow-lg"
            >
              <Search className="ml-2 h-5 w-5 shrink-0 text-slate-400" />
              <input
                type="text"
                name="q"
                placeholder={t("home.searchPlaceholder")}
                className="w-full bg-transparent text-ink outline-none placeholder:text-slate-400"
                aria-label={t("home.searchPlaceholder")}
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-accent-600 px-5 py-2 font-semibold text-white transition hover:bg-accent-700"
              >
                <span className="hidden sm:inline">{t("common.readMore")}</span>
                <ArrowRight className="h-5 w-5 sm:hidden" />
              </button>
            </form>

            {/* Quick intents */}
            <div className="mt-6">
              <p className="mb-2 text-sm text-brand-100">
                {t("home.quickIntents")}
              </p>
              <div className="flex flex-wrap gap-2">
                {quickIntents.map((c) => (
                  <Link
                    key={`${c.pillar}-${c.slug}`}
                    href={collectionHref(c)}
                    className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-sm font-medium backdrop-blur transition hover:bg-white/20"
                  >
                    {pick(c.heading, locale)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Pillars */}
      <section className="py-14">
        <Container>
          <SectionHeading title={t("home.pillarsTitle")} />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {pillarOrder.map((p) => (
              <Link
                key={p}
                href={pillarHref(p)}
                className="group flex flex-col items-start gap-2 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
              >
                <span className="text-lg font-bold text-brand-700 group-hover:text-brand-800">
                  {pick(pillars[p].label, locale)}
                </span>
                <span className="text-sm text-muted">
                  {t(`pillars.${p}Desc`)}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Discover — real attractions & monuments */}
      <section className="py-6">
        <Container>
          <SectionHeading
            kicker={pick(pillars.discover.label, locale)}
            title={t("home.discoverTitle")}
            action={
              <Link
                href={cityHref("discover")}
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2"
              >
                {t("common.viewAll")} <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {attractions.map((p) => (
              <PlaceCard key={p.slug} place={p} locale={locale} />
            ))}
          </div>
        </Container>
      </section>

      {/* Today — only shown when there are events */}
      {todayList.length ? (
        <section className="py-10">
          <Container>
            <SectionHeading
              kicker={t("nav.today")}
              title={t("home.todayTitle")}
              action={
                <Link
                  href="/today"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2"
                >
                  {t("common.viewAll")} <ArrowRight className="h-4 w-4" />
                </Link>
              }
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {todayList.map((e) => (
                <EventCard key={e.slug} event={e} locale={locale} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Guides */}
      <section className="py-10">
        <Container>
          <SectionHeading
            kicker={t("nav.guides")}
            title={t("home.guidesTitle")}
            action={
              <Link
                href="/guides"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2"
              >
                {t("common.viewAll")} <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {guides.map((g) => (
              <GuideCard key={g.slug} guide={g} locale={locale} />
            ))}
          </div>
        </Container>
      </section>

      {/* For business CTA */}
      <section className="py-10">
        <Container>
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-accent-600 to-accent-700 p-8 text-white sm:p-12">
            <h2 className="max-w-xl text-2xl font-bold sm:text-3xl">
              {t("home.forBusiness")}
            </h2>
            <p className="mt-3 max-w-xl text-accent-50/90">
              {t("home.forBusinessText")}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
