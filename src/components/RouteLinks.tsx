import { getTranslations } from "next-intl/server";
import { Footprints, Ruler, Clock, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { routeHref } from "@/lib/links";
import type { WalkingRoute } from "@/content/data/routes";

/**
 * "This place is a stop on these walks."
 *
 * The same block serves an attraction, a district and a metro station, because
 * in each case the question is the one a reader actually has — I am here, is
 * there a walk that takes this in? `stopOf` turns the answer into a position
 * ("stop 3 of 5") wherever the caller knows one, which is more use than a bare
 * title and gives the link an honest reason to exist.
 */
export async function RouteLinks({
  locale,
  routes,
  title,
  stopOf,
}: {
  locale: Locale;
  routes: WalkingRoute[];
  /** Heading; callers phrase it for their own context. */
  title: string;
  /** Optional 1-based position of the current page on each route. */
  stopOf?: (route: WalkingRoute) => number;
}) {
  if (!routes.length) return null;
  const t = await getTranslations({ locale });
  const el = locale === "el";

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {routes.map((r) => {
          const n = stopOf?.(r) ?? 0;
          return (
            <Link
              key={r.slug}
              href={routeHref(r.slug)}
              className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
            >
              <span className="flex items-start gap-2">
                <Footprints className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <span className="font-bold text-brand-700 group-hover:text-brand-800">
                  {pick(r.name, locale)}
                </span>
              </span>
              {n > 0 ? (
                <span className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                  {t("routes.stopPosition", { n, total: r.stops.length })}
                </span>
              ) : null}
              <span className="mt-2 flex-1 text-sm text-muted">
                {pick(r.blurb, locale)}
              </span>
              <span className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted">
                <span className="inline-flex items-center gap-1">
                  <Ruler className="h-3.5 w-3.5" />
                  {r.distanceKm} {el ? "χλμ" : "km"}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {r.durationMin} {el ? "λεπτά" : "min"}
                </span>
                <span className="ml-auto inline-flex items-center gap-1 font-semibold text-brand-700">
                  {t("common.readMore")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
