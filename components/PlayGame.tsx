"use client"

import type React from "react"
import Image from "next/image"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft} from "lucide-react"
import { Header } from "@/components/Header"
import Share from "./icons/Share"
import Replay from "./icons/Replay"
import { HuntCards } from "./HuntCards"


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
  const [currentCardIndex, setCurrentCardIndex] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 bg-purple-100 to-[#f9f9ff]">
      <Header
        balance="24.2453"
      />

      <div className="max-w-[1500px] px-14 pt-10 pb-12 bg-white mx-auto rounded-4xl relative">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={onExit}
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900"
          >
            <ArrowLeft className="w-6 h-6 fill-[#0C0C4F]" />
            <span className="bg-gradient-to-b from-[#3737A4] to-[#0C0C4F] text-transparent bg-clip-text text-xl font-normal">Go Home</span>
          </Button>
          <div className="text-right ml-auto">
            <span className="bg-gradient-to-b from-[#E3225C] to-[#7B1C4A] text-transparent bg-clip-text text-xl font-normal">Edit Game</span>
            <br />
            <span className="text-sm bg-gradient-to-b from-[#787884] to-[#576065] text-transparent bg-clip-text">(Only You Can See This)</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-[#0C0C4F] shadow-lg absolute left-1/2 top-1 -translate-x-1/2 -translate-y-1/2">
             <Image src="/icons/logo.png" alt="Logo" width={96} height={96} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-b to-[#3737A4] from-[#0C0C4F] bg-clip-text text-transparent mb-6">Play {gameName}</h1>
          <div className="flex justify-center gap-4 mb-8">
            <Button className="bg-gradient-to-b from-[#E3225C] to-[#7B1C4A] hover:bg-pink-600 text-white px-6 py-2 rounded-full flex items-center gap-2">
              <Replay/> Reset
            </Button>
            <Button className="bg-gradient-to-b from-[#39A437] to-[#194F0C] hover:bg-green-700 text-white px-6 py-2 rounded-full flex items-center gap-2">
              <Share/>
              Share Link
            </Button>
          </div>
        </div>
        
        {/* Updated layout for centered first card and right-positioned subsequent cards */}
        <div className="relative flex justify-center mt-8 min-h-[500px] overflow-x-auto">
          {/* Container for all cards */}
          <div className="relative flex items-start justify-center w-full max-w-none px-8">
            {/* Left side - Previous cards (optional) */}
            {currentCardIndex > 0 && (
              <div className="absolute left-0 top-0 flex flex-col gap-4 mr-8">
                <div className="opacity-40 scale-60 transform origin-right">
                  <HuntCards 
                    hunts={[hunts[currentCardIndex - 1]]}
                    isActive={false}
                    preview={true}
                    currentIndex={currentCardIndex}
                    totalHunts={hunts.length}
                  />
                </div>
              </div>
            )}
            
            {/* Center - Current active card */}
            <div className="flex justify-center mx-auto z-10">
              <HuntCards 
                hunts={[hunts[currentCardIndex]]}
                isActive={true}
                onUnlock={() => {
                  if (currentCardIndex < hunts.length - 1) {
                    setCurrentCardIndex(prev => prev + 1);
                  } else {
                    onGameComplete();
                  }
                }}
                currentIndex={currentCardIndex + 1}
                totalHunts={hunts.length}
              />
            </div>
            
            {/* Right side - Next cards */}
            {currentCardIndex < hunts.length - 1 && (
              <div className="absolute right-0 top-0 flex flex-col gap-6 ml-8">
                {hunts.slice(currentCardIndex + 1, currentCardIndex + 3).map((hunt, index) => (
                  <div key={hunt.id} className="opacity-80 scale-90 transform origin-left hover:opacity-95 transition-all duration-300 border-2 border-blue-300/50 rounded-lg shadow-lg hover:border-blue-400 hover:shadow-xl">
                    <HuntCards 
                      hunts={[hunt]}
                      isActive={false}
                      preview={true}
                      currentIndex={currentCardIndex + index + 2}
                      totalHunts={hunts.length}
                    />
                  </div>
                ))}
                
                {/* Show indicator if there are more cards */}
                {currentCardIndex + 3 < hunts.length && (
                  <div className="text-center text-slate-600 text-sm mt-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    +{hunts.length - currentCardIndex - 3} more cards
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Debug info - remove this in production */}
          <div className="absolute bottom-4 left-4 text-xs text-gray-500 bg-white p-2 rounded">
            Current: {currentCardIndex + 1}/{hunts.length} | 
            Next cards: {currentCardIndex < hunts.length - 1 ? 'Visible' : 'None'}
          </div>
        </div>

      </div>

      {gameCompleteModal}
    </div>
  )
}