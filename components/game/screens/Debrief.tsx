'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { GameAction } from '@/lib/gameEngine'
import { finalDebrief } from '@/lib/gameData'
import { TypewriterText } from '@/components/game/TypewriterText'

interface DebriefProps {
  dispatch: React.Dispatch<GameAction>
}

export function Debrief({ dispatch }: DebriefProps) {
  const [lineIndex, setLineIndex] = useState(0)
  const [revealed, setRevealed] = useState<number[]>([])
  const [showCallToAction, setShowCallToAction] = useState(false)

  useEffect(() => {
    if (lineIndex < finalDebrief.lines.length) {
      // Will advance after typewriter completes each line
    } else {
      const t = setTimeout(() => setShowCallToAction(true), 600)
      return () => clearTimeout(t)
    }
  }, [lineIndex])

  function handleLineComplete(idx: number) {
    setRevealed((prev) => [...prev, idx])
    // Auto-advance to next line after short pause
    setTimeout(() => {
      setLineIndex((prev) => Math.min(prev + 1, finalDebrief.lines.length))
    }, 350)
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-16 gap-10">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="text-[10px] font-mono tracking-[0.4em] uppercase text-court-red border border-court-red/40 px-4 py-1">
          Case Files — Confidential
        </div>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-court-white mt-2 text-balance">
          {finalDebrief.title}
        </h2>
        <div className="w-32 h-px bg-court-gold/40 mt-1" />
      </div>

      {/* Debrief lines */}
      <div className="max-w-2xl w-full flex flex-col gap-3">
        {finalDebrief.lines.map((line, i) => (
          <div
            key={i}
            className={cn(
              'transition-all duration-500',
              i <= lineIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
          >
            {i <= lineIndex && (
              <p
                className={cn(
                  'font-sans leading-relaxed text-base text-balance',
                  i === 0 ? 'text-court-grey text-sm' : 'text-court-white',
                  i === finalDebrief.lines.length - 1 && 'font-semibold text-court-gold text-lg'
                )}
              >
                {i === lineIndex ? (
                  <TypewriterText
                    text={line}
                    speed={30}
                    onComplete={() => handleLineComplete(i)}
                  />
                ) : (
                  line
                )}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Call to action */}
      {showCallToAction && (
        <div className="max-w-2xl w-full animate-portrait">
          <div className="rounded-sm border border-court-gold/60 bg-court-gold/10 p-6 flex flex-col gap-3">
            <div className="text-[10px] font-mono tracking-widest uppercase text-court-gold">
              Reflection Prompt
            </div>
            <p className="text-base font-sans text-court-white leading-relaxed text-balance">
              {finalDebrief.callToAction}
            </p>
          </div>
        </div>
      )}

      {/* Actions */}
      {showCallToAction && (
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-portrait">
          <button
            onClick={() => dispatch({ type: 'GO_TO_CASE_SELECT' })}
            className={cn(
              'px-8 py-4 font-serif font-bold text-base tracking-widest uppercase',
              'bg-court-red border-2 border-court-red-bright text-court-white',
              'hover:bg-court-red-bright hover:shadow-[0_0_24px_rgba(200,16,46,0.5)]',
              'transition-all duration-200 active:scale-95'
            )}
          >
            Review Cases Again
          </button>
          <button
            onClick={() => dispatch({ type: 'GO_TO_MAIN_MENU' })}
            className={cn(
              'px-6 py-3 font-mono text-xs tracking-widest uppercase',
              'border border-border text-muted-foreground',
              'hover:border-court-grey hover:text-foreground',
              'transition-all duration-200'
            )}
          >
            Main Menu
          </button>
        </div>
      )}
    </div>
  )
}
