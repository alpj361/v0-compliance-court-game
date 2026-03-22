'use client'

/**
 * BankRecordRenderer — renders evidence as a bank core-system terminal printout.
 * Monospaced, green-on-black CRT aesthetic, rows scan in line by line.
 */

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { BankRecordMeta } from '@/lib/gameData'
import { Terminal } from 'lucide-react'

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
    }, 80)
    return () => clearInterval(id)
  }, [opened]) // eslint-disable-line react-hooks/exhaustive-deps

  // Fire onRead after animation completes — outside the interval setter
  useEffect(() => {
    if (opened && visibleRows >= meta.rows.length && meta.rows.length > 0) {
      onRead?.()
    }
  }, [opened, visibleRows, meta.rows.length]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={cn(
        'w-full rounded-sm border transition-all duration-300 overflow-hidden',
        opened
          ? 'border-[#00ff41]/30 bg-[#050e05] shadow-[0_0_20px_rgba(0,255,65,0.06)]'
          : 'border-border bg-court-navy-light hover:border-[#00ff41]/20 cursor-pointer'
      )}
    >
      {/* Terminal header bar */}
      <button
        className="w-full flex items-center gap-2 px-3 py-2 bg-[#081208] border-b border-[#00ff41]/20 text-left"
        onClick={() => setOpened((o) => !o)}
      >
        <Terminal size={13} className="text-[#00ff41]/70 shrink-0" />
        <span className="text-[10px] font-mono text-[#00ff41]/60 tracking-widest uppercase flex-1 truncate">
          {meta.systemLabel}
        </span>
        <span className="text-[10px] font-mono text-[#00ff41]/40 shrink-0">
          {opened ? '▲ CLOSE' : '▼ OPEN RECORD'}
        </span>
      </button>

      {/* Date stamp */}
      {opened && (
        <div className="px-4 pt-3 pb-1">
          <p className="text-[11px] font-mono text-[#00ff41]/50 tracking-widest">{meta.date}</p>
          <div className="border-t border-[#00ff41]/10 mt-2 mb-1" />
        </div>
      )}

      {!opened && (
        <div className="px-4 py-3 flex items-center gap-3">
          <Terminal size={14} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-mono">Click to view system record</span>
        </div>
      )}

      {/* Rows scan in */}
      {opened && (
        <div className="px-4 pb-4 space-y-0.5">
          {meta.rows.slice(0, visibleRows).map((row, i) => (
            <div
              key={i}
              className={cn(
                'flex items-start gap-0 py-1 px-2 rounded-[2px] transition-all duration-100',
                row.highlight
                  ? 'bg-[#00ff41]/8 border border-[#00ff41]/20'
                  : 'border border-transparent'
              )}
            >
              <span className="text-[11px] font-mono text-[#00ff41]/50 w-52 shrink-0 pr-2">
                {row.label}
              </span>
              <span
                className={cn(
                  'text-[11px] font-mono font-semibold',
                  row.highlight ? 'text-[#ff4444]' : 'text-[#00ff41]/80'
                )}
              >
                {row.value}
              </span>
            </div>
          ))}
          {visibleRows < meta.rows.length && (
            <div className="flex items-center gap-2 py-1 px-2">
              <span className="text-[11px] font-mono text-[#00ff41]/30 animate-pulse">
                █ LOADING...
              </span>
            </div>
          )}
          {visibleRows >= meta.rows.length && meta.footer && (
            <div className="mt-3 pt-3 border-t border-[#00ff41]/10">
              <p className="text-[10px] font-mono text-[#00ff41]/40 leading-relaxed italic">
                {meta.footer}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
