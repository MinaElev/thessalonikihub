import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui";
import { MapClient } from "@/components/map/MapClient";
import { buildMetadata } from "@/lib/seo";
import { getMapPoints } from "@/lib/mappoints";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "map" });
  return buildMetadata({
    locale,
    path: "/map",
    title: t("title"),
    description: t("subtitle"),
    index: false,
  });
}

export default async function MapPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const points = getMapPoints(locale);

  return (
    <Container className="py-8">
      <header className="mb-6 max-w-2xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{t("map.title")}</h1>
        <p className="mt-2 text-muted">{t("map.subtitle")}</p>
      </header>
      <MapClient points={points} locale={locale} />
    </Container>
  );
}
