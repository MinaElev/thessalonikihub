import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Route, ArrowRight, ExternalLink, Car } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { getCombos } from "@/content/data/combos";

const SISTER_SITE = "https://chalkidikihub.gr";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "combos" });
  return buildMetadata({
    locale,
    path: "/thessaloniki-and-chalkidiki",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function CombosPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const list = getCombos();
  const el = locale === "el";

  return (
    <Container className="py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: el
                ? "Πόσο απέχει η Χαλκιδική από τη Θεσσαλονίκη;"
                : "How far is Chalkidiki from Thessaloniki?",
              acceptedAnswer: {
                "@type": "Answer",
                text: el
                  ? "Η Κασσάνδρα, η πιο κοντινή χερσόνησος, απέχει περίπου μία ώρα με αυτοκίνητο. Η Σιθωνία θέλει περίπου μιάμιση ώρα. Τα καλοκαιρινά σαββατοκύριακα η έξοδος από την πόλη αργεί αισθητά."
                  : "Kassandra, the nearest peninsula, is about an hour by car. Sithonia takes roughly an hour and a half. On summer weekends leaving the city takes noticeably longer.",
              },
            },
            {
              "@type": "Question",
              name: el
                ? "Μπορώ να συνδυάσω Θεσσαλονίκη και Χαλκιδική σε ένα ταξίδι;"
                : "Can I combine Thessaloniki and Chalkidiki in one trip?",
              acceptedAnswer: {
                "@type": "Answer",
                text: el
                  ? "Ναι, και είναι ο συνηθέστερος συνδυασμός. Με τρεις μέρες κάνεις την πόλη και μία μονοήμερη στη θάλασσα· με πέντε ή επτά αξίζει να διανυκτερεύσεις στη Χαλκιδική."
                  : "Yes, and it is the most common combination. With three days you can do the city plus a day at the sea; with five or seven it's worth staying overnight in Chalkidiki.",
              },
            },
          ],
        }}
      />

      <Breadcrumbs
        locale={locale}
        items={[{ label: t("common.home"), href: "/" }, { label: t("combos.title") }]}
      />

      <header className="mb-8 max-w-3xl">
        <h1 className="inline-flex items-center gap-2 text-3xl font-extrabold sm:text-4xl">
          <Route className="h-8 w-8 text-brand-600" /> {t("combos.title")}
        </h1>
        <p className="mt-3 text-lg text-muted">{t("combos.subtitle")}</p>
        <div className="mt-5 space-y-4 text-slate-700">
          <p>{t("combos.introA")}</p>
          <p>{t("combos.introB")}</p>
        </div>
      </header>

      <div className="mb-10 flex flex-wrap items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <Car className="mt-0.5 h-6 w-6 shrink-0 text-brand-600" />
        <p className="min-w-0 flex-1 text-sm text-slate-700">
          {t("combos.drivingNote")}
        </p>
      </div>

      <div className="space-y-10">
        {list.map((c) => (
          <section
            key={c.slug}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand-700">
                {c.nights} {t("combos.days")}
              </span>
              <span className="text-xs font-semibold text-muted">
                {pick(c.bestFor, locale)}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-ink">{pick(c.name, locale)}</h2>
            <p className="mt-2 text-muted">{pick(c.blurb, locale)}</p>

            <ol className="mt-6 space-y-4">
              {c.days.map((d) => (
                <li key={d.day} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                    {d.day}
                  </span>
                  <div className="min-w-0 flex-1 border-b border-slate-50 pb-4 last:border-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                      {pick(d.where, locale)}
                    </p>
                    <h3 className="font-bold text-ink">
                      {d.href ? (
                        <Link href={d.href} className="hover:text-brand-700">
                          {pick(d.title, locale)}
                        </Link>
                      ) : (
                        pick(d.title, locale)
                      )}
                    </h3>
                    <p className="mt-1 text-sm text-slate-700">
                      {pick(d.detail, locale)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <section className="mt-10 rounded-2xl bg-gradient-to-r from-brand-700 to-brand-900 p-8 text-white sm:p-10">
        <h2 className="max-w-xl text-2xl font-bold">{t("combos.sisterTitle")}</h2>
        <p className="mt-3 max-w-2xl text-brand-50/90">{t("combos.sisterText")}</p>
        <a
          href={SISTER_SITE}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-brand-800 transition hover:bg-brand-50"
        >
          chalkidikihub.gr <ExternalLink className="h-4 w-4" />
        </a>
      </section>

      <Link
        href="/day-trips"
        className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2"
      >
        {t("combos.allDayTrips")} <ArrowRight className="h-4 w-4" />
      </Link>
    </Container>
  );
}
