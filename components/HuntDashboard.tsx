"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import type { StoredHunt } from "@/lib/huntStore"
import { ActivateHuntModal } from "@/components/ActivateHuntModal"

interface HuntDashboardProps {
  hunts: StoredHunt[]
  onActivate: (huntId: number) => Promise<void>
  onRefresh: () => void
}

function StatusBadge({ status }: { status: StoredHunt["status"] }) {
  const styles =
    status === "Active"
      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
      : status === "Completed"
        ? "bg-slate-100 text-slate-700 border-slate-200"
        : "bg-amber-100 text-amber-800 border-amber-200"
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles}`}
    >
      {status}
    </span>
  )
}

export function HuntDashboard({ hunts, onActivate, onRefresh }: HuntDashboardProps) {
  const [modalHunt, setModalHunt] = useState<StoredHunt | null>(null)
  const [activatingId, setActivatingId] = useState<number | null>(null)

  const handleActivateClick = (hunt: StoredHunt) => {
    setModalHunt(hunt)
  }

  const handleConfirmActivate = async () => {
    if (!modalHunt) return
    setActivatingId(modalHunt.id)
    try {
      await onActivate(modalHunt.id)
      onRefresh()
      setModalHunt(null)
    } finally {
      setActivatingId(null)
    }
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hunts.map((hunt) => {
          const isDraft = hunt.status === "Draft"
          const hasClues = hunt.cluesCount > 0
          const canActivate = isDraft && hasClues

          return (
            <Card
              key={hunt.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="p-5">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <CardTitle className="line-clamp-2 text-lg">{hunt.title}</CardTitle>
                  <StatusBadge status={hunt.status} />
                </div>
                <CardDescription className="mb-4 line-clamp-3 text-sm text-slate-600">
                  {hunt.description}
                </CardDescription>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs text-slate-500">
                    {hunt.cluesCount} {hunt.cluesCount === 1 ? "clue" : "clues"}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => handleActivateClick(hunt)}
                    disabled={!canActivate}
                    className="bg-gradient-to-b from-[#39A437] to-[#194F0C] hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Activate
                  </Button>
                </div>
                {isDraft && !hasClues && (
                  <p className="mt-2 text-xs text-amber-600">
                    Add at least one clue to activate.
                  </p>
                )}
              </div>
            </Card>
          )
        })}
      </div>

      <ActivateHuntModal
        isOpen={!!modalHunt}
        onClose={() => setModalHunt(null)}
        onConfirm={handleConfirmActivate}
        huntTitle={modalHunt?.title ?? ""}
        isActivating={activatingId !== null}
      />
    </>
  )
}
