import { supabase } from "../../../lib/supabase";
import { addChapter } from "./actions";
import CoinMap from "../../components/CoinMap";

type PageProps = {
  params: Promise<{
    number: string;
  }>;
};

export default async function CoinPage({ params }: PageProps) {
  const { number } = await params;

  const { data: coin } = await supabase
    .from("coins")
    .select("*")
    .eq("coin_number", Number(number))
    .single();

  const { data: chapters } = await supabase
    .from("chapters")
    .select("*")
    .eq("coin_id", coin?.id)
    .order("created_at", { ascending: true });

  const totalPieces =
    chapters?.reduce((sum, chapter) => sum + (chapter.pieces || 0), 0) || 0;

  const totalChapters = chapters?.length || 0;

  const uniqueLocations = [
    ...new Set(chapters?.map((c) => c.location_name)),
  ].length;

  const firstChapter = chapters?.[0];
const lastChapter = chapters?.[chapters.length - 1];
  return (
    <main
  style={{
    background: "black",
    minHeight: "100vh",
    color: "white",
    padding: "2rem",
    fontFamily: "system-ui",
  }}
>
<div style={{ maxWidth: "720px", margin: "0 auto" }}>
      <p
  style={{
    fontSize: ".8rem",
    letterSpacing: "2px",
    opacity: 0.6,
    marginBottom: ".5rem",
    textTransform: "uppercase",
  }}
>
  Ocean Coin
</p>

<h1
  style={{
    fontSize: "3rem",
    fontWeight: 300,
    margin: "0 0 .5rem 0",
    lineHeight: 1.1,
  }}
>
  Ocean Coin #{number}
</h1>

<p
  style={{
    opacity: 0.7,
    marginBottom: "2rem",
    fontSize: "1rem",
  }}
>
  {totalPieces} pieces removed across {totalChapters} chapters
</p>

      {coin && (
        <div
          style={{
            border: "1px solid #333",
            borderRadius: "8px",
            padding: "1rem",
            background: "#0a0a0a",
          }}
        >
          <p>
            <strong>Coin Number:</strong> {coin.coin_number}
          </p>

          <p>
            <strong>Created:</strong>{" "}
            {new Date(coin.created_at).toLocaleString()}
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              marginTop: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                border: "1px solid #333",
                borderRadius: "10px",
                padding: "1rem",
                minWidth: "160px",
                background: "#111",
              }}
            >
              <div style={{ opacity: 0.7, marginBottom: ".35rem" }}>
                Pieces removed
              </div>

              <div style={{ fontSize: "2rem" }}>{totalPieces}</div>
            </div>

            <div
              style={{
                border: "1px solid #333",
                borderRadius: "10px",
                padding: "1rem",
                minWidth: "160px",
                background: "#111",
              }}
            >
              <div style={{ opacity: 0.7, marginBottom: ".35rem" }}>
                Chapters logged
              </div>

              <div style={{ fontSize: "2rem" }}>{totalChapters}</div>
            </div>
          </div>

          <div
            style={{
              border: "1px solid #333",
              borderRadius: "10px",
              padding: "1rem",
              background: "#0f0f0f",
              marginBottom: "2rem",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: "1rem",
                fontSize: "1.15rem",
              }}
            >
              The Journey So Far
            </h3>

            <div
              style={{
                display: "grid",
                gap: ".5rem",
                opacity: 0.9,
                lineHeight: 1.5,
              }}
            >
              <div>
                <strong>Started in:</strong>{" "}
                {firstChapter?.location_name ?? "Unknown"}
              </div>

<div>
  <strong>Last seen:</strong>{" "}
  {lastChapter
    ? `${lastChapter.location_name} on ${new Date(
        lastChapter.created_at
      ).toLocaleDateString()}`
    : "Unknown"}
</div>
              <div>
                <strong>Journey so far:</strong>{" "}
                {totalChapters} chapters across {uniqueLocations} locations
              </div>

              <div>
                <strong>Pieces removed:</strong> {totalPieces}
              </div>

              <div>
                <strong>First logged:</strong>{" "}
                {firstChapter
                  ? new Date(firstChapter.created_at).toLocaleDateString()
                  : "Unknown"}
              </div>
            </div>
          </div>

          <form
            action={addChapter}
            style={{
              marginTop: "2rem",
              display: "grid",
              gap: ".75rem",
            }}
          >
            <input
              type="hidden"
              name="coinId"
              value={coin.id}
            />

            <input
              type="hidden"
              name="coinNumber"
              value={String(coin.coin_number)}
            />
<div
  style={{
    borderTop: "1px solid #222",
    marginTop: "2rem",
    paddingTop: "2rem",
  }}
></div>
            <h3 style={{ margin: 0 }}>Continue the Journey</h3>

            <div>
              <label
                htmlFor="locationName"
                style={{
                  display: "block",
                  marginBottom: ".35rem",
                  fontSize: ".95rem",
                }}
              >
                Location
              </label>

              <input
                id="locationName"
                name="locationName"
                placeholder="Waxhaw, NC"
                required
                style={{
                  width: "100%",
                  padding: ".75rem",
                  borderRadius: "6px",
                  border: "1px solid #333",
                  background: "#0a0a0a",
                  color: "white",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="pieces"
                style={{
                  display: "block",
                  marginBottom: ".35rem",
                  fontSize: ".95rem",
                }}
              >
                Pieces picked up
              </label>

              <input
                id="pieces"
                name="pieces"
                type="number"
                min="1"
                max="10"
                defaultValue="1"
                required
                style={{
                  width: "100%",
                  padding: ".75rem",
                  borderRadius: "6px",
                  border: "1px solid #333",
                  background: "#0a0a0a",
                  color: "white",
                }}
              />

              <p
                style={{
                  marginTop: ".5rem",
                  fontSize: ".85rem",
                  opacity: 0.65,
                }}
              >
                Keep it small and honest.
              </p>
            </div>

            <div>
              <label
                htmlFor="note"
                style={{
                  display: "block",
                  marginBottom: ".35rem",
                  fontSize: ".95rem",
                }}
              >
                Optional note
              </label>

              <textarea
                id="note"
                name="note"
                rows={4}
                placeholder="What happened here?"
                style={{
                  width: "100%",
                  padding: ".75rem",
                  borderRadius: "6px",
                  border: "1px solid #333",
                  background: "#0a0a0a",
                  color: "white",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: ".85rem 1rem",
                background: "#1d4ed8",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                width: "fit-content",
              }}
            >
              Log Chapter
            </button>
          </form>

          <div style={{ marginTop: "2rem" }}>
            <h3>Journey Map</h3>

            <CoinMap chapters={chapters ?? []} />
          </div>

                    <div
            style={{
              marginTop: "2rem",
              borderTop: "1px solid #333",
              paddingTop: "1rem",
            }}
          >
            <h3 style={{ marginBottom: "1rem" }}>Journey Timeline</h3>

            {!chapters || chapters.length === 0 ? (
              <p style={{ opacity: 0.8 }}>No chapters yet.</p>
            ) : (
              <div style={{ display: "grid", gap: "1.25rem" }}>
                {chapters.map((chapter, index) => (
                  <div key={chapter.id}>
                    <p>{chapter.location_name}</p>
                    <p>{chapter.pieces} pieces</p>
                    {chapter.note && <p>{chapter.note}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  </main>
);
}