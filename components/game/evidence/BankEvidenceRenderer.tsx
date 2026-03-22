'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { BankRecordMeta } from '@/lib/gameData'
import { Database, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react'

interface BankEvidenceRendererProps {
  meta: BankRecordMeta
  onRead?: () => void
}

export function BankRecordRenderer({ meta, onRead }: BankEvidenceRendererProps) {
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

  // Fire onRead only after all rows are visible — never inside the setState updater
  useEffect(() => {
    if (opened && visibleRows >= meta.rows.length && meta.rows.length > 0) {
      onRead?.()
    }
  }, [opened, visibleRows, meta.rows.length, onRead])

  return (
    <div className={cn(
      'font-mono text-xs rounded-sm border transition-all duration-200',
      opened ? 'border-court-gold/50 bg-court-navy-mid' : 'border-border bg-court-navy-light hover:border-court-gold/30'
    )}>
      <button
        onClick={() => setOpened(!opened)}
        className="w-full flex items-center gap-3 px-3 py-2.5 text-left"
      >
        <Database size={14} className={cn('shrink-0', opened ? 'text-court-gold' : 'text-court-grey')} />
        <div className="flex-1 min-w-0">
          <div className={cn('font-bold truncate', opened ? 'text-court-gold' : 'text-court-white/80')}>
            {meta.systemLabel}
          </div>
          <div className="text-court-grey text-[10px] mt-0.5">{meta.date}</div>
        </div>
        {opened ? <ChevronUp size={12} className="text-court-grey shrink-0" /> : <ChevronDown size={12} className="text-court-grey shrink-0" />}
      </button>

      {opened && (
        <div className="border-t border-court-gold/20 px-3 py-3 flex flex-col gap-1">
          {meta.rows.slice(0, visibleRows).map((row, i) => (
            <div
              key={i}
              className={cn(
                'flex items-baseline justify-between gap-3 py-1 border-b border-border/30 transition-all duration-100',
                row.highlight && 'bg-court-red/10 px-2 -mx-2 border-court-red/20'
              )}
            >
              <span className="text-[10px] text-court-grey shrink-0">{row.label}</span>
              <span className={cn(
                'text-[10px] font-bold text-right',
                row.highlight ? 'text-court-red flex items-center gap-1' : 'text-court-white/90'
              )}>
                {row.highlight && <AlertTriangle size={9} className="text-court-red shrink-0" />}
                {row.value}
              </span>
            </div>
          ))}

          {visibleRows < meta.rows.length && (
            <div className="text-court-gold/40 text-[9px] flex items-center gap-1 mt-1">
              <span className="inline-block w-1.5 h-3 bg-court-gold/40 animate-cursor" />
              cargando registros...
            </div>
          )}

          {meta.footer && visibleRows >= meta.rows.length && (
            <div className="border-t border-border pt-2 mt-1 text-[10px] text-court-gold/70 leading-relaxed flex items-start gap-1.5">
              <AlertTriangle size={10} className="text-court-red shrink-0 mt-0.5" />
              {meta.footer}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

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
      opened ? 'border-court-gold/50 bg-court-navy-mid' : 'border-border bg-court-navy-light hover:border-court-gold/30'
    )}>
      <button
        onClick={() => setOpened(!opened)}
        className="w-full flex items-center gap-3 px-3 py-2.5 text-left"
      >
        <Database size={14} className={cn('shrink-0', opened ? 'text-court-gold' : 'text-court-grey')} />
        <div className="flex-1 min-w-0">
          <div className={cn('font-bold truncate', opened ? 'text-court-gold' : 'text-court-white/80')}>
            {meta.systemName}
          </div>
          <div className="text-court-grey text-[10px]">Acc: {meta.accountId} — {meta.reportDate}</div>
        </div>
        {opened ? <ChevronUp size={12} className="text-court-grey shrink-0" /> : <ChevronDown size={12} className="text-court-grey shrink-0" />}
      </button>

      {opened && (
        <div className="border-t border-court-gold/20 flex flex-col gap-3 px-3 py-3">
          <div className="text-[10px] text-court-grey flex flex-wrap gap-x-4 gap-y-0.5 border-b border-border pb-2">
            <span><span className="text-court-gold/60">System:</span> {meta.systemName}</span>
            <span><span className="text-court-gold/60">Account:</span> {meta.accountId}</span>
            <span><span className="text-court-gold/60">Reported by:</span> {meta.reportedBy}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[10px] border-collapse">
              <thead>
                <tr className="border-b border-border text-court-gold/60 text-left">
                  <th className="pr-3 pb-1 font-normal">Date</th>
                  <th className="pr-3 pb-1 font-normal">Type</th>
                  <th className="pr-3 pb-1 font-normal">Amount</th>
                  <th className="pr-3 pb-1 font-normal">CCY</th>
                  <th className="pr-3 pb-1 font-normal">From</th>
                  <th className="pr-3 pb-1 font-normal">To</th>
                  <th className="pb-1 font-normal">Ref</th>
                </tr>
              </thead>
              <tbody>
                {meta.rows.slice(0, visibleRows).map((row, i) => (
                  <tr key={i} className={cn(
                    'border-b border-border/30 transition-all duration-100',
                    row.flag ? 'bg-court-red/10 text-court-white' : 'text-court-grey hover:text-court-white/80'
                  )}>
                    <td className="pr-3 py-1">{row.date}</td>
                    <td className="pr-3 py-1">{row.type}</td>
                    <td className="pr-3 py-1 font-bold">{row.amount}</td>
                    <td className="pr-3 py-1">{row.currency}</td>
                    <td className="pr-3 py-1 truncate max-w-[80px]">{row.from}</td>
                    <td className="pr-3 py-1 truncate max-w-[80px]">{row.to}</td>
                    <td className="py-1 flex items-center gap-1">
                      {row.ref}
                      {row.flag && <AlertTriangle size={9} className="text-court-red shrink-0" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {visibleRows < meta.rows.length && (
              <div className="text-court-gold/50 text-[9px] mt-1 flex items-center gap-1">
                <span className="inline-block w-1.5 h-3 bg-court-gold/50 animate-cursor" />
                loading records...
              </div>
            )}
          </div>

          {meta.summary && visibleRows >= meta.rows.length && (
            <div className="border-t border-border pt-2 text-[10px] text-court-gold/80 flex items-start gap-1.5">
              <AlertTriangle size={10} className="text-court-red shrink-0 mt-0.5" />
              {meta.summary}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
