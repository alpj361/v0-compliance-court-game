'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Portrait, CharacterSide } from '@/lib/gameData'

const PORTRAIT_MAP: Record<Portrait, string> = {
  'judge-neutral':           '/portraits/judge-neutral.jpg',
  'judge-angry':             '/portraits/judge-angry.jpg',
  'rodrigo-confident':       '/portraits/rodrigo-confident.jpg',
  'rodrigo-sweating':        '/portraits/rodrigo-sweating.jpg',
  'rodrigo-cornered':        '/portraits/rodrigo-cornered.jpg',
  'alex-neutral':            '/portraits/alex-neutral.jpg',
  'alex-scared':             '/portraits/alex-scared.jpg',
  'alex-relieved':           '/portraits/alex-relieved.jpg',
  'prosecutor-neutral':      '/portraits/prosecutor-neutral.jpg',
  'prosecutor-objecting':    '/portraits/prosecutor-objecting.jpg',
  'nicolas-confident':       '/portraits/nicolas-confident.jpg',
  'nicolas-thinking':        '/portraits/nicolas-thinking.jpg',
  'nicolas-shocked':         '/portraits/nicolas-shocked.jpg',
  'compliance-officer-neutral': '/portraits/compliance-officer-neutral.jpg',
}

interface CharacterPortraitProps {
  portrait: Portrait
  side: CharacterSide
  speaker: string
  isActive?: boolean
  className?: string
}

export function CharacterPortrait({ portrait, side, speaker, isActive = true, className }: CharacterPortraitProps) {
  const src = PORTRAIT_MAP[portrait]

  return (
    <div
      className={cn(
        'relative flex flex-col items-center animate-portrait',
        side === 'right' && 'scale-x-[-1]',
        !isActive && 'opacity-40 grayscale',
        className
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-sm',
          'border-2',
          isActive ? 'border-court-gold shadow-[0_0_20px_rgba(212,160,23,0.3)]' : 'border-border'
        )}
        style={{ width: 220, height: 320 }}
      >
        <Image
          src={src}
          alt={speaker}
          fill
          className="object-cover object-top"
          sizes="220px"
          priority
        />
        {/* Gradient vignette at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-court-navy to-transparent" />
      </div>
      {/* Speaker name tag — mirrored back for right-side characters */}
      <div
        className={cn(
          'absolute bottom-1 left-1/2 -translate-x-1/2',
          side === 'right' && 'scale-x-[-1]',
          'px-3 py-0.5 text-xs font-serif font-semibold tracking-widest uppercase',
          'bg-court-navy/90 border border-court-gold/60 text-court-gold',
          'whitespace-nowrap'
        )}
      >
        {speaker}
      </div>
    </div>
  )
}
