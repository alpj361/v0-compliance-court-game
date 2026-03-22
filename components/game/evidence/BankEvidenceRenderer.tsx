'use client'
// v3 — correct BankRecordMeta shape: { label, value, highlight }

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

  // Fire onRead only after animation finishes — never inside setState
  useEffect(() => {
    if (opened && visibleRows >= meta.rows.length && meta.rows.length > 0) {
      onRead?.()
    }
  }, [opened, visibleRows, meta.rows.length, onRead])

  return (
    <div className={cn(
      'font-mono text-xs rounded-sm border transition-all duration-200',
      opened ? 'border-green-700/60 bg-[#050f05]' : 'border-border bg-court-navy-light hover:border-green-700/40'
    )}>
      <button
        onClick={() => setOpened(!opened)}
        className="w-full flex items-start gap-3 px-3 py-2.5 text-left"
      >
        <Terminal size={14} className={cn('mt-0.5 shrink-0', opened ? 'text-green-400' : 'text-court-grey')} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className={cn('font-bold truncate', opened ? 'text-green-400' : 'text-court-white/80')}>
              {meta.systemLabel}
            </span>
            <span className="text-court-grey shrink-0 text-[10px]">{meta.date}</span>
          </div>
          <div className={cn('truncate text-[10px]', opened ? 'text-green-300/60' : 'text-court-grey')}>
            {meta.rows.length} records
          </div>
        </div>
        {opened
          ? <ChevronUp size={12} className="text-court-grey shrink-0 mt-0.5" />
          : <ChevronDown size={12} className="text-court-grey shrink-0 mt-0.5" />}
      </button>

      {opened && (
        <div className="border-t border-green-900/40 px-3 py-3">
          {/* Terminal header */}
          <div className="text-[10px] text-green-500/60 mb-3 pb-1 border-b border-green-900/30">
            <span className="text-green-400">{'>'}</span> QUERY RESULTS — {meta.date}
          </div>

          {/* Rows animate in */}
          <div className="space-y-1.5">
            {meta.rows.slice(0, visibleRows).map((row, i) => (
              <div
                key={i}
                className={cn(
                  'flex justify-between gap-4 py-1 px-2 rounded-[2px]',
                  row.highlight ? 'bg-court-red/15 border border-court-red/30' : 'bg-green-950/30'
                )}
              >
                <span className="text-green-400/70 shrink-0">{row.label}</span>
                <span className={cn(
                  'text-right font-bold',
                  row.highlight ? 'text-court-red-bright' : 'text-green-300'
                )}>
                  {row.value}
                </span>
              </div>
            ))}
            {visibleRows < meta.rows.length && (
              <div className="flex items-center gap-1 text-green-500/50 text-[10px] py-1">
                <span className="inline-block w-1.5 h-3 bg-green-400/60 animate-cursor" />
                loading...
              </div>
            )}
          </div>

          {meta.footer && visibleRows >= meta.rows.length && (
            <div className="mt-3 pt-2 border-t border-green-900/30 text-[10px] text-green-500/50">
              {meta.footer}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
