"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import type { CoinEvent } from "@/lib/coins";
import L from "leaflet";
import { useEffect } from "react";

type Props = {
  events: CoinEvent[];
};

export default function MapClient({ events }: Props) {
  useEffect(() => {
    // Fix missing marker icons in Next/webpack environments
    // (only runs in browser)
    if (typeof window === "undefined") return;

    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  if (!events?.length) return null;

  const center: [number, number] = [events[0].lat, events[0].lng];
  const line: [number, number][] = events.map((e) => [e.lat, e.lng]);

  return (
    <div className="w-full overflow-hidden rounded-3xl bg-white/40 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-sm">
      <div className="px-4 py-3 text-center text-xs tracking-wide text-[#2f5d62]">
        Coin activity map (prototype)
      </div>

      <div className="h-[340px] w-full">
        <MapContainer
  center={center}
  zoom={4}
  scrollWheelZoom={false}
  className="h-full w-full"
  whenReady={(e) => {
    // force Leaflet to measure the real container size
    setTimeout(() => e.target.invalidateSize(), 0);
  }}
>

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Polyline positions={line} />

          {events.map((e, idx) => (
            <Marker key={`${e.lat}-${e.lng}-${idx}`} position={[e.lat, e.lng]}>
              <Popup>{e.label}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
