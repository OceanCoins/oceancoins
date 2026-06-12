"use client";

import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type ChapterPoint = {
  id: string;
  coin_id: string;
  location_name: string;
  latitude: number | null;
  longitude: number | null;
  note: string | null;
  pieces: number;
};

type GlobalMapInnerProps = {
  chapters: ChapterPoint[];
};

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function GlobalMapInner({ chapters }: GlobalMapInnerProps) {
  const validChapters = chapters.filter(
    (chapter) =>
      typeof chapter.latitude === "number" &&
      typeof chapter.longitude === "number"
  );

  if (validChapters.length === 0) {
    return (
      <div
        style={{
          border: "1px solid #333",
          borderRadius: "14px",
          padding: "1.25rem",
          background: "#111",
          color: "white",
        }}
      >
        No mapped activity yet.
      </div>
    );
  }

  const center: [number, number] = [
    validChapters[0].latitude as number,
    validChapters[0].longitude as number,
  ];

  const chaptersByCoin = validChapters.reduce<Record<string, ChapterPoint[]>>(
    (acc, chapter) => {
      if (!acc[chapter.coin_id]) acc[chapter.coin_id] = [];
      acc[chapter.coin_id].push(chapter);
      return acc;
    },
    {}
  );

  return (
    <div
  style={{
    border: "1px solid #333",
    borderRadius: "14px",
    overflow: "hidden",
    background: "#111",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    width: "100%",
  }}
>
      <MapContainer
        center={center}
        zoom={4}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {validChapters.map((chapter) => (
          <Marker
            key={chapter.id}
            position={[chapter.latitude as number, chapter.longitude as number]}
            icon={markerIcon}
          >
            <Popup>
              <strong>{chapter.location_name}</strong>
              <br />
              Pieces picked up: {chapter.pieces}
              {chapter.note ? (
                <>
                  <br />
                  {chapter.note}
                </>
              ) : null}
            </Popup>
          </Marker>
        ))}

        {Object.values(chaptersByCoin).map((coinChapters) => {
          const path = coinChapters
            .filter(
              (chapter) =>
                typeof chapter.latitude === "number" &&
                typeof chapter.longitude === "number"
            )
            .map((chapter) => [
              chapter.latitude as number,
              chapter.longitude as number,
            ]) as [number, number][];

          if (path.length < 2) return null;

          return (
            <Polyline
              key={coinChapters[0].coin_id}
              positions={path}
              pathOptions={{
                color: "#4da6ff",
                weight: 3,
                opacity: 0.75,
              }}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}