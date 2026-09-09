import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { Container, SectionHeading } from "@/components/ui";
import { EventCard } from "@/components/EventCard";
import { PlaceCard } from "@/components/PlaceCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/format";
import { getEventsOnDay, getUpcomingEvents, getPlaces } from "@/lib/repo";

// This page reflects "today", so it must never be statically cached.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "today" });
  return buildMetadata({
    locale,
    path: "/today",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function TodayPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const today = new Date();
  const eventsToday = getEventsOnDay(today);
  const upcoming = getUpcomingEvents(7).filter(
    (e) => !eventsToday.some((x) => x.slug === e.slug),
  );
  const experiences = getPlaces("experiences").slice(0, 3);

  return (
    <Container>
      <Breadcrumbs
        locale={locale}
        items={[{ label: t("common.home"), href: "/" }, { label: t("nav.today") }]}
      />
      <header className="mb-8 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent-600">
          {formatDate(today.toISOString(), locale)}
        </p>
        <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">
          {t("today.title")}
        </h1>
        <p className="mt-3 text-lg text-muted">{t("today.subtitle")}</p>
      </header>

      <section className="mb-12">
        <SectionHeading title={t("today.eventsToday")} />
        {eventsToday.length ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {eventsToday.map((e) => (
              <EventCard key={e.slug} event={e} locale={locale} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-slate-50 p-6 text-muted">
            {t("today.noEvents")}
          </p>
        )}
      </section>

      {upcoming.length ? (
        <section className="mb-12">
          <SectionHeading title={t("today.upcoming")} />
          <div className="grid gap-4 sm:grid-cols-2">
            {upcoming.map((e) => (
              <EventCard key={e.slug} event={e} locale={locale} />
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <SectionHeading title={pick({ el: "Εμπειρίες", en: "Experiences" }, locale)} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((p) => (
            <PlaceCard key={p.slug} place={p} locale={locale} />
          ))}
        </div>
      </section>
    </Container>
  );
}
