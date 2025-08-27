"use client"

import * as React from "react"
import { HexColorPicker } from "react-colorful"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  className?: string
  disabled?: boolean
}

export function ColorPicker({ color, onChange, className, disabled }: ColorPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-[200px] justify-start", className)}
          disabled={disabled}
        >
          <div
            className="h-4 w-4 rounded-full border border-gray-300"
            style={{ backgroundColor: color }}
          />
          <span className="text-xs font-mono">{color}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3">
        <div className="space-y-3">
          <HexColorPicker color={color} onChange={onChange} />
          <div className="flex items-center gap-2">
            <div
              className="h-8 w-8 rounded border"
              style={{ backgroundColor: color }}
            />
            <span className="text-sm font-mono">{color}</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}