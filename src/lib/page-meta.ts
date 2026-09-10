import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import type { Pillar } from "@/lib/types";
import { pick } from "@/lib/types";
import { pillars } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { cityHref, collectionHref, pillarHref, placeHref } from "@/lib/links";
import { getCollection, getPlace, getPlaces } from "@/lib/repo";
import { getArea } from "@/content/data/areas";

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
  // Put the neighbourhood in the title: people search "fish taverna Kalamaria"
  // far more than they search a venue by name. buildMetadata appends the site
  // name, which already carries "Thessaloniki".
  const area = getArea(place.geo.area);
  const name = pick(place.name, locale);
  return buildMetadata({
    locale,
    path: placeHref(place),
    // Only append the area when the result still fits a search result. Long
    // names (and entities that aren't tied to one neighbourhood) keep the
    // plain name instead of a misleading or truncated suffix.
    title: area && name.length <= 40 ? `${name} — ${pick(area.name, locale)}` : name,
    description: pick(place.summary, locale),
    images: place.photos[0] ? [place.photos[0].url] : undefined,
    type: "article",
  });
}
