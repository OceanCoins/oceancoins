type Props = {
  coins: any[];
  chapters: any[];
};

export default function ActiveCoins({ coins, chapters }: Props) {
  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h3 style={{ margin: 0, fontSize: "1.4rem" }}>
        Active Coins ({coins.length})
      </h3>

      <p style={{ margin: 0, opacity: 0.7, fontSize: ".95rem" }}>
        Every coin has a story waiting to be told.
      </p>

      <div
        style={{
          display: "grid",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {coins.map((coin) => {
          const coinChapters = chapters.filter(
            (chapter) => chapter.coin_id === coin.id
          );

          const totalPieces = coinChapters.reduce(
            (sum, chapter) => sum + (chapter.pieces || 0),
            0
          );

          const hasJourney = coinChapters.length > 0;

          return (
            <div
              key={coin.id}
              style={{
                border: "1px solid #333",
                borderRadius: "10px",
                padding: "1rem",
                background: "#111",
              }}
            >
              <div
                style={{
                  fontSize: ".8rem",
                  opacity: 0.55,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                }}
              >
                Coin #{String(coin.coin_number).padStart(4, "0")}
              </div>

              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginTop: ".35rem",
                }}
              >
                {hasJourney ? "Moving" : "Ready"}
              </div>

              <div
                style={{
                  opacity: 0.75,
                  marginTop: ".35rem",
                }}
              >
                {hasJourney ? (
                  <>
                    {totalPieces} pieces collected
                    <br />
                    {coinChapters.length} chapter
                    {coinChapters.length !== 1 ? "s" : ""}
                  </>
                ) : (
                  <>
                    This coin is waiting for its first chapter.
                    <br />
                    Maybe you'll begin its journey.
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}