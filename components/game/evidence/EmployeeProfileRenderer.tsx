'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { EmployeeProfileMeta } from '@/lib/gameData'
import { User, ChevronDown, ChevronUp, Clock, AlertTriangle, CheckCircle, Minus, Shield } from 'lucide-react'

interface EmployeeProfileRendererProps {
  meta: EmployeeProfileMeta
  onRead?: () => void
}

const statusLabels: Record<EmployeeProfileMeta['status'], string> = {
  active: 'Activo',
  suspended: 'Suspendido',
  'under-review': 'Bajo Revisión',
}
const statusColors: Record<EmployeeProfileMeta['status'], string> = {
  active: 'text-green-400 border-green-500/40 bg-green-900/20',
  suspended: 'text-red-400 border-red-500/40 bg-red-900/20',
  'under-review': 'text-amber-400 border-amber-500/40 bg-amber-900/20',
}

const flagColors = {
  positive: 'text-green-400',
  negative: 'text-red-400',
  neutral: 'text-court-grey',
  warning: 'text-amber-400',
}

const timelineIcons = {
  positive: <CheckCircle size={12} className="text-green-400 shrink-0 mt-0.5" />,
  negative: <AlertTriangle size={12} className="text-red-400 shrink-0 mt-0.5" />,
  neutral: <Minus size={12} className="text-court-grey shrink-0 mt-0.5" />,
  warning: <AlertTriangle size={12} className="text-amber-400 shrink-0 mt-0.5" />,
}

export function EmployeeProfileRenderer({ meta, onRead }: EmployeeProfileRendererProps) {
  const [expanded, setExpanded] = useState(false)

  function handleExpand() {
    if (!expanded) onRead?.()
    setExpanded(!expanded)
  }

  return (
    <div className={cn(
      'font-mono text-xs rounded-sm border transition-all duration-200',
      expanded
        ? 'border-blue-500/50 bg-[#0a0f1a]'
        : 'border-border bg-court-navy-light hover:border-blue-500/30'
    )}>
      {/* Header row */}
      <button
        onClick={handleExpand}
        className="w-full flex items-center gap-3 px-3 py-2.5 text-left"
      >
        <div className="shrink-0 w-8 h-8 rounded-full bg-blue-900/40 border border-blue-700/40 flex items-center justify-center">
          <User size={14} className="text-blue-300" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className={cn('font-bold truncate', expanded ? 'text-blue-200' : 'text-court-white/80')}>
              {meta.name}
            </span>
            <span className={cn(
              'text-[9px] px-1.5 py-0.5 rounded-[2px] border tracking-widest uppercase shrink-0',
              statusColors[meta.status]
            )}>
              {statusLabels[meta.status]}
            </span>
          </div>
          <div className="text-court-grey truncate">{meta.role} — {meta.department}</div>
        </div>
        {expanded
          ? <ChevronUp size={12} className="text-court-grey shrink-0" />
          : <ChevronDown size={12} className="text-court-grey shrink-0" />
        }
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-blue-700/20 px-3 py-3 flex flex-col gap-4">

          {/* Basic info */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[10px]">
            <div>
              <span className="text-blue-400/60">ID Empleado:</span>{' '}
              <span className="text-court-white/80">{meta.employeeId}</span>
            </div>
            <div>
              <span className="text-blue-400/60">Ingreso:</span>{' '}
              <span className="text-court-white/80">{meta.hireDate}</span>
            </div>
            <div>
              <span className="text-blue-400/60">Antigüedad:</span>{' '}
              <span className="text-court-white/80">{meta.yearsInCompany} {meta.yearsInCompany === 1 ? 'año' : 'años'}</span>
            </div>
            <div>
              <span className="text-blue-400/60">Departamento:</span>{' '}
              <span className="text-court-white/80">{meta.department}</span>
            </div>
          </div>

          {/* Stats */}
          {meta.stats.length > 0 && (
            <div className="border-t border-blue-700/20 pt-3">
              <div className="text-[9px] tracking-[0.3em] uppercase text-blue-400/50 mb-2">
                Indicadores de Desempeño
              </div>
              <div className="flex flex-col gap-1.5">
                {meta.stats.map((stat, i) => (
                  <div key={i} className="flex items-center justify-between gap-2">
                    <span className="text-court-grey">{stat.label}</span>
                    <span className={cn(
                      'font-bold',
                      stat.flag ? flagColors[stat.flag] : 'text-court-white/80'
                    )}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline */}
          {meta.timeline.length > 0 && (
            <div className="border-t border-blue-700/20 pt-3">
              <div className="text-[9px] tracking-[0.3em] uppercase text-blue-400/50 mb-2">
                Historial de Eventos
              </div>
              <div className="flex flex-col gap-2">
                {meta.timeline.map((event, i) => (
                  <div key={i} className="flex items-start gap-2">
                    {timelineIcons[event.type]}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="text-court-grey text-[10px] shrink-0">{event.date}</span>
                        <span className={cn('text-[10px]', flagColors[event.type] ?? 'text-court-white/70')}>
                          {event.event}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HR Notes */}
          {meta.hrNotes && (
            <div className="border-t border-blue-700/20 pt-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Shield size={10} className="text-blue-400/60" />
                <span className="text-[9px] tracking-[0.3em] uppercase text-blue-400/50">
                  Notas Internas RRHH
                </span>
                {meta.confidential && (
                  <span className="text-[9px] px-1 py-0.5 border border-amber-500/40 text-amber-400 bg-amber-900/10 rounded-[2px] tracking-widest uppercase">
                    Confidencial
                  </span>
                )}
              </div>
              <p className="text-court-grey leading-relaxed text-[10px]">{meta.hrNotes}</p>
            </div>
          )}

          {/* Read timestamp */}
          <div className="flex items-center gap-1.5 text-[9px] text-blue-400/30 pt-1 border-t border-blue-700/20">
            <Clock size={9} />
            <span>Consultado desde el Sistema RRHH Corporativo</span>
          </div>
        </div>
      )}
    </div>
  )
}
