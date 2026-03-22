'use client'

import { cn } from '@/lib/utils'
import type { GameState, GameAction } from '@/lib/gameEngine'
import { EvidenceCard } from '@/components/game/EvidenceCard'
import { Gavel, FolderOpen } from 'lucide-react'

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
  const progressPct = Math.round((reviewedCount / totalCards) * 100)

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-court-navy">
      {/* Top header bar */}
      <div className="sticky top-0 z-20 bg-court-navy/95 border-b border-border backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-court-gold/15 border border-court-gold/30 rounded-sm">
              <FolderOpen size={16} className="text-court-gold" />
            </div>
            <div>
              <div className="text-[9px] font-mono tracking-[0.35em] uppercase text-court-gold/60">
                Court Record — Evidence Review
              </div>
              <h2 className="font-serif text-base font-bold text-court-white leading-tight">
                {activeCase.title}
              </h2>
            </div>
          </div>

          {/* Progress pill */}
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground">
                {reviewedCount}/{totalCards} reviewed
              </span>
              <span className={cn(
                'text-[9px] font-mono px-1.5 py-0.5 rounded-[2px] border tracking-widest uppercase',
                allRead
                  ? 'text-green-400 border-green-500/40 bg-green-900/20'
                  : 'text-court-gold/70 border-court-gold/30 bg-court-gold/5'
              )}>
                {allRead ? 'COMPLETE' : `${progressPct}%`}
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-36 h-1 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-court-gold rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-8 py-8 flex flex-col gap-6">
        {/* Role + jurisdiction context */}
        <div className="rounded-sm border border-border bg-court-navy-mid px-5 py-4 flex items-start gap-4">
          <div className="shrink-0">
            <div className="w-8 h-8 rounded-full bg-court-red/20 border border-court-red/40 flex items-center justify-center">
              <span className="text-xs font-serif font-bold text-court-red">N</span>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-mono tracking-widest text-court-gold/70 uppercase mb-1">
              Your Role: {activeCase.roleLabel} — {activeCase.jurisdiction}
            </p>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed text-pretty">
              {activeCase.briefing}
            </p>
          </div>
        </div>

        {/* Instruction */}
        {!allRead && (
          <div className="rounded-sm border border-court-gold/25 bg-court-gold/5 px-4 py-3 text-sm text-court-gold/75 font-sans leading-relaxed">
            Open each piece of evidence below. Read the full content carefully.
            You must review all <strong>{totalCards} items</strong> before you can enter the courtroom.
            <span className="text-court-gold/50"> — {totalCards - reviewedCount} remaining.</span>
          </div>
        )}

        {allRead && (
          <div className="rounded-sm border border-green-500/30 bg-green-900/10 px-4 py-3 text-sm text-green-400/80 font-sans leading-relaxed">
            All evidence reviewed. You know what happened. Now prove it in court.
          </div>
        )}

        {/* Evidence list */}
        <div className="flex flex-col gap-4">
          {activeCase.evidence.map((card) => (
            <div key={card.id} className="pt-3">
              <EvidenceCard
                card={card}
                isReviewed={evidenceReviewed.has(card.id)}
                onReview={(id) => dispatch({ type: 'REVIEW_EVIDENCE', payload: id })}
              />
            </div>
          ))}
        </div>

        {/* Enter courtroom */}
        <div className="flex flex-col items-center gap-4 pt-6 pb-8 border-t border-border">
          {allRead ? (
            <button
              onClick={() => dispatch({ type: 'START_TRIAL' })}
              className={cn(
                'flex items-center gap-2 px-10 py-4 font-serif font-bold text-base tracking-widest uppercase',
                'bg-court-red border-2 border-court-red-bright text-court-white',
                'hover:bg-court-red-bright hover:shadow-[0_0_28px_rgba(200,16,46,0.5)]',
                'transition-all duration-200 active:scale-95'
              )}
            >
              <Gavel size={18} />
              Enter Courtroom
            </button>
          ) : (
            <p className="text-xs text-muted-foreground font-mono text-center">
              {totalCards - reviewedCount} evidence item{totalCards - reviewedCount !== 1 ? 's' : ''} remaining before you can proceed
            </p>
          )}

          <button
            onClick={() => dispatch({ type: 'GO_TO_CASE_SELECT' })}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono tracking-wider uppercase"
          >
            &larr; Back to Case Select
          </button>
        </div>
      </div>
    </div>
  )
}
