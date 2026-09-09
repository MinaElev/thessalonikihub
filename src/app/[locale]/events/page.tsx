import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui";
import { EventCard } from "@/components/EventCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { getUpcomingEvents } from "@/lib/repo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "events" });
  return buildMetadata({
    locale,
    path: "/events",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const events = await getUpcomingEvents(60);

  return (
    <Container>
      <Breadcrumbs
        locale={locale}
        items={[{ label: t("common.home"), href: "/" }, { label: t("events.title") }]}
      />
      <header className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{t("events.title")}</h1>
        <p className="mt-3 text-lg text-muted">{t("events.subtitle")}</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        {events.map((e) => (
          <EventCard key={e.slug} event={e} locale={locale} />
        ))}
      </div>
    </Container>
  );
}
