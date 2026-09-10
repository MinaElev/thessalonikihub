import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, UtensilsCrossed, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { dishHref, pillarHref } from "@/lib/links";
import { getDishes } from "@/content/data/dishes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dishes" });
  return buildMetadata({
    locale,
    path: "/what-to-eat",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function WhatToEatPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const list = getDishes();

  return (
    <Container className="py-8">
      <Breadcrumbs
        locale={locale}
        items={[{ label: t("common.home"), href: "/" }, { label: t("dishes.title") }]}
      />

      <header className="mb-8 max-w-3xl">
        <h1 className="inline-flex items-center gap-2 text-3xl font-extrabold sm:text-4xl">
          <UtensilsCrossed className="h-8 w-8 text-brand-600" /> {t("dishes.title")}
        </h1>
        <p className="mt-3 text-lg text-muted">{t("dishes.subtitle")}</p>
        <div className="mt-5 space-y-4 text-slate-700">
          <p>{t("dishes.introA")}</p>
          <p>{t("dishes.introB")}</p>
        </div>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        {list.map((d) => (
          <article
            key={d.slug}
            className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:border-brand-200 hover:shadow-md"
          >
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand-700">
                {t(`dishes.kind.${d.kind}`)}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted">
                <Clock className="h-3.5 w-3.5" /> {pick(d.whenToEat, locale)}
              </span>
            </div>
            <h2 className="text-xl font-bold leading-snug text-ink">
              <Link href={dishHref(d.slug)} className="hover:text-brand-700">
                {pick(d.name, locale)}
              </Link>
            </h2>
            <p className="mt-2 flex-1 text-sm text-muted">{pick(d.blurb, locale)}</p>
            <Link
              href={dishHref(d.slug)}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2"
            >
              {t("common.readMore")} <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">{t("dishes.whereTitle")}</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">{t("dishes.whereText")}</p>
        <Link
          href={pillarHref("eat")}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2"
        >
          {t("dishes.whereCta")} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Container>
  );
}
