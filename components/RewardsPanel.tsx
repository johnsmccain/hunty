"use client"

import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"
import Trash from "@/components/icons/trash"
import Coin from "@/components/icons/Coin"
import { ReactNode } from "react"

export interface Reward {
  place: number
  amount: number
  icon: ReactNode
}

export interface RewardsPanelProps {
  rewards: Reward[];
  onUpdateReward: (place: number, amount: number) => void;
  onAddReward: () => void;
  onDeleteReward: (place: number) => void;
  error?: string;
}

export function RewardsPanel({ rewards, onUpdateReward, onAddReward, onDeleteReward, error }: RewardsPanelProps) {



  return (
    <div className="space-y-6">
      {rewards.map((reward) => (
        <div key={reward.place} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{reward.icon}</span>
            <span className="font-normal text-2xl bg-gradient-to-l from-[#3737A4] to-[#0C0C4F] text-transparent bg-clip-text">{reward.place == 1 && "1st"} {reward.place == 2 && "2nd"} {reward.place == 3 && "3rd"} {reward.place > 3 && `${reward.place}th`} Place</span>
          </div>
          <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onUpdateReward(reward.place, reward.amount - 0.1)}
                className="w-6 h-6 border-2 border-transparent bg-gradient-to-r from-[#0C0C4F] to-[#4A4AFF] bg-origin-border hover:opacity-80 rounded-lg"
                style={{
                  background: 'linear-gradient(white, white) padding-box, linear-gradient(to right, #0C0C4F, #4A4AFF) border-box'
                }}  
              >
                <Minus className="w-3 h-3" />
              </Button>
              <div className="flex items-center gap-8 bg-white px-3 py-1 rounded border-b-2 border-transparent bg-gradient-to-r from-[#0C0C4F] to-[#4A4AFF] bg-[length:100%_2px] bg-no-repeat bg-bottom">
                <Coin/>
                <span className="text-[16px] font-medium bg-gradient-to-b from-[#3737A4] to-[#0C0C4F] text-transparent bg-clip-text">{reward.amount.toPrecision(3)}</span>
              </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onUpdateReward(reward.place, reward.amount + 0.1)}
              className="w-6 h-6 border-2 border-transparent bg-gradient-to-r from-[#0C0C4F] to-[#4A4AFF] bg-origin-border hover:opacity-80 rounded-lg"
              style={{
                background: 'linear-gradient(white, white) padding-box, linear-gradient(to right, #0C0C4F, #4A4AFF) border-box'
              }}
            >
              <Plus className="w-3 h-3" />
            </Button>
            <Button 
              variant="ghost" 
              className="w-8 h-8 p-3 bg-gradient-to-b from-[#FD0A44] to-[#932331] text-white rounded-lg ml-2 cursor-pointer hover:opacity-80"
              onClick={() => onDeleteReward(reward.place)}
            >
              <Trash/>  
            </Button>
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-2">
        <Button
            className="bg-white text-[#808080] text-[16px] font-medium hover:bg-gray-100 px-6 py-2 rounded-full border-2 border-dashed border-[#808080] cursor-pointer"
            onClick={onAddReward}
                  >
            Add Reward for Runner-up
        </Button>
        {error && <span className="text-red-500 text-sm text-center">{error}</span>}
      </div>
    </div>
  )
}
