"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// A pin drawn with a divIcon so we don't depend on Leaflet's image assets
// (which break under bundlers).
const pinIcon = L.divIcon({
  className: "",
  html: `<div style="width:26px;height:26px;border-radius:50% 50% 50% 0;background:#d04921;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.35);transform:rotate(-45deg)"></div>`,
  iconSize: [26, 26],
  iconAnchor: [13, 26],
});

function ClickToPlace({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function Recenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function LocationPicker({
  center,
  value,
  onChange,
}: {
  center: [number, number];
  value: { lat: number; lng: number } | null;
  onChange: (lat: number, lng: number) => void;
}) {
  const [pos, setPos] = useState<{ lat: number; lng: number } | null>(value);

  const set = (lat: number, lng: number) => {
    setPos({ lat, lng });
    onChange(lat, lng);
  };

  return (
    <div className="h-64 overflow-hidden rounded-xl border border-slate-200">
      <MapContainer center={pos ? [pos.lat, pos.lng] : center} zoom={15} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickToPlace onPick={set} />
        {!pos ? <Recenter center={center} /> : null}
        {pos ? (
          <Marker
            position={[pos.lat, pos.lng]}
            draggable
            icon={pinIcon}
            eventHandlers={{
              dragend(e) {
                const m = e.target.getLatLng();
                set(m.lat, m.lng);
              },
            }}
          />
        ) : null}
      </MapContainer>
    </div>
  );
}
