"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type ChapterPoint = {
  id: string;
  location_name: string;
  latitude: number | null;
  longitude: number | null;
  note: string | null;
  pieces: number;
};

type CoinMapProps = {
  chapters: ChapterPoint[];
};

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function CoinMapInner({ chapters }: CoinMapProps) {
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
    overflow: "hidden",
    background: "#111",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    width: "100%",
  }}
>
        No mapped chapters yet.
      </div>
    );
  }

  const center: [number, number] = [
    validChapters[0].latitude as number,
    validChapters[0].longitude as number,
  ];

  const pathPositions: [number, number][] = validChapters.map((chapter) => [
    chapter.latitude as number,
    chapter.longitude as number,
  ]);

  return (
    <div
      style={{
        border: "1px solid #333",
        borderRadius: "8px",
        overflow: "hidden",
        maxWidth: "700px",
      }}
    >
      <MapContainer
        center={center}
        zoom={4}
        style={{ height: "550px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
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
              Pieces collected: {chapter.pieces}
              {chapter.note ? (
                <>
                  <br />
                  {chapter.note}
                </>
              ) : null}
            </Popup>
          </Marker>
        ))}

        {pathPositions.length > 1 && <Polyline positions={pathPositions} />}
      </MapContainer>
    </div>
  );
}