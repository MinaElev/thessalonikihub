import { useTranslations } from "next-intl";
import { User, ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

// The seven pillars stay visible; secondary pages move into a "More" menu so
// the bar doesn't overflow.
const primaryNav = [
  { key: "stay", href: "/stay" },
  { key: "eat", href: "/eat" },
  { key: "drink", href: "/drink" },
  { key: "discover", href: "/discover" },
  { key: "events", href: "/events" },
  { key: "experiences", href: "/experiences" },
  { key: "services", href: "/services" },
] as const;

const moreNav = [
  { key: "metro", href: "/metro" },
  { key: "whenToVisit", href: "/when-to-visit" },
  { key: "festivals", href: "/festivals" },
  { key: "whatToEat", href: "/what-to-eat" },
  { key: "routes", href: "/routes" },
  { key: "areas", href: "/areas" },
  { key: "dayTrips", href: "/day-trips" },
  { key: "map", href: "/map" },
  { key: "today", href: "/today" },
  { key: "guides", href: "/guides" },
  { key: "plan", href: "/plan" },
] as const;

// Mobile shows everything in one scrollable row.
const allNav = [...primaryNav, ...moreNav];

export function Header() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center gap-4">
        <Link href="/" className="shrink-0 text-lg font-extrabold tracking-tight">
          <span className="text-brand-700">Thessaloniki</span>
          <span className="text-accent-600">Hub</span>
        </Link>

        <nav
          aria-label="Primary"
          className="ml-2 hidden flex-1 items-center gap-1 lg:flex"
        >
          {primaryNav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-700"
            >
              {t(item.key)}
            </Link>
          ))}

          {/* "More" dropdown — native <details>, no JS. Toggles on click and
              is keyboard accessible; navigating a link reloads and closes it. */}
          <details className="group relative [&_summary::-webkit-details-marker]:hidden">
            <summary
              aria-haspopup="true"
              className="flex cursor-pointer list-none items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-700 group-open:bg-brand-50 group-open:text-brand-700"
            >
              {t("more")}
              <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
            </summary>
            <div className="absolute right-0 top-full z-50 mt-1 w-52 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-lg">
              {moreNav.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="block whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-700"
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>
          </details>
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Link
            href="/submit"
            className="hidden rounded-full bg-accent-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-700 sm:inline-block"
          >
            + {t("submit")}
          </Link>
          <Link
            href="/dashboard"
            aria-label={t("account")}
            className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-brand-300 hover:text-brand-700"
          >
            <User className="h-4 w-4" />
          </Link>
          <LanguageSwitcher />
        </div>
      </Container>

      {/* Mobile / tablet horizontal nav */}
      <nav
        aria-label="Primary mobile"
        className="border-t border-slate-100 lg:hidden"
      >
        <Container className="flex items-center gap-1 overflow-x-auto py-2">
          {allNav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-700"
            >
              {t(item.key)}
            </Link>
          ))}
        </Container>
      </nav>
    </header>
  );
}
