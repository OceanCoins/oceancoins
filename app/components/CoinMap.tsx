"use client";

import dynamic from "next/dynamic";

const CoinMapInner = dynamic(() => import("./CoinMapInner"), {
  ssr: false,
});

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

export default function CoinMap({ chapters }: CoinMapProps) {
  return <CoinMapInner chapters={chapters} />;
}