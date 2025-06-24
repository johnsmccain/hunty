"use client"

interface LeaderboardEntry {
  position: number
  name: string
  points: number
  icon: string
}

interface LeaderboardTableProps {
  data: LeaderboardEntry[]
  isEmbedded?: boolean
}

export function LeaderboardTable({ data, isEmbedded = false }: LeaderboardTableProps) {
  const containerClass = isEmbedded
    ? "bg-white rounded-lg overflow-hidden border"
    : "bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-2xl mx-auto"

  return (
    <div className={containerClass}>
      <table className="w-full">
        <thead>
          <tr className="bg-slate-800 text-white">
            <th className={`px-4 py-3 text-left ${isEmbedded ? "" : "rounded-l-lg"}`}>Position</th>
            <th className="px-4 py-3 text-left">Display Name / Wallet Address</th>
            <th className={`px-4 py-3 text-left ${isEmbedded ? "" : "rounded-r-lg"}`}>Points Won</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="px-4 py-3 flex items-center gap-2">
                <span>{entry.icon}</span>
                <span>{entry.position}</span>
              </td>
              <td className="px-4 py-3">{entry.name}</td>
              <td className="px-4 py-3">{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
