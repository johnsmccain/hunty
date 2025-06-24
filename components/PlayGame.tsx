"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Share } from "lucide-react"
import { Header } from "@/components/Header"
import Image from "next/image"

interface Hunt {
  id: number
  title: string
  description: string
  link: string
  code: string
}

interface PlayGameProps {
  hunts: Hunt[]
  gameName: string
  onExit: () => void
  onGameComplete: () => void
  gameCompleteModal: React.ReactNode
}

export function PlayGame({ hunts, gameName, onExit, onGameComplete, gameCompleteModal }: PlayGameProps) {
  const [unlockCode, setUnlockCode] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-4 border-4 border-blue-400">
      <Header
        isConnected={true}
        balance="24.2453"
        walletAddress="0xe5f...E5"
        onConnectWallet={() => {}}
        onDisconnect={() => {}}
      />

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={onExit}
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Home
          </Button>
          <div className="text-right ml-auto">
            <span className="text-sm text-gray-600">Edit Game</span>
            <br />
            <span className="text-xs text-gray-500">(Only You Can See This)</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-lg">
            <span className="text-white font-bold text-2xl">GG</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Play {gameName}</h1>
          <div className="flex justify-center gap-4 mb-8">
            <Button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full flex items-center gap-2">
              <span>🔄</span> Reset
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full flex items-center gap-2">
              <Share className="w-4 h-4" />
              Share Link
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-b from-blue-800 to-purple-800 rounded-2xl p-6 text-white">
            <div className="text-right text-sm mb-4">1/10</div>
            <h3 className="text-xl font-bold mb-2">{hunts[0]?.title || "What is the fastest bird?"}</h3>
            <p className="text-sm opacity-90 mb-4">
              {hunts[0]?.description ||
                "The Description appears here. Viverra ipsum dolor sit amet, consectetur adipiscing elit."}
            </p>
            <div className="relative mb-4">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Kingfisher bird"
                width={300}
                height={200}
                className="rounded-lg w-full"
              />
            </div>
            <Button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm">
              🎯 Hint To Unlock
            </Button>
          </div>

          <div className="bg-gradient-to-b from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
            <div className="text-right text-sm mb-4">2/10</div>
            <h3 className="text-xl font-bold mb-2">{hunts[1]?.title || "What is the biggest bird?"}</h3>
            <p className="text-sm opacity-90 mb-4">{hunts[1]?.description || "Long legs, tiny brain"}</p>
            <Button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm mb-4">
              🎯 Hint To Unlock
            </Button>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <div className="flex gap-4 max-w-md w-full">
            <Input
              placeholder="Enter code to unlock"
              value={unlockCode}
              onChange={(e) => setUnlockCode(e.target.value)}
              className="flex-1 px-4 py-2 rounded-full"
            />
            <Button
              onClick={onGameComplete}
              className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-full"
            >
              →
            </Button>
          </div>
        </div>
      </div>

      {gameCompleteModal}
    </div>
  )
}
