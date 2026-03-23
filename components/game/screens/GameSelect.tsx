'use client'

import { cn } from '@/lib/utils'
import type { GameAction } from '@/lib/gameEngine'
import type { GameId } from '@/lib/gameData'
import { Scale, Footprints } from 'lucide-react'

interface GameSelectProps {
  dispatch: React.Dispatch<GameAction>
}

interface GameCard {
  id: GameId
  title: string
  subtitle: string
  description: string
  casesAvailable: string
  theme: 'gold' | 'green'
  isNew?: boolean
  Icon: React.ElementType
}

const GAMES: GameCard[] = [
  {
    id: 'compliance-court',
    title: 'COMPLIANCE COURT',
    subtitle: 'Banking Law — Guatemala & Canada',
    description:
      'Two cases. Two sides of the same compliance failure. One pattern you might recognize in yourself. Play as Prosecutor and Defense Attorney.',
    casesAvailable: '2 casos disponibles',
    theme: 'gold',
    Icon: Scale,
  },
  {
    id: 'on-the-field',
    title: 'ON THE FIELD',
    subtitle: 'Football Leadership — Guatemala',
    description:
      'El vestuario está en crisis. Un delantero estrella se niega a jugar. El alcalde presiona. Tienes 15 minutos para resolverlo.',
    casesAvailable: '1 caso disponible',
    theme: 'green',
    isNew: true,
    Icon: Footprints,
  },
]

export function GameSelect({ dispatch }: GameSelectProps) {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-16 gap-10">
      {/* Header */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="text-[10px] font-mono tracking-[0.4em] uppercase text-muted-foreground border border-border px-4 py-1">
          Training Series
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-court-white text-balance">
          Selecciona tu Juego
        </h1>
        <p className="text-court-grey text-sm max-w-md font-sans leading-relaxed">
          Cada juego explora un dominio diferente del liderazgo y la toma de decisiones bajo presión.
        </p>
      </div>

      {/* Game cards */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl">
        {GAMES.map((game) => (
          <button
            key={game.id}
            onClick={() => dispatch({ type: 'SELECT_GAME', payload: game.id })}
            className={cn(
              'flex-1 text-left rounded-sm border p-6 transition-all duration-200',
              'flex flex-col gap-4 group cursor-pointer',
              game.theme === 'gold'
                ? 'border-court-gold/40 bg-court-navy-mid hover:border-court-gold hover:shadow-[0_0_24px_rgba(212,160,23,0.15)]'
                : 'border-green-600/40 bg-court-navy-mid hover:border-green-500 hover:shadow-[0_0_24px_rgba(34,197,94,0.15)]'
            )}
          >
            {/* Top row: icon + badge */}
            <div className="flex items-start justify-between">
              <div
                className={cn(
                  'p-2.5 rounded-sm',
                  game.theme === 'gold' ? 'bg-court-gold/15 text-court-gold' : 'bg-green-700/20 text-green-400'
                )}
              >
                <game.Icon size={22} />
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className="text-[9px] font-mono tracking-widest uppercase text-muted-foreground">
                  {game.casesAvailable}
                </span>
                {game.isNew && (
                  <span className="text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 bg-green-900/40 text-green-400 border border-green-600/40 rounded-[2px]">
                    NUEVO
                  </span>
                )}
              </div>
            </div>

            {/* Title block */}
            <div>
              <h2
                className={cn(
                  'font-serif text-2xl font-bold leading-tight',
                  game.theme === 'gold' ? 'text-court-gold' : 'text-green-400'
                )}
              >
                {game.title}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5 font-mono">{game.subtitle}</p>
            </div>

            {/* Description */}
            <p className="text-sm text-foreground/75 leading-relaxed font-sans flex-1">
              {game.description}
            </p>

            {/* CTA */}
            <div
              className={cn(
                'text-xs font-serif mt-auto transition-colors',
                game.theme === 'gold'
                  ? 'text-court-gold/70 group-hover:text-court-gold'
                  : 'text-green-500/70 group-hover:text-green-400'
              )}
            >
              Jugar &rarr;
            </div>
          </button>
        ))}
      </div>

      <p className="text-[10px] font-mono text-muted-foreground text-center max-w-sm">
        Tu progreso en cada juego se guarda por separado
      </p>
    </div>
  )
}
