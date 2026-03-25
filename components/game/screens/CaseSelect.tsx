'use client'

import { cn } from '@/lib/utils'
import { COMPLIANCE_CASES } from '@/lib/gameData'
import { OTF_CASES } from '@/lib/otfGameData'
import type { GameAction } from '@/lib/gameEngine'
import type { GameState } from '@/lib/gameEngine'
import { Scale, Shield, Footprints } from 'lucide-react'

interface CaseSelectProps {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

export function CaseSelect({ state, dispatch }: CaseSelectProps) {
  const currentGame = state.currentGame ?? 'compliance-court'
  const isOTF = currentGame === 'on-the-field'
  const gameCases = isOTF ? OTF_CASES : COMPLIANCE_CASES

  function isComplete(caseId: string): boolean {
    if (caseId === 'case-1') return state.case1Complete
    if (caseId === 'case-2') return state.case2Complete
    if (caseId === 'otf-1') return state.otf1Complete
    if (caseId === 'otf-2') return state.otf2Complete
    return false
  }

  function isLocked(caseId: string, idx: number): boolean {
    // CC: Case 2 locked until case 1 complete
    if (!isOTF && idx === 1 && !state.case1Complete) return true
    return false
  }

  function getCaseIcon(caseId: string) {
    if (caseId === 'case-1') return Scale
    if (caseId === 'case-2') return Shield
    return Footprints
  }

  function getCtaLabel(c: typeof gameCases[0]) {
    return c.vocab?.trialLabel ?? 'Enter Courtroom'
  }

  const accentColor = isOTF ? 'text-green-400' : 'text-court-gold'
  const accentBorder = isOTF ? 'border-green-600/40' : 'border-court-gold/40'
  const accentBorderHover = isOTF
    ? 'border-green-600/50 bg-court-navy-mid hover:border-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]'
    : 'border-court-gold/50 bg-court-navy-mid hover:border-court-gold hover:shadow-[0_0_20px_rgba(212,160,23,0.15)]'
  const accentIconBg = isOTF ? 'bg-green-700/20 text-green-400' : 'bg-court-gold/20 text-court-gold'

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-12 gap-10">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <div className={cn('text-[10px] font-mono tracking-[0.35em] uppercase border px-4 py-1', accentColor, accentBorder)}>
          {isOTF ? 'Selección de Caso' : 'Case Docket'}
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-court-white mt-2 text-balance">
          {isOTF ? 'Selecciona el Caso' : 'Select Your Case'}
        </h2>
        {!isOTF && (
          <p className="text-court-grey text-sm max-w-md text-balance font-sans leading-relaxed mt-1">
            Each case explores the same compliance failure from a different angle. Complete Case 1 first.
          </p>
        )}
      </div>

      {/* Cases */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl">
        {gameCases.map((c, idx) => {
          const locked = isLocked(c.id, idx)
          const complete = isComplete(c.id)
          const Icon = getCaseIcon(c.id)

          return (
            <button
              key={c.id}
              disabled={locked}
              onClick={() => dispatch({ type: 'SELECT_CASE', payload: c })}
              className={cn(
                'flex-1 text-left rounded-sm border p-6 transition-all duration-200',
                'flex flex-col gap-4',
                locked
                  ? 'border-border bg-court-navy-mid opacity-50 cursor-not-allowed'
                  : cn(accentBorderHover, 'cursor-pointer'),
                complete && 'border-green-600/60'
              )}
            >
              <div className="flex items-start justify-between">
                <div className={cn('p-2 rounded-sm', locked ? 'bg-secondary text-muted-foreground' : accentIconBg)}>
                  <Icon size={22} />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-muted-foreground">
                    Caso {idx + 1} de {gameCases.length}
                  </span>
                  {complete && (
                    <span className="text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 bg-green-900/40 text-green-400 border border-green-600/40 rounded-[2px]">
                      Completado
                    </span>
                  )}
                  {locked && (
                    <span className="text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 bg-secondary text-muted-foreground border border-border rounded-[2px]">
                      Bloqueado
                    </span>
                  )}
                </div>
              </div>

              <div>
                <div className={cn('text-[10px] font-mono tracking-widest uppercase mb-1', accentColor)}>
                  {c.roleLabel}
                </div>
                <h3 className="font-serif text-xl font-bold text-court-white leading-tight">
                  {c.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 font-mono">{c.subtitle}</p>
              </div>

              <p className="text-sm text-foreground/80 leading-relaxed font-sans line-clamp-3">
                {c.briefing}
              </p>

              {!locked && (
                <div className={cn('text-xs font-serif mt-auto', accentColor)}>
                  {getCtaLabel(c)} &rarr;
                </div>
              )}
              {locked && (
                <div className="text-xs font-mono text-muted-foreground mt-auto">
                  Completa el Caso 1 para desbloquear
                </div>
              )}
            </button>
          )
        })}
      </div>

      <button
        onClick={() => dispatch({ type: 'GO_TO_MAIN_MENU' })}
        className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono tracking-wider uppercase"
      >
        &larr; Main Menu
      </button>
    </div>
  )
}
