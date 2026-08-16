import Link from "next/link";

type Props = {
  chapters: any[];
  coins: any[];
};

export default function LatestActivity({ chapters, coins }: Props) {
  const latest = [...chapters]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    )
    .slice(0, 5);

  const getCoinNumber = (coinId: string) =>
    coins.find((coin) => coin.id === coinId)?.coin_number;

  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h3 style={{ margin: 0, fontSize: "1.4rem" }}>
        Latest Chapters
      </h3>

      <p style={{ margin: 0, opacity: 0.7, fontSize: "0.95rem" }}>
        Each line marks another chapter in the journey.
      </p>

      <div
        style={{
          display: "grid",
          gap: "0.75rem",
          marginTop: "1rem",
        }}
      >
        {latest.length === 0 ? (
          <div
            style={{
              border: "1px solid #333",
              borderRadius: "10px",
              padding: "1rem",
              background: "#111",
              opacity: 0.8,
            }}
          >
            No activity yet.
          </div>
        ) : (
          latest.map((chapter) => (
            <div
              key={chapter.id}
              style={{
                border: "1px solid #333",
                borderRadius: "10px",
                padding: "1rem",
                background: "#111",
              }}
            >
              <Link
                href={`/coin/${getCoinNumber(chapter.coin_id)}`}
                style={{
                  display: "inline-block",
                  fontSize: ".78rem",
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  opacity: 0.55,
                  marginBottom: ".45rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Coin #
                {String(
                  getCoinNumber(chapter.coin_id) ?? "—"
                ).padStart(4, "0")}{" "}
                →
              </Link>

              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  marginBottom: ".25rem",
                }}
              >
                {chapter.location_name || "Unknown location"}
              </div>

              <div
                style={{
                  opacity: 0.75,
                  marginBottom: ".5rem",
                }}
              >
                {chapter.pieces} piece
                {chapter.pieces !== 1 ? "s" : ""} collected
              </div>

              {chapter.note && (
                <div
                  style={{
                    opacity: 0.85,
                    fontStyle: "italic",
                    marginBottom: ".5rem",
                  }}
                >
                  “{chapter.note}”
                </div>
              )}

              <div
                style={{
                  opacity: 0.55,
                  fontSize: ".82rem",
                }}
              >
                {new Date(chapter.created_at).toLocaleDateString(
                  undefined,
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}