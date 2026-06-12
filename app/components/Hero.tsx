type Props = {
  totalPieces: number;
};

export default function Hero({ totalPieces }: Props) {
  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <p
        style={{
          margin: 0,
          marginBottom: "0.75rem",
          fontSize: "0.95rem",
          opacity: 0.7,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Ocean Coin
      </p>

      <h1
        style={{
          margin: 0,
          marginBottom: "0.25rem",
          fontSize: "3rem",
          lineHeight: 1.05,
        }}
      >
        Leave it better.
      </h1>

      <div
        style={{
          marginBottom: "1.5rem",
          fontSize: "1rem",
          opacity: 0.85,
        }}
      >
        🌊 {totalPieces.toLocaleString()} pieces removed worldwide
      </div>

      <p
        style={{
          margin: 0,
          maxWidth: "700px",
          fontSize: "1.1rem",
          lineHeight: 1.6,
          opacity: 0.8,
        }}
      >
        A small object passed hand to hand. A growing record of simple acts of care
        for the places we share.
      </p>
    </section>
  );
}