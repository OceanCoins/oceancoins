type JourneySummaryProps = {
  firstLocation?: string;
  lastLocation?: string;
  totalChapters: number;
  totalPieces: number;
};

export default function JourneySummary({
  firstLocation,
  lastLocation,
  totalChapters,
  totalPieces,
}: JourneySummaryProps) {
  return (
    <div
      style={{
        border: "1px solid #333",
        borderRadius: "10px",
        padding: "1rem",
        marginTop: "2rem",
        background: "#0f0f0f",
      }}
    >
      <h3>My Journey So Far</h3>

      <p>
        <strong>Started in:</strong>{" "}
        {firstLocation || "Unknown"}
      </p>

      <p>
        <strong>Last seen:</strong>{" "}
        {lastLocation || "Unknown"}
      </p>

      <p>
        <strong>Journey:</strong>{" "}
        {totalChapters} chapters
      </p>

      <p>
        <strong>Pieces collected:</strong>{" "}
        {totalPieces}
      </p>

      <p style={{ opacity: 0.6 }}>
        I am still moving from hand to hand.
      </p>
    </div>
  );
}