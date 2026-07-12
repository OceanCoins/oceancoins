import ActiveCoins from "./components/ActiveCoins";
import LatestActivity from "./components/LatestActivity";
import { supabase } from "../lib/supabase";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import GlobalSection from "./components/GlobalSection";
import CoinList from "./components/CoinList";

export default async function HomePage() {
  const { data: coins } = await supabase
    .from("coins")
    .select("*")
    .order("coin_number", { ascending: true });

  const { data: chapters } = await supabase
    .from("chapters")
    .select("*");

  const totalPieces =
    chapters?.reduce((sum, c) => sum + (c.pieces || 0), 0) ?? 0;

  const totalChapters = chapters?.length ?? 0;
  const totalCoins = coins?.length ?? 0;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ position: "relative" }}>
  {/* subtle animated ocean background */}
  <div className="ocean-bg" />

  {/* your actual hero content */}
  <div style={{ position: "relative", zIndex: 1 }}>
    <Hero totalPieces={totalPieces} />
  </div>
</div>

        <Stats
          totalPieces={totalPieces}
          totalChapters={totalChapters}
          totalCoins={totalCoins}
        />

        <GlobalSection chapters={chapters ?? []} />
<LatestActivity
  chapters={chapters ?? []}
  coins={coins ?? []}
/>
        <ActiveCoins
  coins={coins ?? []}
  chapters={chapters ?? []}
/>

<CoinList
  coins={coins ?? []}
  chapters={chapters ?? []}
/>
      </div>
    </main>
  );
}