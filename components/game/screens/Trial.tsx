'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { GameState, GameAction } from '@/lib/gameEngine'
import type { DialogueLine } from '@/lib/gameData'
import { TypewriterText } from '@/components/game/TypewriterText'
import { CredibilityMeter } from '@/components/game/CredibilityMeter'
import { EvidenceCard } from '@/components/game/EvidenceCard'
import { DramaticOverlay } from '@/components/game/DramaticOverlay'
import { BookOpen, ChevronRight, Timer, Clock, FileSearch, CheckCircle2, SkipForward } from 'lucide-react'

interface TrialProps {
  state: GameState
  dispatch: React.Dispatch<GameAction>
  currentDialogue: DialogueLine
  isChoicePoint: boolean
  clearShake: () => void
}

export function Trial({ state, dispatch, currentDialogue, isChoicePoint, clearShake }: TrialProps) {
  const {
    activeCase,
    pendingOverlay,
    isWrongAnswerShaking,
    wrongAnswerMessage,
    credibility,
    evidenceReviewed,
    timedObjectionActive,
    timedObjectionExpired,
    trialTimerActive,
    trialTimeLeft,
    pendingEvidencePresentation,
    evidencePresentFeedback,
    lastPresentedEvidenceId,
  } = state

  const currentScene = activeCase?.scenes[state.currentSceneId ?? ''] ?? null

  const [courtRecordOpen, setCourtRecordOpen] = useState(false)
  const [skipTyping, setSkipTyping] = useState(false)
  // Per-choice timed objection countdown
  const [timerLeft, setTimerLeft] = useState<number>(10)

  const shakeRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevDialogueId = useRef<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  // Global trial timer — ticks every second via TICK_TRIAL_TIMER dispatch
  const trialTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Reset skip typing when dialogue changes
  useEffect(() => {
    if (currentDialogue.id !== prevDialogueId.current) {
      setSkipTyping(false)
      prevDialogueId.current = currentDialogue.id
    }
  }, [currentDialogue.id])

  // Timed objection countdown (per-choice, short)
  useEffect(() => {
    if (timedObjectionActive) {
      const seconds = currentDialogue.timedSeconds ?? 10
      setTimerLeft(seconds)
      timerRef.current = setInterval(() => {
        setTimerLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!)
            return 0
          }
          return t - 1
        })
      }, 1000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [timedObjectionActive]) // eslint-disable-line

  useEffect(() => {
    if (timedObjectionActive && timerLeft === 0) {
      dispatch({ type: 'TIMED_OBJECTION_EXPIRE' })
    }
  }, [timerLeft, timedObjectionActive, dispatch])

  // 15-minute global trial timer
  useEffect(() => {
    if (trialTimerActive && trialTimeLeft > 0) {
      trialTimerRef.current = setInterval(() => {
        dispatch({ type: 'TICK_TRIAL_TIMER' })
      }, 1000)
    } else if (trialTimerActive && trialTimeLeft <= 0) {
      dispatch({ type: 'TRIAL_TIMER_EXPIRE' })
    }
    return () => {
      if (trialTimerRef.current) clearInterval(trialTimerRef.current)
    }
  }, [trialTimerActive, trialTimeLeft, dispatch])

  // Clear evidence feedback after 2s and auto-open court record for evidence presentation
  useEffect(() => {
    if (pendingEvidencePresentation) {
      setCourtRecordOpen(true)
    }
  }, [pendingEvidencePresentation])

  useEffect(() => {
    if (evidencePresentFeedback) {
      const t = setTimeout(() => dispatch({ type: 'CLEAR_EVIDENCE_FEEDBACK' }), 2500)
      return () => clearTimeout(t)
    }
  }, [evidencePresentFeedback, dispatch])

  const handleChoice = useCallback((choice: NonNullable<DialogueLine['choices']>[number]) => {
    if (timerRef.current) clearInterval(timerRef.current)
    dispatch({
      type: 'CHOOSE_ANSWER',
      payload: {
        isCorrect: choice.isCorrect,
        penalty: choice.wrongPenalty,
        feedback: choice.feedback,
        nextSceneId: choice.nextSceneId,
        credibilityGate: choice.credibilityGate,
      },
    })
  }, [dispatch])

  useEffect(() => {
    if (isWrongAnswerShaking) {
      shakeRef.current = setTimeout(() => clearShake(), 600)
    }
    return () => { if (shakeRef.current) clearTimeout(shakeRef.current) }
  }, [isWrongAnswerShaking, clearShake])

  function handleDialogueClick() {
    if (isChoicePoint || timedObjectionActive || pendingEvidencePresentation) return
    if (!state.isDialogueComplete) {
      setSkipTyping(true)
    } else {
      dispatch({ type: 'NEXT_DIALOGUE' })
    }
  }

  if (!activeCase || !currentDialogue) return null

  const recordLabel = activeCase.vocab?.recordLabel ?? 'Court Record'
  const credibilityLabel = activeCase.vocab?.credibilityLabel

  const timedSeconds = currentDialogue.timedSeconds ?? 10
  const timerPct = timedObjectionActive ? (timerLeft / timedSeconds) * 100 : 100

  // Global trial timer display
  const trialMins = Math.floor(trialTimeLeft / 60)
  const trialSecs = trialTimeLeft % 60
  const trialTimerPct = (trialTimeLeft / 900) * 100
  const trialTimerUrgent = trialTimeLeft <= 120  // last 2 minutes

  const isEvidencePresentMode = pendingEvidencePresentation && currentScene?.isEvidencePresentScene
  const relevantIds = new Set(currentScene?.relevantEvidenceIds ?? [])
  const correctIds = new Set(currentScene?.correctEvidenceIds ?? [])

  return (
    <div className="relative w-full h-screen max-h-screen flex flex-col overflow-hidden bg-court-navy">
      {pendingOverlay && (
        <DramaticOverlay
          type={pendingOverlay}
          onDismiss={() => dispatch({ type: 'CLEAR_OVERLAY' })}
        />
      )}

      {/* Courtroom scene — top 60% */}
      <div className="relative flex-[6] min-h-0 flex items-end justify-between px-6 pb-4 overflow-hidden">
        <Image
          src={activeCase.gameId === 'on-the-field' ? '/portraits/football-locker-room-bg.jpg' : '/portraits/courtroom-bg.jpg'}
          alt={activeCase.gameId === 'on-the-field' ? 'Football locker room' : 'Courtroom'}
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-court-navy/50 via-transparent to-court-navy" />

        {/* Case label — top left */}
        <div className="absolute top-3 left-4 flex flex-col gap-1 z-10">
          <div className="text-[9px] font-mono tracking-widest uppercase text-court-gold/70">{activeCase.title}</div>
          <div className="text-[9px] font-mono tracking-wider text-muted-foreground">{activeCase.roleLabel} — {activeCase.jurisdiction}</div>
        </div>

        {/* 15-minute global trial timer — top center */}
        {(trialTimerActive || trialTimeLeft < 900) && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-0.5">
            <div className={cn(
              'flex items-center gap-1.5 px-3 py-1 border text-[10px] font-mono font-bold tabular-nums tracking-wider',
              trialTimerUrgent
                ? 'border-court-red/70 bg-court-red/10 text-court-red animate-pulse'
                : 'border-court-gold/40 bg-court-navy-mid/80 text-court-gold'
            )}>
              <Clock size={10} className="shrink-0" />
              {String(trialMins).padStart(2, '0')}:{String(trialSecs).padStart(2, '0')}
            </div>
            {/* thin progress bar under timer */}
            <div className="w-24 h-0.5 bg-border rounded-full overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all duration-1000', trialTimerUrgent ? 'bg-court-red' : 'bg-court-gold')}
                style={{ width: `${trialTimerPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Credibility meter — top right */}
        <div className="absolute top-3 right-4 z-10">
          <CredibilityMeter value={credibility} isHit={isWrongAnswerShaking} label={credibilityLabel} />
        </div>

        {/* Court Record button — below timer */}
        <button
          onClick={() => setCourtRecordOpen(!courtRecordOpen)}
          className={cn(
            'absolute top-14 left-1/2 -translate-x-1/2 z-10',
            'flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase border transition-all duration-150',
            courtRecordOpen
              ? 'border-court-gold bg-court-gold/20 text-court-gold'
              : 'border-border bg-court-navy-mid/80 text-muted-foreground hover:border-court-gold/50 hover:text-court-gold/70',
            isEvidencePresentMode && !courtRecordOpen && 'border-court-gold/60 text-court-gold/70 animate-pulse'
          )}
        >
          <BookOpen size={11} />
          {recordLabel}
          {isEvidencePresentMode && <span className="ml-1 text-court-gold">↑</span>}
        </button>

        {/* Court Record panel */}
        {courtRecordOpen && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 w-full max-w-lg max-h-[50vh] overflow-y-auto bg-court-navy-mid border border-court-gold/40 rounded-sm shadow-xl p-4 flex flex-col gap-3">
            <div className="text-[10px] font-mono tracking-widest uppercase text-court-gold mb-1 pb-1 border-b border-border flex items-center justify-between">
              <span>{recordLabel} — Expediente</span>
              {isEvidencePresentMode && (
                <span className="text-court-gold/60 text-[9px]">Selecciona la evidencia a presentar</span>
              )}
            </div>
            {activeCase.evidence.map((card) => {
              const isRelevant = relevantIds.has(card.id)
              const isCorrect = correctIds.has(card.id)
              const alreadyPresented = lastPresentedEvidenceId === card.id
              return (
                <div key={card.id} className={cn(
                  'relative transition-all duration-150',
                  isEvidencePresentMode && isRelevant && 'ring-2 ring-court-gold/60 ring-offset-1 ring-offset-court-navy-mid rounded-sm'
                )}>
                  {isEvidencePresentMode && isRelevant && (
                    <div className="absolute -top-2 -right-2 z-10 flex items-center gap-1 bg-court-gold text-court-navy text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full">
                      {alreadyPresented ? <CheckCircle2 size={9} /> : <FileSearch size={9} />}
                      {alreadyPresented ? 'Presentada' : 'Relevante'}
                    </div>
                  )}
                  <EvidenceCard card={card} isReviewed={evidenceReviewed.has(card.id)} />
                  {isEvidencePresentMode && !alreadyPresented && (
                    <button
                      onClick={() => {
                        dispatch({ type: 'PRESENT_EVIDENCE', payload: card.id })
                        setCourtRecordOpen(false)
                      }}
                      className={cn(
                        'mt-2 w-full py-2 text-xs font-mono font-bold tracking-widest uppercase border transition-all duration-150',
                        isCorrect
                          ? 'border-court-gold/60 text-court-gold bg-court-gold/10 hover:bg-court-gold/20'
                          : 'border-border text-muted-foreground hover:border-court-grey hover:text-foreground'
                      )}
                    >
                      Presentar esta evidencia
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Timed objection bar */}
      {(timedObjectionActive || timedObjectionExpired) && (
        <div className="flex flex-col items-center gap-1 py-2 px-4 bg-court-navy/95 border-t-2 border-b border-court-red/60 z-10">
          <div className="flex items-center gap-2 w-full max-w-md">
            <Timer size={13} className={cn('shrink-0', timedObjectionExpired ? 'text-court-red' : 'text-court-gold animate-pulse')} />
            <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all duration-1000', timerPct > 50 ? 'bg-court-gold' : timerPct > 20 ? 'bg-orange-500' : 'bg-court-red')}
                style={{ width: `${timerPct}%` }}
              />
            </div>
            <span className={cn('text-xs font-mono font-bold tabular-nums', timedObjectionExpired ? 'text-court-red' : 'text-court-gold')}>
              {timedObjectionExpired ? 'TIME' : `${timerLeft}s`}
            </span>
          </div>
          {!timedObjectionExpired && (
            <p className="text-[10px] font-mono text-court-gold/60 tracking-widest uppercase">Responde a la objeción</p>
          )}
        </div>
      )}

      {/* Evidence present feedback banner */}
      {evidencePresentFeedback && (
        <div className={cn(
          'px-4 py-2 text-xs font-sans text-center border-t border-b z-10 transition-all',
          evidencePresentFeedback.startsWith('+')
            ? 'bg-green-900/20 border-green-600/30 text-green-300'
            : 'bg-court-red/10 border-court-red/30 text-court-white/80'
        )}>
          {evidencePresentFeedback}
        </div>
      )}

      {/* Dialogue box — bottom 40% */}
      <div
        className={cn(
          'flex-[4] min-h-0 flex flex-col border-t-2 border-court-gold/60 bg-court-navy z-10',
          isWrongAnswerShaking && 'animate-shake'
        )}
      >
        {wrongAnswerMessage && (
          <div className="px-5 pt-3 pb-0">
            <div className="text-xs font-sans text-court-white/80 bg-court-red/10 border border-court-red/30 rounded-sm px-3 py-2 leading-relaxed text-pretty">
              {wrongAnswerMessage}
            </div>
          </div>
        )}

        <div className="px-5 pt-3 pb-1">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-court-gold border border-court-gold/40 px-2 py-0.5 bg-court-gold/10">
            {currentDialogue.speaker}
          </span>
        </div>

        <div className="flex-1 px-5 pb-2 overflow-y-auto cursor-pointer select-none" onClick={handleDialogueClick}>
          <p className="text-base md:text-lg font-sans leading-relaxed text-court-white/95 text-pretty">
            <TypewriterText
              text={currentDialogue.text}
              speed={22}
              onComplete={() => dispatch({ type: 'DIALOGUE_TYPING_COMPLETE' })}
              skipToEnd={skipTyping}
            />
          </p>
        </div>

        <div className="border-t border-border px-5 py-3">
          {/* Evidence presentation mode — skip button */}
          {isEvidencePresentMode ? (
            <div className="flex flex-col gap-2">
              <div className="text-[10px] font-mono tracking-widest uppercase text-court-gold mb-1 flex items-center gap-1.5">
                <FileSearch size={10} />
                Revisa el expediente y presenta la evidencia más relevante
              </div>
              <button
                onClick={() => {
                  dispatch({ type: 'SKIP_EVIDENCE_PRESENTATION' })
                  setCourtRecordOpen(false)
                }}
                className={cn(
                  'flex items-center justify-center gap-1.5 w-full px-4 py-2.5 text-xs font-mono tracking-widest uppercase border transition-all duration-150',
                  'border-border text-muted-foreground bg-transparent',
                  'hover:border-court-grey hover:text-foreground'
                )}
              >
                <SkipForward size={11} />
                Continuar sin presentar evidencia
              </button>
            </div>
          ) : isChoicePoint && currentDialogue.choices ? (
            <div className="flex flex-col gap-2">
              <div className="text-[10px] font-mono tracking-widest uppercase text-court-gold mb-1">
                {timedObjectionActive ? 'OBJECCIÓN — responde ahora:' : 'Elige tu argumento:'}
              </div>
              {currentDialogue.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoice(choice)}
                  className={cn(
                    'w-full text-left px-4 py-3 text-sm font-sans leading-snug border rounded-sm transition-all duration-150',
                    'border-border bg-court-navy-light text-foreground/90',
                    'hover:border-court-gold/60 hover:bg-court-navy-mid hover:text-court-white',
                    'active:scale-[0.99] focus:outline-none focus:ring-1 focus:ring-court-gold/50'
                  )}
                >
                  <ChevronRight size={12} className="inline mr-1.5 text-court-gold/60 shrink-0" />
                  {choice.label}
                </button>
              ))}
            </div>
          ) : (
            state.isDialogueComplete && !timedObjectionActive && (
              <button
                onClick={() => dispatch({ type: 'NEXT_DIALOGUE' })}
                className="flex items-center gap-1.5 text-xs text-court-gold/70 font-mono tracking-wider uppercase hover:text-court-gold transition-colors ml-auto"
              >
                Continuar
                <ChevronRight size={12} />
              </button>
            )
          )}
        </div>
      </div>
    </div>
  )
}
