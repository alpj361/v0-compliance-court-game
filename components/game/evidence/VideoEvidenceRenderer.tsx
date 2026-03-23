'use client'

// ── VideoEvidenceRenderer ─────────────────────────────────────────────────────
// Renders a video evidence card in the Court Record / Expediente.
// Shows a thumbnail/header collapsed by default; expands to inline video player.

import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import type { VideoMeta } from '@/lib/gameData'
import { PlayCircle, ChevronDown, ChevronUp, Video } from 'lucide-react'

interface VideoRendererProps {
  meta: VideoMeta
  isKey?: boolean
  onRead?: () => void
}

export function VideoRenderer({ meta, isKey, onRead }: VideoRendererProps) {
  const [opened, setOpened] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  function handleToggle() {
    setOpened((o) => !o)
    if (!opened) {
      // Mark as read when opened
      onRead?.()
    } else {
      // Pause when collapsing
      videoRef.current?.pause()
    }
  }

  return (
    <div
      className={cn(
        'w-full rounded-sm border transition-all duration-300 overflow-hidden',
        opened
          ? 'border-amber-700/50 bg-zinc-950'
          : 'border-border bg-court-navy-light hover:border-amber-700/40 cursor-pointer',
      )}
    >
      {/* Header / collapsed state */}
      <button
        className="w-full flex items-start gap-3 px-4 py-3 text-left"
        onClick={handleToggle}
      >
        <div className="mt-0.5 flex-shrink-0">
          <div className={cn(
            'w-8 h-8 rounded flex items-center justify-center',
            opened ? 'bg-amber-700/30' : 'bg-amber-900/20',
          )}>
            {opened
              ? <ChevronUp size={16} className="text-amber-400" />
              : <PlayCircle size={16} className="text-amber-400" />
            }
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <Video size={10} className="text-amber-500/70 shrink-0" />
            <span className="text-[9px] font-mono tracking-widest uppercase text-amber-500/70">
              Video — Asesor Legal
            </span>
            {isKey && (
              <span className="text-[8px] font-mono bg-court-gold text-court-navy px-1 rounded-[2px] font-bold">
                KEY
              </span>
            )}
          </div>
          <p className="text-sm font-sans text-foreground/90 leading-snug truncate">
            {meta.title}
          </p>
          {meta.description && !opened && (
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug line-clamp-2">
              {meta.description}
            </p>
          )}
        </div>

        <div className="shrink-0 ml-2">
          {opened
            ? <ChevronUp size={14} className="text-muted-foreground" />
            : <ChevronDown size={14} className="text-muted-foreground" />
          }
        </div>
      </button>

      {/* Expanded video player */}
      {opened && (
        <div className="px-4 pb-4 space-y-2">
          {meta.description && (
            <p className="text-xs text-zinc-400 leading-relaxed">
              {meta.description}
            </p>
          )}
          <div className="rounded overflow-hidden border border-amber-700/30 bg-black">
            <video
              ref={videoRef}
              src={meta.src}
              poster={meta.poster}
              controls
              className="w-full max-h-64 object-contain"
              onPlay={() => onRead?.()}
            >
              Tu navegador no soporta reproducción de video.
            </video>
          </div>
        </div>
      )}
    </div>
  )
}
