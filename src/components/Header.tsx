import { useTranslations } from "next-intl";
import { User, ChevronDown, Menu } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { MenuAutoClose } from "@/components/MenuAutoClose";
import { Container } from "@/components/ui";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

/**
 * The seven pillars stay on the bar: they are the product's spine and its
 * commercial surface. Everything else is supporting content, grouped by what
 * the visitor is trying to do rather than by how the site is built.
 */
const primaryNav = [
  { key: "stay", href: "/stay" },
  { key: "eat", href: "/eat" },
  { key: "drink", href: "/drink" },
  { key: "discover", href: "/discover" },
  { key: "events", href: "/events" },
  { key: "experiences", href: "/experiences" },
  { key: "services", href: "/services" },
] as const;

const exploreGroups = [
  {
    key: "groupCity",
    items: [
      { key: "areas", href: "/areas" },
      { key: "metro", href: "/metro" },
      { key: "map", href: "/map" },
      { key: "routes", href: "/routes" },
    ],
  },
  {
    key: "groupWhatsOn",
    items: [
      { key: "today", href: "/today" },
      { key: "festivals", href: "/festivals" },
      { key: "whenToVisit", href: "/when-to-visit" },
    ],
  },
  {
    key: "groupGuide",
    items: [
      { key: "guides", href: "/guides" },
      { key: "whatToEat", href: "/what-to-eat" },
      { key: "plan", href: "/plan" },
      { key: "forYou", href: "/for" },
    ],
  },
  {
    key: "groupTrips",
    items: [
      { key: "dayTrips", href: "/day-trips" },
      { key: "combos", href: "/thessaloniki-and-chalkidiki" },
    ],
  },
] as const;

export function Header() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <MenuAutoClose />
      <Container className="flex h-16 items-center gap-4">
        <Link href="/" className="shrink-0 text-lg font-extrabold tracking-tight">
          <span className="text-brand-700">Thessaloniki</span>
          <span className="text-accent-600">Hub</span>
        </Link>

        {/* Desktop: pillars + one grouped mega-menu. */}
        <nav
          aria-label="Primary"
          className="ml-2 hidden flex-1 items-center gap-0.5 lg:flex"
        >
          {primaryNav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-700"
            >
              {t(item.key)}
            </Link>
          ))}

          <details data-menu className="group relative [&_summary::-webkit-details-marker]:hidden">
            <summary
              className="flex cursor-pointer list-none items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-700 group-open:bg-brand-50 group-open:text-brand-700"
            >
              {t("explore")}
              <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
            </summary>
            <div className="absolute right-0 top-full z-50 mt-1 w-[min(44rem,calc(100vw-2rem))] rounded-2xl border border-slate-100 bg-white p-5 shadow-lg">
              <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
                {exploreGroups.map((group) => (
                  <div key={group.key}>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">
                      {t(group.key)}
                    </p>
                    <ul className="space-y-0.5">
                      {group.items.map((item) => (
                        <li key={item.key}>
                          <Link
                            href={item.href}
                            className="block rounded-lg px-2 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-700"
                          >
                            {t(item.key)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
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

      {/* Mobile / tablet: one button opening the same grouped structure,
          instead of a long horizontal scroll of every link. */}
      <details data-menu className="group border-t border-slate-100 lg:hidden [&_summary::-webkit-details-marker]:hidden">
        {/* <summary> must be the first child of <details>, otherwise the
            browser ignores it and renders its own "Details" marker. */}
        <summary className="cursor-pointer list-none">
          <Container className="flex items-center gap-2 py-3 text-sm font-semibold text-slate-700">
            <Menu className="h-5 w-5 text-brand-600" />
            {t("menu")}
            <ChevronDown className="ml-auto h-4 w-4 transition group-open:rotate-180" />
          </Container>
        </summary>
        <nav
          aria-label="Primary mobile"
          className="border-t border-slate-100 bg-slate-50"
        >
          <Container className="py-4">
            <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3">
              {primaryNav.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="block rounded-xl bg-white px-3 py-2.5 text-sm font-semibold text-brand-700 shadow-sm transition hover:bg-brand-50"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {exploreGroups.map((group) => (
                <div key={group.key}>
                  <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-muted">
                    {t(group.key)}
                  </p>
                  <ul className="grid grid-cols-2 gap-0.5">
                    {group.items.map((item) => (
                      <li key={item.key}>
                        <Link
                          href={item.href}
                          className="block rounded-lg px-2 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-brand-700"
                        >
                          {t(item.key)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <Link
              href="/submit"
              className="mt-5 block rounded-full bg-accent-600 px-4 py-2.5 text-center text-sm font-semibold text-white sm:hidden"
            >
              + {t("submit")}
            </Link>
          </Container>
        </nav>
      </details>
    </header>
  );
}
