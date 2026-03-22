'use client'

/**
 * CallReportRenderer — renders QA call monitoring evidence as a spreadsheet-style table.
 * Each flagged row highlights with a red FLAG badge.
 */

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { CallReportMeta } from '@/lib/gameData'
import { Phone, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react'

interface CallReportRendererProps {
  meta: CallReportMeta
  isKey?: boolean
  onRead?: () => void
}

export function CallReportRenderer({ meta, isKey, onRead }: CallReportRendererProps) {
  const [opened, setOpened] = useState(false)

  function handleOpen() {
    setOpened(true)
    onRead?.()
  }

  return (
    <div
      className={cn(
        'w-full rounded-sm border transition-all duration-300 overflow-hidden',
        opened
          ? 'border-court-red/40 bg-[#0c1015] shadow-[0_0_20px_rgba(200,16,46,0.08)]'
          : 'border-border bg-court-navy-light hover:border-court-red/20 cursor-pointer',
        isKey && !opened && 'border-court-gold/40'
      )}
    >
      {/* Header */}
      <button
        className="w-full flex items-start gap-3 px-4 py-3 text-left"
        onClick={() => (opened ? setOpened(false) : handleOpen())}
      >
        <div
          className={cn(
            'shrink-0 mt-0.5 p-2 rounded-sm transition-colors',
            opened ? 'bg-court-red/20 text-court-red' : isKey ? 'bg-court-gold/20 text-court-gold' : 'bg-secondary text-muted-foreground'
          )}
        >
          <Phone size={14} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className={cn('text-xs font-serif font-semibold', opened ? 'text-court-red' : 'text-foreground')}>
              Call Monitoring Report — {meta.calls.length} Flagged Calls
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[9px] font-mono tracking-widest px-1.5 py-0.5 border rounded-[2px] text-court-red border-court-red/40 bg-court-red/10 uppercase">
                {meta.calls.length} FLAGS
              </span>
              {opened
                ? <ChevronUp size={14} className="text-muted-foreground" />
                : <ChevronDown size={14} className="text-muted-foreground" />
              }
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground font-mono mt-0.5">{meta.source} — {meta.date}</p>
        </div>
      </button>

      {/* Expanded table */}
      {opened && (
        <div className="border-t border-court-red/20">
          {/* Table header */}
          <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-0 px-4 py-2 bg-court-navy border-b border-court-red/20">
            {['Call ID', 'Type', 'Action', 'Verify', 'Gap', 'Flag'].map((h) => (
              <span key={h} className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground px-2 first:pl-0 last:text-right">
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          <div className="divide-y divide-court-red/10">
            {meta.calls.map((call, i) => (
              <div
                key={call.callId}
                className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-0 px-4 py-2.5 items-center hover:bg-court-red/5 transition-colors"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="text-[10px] font-mono text-muted-foreground px-2 pl-0 whitespace-nowrap">{call.callId}</span>
                <span className="text-[10px] font-sans text-foreground/80 px-2 truncate">{call.type}</span>
                <span className="text-[10px] font-mono text-court-gold px-2 whitespace-nowrap">{call.actionTimestamp}</span>
                <span className="text-[10px] font-mono text-muted-foreground px-2 whitespace-nowrap">{call.verificationTimestamp}</span>
                <span className="text-[10px] font-mono font-bold text-court-red px-2 whitespace-nowrap">{call.gap}</span>
                <span className="flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 bg-court-red/15 border border-court-red/30 text-court-red rounded-[2px] whitespace-nowrap justify-self-end">
                  <AlertTriangle size={8} />
                  FLAG
                </span>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="px-4 py-3 border-t border-court-red/20 bg-court-red/5">
            <p className="text-[11px] font-sans text-foreground/70 leading-relaxed italic text-pretty">
              {meta.summary}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
