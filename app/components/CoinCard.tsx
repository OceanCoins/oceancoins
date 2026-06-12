import Link from "next/link";

type Props = {
  coin: any;
  chapters: any[];
};

export default function CoinCard({ coin, chapters }: Props) {
  const coinChapters = chapters.filter((c) => c.coin_id === coin.id);

  const pieces = coinChapters.reduce(
    (sum, c) => sum + (c.pieces || 0),
    0
  );

  return (
    <Link
      href={`/coin/${coin.coin_number}`}
      style={{ textDecoration: "none", color: "white" }}
    >
      <div
        style={{
          border: "1px solid #333",
          borderRadius: "10px",
          padding: "1.25rem",
          background: "#111",
        }}
      >
        <div style={{ fontSize: "1.15rem" }}>Coin #{coin.coin_number}</div>

        <div style={{ opacity: 0.7, marginTop: ".35rem" }}>
          Created {new Date(coin.created_at).toLocaleString()}
        </div>

        <div style={{ marginTop: ".5rem", opacity: 0.85 }}>
          {coinChapters.length} chapters · {pieces} pieces
        </div>
      </div>
    </Link>
  );
}