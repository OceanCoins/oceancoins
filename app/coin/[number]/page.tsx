import JourneyMarkers from "../../components/JourneyMarkers"
import {
  calculateJourneyMarkers,
  calculateTotalJourneyMiles,
} from "@/lib/journeyMarkers"
import JourneySummary from "../../components/JourneySummary";
import JourneyTimeline from "../../components/JourneyTimeline";
import { supabase } from "../../../lib/supabase";
import { addChapter } from "./actions";
import CoinMap from "../../components/CoinMap";
import LogChapterForm from "../../components/LogChapterForm";

function distanceMiles(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 3958.8;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

type PageProps = {
  params: Promise<{
    number: string;
  }>;
  searchParams?: Promise<{
    success?: string;
  }>;
};

export default async function CoinPage({ params, searchParams }: PageProps) {
  const { number } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
const showSuccess = resolvedSearchParams.success === "true";

  const { data: coin } = await supabase
    .from("coins")
    .select("*")
    .eq("coin_number", Number(number))
    .single();

  const { data: chapters } = await supabase
    .from("chapters")
    .select("*")
    .eq("coin_id", coin?.id)
    .order("created_at", { ascending: true });
    const totalJourneyMiles = calculateTotalJourneyMiles(chapters ?? [])
const journeyMarkers = calculateJourneyMarkers(chapters ?? [])

  const totalPieces =
    chapters?.reduce((sum, chapter) => sum + (chapter.pieces || 0), 0) || 0;

  const totalChapters = chapters?.length || 0;

  const uniqueLocations = [
    ...new Set(chapters?.map((c) => c.location_name)),
  ].length;

  const uniqueCountries = [
  ...new Set(
    chapters
      ?.map((c) => c.country)
      .filter(Boolean)
  ),
].length;

const uniqueContinents = [
  ...new Set(
    chapters
      ?.map((c) => c.continent)
      .filter(Boolean)
  ),
].length;

  const firstChapter = chapters?.[0];
const lastChapter = chapters?.[chapters.length - 1];

const totalDistance = chapters?.reduce((sum, chapter, index) => {
  if (index === 0) return 0;

  const prev = chapters[index - 1];

  if (
    prev.latitude == null ||
    prev.longitude == null ||
    chapter.latitude == null ||
    chapter.longitude == null
  ) {
    return sum;
  }

  return (
    sum +
    distanceMiles(
      Number(prev.latitude),
      Number(prev.longitude),
      Number(chapter.latitude),
      Number(chapter.longitude)
    )
  );
}, 0);
  return (
    <main
  style={{
    background: "black",
    minHeight: "100vh",
    color: "white",
    padding: "2rem",
    fontFamily: "system-ui",
  }}
>
<div style={{ maxWidth: "720px", margin: "0 auto" }}>
      <p
  style={{
    fontSize: ".8rem",
    letterSpacing: "2px",
    opacity: 0.6,
    marginBottom: ".5rem",
    textTransform: "uppercase",
  }}
>
  Ocean Coin
</p>

<h1
  style={{
    fontSize: "3rem",
    fontWeight: 300,
    margin: "0 0 .5rem 0",
    lineHeight: 1.1,
  }}
>
  Coin #{String(number).padStart(4, "0")}
</h1>
<p
  style={{
    marginTop: ".75rem",
    marginBottom: 0,
    maxWidth: "34rem",
    fontSize: "1rem",
    lineHeight: 1.6,
    opacity: 0.72,
  }}
>
  A small reminder, passed from hand to hand.
</p>
{showSuccess && (
  <div
    style={{
      marginTop: "1rem",
      marginBottom: "2rem",
      padding: "1rem",
      borderRadius: "12px",
      border: "1px solid #2f855a",
      background: "rgba(47, 133, 90, 0.15)",
    }}
  >
    🐢 Journey continued.
    <br />
    Thank you for leaving it better.
    <br />
    Pass this coin along when you're ready.
  </div>
)}

<p
  style={{
    opacity: 0.7,
    marginBottom: "2rem",
    fontSize: "1rem",
  }}
>
  {totalPieces} piece{totalPieces !== 1 ? "s" : ""} collected across{" "}
{totalChapters} chapter{totalChapters !== 1 ? "s" : ""}
</p>

      {coin && (
        <div
          style={{
            border: "1px solid #333",
            borderRadius: "8px",
            padding: "1rem",
            background: "#0a0a0a",
          }}
        >
         <p>
  <strong>Started:</strong>{" "}
  {firstChapter
  ? new Date(firstChapter.created_at).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      })
  : "Not started yet"}
</p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              marginTop: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                border: "1px solid #333",
                borderRadius: "10px",
                padding: "1rem",
                minWidth: "160px",
                background: "#111",
              }}
            >
              <div style={{ opacity: 0.7, marginBottom: ".35rem" }}>
                Pieces collected
              </div>

              <div style={{ fontSize: "2rem" }}>{totalPieces}</div>
            </div>

            <div
              style={{
                border: "1px solid #333",
                borderRadius: "10px",
                padding: "1rem",
                minWidth: "160px",
                background: "#111",
              }}
            >
              <div style={{ opacity: 0.7, marginBottom: ".35rem" }}>
                Chapters
              </div>

              <div style={{ fontSize: "2rem" }}>{totalChapters}</div>
            </div>
          </div>
<JourneySummary
  firstLocation={firstChapter?.location_name}
  lastLocation={lastChapter?.location_name}
  totalChapters={totalChapters}
  totalPieces={totalPieces}
/>

<JourneyMarkers markers={journeyMarkers} />
          
<LogChapterForm
  coinId={coin.id}
  coinNumber={coin.coin_number}
/>
         

          <div style={{ marginTop: "2rem" }}>
            <h3>Journey Map</h3>

            <CoinMap chapters={chapters ?? []} />
            <div style={{ marginTop: "2rem" }}>
  <JourneyTimeline chapters={chapters ?? []} />
  </div>
          </div>

                    <div
            style={{
              marginTop: "2rem",
              borderTop: "1px solid #333",
              paddingTop: "1rem",
            }}
          >
            
      
          </div>
        </div>
      )}
    </div>
    
  </main>
);
}