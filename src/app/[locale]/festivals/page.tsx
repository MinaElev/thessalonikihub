import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, PartyPopper, CalendarDays } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { festivalHref, monthHref } from "@/lib/links";
import { getFestivals } from "@/content/data/festivals";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "festivals" });
  return buildMetadata({
    locale,
    path: "/festivals",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function FestivalsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const list = getFestivals();

  return (
    <Container className="py-8">
      <Breadcrumbs
        locale={locale}
        items={[
          { label: t("common.home"), href: "/" },
          { label: t("festivals.title") },
        ]}
      />

      <header className="mb-8 max-w-3xl">
        <h1 className="inline-flex items-center gap-2 text-3xl font-extrabold sm:text-4xl">
          <PartyPopper className="h-8 w-8 text-brand-600" /> {t("festivals.title")}
        </h1>
        <p className="mt-3 text-lg text-muted">{t("festivals.subtitle")}</p>
        <div className="mt-5 space-y-4 text-slate-700">
          <p>{t("festivals.introA")}</p>
          <p>{t("festivals.introB")}</p>
        </div>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        {list.map((f) => (
          <article
            key={f.slug}
            className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:border-brand-200 hover:shadow-md"
          >
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand-700">
                {pick(f.shortName, locale)}
              </span>
              <Link
                href={monthHref(f.monthSlug)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-muted hover:text-brand-700"
              >
                <CalendarDays className="h-3.5 w-3.5" />
                {pick(f.monthLabel, locale)}
              </Link>
              <span className="text-xs tabular-nums text-muted">
                {t("festivals.since")} {f.founded}
              </span>
            </div>
            <h2 className="text-xl font-bold leading-snug text-ink">
              <Link
                href={festivalHref(f.slug)}
                className="hover:text-brand-700"
              >
                {pick(f.name, locale)}
              </Link>
            </h2>
            <p className="mt-2 flex-1 text-sm text-muted">{pick(f.blurb, locale)}</p>
            <Link
              href={festivalHref(f.slug)}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2"
            >
              {t("common.readMore")} <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>

      <p className="mt-8 text-xs text-muted">{t("festivals.disclaimer")}</p>
    </Container>
  );
}
