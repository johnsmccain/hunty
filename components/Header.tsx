"use client"

import { Button } from "@/components/ui/button"
import Coin from "./icons/Coin"

interface HeaderProps {
  isConnected: boolean
  balance: string
  walletAddress: string
  onConnectWallet: () => void
  onDisconnect: () => void
}

export function Header({ isConnected, balance, walletAddress, onConnectWallet, onDisconnect }: HeaderProps) {
  return (
    <header className="flex flex-row justify-between items-center py-4 sm:py-6 lg:py-8 px-4 max-w-[1600px] mx-auto pb-8 sm:pb-12 lg:pb-24 gap-4">
    <div className="font-normal text-xl sm:text-2xl md:text-3xl lg:text-4xl bg-gradient-to-br from-[#2F2FFF] to-[#E87785] bg-clip-text text-transparent flex-shrink-0">
      Hunty
    </div>
    
    {isConnected ? (
      <div className="flex flex-row items-center gap-2 sm:gap-4 min-w-0 flex-1 justify-end">
        <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full">
          <Coin/>
          <span className="bg-gradient-to-br from-[#3737A4] to-[#0C0C4F] bg-clip-text text-transparent text-xs sm:text-sm md:text-base lg:text-xl font-medium">
            {balance}
          </span>
        </div>
        <Button 
          onClick={onDisconnect} 
          className="border-2 border-transparent hover:opacity-80 flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base lg:text-xl flex-shrink-0 justify-center" 
          style={{background: 'linear-gradient(white, white) padding-box, linear-gradient(to right, #0C0C4F, #4A4AFF) border-box'}}
        >
          <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full bg-gradient-to-b from-[#3737A4] to-[#0C0C4F] flex-shrink-0"></div>
          <span className="font-black bg-gradient-to-b from-[#3737A4] to-[#0C0C4F] text-transparent bg-clip-text truncate max-w-[80px] sm:max-w-[120px] md:max-w-[150px] lg:max-w-[200px]">
            {walletAddress}
          </span>
        </Button>
      </div>
      ) : (
        <Button 
          onClick={onConnectWallet} 
          className="bg-[#0C0C4F] hover:bg-slate-700 text-white px-4 md:px-6 py-2 sm:py-3 rounded-xl text-sm md:text-xl font-black"
        >
          Connect Wallet
        </Button>
      )}
    </header>
  )
}