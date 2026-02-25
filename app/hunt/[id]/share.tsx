"use client";

import { HuntControls } from "@/components/HuntControls";
import { Button } from "@/components/ui/button";
import { StoredHunt, updateHuntStatus } from "@/lib/huntStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface HuntDetailProps {
  hunt: StoredHunt;
}

export default function HuntShare({ hunt }: HuntDetailProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [connectedPublicKey, setConnectedPublicKey] = useState<string | undefined>(undefined);

  useEffect(() => {
    const win = window as Window & {
      freighter?: { getPublicKey?: () => Promise<string> };
      soroban?: { getPublicKey?: () => Promise<string> };
      sorobanWallet?: { getPublicKey?: () => Promise<string> };
    };
    const wallet = win.freighter ?? win.soroban ?? win.sorobanWallet;
    if (wallet?.getPublicKey) {
      wallet.getPublicKey().then(setConnectedPublicKey).catch(() => undefined);
    }
  }, []);

  const handleShare = async () => {
    const url = `${window.location.origin}/hunt/${hunt.id}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const markHuntCancelled = (huntId: number) => {
    updateHuntStatus(huntId, "Cancelled");
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <Link

        href={`/hunt/${hunt.id}/join`}
        className="flex-1 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 active:scale-95 transition-all duration-150 text-white font-semibold text-base px-8 py-4 rounded-2xl shadow-lg shadow-violet-900/40"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Join Hunt
      </Link>

      {/* Share button */}
      <Button
        onClick={handleShare}
      // className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 active:scale-95 transition-all duration-150 text-zinc-300 hover:text-white font-medium text-base px-6 py-4 rounded-2xl"
      >
        {copied ? (
          <>
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-emerald-400">Copied!</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </>
        )}
      </Button>

      <HuntControls
        hunt={hunt}
        connectedPublicKey={connectedPublicKey}
        onCancelled={(huntId, txHash) => {
          markHuntCancelled(huntId)
          router.push("/hunts")
        }}
      />
    </div>
  );
}