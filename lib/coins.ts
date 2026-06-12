// lib/coins.ts
export type CoinEvent = {
  lat: number;
  lng: number;
  label: string;     // "Santa Cruz, CA"
  date?: string;     // optional for later
};

export type Coin = {
  id: number;
  startedLabel: string;
  lastSeenLabel: string;
  totalPiecesPickedUp: number;
  people: number;
  events: CoinEvent[];
};

export const COINS: Record<number, Coin> = {
  1843: {
    id: 1843,
    startedLabel: "Santa Cruz, CA",
    lastSeenLabel: "Charleston, SC",
    totalPiecesPickedUp: 127,
    people: 19,
    events: [
      { lat: 36.9741, lng: -122.0308, label: "Santa Cruz, CA" },
      { lat: 34.4208, lng: -119.6982, label: "Santa Barbara, CA" },
      { lat: 39.7392, lng: -104.9903, label: "Denver, CO" },
      { lat: 32.7765, lng: -79.9311, label: "Charleston, SC" },
    ],
  },
};
