'use client'

import { cn } from '@/lib/utils'
import { CASES } from '@/lib/gameData'
import type { GameAction } from '@/lib/gameEngine'
import type { GameState } from '@/lib/gameEngine'
import { Scale, Shield } from 'lucide-react'

interface CaseSelectProps {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

export function CaseSelect({ state, dispatch }: CaseSelectProps) {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-12 gap-10">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="text-[10px] font-mono tracking-[0.35em] uppercase text-court-gold border border-court-gold/40 px-4 py-1">
          Case Docket
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-court-white mt-2 text-balance">
          Select Your Case
        </h2>
        <p className="text-court-grey text-sm max-w-md text-balance font-sans leading-relaxed mt-1">
          Each case explores the same compliance failure from a different angle. Complete Case 1 first.
        </p>
      </div>

      {/* Cases */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl">
        {CASES.map((c, idx) => {
          const isLocked = idx === 1 && !state.case1Complete
          const isComplete = c.id === 'case-1' ? state.case1Complete : state.case2Complete
          const Icon = c.id === 'case-1' ? Scale : Shield

          return (
            <button
              key={c.id}
              disabled={isLocked}
              onClick={() => dispatch({ type: 'SELECT_CASE', payload: c })}
              className={cn(
                'flex-1 text-left rounded-sm border p-6 transition-all duration-200',
                'flex flex-col gap-4',
                isLocked
                  ? 'border-border bg-court-navy-mid opacity-50 cursor-not-allowed'
                  : 'border-court-gold/50 bg-court-navy-mid hover:border-court-gold hover:shadow-[0_0_20px_rgba(212,160,23,0.15)] cursor-pointer',
                isComplete && 'border-green-600/60'
              )}
            >
              <div className="flex items-start justify-between">
                <div
                  className={cn(
                    'p-2 rounded-sm',
                    isLocked ? 'bg-secondary text-muted-foreground' : 'bg-court-gold/20 text-court-gold'
                  )}
                >
                  <Icon size={22} />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-muted-foreground">
                    Case {idx + 1} of 2
                  </span>
                  {isComplete && (
                    <span className="text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 bg-green-900/40 text-green-400 border border-green-600/40 rounded-[2px]">
                      Complete
                    </span>
                  )}
                  {isLocked && (
                    <span className="text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 bg-secondary text-muted-foreground border border-border rounded-[2px]">
                      Locked
                    </span>
                  )}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-mono tracking-widest uppercase text-court-gold mb-1">
                  {c.roleLabel}
                </div>
                <h3 className="font-serif text-xl font-bold text-court-white leading-tight">
                  {c.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 font-mono">{c.subtitle}</p>
              </div>

              <p className="text-sm text-foreground/80 leading-relaxed font-sans line-clamp-3">
                {c.briefing}
              </p>

              {!isLocked && (
                <div className="text-xs font-serif text-court-gold mt-auto">
                  Enter Courtroom &rarr;
                </div>
              )}
              {isLocked && (
                <div className="text-xs font-mono text-muted-foreground mt-auto">
                  Complete Case 1 to unlock
                </div>
              )}
            </button>
          )
        })}
      </div>

      <button
        onClick={() => dispatch({ type: 'GO_TO_MAIN_MENU' })}
        className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono tracking-wider uppercase"
      >
        &larr; Main Menu
      </button>
    </div>
  )
}
