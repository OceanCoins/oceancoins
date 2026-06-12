"use client";

import dynamic from "next/dynamic";

const GlobalMapInner = dynamic(() => import("./GlobalMapInner"), {
  ssr: false,
});

type ChapterPoint = {
  id: string;
  coin_id: string;
  location_name: string;
  latitude: number | null;
  longitude: number | null;
  note: string | null;
  pieces: number;
};

type GlobalMapProps = {
  chapters: ChapterPoint[];
};

export default function GlobalMap({ chapters }: GlobalMapProps) {
  return <GlobalMapInner chapters={chapters} />;
}