import GlobalMap from "./GlobalMap";

type Props = {
  chapters: any[];
};

export default function GlobalSection({ chapters }: Props) {
  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h3 style={{ margin: 0, fontSize: "1.4rem" }}>Global journey</h3>
      <p style={{ margin: 0, opacity: 0.7, fontSize: "0.95rem" }}>
        A live view of where Ocean Coin has traveled
      </p>

      <div style={{ maxWidth: "1400px", marginTop: "1rem" }}>
        <GlobalMap chapters={chapters ?? []} />
      </div>
    </section>
  );
}