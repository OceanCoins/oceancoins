export type JourneyChapter = {
  created_at: string
  distance_from_previous_miles: number | null
}

export type JourneyMarker = {
  id: string
  thresholdMiles: number
  title: string
  achievedAt: string
  distanceAtAchievement: number
}

type MarkerDefinition = {
  id: string
  thresholdMiles: number
  title: string
}

const MARKER_DEFINITIONS: MarkerDefinition[] = [
  {
    id: "one-hundred-miles",
    thresholdMiles: 100,
    title: "This coin traveled 100 miles.",
  },
  {
    id: "one-thousand-miles",
    thresholdMiles: 1_000,
    title: "This coin traveled 1,000 miles.",
  },
  {
    id: "crossed-united-states",
    thresholdMiles: 2_800,
    title: "This coin traveled the width of the United States.",
  },
  {
    id: "circled-earth",
    thresholdMiles: 24_901,
    title: "This coin traveled the distance around Earth.",
  },
  {
    id: "halfway-to-moon",
    thresholdMiles: 119_450,
    title: "This coin traveled halfway to the Moon.",
  },
  {
    id: "reached-moon",
    thresholdMiles: 238_900,
    title: "This coin traveled the distance to the Moon.",
  },
  {
    id: "moon-and-back",
    thresholdMiles: 477_800,
    title: "This coin traveled the distance to the Moon and back.",
  },
]

export function calculateJourneyMarkers(
  chapters: JourneyChapter[],
): JourneyMarker[] {
  const orderedChapters = [...chapters].sort(
    (a, b) =>
      new Date(a.created_at).getTime() -
      new Date(b.created_at).getTime(),
  )

  const achievedMarkers: JourneyMarker[] = []
  const remainingMarkers = [...MARKER_DEFINITIONS]

  let runningDistance = 0

  for (const chapter of orderedChapters) {
    const chapterDistance =
      Number(chapter.distance_from_previous_miles) || 0

    runningDistance += Math.max(0, chapterDistance)

    for (let index = remainingMarkers.length - 1; index >= 0; index--) {
      const marker = remainingMarkers[index]

      if (runningDistance >= marker.thresholdMiles) {
        achievedMarkers.push({
          ...marker,
          achievedAt: chapter.created_at,
          distanceAtAchievement: runningDistance,
        })

        remainingMarkers.splice(index, 1)
      }
    }
  }

  return achievedMarkers.sort(
    (a, b) => a.thresholdMiles - b.thresholdMiles,
  )
}

export function calculateTotalJourneyMiles(
  chapters: JourneyChapter[],
): number {
  return chapters.reduce((total, chapter) => {
    const distance = Number(chapter.distance_from_previous_miles) || 0
    return total + Math.max(0, distance)
  }, 0)
}