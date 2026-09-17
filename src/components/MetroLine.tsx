import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { metroStationHref } from "@/lib/links";
import { getMetroStations, type MetroStation } from "@/content/data/metro";

/**
 * The whole line, drawn, with every station linked by name.
 *
 * The station pages used to link onward through a prev/next pair and nothing
 * else, which left each one reachable from about three places on the site and
 * the anchor text saying "next stop" rather than where you were going. Drawing
 * the line puts every station one click and one honest anchor from every other
 * — and the pages that already rank pass some of that on to the ones that
 * never got crawled.
 */
export async function MetroLine({
  locale,
  current,
}: {
  locale: Locale;
  current: MetroStation;
}) {
  const t = await getTranslations({ locale });
  const all = getMetroStations();
  const trunk = all.filter((s) => s.branch === "trunk");
  const east = all.filter((s) => s.branch === "nea-elvetia");
  const south = all.filter((s) => s.branch === "kalamaria");

  const Stop = ({ s }: { s: MetroStation }) => {
    const here = s.slug === current.slug;
    return (
      <li className="relative flex items-center gap-3 py-1.5 pl-6">
        <span
          aria-hidden
          className={`absolute left-0 h-3 w-3 rounded-full border-2 ${
            here
              ? "border-brand-700 bg-brand-700"
              : "border-brand-300 bg-white"
          }`}
        />
        {here ? (
          <span className="text-sm font-bold text-ink" aria-current="page">
            {pick(s.name, locale)}
          </span>
        ) : (
          <Link
            href={metroStationHref(s.slug)}
            className="text-sm font-medium text-brand-700 hover:text-brand-800 hover:underline"
          >
            {pick(s.name, locale)}
          </Link>
        )}
      </li>
    );
  };

  const Arm = ({
    label,
    note,
    stations,
    lines,
  }: {
    label: string;
    note?: string;
    stations: MetroStation[];
    lines: ("1" | "2")[];
  }) => (
    <div className="min-w-0 flex-1">
      <h3 className="flex flex-wrap items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted">
        {lines.map((n) => (
          <span
            key={n}
            className={`rounded px-1.5 py-0.5 text-white ${
              n === "1" ? "bg-red-600" : "bg-blue-600"
            }`}
          >
            {t("metro.lineN", { n })}
          </span>
        ))}
        {label}
      </h3>
      {note ? <p className="mt-0.5 text-xs text-muted">{note}</p> : null}
      <ul className="relative mt-2 before:absolute before:bottom-3 before:left-[5px] before:top-3 before:w-0.5 before:bg-brand-200">
        {stations.map((s) => (
          <Stop key={s.slug} s={s} />
        ))}
      </ul>
    </div>
  );

  return (
    <section className="mt-10">
      <h2 className="mb-1 text-2xl font-bold">{t("metro.lineTitle")}</h2>
      <p className="mb-4 text-sm text-muted">{t("metro.lineNote")}</p>
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <Arm
          label={t("metro.trunk")}
          note={t("metro.trunkNote")}
          stations={trunk}
          lines={["1", "2"]}
        />
        <div className="mt-5 grid gap-5 border-t border-dashed border-slate-200 pt-5 sm:grid-cols-2">
          <Arm label={t("metro.branchEast")} stations={east} lines={["1"]} />
          <Arm label={t("metro.branchSouth")} stations={south} lines={["2"]} />
        </div>
      </div>
    </section>
  );
}
