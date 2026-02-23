import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import picture from "@/public/static-images/image1.png";
import { Skeleton } from "@/components/ui/skeleton";

export interface Hunt {
  id: string | number;
  title?: string;
  description?: string;
  link?: string;
  code?: string;
  image?: string;
}

interface HuntCardsProps {
  hunts: Hunt[]; // always an array of one item in active/preview mode
  isActive?: boolean;
  preview?: boolean;
  onUnlock?: () => void;
  currentIndex?: number;
  totalHunts?: number;
  isLoading?: boolean;
}


export const HuntCards: React.FC<HuntCardsProps> = ({
  hunts,
  isActive = true,
  preview = false,
  onUnlock,
  currentIndex = 1,
  totalHunts = 1,
  isLoading = false,
}) => {
  const hunt = hunts && hunts.length > 0 ? hunts[0] : {} as Hunt;
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setError("");
    setSuccess(false);
  };

  const handleUnlock = () => {
    if (!isActive || preview) return;
    if (input.trim().toLowerCase() === (hunt.code || "").trim().toLowerCase()) {
      setSuccess(true);
      setError("");
      setInput("");
      setTimeout(() => {
        setSuccess(false);
        if (onUnlock) onUnlock();
      }, 700);
    } else {
      setError("Incorrect code. Try again.");
      setSuccess(false);
    }
  };

  // Allow Enter key to submit
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleUnlock();
  };

  if (isLoading) {
    return (
      <div className={`rounded-2xl shadow-lg w-full max-w-[400px] transition-all duration-300 ${isActive ? "scale-105 border-2 border-blue-400" : preview ? "opacity-70" : "opacity-90"}`}>
        <div className="rounded-t-2xl p-6 bg-gradient-to-b from-[#3737A4] to-[#0C0C4F]">
          <div className="flex justify-end mb-2">
            <Skeleton className="h-4 w-12 bg-white/20" />
          </div>
          <Skeleton className="h-7 w-3/4 mb-2 bg-white/20" />
          <Skeleton className="h-4 w-full mb-2 bg-white/20" />
          <Skeleton className="h-4 w-5/6 mb-4 bg-white/20" />
          <Skeleton className="w-[180px] h-[180px] rounded-md bg-white/20" />
        </div>
        <div className="bg-white flex gap-2 p-6 rounded-b-2xl items-center">
          <Skeleton className="flex-1 h-10 rounded-full bg-gray-200" />
          <Skeleton className="h-10 w-[72px] rounded-xl bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl shadow-lg w-full max-w-[400px] transition-all duration-300 ${isActive ? "scale-105 border-2 border-blue-400" : preview ? "opacity-70" : "opacity-90"}`}>
      <div className="rounded-t-2xl p-6 text-white bg-gradient-to-b from-[#3737A4] to-[#0C0C4F]">
        <div className="text-right text-[#B3B3E5] text-sm mb-2">
          {currentIndex}/{totalHunts}
        </div>
        <h3 className="text-xl font-bold mb-2">
          {hunt.title || "Untitled Hunt"}
        </h3>
        <p className="text-sm opacity-90 mb-4">
          {hunt.description || "No description provided."}
        </p>
        {hunt.link || hunt.image ? (
          <Image src={hunt.link || hunt.image || picture} alt="hunt" width={180} height={180} />
        ) : (
          <Image src={picture} alt="hunt" width={180} height={180}  />
        )}
      </div>
      {/* Input and button only for active, non-preview cards */}
      <div className="bg-white flex gap-2 p-6 rounded-b-2xl items-center">
        <Input
          placeholder={isActive ? "Enter code to unlock" : "Locked"}
          className={`flex-1 px-4 py-2 rounded-full ${!isActive ? "bg-gray-100 cursor-not-allowed" : ""}`}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={!isActive || preview}
        />
        <Button
          className={`bg-gradient-to-b from-[#3737A4] to-[#0C0C4F] hover:bg-purple-700 text-white px-6 py-2 rounded-xl transition-all duration-200 ${!isActive || preview ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleUnlock}
          disabled={!isActive || preview}
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
      {/* Feedback */}
      {/* <div className="min-h-[24px] text-center">
        {success && <span className="text-green-600 font-semibold">Correct! Unlocked.</span>}
        {error && <span className="text-red-500 font-semibold">{error}</span>}
      </div> */}
    </div>
  );
};