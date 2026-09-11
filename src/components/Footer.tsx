import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui";
import { NewsletterForm } from "@/components/NewsletterForm";

/** The seven pillars: "I know what I am looking for". */
const exploreLinks = [
  { key: "stay", href: "/stay" },
  { key: "eat", href: "/eat" },
  { key: "drink", href: "/drink" },
  { key: "discover", href: "/discover" },
  { key: "events", href: "/events" },
  { key: "experiences", href: "/experiences" },
  { key: "services", href: "/services" },
] as const;

/** The editorial half, which a single seventeen-item column buried. */
const readLinks = [
  { key: "guides", href: "/guides" },
  { key: "metro", href: "/metro" },
  { key: "areas", href: "/areas" },
  { key: "whenToVisit", href: "/when-to-visit" },
  { key: "whatToEat", href: "/what-to-eat" },
  { key: "routes", href: "/routes" },
  { key: "festivals", href: "/festivals" },
  { key: "dayTrips", href: "/day-trips" },
  { key: "plan", href: "/plan" },
  { key: "forYou", href: "/for" },
] as const;

/**
 * These four were plain <li> text for pages that did not exist. They are links
 * now, and the pages behind them are real — a site that collects email
 * addresses needs somewhere to say what it does with them.
 */
const companyLinks = [
  { key: "footer.forBusiness", href: "/submit" },
  { key: "footer.about", href: "/info/about" },
  { key: "footer.contact", href: "/info/contact" },
  { key: "footer.privacy", href: "/info/privacy" },
  { key: "footer.terms", href: "/info/terms" },
] as const;

export function Footer() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-slate-100 bg-slate-50">
      <Container className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-2">
          <div className="text-lg font-extrabold">
            <span className="text-brand-700">Thessaloniki</span>
            <span className="text-accent-600">Hub</span>
          </div>
          <p className="mt-2 max-w-sm text-sm text-muted">
            {t("footer.tagline")}
          </p>
          <div className="mt-5 max-w-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              {t("newsletter.title")}
            </p>
            <p className="mb-2 mt-1 text-sm text-muted">
              {t("newsletter.subtitle")}
            </p>
            <NewsletterForm
              locale={locale}
              labels={{
                placeholder: t("newsletter.placeholder"),
                cta: t("newsletter.cta"),
                sending: t("newsletter.sending"),
                thanks: t("newsletter.thanks"),
                invalid: t("newsletter.invalid"),
                error: t("newsletter.error"),
                privacy: t("newsletter.privacy"),
              }}
            />
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              {t("footer.sisterSite")}
            </p>
            <a
              href="https://chalkidikihub.gr"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold transition hover:opacity-80"
            >
              <span className="text-brand-700">Chalkidiki</span>
              <span className="text-accent-600">Hub</span>
              <span className="font-normal text-muted">· chalkidikihub.gr</span>
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
            {t("footer.explore")}
          </h3>
          <ul className="space-y-2 text-sm text-slate-600">
            {exploreLinks.map((l) => (
              <li key={l.key}>
                <Link href={l.href} className="hover:text-brand-700">
                  {t(`nav.${l.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
            {t("footer.read")}
          </h3>
          <ul className="space-y-2 text-sm text-slate-600">
            {readLinks.map((l) => (
              <li key={l.key}>
                <Link href={l.href} className="hover:text-brand-700">
                  {t(`nav.${l.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
            {t("footer.company")}
          </h3>
          <ul className="space-y-2 text-sm text-slate-600">
            {companyLinks.map((l) => (
              <li key={l.key}>
                <Link href={l.href} className="hover:text-brand-700">
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <div className="border-t border-slate-200 py-4">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-slate-500 sm:flex-row">
          <p>
            © {year} ThessalonikiHub. {t("footer.rights")}
          </p>
          <p>thessalonikihub.gr</p>
        </Container>
      </div>
    </footer>
  );
}
