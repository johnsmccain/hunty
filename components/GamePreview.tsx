"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface Hunt {
  id: number
  title: string
  description: string
  link: string
  code: string
}

interface GamePreviewProps {
  hunts: Hunt[]
}

export function GamePreview({ hunts }: GamePreviewProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-600">Live Preview</span>
        <div className="flex gap-2">
          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-xs">
            ✓ Reveal
          </Button>
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-full text-xs">
            ⚡ Test
          </Button>
          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-xs">
            👁 Hide
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {hunts.slice(0, 2).map((hunt, index) => (
          <div
            key={hunt.id}
            className={`rounded-2xl p-4 text-white ${
              index === 0
                ? "bg-gradient-to-b from-blue-800 to-purple-800"
                : "bg-gradient-to-b from-purple-600 to-pink-600"
            }`}
          >
            <div className="text-right text-sm mb-2">{index + 1}/10</div>
            <h3 className="text-lg font-bold mb-2">
              {hunt.title || (index === 0 ? "What is the fastest bird?" : "What is the biggest bird?")}
            </h3>
            <p className="text-sm opacity-90 mb-4">
              {hunt.description ||
                (index === 0
                  ? "The Description appears here. Viverra ipsum dolor sit amet, consectetur adipiscing elit."
                  : "Long legs, tiny brain")}
            </p>
            {index === 0 && (
              <div className="relative mb-4">
                <Image
                  src="/placeholder.svg?height=120&width=200"
                  alt="Bird illustration"
                  width={200}
                  height={120}
                  className="rounded-lg w-full"
                />
              </div>
            )}
            <Button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-1 rounded-full text-sm">
              🎯 Hint To Unlock
            </Button>
          </div>
        ))}

        <div className="flex gap-2">
          <Input placeholder="Enter code to unlock" className="flex-1 px-4 py-2 rounded-full" />
          <Button className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-full">→</Button>
        </div>
      </div>
    </div>
  )
}
