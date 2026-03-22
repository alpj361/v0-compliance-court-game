'use client'

/**
 * ArgumentBuilder — Case 2 Chapter 3 multi-select closing argument screen.
 * Player must select ONLY the correct argument pieces to deliver a valid closing.
 */

import { cn } from '@/lib/utils'
import type { GameState, GameAction } from '@/lib/gameEngine'
import { CredibilityMeter } from '@/components/game/CredibilityMeter'
import { CheckSquare, Square, AlertTriangle, Gavel } from 'lucide-react'

interface ArgumentBuilderProps {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

export function ArgumentBuilder({ state, dispatch }: ArgumentBuilderProps) {
  const { activeCase, currentSceneId, selectedArgumentIds, argumentFeedback, credibility } = state
  if (!activeCase || !currentSceneId) return null

  const scene = activeCase.scenes[currentSceneId]
  if (!scene?.isArgumentScene || !scene.argumentPieces) return null

  const pieces = scene.argumentPieces
  const selectedCount = selectedArgumentIds.size

  return (
    <div className="min-h-screen bg-court-navy flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-court-navy-mid px-4 md:px-8 py-4 flex items-center justify-between gap-4">
        <div>
          <div className="text-[9px] font-mono tracking-[0.3em] uppercase text-court-gold/60 mb-0.5">
            Chapter 3 — Closing Argument
          </div>
          <h2 className="font-serif text-lg font-bold text-court-white">
            Build Your Closing
          </h2>
          <p className="text-xs text-muted-foreground font-sans mt-0.5">
            Select only the arguments that will hold before the Hearing Officer.
          </p>
        </div>
        <CredibilityMeter value={credibility} />
      </div>

      {/* Context from Okafor */}
      <div className="max-w-2xl mx-auto w-full px-4 md:px-8 pt-6">
        <div className="rounded-sm border border-border bg-court-navy-mid p-4 mb-6">
          <p className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground mb-2">
            Hearing Officer Okafor — Awaiting Defense Closing
          </p>
          <p className="text-sm font-sans text-foreground/80 leading-relaxed italic text-pretty">
            "Counselor — the record has been heard. I will give you the opportunity to deliver your closing statement on behalf of Agent Alex M. Choose your words carefully. This hearing will reflect what you submit."
          </p>
        </div>

        <p className="text-xs font-mono text-court-gold/70 mb-4 tracking-wide">
          SELECT THE ARGUMENTS THAT BELONG IN YOUR CLOSING — WRONG SELECTIONS DRAIN CREDIBILITY
        </p>

        {/* Argument pieces */}
        <div className="flex flex-col gap-3">
          {pieces.map((piece) => {
            const isSelected = selectedArgumentIds.has(piece.id)
            return (
              <button
                key={piece.id}
                onClick={() => dispatch({ type: 'TOGGLE_ARGUMENT_PIECE', payload: piece.id })}
                className={cn(
                  'w-full flex items-start gap-3 px-4 py-4 rounded-sm border text-left transition-all duration-150',
                  isSelected
                    ? 'border-court-gold/70 bg-court-gold/8 shadow-[0_0_12px_rgba(212,160,23,0.1)]'
                    : 'border-border bg-court-navy-mid hover:border-court-gold/30 hover:bg-court-navy-light'
                )}
              >
                <div className="shrink-0 mt-0.5">
                  {isSelected
                    ? <CheckSquare size={18} className="text-court-gold" />
                    : <Square size={18} className="text-muted-foreground/50" />
                  }
                </div>
                <p className="text-sm font-sans text-foreground/90 leading-relaxed text-pretty">
                  {piece.text}
                </p>
              </button>
            )
          })}
        </div>

        {/* Feedback message */}
        {argumentFeedback && (
          <div className="mt-4 flex items-start gap-2 rounded-sm border border-court-red/40 bg-court-red/8 px-4 py-3 animate-flash-bg">
            <AlertTriangle size={14} className="text-court-red shrink-0 mt-0.5" />
            <p className="text-sm font-sans text-court-white/80 leading-relaxed text-pretty">
              {argumentFeedback}
            </p>
          </div>
        )}

        {/* Submit */}
        <div className="mt-6 pb-10 flex flex-col items-center gap-3">
          <button
            onClick={() => dispatch({ type: 'SUBMIT_ARGUMENT' })}
            disabled={selectedCount === 0}
            className={cn(
              'flex items-center gap-2 px-8 py-4 font-serif font-bold text-sm tracking-widest uppercase transition-all duration-200',
              selectedCount > 0
                ? 'bg-court-red border-2 border-court-red-bright text-court-white hover:bg-court-red-bright hover:shadow-[0_0_24px_rgba(200,16,46,0.4)] active:scale-95'
                : 'bg-court-navy-light border-2 border-border text-muted-foreground cursor-not-allowed'
            )}
          >
            <Gavel size={16} />
            Deliver Closing Argument
          </button>
          <p className="text-[11px] text-muted-foreground font-mono">
            {selectedCount} piece{selectedCount !== 1 ? 's' : ''} selected
          </p>
        </div>
      </div>
    </div>
  )
}
