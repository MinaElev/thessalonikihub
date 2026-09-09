"use client";

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

/** A small single-point map for an entity's exact location. */
export default function MiniMap({
  lat,
  lng,
  label,
  color = "#128788",
}: {
  lat: number;
  lng: number;
  label: string;
  color?: string;
}) {
  return (
    <div className="h-48 w-full overflow-hidden rounded-xl border border-slate-100">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        scrollWheelZoom={false}
        dragging={false}
        className="h-full w-full"
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <CircleMarker
          center={[lat, lng]}
          radius={9}
          pathOptions={{ color: "#ffffff", weight: 2, fillColor: color, fillOpacity: 1 }}
        >
          <Tooltip>{label}</Tooltip>
        </CircleMarker>
      </MapContainer>
    </div>
  );
}
