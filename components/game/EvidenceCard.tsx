'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { EvidenceCard as EvidenceCardType } from '@/lib/gameData'
import { FileText, ScrollText, BookOpen, MessageSquare } from 'lucide-react'

const TYPE_ICONS = {
  document:   FileText,
  record:     ScrollText,
  regulation: BookOpen,
  testimony:  MessageSquare,
}

const TYPE_LABELS = {
  document:   'Document',
  record:     'Record',
  regulation: 'Regulation',
  testimony:  'Testimony',
}

interface EvidenceCardProps {
  card: EvidenceCardType
  isReviewed?: boolean
  onReview?: (id: string) => void
}

export function EvidenceCard({ card, isReviewed, onReview }: EvidenceCardProps) {
  const [expanded, setExpanded] = useState(false)
  const Icon = TYPE_ICONS[card.type]

  function handleClick() {
    setExpanded(!expanded)
    if (!isReviewed) onReview?.(card.id)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      onClick={handleClick}
      className={cn(
        'relative rounded-sm border cursor-pointer transition-all duration-200',
        'animate-evidence-flip',
        card.isKey
          ? 'border-court-gold/70 bg-court-navy-mid shadow-[0_0_12px_rgba(212,160,23,0.15)]'
          : 'border-border bg-court-navy-light',
        isReviewed ? 'opacity-100' : 'opacity-80',
        'hover:border-court-gold/50 hover:shadow-[0_0_8px_rgba(212,160,23,0.1)]',
        'focus:outline-none focus:ring-2 focus:ring-court-gold/50'
      )}
    >
      <div className="flex items-start gap-3 p-3">
        <div
          className={cn(
            'shrink-0 mt-0.5 p-1.5 rounded-sm',
            card.isKey ? 'bg-court-gold/20 text-court-gold' : 'bg-secondary text-muted-foreground'
          )}
        >
          <Icon size={14} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-serif font-semibold text-foreground leading-tight">
              {card.title}
            </span>
            {card.isKey && (
              <span className="text-[9px] font-mono tracking-widest uppercase px-1 py-0.5 bg-court-gold/20 text-court-gold border border-court-gold/40 rounded-[2px]">
                KEY
              </span>
            )}
            {isReviewed && (
              <span className="text-[9px] font-mono tracking-widest uppercase px-1 py-0.5 bg-green-900/40 text-green-400 border border-green-600/40 rounded-[2px]">
                READ
              </span>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
            {card.description}
          </p>
          {expanded && (
            <p className="text-xs text-foreground/90 mt-2 leading-relaxed border-t border-border pt-2">
              {card.detail}
            </p>
          )}
        </div>
        <div className="shrink-0 text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
          {TYPE_LABELS[card.type]}
        </div>
      </div>
    </div>
  )
}
