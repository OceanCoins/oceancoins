"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

type NominatimResult = {
  lat: string;
  lon: string;
  display_name: string;
};

async function geocodeLocation(locationName: string) {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", locationName);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "1");

  const response = await fetch(url.toString(), {
    headers: {
      "Accept-Language": "en",
      "User-Agent": "OceanCoins/0.1 (development)",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Geocoding request failed.");
  }

  const results = (await response.json()) as NominatimResult[];

  if (!results.length) {
    throw new Error("Location not found.");
  }

  return {
    latitude: Number(results[0].lat),
    longitude: Number(results[0].lon),
    displayName: results[0].display_name,
  };
}

export async function addChapter(formData: FormData) {
  const coinId = String(formData.get("coinId") || "").trim();
  const coinNumber = String(formData.get("coinNumber") || "").trim();
  const locationName = String(formData.get("locationName") || "").trim();
  const piecesRaw = String(formData.get("pieces") || "").trim();
  const noteRaw = String(formData.get("note") || "").trim();

  if (!coinId) {
    throw new Error("Missing coin ID.");
  }

  if (!coinNumber) {
    throw new Error("Missing coin number.");
  }

  if (!locationName) {
    throw new Error("Location is required.");
  }

  const pieces = Number(piecesRaw);

  if (!Number.isFinite(pieces) || pieces < 1 || pieces > 10) {
    throw new Error("Pieces collected must be between 1 and 10.");
  }

  const note = noteRaw.length ? noteRaw : null;

  const geo = await geocodeLocation(locationName);

  const { error } = await supabase.from("chapters").insert({
    coin_id: coinId,
    location_name: locationName,
    latitude: geo.latitude,
    longitude: geo.longitude,
    pieces,
    note,
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect(`/coin/${coinNumber}?success=true`);
}