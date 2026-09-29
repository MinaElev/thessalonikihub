import { useLocale, useTranslations } from "next-intl";
import { User, ChevronDown, Menu, Search } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { MenuAutoClose } from "@/components/MenuAutoClose";
import { Container } from "@/components/ui";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

/**
 * Five pillars on the bar, not seven.
 *
 * All seven plus the Explore menu left roughly 70px of slack in a 1152px
 * container at 1440 wide, which is what made the bar feel cramped and forced
 * the call to action onto two lines. Experiences and Services are the two with
 * the least behind them, so they moved into the mega menu rather than one of
 * the categories people actually browse by.
 */
const primaryNav = [
  { key: "stay", href: "/stay" },
  { key: "eat", href: "/eat" },
  { key: "drink", href: "/drink" },
  { key: "discover", href: "/discover" },
  { key: "events", href: "/events" },
] as const;

const exploreGroups = [
  {
    key: "groupCity",
    items: [
      { key: "areas", href: "/areas" },
      { key: "metro", href: "/metro" },
      { key: "map", href: "/map" },
      { key: "routes", href: "/routes" },
      { key: "services", href: "/services" },
    ],
  },
  {
    key: "groupWhatsOn",
    items: [
      { key: "today", href: "/today" },
      { key: "weekend", href: "/this-weekend" },
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
      { key: "experiences", href: "/experiences" },
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
  const ts = useTranslations("search");
  const locale = useLocale();
  // A plain GET form, so search works with JavaScript switched off and the
  // result is a shareable URL. `Link` cannot express a form action.
  const searchAction = locale === "el" ? "/search" : `/${locale}/search`;

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
          {/* Desktop only: the phone gets a real field in the row below.
              There is about 145px of slack in the bar at 1440 and less as it
              narrows, which is not enough for an input anyone could type in. */}
          <Link
            href="/search"
            aria-label={t("search")}
            className="hidden rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-brand-300 hover:text-brand-700 lg:inline-flex"
          >
            <Search className="h-4 w-4" />
          </Link>
          <Link
            href="/submit"
            className="hidden whitespace-nowrap rounded-full bg-accent-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-700 sm:inline-block"
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

      {/* Mobile / tablet: search and one menu button, side by side.
          Search used to live only in the homepage hero, which meant that from
          every other page on a phone there was no way to search at all. */}
      <div className="border-t border-slate-100 lg:hidden">
        <Container className="flex items-center gap-2 py-2">
          <form
            action={searchAction}
            role="search"
            className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 focus-within:border-brand-300"
          >
            <Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              name="q"
              placeholder={ts("placeholder")}
              aria-label={ts("placeholder")}
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </form>

          <details data-menu className="group shrink-0 [&_summary::-webkit-details-marker]:hidden">
            {/* <summary> must be the first child of <details>, otherwise the
                browser ignores it and renders its own "Details" marker. */}
            <summary className="flex cursor-pointer list-none items-center gap-1.5 rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 group-open:border-brand-300 group-open:text-brand-700">
              <Menu className="h-4 w-4 text-brand-600" />
              {t("menu")}
              <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
            </summary>
            <nav
              aria-label="Primary mobile"
              /* Anchored to the header itself, which is `sticky` and so a
                 containing block, so the panel spans the full width rather
                 than the width of this button. Capped and scrollable because
                 the full menu is taller than a phone screen, and a sticky
                 header taller than the viewport traps the page. */
              className="absolute inset-x-0 top-full max-h-[70vh] overflow-y-auto border-y border-slate-100 bg-slate-50 shadow-lg"
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
        </Container>
      </div>
    </header>
  );
}
