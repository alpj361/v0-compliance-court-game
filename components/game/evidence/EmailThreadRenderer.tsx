'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { EmailThreadMeta } from '@/lib/gameData'
import { Mail, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'

interface EmailThreadRendererProps {
  meta: EmailThreadMeta
  onRead?: () => void
}

export function EmailThreadRenderer({ meta, onRead }: EmailThreadRendererProps) {
  const [expanded, setExpanded] = useState(false)
  const [openEmailIds, setOpenEmailIds] = useState<Set<string>>(new Set())

  function handleExpand() {
    if (!expanded) onRead?.()
    setExpanded(!expanded)
  }

  function toggleEmail(id: string) {
    setOpenEmailIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const highlightedCount = meta.emails.filter(e => e.isHighlighted).length

  return (
    <div className={cn(
      'font-mono text-xs rounded-sm border transition-all duration-200',
      expanded
        ? 'border-court-gold/50 bg-[#0d1505]'
        : 'border-border bg-court-navy-light hover:border-court-gold/30'
    )}>
      {/* Thread header */}
      <button
        onClick={handleExpand}
        className="w-full flex items-start gap-3 px-3 py-2.5 text-left"
      >
        <Mail size={14} className={cn('mt-0.5 shrink-0', expanded ? 'text-court-gold' : 'text-court-grey')} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className={cn('font-bold truncate', expanded ? 'text-court-gold' : 'text-court-white/80')}>
              {meta.subject}
            </span>
            <span className="text-court-grey text-[10px] shrink-0">
              {meta.emails.length} mensaje{meta.emails.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="text-court-grey truncate">
            {meta.participants.join(' · ')}
          </div>
        </div>
        {highlightedCount > 0 && (
          <div className="shrink-0 flex items-center gap-1 text-amber-400 text-[9px]">
            <AlertCircle size={10} />
            <span>{highlightedCount}</span>
          </div>
        )}
        {expanded
          ? <ChevronUp size={12} className="text-court-grey shrink-0 mt-0.5" />
          : <ChevronDown size={12} className="text-court-grey shrink-0 mt-0.5" />
        }
      </button>

      {/* Thread body */}
      {expanded && (
        <div className="border-t border-court-gold/20 flex flex-col divide-y divide-border">
          {meta.emails.map((email, idx) => {
            const isOpen = openEmailIds.has(email.id)
            return (
              <div
                key={email.id}
                className={cn(
                  'transition-colors',
                  email.isHighlighted ? 'bg-amber-900/10' : ''
                )}
              >
                <button
                  onClick={() => toggleEmail(email.id)}
                  className="w-full flex items-start gap-2 px-3 py-2 text-left hover:bg-court-navy-light/50"
                >
                  {/* Thread depth indicator */}
                  {idx > 0 && (
                    <div className="shrink-0 w-3 flex justify-center">
                      <div className="w-px h-full bg-border" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={cn(
                        'font-bold truncate',
                        email.isHighlighted ? 'text-amber-300' : 'text-court-white/80'
                      )}>
                        {email.from.split('<')[0].trim()}
                      </span>
                      <span className="text-court-grey text-[9px] shrink-0">{email.date}</span>
                    </div>
                    <div className="text-court-grey truncate text-[10px]">
                      {email.body.split('\n')[0].slice(0, 80)}
                      {email.body.length > 80 ? '…' : ''}
                    </div>
                    {email.isHighlighted && email.highlightNote && (
                      <div className="flex items-center gap-1 mt-0.5 text-amber-400 text-[9px]">
                        <AlertCircle size={9} />
                        <span>{email.highlightNote}</span>
                      </div>
                    )}
                  </div>
                  {isOpen
                    ? <ChevronUp size={11} className="text-court-grey shrink-0 mt-0.5" />
                    : <ChevronDown size={11} className="text-court-grey shrink-0 mt-0.5" />
                  }
                </button>

                {/* Expanded individual email */}
                {isOpen && (
                  <div className={cn(
                    'mx-3 mb-2 rounded-sm border px-3 py-2.5',
                    email.isHighlighted
                      ? 'border-amber-500/30 bg-amber-900/5'
                      : 'border-border bg-court-navy/50'
                  )}>
                    {/* Headers */}
                    <div className="text-[10px] text-court-grey space-y-0.5 border-b border-border pb-2 mb-2">
                      <div><span className="text-court-gold/60">De:</span> {email.from}</div>
                      <div><span className="text-court-gold/60">Para:</span> {email.to}</div>
                      <div><span className="text-court-gold/60">Fecha:</span> {email.date}</div>
                    </div>
                    {/* Body */}
                    <div className={cn(
                      'leading-relaxed whitespace-pre-wrap text-[10px]',
                      email.isHighlighted ? 'text-amber-100/80' : 'text-court-white/80'
                    )}>
                      {email.body}
                    </div>
                    {email.isHighlighted && email.highlightNote && (
                      <div className="mt-2 flex items-start gap-1.5 text-amber-400 text-[9px] border-t border-amber-500/20 pt-2">
                        <AlertCircle size={10} className="shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{email.highlightNote}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
