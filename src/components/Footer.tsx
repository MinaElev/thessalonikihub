import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui";

const exploreLinks = [
  { key: "stay", href: "/stay" },
  { key: "eat", href: "/eat" },
  { key: "drink", href: "/drink" },
  { key: "discover", href: "/discover" },
  { key: "events", href: "/events" },
  { key: "experiences", href: "/experiences" },
  { key: "services", href: "/services" },
  { key: "areas", href: "/areas" },
  { key: "dayTrips", href: "/day-trips" },
  { key: "forYou", href: "/for" },
  { key: "plan", href: "/plan" },
  { key: "guides", href: "/guides" },
] as const;

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-slate-100 bg-slate-50">
      <Container className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <div className="text-lg font-extrabold">
            <span className="text-brand-700">Thessaloniki</span>
            <span className="text-accent-600">Hub</span>
          </div>
          <p className="mt-2 max-w-sm text-sm text-muted">
            {t("footer.tagline")}
          </p>
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
            {t("footer.company")}
          </h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>{t("footer.forBusiness")}</li>
            <li>{t("footer.about")}</li>
            <li>{t("footer.contact")}</li>
            <li>{t("footer.privacy")}</li>
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
