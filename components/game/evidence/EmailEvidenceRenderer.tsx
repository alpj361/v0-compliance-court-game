'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { EmailMeta } from '@/lib/gameData'
import { Mail, ChevronDown, ChevronUp } from 'lucide-react'

interface EmailRendererProps {
  meta: EmailMeta
  onRead?: () => void
}

export function EmailRenderer({ meta, onRead }: EmailRendererProps) {
  const [opened, setOpened] = useState(false)
  const [visibleLines, setVisibleLines] = useState(0)
  // Split body string into paragraph lines for animation
  const lines = meta.body.split('\n')

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
    }, 70)
    return () => clearInterval(id)
  }, [opened, lines.length])

  // Fire onRead only after animation finishes — in a separate effect, never inside setState
  useEffect(() => {
    if (opened && visibleLines >= lines.length && lines.length > 0) {
      onRead?.()
    }
  }, [opened, visibleLines, lines.length, onRead])

  return (
    <div className={cn(
      'font-mono text-xs rounded-sm border transition-all duration-200',
      opened ? 'border-court-gold/50 bg-[#0d1f0d]' : 'border-border bg-court-navy-light hover:border-court-gold/30'
    )}>
      {/* Email header row */}
      <button
        onClick={() => setOpened(!opened)}
        className="w-full flex items-start gap-3 px-3 py-2.5 text-left"
      >
        <Mail size={14} className={cn('mt-0.5 shrink-0', opened ? 'text-court-gold' : 'text-court-grey')} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className={cn('font-bold truncate', opened ? 'text-court-gold' : 'text-court-white/80')}>
              {meta.from}
            </span>
            <span className="text-court-grey shrink-0 text-[10px]">{meta.date}</span>
          </div>
          <div className={cn('truncate', opened ? 'text-court-white/90' : 'text-court-grey')}>
            {meta.subject}
          </div>
        </div>
        {opened ? <ChevronUp size={12} className="text-court-grey shrink-0 mt-0.5" /> : <ChevronDown size={12} className="text-court-grey shrink-0 mt-0.5" />}
      </button>

      {/* Expanded body */}
      {opened && (
        <div className="border-t border-court-gold/20 px-3 py-3 flex flex-col gap-2">
          {/* Headers */}
          <div className="text-[10px] text-court-grey space-y-0.5 border-b border-border pb-2">
            <div><span className="text-court-gold/60">From:</span> {meta.from}</div>
            <div><span className="text-court-gold/60">To:</span> {meta.to}</div>
            <div><span className="text-court-gold/60">Subject:</span> {meta.subject}</div>
            <div><span className="text-court-gold/60">Date:</span> {meta.date}</div>
          </div>

          {/* Body lines animate in */}
          <div className="text-court-white/85 leading-relaxed space-y-1">
            {lines.slice(0, visibleLines).map((line, i) => (
              <p key={i} className={cn('transition-opacity duration-200', line === '' ? 'h-2' : '')}>
                {line}
              </p>
            ))}
            {visibleLines < lines.length && (
              <span className="inline-block w-2 h-3 bg-court-gold/70 animate-cursor" />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
