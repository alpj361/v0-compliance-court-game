'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { GameState, GameAction } from '@/lib/gameEngine'
import { EvidenceCard } from '@/components/game/EvidenceCard'
import { Gavel, FolderOpen, Play, X } from 'lucide-react'

interface InvestigationProps {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

export function Investigation({ state, dispatch }: InvestigationProps) {
  const [showVideo, setShowVideo] = useState(false)
  const { activeCase, evidenceReviewed } = state
  if (!activeCase) return null

  const totalCards = activeCase.evidence.length
  const reviewedCount = activeCase.evidence.filter((e) => evidenceReviewed.has(e.id)).length
  const allRead = reviewedCount === totalCards
  const progressPct = Math.round((reviewedCount / totalCards) * 100)

  const isOTF = activeCase.gameId === 'on-the-field'
  const recordLabel = activeCase.vocab?.recordLabel ?? 'Court Record'
  const trialLabel = activeCase.vocab?.trialLabel ?? 'Enter Courtroom'
  const accentColor = isOTF ? 'text-green-400' : 'text-court-gold'
  const accentBg = isOTF ? 'bg-green-700/15 border-green-600/30' : 'bg-court-gold/15 border-court-gold/30'
  const ctaBg = isOTF
    ? 'bg-green-600 border-2 border-green-400 text-white hover:bg-green-500 hover:shadow-[0_0_28px_rgba(34,197,94,0.5)]'
    : 'bg-court-red border-2 border-court-red-bright text-court-white hover:bg-court-red-bright hover:shadow-[0_0_28px_rgba(200,16,46,0.5)]'

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-court-navy">
      {/* Top header bar */}
      <div className="sticky top-0 z-20 bg-court-navy/95 border-b border-border backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className={cn('p-2 border rounded-sm', accentBg)}>
              <FolderOpen size={16} className={accentColor} />
            </div>
            <div>
              <div className={cn('text-[9px] font-mono tracking-[0.35em] uppercase opacity-60', accentColor)}>
                {recordLabel} — {isOTF ? 'Revisión' : 'Evidence Review'}
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
          <div className={cn('rounded-sm border px-4 py-3 text-sm font-sans leading-relaxed', isOTF ? 'border-green-600/25 bg-green-900/5 text-green-400/75' : 'border-court-gold/25 bg-court-gold/5 text-court-gold/75')}>
            {isOTF
              ? <>Abre cada informe y léelo con cuidado. Debes revisar los <strong>{totalCards} informes</strong> antes de iniciar la reunión. <span className={isOTF ? 'text-green-500/50' : 'text-court-gold/50'}> — {totalCards - reviewedCount} restantes.</span></>
              : <>Open each piece of evidence below. Read the full content carefully. You must review all <strong>{totalCards} items</strong> before you can enter the courtroom. <span className="text-court-gold/50"> — {totalCards - reviewedCount} remaining.</span></>
            }
          </div>
        )}

        {allRead && (
          <div className="rounded-sm border border-green-500/30 bg-green-900/10 px-4 py-3 text-sm text-green-400/80 font-sans leading-relaxed">
            {isOTF
              ? 'Todos los informes revisados. Conoces la situación. Ahora resuélvela.'
              : 'All evidence reviewed. You know what happened. Now prove it in court.'
            }
          </div>
        )}

        {/* Pre-trial advisor video — only shown if case has a preTrialVideo */}
        {activeCase.preTrialVideo && (
          <button
            onClick={() => setShowVideo(true)}
            className="flex items-center gap-3 w-full rounded-sm border border-blue-600/30 bg-blue-900/10 px-4 py-3 hover:bg-blue-900/20 hover:border-blue-500/50 transition-all duration-200 group text-left"
          >
            <div className="shrink-0 w-8 h-8 rounded-full bg-blue-700/30 border border-blue-600/40 flex items-center justify-center group-hover:bg-blue-700/50 transition-colors">
              <Play size={12} className="text-blue-400 ml-0.5" />
            </div>
            <div>
              <div className="text-[9px] font-mono tracking-[0.35em] uppercase text-blue-400/60 mb-0.5">
                Mensaje de tu Abogado
              </div>
              <div className="text-sm font-serif text-blue-200 leading-tight">
                Ver video de {activeCase.preTrialVideo.speakerName}
              </div>
              <div className="text-[11px] text-blue-400/50 font-mono mt-0.5">
                {activeCase.preTrialVideo.speakerTitle}
              </div>
            </div>
          </button>
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

        {/* Enter courtroom / Start meeting */}
        <div className="flex flex-col items-center gap-4 pt-6 pb-8 border-t border-border">
          {allRead ? (
            <button
              onClick={() => dispatch({ type: 'START_TRIAL' })}
              className={cn(
                'flex items-center gap-2 px-10 py-4 font-serif font-bold text-base tracking-widest uppercase',
                ctaBg,
                'transition-all duration-200 active:scale-95'
              )}
            >
              <Gavel size={18} />
              {trialLabel}
            </button>
          ) : (
            <p className="text-xs text-muted-foreground font-mono text-center">
              {totalCards - reviewedCount} {isOTF ? 'informe' : 'evidence item'}{totalCards - reviewedCount !== 1 ? 's' : ''} {isOTF ? 'restante' : 'remaining'} antes de continuar
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
      {/* Hartman / pre-trial video modal */}
      {showVideo && activeCase.preTrialVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-lg bg-court-navy border border-blue-600/40 rounded-sm shadow-2xl shadow-blue-900/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-start justify-between gap-4 border-b border-blue-600/20 px-5 py-4">
              <div>
                <div className="text-[9px] font-mono tracking-[0.35em] uppercase text-blue-400/60 mb-1">
                  Mensaje Privado — Solo para el Abogado
                </div>
                <div className="font-serif text-base font-bold text-court-white">
                  {activeCase.preTrialVideo.speakerName}
                </div>
                <div className="text-xs text-blue-400/60 font-mono mt-0.5">
                  {activeCase.preTrialVideo.speakerTitle}
                </div>
              </div>
              <button
                onClick={() => setShowVideo(false)}
                className="shrink-0 mt-0.5 p-1.5 rounded-sm border border-border text-muted-foreground hover:text-court-white hover:border-blue-500/40 transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            {/* Embedded video (Google Drive / iframe) */}
            {activeCase.preTrialVideo.videoSrc && (
              <div className="px-5 pt-4 pb-2">
                <div className="relative w-full overflow-hidden rounded-sm border border-blue-600/20" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    src={activeCase.preTrialVideo.videoSrc}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Text lines (shown when no video, or as caption below video) */}
            {activeCase.preTrialVideo.lines.length > 0 && (
              <div className="px-5 py-5 flex flex-col gap-3">
                {activeCase.preTrialVideo.lines.map((line, i) => (
                  <p key={i} className="text-sm font-sans text-court-white/85 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            )}

            <div className="border-t border-blue-600/20 px-5 py-3 flex justify-end">
              <button
                onClick={() => setShowVideo(false)}
                className="text-xs font-mono tracking-wider uppercase text-blue-400/70 hover:text-blue-300 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
