'use client'

/**
 * BankEvidenceRenderer — renders evidence with displayType: 'bank-record'
 * Styled as a bank core-banking system terminal printout.
 * Matches the expand/animate pattern of the other evidence renderers.
 */

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { BankRecordMeta } from '@/lib/gameData'
import { Terminal, ChevronDown, ChevronUp } from 'lucide-react'

interface BankRecordRendererProps {
  meta: BankRecordMeta
  onRead?: () => void
}

export function BankRecordRenderer({ meta, onRead }: BankRecordRendererProps) {
  const [opened, setOpened] = useState(false)
  const [visibleRows, setVisibleRows] = useState(0)

  useEffect(() => {
    if (!opened) return
    setVisibleRows(0)
    const id = setInterval(() => {
      setVisibleRows((v) => {
        if (v >= meta.rows.length) {
          clearInterval(id)
          return v
        }
        return v + 1
      })
    }, 90)
    return () => clearInterval(id)
  }, [opened, meta.rows.length])

  // Fire onRead only after animation finishes
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
      {/* Header row — always visible, acts as toggle */}
      <button
        className="w-full flex items-start gap-3 px-4 py-3 text-left"
        onClick={() => setOpened(!opened)}
      >
        <div
          className={cn(
            'shrink-0 mt-0.5 p-2 rounded-sm transition-colors',
            opened ? 'bg-green-900/40 text-green-400' : 'bg-secondary text-muted-foreground'
          )}
        >
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

      {/* Expanded terminal body */}
      {opened && (
        <div className="border-t border-green-900/40">
          {/* Terminal title bar */}
          <div
            className="px-4 py-1.5 border-b border-green-900/30 flex items-center justify-between"
            style={{ background: '#0a1a0f' }}
          >
            <span className="text-[9px] tracking-[0.3em] uppercase text-green-600">
              {meta.systemLabel}
            </span>
            <span className="text-[9px] text-green-700 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
              CONNECTED
            </span>
          </div>

          {/* Query line */}
          <div className="px-4 py-1.5 border-b border-green-900/20" style={{ background: '#060f0a' }}>
            <span className="text-[10px] text-green-600">&gt; QUERY — {meta.date}</span>
          </div>

          {/* Animated data rows */}
          <div className="px-4 py-3 space-y-1.5" style={{ background: '#060f0a' }}>
            {meta.rows.slice(0, visibleRows).map((row, i) => (
              <div key={i} className="flex items-center justify-between gap-4 transition-opacity duration-150">
                <span className="text-green-700/80 shrink-0">{row.label}</span>
                <span
                  className={cn(
                    'text-right font-mono',
                    row.highlight ? 'text-court-red font-bold tracking-wide' : 'text-green-300'
                  )}
                >
                  {row.value}
                </span>
              </div>
            ))}
            {visibleRows < meta.rows.length && (
              <span className="inline-block w-2 h-3 bg-green-500/70 animate-pulse" />
            )}
          </div>

          {/* Footer note */}
          {meta.footer && visibleRows >= meta.rows.length && (
            <div
              className="px-4 py-2.5 border-t border-green-900/30 text-[10px] text-green-700/70 leading-relaxed"
              style={{ background: '#0a1a0f' }}
            >
              {meta.footer}
            </div>
          )}

          <div className="px-4 py-1.5 border-t border-green-900/40 flex items-center justify-between" style={{ background: '#0a1a0f' }}>
            <span className="text-[9px] text-green-900 tracking-widest">END OF RECORD</span>
            <span className="text-[9px] text-green-900">&#9632;&#9632;&#9632;</span>
          </div>
        </div>
      )}
    </div>
  )
}
