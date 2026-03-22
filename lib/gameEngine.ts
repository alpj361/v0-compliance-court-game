'use client'

// ── Game State Engine ─────────────────────────────────────────────────────────
// All game state managed via useReducer. No external dependencies.

import { useReducer, useCallback } from 'react'
import type { Case, Scene, DialogueLine } from '@/lib/gameData'

export type GameScreen =
  | 'main-menu'
  | 'case-select'
  | 'briefing'
  | 'investigation'
  | 'trial'
  | 'argument-builder'   // Case 2 Ch3 multi-select closing
  | 'verdict'
  | 'debrief'

export type OverlayType = 'OBJECTION' | 'HOLD IT' | 'TAKE THAT' | null

export type GameMode = 'visual-novel' | 'chat'

export interface GameState {
  screen: GameScreen
  gameMode: GameMode
  activeCase: Case | null
  currentSceneId: string | null
  currentDialogueIndex: number
  credibility: number
  evidenceReviewed: Set<string>
  pendingOverlay: OverlayType
  isWrongAnswerShaking: boolean
  wrongAnswerMessage: string | null
  isDialogueComplete: boolean
  playerName: string
  case1Complete: boolean
  case2Complete: boolean
  // Timed objection state
  timedObjectionActive: boolean
  timedObjectionExpired: boolean
  // Argument builder state (Case 2 Ch3)
  selectedArgumentIds: Set<string>
  argumentSubmitted: boolean
  argumentFeedback: string | null
}

const initialState: GameState = {
  screen: 'main-menu',
  gameMode: 'visual-novel',
  activeCase: null,
  currentSceneId: null,
  currentDialogueIndex: 0,
  credibility: 100,
  evidenceReviewed: new Set(),
  pendingOverlay: null,
  isWrongAnswerShaking: false,
  wrongAnswerMessage: null,
  isDialogueComplete: false,
  playerName: 'Nicolas',
  case1Complete: false,
  case2Complete: false,
  timedObjectionActive: false,
  timedObjectionExpired: false,
  selectedArgumentIds: new Set(),
  argumentSubmitted: false,
  argumentFeedback: null,
}

export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'SET_GAME_MODE'; payload: GameMode }
  | { type: 'SELECT_CASE'; payload: Case }
  | { type: 'START_INVESTIGATION' }
  | { type: 'REVIEW_EVIDENCE'; payload: string }
  | { type: 'START_TRIAL' }
  | { type: 'NEXT_DIALOGUE' }
  | { type: 'DIALOGUE_TYPING_COMPLETE' }
  | { type: 'CHOOSE_ANSWER'; payload: { isCorrect: boolean; penalty?: number; feedback?: string; nextSceneId?: string } }
  | { type: 'CLEAR_SHAKE' }
  | { type: 'SHOW_OVERLAY'; payload: OverlayType }
  | { type: 'CLEAR_OVERLAY' }
  | { type: 'TIMED_OBJECTION_EXPIRE' }
  | { type: 'TOGGLE_ARGUMENT_PIECE'; payload: string }
  | { type: 'SUBMIT_ARGUMENT' }
  | { type: 'PROCEED_AFTER_ARGUMENT' }
  | { type: 'GO_TO_VERDICT' }
  | { type: 'GO_TO_DEBRIEF' }
  | { type: 'RESTART_CASE' }
  | { type: 'GO_TO_CASE_SELECT' }
  | { type: 'GO_TO_MAIN_MENU' }

function getCurrentScene(state: GameState): Scene | null {
  if (!state.activeCase || !state.currentSceneId) return null
  return state.activeCase.scenes[state.currentSceneId] ?? null
}

function getCurrentDialogue(state: GameState): DialogueLine | null {
  const scene = getCurrentScene(state)
  if (!scene || scene.isArgumentScene) return null
  return scene.dialogues[state.currentDialogueIndex] ?? null
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, screen: 'case-select' }

    case 'SET_GAME_MODE':
      return { ...state, gameMode: action.payload }

    case 'SELECT_CASE':
      return {
        ...state,
        activeCase: action.payload,
        currentSceneId: action.payload.firstSceneId,
        currentDialogueIndex: 0,
        credibility: 100,
        evidenceReviewed: new Set(),
        isDialogueComplete: false,
        wrongAnswerMessage: null,
        pendingOverlay: null,
        timedObjectionActive: false,
        timedObjectionExpired: false,
        selectedArgumentIds: new Set(),
        argumentSubmitted: false,
        argumentFeedback: null,
        screen: 'briefing',
      }

    case 'START_INVESTIGATION':
      return { ...state, screen: 'investigation' }

    case 'REVIEW_EVIDENCE': {
      const next = new Set(state.evidenceReviewed)
      next.add(action.payload)
      return { ...state, evidenceReviewed: next }
    }

    case 'START_TRIAL':
      return {
        ...state,
        screen: 'trial',
        currentSceneId: state.activeCase!.firstSceneId,
        currentDialogueIndex: 0,
        isDialogueComplete: false,
      }

    case 'DIALOGUE_TYPING_COMPLETE': {
      const dialogue = getCurrentDialogue(state)
      // Auto-activate timed objection when typing completes
      if (dialogue?.timedObjection) {
        return { ...state, isDialogueComplete: true, timedObjectionActive: true, timedObjectionExpired: false }
      }
      return { ...state, isDialogueComplete: true }
    }

    case 'TIMED_OBJECTION_EXPIRE': {
      const dialogue = getCurrentDialogue(state)
      if (!dialogue?.choices) return state
      // Drain credibility and set expired
      return {
        ...state,
        timedObjectionActive: false,
        timedObjectionExpired: true,
        credibility: Math.max(0, state.credibility - 20),
        isWrongAnswerShaking: true,
        wrongAnswerMessage: 'Tiempo agotado. Silencio fatal. La objeción queda sin respuesta.',
      }
    }

    case 'NEXT_DIALOGUE': {
      if (!state.isDialogueComplete) {
        return { ...state, isDialogueComplete: true }
      }

      const scene = getCurrentScene(state)
      if (!scene) return state

      // Argument builder scene
      if (scene.isArgumentScene) {
        return {
          ...state,
          screen: 'argument-builder',
          selectedArgumentIds: new Set(),
          argumentSubmitted: false,
          argumentFeedback: null,
        }
      }

      const dialogue = scene.dialogues[state.currentDialogueIndex]

      if (dialogue?.overlay && state.pendingOverlay !== dialogue.overlay) {
        return { ...state, pendingOverlay: dialogue.overlay, isDialogueComplete: false }
      }

      if (state.pendingOverlay) {
        return { ...state, pendingOverlay: null }
      }

      const nextIndex = state.currentDialogueIndex + 1

      if (nextIndex < scene.dialogues.length) {
        const nextDialogue = scene.dialogues[nextIndex]
        if (nextDialogue?.overlay) {
          return {
            ...state,
            currentDialogueIndex: nextIndex,
            isDialogueComplete: false,
            pendingOverlay: nextDialogue.overlay,
            timedObjectionActive: false,
            timedObjectionExpired: false,
          }
        }
        return {
          ...state,
          currentDialogueIndex: nextIndex,
          isDialogueComplete: false,
          timedObjectionActive: false,
          timedObjectionExpired: false,
        }
      }

      // Scene finished
      if (scene.isVerdictScene) {
        return { ...state, screen: 'verdict' }
      }

      if (scene.nextSceneId && state.activeCase?.scenes[scene.nextSceneId]) {
        const nextScene = state.activeCase.scenes[scene.nextSceneId]
        if (nextScene.isVerdictScene) {
          return { ...state, screen: 'verdict', currentSceneId: scene.nextSceneId }
        }
        if (nextScene.isArgumentScene) {
          return {
            ...state,
            currentSceneId: scene.nextSceneId,
            screen: 'argument-builder',
            selectedArgumentIds: new Set(),
            argumentSubmitted: false,
            argumentFeedback: null,
          }
        }
        return {
          ...state,
          currentSceneId: scene.nextSceneId,
          currentDialogueIndex: 0,
          isDialogueComplete: false,
          timedObjectionActive: false,
          timedObjectionExpired: false,
        }
      }

      return state
    }

    case 'CHOOSE_ANSWER': {
      if (action.payload.isCorrect) {
        const nextSceneId = action.payload.nextSceneId
        if (!nextSceneId || !state.activeCase?.scenes[nextSceneId]) return state
        const nextScene = state.activeCase.scenes[nextSceneId]

        if (nextScene.isVerdictScene) {
          return {
            ...state,
            currentSceneId: nextSceneId,
            currentDialogueIndex: 0,
            isDialogueComplete: false,
            timedObjectionActive: false,
            timedObjectionExpired: false,
            wrongAnswerMessage: null,
            screen: 'verdict',
          }
        }
        if (nextScene.isArgumentScene) {
          return {
            ...state,
            currentSceneId: nextSceneId,
            screen: 'argument-builder',
            timedObjectionActive: false,
            timedObjectionExpired: false,
            selectedArgumentIds: new Set(),
            argumentSubmitted: false,
            argumentFeedback: null,
            wrongAnswerMessage: null,
          }
        }
        return {
          ...state,
          currentSceneId: nextSceneId,
          currentDialogueIndex: 0,
          isDialogueComplete: false,
          timedObjectionActive: false,
          timedObjectionExpired: false,
          wrongAnswerMessage: null,
        }
      } else {
        // Special case: outcome argument in Case 2 — Chen fires back, no scene change
        const isOutcomeArg = action.payload.feedback === 'outcome-argument'
        if (isOutcomeArg) {
          return {
            ...state,
            credibility: Math.max(0, state.credibility - 10),
            isWrongAnswerShaking: true,
            wrongAnswerMessage:
              'Chen: "OBJECTION. The regulatory obligation is procedural — not outcome-dependent. FINTRAC Section 9.3 requires the step before the action, not because the agent might be wrong, but because the institution cannot rely on agent confidence as a substitute for documented verification."',
          }
        }
        const penalty = action.payload.penalty ?? 15
        return {
          ...state,
          credibility: Math.max(0, state.credibility - penalty),
          isWrongAnswerShaking: true,
          wrongAnswerMessage: action.payload.feedback ?? 'Wrong approach. Try again.',
        }
      }
    }

    case 'CLEAR_SHAKE':
      return { ...state, isWrongAnswerShaking: false, wrongAnswerMessage: null }

    case 'SHOW_OVERLAY':
      return { ...state, pendingOverlay: action.payload }

    case 'CLEAR_OVERLAY':
      return { ...state, pendingOverlay: null }

    case 'TOGGLE_ARGUMENT_PIECE': {
      const next = new Set(state.selectedArgumentIds)
      if (next.has(action.payload)) next.delete(action.payload)
      else next.add(action.payload)
      return { ...state, selectedArgumentIds: next, argumentFeedback: null }
    }

    case 'SUBMIT_ARGUMENT': {
      const scene = getCurrentScene(state)
      if (!scene?.argumentPieces) return state

      const pieces = scene.argumentPieces
      const correctIds = new Set(pieces.filter((p) => p.isCorrect).map((p) => p.id))
      const wrongIds = new Set(pieces.filter((p) => !p.isCorrect).map((p) => p.id))

      const selectedWrong = [...state.selectedArgumentIds].filter((id) => wrongIds.has(id))
      const selectedCorrect = [...state.selectedArgumentIds].filter((id) => correctIds.has(id))
      const missedCorrect = [...correctIds].filter((id) => !state.selectedArgumentIds.has(id))

      let feedback = ''
      let credibilityPenalty = 0

      if (selectedWrong.length > 0) {
        credibilityPenalty = selectedWrong.length * 12
        const wrongTexts = selectedWrong.map(
          (id) => pieces.find((p) => p.id === id)?.text ?? ''
        )
        feedback = `Okafor interrupts: "${wrongTexts[0].slice(0, 60)}..." — that argument does not hold before this hearing. ${selectedWrong.length} wrong piece${selectedWrong.length > 1 ? 's' : ''} removed your credibility.`
      } else if (missedCorrect.length > 0) {
        feedback = `Your closing is incomplete — you missed ${missedCorrect.length} essential point${missedCorrect.length > 1 ? 's' : ''}. Select all four correct pieces.`
      }

      if (selectedWrong.length === 0 && missedCorrect.length === 0) {
        // Perfect — advance
        const nextSceneId = scene.argumentNextSceneId
        if (!nextSceneId) return state
        return {
          ...state,
          argumentSubmitted: true,
          argumentFeedback: null,
          credibility: Math.max(0, state.credibility - credibilityPenalty),
          currentSceneId: nextSceneId,
          currentDialogueIndex: 0,
          isDialogueComplete: false,
          screen: 'trial',
        }
      }

      return {
        ...state,
        argumentSubmitted: false,
        argumentFeedback: feedback,
        credibility: Math.max(0, state.credibility - credibilityPenalty),
        isWrongAnswerShaking: true,
        // Remove the wrong selections so player can try again
        selectedArgumentIds: new Set(selectedCorrect),
      }
    }

    case 'PROCEED_AFTER_ARGUMENT': {
      const scene = getCurrentScene(state)
      const nextSceneId = scene?.argumentNextSceneId
      if (!nextSceneId) return state
      return {
        ...state,
        currentSceneId: nextSceneId,
        currentDialogueIndex: 0,
        isDialogueComplete: false,
        screen: 'trial',
        argumentSubmitted: false,
        argumentFeedback: null,
      }
    }

    case 'GO_TO_VERDICT':
      return { ...state, screen: 'verdict' }

    case 'GO_TO_DEBRIEF':
      return {
        ...state,
        screen: 'debrief',
        case1Complete: state.activeCase?.id === 'case-1' ? true : state.case1Complete,
        case2Complete: state.activeCase?.id === 'case-2' ? true : state.case2Complete,
      }

    case 'RESTART_CASE':
      return {
        ...state,
        currentSceneId: state.activeCase!.firstSceneId,
        currentDialogueIndex: 0,
        credibility: 100,
        isDialogueComplete: false,
        wrongAnswerMessage: null,
        pendingOverlay: null,
        evidenceReviewed: new Set(),
        timedObjectionActive: false,
        timedObjectionExpired: false,
        selectedArgumentIds: new Set(),
        argumentSubmitted: false,
        argumentFeedback: null,
        screen: 'briefing',
      }

    case 'GO_TO_CASE_SELECT':
      return { ...state, screen: 'case-select', activeCase: null }

    case 'GO_TO_MAIN_MENU':
      return { ...initialState }

    default:
      return state
  }
}

export function useGameEngine() {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  const currentScene = getCurrentScene(state)
  const currentDialogue = getCurrentDialogue(state)

  const isChoicePoint = !!(
    currentDialogue?.choices &&
    currentDialogue.choices.length > 0 &&
    state.isDialogueComplete
  )

  const allEvidenceReviewed =
    state.activeCase
      ? state.activeCase.evidence.every((e) => state.evidenceReviewed.has(e.id))
      : false

  const verdictData = currentScene?.isVerdictScene
    ? currentScene.verdictData
    : null

  const clearShake = useCallback(() => {
    dispatch({ type: 'CLEAR_SHAKE' })
  }, [])

  return {
    state,
    dispatch,
    currentScene,
    currentDialogue,
    isChoicePoint,
    allEvidenceReviewed,
    verdictData,
    clearShake,
  }
}
