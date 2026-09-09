"use client";

import dynamic from "next/dynamic";
import type { Locale } from "@/i18n/routing";
import type { MapPoint } from "@/lib/mappoints";

// Leaflet needs the browser, so load the map with SSR disabled.
const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[72vh] items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 text-muted">
      …
    </div>
  ),
});

export function MapClient({
  points,
  locale,
  center,
  zoom,
}: {
  points: MapPoint[];
  locale: Locale;
  center?: [number, number];
  zoom?: number;
}) {
  return <MapView points={points} locale={locale} center={center} zoom={zoom} />;
}
