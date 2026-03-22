'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { BankRecordMeta } from '@/lib/gameData'
import { Database, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react'

interface Props {
  meta: BankRecordMeta
  onRead?: () => void
}

export function BankRecordPanel({ meta, onRead }: Props) {
  const [opened, setOpened] = useState(false)
  const [visibleRows, setVisibleRows] = useState(0)

  useEffect(() => {
    if (!opened) return
    setVisibleRows(0)
    let count = 0
    const id = setInterval(() => {
      count += 1
      setVisibleRows(count)
      if (count >= meta.rows.length) clearInterval(id)
    }, 90)
    return () => clearInterval(id)
  }, [opened, meta.rows.length])

  // Fire onRead after all rows visible — never inside a setState updater
  useEffect(() => {
    if (opened && meta.rows.length > 0 && visibleRows >= meta.rows.length) {
      onRead?.()
    }
  }, [opened, visibleRows, meta.rows.length, onRead])

  return (
    <div className={cn(
      'font-mono text-xs rounded-sm border transition-all duration-200',
      opened
        ? 'border-court-gold/50 bg-court-navy-mid'
        : 'border-border bg-court-navy-light hover:border-court-gold/30'
    )}>
      <button
        onClick={() => setOpened((o) => !o)}
        className="w-full flex items-center gap-3 px-3 py-2.5 text-left"
      >
        <Database
          size={14}
          className={cn('shrink-0', opened ? 'text-court-gold' : 'text-court-grey')}
        />
        <div className="flex-1 min-w-0">
          <div className={cn('font-bold truncate', opened ? 'text-court-gold' : 'text-court-white/80')}>
            {meta.systemLabel}
          </div>
          <div className="text-court-grey text-[10px] mt-0.5">{meta.date}</div>
        </div>
        {opened
          ? <ChevronUp size={12} className="text-court-grey shrink-0" />
          : <ChevronDown size={12} className="text-court-grey shrink-0" />
        }
      </button>

      {opened && (
        <div className="border-t border-court-gold/20 px-3 py-3 flex flex-col gap-1">
          {meta.rows.slice(0, visibleRows).map((row, i) => (
            <div
              key={i}
              className={cn(
                'flex items-baseline justify-between gap-3 py-1 border-b border-border/30',
                row.highlight && 'bg-court-red/10 px-2 -mx-2 border-court-red/20'
              )}
            >
              <span className="text-[10px] text-court-grey shrink-0">{row.label}</span>
              <span className={cn(
                'text-[10px] font-bold text-right flex items-center gap-1',
                row.highlight ? 'text-court-red' : 'text-court-white/90'
              )}>
                {row.highlight && <AlertTriangle size={9} className="shrink-0" />}
                {row.value}
              </span>
            </div>
          ))}

          {visibleRows < meta.rows.length && (
            <div className="text-court-gold/40 text-[9px] flex items-center gap-1 mt-1">
              <span className="inline-block w-1.5 h-3 bg-court-gold/40 animate-cursor" />
              loading records...
            </div>
          )}

          {meta.footer && visibleRows >= meta.rows.length && (
            <div className="border-t border-border pt-2 mt-1 text-[10px] text-court-gold/70 flex items-start gap-1.5 leading-relaxed">
              <AlertTriangle size={10} className="text-court-red shrink-0 mt-0.5" />
              {meta.footer}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
