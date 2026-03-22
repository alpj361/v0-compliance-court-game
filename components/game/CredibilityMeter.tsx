'use client'

import { cn } from '@/lib/utils'

interface CredibilityMeterProps {
  value: number   // 0–100
  isHit?: boolean
}

export function CredibilityMeter({ value, isHit }: CredibilityMeterProps) {
  const color =
    value > 60 ? 'bg-court-gold' :
    value > 30 ? 'bg-amber-500' :
    'bg-court-red'

  const segments = Array.from({ length: 10 }, (_, i) => {
    const threshold = (i + 1) * 10
    return threshold <= value
  })

  return (
    <div className={cn('flex flex-col items-end gap-1', isHit && 'animate-credibility-hit')}>
      <div className="text-[10px] font-serif tracking-[0.2em] uppercase text-court-grey">
        Credibility
      </div>
      <div className="flex gap-0.5">
        {segments.map((filled, i) => (
          <div
            key={i}
            className={cn(
              'h-4 w-3 rounded-[2px] transition-all duration-300',
              filled ? color : 'bg-court-navy-light border border-border'
            )}
          />
        ))}
      </div>
      <div
        className={cn(
          'text-xs font-mono tabular-nums',
          value > 60 ? 'text-court-gold' :
          value > 30 ? 'text-amber-500' :
          'text-court-red'
        )}
      >
        {value}%
      </div>
    </div>
  )
}
