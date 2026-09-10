import { getTranslations } from "next-intl/server";
import { ArrowRight, UtensilsCrossed } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Collection, Pillar, Place } from "@/lib/types";
import { pick } from "@/lib/types";
import { Container, SectionHeading, Badge } from "@/components/ui";
import { PlaceCard } from "@/components/PlaceCard";
import { FilterableGrid } from "@/components/FilterableGrid";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MarkdownBody } from "@/components/MarkdownBody";
import { pillars } from "@/lib/site";
import { cityHref, collectionHref, pillarHref, whatToEatHref } from "@/lib/links";
import {
  getCollection,
  getCollections,
  getCollectionMembers,
  getPlaces,
} from "@/lib/repo";

type StayPillar = Exclude<Pillar, "events">;

function CollectionChips({
  collections,
  locale,
}: {
  collections: Collection[];
  locale: Locale;
}) {
  if (!collections.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {collections.map((c) => (
        <Link
          key={c.slug}
          href={collectionHref(c)}
          className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-brand-300 hover:text-brand-700"
        >
          {pick(c.heading, locale)}
        </Link>
      ))}
    </div>
  );
}

function Grid({ places, locale }: { places: Place[]; locale: Locale }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {places.map((p) => (
        <PlaceCard key={p.slug} place={p} locale={locale} />
      ))}
    </div>
  );
}

/**
 * Shown where a pillar has nothing yet. "Coming soon" left the visitor at a
 * dead end; naming why it is empty and offering the submission form turns the
 * gap into the one thing that can close it.
 */
function EmptyState({
  title,
  body,
  cta,
}: {
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
      <p className="font-bold text-ink">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">{body}</p>
      <Link
        href="/submit"
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
      >
        {cta} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

/** Pillar landing page: intro + curated collections + featured listings. */
export async function PillarIndex({
  pillar,
  locale,
}: {
  pillar: StayPillar;
  locale: Locale;
}) {
  const t = await getTranslations({ locale });
  const label = pick(pillars[pillar].label, locale);
  const collections = getCollections(pillar);
  const places = await getPlaces(pillar);

  return (
    <Container>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: t("common.home"), href: "/" },
          { label },
        ]}
      />
      <header className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{label} — Θεσσαλονίκη</h1>
        <p className="mt-3 text-lg text-muted">{t(`pillars.${pillar}Desc`)}</p>
        <div className="mt-5">
          <MarkdownBody>{t(`pillarIntro.${pillar}`)}</MarkdownBody>
        </div>
      </header>

      {pillar === "eat" ? (
        <Link
          href={whatToEatHref()}
          className="mb-10 flex items-start gap-4 rounded-2xl border border-brand-200 bg-brand-50 p-5 transition hover:border-brand-300"
        >
          <UtensilsCrossed className="mt-0.5 h-6 w-6 shrink-0 text-brand-700" />
          <span>
            <span className="block font-bold text-brand-900">
              {t("dishes.title")}
            </span>
            <span className="mt-1 block text-sm text-brand-900/80">
              {t("dishes.subtitle")}
            </span>
          </span>
          <ArrowRight className="ml-auto mt-1 h-5 w-5 shrink-0 text-brand-700" />
        </Link>
      ) : null}

      {collections.length ? (
        <section className="mb-10">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
            {t("listing.collectionsTitle")}
          </h2>
          <CollectionChips collections={collections} locale={locale} />
        </section>
      ) : null}

      <SectionHeading
        title={t("listing.allIn")}
        action={
          // Nothing to see all of — the link led to a "0 listings" page.
          places.length ? (
            <Link
              href={cityHref(pillar)}
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2"
            >
              {t("common.viewAll")} <ArrowRight className="h-4 w-4" />
            </Link>
          ) : undefined
        }
      />
      {places.length ? (
        <Grid places={places.slice(0, 6)} locale={locale} />
      ) : (
        <EmptyState
          title={t("listing.emptyTitle")}
          body={t("listing.emptyBody")}
          cta={t("listing.emptyCta")}
        />
      )}
    </Container>
  );
}

/** City listing: every entity of a pillar in Thessaloniki. */
export async function CityListing({
  pillar,
  locale,
}: {
  pillar: StayPillar;
  locale: Locale;
}) {
  const t = await getTranslations({ locale });
  const label = pick(pillars[pillar].label, locale);
  const collections = getCollections(pillar);
  const places = await getPlaces(pillar);

  return (
    <Container>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: t("common.home"), href: "/" },
          { label, href: pillarHref(pillar) },
          { label: "Θεσσαλονίκη" },
        ]}
      />
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          {label} — {t("listing.allIn")}
        </h1>
        <p className="mt-2 text-muted">
          {t("listing.resultsCount", { count: places.length })}
        </p>
      </header>

      {collections.length ? (
        <div className="mb-8">
          <CollectionChips collections={collections} locale={locale} />
        </div>
      ) : null}

      {places.length ? (
        <FilterableGrid places={places} locale={locale} allLabel={t("common.all")} />
      ) : (
        <EmptyState
          title={t("listing.emptyTitle")}
          body={t("listing.emptyBody")}
          cta={t("listing.emptyCta")}
        />
      )}
    </Container>
  );
}

/**
 * Curated collection page (area / type / intent). Renders the unique editorial
 * intro so the page carries real, indexable value — never a thin filter page.
 */
export async function CollectionListing({
  pillar,
  slug,
  locale,
}: {
  pillar: StayPillar;
  slug: string;
  locale: Locale;
}) {
  const t = await getTranslations({ locale });
  const collection = getCollection(pillar, slug);
  if (!collection) return null;
  const label = pick(pillars[pillar].label, locale);
  const members = await getCollectionMembers(collection);

  return (
    <Container>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: t("common.home"), href: "/" },
          { label, href: pillarHref(pillar) },
          { label: "Θεσσαλονίκη", href: cityHref(pillar) },
          { label: pick(collection.heading, locale) },
        ]}
      />
      <header className="mb-6 max-w-3xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          {pick(collection.heading, locale)}
        </h1>
        <div className="mt-4">
          <MarkdownBody>{pick(collection.intro, locale)}</MarkdownBody>
        </div>
      </header>

      <div className="mb-4">
        <Badge tone="neutral">{t("listing.filterNote")}</Badge>
      </div>

      {members.length ? (
        <Grid places={members} locale={locale} />
      ) : (
        <p className="text-muted">{t("common.loadingSoon")}</p>
      )}
    </Container>
  );
}
