'use client'

/**
 * PaperDocRenderer — renders evidence as a physical paper document.
 * Slight paper texture, signature line, drag-to-read full content.
 * Lines animate in one-by-one (like a scouting report printing) when opened.
 */

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { PaperDocMeta } from '@/lib/gameData'
import { FileText, ChevronDown, ChevronUp, PenLine } from 'lucide-react'

interface PaperDocRendererProps {
  meta: PaperDocMeta
  isKey?: boolean
  onRead?: () => void
}

export function PaperDocRenderer({ meta, isKey, onRead }: PaperDocRendererProps) {
  const [opened, setOpened] = useState(false)
  const [visibleLines, setVisibleLines] = useState(0)

  const bodyLines = meta.body.split('\n')

  useEffect(() => {
    if (!opened) {
      setVisibleLines(0)
      return
    }
    setVisibleLines(0)
    let current = 0
    const id = setInterval(() => {
      current += 1
      setVisibleLines(current)
      if (current >= bodyLines.length) {
        clearInterval(id)
      }
    }, 55)
    return () => clearInterval(id)
  }, [opened, bodyLines.length])

  // Fire onRead once all lines are visible
  useEffect(() => {
    if (opened && visibleLines >= bodyLines.length && bodyLines.length > 0) {
      onRead?.()
    }
  }, [opened, visibleLines, bodyLines.length, onRead])

  function handleOpen() {
    setOpened(true)
  }

  return (
    <div
      className={cn(
        'w-full rounded-sm border transition-all duration-300 overflow-hidden',
        opened
          ? 'border-court-white/20 shadow-[4px_4px_0_rgba(0,0,0,0.4),0_0_20px_rgba(240,237,230,0.04)]'
          : 'border-border bg-court-navy-light hover:border-court-white/10 cursor-pointer',
        isKey && !opened && 'border-court-gold/40'
      )}
      style={opened ? { background: 'linear-gradient(180deg, #f5f0e8 0%, #ede8d8 100%)' } : {}}
    >
      {/* Doc header */}
      <button
        className={cn(
          'w-full flex items-start gap-3 px-4 py-3 text-left',
          opened ? 'bg-transparent' : ''
        )}
        onClick={() => (opened ? setOpened(false) : handleOpen())}
      >
        <div
          className={cn(
            'shrink-0 mt-0.5 p-2 rounded-sm transition-colors',
            opened ? 'bg-[#8a7a60]/20 text-[#4a3820]' : isKey ? 'bg-court-gold/20 text-court-gold' : 'bg-secondary text-muted-foreground'
          )}
        >
          <FileText size={14} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className={cn('text-xs font-serif font-semibold', opened ? 'text-[#2a1e0e]' : 'text-foreground')}>
              {meta.docType}
            </span>
            {opened
              ? <ChevronUp size={14} className="text-[#8a7a60] shrink-0" />
              : <ChevronDown size={14} className="text-muted-foreground shrink-0" />
            }
          </div>
          <p className={cn('text-[11px] font-mono mt-0.5', opened ? 'text-[#5a4a38]' : 'text-muted-foreground')}>
            {meta.date}
          </p>
        </div>
      </button>

      {/* Expanded — paper document */}
      {opened && (
        <div className="border-t border-[#c8b89a]/40">
          {/* Parties line */}
          <div className="px-6 py-3 border-b border-[#c8b89a]/30 bg-[#ece5d0]/50">
            <p className="text-[11px] font-mono text-[#5a4a38] tracking-wide uppercase">
              {meta.parties.join(' / ')}
            </p>
          </div>

          {/* Body — lines animate in one-by-one */}
          <div
            className="px-6 py-5 max-h-64 overflow-y-auto"
            style={{ scrollbarColor: 'rgba(90,74,56,0.3) transparent' }}
          >
            {bodyLines.slice(0, visibleLines).map((line, i) => (
              line === ''
                ? <div key={i} className="h-3" />
                : <p
                    key={i}
                    className={cn(
                      'text-sm font-serif text-[#2a1e0e] leading-relaxed text-pretty transition-opacity duration-150',
                      line.match(/^(PASO|INCIDENTE|PASO \d|STEP|CLÁUSULA|CONDICIONES|DEMANDA|PREGUNTA|NOTA|HISTORIAL|SALIDA|CONCLUSIÓN|CLUB|RESULTADO)/) && 'font-semibold text-[#1a0e00]'
                    )}
                  >
                    {line}
                  </p>
            ))}
            {visibleLines < bodyLines.length && (
              <span className="inline-block w-2 h-3 bg-[#8a7a60]/70 animate-pulse mt-1" />
            )}
          </div>

          {/* Signature area */}
          {meta.signature && visibleLines >= bodyLines.length && (
            <div className="px-6 py-4 border-t border-[#c8b89a]/40 bg-[#ece5d0]/30">
              <div className="flex items-end gap-8 flex-wrap">
                <div>
                  <div className="font-serif italic text-lg text-[#2a1e0e]/80 leading-none mb-1">
                    {meta.signature}
                  </div>
                  <div className="h-px w-36 bg-[#5a4a38]/40" />
                  <div className="flex items-center gap-1 mt-1">
                    <PenLine size={10} className="text-[#5a4a38]/60" />
                    <p className="text-[10px] font-mono text-[#5a4a38]/70">
                      Firmado: {meta.signatureDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
