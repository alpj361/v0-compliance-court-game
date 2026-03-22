'use client'

/**
 * EvidenceCard — shell component that routes to the appropriate rich renderer
 * based on the evidence's displayType.
 */

import { useCallback } from 'react'
import { cn } from '@/lib/utils'
import type { EvidenceCard as EvidenceCardType } from '@/lib/gameData'
import { EmailRenderer } from '@/components/game/evidence/EmailEvidenceRenderer'
import { BankRecordRenderer } from '@/components/game/evidence/BankEvidenceRenderer'
import { LegalTextRenderer } from '@/components/game/evidence/LegalTextRenderer'
import { PaperDocRenderer } from '@/components/game/evidence/PaperDocRenderer'
import { CoachingLogRenderer } from '@/components/game/evidence/CoachingLogRenderer'
import { CallReportRenderer } from '@/components/game/evidence/CallReportRenderer'

interface EvidenceCardProps {
  card: EvidenceCardType
  isReviewed?: boolean
  onReview?: (id: string) => void
}

export function EvidenceCard({ card, isReviewed, onReview }: EvidenceCardProps) {
  const handleRead = useCallback(() => {
    if (!isReviewed) onReview?.(card.id)
  }, [card.id, isReviewed, onReview])

  return (
    <div className={cn('relative transition-all duration-200', isReviewed ? 'opacity-100' : 'opacity-85')}>
      {/* KEY badge */}
      {card.isKey && (
        <div className="absolute -top-1.5 -right-1.5 z-10 text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 bg-court-gold text-court-navy font-bold rounded-[2px] shadow-md">
          KEY
        </div>
      )}
      {/* READ badge */}
      {isReviewed && (
        <div className="absolute -top-1.5 left-0 z-10 text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 bg-green-700/80 text-green-100 rounded-[2px]">
          READ
        </div>
      )}

      {card.displayType === 'email' && card.emailMeta && (
        <EmailRenderer meta={card.emailMeta} onRead={handleRead} />
      )}
      {card.displayType === 'bank-record' && card.bankRecordMeta && (
        <BankRecordRenderer meta={card.bankRecordMeta} onRead={handleRead} />
      )}
      {card.displayType === 'legal-text' && card.legalTextMeta && (
        <LegalTextRenderer meta={card.legalTextMeta} onRead={handleRead} />
      )}
      {(card.displayType === 'paper-doc') && card.paperDocMeta && (
        <PaperDocRenderer meta={card.paperDocMeta} isKey={card.isKey} onRead={handleRead} />
      )}
      {card.displayType === 'coaching-log' && card.coachingLogMeta && (
        <CoachingLogRenderer meta={card.coachingLogMeta} isKey={card.isKey} onRead={handleRead} />
      )}
      {card.displayType === 'call-report' && card.callReportMeta && (
        <CallReportRenderer meta={card.callReportMeta} isKey={card.isKey} onRead={handleRead} />
      )}
    </div>
  )
}
