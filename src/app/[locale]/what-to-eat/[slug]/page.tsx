import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { UtensilsCrossed, Clock, MapPin, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MarkdownBody } from "@/components/MarkdownBody";
import { buildMetadata } from "@/lib/seo";
import { areaHref, dishHref, pillarHref } from "@/lib/links";
import { getArea } from "@/content/data/areas";
import { dishes, getDish, getDishes } from "@/content/data/dishes";

export function generateStaticParams() {
  return dishes.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const d = getDish(slug);
  if (!d) return {};
  const name = pick(d.name, locale);
  return buildMetadata({
    locale,
    path: dishHref(slug),
    title:
      locale === "el"
        ? `${name} — ιστορία, παραλλαγές και πώς τρώγεται`
        : `${name} — history, versions and how it's eaten`,
    description: pick(d.blurb, locale),
  });
}

export default async function DishPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const d = getDish(slug);
  if (!d) notFound();

  const name = pick(d.name, locale);
  const areas = (d.areas ?? [])
    .map((a) => getArea(a))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const others = getDishes().filter((x) => x.slug !== d.slug);

  return (
    <Container className="py-4">
      <Breadcrumbs
        locale={locale}
        items={[
          { label: t("common.home"), href: "/" },
          { label: t("dishes.title"), href: "/what-to-eat" },
          { label: name },
        ]}
      />

      <header className="mb-6 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand-700">
            {t(`dishes.kind.${d.kind}`)}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted">
            <Clock className="h-3.5 w-3.5" /> {pick(d.whenToEat, locale)}
          </span>
        </div>
        <h1 className="mt-2 inline-flex items-start gap-2 text-3xl font-extrabold sm:text-4xl">
          <UtensilsCrossed className="mt-1 h-7 w-7 shrink-0 text-brand-600" /> {name}
        </h1>
        <p className="mt-3 text-lg text-muted">{pick(d.blurb, locale)}</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_290px]">
        <div className="min-w-0">
          <MarkdownBody locale={locale} selfHref={dishHref(d.slug)}>
            {pick(d.long, locale)}
          </MarkdownBody>

          <section className="mt-10">
            <h2 className="mb-4 text-2xl font-bold">{t("dishes.more")}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={dishHref(o.slug)}
                  className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {t(`dishes.kind.${o.kind}`)}
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
          {areas.length ? (
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">
                {t("dishes.whereAreas")}
              </h2>
              <div className="flex flex-col gap-2">
                {areas.map((a) => (
                  <Link
                    key={a.slug}
                    href={areaHref(a.slug)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
                  >
                    <MapPin className="h-4 w-4" /> {pick(a.name, locale)}
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <Link
            href={pillarHref("eat")}
            className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-white p-5 text-sm font-semibold text-brand-700 shadow-sm transition hover:border-brand-200"
          >
            <UtensilsCrossed className="h-4 w-4" /> {t("dishes.whereCta")}
            <ArrowRight className="ml-auto h-4 w-4" />
          </Link>

          <p className="text-xs text-muted">{t("dishes.disclaimer")}</p>
        </aside>
      </div>
    </Container>
  );
}
