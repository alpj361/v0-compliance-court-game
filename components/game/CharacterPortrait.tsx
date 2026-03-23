'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { Portrait, CharacterSide } from '@/lib/gameData'

const PORTRAIT_MAP: Record<Portrait, string> = {
  'judge-neutral':              '/portraits/judge-neutral.jpg',
  'judge-angry':                '/portraits/judge-angry.jpg',
  'morales-judge-neutral':      '/portraits/morales-judge-neutral.jpg',
  'rodrigo-confident':          '/portraits/rodrigo-confident.jpg',
  'rodrigo-sweating':           '/portraits/rodrigo-sweating.jpg',
  'rodrigo-cornered':           '/portraits/rodrigo-cornered.jpg',
  'elena-nervous':              '/portraits/elena-nervous.jpg',
  'fuentes-smug':               '/portraits/fuentes-smug.jpg',
  'fuentes-rattled':            '/portraits/fuentes-rattled.jpg',
  'alex-neutral':               '/portraits/alex-neutral.jpg',
  'alex-scared':                '/portraits/alex-scared.jpg',
  'alex-relieved':              '/portraits/alex-relieved.jpg',
  'alex-defeated':              '/portraits/alex-defeated.jpg',
  'chen-calm':                  '/portraits/chen-calm.jpg',
  'chen-objecting':             '/portraits/chen-objecting.jpg',
  'david-precise':              '/portraits/david-precise.jpg',
  'okafor-neutral':             '/portraits/okafor-neutral.jpg',
  'prosecutor-neutral':         '/portraits/prosecutor-neutral.jpg',
  'prosecutor-objecting':       '/portraits/prosecutor-objecting.jpg',
  'nicolas-confident':          '/portraits/nicolas-confident.jpg',
  'nicolas-thinking':           '/portraits/nicolas-thinking.jpg',
  'nicolas-shocked':            '/portraits/nicolas-shocked.jpg',
  'compliance-officer-neutral': '/portraits/compliance-officer-neutral.jpg',
  // On the Field characters — images may not exist yet; fallback handled below
  'garcia-neutral':             '/portraits/garcia-neutral.jpg',
  'garcia-worried':             '/portraits/garcia-worried.jpg',
  'reyes-arrogant':             '/portraits/reyes-arrogant.jpg',
  'reyes-backing-down':         '/portraits/reyes-backing-down.jpg',
  'vargas-agent-calm':          '/portraits/vargas-agent-calm.jpg',
  'vargas-agent-pressing':      '/portraits/vargas-agent-pressing.jpg',
  'mendoza-friendly':           '/portraits/mendoza-friendly.jpg',
  'mendoza-threatening':        '/portraits/mendoza-threatening.jpg',
}

// Initials for fallback badges when image doesn't exist
const PORTRAIT_INITIALS: Partial<Record<Portrait, string>> = {
  'garcia-neutral':        'DF',
  'garcia-worried':        'DF',
  'reyes-arrogant':        'MR',
  'reyes-backing-down':    'MR',
  'vargas-agent-calm':     'RV',
  'vargas-agent-pressing': 'RV',
  'mendoza-friendly':      'EM',
  'mendoza-threatening':   'EM',
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
  const [imgError, setImgError] = useState(false)
  const initials = PORTRAIT_INITIALS[portrait]
  const showFallback = imgError && initials

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
        {showFallback ? (
          <div className="w-full h-full flex items-center justify-center bg-court-navy-mid">
            <span className="font-serif font-bold text-5xl text-court-gold/60">{initials}</span>
          </div>
        ) : (
          <Image
            src={src}
            alt={speaker}
            fill
            className="object-cover object-top"
            sizes="220px"
            priority
            onError={() => setImgError(true)}
          />
        )}
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
