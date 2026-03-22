'use client'

import { useGameEngine } from '@/lib/gameEngine'
import { MainMenu }       from '@/components/game/screens/MainMenu'
import { CaseSelect }     from '@/components/game/screens/CaseSelect'
import { Briefing }       from '@/components/game/screens/Briefing'
import { Investigation }  from '@/components/game/screens/Investigation'
import { Trial }          from '@/components/game/screens/Trial'
import { VerdictScreen }  from '@/components/game/screens/VerdictScreen'
import { Debrief }        from '@/components/game/screens/Debrief'

export default function ComplianceCourtPage() {
  const {
    state,
    dispatch,
    currentDialogue,
    isChoicePoint,
    verdictData,
    clearShake,
  } = useGameEngine()

  return (
    <main className="bg-background text-foreground min-h-screen font-sans">
      {state.screen === 'main-menu' && (
        <MainMenu dispatch={dispatch} />
      )}

      {state.screen === 'case-select' && (
        <CaseSelect state={state} dispatch={dispatch} />
      )}

      {state.screen === 'briefing' && (
        <Briefing state={state} dispatch={dispatch} />
      )}

      {state.screen === 'investigation' && (
        <Investigation state={state} dispatch={dispatch} />
      )}

      {state.screen === 'trial' && currentDialogue && (
        <Trial
          state={state}
          dispatch={dispatch}
          currentDialogue={currentDialogue}
          isChoicePoint={isChoicePoint}
          clearShake={clearShake}
        />
      )}

      {state.screen === 'verdict' && (
        <VerdictScreen
          state={state}
          dispatch={dispatch}
          verdictData={verdictData}
        />
      )}

      {state.screen === 'debrief' && (
        <Debrief dispatch={dispatch} />
      )}
    </main>
  )
}
