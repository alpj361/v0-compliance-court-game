'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { GameAction } from '@/lib/gameEngine'

interface MainMenuProps {
  dispatch: React.Dispatch<GameAction>
}

export function MainMenu({ dispatch }: MainMenuProps) {
  return (
    <div className="relative w-full h-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background courtroom image */}
      <div className="absolute inset-0">
        <Image
          src="/portraits/courtroom-bg.jpg"
          alt="Courtroom"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-court-navy/60 via-court-navy/40 to-court-navy/90" />
      </div>

      {/* Header badge */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="text-[10px] font-mono tracking-[0.35em] uppercase text-court-gold border border-court-gold/40 px-4 py-1">
            Banking Compliance Training Series
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-balance text-court-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            COMPLIANCE
          </h1>
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-balance text-court-gold drop-shadow-[0_2px_12px_rgba(212,160,23,0.4)]">
            COURT
          </h1>
          <div className="w-48 h-px bg-court-gold/60 mt-1" />
          <p className="text-court-grey text-sm font-sans tracking-widest uppercase mt-1">
            The Case Against Overconfidence
          </p>
        </div>

        {/* Tagline */}
        <p className="max-w-md text-court-white/80 text-base leading-relaxed font-sans">
          Two cases. Two sides of the same argument. One pattern you might recognize in yourself.
        </p>

        {/* CTA */}
        <button
          onClick={() => dispatch({ type: 'START_GAME' })}
          className={cn(
            'mt-2 px-10 py-4 font-serif font-bold text-lg tracking-widest uppercase',
            'bg-court-red border-2 border-court-red-bright text-court-white',
            'hover:bg-court-red-bright hover:shadow-[0_0_24px_rgba(200,16,46,0.5)]',
            'transition-all duration-200 active:scale-95'
          )}
        >
          Begin Trial
        </button>

        <p className="text-xs text-muted-foreground font-mono">
          Player: Nicolas — Banking Agent & Law Student
        </p>
      </div>

      {/* Bottom rule line */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10">
        <div className="text-[9px] font-mono tracking-[0.3em] uppercase text-muted-foreground">
          Press &quot;Begin Trial&quot; to continue
        </div>
      </div>
    </div>
  )
}
