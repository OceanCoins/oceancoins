type Props = {
  chapters: any[];
};

export default function LatestActivity({ chapters }: Props) {
  const latest = [...chapters]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 5);

  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h3 style={{ margin: 0, fontSize: "1.4rem" }}>Latest activity</h3>
      <p style={{ margin: 0, opacity: 0.7, fontSize: "0.95rem" }}>
        Recent chapters added to Ocean Coin
      </p>

      <div style={{ display: "grid", gap: "0.75rem", marginTop: "1rem" }}>
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
              <div style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>
                <strong>{chapter.location_name}</strong> — {chapter.pieces}{" "}
                pieces
              </div>

              {chapter.note && (
                <div style={{ opacity: 0.8, marginBottom: "0.25rem" }}>
                  “{chapter.note}”
                </div>
              )}

              <div style={{ opacity: 0.6, fontSize: "0.85rem" }}>
                {new Date(chapter.created_at).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}