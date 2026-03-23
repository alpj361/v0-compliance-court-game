'use client'

// ── Legal Advisor Button ──────────────────────────────────────────────────────
// Floating button shown during trial scenes. Opens a modal with the legal
// advisor's contextual hint for the current scene, and an optional video link.

import { useState } from 'react'
import { Scale, X, PlayCircle, BookOpenCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LegalAdvisorButtonProps {
  note: string            // contextual hint text for this scene
  videoUrl?: string       // optional video URL (placeholder until provided)
  className?: string
}

export function LegalAdvisorButton({ note, videoUrl, className }: LegalAdvisorButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg',
          'bg-amber-900/80 hover:bg-amber-800/90 border border-amber-600/60',
          'text-amber-100 text-xs font-semibold tracking-wide',
          'shadow-lg backdrop-blur-sm transition-all duration-150',
          'hover:scale-105 active:scale-95',
          className,
        )}
        title="Consultar al Asesor Legal"
      >
        <Scale className="w-4 h-4 text-amber-400 flex-shrink-0" />
        <span>Asesor Legal</span>
      </button>

      {/* Modal backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          {/* Modal panel */}
          <div
            className="relative w-full max-w-lg mx-4 rounded-xl border border-amber-700/60 bg-zinc-900/95 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-amber-700/30">
              <div className="flex items-center gap-2">
                <BookOpenCheck className="w-5 h-5 text-amber-400" />
                <h2 className="text-amber-100 font-bold tracking-wide text-sm uppercase">
                  Asesor Legal — Nota de Contexto
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-4 space-y-4">
              {/* Advisor note */}
              <p className="text-zinc-200 text-sm leading-relaxed whitespace-pre-line">
                {note}
              </p>

              {/* Video button */}
              <div className="pt-1">
                {videoUrl ? (
                  <a
                    href={videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-600 text-white text-sm font-semibold transition-colors"
                  >
                    <PlayCircle className="w-4 h-4" />
                    Ver Video Explicativo
                  </a>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-700/60 text-zinc-400 text-sm font-semibold cursor-not-allowed"
                    title="Video disponible próximamente"
                  >
                    <PlayCircle className="w-4 h-4" />
                    Ver Video Explicativo
                    <span className="text-xs ml-1 text-zinc-500">(próximamente)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 pb-4 pt-1">
              <button
                onClick={() => setOpen(false)}
                className="w-full py-2 rounded-lg border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 text-sm transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
