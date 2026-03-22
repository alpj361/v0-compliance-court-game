'use client'

/**
 * LegalTextRenderer — renders evidence as an official legal gazette / regulation document.
 * Parchment-style paper with header seal, scrollable body, drag-to-read feel.
 */

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { LegalTextMeta } from '@/lib/gameData'
import { ScrollText, ChevronDown, ChevronUp } from 'lucide-react'

interface LegalTextRendererProps {
  meta: LegalTextMeta
  onRead?: () => void
}

export function LegalTextRenderer({ meta, onRead }: LegalTextRendererProps) {
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
          ? 'border-court-gold/60 bg-[#12100a] shadow-[0_0_24px_rgba(212,160,23,0.10)]'
          : 'border-border bg-court-navy-light hover:border-court-gold/30 cursor-pointer'
      )}
    >
      {/* Document spine / header */}
      <button
        className="w-full flex items-start gap-3 px-4 py-3 text-left"
        onClick={() => (opened ? setOpened(false) : handleOpen())}
      >
        <div
          className={cn(
            'shrink-0 mt-0.5 p-2 rounded-sm transition-colors',
            opened ? 'bg-court-gold/20 text-court-gold' : 'bg-secondary text-muted-foreground'
          )}
        >
          <ScrollText size={14} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className={cn('text-xs font-serif font-semibold', opened ? 'text-court-gold' : 'text-foreground')}>
              {meta.docTitle}
            </span>
            {opened
              ? <ChevronUp size={14} className="text-muted-foreground shrink-0" />
              : <ChevronDown size={14} className="text-muted-foreground shrink-0" />
            }
          </div>
          <p className="text-[11px] text-muted-foreground font-mono mt-0.5">{meta.source}</p>
          <p className="text-[10px] text-court-gold/60 font-mono mt-0.5 tracking-wide">{meta.articleRef}</p>
        </div>
      </button>

      {/* Expanded — parchment paper style */}
      {opened && (
        <div className="border-t border-court-gold/20">
          {/* Official header seal area */}
          <div className="px-6 py-4 bg-[#0e0c07] border-b border-court-gold/10 text-center space-y-1">
            <div className="w-10 h-10 mx-auto rounded-full border-2 border-court-gold/40 flex items-center justify-center mb-2">
              <ScrollText size={16} className="text-court-gold/60" />
            </div>
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-court-gold/50">
              {meta.source}
            </p>
            <p className="text-xs font-serif font-bold text-court-gold/80 text-balance">{meta.docTitle}</p>
            <p className="text-[10px] font-mono text-court-gold/60 tracking-wider mt-1">{meta.articleRef}</p>
          </div>

          {/* Body text — scrollable */}
          <div
            className="px-6 py-5 max-h-72 overflow-y-auto scrollbar-thin"
            style={{ scrollbarColor: 'rgba(212,160,23,0.3) transparent' }}
          >
            {meta.fullText.split('\n\n').map((para, i) => (
              <p key={i} className="text-sm font-serif text-[#d4c9a8]/90 leading-relaxed mb-4 text-pretty">
                {para}
              </p>
            ))}
          </div>

          <div className="px-6 py-2 border-t border-court-gold/10 flex items-center justify-end">
            <span className="text-[9px] font-mono tracking-widest text-court-gold/30 uppercase">
              Official Document — Evidence File
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
