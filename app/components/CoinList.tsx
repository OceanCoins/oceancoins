import CoinCard from "./CoinCard";
import Link from "next/link";

type Props = {
  coins: any[];
  chapters: any[];
};

export default function CoinList({ coins, chapters }: Props) {
 const recentCoins = [...coins].slice(0, 3);
const impactCoins = [...coins]
  .map((coin) => {
    const coinChapters = chapters.filter((c) => c.coin_id === coin.id);

    const pieces = coinChapters.reduce(
      (sum, c) => sum + (c.pieces || 0),
      0
    );

    return { ...coin, pieces };
  })
  .sort((a, b) => b.pieces - a.pieces)
  .slice(0, 3);
  return (
    <section>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
       <h3 style={{ margin: 0, fontSize: "1.4rem" }}>Featured Coins</h3>
        <p style={{ margin: 0, opacity: 0.7, fontSize: "0.95rem" }}>
          Select a coin to view its journey
        </p>
      </div>
<h4 style={{ marginTop: "1.5rem" }}>🏆 Most Impact</h4>

<div style={{ display: "grid", gap: "1rem" }}>
  {impactCoins.map((coin) => (
    <CoinCard
      key={coin.id}
      coin={coin}
      chapters={chapters}
    />
  ))}
</div>

<h4 style={{ marginTop: "2rem" }}>🌊 Recently Active</h4>
      {!coins || coins.length === 0 ? (
        <div
          style={{
            border: "1px solid #333",
            borderRadius: "10px",
            padding: "1.25rem",
            background: "#111",
            opacity: 0.8,
          }}
        >
          No coins yet.
        </div>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {recentCoins.map((coin) => {
           return (
  <CoinCard
    key={coin.id}
    coin={coin}
    chapters={chapters}
  />
);
            
          })}
        </div>
      )}
    </section>
  );
}