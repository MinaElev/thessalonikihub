"use client";

import { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { clsx } from "clsx";
import type { Locale } from "@/i18n/routing";
import type { Pillar } from "@/lib/types";
import { pick } from "@/lib/types";
import { pillars } from "@/lib/site";
import type { MapPoint } from "@/lib/mappoints";

const kindColor: Record<Pillar, string> = {
  stay: "#128788", // teal
  eat: "#d04921", // orange
  drink: "#7c3aed", // purple
  discover: "#2563eb", // blue (distinct from stay's teal)
  experiences: "#ca8a04", // amber
  services: "#475569", // slate
  events: "#db2777", // pink
};

const ORDER: Pillar[] = [
  "stay",
  "eat",
  "drink",
  "discover",
  "experiences",
  "services",
  "events",
];

function localeHref(locale: Locale, path: string): string {
  return locale === "el" ? path : `/${locale}${path}`;
}

export default function MapView({
  points,
  locale,
  center = [40.635, 22.945],
  zoom = 14,
}: {
  points: MapPoint[];
  locale: Locale;
  center?: [number, number];
  zoom?: number;
}) {
  // Only offer toggles for pillars that actually have points.
  const available = ORDER.filter((k) => points.some((p) => p.kind === k));
  const [active, setActive] = useState<Set<Pillar>>(new Set(available));

  const toggle = (k: Pillar) =>
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });

  const shown = points.filter((p) => active.has(p.kind));

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {available.map((k) => {
          const on = active.has(k);
          return (
            <button
              key={k}
              onClick={() => toggle(k)}
              className={clsx(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition",
                on
                  ? "border-transparent text-white"
                  : "border-slate-200 bg-white text-slate-500",
              )}
              style={on ? { backgroundColor: kindColor[k] } : undefined}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: on ? "#fff" : kindColor[k] }}
              />
              {pick(pillars[k].label, locale)}
            </button>
          );
        })}
      </div>

      <div className="h-[72vh] overflow-hidden rounded-2xl border border-slate-100">
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {shown.map((p) => (
            <CircleMarker
              key={`${p.kind}-${p.id}`}
              center={[p.lat, p.lng]}
              radius={9}
              pathOptions={{
                color: "#ffffff",
                weight: 2,
                fillColor: kindColor[p.kind],
                fillOpacity: 1,
              }}
            >
              <Tooltip>{p.name}</Tooltip>
              <Popup>
                <a
                  href={localeHref(locale, p.path)}
                  className="font-semibold text-brand-700"
                >
                  {p.name}
                </a>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
