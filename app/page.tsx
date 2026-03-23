'use client'

import { useGameEngine } from '@/lib/gameEngine'
import { MainMenu }        from '@/components/game/screens/MainMenu'
import { CaseSelect }      from '@/components/game/screens/CaseSelect'
import { Briefing }        from '@/components/game/screens/Briefing'
import { Investigation }   from '@/components/game/screens/Investigation'
import { Trial }           from '@/components/game/screens/Trial'
import { TrialChat }       from '@/components/game/screens/TrialChat'
import { ArgumentBuilder } from '@/components/game/screens/ArgumentBuilder'
import { VerdictScreen }   from '@/components/game/screens/VerdictScreen'
import { Debrief }         from '@/components/game/screens/Debrief'
import { Options }         from '@/components/game/screens/Options'

export default function ComplianceCourtPage() {
  const {
    state,
    dispatch,
    hasSavedGame,
    continueGame,
    startNewGame,
    clearSave,
    currentDialogue,
    isChoicePoint,
    verdictData,
    clearShake,
  } = useGameEngine()

  return (
    <main className="bg-background text-foreground min-h-screen font-sans">
      {state.screen === 'main-menu' && (
        <MainMenu
          hasSavedGame={hasSavedGame}
          onContinue={continueGame}
          onNewGame={startNewGame}
          onOptions={() => dispatch({ type: 'GO_TO_OPTIONS' })}
        />
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

      {state.screen === 'trial' && currentDialogue && state.gameMode === 'visual-novel' && (
        <Trial
          state={state}
          dispatch={dispatch}
          currentDialogue={currentDialogue}
          isChoicePoint={isChoicePoint}
          clearShake={clearShake}
        />
      )}

      {state.screen === 'trial' && currentDialogue && state.gameMode === 'chat' && (
        <TrialChat
          state={state}
          dispatch={dispatch}
          currentDialogue={currentDialogue}
          isChoicePoint={isChoicePoint}
          clearShake={clearShake}
        />
      )}

      {state.screen === 'argument-builder' && (
        <ArgumentBuilder state={state} dispatch={dispatch} />
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

      {state.screen === 'options' && (
        <Options state={state} dispatch={dispatch} onClearSave={clearSave} />
      )}
    </main>
  )
}
