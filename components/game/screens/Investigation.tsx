'use client'

import { cn } from '@/lib/utils'
import type { GameState, GameAction } from '@/lib/gameEngine'
import { EvidenceCard } from '@/components/game/EvidenceCard'
import { Gavel } from 'lucide-react'

interface InvestigationProps {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

export function Investigation({ state, dispatch }: InvestigationProps) {
  const { activeCase, evidenceReviewed } = state
  if (!activeCase) return null

  const totalCards = activeCase.evidence.length
  const reviewedCount = activeCase.evidence.filter((e) => evidenceReviewed.has(e.id)).length
  const allRead = reviewedCount === totalCards

  return (
    <div className="relative w-full min-h-screen flex flex-col items-start px-4 md:px-8 py-10 gap-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="text-[10px] font-mono tracking-[0.35em] uppercase text-court-gold mb-1">
            Court Record
          </div>
          <h2 className="font-serif text-2xl font-bold text-court-white">
            Evidence Review
          </h2>
          <p className="text-muted-foreground text-xs font-sans mt-1">
            {activeCase.title} — {activeCase.subtitle}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs font-mono text-muted-foreground">
            {reviewedCount} / {totalCards} items reviewed
          </span>
          <div className="flex gap-1">
            {activeCase.evidence.map((e) => (
              <div
                key={e.id}
                className={cn(
                  'h-1.5 w-6 rounded-full transition-all duration-300',
                  evidenceReviewed.has(e.id)
                    ? 'bg-court-gold'
                    : 'bg-border'
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Instruction */}
      {!allRead && (
        <div className="w-full rounded-sm border border-court-gold/30 bg-court-gold/5 px-4 py-3 text-sm text-court-gold/80 font-sans leading-relaxed">
          Click each evidence card to read its full detail. You must review all{' '}
          <strong>{totalCards} items</strong> before you can enter the courtroom.
        </div>
      )}

      {/* Evidence grid */}
      <div className="w-full flex flex-col gap-3">
        {activeCase.evidence.map((card) => (
          <EvidenceCard
            key={card.id}
            card={card}
            isReviewed={evidenceReviewed.has(card.id)}
            onReview={(id) => dispatch({ type: 'REVIEW_EVIDENCE', payload: id })}
          />
        ))}
      </div>

      {/* Enter trial CTA */}
      <div className="w-full flex flex-col items-center gap-3 pt-4 border-t border-border">
        {allRead ? (
          <>
            <p className="text-sm text-court-gold font-serif">
              All evidence reviewed. You are ready.
            </p>
            <button
              onClick={() => dispatch({ type: 'START_TRIAL' })}
              className={cn(
                'flex items-center gap-2 px-10 py-4 font-serif font-bold text-base tracking-widest uppercase',
                'bg-court-red border-2 border-court-red-bright text-court-white',
                'hover:bg-court-red-bright hover:shadow-[0_0_24px_rgba(200,16,46,0.5)]',
                'transition-all duration-200 active:scale-95'
              )}
            >
              <Gavel size={18} />
              Enter Courtroom
            </button>
          </>
        ) : (
          <p className="text-xs text-muted-foreground font-mono text-center">
            Review all {totalCards - reviewedCount} remaining evidence item{totalCards - reviewedCount !== 1 ? 's' : ''} to proceed
          </p>
        )}
      </div>

      <button
        onClick={() => dispatch({ type: 'GO_TO_CASE_SELECT' })}
        className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono tracking-wider uppercase"
      >
        &larr; Back to Case Select
      </button>
    </div>
  )
}
