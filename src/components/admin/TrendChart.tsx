import type { DailyPoint } from "@/lib/admin-gaps";

/**
 * Views and contacts over the last month.
 *
 * Inline SVG rather than a charting library: two series and thirty points do
 * not justify shipping one, and a server-rendered chart needs no JavaScript at
 * all. Contacts are drawn on the same axis as views on purpose — seeing how
 * small the gap is between "read it" and "acted on it" is the point.
 */
export function TrendChart({
  data,
  labels,
}: {
  data: DailyPoint[];
  labels: { views: string; contacts: string; empty: string };
}) {
  const peak = Math.max(1, ...data.map((d) => d.views));
  if (data.every((d) => d.views === 0 && d.contacts === 0)) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-muted">
        {labels.empty}
      </p>
    );
  }

  const W = 720;
  const H = 160;
  const PAD = 8;
  const step = data.length > 1 ? (W - PAD * 2) / (data.length - 1) : 0;
  const y = (v: number) => H - PAD - (v / peak) * (H - PAD * 2);
  const x = (i: number) => PAD + i * step;

  const line = (pick: (d: DailyPoint) => number) =>
    data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(pick(d)).toFixed(1)}`).join(" ");

  const area = `${line((d) => d.views)} L${x(data.length - 1).toFixed(1)} ${H - PAD} L${PAD} ${H - PAD} Z`;

  const first = data[0].day.slice(5);
  const last = data[data.length - 1].day.slice(5);

  return (
    <figure className="rounded-2xl border border-slate-100 p-4">
      <figcaption className="mb-2 flex flex-wrap items-center gap-4 text-xs">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-4 rounded-full bg-brand-600" />
          {labels.views}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-4 rounded-full bg-accent-600" />
          {labels.contacts}
        </span>
        <span className="ml-auto tabular-nums text-slate-400">
          {first} → {last}
        </span>
      </figcaption>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-40 w-full"
        role="img"
        aria-label={`${labels.views} / ${labels.contacts}`}
        preserveAspectRatio="none"
      >
        {/* A single reference line at the peak, labelled, so the height means
            something without a full axis. */}
        <line
          x1={PAD} y1={y(peak)} x2={W - PAD} y2={y(peak)}
          stroke="currentColor" className="text-slate-200" strokeDasharray="3 4"
        />
        <path d={area} className="fill-brand-600/10" />
        <path d={line((d) => d.views)} fill="none" className="stroke-brand-600" strokeWidth="2.5" strokeLinejoin="round" />
        <path d={line((d) => d.contacts)} fill="none" className="stroke-accent-600" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>

      <p className="mt-1 text-right text-xs tabular-nums text-slate-400">
        {labels.views}: {peak} max
      </p>
    </figure>
  );
}
