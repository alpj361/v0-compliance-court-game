// ── Compliance Court – Shared Types ──────────────────────────────────────────
// All TypeScript interfaces and type definitions for the game engine.

export type GameId = 'compliance-court' | 'on-the-field'

export type Portrait =
  | 'judge-neutral'
  | 'judge-angry'
  | 'morales-judge-neutral'
  | 'rodrigo-confident'
  | 'rodrigo-sweating'
  | 'rodrigo-cornered'
  | 'elena-nervous'
  | 'fuentes-smug'
  | 'fuentes-rattled'
  | 'alex-neutral'
  | 'alex-scared'
  | 'alex-relieved'
  | 'alex-defeated'
  | 'chen-calm'
  | 'chen-objecting'
  | 'david-precise'
  | 'okafor-neutral'
  | 'prosecutor-neutral'
  | 'prosecutor-objecting'
  | 'nicolas-confident'
  | 'nicolas-thinking'
  | 'nicolas-shocked'
  | 'compliance-officer-neutral'
  // On the Field characters
  | 'garcia-neutral'
  | 'garcia-worried'
  | 'reyes-arrogant'
  | 'reyes-backing-down'
  | 'vargas-agent-calm'
  | 'vargas-agent-pressing'
  | 'mendoza-friendly'
  | 'mendoza-threatening'

export type CharacterSide = 'left' | 'right' | 'center'

// ── Evidence types ────────────────────────────────────────────────────────────
export type EvidenceDisplayType =
  | 'email'          // renders as full email UI
  | 'bank-record'    // renders as bank system terminal printout
  | 'legal-text'     // renders as official document / gazette
  | 'paper-doc'      // renders as scanned paper / memo / certificate
  | 'coaching-log'   // renders as signed coaching form
  | 'call-report'    // renders as QA call monitoring spreadsheet
  | 'video'          // renders as an inline video player

export interface EmailMeta {
  from: string
  to: string
  date: string
  subject: string
  body: string          // full body text
  hasReadReceipt?: boolean
}

export interface BankRecordMeta {
  systemLabel: string   // e.g. "Banco Industrial — Core Banking System"
  date: string
  rows: { label: string; value: string; highlight?: boolean }[]
  footer?: string
}

export interface LegalTextMeta {
  source: string        // e.g. "Congreso de la República de Guatemala"
  docTitle: string
  articleRef: string
  fullText: string
}

export interface PaperDocMeta {
  docType: string       // e.g. "Certificate of Completion" | "HR Record" | "Statement"
  date: string
  parties: string[]
  body: string
  signature?: string
  signatureDate?: string
}

export interface CoachingLogMeta {
  sessionNumber: number
  date: string
  teamLeader: string
  agent: string
  hintLevel?: string   // e.g. "Hint 1" | "Hint 2" | "Hint 3"
  discussion: string
  agentAcknowledgment: string
  tlNote?: string
  agentSignature: string
  tlSignature: string
}

export interface CallReportMeta {
  source: string
  date: string
  calls: {
    callId: string
    date: string
    type: string
    actionTimestamp: string
    verificationTimestamp: string
    gap: string
    flag: string
  }[]
  summary: string
}

export interface VideoMeta {
  src: string           // path relative to /public, e.g. '/videos/foo.mp4'
  title: string
  description?: string
  poster?: string       // optional poster image path
}

export interface EvidenceCard {
  id: string
  title: string
  description: string
  detail: string        // fallback plain text
  type: 'document' | 'record' | 'regulation' | 'testimony'
  displayType: EvidenceDisplayType
  isKey?: boolean
  // Typed metadata for rich rendering — only one will be present
  emailMeta?: EmailMeta
  bankRecordMeta?: BankRecordMeta
  legalTextMeta?: LegalTextMeta
  paperDocMeta?: PaperDocMeta
  coachingLogMeta?: CoachingLogMeta
  callReportMeta?: CallReportMeta
  videoMeta?: VideoMeta
}

export interface DialogueLine {
  id: string
  speaker: string
  portrait: Portrait
  side: CharacterSide
  text: string
  choices?: Choice[]
  overlay?: 'OBJECTION' | 'HOLD IT' | 'TAKE THAT'
  // Timed objection moment — player must respond within seconds
  timedObjection?: boolean
  timedSeconds?: number   // default 10
}

export interface Choice {
  id: string
  label: string
  isCorrect: boolean
  wrongPenalty?: number
  feedback: string
  nextSceneId?: string
  // If credibility >= minCredibility when this correct choice is picked, go to alternateSceneId instead
  credibilityGate?: { minCredibility: number; alternateSceneId: string }
}

// Multi-select closing argument piece
export interface ArgumentPiece {
  id: string
  text: string
  isCorrect: boolean   // should be included in the closing
}

export interface Scene {
  id: string
  dialogues: DialogueLine[]
  nextSceneId?: string
  isVerdictScene?: boolean
  verdictData?: VerdictData
  // When true, navigating to nextSceneId uses it directly even if nextScene.isVerdictScene
  // is true — bypasses credibility-based verdictRoutes routing. Use when the scene's
  // own dialogue already delivered a specific verdict and the route must not be overridden.
  bypassVerdictRouting?: boolean
  // Credibility router: after this scene's dialogues finish, pick the next scene based on
  // the player's current credibility. Routes are checked highest→lowest; first match wins.
  // If no route matches, falls back to nextSceneId. No dialogues are required —
  // a zero-dialogue router scene will skip instantly.
  isCredibilityRouterScene?: boolean
  credibilityRoutes?: { minCredibility: number; sceneId: string }[]
  // For Chapter 3 of Case 2 — multi-select argument builder
  isArgumentScene?: boolean
  argumentPieces?: ArgumentPiece[]
  argumentNextSceneId?: string
  // Evidence presentation moment — player selects from Court Record
  isEvidencePresentScene?: boolean
  relevantEvidenceIds?: string[]      // highlighted in Court Record
  correctEvidenceIds?: string[]       // give bonus credibility
  evidenceBonusCredibility?: number   // bonus for correct evidence (default 5)
  evidencePenaltyCredibility?: number // penalty for wrong evidence (default 8)
  // Legal advisor hint shown in the LegalAdvisorButton modal for this scene
  legalAdvisorNote?: string
  // Optional video URL shown in the LegalAdvisorButton modal
  legalAdvisorVideoUrl?: string
}

export interface VerdictData {
  outcome: 'guilty' | 'guilty-reduced' | 'acquitted' | 'null-trial' | 'postponed' | 'lesson' | 'acuerdo' | 'tension-controlada' | 'sacrificio' | 'crisis' | 'sin-tiempo'
  title: string
  subtitle: string
  lessonTitle: string
  lessonText: string
  regulationRef: string
}

export interface CaseVocab {
  credibilityLabel?: string    // e.g. "Cohesión del Vestuario"
  evidenceLabel?: string       // e.g. "Informes"
  recordLabel?: string         // e.g. "Informes del Vestuario"
  investigationLabel?: string  // e.g. "Revisar Informes"
  trialLabel?: string          // e.g. "Iniciar Reunión"
  briefingEyesOnly?: string    // e.g. "Solo para el Asistente Técnico"
  correctEvidenceFeedback?: string
  wrongEvidenceFeedback?: string
}

export interface PreTrialVideo {
  speakerName: string
  speakerTitle: string
  lines: string[]
}

export interface Case {
  id: string
  gameId: GameId
  title: string
  subtitle: string
  jurisdiction: string
  roleLabel: string
  briefing: string
  evidence: EvidenceCard[]
  firstSceneId: string
  scenes: Record<string, Scene>
  vocab?: CaseVocab
  preTrialVideo?: PreTrialVideo
  // Dynamic verdict routing based on final credibility (descending order)
  verdictRoutes?: { minCredibility: number; sceneId: string }[]
  // Scene to show if the 15-minute trial timer expires
  postponedSceneId?: string
}
