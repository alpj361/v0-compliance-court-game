'use client'

import { cn } from '@/lib/utils'
import type { GameState, GameAction } from '@/lib/gameEngine'
import type { VerdictData } from '@/lib/gameData'
import { Gavel, BookOpen, RotateCcw } from 'lucide-react'

interface VerdictScreenProps {
  state: GameState
  dispatch: React.Dispatch<GameAction>
  verdictData: VerdictData | null | undefined
}

const OUTCOME_CONFIG = {
  guilty: {
    label: 'CULPABLE',
    headerColor: 'text-court-red',
    bannerBg: 'bg-court-red/10 border-court-red/40',
    icon: Gavel,
    courtRules: 'El Tribunal Declara',
  },
  'guilty-reduced': {
    label: 'CULPABLE',
    headerColor: 'text-orange-400',
    bannerBg: 'bg-orange-900/20 border-orange-600/40',
    icon: Gavel,
    courtRules: 'El Tribunal Declara — Con Atenuantes',
  },
  acquitted: {
    label: 'ABSUELTO',
    headerColor: 'text-green-400',
    bannerBg: 'bg-green-900/20 border-green-600/40',
    icon: Gavel,
    courtRules: 'El Tribunal Declara',
  },
  'null-trial': {
    label: 'JUICIO NULO',
    headerColor: 'text-court-grey',
    bannerBg: 'bg-court-navy-mid border-border',
    icon: RotateCcw,
    courtRules: 'El Tribunal Declara',
  },
  postponed: {
    label: 'POSTERGADO',
    headerColor: 'text-court-gold',
    bannerBg: 'bg-court-gold/10 border-court-gold/40',
    icon: BookOpen,
    courtRules: 'El Tribunal Levanta la Sesión',
  },
  lesson: {
    label: 'CASO CERRADO',
    headerColor: 'text-court-gold',
    bannerBg: 'bg-court-gold/10 border-court-gold/40',
    icon: BookOpen,
    courtRules: 'El Tribunal Declara',
  },
  // On the Field outcomes
  acuerdo: {
    label: 'ACUERDO',
    headerColor: 'text-green-400',
    bannerBg: 'bg-green-900/20 border-green-600/40',
    icon: BookOpen,
    courtRules: 'Resultado de la Negociación',
  },
  'tension-controlada': {
    label: 'TENSIÓN CONTROLADA',
    headerColor: 'text-amber-400',
    bannerBg: 'bg-amber-900/20 border-amber-600/40',
    icon: BookOpen,
    courtRules: 'Resultado de la Negociación',
  },
  sacrificio: {
    label: 'DECISIÓN DIFÍCIL',
    headerColor: 'text-orange-400',
    bannerBg: 'bg-orange-900/20 border-orange-600/40',
    icon: Gavel,
    courtRules: 'Resultado de la Negociación',
  },
  crisis: {
    label: 'CRISIS',
    headerColor: 'text-court-red',
    bannerBg: 'bg-court-red/10 border-court-red/40',
    icon: Gavel,
    courtRules: 'Resultado de la Negociación',
  },
  'sin-tiempo': {
    label: 'TIEMPO AGOTADO',
    headerColor: 'text-court-grey',
    bannerBg: 'bg-court-navy-mid border-border',
    icon: RotateCcw,
    courtRules: 'El Tiempo Expiró',
  },
  // OTF Case 2 — Comité de Ética outcomes
  'investigacion-abierta': {
    label: 'INVESTIGACIÓN ABIERTA',
    headerColor: 'text-green-400',
    bannerBg: 'bg-green-900/20 border-green-600/40',
    icon: BookOpen,
    courtRules: 'Resolución del Comité de Ética',
  },
  'revision-preliminar': {
    label: 'REVISIÓN PRELIMINAR',
    headerColor: 'text-amber-400',
    bannerBg: 'bg-amber-900/20 border-amber-600/40',
    icon: BookOpen,
    courtRules: 'Resolución del Comité de Ética',
  },
  'caso-archivado': {
    label: 'CASO ARCHIVADO',
    headerColor: 'text-court-grey',
    bannerBg: 'bg-court-navy-mid border-border',
    icon: RotateCcw,
    courtRules: 'Resolución del Comité de Ética',
  },
}

export function VerdictScreen({ state, dispatch, verdictData }: VerdictScreenProps) {
  if (!verdictData) return null

  const config = OUTCOME_CONFIG[verdictData.outcome]
  const Icon = config.icon

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-16 gap-8">
      {/* Verdict banner */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div className={cn('p-3 rounded-sm border', config.bannerBg)}>
          <Icon size={28} className={config.headerColor} />
        </div>
        <div className="text-[10px] font-mono tracking-[0.4em] uppercase text-muted-foreground">
          {config.courtRules}
        </div>
        <h2
          className={cn(
            'font-serif text-5xl md:text-6xl font-bold tracking-wide text-balance',
            config.headerColor
          )}
        >
          {config.label}
        </h2>
        <p className="text-court-grey text-sm font-mono">{verdictData.subtitle}</p>
      </div>

      <div className="w-48 h-px bg-court-gold/40" />

      {/* Lesson card */}
      <div className="max-w-2xl w-full rounded-sm border border-court-gold/50 bg-court-navy-mid p-6 md:p-8 flex flex-col gap-4">
        <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-court-gold border-b border-border pb-2 mb-1">
          {state.activeCase?.gameId === 'on-the-field' ? 'Lección de Liderazgo' : 'Lección de Cumplimiento'}
        </div>
        <h3 className="font-serif text-xl font-bold text-court-white leading-snug">
          {verdictData.lessonTitle}
        </h3>
        <div className="flex flex-col gap-3">
          {verdictData.lessonText.split('\n\n').map((para, i) => (
            <p key={i} className="text-foreground/85 leading-relaxed font-sans text-sm">
              {para}
            </p>
          ))}
        </div>
        <div className="mt-2 flex items-start gap-2 rounded-sm border border-border bg-court-navy-light px-3 py-2">
          <BookOpen size={13} className="text-court-gold shrink-0 mt-0.5" />
          <p className="text-xs font-mono text-muted-foreground">{verdictData.regulationRef}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* CC: Advance to Case 2 */}
        {state.activeCase?.id === 'case-1' && (
          <button
            onClick={() => dispatch({ type: 'GO_TO_DEBRIEF' })}
            className={cn(
              'px-8 py-4 font-serif font-bold text-base tracking-widest uppercase',
              'bg-court-gold text-court-navy border-2 border-court-gold-light',
              'hover:bg-court-gold-light hover:shadow-[0_0_20px_rgba(212,160,23,0.3)]',
              'transition-all duration-200 active:scale-95'
            )}
          >
            Continuar al Caso 2
          </button>
        )}
        {state.activeCase?.id === 'case-2' && (
          <button
            onClick={() => dispatch({ type: 'GO_TO_DEBRIEF' })}
            className={cn(
              'px-8 py-4 font-serif font-bold text-base tracking-widest uppercase',
              'bg-court-gold text-court-navy border-2 border-court-gold-light',
              'hover:bg-court-gold-light hover:shadow-[0_0_20px_rgba(212,160,23,0.3)]',
              'transition-all duration-200 active:scale-95'
            )}
          >
            Debrief Final
          </button>
        )}
        {/* OTF: Go to case select */}
        {state.activeCase?.gameId === 'on-the-field' && (
          <button
            onClick={() => dispatch({ type: 'GO_TO_CASE_SELECT' })}
            className={cn(
              'px-8 py-4 font-serif font-bold text-base tracking-widest uppercase',
              'bg-green-600 text-white border-2 border-green-400',
              'hover:bg-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]',
              'transition-all duration-200 active:scale-95'
            )}
          >
            Volver a Casos
          </button>
        )}
        <button
          onClick={() => dispatch({ type: 'RESTART_CASE' })}
          className={cn(
            'flex items-center gap-2 px-6 py-3 font-mono text-xs tracking-widest uppercase',
            'border border-border text-muted-foreground',
            'hover:border-court-grey hover:text-foreground',
            'transition-all duration-200'
          )}
        >
          <RotateCcw size={13} />
          Reintentar caso
        </button>
      </div>

      <button
        onClick={() => dispatch({ type: 'GO_TO_CASE_SELECT' })}
        className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono tracking-wider uppercase"
      >
        &larr; {state.activeCase?.gameId === 'on-the-field' ? 'Selección de Caso' : 'Case Select'}
      </button>
    </div>
  )
}
