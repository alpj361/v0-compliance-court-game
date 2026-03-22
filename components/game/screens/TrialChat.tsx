'use client'

/**
 * TrialChat — chat-thread mode for the trial screen.
 * Dialogue lines appear as message bubbles in a scrolling thread.
 * No character portraits required. Choices appear as inline option cards.
 */

import { useEffect, useRef, useCallback, useState } from 'react'
import { cn } from '@/lib/utils'
import type { GameState, GameAction } from '@/lib/gameEngine'
import type { DialogueLine } from '@/lib/gameData'
import { CredibilityMeter } from '@/components/game/CredibilityMeter'
import { EvidenceCard } from '@/components/game/EvidenceCard'
import { DramaticOverlay } from '@/components/game/DramaticOverlay'
import { TypewriterText } from '@/components/game/TypewriterText'
import { BookOpen, ChevronRight, Timer, AlertCircle } from 'lucide-react'

interface TrialChatProps {
  state: GameState
  dispatch: React.Dispatch<GameAction>
  currentDialogue: DialogueLine
  isChoicePoint: boolean
  clearShake: () => void
}

// Speaker → left or right alignment + colour accent
function getSpeakerStyle(side: DialogueLine['side']) {
  if (side === 'right') return { align: 'items-end', bubble: 'bg-court-navy-light border border-court-gold/30', name: 'text-court-gold' }
  if (side === 'center') return { align: 'items-center', bubble: 'bg-court-navy-mid border border-border', name: 'text-court-grey' }
  return { align: 'items-start', bubble: 'bg-court-navy-mid border border-border', name: 'text-court-grey' }
}

interface ChatMessage {
  dialogueId: string
  speaker: string
  side: DialogueLine['side']
  text: string
  isLast: boolean
}

export function TrialChat({ state, dispatch, currentDialogue, isChoicePoint, clearShake }: TrialChatProps) {
  const {
    activeCase, pendingOverlay, isWrongAnswerShaking, wrongAnswerMessage,
    credibility, evidenceReviewed, timedObjectionActive, timedObjectionExpired,
  } = state

  const [courtRecordOpen, setCourtRecordOpen] = useState(false)
  const [skipTyping, setSkipTyping] = useState(false)
  const [timerLeft, setTimerLeft] = useState<number>(10)
  const [history, setHistory] = useState<ChatMessage[]>([])
  const [currentTypingId, setCurrentTypingId] = useState<string | null>(null)

  const bottomRef = useRef<HTMLDivElement>(null)
  const shakeRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const prevDialogueId = useRef<string | null>(null)

  // When dialogue changes, push the previous one to history and start typing the new one
  useEffect(() => {
    if (currentDialogue.id === prevDialogueId.current) return
    prevDialogueId.current = currentDialogue.id
    setCurrentTypingId(currentDialogue.id)
    setSkipTyping(false)
  }, [currentDialogue.id])

  // Timed objection countdown
  useEffect(() => {
    if (timedObjectionActive) {
      const seconds = currentDialogue.timedSeconds ?? 10
      setTimerLeft(seconds)
      timerRef.current = setInterval(() => {
        setTimerLeft((t) => {
          if (t <= 1) { clearInterval(timerRef.current!); return 0 }
          return t - 1
        })
      }, 1000)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [timedObjectionActive]) // eslint-disable-line

  useEffect(() => {
    if (timedObjectionActive && timerLeft === 0) {
      dispatch({ type: 'TIMED_OBJECTION_EXPIRE' })
    }
  }, [timerLeft, timedObjectionActive, dispatch])

  useEffect(() => {
    if (isWrongAnswerShaking) {
      shakeRef.current = setTimeout(() => clearShake(), 600)
    }
    return () => { if (shakeRef.current) clearTimeout(shakeRef.current) }
  }, [isWrongAnswerShaking, clearShake])

  // Auto-scroll to bottom whenever history or current dialogue changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history, currentDialogue.id, isChoicePoint])

  const handleChoice = useCallback((choice: NonNullable<DialogueLine['choices']>[number]) => {
    if (timerRef.current) clearInterval(timerRef.current)
    // Add the player's choice as a right-side message in the history
    setHistory((prev) => [
      ...prev,
      {
        dialogueId: `choice-${choice.id}`,
        speaker: state.playerName,
        side: 'right' as const,
        text: choice.label,
        isLast: false,
      },
    ])
    dispatch({
      type: 'CHOOSE_ANSWER',
      payload: {
        isCorrect: choice.isCorrect,
        penalty: choice.wrongPenalty,
        feedback: choice.feedback,
        nextSceneId: choice.nextSceneId,
      },
    })
  }, [dispatch, state.playerName])

  function handleTypingComplete() {
    dispatch({ type: 'DIALOGUE_TYPING_COMPLETE' })
  }

  function handleAdvance() {
    if (isChoicePoint || timedObjectionActive) return
    if (!state.isDialogueComplete) {
      setSkipTyping(true)
      return
    }
    // Push current to history before advancing
    setHistory((prev) => [
      ...prev,
      {
        dialogueId: currentDialogue.id,
        speaker: currentDialogue.speaker,
        side: currentDialogue.side,
        text: currentDialogue.text,
        isLast: false,
      },
    ])
    dispatch({ type: 'NEXT_DIALOGUE' })
  }

  if (!activeCase) return null

  const timedSeconds = currentDialogue.timedSeconds ?? 10
  const timerPct = timedObjectionActive ? (timerLeft / timedSeconds) * 100 : 100
  const style = getSpeakerStyle(currentDialogue.side)

  return (
    <div className={cn('relative w-full h-screen max-h-screen flex flex-col overflow-hidden bg-court-navy', isWrongAnswerShaking && 'animate-shake')}>
      {pendingOverlay && (
        <DramaticOverlay type={pendingOverlay} onDismiss={() => dispatch({ type: 'CLEAR_OVERLAY' })} />
      )}

      {/* Top HUD */}
      <div className="shrink-0 flex items-center justify-between gap-3 px-4 py-2 border-b border-border bg-court-navy-mid z-10">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-mono tracking-widest uppercase text-court-gold/80">{activeCase.title}</span>
          <span className="text-[10px] font-mono text-muted-foreground">{activeCase.roleLabel} — {activeCase.jurisdiction}</span>
        </div>
        <CredibilityMeter value={credibility} isHit={isWrongAnswerShaking} />
        <button
          onClick={() => setCourtRecordOpen(!courtRecordOpen)}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase border transition-all duration-150 shrink-0',
            courtRecordOpen
              ? 'border-court-gold bg-court-gold/20 text-court-gold'
              : 'border-border bg-court-navy/80 text-muted-foreground hover:border-court-gold/50 hover:text-court-gold/70'
          )}
        >
          <BookOpen size={11} />
          Record
        </button>
      </div>

      {/* Court Record drawer */}
      {courtRecordOpen && (
        <div className="shrink-0 max-h-[45vh] overflow-y-auto bg-court-navy-mid border-b border-court-gold/40 shadow-xl px-4 py-3 flex flex-col gap-3 z-10">
          <div className="text-[10px] font-mono tracking-widest uppercase text-court-gold pb-1 border-b border-border">
            Court Record — Evidence
          </div>
          {activeCase.evidence.map((card) => (
            <EvidenceCard key={card.id} card={card} isReviewed={evidenceReviewed.has(card.id)} />
          ))}
        </div>
      )}

      {/* Timed objection bar */}
      {(timedObjectionActive || timedObjectionExpired) && (
        <div className="shrink-0 flex flex-col items-center gap-1 py-2 px-4 bg-court-navy/95 border-b-2 border-court-red/60 z-10">
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
            <p className="text-[10px] font-mono text-court-gold/60 tracking-widest uppercase">Respond to the objection</p>
          )}
        </div>
      )}

      {/* Chat thread */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 flex flex-col gap-3" onClick={handleAdvance}>
        {/* History messages */}
        {history.map((msg) => {
          const s = getSpeakerStyle(msg.side)
          return (
            <div key={msg.dialogueId} className={cn('flex flex-col gap-1 animate-flash-bg', s.align)}>
              <span className={cn('text-[10px] font-mono tracking-[0.2em] uppercase px-1', s.name)}>{msg.speaker}</span>
              <div className={cn('max-w-[80%] px-4 py-3 rounded-sm text-sm font-sans leading-relaxed text-court-white/80', s.bubble)}>
                {msg.text}
              </div>
            </div>
          )
        })}

        {/* Wrong answer feedback inline */}
        {wrongAnswerMessage && (
          <div className="flex flex-col gap-1 items-start">
            <div className="flex items-center gap-1.5 px-2 py-1.5 bg-court-red/10 border border-court-red/30 rounded-sm max-w-[90%]">
              <AlertCircle size={13} className="shrink-0 text-court-red" />
              <p className="text-xs font-sans text-court-white/80 leading-relaxed">{wrongAnswerMessage}</p>
            </div>
          </div>
        )}

        {/* Current live message */}
        {currentTypingId === currentDialogue.id && (
          <div className={cn('flex flex-col gap-1', style.align)}>
            <span className={cn('text-[10px] font-mono tracking-[0.2em] uppercase px-1', style.name)}>{currentDialogue.speaker}</span>
            <div
              className={cn(
                'max-w-[80%] px-4 py-3 rounded-sm text-sm font-sans leading-relaxed text-court-white',
                style.bubble,
                currentDialogue.side === 'right' ? 'border-court-gold/50' : ''
              )}
            >
              <TypewriterText
                text={currentDialogue.text}
                speed={22}
                onComplete={handleTypingComplete}
                skipToEnd={skipTyping}
              />
            </div>
          </div>
        )}

        {/* Choices */}
        {isChoicePoint && currentDialogue.choices && (
          <div className="flex flex-col gap-2 mt-2 items-end">
            <div className="text-[10px] font-mono tracking-widest uppercase text-court-gold/70 mr-1">
              {timedObjectionActive ? 'OBJECTION — respond now:' : 'Choose your argument:'}
            </div>
            {currentDialogue.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={(e) => { e.stopPropagation(); handleChoice(choice) }}
                className={cn(
                  'w-full max-w-[85%] text-left px-4 py-3 text-sm font-sans leading-snug border rounded-sm transition-all duration-150',
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
        )}

        {/* Continue prompt */}
        {state.isDialogueComplete && !isChoicePoint && !timedObjectionActive && (
          <div className="flex justify-center mt-1">
            <button
              onClick={(e) => { e.stopPropagation(); handleAdvance() }}
              className="flex items-center gap-1.5 text-xs text-court-gold/60 font-mono tracking-wider uppercase hover:text-court-gold transition-colors px-3 py-1.5 border border-border rounded-sm hover:border-court-gold/40"
            >
              Continue
              <ChevronRight size={12} />
            </button>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  )
}
