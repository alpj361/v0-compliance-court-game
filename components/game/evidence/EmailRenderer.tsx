'use client'

/**
 * EmailRenderer — renders evidence as a realistic email client UI.
 * Animated: envelope opens, email body types in line by line.
 */

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { EmailMeta } from '@/lib/gameData'
import { Mail, Paperclip, CheckCheck, ChevronDown, ChevronUp } from 'lucide-react'

interface EmailRendererProps {
  meta: EmailMeta
  onRead?: () => void
}

export function EmailRenderer({ meta, onRead }: EmailRendererProps) {
  const [opened, setOpened] = useState(false)
  const [visibleLines, setVisibleLines] = useState(0)
  const lines = meta.body.split('\n')

  // Animate lines appearing one by one after open
  useEffect(() => {
    if (!opened) return
    setVisibleLines(0)
    const id = setInterval(() => {
      setVisibleLines((v) => {
        if (v >= lines.length) {
          clearInterval(id)
          return v
        }
        return v + 1
      })
    }, 60)
    return () => clearInterval(id)
  }, [opened]) // eslint-disable-line react-hooks/exhaustive-deps

  // Fire onRead after animation completes — outside the interval setter
  useEffect(() => {
    if (opened && visibleLines >= lines.length && lines.length > 0) {
      onRead?.()
    }
  }, [opened, visibleLines, lines.length]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={cn(
        'w-full rounded-sm border transition-all duration-300 overflow-hidden select-none',
        opened
          ? 'border-court-gold/50 bg-[#0a1520] shadow-[0_0_20px_rgba(212,160,23,0.08)]'
          : 'border-border bg-court-navy-light hover:border-court-gold/30 cursor-pointer'
      )}
    >
      {/* Email client toolbar */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-court-navy border-b border-border">
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="text-[10px] font-mono text-muted-foreground ml-1 tracking-wider">
          BANDEJA DE ENTRADA / INBOX — EVIDENCE VIEW
        </span>
      </div>

      {/* Header row — always visible, click to open */}
      <button
        className="w-full flex items-start gap-3 px-4 py-3 text-left"
        onClick={() => setOpened((o) => !o)}
      >
        <div
          className={cn(
            'shrink-0 mt-0.5 p-2 rounded-full transition-colors',
            opened ? 'bg-court-gold/20 text-court-gold' : 'bg-secondary text-muted-foreground'
          )}
        >
          <Mail size={14} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className={cn('text-xs font-semibold font-sans truncate', opened ? 'text-court-gold' : 'text-foreground')}>
              {meta.subject}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              {meta.hasReadReceipt && (
                <span className="flex items-center gap-1 text-[9px] font-mono text-green-400 bg-green-900/30 border border-green-600/30 px-1.5 py-0.5 rounded-[2px]">
                  <CheckCheck size={9} />
                  READ RECEIPT
                </span>
              )}
              {opened ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5 font-mono truncate">{meta.from}</p>
          <p className="text-[10px] text-muted-foreground/60 font-mono">{meta.date}</p>
        </div>
      </button>

      {/* Expanded email body */}
      {opened && (
        <div className="border-t border-border">
          {/* Metadata header */}
          <div className="px-4 py-3 bg-court-navy/60 border-b border-border/50 space-y-1">
            <MetaRow label="De" value={meta.from} />
            <MetaRow label="Para" value={meta.to} />
            <MetaRow label="Fecha" value={meta.date} />
            <MetaRow label="Asunto" value={meta.subject} highlight />
          </div>

          {/* Body — lines animate in */}
          <div className="px-5 py-4 font-sans text-sm text-court-white/90 leading-relaxed space-y-1 min-h-[80px]">
            {lines.slice(0, visibleLines).map((line, i) => (
              <p key={i} className={cn('transition-opacity duration-150', line === '' ? 'h-3' : '')}>
                {line}
              </p>
            ))}
            {visibleLines < lines.length && (
              <span className="inline-block w-2 h-4 bg-court-gold/70 animate-cursor ml-0.5 align-middle" />
            )}
          </div>

          {meta.hasReadReceipt && (
            <div className="px-5 py-2 border-t border-border/50 flex items-center gap-2">
              <CheckCheck size={12} className="text-green-400" />
              <span className="text-[10px] text-green-400 font-mono">
                Confirmación de lectura registrada — destinatario abrió el mensaje
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function MetaRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-start gap-3 text-[11px] font-mono">
      <span className="shrink-0 text-muted-foreground/70 w-12">{label}:</span>
      <span className={cn('break-all leading-tight', highlight ? 'text-court-gold font-semibold' : 'text-foreground/80')}>
        {value}
      </span>
    </div>
  )
}
