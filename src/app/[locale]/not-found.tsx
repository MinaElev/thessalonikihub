import { getTranslations } from "next-intl/server";
import { Search as SearchIcon, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui";

/**
 * A 404 is a fork in the road, not a dead end: give the visitor a search box
 * and the seven pillars, so a mistyped or retired URL still leads somewhere.
 */
export default async function NotFound() {
  const t = await getTranslations();

  const shortcuts = [
    { href: "/discover", label: t("nav.discover") },
    { href: "/eat", label: t("nav.eat") },
    { href: "/stay", label: t("nav.stay") },
    { href: "/drink", label: t("nav.drink") },
    { href: "/events", label: t("nav.events") },
    { href: "/metro", label: t("nav.metro") },
    { href: "/areas", label: t("nav.areas") },
    { href: "/guides", label: t("nav.guides") },
  ];

  return (
    <Container className="py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-6xl font-extrabold text-brand-600">404</p>
        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">{t("common.notFoundTitle")}</h1>
        <p className="mt-3 text-muted">{t("common.notFoundBody")}</p>

        <form
          action="/search"
          className="mx-auto mt-7 flex max-w-md items-center gap-2 rounded-full border border-slate-200 bg-white p-2 shadow-sm"
        >
          <SearchIcon className="ml-2 h-5 w-5 shrink-0 text-slate-400" />
          <input
            type="text"
            name="q"
            placeholder={t("search.placeholder")}
            aria-label={t("search.placeholder")}
            className="w-full bg-transparent outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-brand-600 px-5 py-2 font-semibold text-white transition hover:bg-brand-700"
          >
            {t("search.button")}
          </button>
        </form>

        <p className="mt-10 text-xs font-bold uppercase tracking-wide text-slate-400">
          {t("common.popularPages")}
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {shortcuts.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium transition hover:border-brand-300 hover:text-brand-700"
            >
              {s.label}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-1 font-semibold text-brand-700 hover:gap-2"
        >
          {t("common.home")} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Container>
  );
}
