"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, Check, X } from "lucide-react"

interface Hunt {
  id: number
  title: string
  description: string
  link: string
  code: string
}

interface HuntFormProps {
  hunt: Hunt
  canRemove: boolean
  onUpdate: (field: keyof Hunt, value: string) => void
  onRemove: () => void
}

export function HuntForm({ hunt, canRemove, onUpdate, onRemove }: HuntFormProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Hunt {hunt.id}</h3>
        {canRemove && (
          <Button onClick={onRemove} variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
            Remove
          </Button>
        )}
      </div>

      <Input
        placeholder="Title of the Hunt"
        value={hunt.title}
        onChange={(e) => onUpdate("title", e.target.value)}
        className="w-full"
      />

      <div className="flex gap-2">
        <Input
          placeholder="Description"
          value={hunt.title}
          onChange={(e) => onUpdate("title", e.target.value)}
          className="w-full"
        />
        <Button size="icon" className="bg-slate-800 hover:bg-slate-700 text-white">
          <Upload className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Add Link</span>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" className="w-6 h-6 bg-green-500 text-white rounded-full">
              <Check className="w-3 h-3" />
            </Button>
            <Button size="icon" variant="ghost" className="w-6 h-6 bg-red-500 text-white rounded-full">
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
        <Input
          placeholder="Enter Code to Unlock next challenge"
          value={hunt.code}
          onChange={(e) => onUpdate("code", e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  )
}
