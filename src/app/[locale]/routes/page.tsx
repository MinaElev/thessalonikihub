import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Footprints, Clock, Ruler } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { routeHref } from "@/lib/links";
import { getWalkingRoutes } from "@/content/data/routes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "routes" });
  return buildMetadata({
    locale,
    path: "/routes",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function RoutesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const list = getWalkingRoutes();

  return (
    <Container className="py-8">
      <Breadcrumbs
        locale={locale}
        items={[{ label: t("common.home"), href: "/" }, { label: t("routes.title") }]}
      />

      <header className="mb-8 max-w-3xl">
        <h1 className="inline-flex items-center gap-2 text-3xl font-extrabold sm:text-4xl">
          <Footprints className="h-8 w-8 text-brand-600" /> {t("routes.title")}
        </h1>
        <p className="mt-3 text-lg text-muted">{t("routes.subtitle")}</p>
        <div className="mt-5 space-y-4 text-slate-700">
          <p>{t("routes.introA")}</p>
          <p>{t("routes.introB")}</p>
        </div>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((r) => (
          <article
            key={r.slug}
            className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:border-brand-200 hover:shadow-md"
          >
            <h2 className="text-xl font-bold leading-snug text-ink">
              <Link href={routeHref(r.slug)} className="hover:text-brand-700">
                {pick(r.name, locale)}
              </Link>
            </h2>
            <p className="mt-2 flex-1 text-sm text-muted">{pick(r.blurb, locale)}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-muted">
              <span className="inline-flex items-center gap-1">
                <Ruler className="h-3.5 w-3.5" /> {r.distanceKm} km
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {r.durationMin}′
              </span>
              <span className="rounded-full bg-brand-50 px-2 py-0.5 text-brand-700">
                {t(`routes.difficulty.${r.difficulty}`)}
              </span>
            </div>
            <Link
              href={routeHref(r.slug)}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2"
            >
              {t("routes.walkIt")} <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>

      <p className="mt-8 text-xs text-muted">{t("routes.disclaimer")}</p>
    </Container>
  );
}
