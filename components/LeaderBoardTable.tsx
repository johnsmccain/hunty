"use client"

import { ReactNode } from "react"

interface LeaderboardEntry {
  position: number
  name: string
  points: number
  icon: ReactNode
}

import { Skeleton } from "@/components/ui/skeleton"

interface LeaderboardTableProps {
  data: LeaderboardEntry[]
  isLoading?: boolean
}

export function LeaderboardTable({ data, isLoading = false }: LeaderboardTableProps) {
  const containerClass = "rounded-none max-w-2xl mx-auto";

  return (
    <div className={containerClass}>
      <table className="w-full rounded-none border-l border-[#808080] border-collapse">
  <thead>
    <tr className="bg-gradient-to-b from-[#3737A4] to-[#0C0C4F] text-white">
      <th className="px-4 py-2 text-center border border-r-2 border-white">Position</th>
      <th className="px-4 py-2 text-left border border-r-2 border-white">Display Name / Wallet Address</th>
      <th className="px-4 py-2 text-center">Points Won</th>
    </tr>
  </thead>
  <tbody>
    {isLoading ? (
      Array.from({ length: 5 }).map((_, index) => (
        <tr key={`skeleton-${index}`} className="bg-white">
          <td className="px-4 py-3 flex items-center justify-center gap-2 text-center border-r-2 border-[#808080] border-b-2">
            <Skeleton className="w-6 h-6 rounded-full bg-slate-200" />
            <Skeleton className="w-4 h-5 bg-slate-200" />
          </td>
          <td className="px-4 py-3 border-r-2 border-[#808080] border-b-2">
            <Skeleton className="w-1/2 h-5 bg-slate-200" />
          </td>
          <td className="px-4 py-3 text-center border border-b-2 border-[#808080]">
            <Skeleton className="w-8 h-5 mx-auto bg-slate-200" />
          </td>
        </tr>
      ))
    ) : (
      data.map((entry, index) => (
        <tr key={index} className="bg-white">
          <td className="px-4 py-2 flex items-center justify-center gap-2 text-center border-r-2 border-[#808080] border-b-2 ">
            <span>{entry.icon}</span>
            <span className="text-[16px] bg-gradient-to-b from-[#576065] to-[#787884] bg-clip-text text-transparent">{entry.position}</span>
          </td>
          <td className="px-4 py-2 border-r-2 border-[#808080] border-b-2 text-[16px] bg-gradient-to-b from-[#576065] to-[#787884] bg-clip-text text-transparent">{entry.name}</td>
          <td className="px-4 py-2 text-center border border-b-2 border-[#808080] text-[16px] bg-gradient-to-b from-[#576065] to-[#787884] bg-clip-text text-transparent">{entry.points}</td>
        </tr>
      ))
    )}
  </tbody>
</table>
    </div>
  )
}
