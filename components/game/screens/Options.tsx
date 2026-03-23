'use client'

import { cn } from '@/lib/utils'
import type { GameState, GameAction } from '@/lib/gameEngine'
import { CheckSquare, Square, Trash2, ArrowLeft, RotateCcw } from 'lucide-react'

interface OptionsProps {
  state: GameState
  dispatch: React.Dispatch<GameAction>
  onClearSave: () => void
}

export function Options({ state, dispatch, onClearSave }: OptionsProps) {
  function toggleCase(caseId: 'case-1' | 'case-2', current: boolean) {
    dispatch({ type: 'SET_CASE_COMPLETE', payload: { caseId, complete: !current } })
  }

  function handleResetProgress() {
    dispatch({ type: 'SET_CASE_COMPLETE', payload: { caseId: 'case-1', complete: false } })
    dispatch({ type: 'SET_CASE_COMPLETE', payload: { caseId: 'case-2', complete: false } })
    onClearSave()
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-16 gap-10">

      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="text-[10px] font-mono tracking-[0.4em] uppercase text-court-gold border border-court-gold/40 px-4 py-1">
          Configuración
        </div>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-court-white mt-2">
          Opciones
        </h2>
        <div className="w-32 h-px bg-court-gold/40 mt-1" />
      </div>

      {/* Progress section */}
      <div className="max-w-md w-full flex flex-col gap-4">
        <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-court-grey border-b border-border pb-2">
          Progreso — Casos
        </div>

        {/* Case 1 */}
        <button
          onClick={() => toggleCase('case-1', state.case1Complete)}
          className={cn(
            'flex items-center justify-between px-4 py-4 rounded-sm border transition-all duration-150',
            state.case1Complete
              ? 'border-court-gold/60 bg-court-gold/10'
              : 'border-border bg-court-navy-light hover:border-court-grey'
          )}
        >
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-sm font-mono tracking-wider text-court-white">Caso 1</span>
            <span className="text-[10px] font-sans text-muted-foreground">
              El Agente Demasiado Seguro
            </span>
          </div>
          {state.case1Complete ? (
            <CheckSquare size={18} className="text-court-gold shrink-0" />
          ) : (
            <Square size={18} className="text-muted-foreground shrink-0" />
          )}
        </button>

        {/* Case 2 */}
        <button
          onClick={() => toggleCase('case-2', state.case2Complete)}
          className={cn(
            'flex items-center justify-between px-4 py-4 rounded-sm border transition-all duration-150',
            state.case2Complete
              ? 'border-court-gold/60 bg-court-gold/10'
              : 'border-border bg-court-navy-light hover:border-court-grey'
          )}
        >
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-sm font-mono tracking-wider text-court-white">Caso 2</span>
            <span className="text-[10px] font-sans text-muted-foreground">
              La Defensa del Sistema
            </span>
          </div>
          {state.case2Complete ? (
            <CheckSquare size={18} className="text-court-gold shrink-0" />
          ) : (
            <Square size={18} className="text-muted-foreground shrink-0" />
          )}
        </button>

        <p className="text-[10px] font-mono text-muted-foreground text-center mt-1">
          Toca un caso para marcar/desmarcar su completado
        </p>
      </div>

      {/* Reset section */}
      <div className="max-w-md w-full flex flex-col gap-3">
        <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-court-grey border-b border-border pb-2">
          Datos
        </div>
        <button
          onClick={handleResetProgress}
          className={cn(
            'flex items-center justify-center gap-2 px-6 py-3 w-full',
            'border border-court-red/40 text-court-red/80 font-mono text-xs tracking-widest uppercase',
            'hover:border-court-red hover:text-court-red hover:bg-court-red/5',
            'transition-all duration-150'
          )}
        >
          <Trash2 size={13} />
          Reiniciar todo el progreso
        </button>
        <p className="text-[10px] font-mono text-muted-foreground text-center">
          Borra casos completados y partida guardada
        </p>
      </div>

      {/* Back */}
      <button
        onClick={() => dispatch({ type: 'GO_TO_MAIN_MENU' })}
        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono tracking-wider uppercase"
      >
        <ArrowLeft size={13} />
        Volver al menú
      </button>
    </div>
  )
}
