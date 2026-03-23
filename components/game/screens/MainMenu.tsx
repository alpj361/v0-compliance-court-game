'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { GameAction, GameMode } from '@/lib/gameEngine'
import { Layers, MessageSquare, Lock } from 'lucide-react'

interface MainMenuProps {
  dispatch: React.Dispatch<GameAction>
}

export function MainMenu({ dispatch }: MainMenuProps) {
  const [selectedMode, setSelectedMode] = useState<GameMode>('chat')

  function handleStart() {
    dispatch({ type: 'SET_GAME_MODE', payload: selectedMode })
    dispatch({ type: 'START_GAME' })
  }

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

      <div className="relative z-10 flex flex-col items-center gap-8 px-4 text-center">
        {/* Title */}
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

        <p className="max-w-md text-court-white/80 text-base leading-relaxed font-sans">
          Two cases. Two sides of the same argument. One pattern you might recognize in yourself.
        </p>

        {/* Mode selector */}
        <div className="flex flex-col items-center gap-3 w-full max-w-sm">
          <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-court-grey">Select experience mode</p>
          <div className="flex gap-3 w-full">
            <button
              onClick={() => setSelectedMode('chat')}
              className={cn(
                'flex-1 flex flex-col items-center gap-2 px-4 py-4 border rounded-sm transition-all duration-150 text-left',
                selectedMode === 'chat'
                  ? 'border-court-gold bg-court-gold/10 text-court-white'
                  : 'border-border bg-court-navy-light text-muted-foreground hover:border-court-gold/40'
              )}
            >
              <MessageSquare size={18} className={selectedMode === 'chat' ? 'text-court-gold' : 'text-muted-foreground'} />
              <span className="text-xs font-mono tracking-wider uppercase">Chat Thread</span>
              <span className="text-[10px] font-sans text-muted-foreground leading-snug text-center">Conversation-style. No portraits.</span>
            </button>
            <div className="relative flex-1">
              <div
                className={cn(
                  'flex flex-col items-center gap-2 px-4 py-4 border rounded-sm text-left',
                  'border-border bg-court-navy-light text-muted-foreground/40 cursor-not-allowed opacity-60'
                )}
              >
                <Layers size={18} className="text-muted-foreground/40" />
                <span className="text-xs font-mono tracking-wider uppercase">Visual Novel</span>
                <span className="text-[10px] font-sans text-muted-foreground/50 leading-snug text-center">Courtroom scene with dialogue box.</span>
              </div>
              <div className="absolute -top-2 -right-2 flex items-center gap-1 px-2 py-0.5 bg-court-navy border border-court-gold/60 rounded-sm">
                <Lock size={8} className="text-court-gold/80" />
                <span className="text-[8px] font-mono tracking-widest uppercase text-court-gold/80">Próximamente</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleStart}
          className={cn(
            'px-10 py-4 font-serif font-bold text-lg tracking-widest uppercase',
            'bg-court-red border-2 border-court-red-bright text-court-white',
            'hover:bg-court-red-bright hover:shadow-[0_0_24px_rgba(200,16,46,0.5)]',
            'transition-all duration-200 active:scale-95'
          )}
        >
          Begin Trial
        </button>

        <p className="text-xs text-muted-foreground font-mono">
          Player: Nicolas — Banking Agent &amp; Law Student
        </p>
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10">
        <div className="text-[9px] font-mono tracking-[0.3em] uppercase text-muted-foreground">
          Select mode, then press &quot;Begin Trial&quot;
        </div>
      </div>
    </div>
  )
}
