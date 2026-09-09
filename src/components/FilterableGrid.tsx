"use client";

import { useState } from "react";
import { clsx } from "clsx";
import type { Locale } from "@/i18n/routing";
import type { Place } from "@/lib/types";
import { pick } from "@/lib/types";
import { PlaceCard } from "@/components/PlaceCard";
import { getArea } from "@/content/data/areas";

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "rounded-full border px-3 py-1.5 text-sm font-medium transition",
        active
          ? "border-transparent bg-brand-600 text-white"
          : "border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-700",
      )}
    >
      {children}
    </button>
  );
}

export function FilterableGrid({
  places,
  locale,
  allLabel,
}: {
  places: Place[];
  locale: Locale;
  allLabel: string;
}) {
  const areaSlugs = Array.from(new Set(places.map((p) => p.geo.area)));
  const types = Array.from(new Set(places.map((p) => p.type)));
  const [area, setArea] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);

  const shown = places.filter(
    (p) => (!area || p.geo.area === area) && (!type || p.type === type),
  );

  return (
    <div>
      {areaSlugs.length > 1 ? (
        <div className="mb-3 flex flex-wrap gap-2">
          <Chip active={!area} onClick={() => setArea(null)}>
            {allLabel}
          </Chip>
          {areaSlugs.map((a) => (
            <Chip key={a} active={area === a} onClick={() => setArea(a)}>
              {pick(getArea(a)?.name ?? { el: a }, locale)}
            </Chip>
          ))}
        </div>
      ) : null}

      {types.length > 1 ? (
        <div className="mb-6 flex flex-wrap gap-2">
          <Chip active={!type} onClick={() => setType(null)}>
            {allLabel}
          </Chip>
          {types.map((tp) => (
            <Chip key={tp} active={type === tp} onClick={() => setType(tp)}>
              {tp}
            </Chip>
          ))}
        </div>
      ) : null}

      {shown.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <PlaceCard key={p.slug} place={p} locale={locale} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-muted">
          —
        </p>
      )}
    </div>
  );
}
