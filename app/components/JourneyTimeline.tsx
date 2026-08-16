type Props = {
  chapters: any[];
};

export default function JourneyTimeline({ chapters }: Props) {
  if (!chapters || chapters.length === 0) {
    return <p style={{ opacity: 0.7 }}>No chapters yet.</p>;
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3 style={{ marginBottom: "1rem" }}>My Journey</h3>

      <div style={{ display: "grid", gap: "1rem" }}>
        {chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            style={{
              display: "grid",
              gridTemplateColumns: "28px 1fr",
              gap: "1rem",
              alignItems: "start",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "999px",
                  background: "#4da6ff",
                  marginTop: ".35rem",
                }}
              />

              {index < chapters.length - 1 && (
                <div
                  style={{
                    width: "1px",
                    height: "64px",
                    background: "#333",
                    marginTop: ".35rem",
                  }}
                />
              )}
            </div>

            <div
              style={{
                border: "1px solid #333",
                borderRadius: "12px",
                padding: "1rem",
                background: "#0f0f0f",
              }}
            >
              <div
  style={{
    fontSize: ".8rem",
    letterSpacing: ".08em",
    textTransform: "uppercase",
    opacity: 0.55,
    marginBottom: ".5rem",
  }}
>
  Chapter {index + 1}
</div>
              <div style={{ fontWeight: 700 }}>
                {chapter.location_name || "Unknown location"}
              </div>

              <div style={{ opacity: 0.7, marginTop: ".25rem" }}>
                {new Date(chapter.created_at).toLocaleDateString(undefined, {
  year: "numeric",
  month: "long",
  day: "numeric",
})}
              </div>

              <div style={{ marginTop: ".75rem" }}>
                {chapter.pieces} piece{chapter.pieces !== 1 ? "s" : ""} collected
              </div>

              {chapter.note && (
                <p
                  style={{
                    marginTop: ".75rem",
                    marginBottom: 0,
                    opacity: 0.85,
                    fontStyle: "italic",
                  }}
                >
                  “{chapter.note}”
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}