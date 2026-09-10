import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, CalendarDays, Waves, Thermometer } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { monthHref } from "@/lib/links";
import { getCityMonths, getCurrentMonth } from "@/content/data/months";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "months" });
  return buildMetadata({
    locale,
    path: "/when-to-visit",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function WhenToVisitPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const months = getCityMonths();
  const current = getCurrentMonth();

  const level = (v: "low" | "medium" | "high") => t(`months.level.${v}`);

  return (
    <Container className="py-8">
      <Breadcrumbs
        locale={locale}
        items={[{ label: t("common.home"), href: "/" }, { label: t("months.title") }]}
      />

      <header className="mb-8 max-w-3xl">
        <h1 className="inline-flex items-center gap-2 text-3xl font-extrabold sm:text-4xl">
          <CalendarDays className="h-8 w-8 text-brand-600" /> {t("months.title")}
        </h1>
        <p className="mt-3 text-lg text-muted">{t("months.subtitle")}</p>
        <div className="mt-5 space-y-4 text-slate-700">
          <p>{t("months.introA")}</p>
          <p>{t("months.introB")}</p>
        </div>
      </header>

      <div className="mb-8 rounded-2xl border border-brand-200 bg-brand-50 p-5">
        <p className="text-sm text-brand-900">
          {t("months.rightNow")}{" "}
          <Link
            href={monthHref(current.slug)}
            className="font-semibold underline underline-offset-2"
          >
            {pick(current.name, locale)}
          </Link>{" "}
          — {pick(current.blurb, locale)}
        </p>
      </div>

      {/* Year at a glance */}
      <section className="mb-10">
        <h2 className="mb-1 text-2xl font-bold">{t("months.tableTitle")}</h2>
        <p className="mb-4 text-sm text-muted">{t("months.tableNote")}</p>
        <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3 font-semibold">{t("months.colMonth")}</th>
                <th className="px-4 py-3 font-semibold">{t("months.colTemp")}</th>
                <th className="px-4 py-3 font-semibold">{t("months.colRain")}</th>
                <th className="px-4 py-3 font-semibold">{t("months.colCrowds")}</th>
                <th className="px-4 py-3 font-semibold">{t("months.colSea")}</th>
              </tr>
            </thead>
            <tbody>
              {months.map((m) => (
                <tr
                  key={m.slug}
                  className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={monthHref(m.slug)}
                      className="font-semibold text-brand-700 hover:text-brand-800"
                    >
                      {pick(m.name, locale)}
                    </Link>
                  </td>
                  <td className="px-4 py-3 tabular-nums text-slate-700">
                    {m.tempHigh}° / {m.tempLow}°
                  </td>
                  <td className="px-4 py-3 text-slate-700">{level(m.rain)}</td>
                  <td className="px-4 py-3 text-slate-700">{level(m.crowds)}</td>
                  <td className="px-4 py-3 text-slate-700">
                    {m.seaSwimmable ? t("months.seaYes") : t("months.seaNo")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Month cards */}
      <section>
        <h2 className="mb-4 text-2xl font-bold">{t("months.allMonths")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {months.map((m) => (
            <Link
              key={m.slug}
              href={monthHref(m.slug)}
              className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
            >
              <span className="flex items-center justify-between gap-2">
                <span className="text-lg font-bold text-brand-700 group-hover:text-brand-800">
                  {pick(m.name, locale)}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold tabular-nums text-muted">
                  <Thermometer className="h-3.5 w-3.5" />
                  {m.tempHigh}°
                </span>
              </span>
              <span className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">
                {pick(m.season, locale)}
              </span>
              <span className="mt-2 flex-1 text-sm text-muted">
                {pick(m.blurb, locale)}
              </span>
              {m.seaSwimmable ? (
                <span className="mt-3 inline-flex w-fit items-center gap-1 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                  <Waves className="h-3.5 w-3.5" /> {t("months.seaYes")}
                </span>
              ) : null}
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                {t("common.readMore")} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-8 text-xs text-muted">{t("months.disclaimer")}</p>
    </Container>
  );
}
