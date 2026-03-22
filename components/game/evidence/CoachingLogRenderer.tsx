'use client'

/**
 * CoachingLogRenderer — renders a signed coaching / disciplinary session form.
 * Rendered like an HR paper form with field lines, stamps, and dual signatures.
 */

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { CoachingLogMeta } from '@/lib/gameData'
import { ClipboardList, ChevronDown, ChevronUp, PenLine, AlertTriangle } from 'lucide-react'

interface CoachingLogRendererProps {
  meta: CoachingLogMeta
  isKey?: boolean
  onRead?: () => void
}

export function CoachingLogRenderer({ meta, isKey, onRead }: CoachingLogRendererProps) {
  const [opened, setOpened] = useState(false)

  function handleOpen() {
    setOpened(true)
    onRead?.()
  }

  const hintColor =
    meta.hintLevel?.includes('1') ? 'text-yellow-400 border-yellow-400/40 bg-yellow-900/20'
    : meta.hintLevel?.includes('2') ? 'text-orange-400 border-orange-400/40 bg-orange-900/20'
    : meta.hintLevel?.includes('3') ? 'text-red-400 border-red-400/40 bg-red-900/20'
    : meta.hintLevel?.includes('4') ? 'text-court-red border-court-red/40 bg-court-red/10'
    : null

  return (
    <div
      className={cn(
        'w-full rounded-sm border transition-all duration-300 overflow-hidden',
        opened
          ? 'border-[#b8a880]/40 shadow-[2px_2px_0_rgba(0,0,0,0.5)]'
          : 'border-border bg-court-navy-light hover:border-[#b8a880]/20 cursor-pointer',
        isKey && !opened && 'border-court-gold/40'
      )}
      style={opened ? { background: '#f8f4ea' } : {}}
    >
      {/* Header */}
      <button
        className="w-full flex items-start gap-3 px-4 py-3 text-left"
        onClick={() => (opened ? setOpened(false) : handleOpen())}
      >
        <div
          className={cn(
            'shrink-0 mt-0.5 p-2 rounded-sm transition-colors',
            opened ? 'bg-[#d4c9a8]/40 text-[#4a3820]' : isKey ? 'bg-court-gold/20 text-court-gold' : 'bg-secondary text-muted-foreground'
          )}
        >
          <ClipboardList size={14} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className={cn('text-xs font-serif font-semibold', opened ? 'text-[#2a1e0e]' : 'text-foreground')}>
              Coaching Log — Session {meta.sessionNumber}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              {meta.hintLevel && hintColor && (
                <span className={cn('text-[9px] font-mono tracking-widest px-1.5 py-0.5 border rounded-[2px] uppercase', hintColor)}>
                  {meta.hintLevel}
                </span>
              )}
              {opened
                ? <ChevronUp size={14} className="text-[#8a7a60]" />
                : <ChevronDown size={14} className="text-muted-foreground" />
              }
            </div>
          </div>
          <p className={cn('text-[11px] font-mono mt-0.5', opened ? 'text-[#5a4a38]' : 'text-muted-foreground')}>
            {meta.date} — TL: {meta.teamLeader} / Agent: {meta.agent}
          </p>
        </div>
      </button>

      {/* Expanded form */}
      {opened && (
        <div className="border-t border-[#c8b89a]/50">
          {/* Form header */}
          <div className="px-6 py-3 bg-[#e8e0cc] border-b border-[#c8b89a]/40 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#5a4a38] font-semibold">
                Performance Coaching Session Record
              </p>
              <p className="text-[10px] font-mono text-[#8a7a68] mt-0.5">
                Credit Card Division — Human Resources Documentation
              </p>
            </div>
            {meta.hintLevel && (
              <div className={cn('flex items-center gap-1 px-2 py-1 border rounded-sm', hintColor ?? '')}>
                <AlertTriangle size={10} />
                <span className="text-[9px] font-mono font-bold tracking-widest uppercase">{meta.hintLevel}</span>
              </div>
            )}
          </div>

          <div
            className="px-6 py-4 space-y-4 max-h-80 overflow-y-auto"
            style={{ scrollbarColor: 'rgba(90,74,56,0.3) transparent' }}
          >
            <FormField label="Session Date" value={meta.date} dark />
            <FormField label="Team Leader" value={meta.teamLeader} dark />
            <FormField label="Agent" value={meta.agent} dark />

            <div className="space-y-1">
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#5a4a38]/70 font-semibold">Discussion</p>
              <div className="border border-[#c8b89a]/50 rounded-[2px] p-3 bg-white/60">
                {meta.discussion.split('\n\n').map((p, i) => (
                  <p key={i} className="text-sm font-serif text-[#2a1e0e] leading-relaxed mb-2 last:mb-0 text-pretty">{p}</p>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#5a4a38]/70 font-semibold">Agent Acknowledgment</p>
              <div className="border border-[#c8b89a]/50 rounded-[2px] p-3 bg-white/60 border-l-4 border-l-[#8a7a60]">
                <p className="text-sm font-serif italic text-[#2a1e0e] leading-relaxed text-pretty">{meta.agentAcknowledgment}</p>
              </div>
            </div>

            {meta.tlNote && (
              <div className="space-y-1">
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#5a4a38]/70 font-semibold">Team Leader Note</p>
                <div className="border border-[#c8b89a]/50 rounded-[2px] p-3 bg-[#fff8e8]/80">
                  <p className="text-sm font-serif text-[#2a1e0e] leading-relaxed text-pretty">{meta.tlNote}</p>
                </div>
              </div>
            )}

            {/* Dual signature block */}
            <div className="border-t border-[#c8b89a]/40 pt-4 flex gap-8 flex-wrap">
              <SignatureLine label="Agent Signature" name={meta.agentSignature} />
              <SignatureLine label="Team Leader Signature" name={meta.tlSignature} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function FormField({ label, value, dark }: { label: string; value: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <p className="text-[10px] font-mono uppercase tracking-wider text-[#5a4a38]/70 font-semibold w-24 shrink-0">{label}</p>
      <div className="flex-1 border-b border-[#c8b89a]/50 pb-0.5">
        <p className={cn('text-sm font-serif', dark ? 'text-[#2a1e0e]' : 'text-[#4a3820]')}>{value}</p>
      </div>
    </div>
  )
}

function SignatureLine({ label, name }: { label: string; name: string }) {
  return (
    <div>
      <div className="font-serif italic text-lg text-[#2a1e0e]/75 leading-none mb-1">{name}</div>
      <div className="h-px w-36 bg-[#5a4a38]/40" />
      <div className="flex items-center gap-1 mt-1">
        <PenLine size={10} className="text-[#5a4a38]/60" />
        <p className="text-[10px] font-mono text-[#5a4a38]/70">{label}</p>
      </div>
    </div>
  )
}
