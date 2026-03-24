'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import type { GameState, GameAction } from '@/lib/gameEngine'
import type { DialogueLine, EvidenceCard, HearingMessage } from '@/lib/gameData'
import {
  Inbox, Archive, Star, Users, Mail, ChevronLeft, Send, Paperclip,
  MessageSquare, Shield, AlertTriangle, CheckCircle2, Clock,
  X, MoreVertical, RefreshCw, Search,
} from 'lucide-react'
import { EmailRenderer } from '@/components/game/evidence/EmailEvidenceRenderer'
import { EmployeeProfileRenderer } from '@/components/game/evidence/EmployeeProfileRenderer'
import { EmailThreadRenderer } from '@/components/game/evidence/EmailThreadRenderer'

// ── Types ────────────────────────────────────────────────────────────────────

interface EmailClientScreenProps {
  state: GameState
  dispatch: React.Dispatch<GameAction>
  currentDialogue: DialogueLine | null
  isChoicePoint: boolean
}

type MobilePanel = 'sidebar' | 'list' | 'content' | 'hearing'

// ── Folder config ─────────────────────────────────────────────────────────────

const FOLDERS = [
  { id: 'inbox',    label: 'Bandeja de Entrada', icon: Inbox },
  { id: 'archive',  label: 'Archivo',             icon: Archive },
  { id: 'evidence', label: 'Evidencia Recopilada', icon: Star },
  { id: 'profiles', label: 'Perfiles Empleados',   icon: Users },
] as const

type FolderKey = typeof FOLDERS[number]['id']

// ── Credibility bar ───────────────────────────────────────────────────────────

function SolidezBar({ value }: { value: number }) {
  const color = value >= 75 ? 'bg-green-500' : value >= 50 ? 'bg-amber-400' : 'bg-court-red'
  const textColor = value >= 75 ? 'text-green-400' : value >= 50 ? 'text-amber-400' : 'text-court-red-bright'
  return (
    <div className="flex flex-col gap-1 px-3 py-2 border-t border-border">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-mono tracking-widest uppercase text-court-grey">
          Solidez del Caso
        </span>
        <span className={cn('text-[11px] font-bold font-mono', textColor)}>{value}</span>
      </div>
      <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-500', color)}
          style={{ width: `${value}%` }}
        />
      </div>
      <div className="text-[9px] text-court-grey/60 font-mono">
        {value >= 75 ? 'Suficiente para investigar' : value >= 50 ? 'Casi suficiente' : 'Evidencia insuficiente'}
      </div>
    </div>
  )
}

// ── Evidence item list row ────────────────────────────────────────────────────

function EmailListItem({
  card,
  isOpen,
  isCollected,
  isRead,
  onClick,
}: {
  card: EvidenceCard
  isOpen: boolean
  isCollected: boolean
  isRead: boolean
  onClick: () => void
}) {
  const isProfile = card.displayType === 'employee-profile'
  const sender = isProfile
    ? card.employeeProfileMeta?.name ?? card.title
    : card.emailMeta?.from?.split('<')[0].trim()
      ?? card.emailThreadMeta?.participants[0]
      ?? card.title

  const preview = isProfile
    ? `${card.employeeProfileMeta?.role} — ${card.employeeProfileMeta?.department}`
    : card.emailMeta?.body.split('\n').find(l => l.trim())?.slice(0, 80)
      ?? card.emailThreadMeta?.emails[0]?.body.split('\n')[0].slice(0, 80)
      ?? card.description

  const date = card.emailMeta?.date?.split(',')[1]?.trim()
    ?? card.emailThreadMeta?.emails[0]?.date?.split(',')[1]?.trim()
    ?? ''

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-start gap-2.5 px-3 py-2.5 text-left transition-colors border-b border-border/50',
        isOpen
          ? 'bg-blue-900/20 border-l-2 border-l-blue-500'
          : 'hover:bg-court-navy-light border-l-2 border-l-transparent',
        !isRead && 'bg-court-navy-mid/50',
      )}
    >
      {/* Unread dot */}
      <div className="shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full">
        {!isRead && <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-1 mb-0.5">
          <span className={cn(
            'text-xs truncate',
            !isRead ? 'text-court-white font-bold' : 'text-court-white/70 font-medium'
          )}>
            {sender}
          </span>
          <span className="text-[9px] text-court-grey shrink-0">{date}</span>
        </div>
        <div className="text-[10px] text-court-grey truncate leading-relaxed">
          {preview}
        </div>
      </div>

      {/* Evidence indicator */}
      {isCollected && (
        <Star size={10} className="shrink-0 text-court-gold mt-1 fill-court-gold" />
      )}
    </button>
  )
}

// ── Evidence content viewer ───────────────────────────────────────────────────

function EvidenceViewer({
  card,
  isCollected,
  onMark,
  onUnmark,
}: {
  card: EvidenceCard
  isCollected: boolean
  onMark: () => void
  onUnmark: () => void
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Subject/title bar */}
      <div className="px-4 py-3 border-b border-border bg-court-navy-mid flex items-start justify-between gap-3">
        <div>
          <div className="text-[9px] font-mono tracking-[0.3em] uppercase text-court-grey mb-1">
            {card.displayType === 'employee-profile' ? 'Perfil de Empleado' : 'Correo Electrónico'}
          </div>
          <h3 className="text-sm font-serif font-semibold text-court-white leading-tight">
            {card.title}
          </h3>
          <p className="text-[10px] text-court-grey mt-0.5">{card.description}</p>
        </div>
        <button
          onClick={isCollected ? onUnmark : onMark}
          className={cn(
            'shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm text-[10px] font-mono border transition-all',
            isCollected
              ? 'border-court-gold/50 bg-court-gold/10 text-court-gold hover:bg-court-gold/20'
              : 'border-border text-court-grey hover:border-court-gold/40 hover:text-court-gold'
          )}
        >
          <Star size={11} className={isCollected ? 'fill-court-gold' : ''} />
          {isCollected ? 'Evidencia' : 'Marcar'}
        </button>
      </div>

      {/* Renderer */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {card.displayType === 'email' && card.emailMeta && (
          <EmailRenderer meta={card.emailMeta} />
        )}
        {card.displayType === 'email-thread' && card.emailThreadMeta && (
          <EmailThreadRenderer meta={card.emailThreadMeta} />
        )}
        {card.displayType === 'employee-profile' && card.employeeProfileMeta && (
          <EmployeeProfileRenderer meta={card.employeeProfileMeta} />
        )}
        {/* Fallback for other display types */}
        {!['email', 'email-thread', 'employee-profile'].includes(card.displayType) && (
          <div className="rounded-sm border border-border bg-court-navy-mid p-4 font-mono text-xs text-court-grey">
            <div className="text-[9px] tracking-widest uppercase text-court-grey/50 mb-2">Documento</div>
            <pre className="whitespace-pre-wrap leading-relaxed text-court-white/80">{card.detail}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Hearing chat ──────────────────────────────────────────────────────────────

function HearingChat({
  log,
  currentDialogue,
  isChoicePoint,
  collectedEvidenceIds,
  pendingAttachments,
  allEvidence,
  dispatch,
  isShaking,
  wrongMsg,
}: {
  log: HearingMessage[]
  currentDialogue: DialogueLine | null
  isChoicePoint: boolean
  collectedEvidenceIds: Set<string>
  pendingAttachments: Set<string>
  allEvidence: EvidenceCard[]
  dispatch: React.Dispatch<GameAction>
  isShaking: boolean
  wrongMsg: string | null
}) {
  const chatEndRef = useRef<HTMLDivElement>(null)
  const [showAttachPanel, setShowAttachPanel] = useState(false)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [log, currentDialogue])

  const collectedItems = allEvidence.filter(e => collectedEvidenceIds.has(e.id))

  function buildPlayerMessage(choice: { label: string }) : HearingMessage {
    const ts = new Date()
    const h = ts.getHours().toString().padStart(2, '0')
    const m = ts.getMinutes().toString().padStart(2, '0')
    return {
      id: `player-${Date.now()}`,
      sender: 'Tú',
      senderRole: 'player',
      text: choice.label,
      timestamp: `${h}:${m}`,
      attachments: pendingAttachments.size > 0 ? [...pendingAttachments] : undefined,
    }
  }

  function handleAdvance() {
    if (!currentDialogue) return
    const ts = new Date()
    const h = ts.getHours().toString().padStart(2, '0')
    const mn = ts.getMinutes().toString().padStart(2, '0')
    const msg: HearingMessage = {
      id: `committee-${currentDialogue.id}`,
      sender: currentDialogue.speaker,
      senderRole: 'committee',
      text: currentDialogue.text,
      timestamp: `${h}:${mn}`,
    }
    dispatch({ type: 'ADVANCE_HEARING_DIALOGUE', payload: msg })
  }

  function handleChoice(choice: NonNullable<DialogueLine['choices']>[number]) {
    const playerMsg = buildPlayerMessage(choice)
    dispatch({
      type: 'SEND_HEARING_RESPONSE',
      payload: {
        message: playerMsg,
        isCorrect: choice.isCorrect,
        penalty: choice.wrongPenalty,
        nextSceneId: choice.nextSceneId,
      },
    })
    setShowAttachPanel(false)
  }

  const committeeAvatar = (sender: string) => {
    if (sender.includes('Paz') || sender.includes('Herrera')) return '⚖️'
    if (sender.includes('Rojo') || sender.includes('Fernando')) return '📋'
    if (sender.includes('Mendoza') || sender.includes('Clara')) return '💻'
    return '🏛️'
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="px-4 py-2.5 border-b border-border bg-court-navy-mid flex items-center gap-2.5">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <div>
          <div className="text-xs font-semibold text-court-white">Comité de Ética — Audiencia #0312</div>
          <div className="text-[10px] text-court-grey font-mono">
            Dra. Paz Herrera · Lic. Fernando Rojo · Ing. Clara Mendoza
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {/* Past messages */}
        {log.map(msg => (
          <HearingMessageBubble
            key={msg.id}
            msg={msg}
            allEvidence={allEvidence}
            committeeAvatar={committeeAvatar}
          />
        ))}

        {/* Current committee dialogue (not yet confirmed) */}
        {currentDialogue && !isChoicePoint && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-amber-900/30 border border-amber-700/40 flex items-center justify-center text-sm shrink-0">
              {committeeAvatar(currentDialogue.speaker)}
            </div>
            <div className="max-w-[75%]">
              <div className="text-[10px] font-mono text-court-grey mb-1">{currentDialogue.speaker}</div>
              <div className="bg-court-navy-mid border border-border rounded-sm rounded-tl-none px-3 py-2 text-xs text-court-white/90 leading-relaxed">
                {currentDialogue.text}
                <span className="inline-block w-1.5 h-3 bg-court-grey/50 ml-1 animate-cursor" />
              </div>
              <button
                onClick={handleAdvance}
                className="mt-1.5 text-[9px] font-mono text-court-grey hover:text-court-white transition-colors uppercase tracking-wider"
              >
                Continuar →
              </button>
            </div>
          </div>
        )}

        {/* Choice point — response options */}
        {isChoicePoint && currentDialogue?.choices && (
          <div className={cn(
            'border border-blue-600/30 rounded-sm bg-blue-900/10 p-3 flex flex-col gap-2',
            isShaking && 'animate-shake',
          )}>
            {wrongMsg && (
              <div className="flex items-start gap-1.5 text-[10px] text-red-400 bg-red-900/10 border border-red-500/20 rounded-sm px-2.5 py-2 mb-1">
                <AlertTriangle size={11} className="shrink-0 mt-0.5" />
                <span>{wrongMsg}</span>
              </div>
            )}
            <div className="text-[9px] font-mono tracking-widest uppercase text-blue-400/70 mb-1">
              Tu respuesta:
            </div>
            {currentDialogue.choices.map(choice => (
              <button
                key={choice.id}
                onClick={() => handleChoice(choice)}
                className="flex items-start gap-2 text-left px-3 py-2.5 rounded-sm border border-border hover:border-blue-500/50 hover:bg-blue-900/10 transition-all text-xs text-court-white/80 hover:text-court-white"
              >
                <span className="shrink-0 w-4 h-4 rounded-full border border-court-grey/40 flex items-center justify-center text-[9px] text-court-grey mt-0.5">›</span>
                <span className="leading-relaxed">{choice.label}</span>
              </button>
            ))}

            {/* Evidence attachment section */}
            <div className="border-t border-blue-600/20 pt-2 mt-1">
              <button
                onClick={() => setShowAttachPanel(!showAttachPanel)}
                className={cn(
                  'flex items-center gap-1.5 text-[10px] font-mono transition-colors',
                  pendingAttachments.size > 0
                    ? 'text-court-gold'
                    : 'text-court-grey hover:text-blue-300'
                )}
              >
                <Paperclip size={11} />
                <span>
                  {pendingAttachments.size > 0
                    ? `${pendingAttachments.size} adjunto${pendingAttachments.size > 1 ? 's' : ''} seleccionado${pendingAttachments.size > 1 ? 's' : ''}`
                    : 'Adjuntar evidencia (opcional)'
                  }
                </span>
              </button>

              {showAttachPanel && (
                <div className="mt-2 border border-border rounded-sm bg-court-navy divide-y divide-border">
                  {collectedItems.length === 0 ? (
                    <div className="px-3 py-2.5 text-[10px] text-court-grey italic">
                      No hay evidencia recopilada todavía.
                    </div>
                  ) : (
                    collectedItems.map(item => {
                      const isAttached = pendingAttachments.has(item.id)
                      return (
                        <button
                          key={item.id}
                          onClick={() => dispatch({ type: 'TOGGLE_HEARING_ATTACHMENT', payload: item.id })}
                          className={cn(
                            'w-full flex items-center gap-2 px-3 py-2 text-left transition-colors text-[10px]',
                            isAttached
                              ? 'bg-court-gold/10 text-court-gold'
                              : 'text-court-grey hover:text-court-white hover:bg-court-navy-light'
                          )}
                        >
                          <div className={cn(
                            'w-4 h-4 rounded-sm border flex items-center justify-center shrink-0',
                            isAttached
                              ? 'border-court-gold bg-court-gold/20'
                              : 'border-border'
                          )}>
                            {isAttached && <CheckCircle2 size={10} className="text-court-gold" />}
                          </div>
                          <Star size={9} className={isAttached ? 'text-court-gold fill-court-gold' : 'text-court-grey'} />
                          <span className="truncate">{item.title}</span>
                        </button>
                      )
                    })
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>
    </div>
  )
}

// ── Single chat message bubble ────────────────────────────────────────────────

function HearingMessageBubble({
  msg,
  allEvidence,
  committeeAvatar,
}: {
  msg: HearingMessage
  allEvidence: EvidenceCard[]
  committeeAvatar: (s: string) => string
}) {
  const isPlayer = msg.senderRole === 'player'
  const isSystem = msg.senderRole === 'system'

  if (isSystem) {
    return (
      <div className="flex justify-center">
        <div className="text-[9px] font-mono text-court-grey/60 px-3 py-1 border border-border rounded-full bg-court-navy-mid">
          {msg.text}
        </div>
      </div>
    )
  }

  if (isPlayer) {
    return (
      <div className="flex items-end justify-end gap-2">
        <div className="max-w-[75%] flex flex-col items-end gap-1">
          <div className="text-[10px] font-mono text-court-grey">Tú · {msg.timestamp}</div>
          <div className="bg-blue-800/40 border border-blue-600/40 rounded-sm rounded-br-none px-3 py-2 text-xs text-blue-100/90 leading-relaxed">
            {msg.text}
          </div>
          {/* Attachments */}
          {msg.attachments && msg.attachments.length > 0 && (
            <div className="flex flex-wrap gap-1 justify-end">
              {msg.attachments.map(id => {
                const card = allEvidence.find(e => e.id === id)
                return card ? (
                  <div key={id} className="flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full border border-court-gold/30 bg-court-gold/10 text-court-gold font-mono">
                    <Paperclip size={8} />
                    {card.title}
                  </div>
                ) : null
              })}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Committee message
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-7 h-7 rounded-full bg-amber-900/30 border border-amber-700/40 flex items-center justify-center text-sm shrink-0">
        {committeeAvatar(msg.sender)}
      </div>
      <div className="max-w-[75%]">
        <div className="text-[10px] font-mono text-court-grey mb-1">{msg.sender} · {msg.timestamp}</div>
        <div className="bg-court-navy-mid border border-border rounded-sm rounded-tl-none px-3 py-2 text-xs text-court-white/90 leading-relaxed">
          {msg.text}
        </div>
        {msg.attachments && msg.attachments.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {msg.attachments.map(id => {
              const card = allEvidence.find(e => e.id === id)
              return card ? (
                <div key={id} className="flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full border border-border text-court-grey font-mono">
                  <Paperclip size={8} />
                  {card.title}
                </div>
              ) : null
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function EmailClientScreen({
  state,
  dispatch,
  currentDialogue,
  isChoicePoint,
}: EmailClientScreenProps) {
  const { activeCase, emailClientFolder, emailClientOpenId, collectedEvidenceIds, hearingStarted, hearingLog, pendingHearingAttachments, credibility } = state
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>('list')

  if (!activeCase) return null

  const allEvidence = activeCase.evidence

  // ── Folder filtering ──────────────────────────────────────────────────────

  function getItemsForFolder(folder: FolderKey): EvidenceCard[] {
    switch (folder) {
      case 'inbox':
        return allEvidence.filter(e =>
          e.emailFolder === 'inbox' || (!e.emailFolder && e.displayType !== 'employee-profile')
        )
      case 'archive':
        return allEvidence.filter(e => e.emailFolder === 'archive')
      case 'evidence':
        return allEvidence.filter(e => collectedEvidenceIds.has(e.id))
      case 'profiles':
        return allEvidence.filter(e =>
          e.displayType === 'employee-profile' || e.emailFolder === 'profiles'
        )
      default:
        return []
    }
  }

  const folderItems = getItemsForFolder(emailClientFolder)
  const openCard = allEvidence.find(e => e.id === emailClientOpenId) ?? null

  function folderCount(folder: FolderKey) {
    const items = getItemsForFolder(folder)
    if (folder === 'inbox') return items.filter(e => !state.evidenceReviewed.has(e.id)).length
    return items.length
  }

  function openItem(id: string) {
    dispatch({ type: 'OPEN_EMAIL_ITEM', payload: id })
    dispatch({ type: 'REVIEW_EVIDENCE', payload: id })
    setMobilePanel('content')
  }

  const canJoinHearing = collectedEvidenceIds.size >= 3 && activeCase.hearingStartId

  // ── Layout ────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-screen bg-court-navy overflow-hidden font-sans">

      {/* ── Top header bar ───────────────────────────────────────────────── */}
      <header className="h-10 border-b border-border bg-court-navy-mid flex items-center px-3 gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <Mail size={14} className="text-blue-400" />
          <span className="text-xs font-mono font-bold text-court-white tracking-wide">
            CorreoInterno Corp
          </span>
        </div>
        <div className="flex-1" />
        {hearingStarted && (
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-sm bg-amber-900/10">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Audiencia en curso
          </div>
        )}
        <div className="flex items-center gap-1.5 text-[10px] text-court-grey font-mono">
          <div className="w-5 h-5 rounded-full bg-blue-800/40 border border-blue-600/40 flex items-center justify-center text-[9px] text-blue-300 font-bold">
            N
          </div>
          <span>Lider de Archivo</span>
        </div>
      </header>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ──────────────────────────────────────────────────── */}
        <aside className={cn(
          'w-52 border-r border-border bg-court-navy-mid flex flex-col shrink-0',
          'hidden md:flex',  // hidden on mobile
        )}>
          {/* Folders */}
          <div className="flex-1 py-2">
            <div className="px-3 py-1.5 text-[9px] font-mono tracking-[0.3em] uppercase text-court-grey/50">
              Carpetas
            </div>
            {FOLDERS.map(folder => {
              const count = folderCount(folder.id)
              const Icon = folder.icon
              const isActive = emailClientFolder === folder.id && !hearingStarted
              return (
                <button
                  key={folder.id}
                  onClick={() => {
                    dispatch({ type: 'SWITCH_EMAIL_FOLDER', payload: folder.id })
                    setMobilePanel('list')
                  }}
                  className={cn(
                    'w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors text-xs',
                    isActive
                      ? 'bg-blue-900/30 text-blue-200 border-r-2 border-r-blue-400'
                      : 'text-court-grey hover:bg-court-navy-light hover:text-court-white'
                  )}
                >
                  <Icon size={13} className="shrink-0" />
                  <span className="flex-1 truncate">{folder.label}</span>
                  {count > 0 && (
                    <span className={cn(
                      'text-[9px] font-mono px-1.5 py-0.5 rounded-full min-w-[18px] text-center',
                      folder.id === 'inbox'
                        ? 'bg-blue-600/30 text-blue-300'
                        : folder.id === 'evidence'
                          ? 'bg-court-gold/20 text-court-gold'
                          : 'bg-court-navy text-court-grey'
                    )}>
                      {count}
                    </span>
                  )}
                </button>
              )
            })}

            {/* Hearing chat button */}
            {hearingStarted && (
              <div className="mt-1 border-t border-border pt-1">
                <div className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-amber-300 bg-amber-900/10 border-r-2 border-r-amber-400">
                  <MessageSquare size={13} className="shrink-0" />
                  <span className="flex-1 truncate">Chat — Comité</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                </div>
              </div>
            )}
          </div>

          {/* Solidez meter */}
          <SolidezBar value={credibility} />

          {/* Join hearing CTA */}
          {!hearingStarted && (
            <div className="p-3 border-t border-border">
              <button
                onClick={() => canJoinHearing && dispatch({ type: 'JOIN_HEARING' })}
                disabled={!canJoinHearing}
                className={cn(
                  'w-full flex items-center justify-center gap-1.5 py-2 text-[10px] font-mono tracking-widest uppercase transition-all border',
                  canJoinHearing
                    ? 'bg-amber-600/20 border-amber-500/50 text-amber-300 hover:bg-amber-600/30 hover:border-amber-400'
                    : 'bg-court-navy border-border text-court-grey/40 cursor-not-allowed'
                )}
              >
                <Shield size={11} />
                {canJoinHearing ? 'Unirse a Audiencia' : `${Math.max(0, 3 - collectedEvidenceIds.size)} evidencia más`}
              </button>
              <p className="text-[9px] text-court-grey/50 font-mono text-center mt-1.5 leading-tight">
                Marca ≥3 evidencias para activar
              </p>
            </div>
          )}
        </aside>

        {/* ── Mobile bottom nav ─────────────────────────────────────────── */}
        <div className="md:hidden fixed bottom-0 inset-x-0 z-20 bg-court-navy-mid border-t border-border flex h-12">
          {FOLDERS.map(folder => {
            const count = folderCount(folder.id)
            const Icon = folder.icon
            const isActive = mobilePanel === 'list' && emailClientFolder === folder.id
            return (
              <button
                key={folder.id}
                onClick={() => {
                  dispatch({ type: 'SWITCH_EMAIL_FOLDER', payload: folder.id })
                  setMobilePanel('list')
                }}
                className={cn(
                  'flex-1 flex flex-col items-center justify-center gap-0.5 text-[9px] transition-colors',
                  isActive ? 'text-blue-300' : 'text-court-grey'
                )}
              >
                <Icon size={16} />
                {count > 0 && (
                  <span className="text-[8px]">{count}</span>
                )}
              </button>
            )
          })}
        </div>

        {/* ── Main content area ─────────────────────────────────────────── */}
        <main className="flex-1 flex overflow-hidden">

          {/* Hearing mode: full-width chat */}
          {hearingStarted ? (
            <div className="flex-1 overflow-hidden">
              <HearingChat
                log={hearingLog}
                currentDialogue={currentDialogue}
                isChoicePoint={isChoicePoint}
                collectedEvidenceIds={collectedEvidenceIds}
                pendingAttachments={pendingHearingAttachments}
                allEvidence={allEvidence}
                dispatch={dispatch}
                isShaking={state.isWrongAnswerShaking}
                wrongMsg={state.wrongAnswerMessage}
              />
            </div>
          ) : (
            <>
              {/* Email list panel */}
              <div className={cn(
                'w-full md:w-72 border-r border-border flex flex-col overflow-hidden',
                mobilePanel !== 'list' && 'hidden md:flex',
              )}>
                {/* List header */}
                <div className="px-3 py-2.5 border-b border-border bg-court-navy-mid flex items-center justify-between">
                  <span className="text-xs font-semibold text-court-white">
                    {FOLDERS.find(f => f.id === emailClientFolder)?.label}
                  </span>
                  <span className="text-[10px] font-mono text-court-grey">
                    {folderItems.length} elemento{folderItems.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* List items */}
                <div className="flex-1 overflow-y-auto">
                  {folderItems.length === 0 ? (
                    <div className="px-4 py-8 text-center text-xs text-court-grey/50 font-mono italic">
                      Esta carpeta está vacía.
                    </div>
                  ) : (
                    folderItems.map(card => (
                      <EmailListItem
                        key={card.id}
                        card={card}
                        isOpen={card.id === emailClientOpenId}
                        isCollected={collectedEvidenceIds.has(card.id)}
                        isRead={state.evidenceReviewed.has(card.id)}
                        onClick={() => openItem(card.id)}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Content panel */}
              <div className={cn(
                'flex-1 flex flex-col overflow-hidden',
                mobilePanel !== 'content' && 'hidden md:flex',
              )}>
                {/* Mobile back button */}
                <button
                  onClick={() => setMobilePanel('list')}
                  className="md:hidden flex items-center gap-1 px-3 py-2 text-[10px] text-court-grey border-b border-border bg-court-navy-mid font-mono"
                >
                  <ChevronLeft size={12} />
                  Volver
                </button>

                {openCard ? (
                  <EvidenceViewer
                    card={openCard}
                    isCollected={collectedEvidenceIds.has(openCard.id)}
                    onMark={() => dispatch({ type: 'MARK_AS_EVIDENCE', payload: openCard.id })}
                    onUnmark={() => dispatch({ type: 'UNMARK_EVIDENCE', payload: openCard.id })}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-3 text-court-grey/40">
                    <Mail size={40} strokeWidth={1} />
                    <div className="text-sm font-mono">Selecciona un elemento para leerlo</div>
                    <div className="text-[10px] text-court-grey/30 font-mono">
                      Marca los relevantes como evidencia con ⭐
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
