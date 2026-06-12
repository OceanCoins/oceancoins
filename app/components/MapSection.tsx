"use client";

import dynamic from "next/dynamic";
import type { CoinEvent } from "@/lib/coins";

const MapClient = dynamic(() => import("./MapClient"), { ssr: false });

export default function MapSection({ events }: { events: CoinEvent[] }) {
  return <MapClient events={events} />;
}
