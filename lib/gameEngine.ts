'use client'

// ── Game State Engine ─────────────────────────────────────────────────────────
// All game state managed via useReducer. No external dependencies.

import { useReducer, useCallback, useEffect, useState } from 'react'
import type { Case, Scene, DialogueLine } from '@/lib/gameData'
import { case1, case2 } from '@/lib/gameData'

// ── Persistence ───────────────────────────────────────────────────────────────

const CASES_MAP: Record<string, Case> = { 'case-1': case1, 'case-2': case2 }
const SAVE_KEY  = 'compliance-court-v1'
const SAVE_VER  = 2

interface RawSave {
  ver: number
  savedAt: number
  activeCaseId: string | null
  screen: string
  gameMode: string
  currentSceneId: string | null
  currentDialogueIndex: number
  credibility: number
  evidenceReviewed: string[]
  isDialogueComplete: boolean
  playerName: string
  case1Complete: boolean
  case2Complete: boolean
  trialTimerActive: boolean
  trialTimeLeft: number
  pendingEvidencePresentation: boolean
  lastPresentedEvidenceId: string | null
  selectedArgumentIds: string[]
  argumentSubmitted: boolean
  argumentFeedback: string | null
}

function persistSave(state: GameState): void {
  if (typeof window === 'undefined') return
  try {
    const raw: RawSave = {
      ver: SAVE_VER,
      savedAt: Date.now(),
      activeCaseId: state.activeCase?.id ?? null,
      screen: state.screen,
      gameMode: state.gameMode,
      currentSceneId: state.currentSceneId,
      currentDialogueIndex: state.currentDialogueIndex,
      credibility: state.credibility,
      evidenceReviewed: [...state.evidenceReviewed],
      isDialogueComplete: state.isDialogueComplete,
      playerName: state.playerName,
      case1Complete: state.case1Complete,
      case2Complete: state.case2Complete,
      trialTimerActive: state.trialTimerActive,
      trialTimeLeft: state.trialTimeLeft,
      pendingEvidencePresentation: state.pendingEvidencePresentation,
      lastPresentedEvidenceId: state.lastPresentedEvidenceId,
      selectedArgumentIds: [...state.selectedArgumentIds],
      argumentSubmitted: state.argumentSubmitted,
      argumentFeedback: state.argumentFeedback,
    }
    localStorage.setItem(SAVE_KEY, JSON.stringify(raw))
  } catch { /* storage unavailable */ }
}

function clearPersistSave(): void {
  if (typeof window === 'undefined') return
  try { localStorage.removeItem(SAVE_KEY) } catch { /* noop */ }
}

/** Returns null if no valid save exists. Adjusts trial timer for elapsed time. */
function loadPersistSave(): Partial<GameState> | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return null
    const data: RawSave = JSON.parse(raw)
    if (data.ver !== SAVE_VER) { clearPersistSave(); return null }

    // Screen guards — don't restore truly transient or completed states
    const screen = data.screen as GameState['screen']
    if (screen === 'main-menu') return null

    const activeCase = data.activeCaseId ? (CASES_MAP[data.activeCaseId] ?? null) : null

    // Validate currentSceneId exists in the case
    const validSceneId =
      activeCase && data.currentSceneId && activeCase.scenes[data.currentSceneId]
        ? data.currentSceneId
        : (activeCase?.firstSceneId ?? null)

    // Adjust trial timer for elapsed wall-clock time
    let trialTimerActive = data.trialTimerActive
    let trialTimeLeft = data.trialTimeLeft
    let adjustedScreen: GameState['screen'] = screen
    let adjustedSceneId: string | null = validSceneId

    if (trialTimerActive && trialTimeLeft > 0) {
      const elapsed = Math.floor((Date.now() - data.savedAt) / 1000)
      trialTimeLeft = trialTimeLeft - elapsed
      if (trialTimeLeft <= 0) {
        // Timer expired while away — go straight to postponed verdict
        trialTimerActive = false
        trialTimeLeft = 0
        adjustedScreen = 'verdict'
        adjustedSceneId = activeCase?.postponedSceneId ?? null
      }
    }

    return {
      screen: adjustedScreen,
      gameMode: data.gameMode as GameState['gameMode'],
      activeCase,
      currentSceneId: adjustedSceneId,
      currentDialogueIndex: data.currentDialogueIndex,
      credibility: data.credibility,
      evidenceReviewed: new Set(data.evidenceReviewed),
      pendingOverlay: null,
      isWrongAnswerShaking: false,
      wrongAnswerMessage: null,
      isDialogueComplete: data.isDialogueComplete,
      playerName: data.playerName,
      case1Complete: data.case1Complete,
      case2Complete: data.case2Complete,
      timedObjectionActive: false,
      timedObjectionExpired: false,
      trialTimerActive,
      trialTimeLeft,
      pendingEvidencePresentation: data.pendingEvidencePresentation,
      lastPresentedEvidenceId: data.lastPresentedEvidenceId,
      evidencePresentFeedback: null,
      selectedArgumentIds: new Set(data.selectedArgumentIds),
      argumentSubmitted: data.argumentSubmitted,
      argumentFeedback: data.argumentFeedback,
    }
  } catch { return null }
}

function checkHasSavedGame(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return false
    const data = JSON.parse(raw)
    return data.ver === SAVE_VER && data.screen !== 'main-menu'
  } catch { return false }
}

// ─────────────────────────────────────────────────────────────────────────────

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
  // 15-minute global trial timer
  trialTimerActive: boolean
  trialTimeLeft: number   // seconds
  // Evidence presentation mechanic
  pendingEvidencePresentation: boolean
  lastPresentedEvidenceId: string | null
  evidencePresentFeedback: string | null
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
  trialTimerActive: false,
  trialTimeLeft: 900,
  pendingEvidencePresentation: false,
  lastPresentedEvidenceId: null,
  evidencePresentFeedback: null,
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
  | { type: 'CHOOSE_ANSWER'; payload: { isCorrect: boolean; penalty?: number; feedback?: string; nextSceneId?: string; credibilityGate?: { minCredibility: number; alternateSceneId: string } } }
  | { type: 'CLEAR_SHAKE' }
  | { type: 'SHOW_OVERLAY'; payload: OverlayType }
  | { type: 'CLEAR_OVERLAY' }
  | { type: 'TIMED_OBJECTION_EXPIRE' }
  | { type: 'TRIAL_TIMER_EXPIRE' }
  | { type: 'TICK_TRIAL_TIMER' }
  | { type: 'PRESENT_EVIDENCE'; payload: string }
  | { type: 'SKIP_EVIDENCE_PRESENTATION' }
  | { type: 'CLEAR_EVIDENCE_FEEDBACK' }
  | { type: 'TOGGLE_ARGUMENT_PIECE'; payload: string }
  | { type: 'SUBMIT_ARGUMENT' }
  | { type: 'PROCEED_AFTER_ARGUMENT' }
  | { type: 'GO_TO_VERDICT' }
  | { type: 'GO_TO_DEBRIEF' }
  | { type: 'RESTART_CASE' }
  | { type: 'GO_TO_CASE_SELECT' }
  | { type: 'GO_TO_MAIN_MENU' }
  | { type: 'LOAD_SAVED_STATE'; payload: Partial<GameState> }

function getCurrentScene(state: GameState): Scene | null {
  if (!state.activeCase || !state.currentSceneId) return null
  return state.activeCase.scenes[state.currentSceneId] ?? null
}

/** Pick the correct verdict scene based on credibility using the case's verdictRoutes */
function resolveVerdictSceneId(state: GameState, fallbackSceneId?: string): string | null {
  const routes = state.activeCase?.verdictRoutes
  if (!routes?.length) return fallbackSceneId ?? null
  // Routes are sorted descending by minCredibility in data; find first that matches
  const sorted = [...routes].sort((a, b) => b.minCredibility - a.minCredibility)
  const match = sorted.find((r) => state.credibility >= r.minCredibility)
  return match?.sceneId ?? fallbackSceneId ?? null
}

/** Navigate to verdict screen using credibility-gated routing */
function navigateToVerdict(state: GameState, fallbackSceneId?: string): GameState {
  const sceneId = resolveVerdictSceneId(state, fallbackSceneId)
  return { ...state, screen: 'verdict', currentSceneId: sceneId, trialTimerActive: false }
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
        trialTimerActive: false,
        trialTimeLeft: 900,
        pendingEvidencePresentation: false,
        lastPresentedEvidenceId: null,
        evidencePresentFeedback: null,
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
        trialTimerActive: true,
        trialTimeLeft: 900,
        pendingEvidencePresentation: false,
        lastPresentedEvidenceId: null,
        evidencePresentFeedback: null,
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

    case 'TICK_TRIAL_TIMER': {
      if (!state.trialTimerActive || state.trialTimeLeft <= 0) return state
      return { ...state, trialTimeLeft: state.trialTimeLeft - 1 }
    }

    case 'TRIAL_TIMER_EXPIRE': {
      const postponedSceneId = state.activeCase?.postponedSceneId ?? null
      return {
        ...state,
        trialTimerActive: false,
        trialTimeLeft: 0,
        screen: 'verdict',
        currentSceneId: postponedSceneId,
      }
    }

    case 'PRESENT_EVIDENCE': {
      const scene = getCurrentScene(state)
      if (!scene?.isEvidencePresentScene) return state
      const evidenceId = action.payload
      const isCorrect = scene.correctEvidenceIds?.includes(evidenceId) ?? false
      const bonus = scene.evidenceBonusCredibility ?? 5
      const penalty = scene.evidencePenaltyCredibility ?? 8
      const delta = isCorrect ? bonus : -penalty
      const newCredibility = Math.max(0, Math.min(100, state.credibility + delta))
      const feedback = isCorrect
        ? `+${bonus} Credibilidad — El tribunal toma nota. La evidencia presentada refuerza tu posición.`
        : `-${penalty} Credibilidad — Fuentes objeta: esa evidencia no es pertinente en este momento. El tribunal lo anota.`
      const nextSceneId = scene.nextSceneId ?? null
      const nextScene = nextSceneId ? state.activeCase?.scenes[nextSceneId] : null

      const baseState = {
        ...state,
        credibility: newCredibility,
        pendingEvidencePresentation: false,
        lastPresentedEvidenceId: evidenceId,
        evidencePresentFeedback: feedback,
        isWrongAnswerShaking: !isCorrect,
      }

      if (!nextSceneId || !nextScene) return baseState
      if (nextScene.isVerdictScene) return { ...baseState, ...navigateToVerdict(baseState, nextSceneId) }
      return {
        ...baseState,
        currentSceneId: nextSceneId,
        currentDialogueIndex: 0,
        isDialogueComplete: false,
        timedObjectionActive: false,
        timedObjectionExpired: false,
      }
    }

    case 'SKIP_EVIDENCE_PRESENTATION': {
      const scene = getCurrentScene(state)
      if (!scene?.isEvidencePresentScene) return state
      const nextSceneId = scene.nextSceneId ?? null
      const nextScene = nextSceneId ? state.activeCase?.scenes[nextSceneId] : null
      const baseState = { ...state, pendingEvidencePresentation: false, evidencePresentFeedback: null }
      if (!nextSceneId || !nextScene) return baseState
      if (nextScene.isVerdictScene) return { ...baseState, ...navigateToVerdict(baseState, nextSceneId) }
      return {
        ...baseState,
        currentSceneId: nextSceneId,
        currentDialogueIndex: 0,
        isDialogueComplete: false,
        timedObjectionActive: false,
        timedObjectionExpired: false,
      }
    }

    case 'CLEAR_EVIDENCE_FEEDBACK':
      return { ...state, evidencePresentFeedback: null, isWrongAnswerShaking: false }

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

      // Evidence presentation scene — after all dialogues, wait for player to select/skip
      if (scene.isEvidencePresentScene) {
        return { ...state, pendingEvidencePresentation: true }
      }

      const dialogue = scene.dialogues[state.currentDialogueIndex]

      if (dialogue?.overlay && state.pendingOverlay !== dialogue.overlay) {
        return {
          ...state,
          pendingOverlay: dialogue.overlay,
          isDialogueComplete: false,
          currentDialogueIndex: state.currentDialogueIndex + 1,
        }
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
        return { ...state, screen: 'verdict', trialTimerActive: false }
      }

      if (scene.nextSceneId && state.activeCase?.scenes[scene.nextSceneId]) {
        const nextScene = state.activeCase.scenes[scene.nextSceneId]
        if (nextScene.isVerdictScene) {
          return navigateToVerdict(state, scene.nextSceneId)
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
        if (nextScene.isEvidencePresentScene) {
          return {
            ...state,
            currentSceneId: scene.nextSceneId,
            currentDialogueIndex: 0,
            isDialogueComplete: false,
            timedObjectionActive: false,
            timedObjectionExpired: false,
            pendingEvidencePresentation: false,
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
        // Check credibility gate — if player's credibility meets the threshold, use alternate scene
        let targetSceneId = action.payload.nextSceneId
        const gate = action.payload.credibilityGate
        if (gate && state.credibility >= gate.minCredibility && gate.alternateSceneId) {
          targetSceneId = gate.alternateSceneId
        }

        if (!targetSceneId || !state.activeCase?.scenes[targetSceneId]) return state
        const nextScene = state.activeCase.scenes[targetSceneId]

        if (nextScene.isVerdictScene) {
          return navigateToVerdict({ ...state, wrongAnswerMessage: null, timedObjectionActive: false, timedObjectionExpired: false }, targetSceneId)
        }
        if (nextScene.isArgumentScene) {
          return {
            ...state,
            currentSceneId: targetSceneId,
            screen: 'argument-builder',
            timedObjectionActive: false,
            timedObjectionExpired: false,
            selectedArgumentIds: new Set(),
            argumentSubmitted: false,
            argumentFeedback: null,
            wrongAnswerMessage: null,
          }
        }
        if (nextScene.isEvidencePresentScene) {
          return {
            ...state,
            currentSceneId: targetSceneId,
            currentDialogueIndex: 0,
            isDialogueComplete: false,
            timedObjectionActive: false,
            timedObjectionExpired: false,
            wrongAnswerMessage: null,
            pendingEvidencePresentation: false,
          }
        }
        return {
          ...state,
          currentSceneId: targetSceneId,
          currentDialogueIndex: 0,
          isDialogueComplete: false,
          timedObjectionActive: false,
          timedObjectionExpired: false,
          wrongAnswerMessage: null,
        }
      } else {
        const penalty = action.payload.penalty ?? 15
        const newCredibility = Math.max(0, state.credibility - penalty)
        const wrongMessage = action.payload.feedback ?? 'Wrong approach.'

        // Navigate to the wrong-choice branch scene (nextSceneId now always set on wrong choices)
        const nextSceneId = action.payload.nextSceneId
        if (!nextSceneId || !state.activeCase?.scenes[nextSceneId]) {
          // Fallback: stay on current scene with shake (should not happen with complete data)
          return {
            ...state,
            credibility: newCredibility,
            isWrongAnswerShaking: true,
            wrongAnswerMessage: wrongMessage,
          }
        }

        const nextScene = state.activeCase.scenes[nextSceneId]
        if (nextScene.isVerdictScene) {
          const withPenalty = { ...state, credibility: newCredibility, isWrongAnswerShaking: true, wrongAnswerMessage: wrongMessage, timedObjectionActive: false, timedObjectionExpired: false }
          return navigateToVerdict(withPenalty, nextSceneId)
        }
        if (nextScene.isArgumentScene) {
          return {
            ...state,
            credibility: newCredibility,
            currentSceneId: nextSceneId,
            screen: 'argument-builder',
            timedObjectionActive: false,
            timedObjectionExpired: false,
            selectedArgumentIds: new Set(),
            argumentSubmitted: false,
            argumentFeedback: null,
            isWrongAnswerShaking: true,
            wrongAnswerMessage: wrongMessage,
          }
        }
        return {
          ...state,
          credibility: newCredibility,
          currentSceneId: nextSceneId,
          currentDialogueIndex: 0,
          isDialogueComplete: false,
          timedObjectionActive: false,
          timedObjectionExpired: false,
          isWrongAnswerShaking: true,
          wrongAnswerMessage: wrongMessage,
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
      return {
        ...state,
        screen: 'verdict',
        // Mark case complete as soon as verdict is reached (regardless of outcome)
        case1Complete: state.activeCase?.id === 'case-1' ? true : state.case1Complete,
        case2Complete: state.activeCase?.id === 'case-2' ? true : state.case2Complete,
      }

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
        trialTimerActive: false,
        trialTimeLeft: 900,
        pendingEvidencePresentation: false,
        lastPresentedEvidenceId: null,
        evidencePresentFeedback: null,
        selectedArgumentIds: new Set(),
        argumentSubmitted: false,
        argumentFeedback: null,
        screen: 'briefing',
      }

    case 'GO_TO_CASE_SELECT':
      return { ...state, screen: 'case-select', activeCase: null }

    case 'GO_TO_MAIN_MENU':
      return { ...initialState }

    case 'LOAD_SAVED_STATE':
      return { ...initialState, ...action.payload }

    default:
      return state
  }
}

export function useGameEngine() {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const [hasSavedGame, setHasSavedGame] = useState(false)

  // On mount (client only): detect existing save
  useEffect(() => {
    setHasSavedGame(checkHasSavedGame())
  }, [])

  // Auto-save on every state change, except when on the main menu
  useEffect(() => {
    if (state.screen === 'main-menu') return
    persistSave(state)
  }, [state])

  // Clear save when going to main menu or debrief (session ended)
  useEffect(() => {
    if (state.screen === 'debrief') {
      clearPersistSave()
      setHasSavedGame(false)
    }
  }, [state.screen])

  const continueGame = useCallback(() => {
    const saved = loadPersistSave()
    if (!saved) return
    dispatch({ type: 'LOAD_SAVED_STATE', payload: saved })
    setHasSavedGame(false)
  }, [])

  const startNewGame = useCallback((mode: GameState['gameMode']) => {
    clearPersistSave()
    setHasSavedGame(false)
    dispatch({ type: 'SET_GAME_MODE', payload: mode })
    dispatch({ type: 'START_GAME' })
  }, [])

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
    hasSavedGame,
    continueGame,
    startNewGame,
    currentScene,
    currentDialogue,
    isChoicePoint,
    allEvidenceReviewed,
    verdictData,
    clearShake,
  }
}
