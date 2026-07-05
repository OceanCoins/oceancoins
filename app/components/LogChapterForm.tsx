import { addChapter } from "../coin/[number]/actions";

type LogChapterFormProps = {
  coinId: string;
  coinNumber: number;
};

export default function LogChapterForm({
  coinId,
  coinNumber,
}: LogChapterFormProps) {
  return (
    <form
      action={addChapter}
      style={{
        marginTop: "2rem",
        display: "grid",
        gap: ".75rem",
      }}
    >
      <input type="hidden" name="coinId" value={coinId} />
      <input type="hidden" name="coinNumber" value={String(coinNumber)} />

      <div
        style={{
          borderTop: "1px solid #222",
          marginTop: "2rem",
          paddingTop: "2rem",
        }}
      >
        <h3 style={{ margin: 0 }}>Continue the Journey</h3>
      </div>

      <label>
        <div
          style={{
            display: "block",
            marginBottom: ".35rem",
            fontSize: ".95rem",
          }}
        >
          Location
        </div>

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
      </label>

      <label>
        <div
          style={{
            display: "block",
            marginBottom: ".35rem",
            fontSize: ".95rem",
          }}
        >
          Pieces picked up
        </div>

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
      </label>

      <label>
        <div
          style={{
            display: "block",
            marginBottom: ".35rem",
            fontSize: ".95rem",
          }}
        >
          Optional note
        </div>

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
      </label>

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
  );
}