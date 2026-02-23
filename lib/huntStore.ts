/**
 * Shared hunt list for dashboard (creator hunts) and Game Arcade (active hunts).
 * Persisted in localStorage so activated hunts appear in the arcade after refresh.
 */

export type HuntStatus = "Active" | "Completed" | "Draft"

export interface StoredHunt {
  id: number
  title: string
  description: string
  cluesCount: number
  status: HuntStatus
}

const STORAGE_KEY = "hunty_hunts"

const SEED_HUNTS: StoredHunt[] = [
  {
    id: 1,
    title: "City Secrets",
    description: "Race across town to uncover hidden murals and landmarks.",
    cluesCount: 5,
    status: "Active",
  },
  {
    id: 2,
    title: "Campus Quest",
    description: "Solve riddles scattered around campus before the timer ends.",
    cluesCount: 7,
    status: "Active",
  },
  {
    id: 3,
    title: "Office Onboarding Hunt",
    description: "A playful intro game for new teammates around the office.",
    cluesCount: 4,
    status: "Completed",
  },
  {
    id: 4,
    title: "Summer Treasure Hunt",
    description: "Find hidden clues in the park.",
    cluesCount: 3,
    status: "Draft",
  },
  {
    id: 5,
    title: "Museum Mystery",
    description: "Discover art and history through clues.",
    cluesCount: 0,
    status: "Draft",
  },
]

function readHunts(): StoredHunt[] {
  if (typeof window === "undefined") return [...SEED_HUNTS]
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return [...SEED_HUNTS]
    const parsed = JSON.parse(raw) as StoredHunt[]
    return Array.isArray(parsed) ? parsed : [...SEED_HUNTS]
  } catch {
    return [...SEED_HUNTS]
  }
}

function writeHunts(hunts: StoredHunt[]): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(hunts))
  } catch {
    // ignore
  }
}

/** All hunts (for Game Arcade: filter by status === "Active"). */
export function getAllHunts(): StoredHunt[] {
  return readHunts()
}

/** Creator hunts for dashboard (all stored hunts; creator filter can be added later). */
export function getCreatorHunts(): StoredHunt[] {
  return readHunts()
}

/** Update a hunt's status (e.g. Draft → Active after activate_hunt). */
export function updateHuntStatus(huntId: number, status: HuntStatus): void {
  const hunts = readHunts().map((h) => (h.id === huntId ? { ...h, status } : h))
  writeHunts(hunts)
}

/** Add a new hunt (e.g. after createHunt). */
export function addHunt(hunt: StoredHunt): void {
  const hunts = readHunts()
  if (hunts.some((h) => h.id === hunt.id)) return
  writeHunts([...hunts, hunt])
}
