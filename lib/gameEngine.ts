'use client'

// ── Game State Engine ─────────────────────────────────────────────────────────
// All game state managed via useReducer. No external state management needed.

import { useReducer, useCallback } from 'react'
import type { Case, Scene, DialogueLine } from '@/lib/gameData'

export type GameScreen =
  | 'main-menu'
  | 'case-select'
  | 'briefing'
  | 'investigation'
  | 'trial'
  | 'verdict'
  | 'debrief'

export type OverlayType = 'OBJECTION' | 'HOLD IT' | 'TAKE THAT' | null

export interface GameState {
  screen: GameScreen
  activeCase: Case | null
  currentSceneId: string | null
  currentDialogueIndex: number
  credibility: number                  // 0–100
  evidenceReviewed: Set<string>        // IDs of evidence cards read
  pendingOverlay: OverlayType
  isWrongAnswerShaking: boolean
  wrongAnswerMessage: string | null
  isDialogueComplete: boolean          // all text typed
  playerName: string
  case1Complete: boolean
  case2Complete: boolean
}

const initialState: GameState = {
  screen: 'main-menu',
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
}

export type GameAction =
  | { type: 'START_GAME' }
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
  if (!scene) return null
  return scene.dialogues[state.currentDialogueIndex] ?? null
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, screen: 'case-select' }

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

    case 'DIALOGUE_TYPING_COMPLETE':
      return { ...state, isDialogueComplete: true }

    case 'NEXT_DIALOGUE': {
      // If typing is still happening, skip to complete
      if (!state.isDialogueComplete) {
        return { ...state, isDialogueComplete: true }
      }

      const scene = getCurrentScene(state)
      if (!scene) return state

      const dialogue = scene.dialogues[state.currentDialogueIndex]

      // If this dialogue has an overlay not yet shown, show it first
      if (dialogue?.overlay && state.pendingOverlay !== dialogue.overlay) {
        return { ...state, pendingOverlay: dialogue.overlay, isDialogueComplete: false }
      }

      // Clear overlay if active
      if (state.pendingOverlay) {
        return { ...state, pendingOverlay: null }
      }

      const nextIndex = state.currentDialogueIndex + 1

      // If there are more dialogues in this scene
      if (nextIndex < scene.dialogues.length) {
        const nextDialogue = scene.dialogues[nextIndex]
        // Check if next dialogue starts with overlay
        if (nextDialogue?.overlay) {
          return {
            ...state,
            currentDialogueIndex: nextIndex,
            isDialogueComplete: false,
            pendingOverlay: nextDialogue.overlay,
          }
        }
        return { ...state, currentDialogueIndex: nextIndex, isDialogueComplete: false }
      }

      // Scene finished — go to nextSceneId or verdict
      if (scene.isVerdictScene) {
        return { ...state, screen: 'verdict' }
      }

      if (scene.nextSceneId && state.activeCase?.scenes[scene.nextSceneId]) {
        const nextScene = state.activeCase.scenes[scene.nextSceneId]
        if (nextScene.isVerdictScene) {
          return { ...state, screen: 'verdict', currentSceneId: scene.nextSceneId }
        }
        return {
          ...state,
          currentSceneId: scene.nextSceneId,
          currentDialogueIndex: 0,
          isDialogueComplete: false,
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
            screen: 'verdict',
          }
        }
        return {
          ...state,
          currentSceneId: nextSceneId,
          currentDialogueIndex: 0,
          isDialogueComplete: false,
          wrongAnswerMessage: null,
        }
      } else {
        const penalty = action.payload.penalty ?? 15
        const newCredibility = Math.max(0, state.credibility - penalty)
        return {
          ...state,
          credibility: newCredibility,
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
