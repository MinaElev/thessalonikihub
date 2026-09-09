"use client";

import dynamic from "next/dynamic";

// Leaflet needs the browser — load the mini map with SSR disabled.
const MiniMap = dynamic(() => import("./MiniMap"), {
  ssr: false,
  loading: () => <div className="h-48 w-full rounded-xl border border-slate-100 bg-slate-50" />,
});

export function MiniMapClient({
  lat,
  lng,
  label,
  color,
}: {
  lat: number;
  lng: number;
  label: string;
  color?: string;
}) {
  return <MiniMap lat={lat} lng={lng} label={label} color={color} />;
}
