'use client'

import { cn } from '@/lib/utils'
import type { GameState, GameAction } from '@/lib/gameEngine'
import { Scale, Shield } from 'lucide-react'

interface BriefingProps {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

export function Briefing({ state, dispatch }: BriefingProps) {
  const { activeCase } = state
  if (!activeCase) return null

  const Icon = activeCase.id === 'case-1' ? Scale : Shield

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-16 gap-8">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center max-w-2xl">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.35em] uppercase text-court-gold border border-court-gold/40 px-4 py-1">
          <Icon size={12} />
          <span>{activeCase.roleLabel}</span>
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-court-white mt-2 text-balance leading-tight">
          {activeCase.title}
        </h2>
        <p className="text-muted-foreground text-xs font-mono">{activeCase.subtitle}</p>
      </div>

      {/* Briefing card */}
      <div className="max-w-2xl w-full rounded-sm border border-border bg-court-navy-mid p-6 md:p-8 flex flex-col gap-4">
        <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground border-b border-border pb-2 mb-1">
          Case Briefing — For Prosecution Eyes Only
        </div>
        <p className="text-foreground/90 leading-relaxed font-sans text-base">
          {activeCase.briefing}
        </p>

        {/* Role badge */}
        <div
          className={cn(
            'mt-2 flex items-center gap-3 rounded-sm border p-4',
            activeCase.id === 'case-1'
              ? 'border-court-red/40 bg-court-red/10'
              : 'border-blue-600/40 bg-blue-900/10'
          )}
        >
          <div
            className={cn(
              'p-2 rounded-sm',
              activeCase.id === 'case-1' ? 'bg-court-red/20 text-court-red-bright' : 'bg-blue-700/30 text-blue-300'
            )}
          >
            <Icon size={18} />
          </div>
          <div>
            <div className="text-xs font-mono tracking-wider uppercase text-muted-foreground">
              Your Role
            </div>
            <div className="text-sm font-serif font-semibold text-foreground mt-0.5">
              Nicolas — {activeCase.roleLabel}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center gap-3 w-full max-w-sm">
        <button
          onClick={() => dispatch({ type: 'START_INVESTIGATION' })}
          className={cn(
            'w-full py-4 font-serif font-bold text-base tracking-widest uppercase',
            'bg-court-gold text-court-navy border-2 border-court-gold-light',
            'hover:bg-court-gold-light hover:shadow-[0_0_20px_rgba(212,160,23,0.3)]',
            'transition-all duration-200 active:scale-95'
          )}
        >
          Review Evidence
        </button>
        <p className="text-[10px] text-muted-foreground font-mono text-center">
          Study all evidence cards before entering the courtroom
        </p>
      </div>

      <button
        onClick={() => dispatch({ type: 'GO_TO_CASE_SELECT' })}
        className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono tracking-wider uppercase"
      >
        &larr; Case Select
      </button>
    </div>
  )
}
