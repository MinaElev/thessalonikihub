import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import type { Pillar } from "@/lib/types";
import { pick } from "@/lib/types";
import { pillars } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { cityHref, collectionHref, pillarHref, placeHref } from "@/lib/links";
import { getCollection, getPlace, getPlaces } from "@/lib/repo";

type StayPillar = Exclude<Pillar, "events">;

export async function pillarIndexMetadata(
  pillar: StayPillar,
  locale: Locale,
): Promise<Metadata> {
  const t = await getTranslations({ locale });
  const label = pick(pillars[pillar].label, locale);
  return buildMetadata({
    locale,
    path: pillarHref(pillar),
    title: `${label} — Θεσσαλονίκη`,
    description: t(`pillars.${pillar}Desc`),
    // Don't index a pillar with no content yet.
    index: (await getPlaces(pillar)).length > 0,
  });
}

export async function cityMetadata(
  pillar: StayPillar,
  locale: Locale,
): Promise<Metadata> {
  const t = await getTranslations({ locale });
  const label = pick(pillars[pillar].label, locale);
  return buildMetadata({
    locale,
    path: cityHref(pillar),
    title: `${label} — ${t("listing.allIn")}`,
    description: t(`pillars.${pillar}Desc`),
    index: (await getPlaces(pillar)).length > 0,
  });
}

export async function collectionMetadata(
  pillar: StayPillar,
  slug: string,
  locale: Locale,
): Promise<Metadata> {
  const collection = getCollection(pillar, slug);
  if (!collection) return {};
  return buildMetadata({
    locale,
    path: collectionHref(collection),
    title: pick(collection.title, locale),
    description: pick(collection.metaDescription, locale),
  });
}

export async function placeMetadata(
  pillar: StayPillar,
  slug: string,
  locale: Locale,
): Promise<Metadata> {
  const place = await getPlace(pillar, slug);
  if (!place) return {};
  return buildMetadata({
    locale,
    path: placeHref(place),
    title: pick(place.name, locale),
    description: pick(place.summary, locale),
    images: place.photos[0] ? [place.photos[0].url] : undefined,
    type: "article",
  });
}
