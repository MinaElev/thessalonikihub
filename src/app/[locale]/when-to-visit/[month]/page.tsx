import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  CalendarDays,
  ArrowRight,
  ArrowLeft,
  Thermometer,
  CloudRain,
  Users,
  Waves,
  Sparkles,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { EventCard } from "@/components/EventCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MarkdownBody } from "@/components/MarkdownBody";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { monthHref } from "@/lib/links";
import { getUpcomingEvents } from "@/lib/repo";
import { cityMonths, getCityMonth, getCityMonths } from "@/content/data/months";

export function generateStaticParams() {
  return cityMonths.map((m) => ({ month: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; month: string }>;
}): Promise<Metadata> {
  const { locale, month } = await params;
  const m = getCityMonth(month);
  if (!m) return {};
  const name = pick(m.name, locale);
  const acc = pick(m.nameAcc, locale);
  return buildMetadata({
    locale,
    path: monthHref(month),
    title:
      locale === "el"
        ? `Θεσσαλονίκη τον ${acc} — καιρός, εκδηλώσεις, τι να κάνεις`
        : `Thessaloniki in ${name} — weather, events and what to do`,
    description: pick(m.blurb, locale),
  });
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Thermometer;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          {label}
        </p>
        <p className="mt-0.5 font-semibold text-ink">{value}</p>
      </div>
    </div>
  );
}

export default async function MonthPage({
  params,
}: {
  params: Promise<{ locale: Locale; month: string }>;
}) {
  const { locale, month } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const m = getCityMonth(month);
  if (!m) notFound();

  const el = locale === "el";
  const name = pick(m.name, locale);
  const acc = pick(m.nameAcc, locale);
  const ordered = getCityMonths();
  const i = ordered.findIndex((x) => x.slug === m.slug);
  const prev = ordered[(i - 1 + ordered.length) % ordered.length];
  const next = ordered[(i + 1) % ordered.length];

  // Events already in the database that fall in this calendar month.
  const upcoming = await getUpcomingEvents(60);
  const events = upcoming
    .filter((e) => new Date(e.startsAt).getMonth() + 1 === m.number)
    .slice(0, 4);

  const level = (v: "low" | "medium" | "high") => t(`months.level.${v}`);

  return (
    <Container className="py-4">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: el
                ? `Τι καιρό κάνει στη Θεσσαλονίκη τον ${acc};`
                : `What is the weather like in Thessaloniki in ${name}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: el
                  ? `Κατά μέσο όρο, η μέγιστη θερμοκρασία είναι γύρω στους ${m.tempHigh} °C και η ελάχιστη γύρω στους ${m.tempLow} °C. Πρόκειται για μέσες κλιματικές τιμές, όχι πρόγνωση.`
                  : `On average the daily maximum is around ${m.tempHigh} °C and the minimum around ${m.tempLow} °C. These are climate averages, not a forecast.`,
              },
            },
            {
              "@type": "Question",
              name: el
                ? `Μπορώ να κολυμπήσω στη Θεσσαλονίκη τον ${acc};`
                : `Can you swim in Thessaloniki in ${name}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: m.seaSwimmable
                  ? el
                    ? "Ναι, η θάλασσα είναι αρκετά ζεστή. Στην ίδια την πόλη όμως δεν κολυμπάς — οι κοντινότερες παραλίες είναι στην Περαία, την Αγία Τριάδα και τη Χαλκιδική."
                    : "Yes, the sea is warm enough. You don't swim in the city itself, though — the nearest beaches are at Peraia, Agia Triada and in Chalkidiki."
                  : el
                    ? "Όχι, η θάλασσα είναι πολύ κρύα αυτόν τον μήνα για κολύμπι."
                    : "No, the sea is too cold for swimming this month.",
              },
            },
          ],
        }}
      />

      <Breadcrumbs
        locale={locale}
        items={[
          { label: t("common.home"), href: "/" },
          { label: t("months.title"), href: "/when-to-visit" },
          { label: name },
        ]}
      />

      <header className="mb-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          {pick(m.season, locale)}
        </p>
        <h1 className="mt-1 inline-flex items-center gap-2 text-3xl font-extrabold sm:text-4xl">
          <CalendarDays className="h-7 w-7 text-brand-600" />
          {el ? `Θεσσαλονίκη τον ${acc}` : `Thessaloniki in ${name}`}
        </h1>
        <p className="mt-3 text-lg text-muted">{pick(m.blurb, locale)}</p>
      </header>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          icon={Thermometer}
          label={t("months.colTemp")}
          value={`${m.tempHigh}° / ${m.tempLow}°`}
        />
        <Stat icon={CloudRain} label={t("months.colRain")} value={level(m.rain)} />
        <Stat icon={Users} label={t("months.colCrowds")} value={level(m.crowds)} />
        <Stat
          icon={Waves}
          label={t("months.colSea")}
          value={m.seaSwimmable ? t("months.seaYes") : t("months.seaNo")}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0">
          <MarkdownBody>{pick(m.long, locale)}</MarkdownBody>

          {events.length ? (
            <section className="mt-10">
              <h2 className="mb-4 text-2xl font-bold">{t("months.eventsThisMonth")}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {events.map((e) => (
                  <EventCard key={e.slug} event={e} locale={locale} />
                ))}
              </div>
            </section>
          ) : null}

          <nav className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-6">
            <Link
              href={monthHref(prev.slug)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:gap-3"
            >
              <ArrowLeft className="h-4 w-4" /> {pick(prev.name, locale)}
            </Link>
            <Link
              href={monthHref(next.slug)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:gap-3"
            >
              {pick(next.name, locale)} <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted">
              <Sparkles className="h-4 w-4" /> {t("months.highlights")}
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              {m.highlights.map((h, idx) => (
                <li key={idx} className="flex gap-2">
                  <span aria-hidden="true" className="text-brand-500">
                    •
                  </span>
                  <span>{pick(h, locale)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">
              {t("months.otherMonths")}
            </h2>
            <div className="flex flex-wrap gap-2">
              {ordered
                .filter((x) => x.slug !== m.slug)
                .map((x) => (
                  <Link
                    key={x.slug}
                    href={monthHref(x.slug)}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-brand-300 hover:text-brand-700"
                  >
                    {pick(x.name, locale)}
                  </Link>
                ))}
            </div>
          </div>

          <p className="text-xs text-muted">{t("months.disclaimer")}</p>
        </aside>
      </div>
    </Container>
  );
}
