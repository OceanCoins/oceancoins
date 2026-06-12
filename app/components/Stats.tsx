type Props = {
  totalPieces: number;
  totalChapters: number;
  totalCoins: number;
};

export default function Stats({
  totalPieces,
  totalChapters,
  totalCoins,
}: Props) {
  const boxStyle = {
    border: "1px solid #333",
    borderRadius: "10px",
    padding: "1.25rem",
    background: "#111",
    minWidth: "180px",
    flex: 1,
  };

  return (
    <section
      style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        marginBottom: "2rem",
      }}
    >
      <div style={boxStyle}>
        <div style={{ opacity: 0.7 }}>Pieces removed</div>
        <div style={{ fontSize: "1.5rem" }}>{totalPieces}</div>
      </div>

      <div style={boxStyle}>
        <div style={{ opacity: 0.7 }}>Chapters logged</div>
        <div style={{ fontSize: "1.5rem" }}>{totalChapters}</div>
      </div>

      <div style={boxStyle}>
        <div style={{ opacity: 0.7 }}>Active coins</div>
        <div style={{ fontSize: "1.5rem" }}>{totalCoins}</div>
      </div>
    </section>
  );
}