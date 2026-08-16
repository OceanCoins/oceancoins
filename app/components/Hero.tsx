type Props = {
  totalPieces: number;
};

export default function Hero({ totalPieces }: Props) {
  return (
    <section
  style={{
    marginBottom: "2.5rem",
    textAlign: "center",
  }}
>

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
    display: "inline-flex",
    alignItems: "center",
    gap: ".5rem",
    marginBottom: "2rem",
    padding: ".65rem 1.25rem",
    border: "1px solid #333",
    borderRadius: "999px",
    background: "#111",
    fontSize: "1rem",
  }}
>
    <strong>{totalPieces.toLocaleString()}</strong> pieces collected worldwide
</div>

      <p
        style={{
          margin: "0 auto",
          marginBottom: "2rem",
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