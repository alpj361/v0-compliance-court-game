'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { GameState, GameAction } from '@/lib/gameEngine'
import type { DialogueLine } from '@/lib/gameData'
import { CharacterPortrait } from '@/components/game/CharacterPortrait'
import { TypewriterText } from '@/components/game/TypewriterText'
import { CredibilityMeter } from '@/components/game/CredibilityMeter'
import { EvidenceCard } from '@/components/game/EvidenceCard'
import { DramaticOverlay } from '@/components/game/DramaticOverlay'
import { BookOpen, ChevronRight, Timer } from 'lucide-react'

interface TrialProps {
  state: GameState
  dispatch: React.Dispatch<GameAction>
  currentDialogue: DialogueLine
  isChoicePoint: boolean
  clearShake: () => void
}

type ChoiceItem = NonNullable<DialogueLine['choices']>[number]

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
  } = state

  const [courtRecordOpen, setCourtRecordOpen] = useState(false)
  const [skipTyping, setSkipTyping] = useState(false)
  const [timerLeft, setTimerLeft] = useState<number>(10)

  const shakeRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevDialogueId = useRef<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Reset skip state when dialogue line changes
  useEffect(() => {
    if (currentDialogue.id !== prevDialogueId.current) {
      setSkipTyping(false)
      prevDialogueId.current = currentDialogue.id
    }
  }, [currentDialogue.id])

  // Timed objection countdown
  useEffect(() => {
    if (timedObjectionActive) {
      const seconds = currentDialogue.timedSeconds ?? 10
      setTimerLeft(seconds)
      timerRef.current = setInterval(() => {
        setTimerLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!)
            dispatch({ type: 'TIMED_OBJECTION_EXPIRE' })
            return 0
          }
          return t - 1
        })
      }, 1000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [timedObjectionActive]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChoice = useCallback(
    (choice: ChoiceItem) => {
      if (timerRef.current) clearInterval(timerRef.current)
      dispatch({
        type: 'CHOOSE_ANSWER',
        payload: {
          isCorrect: choice.isCorrect,
          penalty: choice.wrongPenalty,
          feedback: choice.feedback,
          nextSceneId: choice.nextSceneId,
        },
      })
    },
    [dispatch],
  )

  useEffect(() => {
    if (isWrongAnswerShaking) {
      shakeRef.current = setTimeout(() => clearShake(), 600)
    }
    return () => {
      if (shakeRef.current) clearTimeout(shakeRef.current)
    }
  }, [isWrongAnswerShaking, clearShake])

  function handleDialogueClick() {
    if (isChoicePoint || timedObjectionActive) return
    if (!state.isDialogueComplete) {
      setSkipTyping(true)
    } else {
      dispatch({ type: 'NEXT_DIALOGUE' })
    }
  }

  if (!activeCase || !currentDialogue) return null

  const isLeftActive = currentDialogue.side !== 'right'
  const isRightActive = currentDialogue.side !== 'left'
  const timedSeconds = currentDialogue.timedSeconds ?? 10
  const timerPct = timedObjectionActive ? (timerLeft / timedSeconds) * 100 : 100

  return (
    <div className="relative w-full h-screen max-h-screen flex flex-col overflow-hidden bg-court-navy">
      {/* Dramatic overlay */}
      {pendingOverlay && (
        <DramaticOverlay
          type={pendingOverlay}
          onDismiss={() => dispatch({ type: 'CLEAR_OVERLAY' })}
        />
      )}

      {/* ── TOP: Courtroom scene ─────────────────────────────────────── */}
      <div className="relative flex-[6] min-h-0 flex items-end justify-between px-6 pb-4 overflow-hidden">
        <Image
          src="/portraits/courtroom-bg.jpg"
          alt="Courtroom background"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-court-navy/50 via-transparent to-court-navy" />

        {/* Case HUD — top left */}
        <div className="absolute top-3 left-4 flex flex-col gap-1 z-10">
          <div className="text-[9px] font-mono tracking-widest uppercase text-court-gold/70">
            {activeCase.title}
          </div>
          <div className="text-[9px] font-mono tracking-wider text-muted-foreground">
            {activeCase.roleLabel} — {activeCase.jurisdiction}
          </div>
        </div>

        {/* Credibility meter — top right */}
        <div className="absolute top-3 right-4 z-10">
          <CredibilityMeter value={credibility} isHit={isWrongAnswerShaking} />
        </div>

        {/* Court Record toggle — top center */}
        <button
          onClick={() => setCourtRecordOpen((o) => !o)}
          className={cn(
            'absolute top-3 left-1/2 -translate-x-1/2 z-10',
            'flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase',
            'border transition-all duration-150',
            courtRecordOpen
              ? 'border-court-gold bg-court-gold/20 text-court-gold'
              : 'border-border bg-court-navy-mid/80 text-muted-foreground hover:border-court-gold/50 hover:text-court-gold/70',
          )}
        >
          <BookOpen size={11} />
          Court Record
        </button>

        {/* Left character slot */}
        <div className="z-10">
          {currentDialogue.side === 'left' || currentDialogue.side === 'center' ? (
            <CharacterPortrait
              portrait={currentDialogue.portrait}
              side="left"
              speaker={currentDialogue.speaker}
              isActive={isLeftActive}
            />
          ) : (
            <div style={{ width: 220, height: 320 }} className="opacity-20">
              <div className="w-full h-full border border-border/30 rounded-sm bg-court-navy-mid/30" />
            </div>
          )}
        </div>

        {/* Right character slot */}
        <div className="z-10">
          {currentDialogue.side === 'right' ? (
            <CharacterPortrait
              portrait={currentDialogue.portrait}
              side="right"
              speaker={currentDialogue.speaker}
              isActive={isRightActive}
            />
          ) : (
            <div style={{ width: 220, height: 320 }} className="opacity-10">
              <div className="w-full h-full border border-border/20 rounded-sm bg-court-navy-mid/20" />
            </div>
          )}
        </div>

        {/* Court Record panel */}
        {courtRecordOpen && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 w-full max-w-lg max-h-[55vh] overflow-y-auto bg-court-navy-mid border border-court-gold/40 rounded-sm shadow-xl p-4 flex flex-col gap-3">
            <div className="text-[10px] font-mono tracking-widest uppercase text-court-gold mb-1 pb-1 border-b border-border">
              Court Record — Evidence
            </div>
            {activeCase.evidence.map((card) => (
              <EvidenceCard key={card.id} card={card} isReviewed={evidenceReviewed.has(card.id)} />
            ))}
          </div>
        )}
      </div>

      {/* ── Timed objection bar ──────────────────────────────────────── */}
      {(timedObjectionActive || timedObjectionExpired) && (
        <div
          className={cn(
            'absolute left-0 right-0 z-30 flex flex-col items-center gap-1 py-2 px-4',
            'bg-court-navy/95 border-t-2 border-b border-court-red/60 backdrop-blur-sm',
            'top-[60vh]',
          )}
        >
          <div className="flex items-center gap-2 w-full max-w-md">
            <Timer
              size={13}
              className={cn(
                'shrink-0',
                timedObjectionExpired ? 'text-court-red' : 'text-court-gold animate-pulse',
              )}
            />
            <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-1000',
                  timerPct > 50
                    ? 'bg-court-gold'
                    : timerPct > 20
                      ? 'bg-orange-500'
                      : 'bg-court-red',
                )}
                style={{ width: `${timerPct}%` }}
              />
            </div>
            <span
              className={cn(
                'text-xs font-mono font-bold tabular-nums',
                timedObjectionExpired ? 'text-court-red' : 'text-court-gold',
              )}
            >
              {timedObjectionExpired ? 'TIME' : `${timerLeft}s`}
            </span>
          </div>
          {!timedObjectionExpired && (
            <p className="text-[10px] font-mono text-court-gold/60 tracking-widest uppercase">
              Respond to the objection — time is running
            </p>
          )}
        </div>
      )}

      {/* ── BOTTOM: Dialogue box ────────────────────────────────────── */}
      <div
        className={cn(
          'flex-[4] min-h-0 flex flex-col border-t-2 border-court-gold/60 bg-court-navy z-10',
          isWrongAnswerShaking && 'animate-shake',
        )}
      >
        {/* Wrong answer feedback banner */}
        {wrongAnswerMessage && (
          <div className="px-5 pt-3 pb-0">
            <div className="text-xs font-sans text-court-white/80 bg-court-red/10 border border-court-red/30 rounded-sm px-3 py-2 leading-relaxed text-pretty">
              {wrongAnswerMessage}
            </div>
          </div>
        )}

        {/* Speaker name tag */}
        <div className="px-5 pt-3 pb-1">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-court-gold border border-court-gold/40 px-2 py-0.5 bg-court-gold/10">
            {currentDialogue.speaker}
          </span>
        </div>

        {/* Dialogue text — click to skip or advance */}
        <div
          className="flex-1 px-5 pb-2 overflow-y-auto cursor-pointer select-none"
          onClick={handleDialogueClick}
        >
          <p className="text-base md:text-lg font-sans leading-relaxed text-court-white/95 text-pretty">
            <TypewriterText
              text={currentDialogue.text}
              speed={22}
              onComplete={() => dispatch({ type: 'DIALOGUE_TYPING_COMPLETE' })}
              skipToEnd={skipTyping}
            />
          </p>
        </div>

        {/* Action row */}
        <div className="border-t border-border px-5 py-3">
          {isChoicePoint && currentDialogue.choices ? (
            <div className="flex flex-col gap-2">
              {(timedObjectionActive || timedObjectionExpired) ? (
                <div className="text-[10px] font-mono tracking-widest uppercase text-court-red mb-1 flex items-center gap-1.5">
                  <Timer size={10} />
                  Timed objection — respond now
                </div>
              ) : (
                <div className="text-[10px] font-mono tracking-widest uppercase text-court-gold mb-1">
                  Choose your argument:
                </div>
              )}
              {currentDialogue.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoice(choice)}
                  className={cn(
                    'w-full text-left px-4 py-3 text-sm font-sans leading-snug',
                    'border rounded-sm transition-all duration-150',
                    'border-border bg-court-navy-light text-foreground/90',
                    'hover:border-court-gold/60 hover:bg-court-navy-mid hover:text-court-white',
                    'active:scale-[0.99] focus:outline-none focus:ring-1 focus:ring-court-gold/50',
                  )}
                >
                  <ChevronRight size={12} className="inline mr-1.5 text-court-gold/60 shrink-0" />
                  {choice.label}
                </button>
              ))}
            </div>
          ) : (
            state.isDialogueComplete &&
            !timedObjectionActive && (
              <button
                onClick={() => dispatch({ type: 'NEXT_DIALOGUE' })}
                className="flex items-center gap-1.5 text-xs text-court-gold/70 font-mono tracking-wider uppercase hover:text-court-gold transition-colors ml-auto"
              >
                Continue
                <ChevronRight size={12} />
              </button>
            )
          )}
        </div>
      </div>
    </div>
  )
}
