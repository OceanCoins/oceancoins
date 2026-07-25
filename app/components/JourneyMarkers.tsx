import type { JourneyMarker } from "@/lib/journeyMarkers"

type JourneyMarkersProps = {
  markers: JourneyMarker[]
}

export default function JourneyMarkers({
  markers,
}: JourneyMarkersProps) {
  if (markers.length === 0) {
    return null
  }

  return (
    <section className="w-full py-14">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
          Journey Markers
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          Moments along the way
        </h2>
      </div>

      <div className="border-l border-slate-600 pl-6">
        {markers.map((marker) => (
          <article
            key={marker.id}
            className="relative border-b border-slate-700 py-7 first:pt-0 last:border-b-0 last:pb-0"
          >
            <span
              aria-hidden="true"
              className="absolute -left-[29px] top-8 h-2.5 w-2.5 rounded-full bg-slate-300"
            />

            <p className="text-xl leading-relaxed text-slate-100">
              {marker.title}
            </p>

            <time
              dateTime={marker.achievedAt}
              className="mt-3 block text-sm text-slate-400"
            >
              {new Intl.DateTimeFormat("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC",
              }).format(new Date(marker.achievedAt))}
            </time>
          </article>
        ))}
      </div>
    </section>
  )
}