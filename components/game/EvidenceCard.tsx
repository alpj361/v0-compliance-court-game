'use client'

/**
 * EvidenceCard — routes to the appropriate rich renderer based on displayType.
 * BankRecordRenderer is intentionally inlined here to avoid a persistent
 * Turbopack module-resolution issue with the separate file.
 */

import { useCallback, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { EvidenceCard as EvidenceCardType, BankRecordMeta } from '@/lib/gameData'
import { EmailRenderer } from '@/components/game/evidence/EmailEvidenceRenderer'
import { LegalTextRenderer } from '@/components/game/evidence/LegalTextRenderer'
import { PaperDocRenderer } from '@/components/game/evidence/PaperDocRenderer'
import { CoachingLogRenderer } from '@/components/game/evidence/CoachingLogRenderer'
import { CallReportRenderer } from '@/components/game/evidence/CallReportRenderer'
import { VideoRenderer } from '@/components/game/evidence/VideoEvidenceRenderer'
import { Terminal, ChevronDown, ChevronUp } from 'lucide-react'

// ── BankRecordRenderer — inlined ──────────────────────────────────────────────
function BankRecordRenderer({ meta, onRead }: { meta: BankRecordMeta; onRead?: () => void }) {
  const [opened, setOpened] = useState(false)
  const [visibleRows, setVisibleRows] = useState(0)

  // Detect football context from systemLabel
  const isFootball = meta.systemLabel.toLowerCase().includes('fc') || meta.systemLabel.toLowerCase().includes('fútbol') || meta.systemLabel.toLowerCase().includes('futbol') || meta.systemLabel.toLowerCase().includes('rendimiento') || meta.systemLabel.toLowerCase().includes('financiero interno')
  const statusLabel = isFootball ? 'EN LÍNEA' : 'CONNECTED'
  const queryPrefix = isFootball ? '> CONSULTA —' : '> QUERY —'
  const endLabel = isFootball ? 'FIN DEL INFORME' : 'END OF RECORD'

  useEffect(() => {
    if (!opened) return
    setVisibleRows(0)
    const id = setInterval(() => {
      setVisibleRows((v) => {
        if (v >= meta.rows.length) { clearInterval(id); return v }
        return v + 1
      })
    }, 90)
    return () => clearInterval(id)
  }, [opened, meta.rows.length])

  useEffect(() => {
    if (opened && visibleRows >= meta.rows.length && meta.rows.length > 0) {
      onRead?.()
    }
  }, [opened, visibleRows, meta.rows.length, onRead])

  return (
    <div
      className={cn(
        'w-full rounded-sm border transition-all duration-300 overflow-hidden font-mono text-xs',
        opened
          ? 'border-green-800/50 shadow-[0_0_20px_rgba(0,100,30,0.12)]'
          : 'border-border bg-court-navy-light hover:border-green-900/40 cursor-pointer'
      )}
      style={opened ? { background: '#060f0a' } : {}}
    >
      <button
        className="w-full flex items-start gap-3 px-4 py-3 text-left"
        onClick={() => setOpened((o) => !o)}
      >
        <div className={cn('shrink-0 mt-0.5 p-2 rounded-sm transition-colors', opened ? 'bg-green-900/40 text-green-400' : 'bg-secondary text-muted-foreground')}>
          <Terminal size={14} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className={cn('font-serif font-semibold', opened ? 'text-green-400' : 'text-foreground')}>
              {meta.systemLabel}
            </span>
            {opened
              ? <ChevronUp size={14} className="text-green-700 shrink-0" />
              : <ChevronDown size={14} className="text-muted-foreground shrink-0" />
            }
          </div>
          <p className="text-[10px] text-muted-foreground mt-0.5">{meta.date}</p>
        </div>
      </button>

      {opened && (
        <div className="border-t border-green-900/40">
          <div
            className="px-4 py-1.5 border-b border-green-900/30 flex items-center justify-between"
            style={{ background: '#0a1a0f' }}
          >
            <span className="text-[9px] tracking-[0.3em] uppercase text-green-600">{meta.systemLabel}</span>
            <span className="text-[9px] text-green-700 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
              {statusLabel}
            </span>
          </div>
          <div className="px-4 py-1.5 border-b border-green-900/20" style={{ background: '#060f0a' }}>
            <span className="text-[10px] text-green-600">{queryPrefix} {meta.date}</span>
          </div>
          <div className="px-4 py-3 space-y-1.5" style={{ background: '#060f0a' }}>
            {meta.rows.slice(0, visibleRows).map((row, i) => (
              <div key={i} className="flex items-center justify-between gap-4">
                <span className="text-green-700/80 shrink-0">{row.label}</span>
                <span className={cn('text-right font-mono', row.highlight ? 'text-court-red font-bold tracking-wide' : 'text-green-300')}>
                  {row.value}
                </span>
              </div>
            ))}
            {visibleRows < meta.rows.length && (
              <span className="inline-block w-2 h-3 bg-green-500/70 animate-pulse" />
            )}
          </div>
          {meta.footer && visibleRows >= meta.rows.length && (
            <div
              className="px-4 py-2.5 border-t border-green-900/30 text-[10px] text-green-700/70 leading-relaxed"
              style={{ background: '#0a1a0f' }}
            >
              {meta.footer}
            </div>
          )}
          <div
            className="px-4 py-1.5 border-t border-green-900/40 flex items-center justify-between"
            style={{ background: '#0a1a0f' }}
          >
            <span className="text-[9px] text-green-900 tracking-widest">{endLabel}</span>
            <span className="text-[9px] text-green-900">&#9632;&#9632;&#9632;</span>
          </div>
        </div>
      )}
    </div>
  )
}

// ── EvidenceCard ──────────────────────────────────────────────────────────────
interface EvidenceCardProps {
  card: EvidenceCardType
  isReviewed?: boolean
  onReview?: (id: string) => void
}

export function EvidenceCard({ card, isReviewed, onReview }: EvidenceCardProps) {
  const handleRead = useCallback(() => {
    if (!isReviewed) onReview?.(card.id)
  }, [card.id, isReviewed, onReview])

  return (
    <div className={cn('relative transition-all duration-200', isReviewed ? 'opacity-100' : 'opacity-85')}>
      {card.isKey && (
        <div className="absolute -top-1.5 -right-1.5 z-10 text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 bg-court-gold text-court-navy font-bold rounded-[2px] shadow-md">
          KEY
        </div>
      )}
      {isReviewed && (
        <div className="absolute -top-1.5 left-0 z-10 text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 bg-green-700/80 text-green-100 rounded-[2px]">
          READ
        </div>
      )}

      {card.displayType === 'email' && card.emailMeta && (
        <EmailRenderer meta={card.emailMeta} onRead={handleRead} />
      )}
      {card.displayType === 'bank-record' && card.bankRecordMeta && (
        <BankRecordRenderer meta={card.bankRecordMeta} onRead={handleRead} />
      )}
      {card.displayType === 'legal-text' && card.legalTextMeta && (
        <LegalTextRenderer meta={card.legalTextMeta} onRead={handleRead} />
      )}
      {card.displayType === 'paper-doc' && card.paperDocMeta && (
        <PaperDocRenderer meta={card.paperDocMeta} isKey={card.isKey} onRead={handleRead} />
      )}
      {card.displayType === 'coaching-log' && card.coachingLogMeta && (
        <CoachingLogRenderer meta={card.coachingLogMeta} isKey={card.isKey} onRead={handleRead} />
      )}
      {card.displayType === 'call-report' && card.callReportMeta && (
        <CallReportRenderer meta={card.callReportMeta} isKey={card.isKey} onRead={handleRead} />
      )}
      {card.displayType === 'video' && card.videoMeta && (
        <VideoRenderer meta={card.videoMeta} isKey={card.isKey} onRead={handleRead} />
      )}
    </div>
  )
}
