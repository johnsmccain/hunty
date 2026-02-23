/**
 * Shared hunt list for creator view and (optionally) Game Arcade.
 * Filter by creator == userAddress for "my hunts". Ideally contract would expose
 * get_hunts_by_creator; until then we list all and filter client-side.
 */

export type HuntStatus = "Active" | "Completed" | "Draft"

export interface StoredHunt {
  id: number
  title: string
  description: string
  cluesCount: number
  status: HuntStatus
  /** Creator wallet address (Stellar public key). Used to filter "my hunts". */
  creatorAddress?: string
}

const STORAGE_KEY = "hunty_hunts"

const SEED_HUNTS: StoredHunt[] = [
  {
    id: 1,
    title: "City Secrets",
    description: "Race across town to uncover hidden murals and landmarks.",
    cluesCount: 5,
    status: "Active",
    creatorAddress: "GDEMO_CREATOR_ADDRESS",
  },
  {
    id: 2,
    title: "Campus Quest",
    description: "Solve riddles scattered around campus before the timer ends.",
    cluesCount: 7,
    status: "Active",
    creatorAddress: "GDEMO_CREATOR_ADDRESS",
  },
  {
    id: 3,
    title: "Office Onboarding Hunt",
    description: "A playful intro game for new teammates around the office.",
    cluesCount: 4,
    status: "Completed",
    creatorAddress: "GDEMO_CREATOR_ADDRESS",
  },
  {
    id: 4,
    title: "Summer Treasure Hunt",
    description: "Find hidden clues in the park.",
    cluesCount: 3,
    status: "Draft",
    creatorAddress: "GDEMO_CREATOR_ADDRESS",
  },
  {
    id: 5,
    title: "Museum Mystery",
    description: "Discover art and history through clues.",
    cluesCount: 0,
    status: "Draft",
    creatorAddress: "GDEMO_CREATOR_ADDRESS",
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

export function getAllHunts(): StoredHunt[] {
  return readHunts()
}

/**
 * Hunts created by the given wallet address.
 * Filter client-side by creator == userAddress.
 * (Replace with contract get_hunts_by_creator or indexer when available.)
 */
export function getHuntsByCreator(creatorAddress: string): StoredHunt[] {
  if (!creatorAddress) return []
  return readHunts().filter((h) => h.creatorAddress === creatorAddress)
}

export function updateHuntStatus(huntId: number, status: HuntStatus): void {
  const hunts = readHunts().map((h) => (h.id === huntId ? { ...h, status } : h))
  writeHunts(hunts)
}

export function addHunt(hunt: StoredHunt): void {
  const hunts = readHunts()
  if (hunts.some((h) => h.id === hunt.id)) return
  writeHunts([...hunts, hunt])
}

export function getHuntById(huntId: number): StoredHunt | undefined {
  return readHunts().find((h) => h.id === huntId)
}
