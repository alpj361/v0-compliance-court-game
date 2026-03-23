// ── Compliance Court – Game Data ─────────────────────────────────────────────
// Re-exports everything from modular files.
// All existing imports from '@/lib/gameData' continue to work unchanged.

export * from '@/lib/types'
export { case1 } from '@/lib/cases/case1'
export { case2 } from '@/lib/cases/case2'

import { case1 } from '@/lib/cases/case1'
import { case2 } from '@/lib/cases/case2'
import type { Case } from '@/lib/types'

export const CASES: Case[] = [case1, case2]
export const COMPLIANCE_CASES: Case[] = [case1, case2]

// ── Final Debrief — addressed to Nicolas ─────────────────────────────────────
export const finalDebrief = {
  title: 'DEBRIEF: NICOLAS',
  lines: [
    'You have now argued both sides of the same case.',
    'In Guatemala, you prosecuted Rodrigo Pérez.',
    'Eight years of experience. Six years with that client. He knew the answer.',
    'In Toronto, you defended Alex M.',
    'Five months in. 100% NPS. He also knew the answer.',
    'Both of them skipped the step because they were confident they were right.',
    'Both of them were.',
    'It did not matter.',
    'The procedure does not exist to correct agents who are wrong.',
    'It exists to protect everyone — including the agents who are right.',
    'The question is not whether you know the rules, Nicolas.',
    'The question is whether you follow them even when you already know the answer.',
  ],
  callToAction:
    'Think of one situation in the last 30 days where you were confident enough in the answer that you skipped a step. What was the step? What was the procedure? And what would have happened if, this time, you had been wrong?',
}
