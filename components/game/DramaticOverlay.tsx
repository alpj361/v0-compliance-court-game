'use client'

import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { OverlayType } from '@/lib/gameEngine'

interface DramaticOverlayProps {
  type: OverlayType
  onDismiss: () => void
}

const OVERLAY_CONFIG = {
  OBJECTION: {
    text: 'OBJECTION!',
    bg: 'bg-court-red',
    textColor: 'text-court-white',
    border: 'border-court-red-bright',
    glow: 'shadow-[0_0_60px_20px_rgba(200,16,46,0.6)]',
  },
  'HOLD IT': {
    text: 'HOLD IT!',
    bg: 'bg-amber-600',
    textColor: 'text-court-white',
    border: 'border-amber-400',
    glow: 'shadow-[0_0_60px_20px_rgba(217,119,6,0.6)]',
  },
  'TAKE THAT': {
    text: 'TAKE THAT!',
    bg: 'bg-blue-700',
    textColor: 'text-court-white',
    border: 'border-blue-400',
    glow: 'shadow-[0_0_60px_20px_rgba(29,78,216,0.6)]',
  },
} as const

export function DramaticOverlay({ type, onDismiss }: DramaticOverlayProps) {
  // Auto-dismiss after 1.4s
  useEffect(() => {
    if (!type) return
    const t = setTimeout(onDismiss, 1400)
    return () => clearTimeout(t)
  }, [type, onDismiss])

  if (!type) return null

  const config = OVERLAY_CONFIG[type]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 cursor-pointer"
      onClick={onDismiss}
    >
      {/* Radial flash */}
      <div className="absolute inset-0 bg-radial-[at_50%_50%] from-white/10 to-transparent" />

      <div
        className={cn(
          'animate-objection-slam',
          'px-10 py-5 rounded-sm border-4',
          config.bg,
          config.border,
          config.glow
        )}
      >
        <span
          className={cn(
            'block font-serif font-bold tracking-widest select-none',
            'text-5xl md:text-7xl',
            config.textColor,
            'drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
          )}
          style={{ fontStyle: 'italic' }}
        >
          {config.text}
        </span>
      </div>
    </div>
  )
}
