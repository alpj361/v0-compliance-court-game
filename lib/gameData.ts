// ── Compliance Court – Game Content ────────────────────────────────────────
// All dialogue, evidence, scenes, and lessons live here.
// The engine imports from this file only — no game logic here.

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

export type CharacterSide = 'left' | 'right' | 'center'

// ── Evidence types ────────────────────────────────────────────────────────────
export type EvidenceDisplayType =
  | 'email'          // renders as full email UI
  | 'bank-record'    // renders as bank system terminal printout
  | 'legal-text'     // renders as official document / gazette
  | 'paper-doc'      // renders as scanned paper / memo / certificate
  | 'coaching-log'   // renders as signed coaching form
  | 'call-report'    // renders as QA call monitoring spreadsheet

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
}

export interface VerdictData {
  outcome: 'guilty' | 'guilty-reduced' | 'acquitted' | 'null-trial' | 'postponed' | 'lesson'
  title: string
  subtitle: string
  lessonTitle: string
  lessonText: string
  regulationRef: string
}

export interface Case {
  id: string
  title: string
  subtitle: string
  jurisdiction: string
  roleLabel: string
  briefing: string
  evidence: EvidenceCard[]
  firstSceneId: string
  scenes: Record<string, Scene>
  // Dynamic verdict routing based on final credibility (descending order)
  verdictRoutes?: { minCredibility: number; sceneId: string }[]
  // Scene to show if the 15-minute trial timer expires
  postponedSceneId?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// CASE 1: EL EXPEDIENTE PÉREZ
// Sala de lo Penal — Guatemala City, Guatemala
// Nicolas plays: The Prosecutor
// ─────────────────────────────────────────────────────────────────────────────
export const case1: Case = {
  id: 'case-1',
  title: 'EL EXPEDIENTE PÉREZ',
  subtitle: 'Sala de lo Penal — Ciudad de Guatemala',
  jurisdiction: 'Guatemala',
  roleLabel: 'Fiscal / Prosecutor',

  briefing:
    'Febrero 14, 2026. Banco Industrial, S.A. — Sucursal Ciudad de Guatemala. ' +
    'El agente de crédito Rodrigo Pérez procesó una transferencia de Q500,000 para Ernesto Villanueva ' +
    'sin completar el tamizaje de transacciones sospechosas exigido por Decreto 67-2001 para cualquier ' +
    'transferencia superior a Q50,000. Su argumento: conocía al cliente desde hace seis años y consideró ' +
    'que la verificación era un formalismo innecesario. Veintiún días después, Villanueva fue señalado por ' +
    'la IVE como parte de una red de lavado de dinero activa en tres países centroamericanos. ' +
    'Tu trabajo: demostrar que la obligación legal existía en el momento de la transacción — ' +
    'sin importar el resultado, la relación personal, ni la intención.',

  evidence: [
    {
      id: 'e1-decreto',
      title: 'Decreto 67-2001, Artículo 18',
      description: 'Ley Contra el Lavado de Dinero — Congreso de Guatemala',
      detail: 'Todas las instituciones financieras que operen en Guatemala deben realizar el tamizaje de transacciones sospechosas para cualquier transferencia superior a Q50,000, independientemente del historial del cliente o la relación con el agente. El incumplimiento constituye una violación de las obligaciones ALD.',
      type: 'regulation',
      displayType: 'legal-text',
      isKey: true,
      legalTextMeta: {
        source: 'Congreso de la República de Guatemala',
        docTitle: 'Decreto Número 67-2001 — Ley Contra el Lavado de Dinero u Otros Activos',
        articleRef: 'Artículo 18 — Obligación de Reporte y Tamizaje',
        fullText:
          'Las instituciones financieras sujetas a esta ley están obligadas a realizar el tamizaje de operaciones sospechosas ante la Intendencia de Verificación Especial (IVE) para toda transferencia que exceda los cincuenta mil quetzales (Q50,000), sin excepción alguna basada en la antigüedad de la relación comercial, el historial crediticio del cliente, la discreción del agente, ni la urgencia del negocio.\n\nEl incumplimiento de este requisito previo a la autorización de la transferencia constituye una violación de las obligaciones de prevención del lavado de dinero bajo la presente ley. La familiaridad personal con el cliente no constituye una exención bajo ninguna circunstancia.\n\nLas entidades supervisadas que incumplan serán sujetas a sanción administrativa por parte de la Superintendencia de Bancos (SIB) sin perjuicio de la responsabilidad penal individual de los funcionarios involucrados.',
      },
    },
    {
      id: 'e1-transaction-log',
      title: 'Registro de Transacción — 14 Feb 2026',
      description: 'Sistema interno Banco Industrial — transferencia Q500,000',
      detail: 'Transferencia de Q500,000 procesada a las 14:32. Sello IVE: ausente. Tiempo de proceso: 4 minutos. El tamizaje estándar toma 7 minutos. La brecha confirma que el paso fue omitido, no demorado.',
      type: 'record',
      displayType: 'bank-record',
      isKey: true,
      bankRecordMeta: {
        systemLabel: 'Banco Industrial, S.A. — Sistema Central de Operaciones v4.2',
        date: '14 de febrero de 2026  14:32:07 CST',
        rows: [
          { label: 'N.º de Operación', value: 'BI-2026-02-14-003871' },
          { label: 'Tipo', value: 'Transferencia de Fondos — Nacional' },
          { label: 'Monto', value: 'Q 500,000.00', highlight: true },
          { label: 'Cuenta Origen', value: '****-4421  (Ernesto Villanueva)' },
          { label: 'Agente Procesador', value: 'Rodrigo Pérez — ID 0047' },
          { label: 'Hora de Inicio', value: '14:28:03' },
          { label: 'Hora de Autorización', value: '14:32:07' },
          { label: 'Tiempo Total', value: '4 min 04 seg', highlight: true },
          { label: 'Tamizaje IVE', value: 'NO COMPLETADO — PASO OMITIDO', highlight: true },
          { label: 'Sello IVE', value: 'AUSENTE', highlight: true },
          { label: 'Estado', value: 'COMPLETADA' },
        ],
        footer: 'NOTA DEL SISTEMA: El tiempo promedio de proceso incluyendo tamizaje IVE es de 7 minutos. Esta transacción se procesó en 4 minutos. El tamizaje obligatorio no fue registrado.',
      },
    },
    {
      id: 'e1-protocol',
      title: 'Protocolo Interno — Sección 4.3',
      description: 'Manual de Cumplimiento Banco Industrial, Edición 2024',
      detail: 'El Paso 3 de la secuencia de procesamiento exige tamizaje IVE obligatorio antes de la autorización. Los agentes tienen prohibido omitir este paso bajo cualquier circunstancia. Rodrigo Pérez firmó el protocolo el 15 de enero de 2026.',
      type: 'regulation',
      displayType: 'paper-doc',
      isKey: true,
      paperDocMeta: {
        docType: 'Reconocimiento de Protocolo de Cumplimiento',
        date: '15 de enero de 2026',
        parties: ['Banco Industrial, S.A.', 'Rodrigo Pérez — Analista de Crédito'],
        body:
          'PROTOCOLO DE PROCESAMIENTO DE TRANSFERENCIAS — SECCIÓN 4.3\n\nPASO 1: Verificar identidad del cliente y datos de la cuenta.\nPASO 2: Ingresar datos de la transferencia en el sistema.\nPASO 3 [OBLIGATORIO]: Ejecutar tamizaje IVE para montos superiores a Q50,000. ESTE PASO NO PUEDE SER OMITIDO BAJO NINGUNA CIRCUNSTANCIA.\nPASO 4: Aguardar confirmación de tamizaje antes de proceder.\nPASO 5: Autorizar la transferencia únicamente tras confirmación IVE.\n\nEl incumplimiento de la Sección 4.3 constituye una violación al protocolo interno y a las obligaciones legales bajo el Decreto 67-2001.',
        signature: 'Rodrigo Pérez',
        signatureDate: '15 de enero de 2026',
      },
    },
    {
      id: 'e1-ive-report',
      title: 'Informe de Señalamiento IVE — 7 Mar 2026',
      description: 'Intendencia de Verificación Especial — Ernesto Villanueva',
      detail: 'Villanueva confirmado como sujeto de investigación activa de lavado de dinero. La transferencia del 14 de febrero identificada como movimiento clave en una red de tres países. IVE notificó formalmente al Banco Industrial.',
      type: 'document',
      displayType: 'paper-doc',
      isKey: true,
      paperDocMeta: {
        docType: 'Informe de Señalamiento — Intendencia de Verificación Especial',
        date: '7 de marzo de 2026',
        parties: ['Intendencia de Verificación Especial (IVE)', 'Banco Industrial, S.A.'],
        body:
          'SUJETO: Ernesto Villanueva Castillo — DPI 2847-xxxxx\nESTATUS: SEÑALADO — Investigación Activa\n\nLa Intendencia de Verificación Especial confirma que el señor Ernesto Villanueva Castillo es sujeto de una investigación activa de lavado de dinero que abarca operaciones en Guatemala, El Salvador y Honduras.\n\nLa transferencia de Q500,000 registrada el 14 de febrero de 2026 en Banco Industrial, Sucursal Ciudad de Guatemala, ha sido identificada como un movimiento clave dentro de la cadena de lavado documentada.\n\nSe notifica formalmente a la institución financiera que dicha transacción fue procesada sin el tamizaje IVE requerido, hecho que constituye incumplimiento de las obligaciones bajo el Decreto 67-2001. La SIB ha sido informada para iniciar revisión regulatoria.',
        signature: 'Lic. Andrea Solís — Intendente de Verificación Especial',
        signatureDate: '7 de marzo de 2026',
      },
    },
    {
      id: 'e1-warnings',
      title: 'Historial de Advertencias — Rodrigo Pérez',
      description: 'Registros de RRHH — Banco Industrial',
      detail: 'Dos advertencias informales documentadas. Septiembre 2025: omitió tamizaje en transferencia de Q75,000. Noviembre 2025: omitió tamizaje en Q120,000. Ambas veces reconoció verbalmente. No se tomaron acciones formales.',
      type: 'document',
      displayType: 'paper-doc',
      isKey: false,
      paperDocMeta: {
        docType: 'Registro de Advertencias — Recursos Humanos',
        date: '14 de febrero de 2026',
        parties: ['Banco Industrial — RRHH', 'Rodrigo Pérez'],
        body:
          'INCIDENTE 1 — Septiembre 2025\nFecha: 12 de septiembre de 2025\nDescripción: Omisión de tamizaje IVE en transferencia de Q75,000. Cliente verificado retroactivamente — sin hallazgos. Agente fue recordado verbalmente de la obligación.\nAcción formal: Ninguna.\n\nINCIDENTE 2 — Noviembre 2025\nFecha: 8 de noviembre de 2025\nDescripción: Omisión de tamizaje IVE en transferencia de Q120,000. Detectado por auditoría de cumplimiento. Sin hallazgos en cliente. Agente reconoció el incumplimiento verbalmente.\nAcción formal: Ninguna.\n\nNOTA: En ambos casos, el agente Pérez reconoció la obligación y se comprometió a cumplirla. El comportamiento se repitió.',
      },
    },
    {
      id: 'e1-email-elena',
      title: 'Correo Electrónico — Elena Vásquez, 10 Feb 2026',
      description: 'Correo de supervisora a equipo — 4 días antes de la transacción',
      detail: 'Elena Vásquez envió un recordatorio de equipo el 10 de febrero: "Ninguna transferencia superior a Q50,000 debe procesarse sin tamizaje IVE completo. Esto es innegociable." El recibo de lectura de Rodrigo está confirmado. No respondió.',
      type: 'document',
      displayType: 'email',
      isKey: true,
      emailMeta: {
        from: 'Elena Vásquez <e.vasquez@bancoindustrial.com.gt>',
        to: 'Equipo de Crédito — Sucursal Centro <credito.centro@bancoindustrial.com.gt>',
        date: 'Lunes, 10 de febrero de 2026  09:14 CST',
        subject: 'RECORDATORIO URGENTE: Cumplimiento IVE — Circular SIB Febrero 2026',
        body:
          'Equipo,\n\nLes escribo en seguimiento a la circular emitida por la SIB la semana pasada.\n\nA partir de esta semana, la IVE ha reforzado su protocolo de seguimiento de transacciones en el sistema. Cualquier transferencia superior a Q50,000 que no cuente con el tamizaje IVE registrado antes de la autorización será marcada automáticamente para revisión regulatoria.\n\nRecuerden: NINGUNA transferencia superior a Q50,000 debe procesarse sin tamizaje IVE completo. Esto no es una sugerencia. Es una obligación legal bajo el Decreto 67-2001 y una obligación interna bajo nuestro protocolo de cumplimiento Sección 4.3. Esto es innegociable.\n\nSi tienen dudas, me consultan antes de procesar — no después.\n\nElen\n\n—\nElena Vásquez | Supervisora de Crédito\nBanco Industrial, S.A. — Sucursal Centro',
        hasReadReceipt: true,
      },
    },
  ],

  firstSceneId: 's1-opening',

  verdictRoutes: [
    { minCredibility: 80, sceneId: 's1-verdict-perfect' },
    { minCredibility: 50, sceneId: 's1-verdict-good' },
    { minCredibility: 20, sceneId: 's1-verdict-bad' },
    { minCredibility: 0,  sceneId: 's1-verdict-null' },
  ],

  postponedSceneId: 's1-postponed',

  scenes: {
    's1-opening': {
      id: 's1-opening',
      dialogues: [
        {
          id: 'd1-01',
          speaker: 'Magistrado Morales',
          portrait: 'morales-judge-neutral',
          side: 'center',
          text: 'El tribunal pasará a conocer el expediente contra el señor Rodrigo Pérez, analista de crédito del Banco Industrial, S.A., por incumplimiento doloso de las obligaciones de tamizaje ALD bajo el Decreto 67-2001. Fiscal, puede iniciar.',
        },
        {
          id: 'd1-02',
          speaker: 'Lic. Marco Fuentes (Defensa)',
          portrait: 'fuentes-smug',
          side: 'right',
          text: 'Con la venia del tribunal — mi cliente ha servido a Banco Industrial con distinción durante ocho años. Su expediente es impecable. El 14 de febrero tomó una decisión profesional basada en seis años de relación directa con un cliente de confianza. La ley fue escrita para atrapar criminales, no para penalizar a profesionales experimentados por confiar en su instinto.',
        },
        {
          id: 'd1-03',
          speaker: 'Rodrigo Pérez',
          portrait: 'rodrigo-confident',
          side: 'right',
          text: 'He procesado cientos de transacciones para Ernesto. Es un empresario legítimo. El tamizaje lo habría liberado de todas formas — siempre lo hacía. Yo conozco a mis clientes.',
        },
        {
          id: 'd1-04',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'La defensa argumenta que el resultado del tamizaje habría sido el mismo. ¿Cómo respondes a eso?',
          choices: [
            {
              id: 'c1-a',
              label: '"Si el tamizaje hubiera liberado al cliente, ¿por qué omitirlo? La obligación existe precisamente porque el agente no puede saber el resultado de antemano."',
              isCorrect: true,
              feedback: '',
              nextSceneId: 's1-obligation',
            },
            {
              id: 'c1-b',
              label: '"Esta vez el tamizaje NO lo habría liberado — el cliente era culpable."',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'Magistrado Morales interrumpe: "Fiscal, el resultado posterior no es el estándar legal. La obligación existía antes de conocer el resultado. Reformule."',
              nextSceneId: 's1-wrong-c1b',
            },
            {
              id: 'c1-c',
              label: '"¿Cuántas de esas cientos de transacciones anteriores sí completó el tamizaje?"',
              isCorrect: false,
              wrongPenalty: 10,
              feedback: 'Fuentes objeta: "Irrelevante, Su Señoría." El juez lo admite. Pierdes terreno.',
              nextSceneId: 's1-wrong-c1c',
            },
          ],
        },
      ],
    },

    's1-obligation': {
      id: 's1-obligation',
      dialogues: [
        {
          id: 'd1-05',
          speaker: 'Nicolas',
          portrait: 'nicolas-confident',
          side: 'left',
          overlay: 'HOLD IT',
          text: 'La obligación existe exactamente porque el agente NO puede conocer el resultado de antemano. Ese es el propósito del tamizaje. El señor Pérez asumió el resultado — y procedió como si ya lo conociera.',
        },
        {
          id: 'd1-06',
          speaker: 'Rodrigo Pérez',
          portrait: 'rodrigo-confident',
          side: 'right',
          text: 'La ley es una guía. Los agentes experimentados usamos el juicio profesional. Eso es lo que nos pagan por hacer.',
        },
        {
          id: 'd1-07',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'El acusado dice que la ley es "una guía" y que los agentes usan "juicio profesional". ¿Cuál es la respuesta correcta?',
          choices: [
            {
              id: 'c2-a',
              label: 'Presentar el Protocolo Interno Sección 4.3 — firmado por Pérez el 15 de enero de 2026.',
              isCorrect: true,
              feedback: '',
              nextSceneId: 's1-protocol-hit',
            },
            {
              id: 'c2-b',
              label: '"La ley no es una guía. Es una obligación."',
              isCorrect: false,
              wrongPenalty: 10,
              feedback: 'Magistrado Morales: "Fiscal, afirme con evidencia, no con declaraciones."',
              nextSceneId: 's1-wrong-c2b',
            },
            {
              id: 'c2-c',
              label: 'Presentar el Informe IVE de señalamiento de Villanueva.',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'Fuentes objeta: "Su Señoría, ese documento es prematuro. La obligación aún no ha sido establecida." Admitido. Credibilidad dañada.',
              nextSceneId: 's1-wrong-c2c',
            },
          ],
        },
      ],
    },

    's1-protocol-hit': {
      id: 's1-protocol-hit',
      dialogues: [
        {
          id: 'd1-08',
          speaker: 'Nicolas',
          portrait: 'nicolas-confident',
          side: 'left',
          overlay: 'TAKE THAT',
          text: 'Señor Pérez — usted firmó este protocolo el 15 de enero de 2026. El Paso 3 no dice "guideline." Dice "OBLIGATORIO." Y dice: "ESTE PASO NO PUEDE SER OMITIDO BAJO NINGUNA CIRCUNSTANCIA." Su firma está aquí.',
        },
        {
          id: 'd1-09',
          speaker: 'Rodrigo Pérez',
          portrait: 'rodrigo-sweating',
          side: 'right',
          text: 'En la práctica... los agentes senior siempre hemos tenido cierta discreción en casos urgentes. Es cultura institucional.',
        },
        {
          id: 'd1-10',
          speaker: 'Magistrado Morales',
          portrait: 'morales-judge-neutral',
          side: 'center',
          text: 'Fiscal — la defensa argumenta que existe una práctica informal de excepciones para agentes senior. ¿Cómo responde?',
        },
        {
          id: 'd1-11',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'El acusado invoca "cultura institucional" como defensa. ¿Qué evidencia derrumba esto directamente?',
          choices: [
            {
              id: 'c3-a',
              label: 'Presentar Decreto 67-2001 Art. 18 — la ley no contempla excepciones por jerarquía ni urgencia.',
              isCorrect: true,
              feedback: '',
              nextSceneId: 's1-evidence-present-1',
            },
            {
              id: 'c3-b',
              label: '"Otros agentes senior también deberían ser investigados si existe esa cultura."',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'Fuentes: "Su Señoría, el fiscal está ampliando la causa sin fundamento." Admitido. Pierde enfoque.',
              nextSceneId: 's1-wrong-c3b',
            },
            {
              id: 'c3-c',
              label: '"Acepto que la discreción senior puede ser válida en situaciones urgentes."',
              isCorrect: false,
              wrongPenalty: 25,
              feedback: 'Catastrófico. Concediste el argumento central. Fuentes salta sobre la concesión.',
              nextSceneId: 's1-wrong-c3c',
            },
          ],
        },
      ],
    },

    's1-elena': {
      id: 's1-elena',
      dialogues: [
        {
          id: 'd1-12',
          speaker: 'Nicolas',
          portrait: 'nicolas-confident',
          side: 'left',
          overlay: 'OBJECTION',
          text: 'El Artículo 18 del Decreto 67-2001 no reconoce excepciones por jerarquía, urgencia, ni relación con el cliente. Ninguna. La "cultura institucional" que invoca la defensa no tiene valor legal frente a un texto que dice expresamente: "sin excepción alguna."',
        },
        {
          id: 'd1-13',
          speaker: 'Lic. Marco Fuentes (Defensa)',
          portrait: 'fuentes-rattled',
          side: 'right',
          text: 'Objeción, Su Señoría. El Fiscal está intentando responsabilizar a la supervisora por la decisión independiente de un agente. El correo fue enviado. La obligación fue comunicada. Lo que el agente haga con esa información está fuera del control supervisorial.',
        },
        {
          id: 'd1-14',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'Fuentes objeta que la supervisora no puede ser responsable. Tienes 10 segundos para responder.',
          timedObjection: true,
          timedSeconds: 10,
          choices: [
            {
              id: 'c4-a',
              label: 'OBJECCIÓN — "El historial de advertencias previas establece que esto no fue una decisión aislada — fue un patrón documentado que la supervisora conocía y no escaló. La conciencia del patrón crea obligación supervisorial bajo el Decreto 67-2001."',
              isCorrect: true,
              feedback: '',
              nextSceneId: 's1-closing',
              // If credibility >= 50, Fuentes plays his Elena witness card
              credibilityGate: { minCredibility: 50, alternateSceneId: 's1-elena-defense' },
            },
            {
              id: 'c4-b',
              label: 'OBJECCIÓN — "La supervisora debió haber sido más específica en el correo."',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'Magistrado Morales: "Admitida la objeción de la defensa. Eso no es un argumento legal, Fiscal."',
              nextSceneId: 's1-wrong-c4b',
            },
            {
              id: 'c4-c',
              label: '(No decir nada — dejar pasar la objeción)',
              isCorrect: false,
              wrongPenalty: 20,
              feedback: 'Silencio fatal. La objeción queda sin respuesta. Credibilidad dañada.',
              nextSceneId: 's1-wrong-c4c',
            },
          ],
        },
      ],
    },

    's1-closing': {
      id: 's1-closing',
      dialogues: [
        {
          id: 'd1-15',
          speaker: 'Magistrado Morales',
          portrait: 'morales-judge-neutral',
          side: 'center',
          text: 'Objeción rechazada. El Fiscal puede continuar.',
        },
        {
          id: 'd1-16',
          speaker: 'Lic. Marco Fuentes (Defensa)',
          portrait: 'fuentes-rattled',
          side: 'right',
          text: 'Su Señoría — el cliente habría sido señalado de todos modos. La investigación IVE ya estaba en curso. La decisión de mi cliente no habilitó el lavado — ya estaba ocurriendo. Ningún daño adicional fue causado.',
        },
        {
          id: 'd1-17',
          speaker: 'Magistrado Morales',
          portrait: 'morales-judge-neutral',
          side: 'center',
          text: 'Fiscal — la defensa sostiene que la acción del acusado no causó daño adicional porque el proceso de lavado ya estaba activo. Es el argumento más importante de este juicio. ¿Su respuesta?',
        },
        {
          id: 'd1-18',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'Este es el momento más importante del caso. El argumento de Fuentes es que "no hubo daño adicional." ¿Cuál es la falla legal exacta en ese razonamiento?',
          choices: [
            {
              id: 'c5-a',
              label: 'OBJECCIÓN — "El cumplimiento regulatorio no depende del resultado. La obligación bajo el Decreto 67-2001 existe en el momento de la transacción — no en función de lo que ocurra después. Culpable o inocente el cliente, hubiera o no hubiera daño: el tamizaje era obligatorio. Eso es todo."',
              isCorrect: true,
              feedback: '',
              nextSceneId: 's1-verdict-scene',
            },
            {
              id: 'c5-b',
              label: 'OBJECCIÓN — "La acción de mi cliente sí causó daño — movió dinero a través de la red de lavado."',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'Fuentes contraataca: "El dinero se habría movido igualmente." El juez da la razón a la defensa. Credibilidad dañada.',
              nextSceneId: 's1-wrong-c5b',
            },
            {
              id: 'c5-c',
              label: 'OBJECCIÓN — "El cliente era culpable."',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'Magistrado Morales: "Fiscal, la culpa del cliente no es la cuestión ante este tribunal."',
              nextSceneId: 's1-wrong-c5c',
            },
          ],
        },
      ],
    },

    's1-verdict-scene': {
      id: 's1-verdict-scene',
      dialogues: [
        {
          id: 'd1-19',
          speaker: 'Nicolas',
          portrait: 'nicolas-confident',
          side: 'left',
          overlay: 'OBJECTION',
          text: 'Su Señoría — el cumplimiento regulatorio no depende del resultado. La obligación bajo el Decreto 67-2001 existe en el momento de la transacción. No en función de lo que ocurra después. El tamizaje era obligatorio. No se completó. Eso es todo.',
        },
        {
          id: 'd1-20',
          speaker: 'Lic. Marco Fuentes (Defensa)',
          portrait: 'fuentes-rattled',
          side: 'right',
          text: '...',
        },
        {
          id: 'd1-21',
          speaker: 'Magistrado Morales',
          portrait: 'morales-judge-neutral',
          side: 'center',
          text: 'Objeción admitida. La defensa, el incumplimiento no requiere daño demostrado. Requiere que el paso no se completó. Eso ha sido probado.',
        },
        {
          id: 'd1-22',
          speaker: 'Rodrigo Pérez',
          portrait: 'rodrigo-cornered',
          side: 'right',
          text: '...',
        },
        {
          id: 'd1-23',
          speaker: 'Magistrado Morales',
          portrait: 'judge-angry',
          side: 'center',
          text: 'El tribunal declara culpable al acusado Rodrigo Pérez por incumplimiento doloso de las obligaciones de tamizaje ALD bajo el Decreto 67-2001. El agente conocía el requisito legal, había sido advertido dos veces con anterioridad, recibió un recordatorio escrito cuatro días antes, y procedió de todas formas. La ley no contempla excepciones por juicio personal. Proporciona un procedimiento. Ese procedimiento no fue seguido.',
        },
      ],
      nextSceneId: 's1-verdict',
    },

    's1-verdict': {
      id: 's1-verdict',
      isVerdictScene: true,
      dialogues: [],
      verdictData: {
        outcome: 'guilty',
        title: 'CULPABLE',
        subtitle: 'Rodrigo Pérez — incumplimiento doloso de obligaciones ALD, Decreto 67-2001',
        lessonTitle: 'La Confianza No es un Procedimiento',
        lessonText:
          'Rodrigo no era un agente descuidado. Era un agente seguro de sí mismo. Ocho años de experiencia, un historial impecable — y creyó que ese historial le daba el derecho de decidir cuándo aplicaba la ley.\n\nNo le daba ese derecho.\n\nEl paso del tamizaje existe precisamente porque el juicio humano, por más experimentado que sea, tiene límites. Por eso se escribió la ley. La confianza sin verificación no es profesionalismo. Es exposición.\n\nAntes del Caso 2: pregúntate — ¿cuándo fue la última vez que conocías tan bien una situación que no viste la necesidad de verificar?',
        regulationRef: 'Decreto 67-2001, Art. 18 / Protocolo BI Sección 4.3',
      },
    },

    // ── Evidence presentation scene ────────────────────────────────────────

    's1-evidence-present-1': {
      id: 's1-evidence-present-1',
      isEvidencePresentScene: true,
      relevantEvidenceIds: ['e1-warnings', 'e1-transaction-log'],
      correctEvidenceIds: ['e1-warnings', 'e1-transaction-log'],
      evidenceBonusCredibility: 5,
      evidencePenaltyCredibility: 8,
      nextSceneId: 's1-cross-exam',
      dialogues: [
        {
          id: 'd1-ep1',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'Antes del contrainterrogatorio, tengo una oportunidad de presentar evidencia adicional ante el tribunal. Dos documentos podrían fortalecer mi posición ahora mismo: el registro de tiempo de la transacción, y el historial de advertencias previas de Pérez. ¿Qué presento?',
        },
      ],
    },

    // ── Cross-examination of Rodrigo Pérez ─────────────────────────────────

    's1-cross-exam': {
      id: 's1-cross-exam',
      nextSceneId: 's1-elena',
      dialogues: [
        {
          id: 'd-cx-01',
          speaker: 'Nicolas',
          portrait: 'nicolas-confident',
          side: 'left',
          text: 'Señor Pérez, con la venia del tribunal, quisiera aclarar algunos puntos directamente con usted.',
        },
        {
          id: 'd-cx-02',
          speaker: 'Rodrigo Pérez',
          portrait: 'rodrigo-confident',
          side: 'right',
          text: 'Adelante, Fiscal. No tengo nada que ocultar.',
        },
        {
          id: 'd-cx-03',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: '¿Cómo atacas el contrainterrogatorio?',
          choices: [
            {
              id: 'cx-a',
              label: '"Señor Pérez — el registro bancario muestra que esta transacción tomó 4 minutos 4 segundos. El tamizaje IVE toma un mínimo de 7 minutos. ¿Cómo explica usted esa diferencia?"',
              isCorrect: true,
              feedback: '',
              nextSceneId: 's1-cross-exam-timeline',
            },
            {
              id: 'cx-b',
              label: '"Señor Pérez — en septiembre y noviembre de 2025 ya fue advertido verbalmente por omitir este mismo paso. ¿Por qué repitió la conducta por tercera vez?"',
              isCorrect: true,
              feedback: '',
              nextSceneId: 's1-cross-exam-pattern',
            },
            {
              id: 'cx-c',
              label: '"Señor Pérez — ¿leyó usted el correo que Elena Vásquez le envió el 10 de febrero, cuatro días antes de esta transacción?"',
              isCorrect: false,
              wrongPenalty: 10,
              feedback: 'Fuentes objeta: "Su Señoría, el correo de la supervisora no ha sido presentado formalmente aún como parte del expediente en este contrainterrogatorio." Admitido. Pierdes terreno.',
              nextSceneId: 's1-cross-exam-bad',
            },
          ],
        },
      ],
    },

    's1-cross-exam-timeline': {
      id: 's1-cross-exam-timeline',
      nextSceneId: 's1-elena',
      dialogues: [
        {
          id: 'd-cx-tl-01',
          speaker: 'Rodrigo Pérez',
          portrait: 'rodrigo-sweating',
          side: 'right',
          text: 'El... el sistema a veces no registra los tiempos con precisión. Hay latencia. Yo lo completé. Simplemente el sistema no lo capturó.',
        },
        {
          id: 'd-cx-tl-02',
          speaker: 'Nicolas',
          portrait: 'nicolas-confident',
          side: 'left',
          overlay: 'HOLD IT',
          text: 'El sistema registra con precisión de segundos cada operación. El sello IVE está ausente — no mal registrado. Ausente. ¿Cuándo fue la última vez que el sistema "no capturó" un sello IVE en una transacción suya?',
        },
        {
          id: 'd-cx-tl-03',
          speaker: 'Rodrigo Pérez',
          portrait: 'rodrigo-cornered',
          side: 'right',
          text: '...',
        },
        {
          id: 'd-cx-tl-04',
          speaker: 'Magistrado Morales',
          portrait: 'morales-judge-neutral',
          side: 'center',
          text: 'El tribunal toma nota. La contradicción entre el tiempo de proceso y el tiempo requerido por el protocolo queda registrada. Continúe, Fiscal.',
        },
      ],
    },

    's1-cross-exam-pattern': {
      id: 's1-cross-exam-pattern',
      nextSceneId: 's1-elena',
      dialogues: [
        {
          id: 'd-cx-pt-01',
          speaker: 'Rodrigo Pérez',
          portrait: 'rodrigo-sweating',
          side: 'right',
          text: 'Esas... fueron situaciones diferentes. Los clientes eran conocidos. Aquí también. Ernesto ha sido cliente por seis años — no hay comparación.',
        },
        {
          id: 'd-cx-pt-02',
          speaker: 'Nicolas',
          portrait: 'nicolas-confident',
          side: 'left',
          overlay: 'HOLD IT',
          text: 'Entonces su defensa es que conocía al cliente. En septiembre: conocía al cliente. En noviembre: conocía al cliente. En febrero: conocía al cliente. ¿Cuándo exactamente aplica usted el tamizaje, señor Pérez — cuando NO conoce al cliente?',
        },
        {
          id: 'd-cx-pt-03',
          speaker: 'Rodrigo Pérez',
          portrait: 'rodrigo-cornered',
          side: 'right',
          text: 'Yo... siempre... depende del caso.',
        },
        {
          id: 'd-cx-pt-04',
          speaker: 'Magistrado Morales',
          portrait: 'morales-judge-neutral',
          side: 'center',
          text: 'La respuesta queda registrada. "Depende del caso" no es un protocolo. Es discreción no autorizada. Continúe, Fiscal.',
        },
      ],
    },

    's1-cross-exam-bad': {
      id: 's1-cross-exam-bad',
      nextSceneId: 's1-elena',
      dialogues: [
        {
          id: 'd-cx-bad-01',
          speaker: 'Magistrado Morales',
          portrait: 'morales-judge-neutral',
          side: 'center',
          text: 'La objeción de la defensa es admitida. Fiscal, el correo de la supervisora debe ser presentado formalmente antes de utilizarlo en el contrainterrogatorio. Proceda con otro argumento o reserve esa línea.',
        },
        {
          id: 'd-cx-bad-02',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'Me adelanté. El correo de Elena es una pieza clave, pero necesito presentarlo en el momento correcto. Fuentes anotó el error.',
        },
      ],
    },

    // ── Elena Vásquez como testigo de la defensa (solo si credibilidad ≥ 50) ──

    's1-elena-defense': {
      id: 's1-elena-defense',
      nextSceneId: 's1-closing',
      dialogues: [
        {
          id: 'd-ed-01',
          speaker: 'Lic. Marco Fuentes (Defensa)',
          portrait: 'fuentes-smug',
          side: 'right',
          text: 'Su Señoría — con la venia del tribunal, la defensa llama a Elena Vásquez como testigo.',
        },
        {
          id: 'd-ed-02',
          speaker: 'Elena Vásquez',
          portrait: 'elena-nervous',
          side: 'right',
          text: 'Su Señoría... no estaba informada de que sería llamada a declarar hoy.',
        },
        {
          id: 'd-ed-03',
          speaker: 'Lic. Marco Fuentes (Defensa)',
          portrait: 'fuentes-smug',
          side: 'right',
          text: 'Señora Vásquez — ¿es correcto que el señor Pérez ya había omitido el tamizaje en transacciones anteriores y usted no tomó ninguna acción disciplinaria formal?',
        },
        {
          id: 'd-ed-04',
          speaker: 'Elena Vásquez',
          portrait: 'elena-nervous',
          side: 'right',
          text: 'Sí, pero fueron advertencias verbales. Creímos que era suficiente para corregir la conducta. No queríamos escalar innecesariamente.',
        },
        {
          id: 'd-ed-05',
          speaker: 'Lic. Marco Fuentes (Defensa)',
          portrait: 'fuentes-smug',
          side: 'right',
          text: 'Entonces el banco, bajo su supervisión directa, toleró y normalizó este comportamiento. Mi cliente no inventó una excepción — la institución la creó. Su Señoría, solicito que se evalúe la responsabilidad institucional como factor atenuante.',
        },
        {
          id: 'd-ed-06',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'Fuentes ha usado el testimonio de Elena para argumentar que el banco normalizó el incumplimiento. Tienes 12 segundos para objetar.',
          timedObjection: true,
          timedSeconds: 12,
          choices: [
            {
              id: 'ced-a',
              label: 'OBJECCIÓN — "Exactamente lo contrario, Su Señoría. Las advertencias documentadas prueban que la institución reconoció la conducta como inaceptable y la registró formalmente. El señor Pérez fue advertido dos veces y eligió continuar. Eso no es normalización — es incumplimiento reiterado con conocimiento."',
              isCorrect: true,
              feedback: '',
              nextSceneId: 's1-closing',
            },
            {
              id: 'ced-b',
              label: 'OBJECCIÓN — "La señora Vásquez fue coaccionada para testificar. Su testimonio no es válido."',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'Magistrado Morales: "Fiscal, ese argumento carece de fundamento. La testigo fue llamada legítimamente. Reformule o retira la objeción."',
              nextSceneId: 's1-elena-defense-bad',
            },
            {
              id: 'ced-c',
              label: '(No objetar — dejar que el argumento de Fuentes quede en pie)',
              isCorrect: false,
              wrongPenalty: 20,
              feedback: 'El silencio es letal. Fuentes sonríe. El argumento de atenuante institucional queda sin respuesta en el registro.',
              nextSceneId: 's1-elena-defense-bad',
            },
          ],
        },
      ],
    },

    's1-elena-defense-bad': {
      id: 's1-elena-defense-bad',
      nextSceneId: 's1-closing',
      dialogues: [
        {
          id: 'd-ed-bad-01',
          speaker: 'Magistrado Morales',
          portrait: 'morales-judge-neutral',
          side: 'center',
          text: 'El argumento de la defensa sobre responsabilidad institucional queda registrado. La fiscalía tendrá la oportunidad de responderlo en el alegato de cierre.',
        },
        {
          id: 'd-ed-bad-02',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'Fuentes anotó ese punto. Necesito recuperarlo en el cierre — el argumento correcto es que las advertencias documentadas prueban exactamente lo contrario: la institución nunca aceptó esta conducta como válida.',
        },
      ],
    },

    // ── Verdict scenes (credibilidad-gated) ────────────────────────────────

    's1-verdict-perfect': {
      id: 's1-verdict-perfect',
      isVerdictScene: true,
      dialogues: [],
      verdictData: {
        outcome: 'guilty',
        title: 'CULPABLE',
        subtitle: 'Rodrigo Pérez — incumplimiento doloso de obligaciones ALD, Decreto 67-2001',
        lessonTitle: 'La Confianza No es un Procedimiento',
        lessonText:
          'Rodrigo no era un agente descuidado. Era un agente seguro de sí mismo. Ocho años de experiencia, un historial impecable — y creyó que ese historial le daba el derecho de decidir cuándo aplicaba la ley.\n\nNo le daba ese derecho.\n\nTu ejecución fue impecable. Presentaste la evidencia en el orden correcto, estableciste la obligación antes de mostrar las consecuencias, y no cediste terreno en ningún momento. El tribunal no tuvo otra opción.\n\nEl paso del tamizaje existe precisamente porque el juicio humano, por más experimentado que sea, tiene límites. Por eso se escribió la ley. La confianza sin verificación no es profesionalismo. Es exposición.\n\nAntes del Caso 2: pregúntate — ¿cuándo fue la última vez que conocías tan bien una situación que no viste la necesidad de verificar?',
        regulationRef: 'Decreto 67-2001, Art. 18 / Protocolo BI Sección 4.3',
      },
    },

    's1-verdict-good': {
      id: 's1-verdict-good',
      isVerdictScene: true,
      dialogues: [],
      verdictData: {
        outcome: 'guilty-reduced',
        title: 'CULPABLE',
        subtitle: 'Con atenuantes — Sentencia reducida tras apelación parcial de la defensa',
        lessonTitle: 'Ganaste, Pero Dejaste Puntos Sobre la Mesa',
        lessonText:
          'Rodrigo fue declarado culpable — la evidencia era suficiente. Pero Fuentes explotó los momentos donde tu argumento fue débil para negociar una sentencia menor. El banco enfrentará una multa reducida.\n\nUn caso bien construido no da espacios. Cada argumento débil es una palanca para la defensa. El resultado fue correcto, pero el proceso costó más de lo necesario.\n\nLección: en cumplimiento, como en compliance, los procedimientos existen para cerrar las grietas antes de que alguien las explote. Un argumento a medias es tan peligroso como ningún argumento.\n\nAntes del Caso 2: revisa en qué momento cediste terreno innecesariamente. Ese es el punto que debes fortalecer.',
        regulationRef: 'Decreto 67-2001, Art. 18 / Protocolo BI Sección 4.3',
      },
    },

    's1-verdict-bad': {
      id: 's1-verdict-bad',
      isVerdictScene: true,
      dialogues: [],
      verdictData: {
        outcome: 'acquitted',
        title: 'ABSUELTO',
        subtitle: 'Evidencia presentada insuficientemente — Rodrigo Pérez queda libre',
        lessonTitle: 'La Evidencia Existía. El Problema Fue la Presentación.',
        lessonText:
          'Rodrigo Pérez sale libre. No porque fuera inocente — los hechos estaban claros. Sino porque Fuentes explotó cada error argumental hasta que el tribunal consideró que la fiscalía no había establecido el caso con suficiente solidez.\n\nTenías el Decreto 67-2001. Tenías el protocolo firmado. Tenías el registro de la transacción. Tenías el correo de Elena con read receipt. Tenías las advertencias previas.\n\nNo falló la evidencia. Falló la forma en que se presentó.\n\nEsta es la lección más dura del compliance: no basta con tener razón. Hay que poder demostrarlo, en orden, sin conceder terreno, con cada pieza en su momento correcto.\n\nReinicia el caso y construye el argumento que merecía esa evidencia.',
        regulationRef: 'Decreto 67-2001, Art. 18 / Protocolo BI Sección 4.3',
      },
    },

    's1-verdict-null': {
      id: 's1-verdict-null',
      isVerdictScene: true,
      dialogues: [],
      verdictData: {
        outcome: 'null-trial',
        title: 'JUICIO NULO',
        subtitle: 'Nulidad declarada por mala práctica fiscal — expediente devuelto',
        lessonTitle: 'Cuando el Proceso Falla, el Sistema Falla',
        lessonText:
          'Magistrado Morales declara nulidad. El expediente es devuelto a la fiscalía. Rodrigo Pérez queda en libertad provisional.\n\nNo fue falta de evidencia. Fue una cadena de errores argumentales que socavó la credibilidad de la fiscalía hasta el punto en que el tribunal no puede dictar sentencia válida sobre esta base.\n\nEn compliance, como en derecho, la forma es tan importante como el fondo. Un procedimiento mal ejecutado invalida incluso los resultados correctos. Si el tamizaje de Pérez fue omitido, la presentación de la fiscalía también lo fue.\n\nReinicia desde el principio. La evidencia sigue estando ahí. Esta vez, úsala correctamente.',
        regulationRef: 'Decreto 67-2001, Art. 18 / Protocolo BI Sección 4.3',
      },
    },

    's1-postponed': {
      id: 's1-postponed',
      isVerdictScene: true,
      dialogues: [],
      verdictData: {
        outcome: 'postponed',
        title: 'SESIÓN POSTERGADA',
        subtitle: 'El tribunal levanta la sesión — el caso queda pendiente',
        lessonTitle: 'El Tiempo También es un Recurso de Compliance',
        lessonText:
          'Magistrado Morales levanta la sesión. El tribunal agotó el tiempo asignado sin llegar a veredicto. El caso se pospone para nueva fecha.\n\nRodrigo Pérez sale del salón sin condena. Fuentes lo felicita.\n\nEn un juicio real, el tiempo perdido en argumentos incorrectos, evidencia mal presentada o silencios prolongados tiene un costo directo: la justicia se demora, y a veces no llega.\n\nEn compliance es igual. Los procedimientos tienen plazos. Las obligaciones tienen ventanas. El tamizaje IVE existe precisamente porque esperar "el momento correcto" no es una opción válida.\n\nReinicia el caso. Esta vez: muévete con precisión y velocidad.',
        regulationRef: 'Decreto 67-2001, Art. 18 / Protocolo BI Sección 4.3',
      },
    },

    // ── Wrong-choice branch scenes ─────────────────────────────────────────

    's1-wrong-c1b': {
      id: 's1-wrong-c1b',
      nextSceneId: 's1-obligation',
      dialogues: [
        {
          id: 'd1-w01a',
          speaker: 'Magistrado Morales',
          portrait: 'morales-judge-neutral',
          side: 'center',
          text: 'Fiscal — la culpa posterior del cliente es irrelevante a la cuestión ante este tribunal. El estándar legal no es "¿era culpable el cliente?" sino "¿existía la obligación de tamizar en el momento de la transacción?" Reformule.',
        },
        {
          id: 'd1-w01b',
          speaker: 'Lic. Marco Fuentes (Defensa)',
          portrait: 'fuentes-smug',
          side: 'right',
          text: 'Precisamente, Su Señoría. El fiscal confunde el resultado con la obligación. Si el estándar fuera el resultado, ningún agente experimentado jamás necesitaría tamizar a un cliente conocido.',
        },
        {
          id: 'd1-w01c',
          speaker: 'Rodrigo Pérez',
          portrait: 'rodrigo-confident',
          side: 'right',
          text: 'Exactamente. He procesado cientos de transacciones para Ernesto. Siempre fue legítimo. Mi juicio fue correcto.',
        },
        {
          id: 'd1-w01d',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'El juez tiene razón. Cometí un error. La defensa lo capitalizó. Debo redirigir el argumento al momento de la obligación — no al resultado.',
        },
      ],
    },

    's1-wrong-c1c': {
      id: 's1-wrong-c1c',
      nextSceneId: 's1-obligation',
      dialogues: [
        {
          id: 'd1-w02a',
          speaker: 'Lic. Marco Fuentes (Defensa)',
          portrait: 'fuentes-smug',
          side: 'right',
          text: 'Objeción, Su Señoría. La pregunta del fiscal es irrelevante. El cumplimiento histórico de mi cliente no está en disputa. Lo que está en disputa es una sola transacción y la legalidad de la decisión que tomó ese día.',
        },
        {
          id: 'd1-w02b',
          speaker: 'Magistrado Morales',
          portrait: 'morales-judge-neutral',
          side: 'center',
          text: 'Admitida. Fiscal, su pregunta no avanza el argumento legal. Enfóquese en la obligación existente el 14 de febrero.',
        },
        {
          id: 'd1-w02c',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'Me fui por las ramas. El historial anterior no importa aquí — lo que importa es la obligación en ese momento específico.',
        },
      ],
    },

    's1-wrong-c2b': {
      id: 's1-wrong-c2b',
      nextSceneId: 's1-protocol-hit',
      dialogues: [
        {
          id: 'd1-w03a',
          speaker: 'Magistrado Morales',
          portrait: 'morales-judge-neutral',
          side: 'center',
          text: 'Fiscal, afirmar que "la ley es obligación" es una tautología, no un argumento. El tribunal espera que fundamente esa obligación con evidencia concreta. ¿Qué documento le respalda?',
        },
        {
          id: 'd1-w03b',
          speaker: 'Lic. Marco Fuentes (Defensa)',
          portrait: 'fuentes-smug',
          side: 'right',
          text: 'Su Señoría, si el fiscal carece de evidencia documental que sustente la obligación específica, le solicito que se archive la causa por falta de fundamento probatorio.',
        },
        {
          id: 'd1-w03c',
          speaker: 'Magistrado Morales',
          portrait: 'morales-judge-neutral',
          side: 'center',
          text: 'Fiscal — una última oportunidad. Presente la evidencia que establece la obligación, o admitamos la moción de la defensa.',
        },
        {
          id: 'd1-w03d',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'Tengo el Protocolo Interno firmado por Pérez. Necesito presentarlo ahora antes de que sea demasiado tarde.',
        },
      ],
    },

    's1-wrong-c2c': {
      id: 's1-wrong-c2c',
      nextSceneId: 's1-protocol-hit',
      dialogues: [
        {
          id: 'd1-w04a',
          speaker: 'Lic. Marco Fuentes (Defensa)',
          portrait: 'fuentes-smug',
          side: 'right',
          text: 'Objeción, Su Señoría. El Informe IVE es prematuro. El fiscal aún no ha establecido que existía una obligación de tamizar. Presentar el resultado del señalamiento antes de probar la obligación invierte la carga probatoria.',
        },
        {
          id: 'd1-w04b',
          speaker: 'Magistrado Morales',
          portrait: 'morales-judge-neutral',
          side: 'center',
          text: 'Admitida. Fiscal, el Informe IVE queda excluido de momento. Deberá establecer primero la obligación legal antes de presentar consecuencias. Proceda en orden.',
        },
        {
          id: 'd1-w04c',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'Me adelanté. Perdí una pieza clave de evidencia por mal orden. Debo retroceder y establecer la obligación correctamente — el Protocolo firmado por Pérez es el punto de partida.',
        },
      ],
    },

    's1-wrong-c3b': {
      id: 's1-wrong-c3b',
      nextSceneId: 's1-elena',
      dialogues: [
        {
          id: 'd1-w05a',
          speaker: 'Lic. Marco Fuentes (Defensa)',
          portrait: 'fuentes-smug',
          side: 'right',
          text: 'Objeción, Su Señoría. El fiscal está convirtiendo este juicio en una cacería institucional sin fundamento. Mi cliente no está aquí para responder por sus colegas.',
        },
        {
          id: 'd1-w05b',
          speaker: 'Magistrado Morales',
          portrait: 'morales-judge-neutral',
          side: 'center',
          text: 'Admitida. Fiscal, este tribunal conoce el caso de Rodrigo Pérez, no la cultura interna del banco. Manténgase en los hechos del expediente. Siguiente argumento.',
        },
        {
          id: 'd1-w05c',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'Me salí del caso. La "cultura institucional" como defensa debe ser atacada con la ley, no expandiendo la causa. El Artículo 18 no tiene excepciones. Ese es el argumento.',
        },
      ],
    },

    's1-wrong-c3c': {
      id: 's1-wrong-c3c',
      nextSceneId: 's1-elena',
      dialogues: [
        {
          id: 'd1-w06a',
          speaker: 'Lic. Marco Fuentes (Defensa)',
          portrait: 'fuentes-smug',
          side: 'right',
          text: 'Su Señoría — el propio fiscal acaba de conceder que la discreción senior puede ser válida en situaciones urgentes. Solicito que esa concesión quede registrada en el expediente.',
        },
        {
          id: 'd1-w06b',
          speaker: 'Magistrado Morales',
          portrait: 'morales-judge-neutral',
          side: 'center',
          text: 'Registrada. Fiscal — acaba de ceder el argumento central de la fiscalía. Si acepta que existe discreción, debe demostrar por qué en este caso específico esa discreción fue mal ejercida. El umbral acaba de subir considerablemente.',
        },
        {
          id: 'd1-w06c',
          speaker: 'Rodrigo Pérez',
          portrait: 'rodrigo-confident',
          side: 'right',
          text: 'Exactamente. Usé mi juicio profesional. Eso es lo que me paga el banco.',
        },
        {
          id: 'd1-w06d',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'Error grave. Concedí territorio que no debí ceder. Necesito recuperar el terreno apelando al texto literal del Decreto — no existe ninguna excepción en el Artículo 18. Ninguna.',
        },
      ],
    },

    's1-wrong-c4b': {
      id: 's1-wrong-c4b',
      nextSceneId: 's1-closing',
      dialogues: [
        {
          id: 'd1-w07a',
          speaker: 'Magistrado Morales',
          portrait: 'morales-judge-neutral',
          side: 'center',
          text: 'Admitida la objeción de la defensa. Fiscal, argumentar que la supervisora "debió ser más específica" no establece responsabilidad supervisorial bajo ningún marco legal vigente. Es una opinión, no un argumento jurídico.',
        },
        {
          id: 'd1-w07b',
          speaker: 'Lic. Marco Fuentes (Defensa)',
          portrait: 'fuentes-smug',
          side: 'right',
          text: 'Gracias, Su Señoría. Mi clienta cumplió con notificar. El correo fue enviado, fue leído, fue confirmado. Lo que ocurrió después fue decisión del agente, no falla supervisorial.',
        },
        {
          id: 'd1-w07c',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'La objeción fue admitida. Fuentes tiene razón en que el correo fue enviado. El argumento de responsabilidad supervisorial quedó débil — pero el caso contra Pérez aún es sólido.',
        },
      ],
    },

    's1-wrong-c4c': {
      id: 's1-wrong-c4c',
      nextSceneId: 's1-closing',
      dialogues: [
        {
          id: 'd1-w08a',
          speaker: 'Lic. Marco Fuentes (Defensa)',
          portrait: 'fuentes-smug',
          side: 'right',
          text: 'Su Señoría — el fiscal no tiene respuesta. La objeción queda sin contestar.',
        },
        {
          id: 'd1-w08b',
          speaker: 'Magistrado Morales',
          portrait: 'morales-judge-neutral',
          side: 'center',
          text: 'El silencio del fiscal es anotado. La objeción de la defensa queda en pie. Puede continuar, Licenciado Fuentes.',
        },
        {
          id: 'd1-w08c',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'Silencio fatal. Fuentes anotó el punto. El juez lo registró. Credibilidad en el piso. Debo recuperar el control en el argumento de cierre — es la última oportunidad.',
        },
      ],
    },

    's1-wrong-c5b': {
      id: 's1-wrong-c5b',
      nextSceneId: 's1-verdict-scene',
      dialogues: [
        {
          id: 'd1-w09a',
          speaker: 'Lic. Marco Fuentes (Defensa)',
          portrait: 'fuentes-smug',
          side: 'right',
          text: 'Su Señoría — el dinero se habría movido igualmente. La red de lavado ya operaba. La transacción de mi cliente no creó el esquema, no lo habilitó, no lo financió de forma determinante. El daño que alega el fiscal es especulativo.',
        },
        {
          id: 'd1-w09b',
          speaker: 'Magistrado Morales',
          portrait: 'morales-judge-neutral',
          side: 'center',
          text: 'El tribunal le da la razón a la defensa en este punto. Fiscal, el argumento causal no es sostenible si el proceso de lavado ya estaba activo independientemente de la transacción en cuestión.',
        },
        {
          id: 'd1-w09c',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'Me embarqué en el argumento equivocado. El punto no es el daño causado — es que el paso no se completó. La obligación es procedimental, no depende del resultado. Ese era el argumento correcto.',
        },
      ],
    },

    's1-wrong-c5c': {
      id: 's1-wrong-c5c',
      nextSceneId: 's1-verdict-scene',
      dialogues: [
        {
          id: 'd1-w10a',
          speaker: 'Magistrado Morales',
          portrait: 'morales-judge-neutral',
          side: 'center',
          text: 'Fiscal — la culpabilidad del cliente no está ante este tribunal. Lo que está ante este tribunal es si el señor Pérez cumplió con su obligación procedimental. Esas son dos preguntas distintas.',
        },
        {
          id: 'd1-w10b',
          speaker: 'Lic. Marco Fuentes (Defensa)',
          portrait: 'fuentes-rattled',
          side: 'right',
          text: 'Y precisamente por eso, Su Señoría — incluso si Villanueva fuera culpable, eso no retroactivamente valida que el paso era necesario desde la perspectiva del agente en el momento.',
        },
        {
          id: 'd1-w10c',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'Fui por el camino fácil. La culpa del cliente no es el argumento. El argumento es que la obligación existe en el momento de la transacción — independientemente de quién sea el cliente.',
        },
      ],
    },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// CASE 2: THE TORONTO FILE
// OSFI Compliance Hearing — Toronto, Ontario, Canada
// Nicolas plays: Defense Attorney
// ─────────────────────────────────────────────────────────────────────────────
export const case2: Case = {
  id: 'case-2',
  title: 'THE TORONTO FILE',
  subtitle: 'OSFI Compliance Hearing — Toronto, Ontario',
  jurisdiction: 'Canada',
  roleLabel: 'Defense Attorney',

  briefing:
    'March 2026. Canadian Bank — Credit Card Division, Toronto. ' +
    'Agent Alex M. has been issued a Hint 4 — the most serious internal compliance flag before formal termination. ' +
    'Four documented violations in a single month, each identical: taking action on a client account before completing ' +
    'the required verification step in the bank\'s system. His NPS is 100%. His conversions exceed every target. ' +
    'He acknowledged the issue in writing after each coaching session. The behavior continued.\n\n' +
    'OSFI has been notified. The pattern — four identical violations in 30 days — triggered mandatory reporting ' +
    'under OSFI Guideline E-21. Your job: build the strongest possible defense for Alex. ' +
    'The twist: every piece of evidence makes the defense weaker. ' +
    'By the time you reach the hearing, you will realize there is no legal argument that holds. ' +
    'The only path forward is to advise your client to accept full accountability.',

  evidence: [
    {
      id: 'e2-fintrac',
      title: 'FINTRAC Compliance Requirements, s.9.3',
      description: 'Financial Transactions and Reports Analysis Centre of Canada',
      detail: 'All agents must complete mandatory verification protocols before processing any transaction flagged under the institution\'s internal risk classification. Repeated deficiencies of the same type trigger mandatory reporting to FINTRAC.',
      type: 'regulation',
      displayType: 'legal-text',
      isKey: true,
      legalTextMeta: {
        source: 'Financial Transactions and Reports Analysis Centre of Canada (FINTRAC)',
        docTitle: 'Compliance Program Requirements — Operational Standards',
        articleRef: 'Section 9.3 — Verification Before Action',
        fullText:
          'All agents at regulated financial institutions must complete mandatory verification protocols before processing any transaction type flagged under the institution\'s internal risk classification system. Failure to complete the required verification step before taking action on a client account constitutes a compliance program deficiency, regardless of whether the action taken was ultimately correct.\n\nInstitutions are required to monitor, document, and correct such deficiencies through their internal compliance programs. Where a compliance program deficiency of the same type recurs with the same agent, the institution must escalate its corrective action accordingly.\n\nRepeated deficiencies of the same nature by the same agent within a single compliance review period trigger mandatory reporting obligations to FINTRAC. The institution must document both the pattern and the corrective action plan.',
      },
    },
    {
      id: 'e2-osfi-e21',
      title: 'OSFI Guideline E-21: Operational Risk',
      description: 'Office of the Superintendent of Financial Institutions',
      detail: 'Where an operational risk pattern is identified — three or more identical compliance failures by the same agent within 30 days — the institution must report to OSFI and document corrective action. Four violations by Alex M. triggered this reporting obligation.',
      type: 'regulation',
      displayType: 'legal-text',
      isKey: true,
      legalTextMeta: {
        source: 'Office of the Superintendent of Financial Institutions (OSFI)',
        docTitle: 'Guideline E-21: Operational Risk Management',
        articleRef: 'Section 4.2 — Agent-Level Operational Risk Patterns',
        fullText:
          'Financial institutions must identify, assess, and manage operational risks including those arising from individual agent behavior. Where an operational risk pattern is identified — defined as three or more identical compliance failures by the same agent within a 30-day compliance review period — the institution must:\n\n(a) Report the pattern to OSFI within 10 business days of identification;\n(b) Document all corrective action taken prior to and following identification;\n(c) Demonstrate that the corrective action plan addresses the root cause of the pattern, not merely the individual incidents.\n\nFor the purposes of this Guideline, "identical" failures are defined as failures of the same process step, regardless of the call type or client context in which they occur. Four documented violations of the same verification step by Agent Alex M. within the month of March 2026 triggered this reporting obligation.',
      },
    },
    {
      id: 'e2-coaching-1',
      title: 'Coaching Log — Week 1',
      description: 'Session with TL David R. — First Occurrence',
      detail: 'First occurrence documented. Agent advised of Risk compliance requirements — verify before acting. Acknowledged verbally and in writing. Action plan signed.',
      type: 'testimony',
      displayType: 'coaching-log',
      coachingLogMeta: {
        sessionNumber: 1,
        date: 'March 4, 2026',
        teamLeader: 'David R.',
        agent: 'Alex M.',
        hintLevel: undefined,
        discussion:
          'First documented occurrence of Risk non-compliance. Agent was advised of the specific requirement: the verification step in the bank\'s system must be completed before any action is taken on a client account. The step takes approximately 8–12 seconds. It must occur before the action, not after.\n\nAgent was shown the specific system screen and the required sequence. Agent confirmed understanding.',
        agentAcknowledgment: '"I understand the requirement. I will verify first before taking any action on the account. I realize I skipped the step — I will not do that again."',
        tlNote: 'Agent appears to understand the requirement. Performance metrics remain strong. Monitoring continues.',
        agentSignature: 'Alex M.',
        tlSignature: 'David R.',
      },
    },
    {
      id: 'e2-coaching-2',
      title: 'Coaching Log — Week 2',
      description: 'Session with TL David R. — Second Occurrence, Hint 1',
      detail: 'Second occurrence. Hint 1 issued. Agent acknowledged again: "I understand. I will verify first." TL note: monitoring continues.',
      type: 'testimony',
      displayType: 'coaching-log',
      coachingLogMeta: {
        sessionNumber: 2,
        date: 'March 11, 2026',
        teamLeader: 'David R.',
        agent: 'Alex M.',
        hintLevel: 'Hint 1 Issued',
        discussion:
          'Second occurrence of the same behavior documented. Agent took action on a client account at 0:19 into the call, before completing the required verification step (completed at 0:31). Gap of 12 seconds — action before verification.\n\nHint 1 issued per escalation protocol. Agent was reminded of the escalation path: Hint 1 → Hint 2 → Hint 3 → Hint 4 (formal proceedings). Agent was advised that continued occurrence would result in further escalation.',
        agentAcknowledgment: '"I understand. I will verify first. I know this is a pattern and I need to correct it."',
        tlNote: 'Agent appears to understand the requirement and the escalation path. Action plan renewed. Monitoring continues.',
        agentSignature: 'Alex M.',
        tlSignature: 'David R.',
      },
    },
    {
      id: 'e2-coaching-3',
      title: 'Coaching Log — Week 3',
      description: 'Session with TL David R. — Third Occurrence, Hint 2',
      detail: 'Third occurrence. Hint 2 issued. TL note: "The issue is not knowledge. The issue is the decision to skip the step when he believes he already knows the outcome." Agent signed.',
      type: 'testimony',
      displayType: 'coaching-log',
      isKey: true,
      coachingLogMeta: {
        sessionNumber: 3,
        date: 'March 18, 2026',
        teamLeader: 'David R.',
        agent: 'Alex M.',
        hintLevel: 'Hint 2 Issued',
        discussion:
          'Third occurrence. Same behavior. Agent moved to action before verification across a different call type than the previous two occurrences. This is now confirmed as a cross-process behavioral pattern, not a knowledge gap about a specific process.\n\nHint 2 issued. Agent was advised that one additional occurrence would result in Hint 3, and that a fourth occurrence within the month would trigger OSFI reporting obligations.',
        agentAcknowledgment: '"I understand this is serious. I know I need to verify first. I will correct this."',
        tlNote: 'Pattern is consistent — agent moves to action before verification on calls where he feels confident about the answer. The issue is not knowledge. The issue is the decision to skip the step when he believes he already knows the outcome. Agent has the correct answer. He skips the verification because he already knows he is right. That is the behavior that needs to change.',
        agentSignature: 'Alex M.',
        tlSignature: 'David R.',
      },
    },
    {
      id: 'e2-call-report',
      title: 'Call Monitoring Report — 4 Flagged Calls',
      description: 'Quality Assurance Team — March 2026',
      detail: 'Four calls flagged. Each shows identical pattern: action taken 23 seconds before verification completed. Four different call types. This is behavioral, not a knowledge gap.',
      type: 'record',
      displayType: 'call-report',
      isKey: true,
      callReportMeta: {
        source: 'Quality Assurance Team — Credit Card Division',
        date: 'March 26, 2026',
        calls: [
          { callId: 'CC-0311-4821', date: 'Mar 11', type: 'Balance Inquiry + Dispute', actionTimestamp: '0:19', verificationTimestamp: '0:31', gap: '+12s', flag: 'ACTION BEFORE VERIFICATION' },
          { callId: 'CC-0314-2247', date: 'Mar 14', type: 'Credit Limit Review', actionTimestamp: '0:22', verificationTimestamp: '0:48', gap: '+26s', flag: 'ACTION BEFORE VERIFICATION' },
          { callId: 'CC-0319-3309', date: 'Mar 19', type: 'Payment Arrangement', actionTimestamp: '0:17', verificationTimestamp: '0:40', gap: '+23s', flag: 'ACTION BEFORE VERIFICATION' },
          { callId: 'CC-0323-1155', date: 'Mar 23', type: 'Account Reactivation', actionTimestamp: '0:21', verificationTimestamp: '0:44', gap: '+23s', flag: 'ACTION BEFORE VERIFICATION' },
        ],
        summary: 'All four flagged calls show the same skipped step across four different call types. Average gap between action and verification: 21 seconds. The skipped step is identical in all four calls. This is not a training gap. This is a consistent behavioral pattern.',
      },
    },
    {
      id: 'e2-performance',
      title: 'Performance Record — Agent Alex M.',
      description: 'Team Performance Dashboard — March 2026',
      detail: 'NPS 100%. GM Conversion 12% (target: 8.1%). TI Conversion 40% (target: 28.2%). All KRAs at 100%. Client-facing performance is not in question. Compliance performance is the sole issue.',
      type: 'document',
      displayType: 'bank-record',
      bankRecordMeta: {
        systemLabel: 'Team Performance Dashboard — Credit Card Division',
        date: 'March 2026 — Period Summary',
        rows: [
          { label: 'NPS Score', value: '100%', highlight: true },
          { label: 'GM Conversion', value: '12.0%  (Target: 8.1%  — +48% above target)', highlight: true },
          { label: 'TI Conversion', value: '40.0%  (Target: 28.2%  — +42% above target)', highlight: true },
          { label: 'Call Resolution', value: '100%' },
          { label: 'KRA Score', value: '100%' },
          { label: 'AHT', value: 'On Target' },
          { label: 'Risk Compliance Score', value: 'NON-COMPLIANT — 4 violations', highlight: true },
          { label: 'Hint Status', value: 'HINT 4 ISSUED', highlight: true },
        ],
        footer: 'NOTE: Client-facing performance metrics are not under review at this hearing. The sole issue before the Hearing Officer is compliance program adherence — specifically, the four documented violations of the required verification protocol.',
      },
    },
  ],

  firstSceneId: 's2-opening',

  scenes: {
    's2-opening': {
      id: 's2-opening',
      dialogues: [
        {
          id: 'd2-01',
          speaker: 'Hearing Officer Okafor',
          portrait: 'okafor-neutral',
          side: 'center',
          text: 'This hearing is convened to review the compliance record of Agent Alex M., Credit Card Division. OSFI Guideline E-21 reporting was triggered following four documented violations of the required verification protocol within a single month. Defense counsel, you may open.',
        },
        {
          id: 'd2-02',
          speaker: 'Nicolas',
          portrait: 'nicolas-confident',
          side: 'left',
          text: 'Hearing Officer Okafor — my client\'s NPS is 100%. His GM conversion exceeds target by 48%. His TI conversion exceeds target by 42%. This is not an agent who does not care about quality. This is an agent who delivers exceptional results every single day.',
        },
        {
          id: 'd2-03',
          speaker: 'Sarah Chen',
          portrait: 'chen-calm',
          side: 'right',
          text: 'The OSFI framework does not evaluate NPS. It evaluates compliance program adherence. These are not the same measurement. An agent can have a perfect NPS and still represent an unmanaged operational risk. The two are not mutually exclusive.',
        },
        {
          id: 'd2-04',
          speaker: 'Hearing Officer Okafor',
          portrait: 'okafor-neutral',
          side: 'center',
          text: 'Counselor, client satisfaction metrics are noted but are not relevant to the compliance question before this hearing. Do you have a regulatory argument?',
        },
        {
          id: 'd2-05',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'Performance metrics have been dismissed. What is the next viable argument?',
          choices: [
            {
              id: 'c2-1-a',
              label: '"My client was not adequately trained on the specific requirement."',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'Chen immediately presents Coaching Logs 1, 2, and 3 — three written acknowledgments. "Counselor, your client signed each of these documents. He was not undertrained. He was non-compliant."',
              nextSceneId: 's2-wrong-c1a',
            },
            {
              id: 'c2-1-b',
              label: '"The four violations occurred across different call types — this indicates a systemic training issue, not individual non-compliance."',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'Chen presents the Call Monitoring Report: "The call types differ. The skipped step is identical in all four. This is behavioral, not knowledge-based. The QA report uses that exact language."',
              nextSceneId: 's2-wrong-c1b',
            },
            {
              id: 'c2-1-c',
              label: '"I would like to review the coaching documentation before proceeding."',
              isCorrect: true,
              feedback: '',
              nextSceneId: 's2-david',
            },
          ],
        },
      ],
    },

    's2-david': {
      id: 's2-david',
      dialogues: [
        {
          id: 'd2-06',
          speaker: 'Hearing Officer Okafor',
          portrait: 'okafor-neutral',
          side: 'center',
          text: 'Team Leader David R. — please describe the coaching record.',
        },
        {
          id: 'd2-07',
          speaker: 'David R.',
          portrait: 'david-precise',
          side: 'right',
          text: 'I documented every session. After the first occurrence, I explained the requirement clearly. After the second, I issued a formal Hint and explained the escalation path. After the third, I noted in writing that the issue was not knowledge — it was the decision to skip the step on calls where he felt confident. He acknowledged that assessment. He signed it.',
        },
        {
          id: 'd2-08',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'David has documented everything. Is there any weakness in his testimony worth challenging?',
          choices: [
            {
              id: 'c2-2-a',
              label: '"Was the coaching delivered in a format that was accessible and clear to my client?"',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'David shows the signed coaching logs. "He confirmed in writing that he understood. Three times." Okafor notes the response.',
              nextSceneId: 's2-wrong-c2a',
            },
            {
              id: 'c2-2-b',
              label: '"Did you consider that my client\'s high performance metrics might indicate the step was unnecessary for his specific call types?"',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'Chen objects immediately: "The step is required regardless of agent performance level. FINTRAC Section 9.3 does not provide a performance-based exemption." Sustained.',
              nextSceneId: 's2-wrong-c2b',
            },
            {
              id: 'c2-2-c',
              label: 'HOLD IT — "In your third coaching note, you wrote the issue was behavioral, not knowledge-based. What exactly did you observe that led you to that conclusion?"',
              isCorrect: true,
              feedback: '',
              nextSceneId: 's2-behavioral-reveal',
            },
          ],
        },
      ],
    },

    's2-behavioral-reveal': {
      id: 's2-behavioral-reveal',
      dialogues: [
        {
          id: 'd2-09',
          speaker: 'David R.',
          portrait: 'david-precise',
          side: 'right',
          overlay: 'HOLD IT',
          text: 'On the flagged calls, Alex had the correct answer before completing the verification. He was right. The action he took was the right action. But the step still had to be completed before taking it. He knew that — and he skipped it anyway. Because he already knew the answer.',
        },
        {
          id: 'd2-10',
          speaker: 'Nicolas',
          portrait: 'nicolas-shocked',
          side: 'left',
          text: '...He was right every time. And it still doesn\'t matter.',
        },
        {
          id: 'd2-11',
          speaker: 'Alex M.',
          portrait: 'alex-defeated',
          side: 'left',
          text: 'I knew the answer. I always knew the answer. I just didn\'t think I needed to prove it to the system when I already knew it myself.',
        },
        {
          id: 'd2-12',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'Alex was right every time. But the verification step was not about whether he was right. Nicolas makes a final attempt at an argument.',
          choices: [
            {
              id: 'c2-3-a',
              label: '"Hearing Officer — my client was right on every flagged call. The verification would have confirmed what he already knew. No client was harmed. No incorrect action was taken."',
              isCorrect: false,
              wrongPenalty: 10,
              feedback: 'Chen: "OBJECTION. The regulatory obligation is procedural — not outcome-dependent. FINTRAC Section 9.3 requires the step before the action, not because the agent might be wrong, but because the institution cannot rely on agent confidence as a substitute for documented verification."',
              nextSceneId: 's2-wrong-c2-3a',
            },
            {
              id: 'c2-3-b',
              label: 'Withdraw. Ask to speak with Alex before the closing argument.',
              isCorrect: true,
              feedback: '',
              nextSceneId: 's2-closing-build',
            },
          ],
        },
      ],
    },

    's2-closing-build': {
      id: 's2-closing-build',
      isArgumentScene: true,
      dialogues: [],
      argumentPieces: [
        {
          id: 'ap-wrong-1',
          text: 'My client\'s results prove his commitment to the institution.',
          isCorrect: false,
        },
        {
          id: 'ap-wrong-2',
          text: 'The violations were minor and caused no measurable harm.',
          isCorrect: false,
        },
        {
          id: 'ap-wrong-3',
          text: 'The regulatory standard is disproportionate to the behavior.',
          isCorrect: false,
        },
        {
          id: 'ap-correct-1',
          text: 'My client acknowledges each of the four violations fully and without qualification.',
          isCorrect: true,
        },
        {
          id: 'ap-correct-2',
          text: 'My client acknowledges that acknowledgment alone — without behavioral change — is not sufficient. He has demonstrated this himself across three prior coaching sessions.',
          isCorrect: true,
        },
        {
          id: 'ap-correct-3',
          text: 'My client is asking this hearing not for exoneration — but for the documented opportunity to demonstrate, through consistent and verifiable compliance on every call from this point forward, that the behavior has permanently changed.',
          isCorrect: true,
        },
        {
          id: 'ap-correct-4',
          text: 'The regulatory framework exists to protect clients and institutions. My client now understands — at a level he did not before — that his results do not exempt him from that framework. No agent\'s results do.',
          isCorrect: true,
        },
        {
          id: 'ap-wrong-4',
          text: 'The institution bears partial responsibility for not escalating sooner.',
          isCorrect: false,
        },
      ],
      argumentNextSceneId: 's2-verdict-scene',
    },

    's2-verdict-scene': {
      id: 's2-verdict-scene',
      dialogues: [
        {
          id: 'd2-13',
          speaker: 'Hearing Officer Okafor',
          portrait: 'okafor-neutral',
          side: 'center',
          text: 'The record before this hearing is clear. Four violations. Four acknowledgments. Four commitments to change. The behavior continued. The Hint 4 stands — it is an accurate reflection of a documented pattern, and it cannot be reduced or removed.',
        },
        {
          id: 'd2-14',
          speaker: 'Hearing Officer Okafor',
          portrait: 'okafor-neutral',
          side: 'center',
          text: 'However — this hearing also notes the closing statement submitted by defense counsel. Specifically: the acknowledgment that past acknowledgment without behavioral change is not sufficient, and the commitment to demonstrate compliance through consistent action going forward.',
        },
        {
          id: 'd2-15',
          speaker: 'Hearing Officer Okafor',
          portrait: 'okafor-neutral',
          side: 'center',
          text: 'The hearing is closed. The record will reflect both the pattern and the commitment. Only one of those can be changed from this point forward. The institution and the agent know which one.',
        },
        {
          id: 'd2-16',
          speaker: 'Alex M.',
          portrait: 'alex-relieved',
          side: 'left',
          text: 'I was right every time. I know that. But being right and being compliant are not the same thing. I understand that now.',
        },
      ],
      nextSceneId: 's2-verdict',
    },

    // ── Wrong-choice branch scenes ─────────────────────────────────────────

    's2-wrong-c1a': {
      id: 's2-wrong-c1a',
      nextSceneId: 's2-david',
      dialogues: [
        {
          id: 'd2-w01a',
          speaker: 'Sarah Chen',
          portrait: 'chen-calm',
          side: 'right',
          text: 'Hearing Officer, with respect — may I present Exhibits C-1 through C-3? Three signed coaching logs, each documenting a session where the specific requirement was explained to Agent Alex M. and where the agent confirmed in writing that he understood.',
        },
        {
          id: 'd2-w01b',
          speaker: 'Hearing Officer Okafor',
          portrait: 'okafor-neutral',
          side: 'center',
          text: 'Admitted. Counselor — your client signed three separate acknowledgments of this exact requirement. "I understand and will comply." Three times. The training defense is not available to you.',
        },
        {
          id: 'd2-w01c',
          speaker: 'Alex M.',
          portrait: 'alex-defeated',
          side: 'left',
          text: 'I did sign them. I did understand. I just... I knew the answer every time. I didn\'t think the step mattered when I already knew.',
        },
        {
          id: 'd2-w01d',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'The coaching logs destroyed that argument completely. Alex knew. He signed. The training defense is gone. I need to review the record more carefully before my next move.',
        },
      ],
    },

    's2-wrong-c1b': {
      id: 's2-wrong-c1b',
      nextSceneId: 's2-david',
      dialogues: [
        {
          id: 'd2-w02a',
          speaker: 'Sarah Chen',
          portrait: 'chen-calm',
          side: 'right',
          text: 'Hearing Officer — may I refer to the QA Call Monitoring Report? It addresses this directly. Quote: "The skipped step is identical in all four calls. Four different call types. This is behavioral, not knowledge-based." That is the institution\'s own Quality Assurance language.',
        },
        {
          id: 'd2-w02b',
          speaker: 'Hearing Officer Okafor',
          portrait: 'okafor-neutral',
          side: 'center',
          text: 'The QA report is noted. Counsel, the call types differ. The failure is identical. That pattern is inconsistent with a systemic training issue — it is consistent with a behavioral one.',
        },
        {
          id: 'd2-w02c',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'The QA report says "behavioral, not knowledge-based" in plain language. That argument collapsed on itself. I need to go to the source — David R. and the coaching record — and find something that actually holds.',
        },
      ],
    },

    's2-wrong-c2a': {
      id: 's2-wrong-c2a',
      nextSceneId: 's2-behavioral-reveal',
      dialogues: [
        {
          id: 'd2-w03a',
          speaker: 'David R.',
          portrait: 'david-precise',
          side: 'right',
          text: 'I conducted each session in English — the working language of our team. Each time, I walked through the system screen step by step. I showed him exactly where the verification appears in the workflow. He confirmed verbally and in writing that the process was clear.',
        },
        {
          id: 'd2-w03b',
          speaker: 'Hearing Officer Okafor',
          portrait: 'okafor-neutral',
          side: 'center',
          text: 'Counselor — the coaching format appears thorough. Three sessions, three written acknowledgments. Is there a specific deficiency in the format you can point to, or is this a general question?',
        },
        {
          id: 'd2-w03c',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'There is no deficiency I can point to. The format was adequate. The acknowledgments are signed. This line of questioning went nowhere — and Okafor noticed. I need to dig into what David actually observed, not how he delivered the message.',
        },
      ],
    },

    's2-wrong-c2b': {
      id: 's2-wrong-c2b',
      nextSceneId: 's2-behavioral-reveal',
      dialogues: [
        {
          id: 'd2-w04a',
          speaker: 'Sarah Chen',
          portrait: 'chen-calm',
          side: 'right',
          text: 'Objection. FINTRAC Section 9.3 does not provide a performance-based exemption. The verification step applies to every agent, on every flagged transaction, regardless of NPS score or conversion rate. Performance metrics and compliance obligations are parallel, non-competing tracks.',
        },
        {
          id: 'd2-w04b',
          speaker: 'Hearing Officer Okafor',
          portrait: 'okafor-neutral',
          side: 'center',
          text: 'Sustained. Mr. R. — to the question: did Agent Alex M.\'s performance metrics factor into your assessment of whether the verification step was necessary for his call types?',
        },
        {
          id: 'd2-w04c',
          speaker: 'David R.',
          portrait: 'david-precise',
          side: 'right',
          text: 'No. The step is required regardless of performance. Those are separate systems. Alex knew that. He had one of the highest NPS scores on the team — and he still had to complete the verification. One does not replace the other.',
        },
        {
          id: 'd2-w04d',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'That line collapsed immediately. Chen was right — performance and compliance are parallel tracks. Okafor knows it. I need to shift to what David actually observed behaviorally, not what Alex achieved commercially.',
        },
      ],
    },

    's2-wrong-c2-3a': {
      id: 's2-wrong-c2-3a',
      nextSceneId: 's2-closing-build',
      dialogues: [
        {
          id: 'd2-w05a',
          speaker: 'Sarah Chen',
          portrait: 'chen-calm',
          side: 'right',
          text: 'Objection. FINTRAC Section 9.3 is explicit: "Failure to complete the required verification step before taking action constitutes a compliance program deficiency, regardless of whether the action taken was ultimately correct." Counselor is arguing outcome. The regulation governs process.',
        },
        {
          id: 'd2-w05b',
          speaker: 'Hearing Officer Okafor',
          portrait: 'okafor-neutral',
          side: 'center',
          text: 'Sustained. Counsel, I want to be direct with you: the fact that your client was right does not create a legal exemption from the requirement to verify. FINTRAC does not evaluate correctness of outcome. It evaluates adherence to process. That argument is not available to you in this hearing.',
        },
        {
          id: 'd2-w05c',
          speaker: 'Alex M.',
          portrait: 'alex-defeated',
          side: 'left',
          text: 'He\'s right. I knew it when David told me after the third session. Being right didn\'t matter. I still had to run the step.',
        },
        {
          id: 'd2-w05d',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'There is no outcome-based argument here. Okafor put it on the record. Alex himself concedes it. The only path left is the one that admits the truth — and asks for the chance to build a different record.',
        },
      ],
    },

    's2-verdict': {
      id: 's2-verdict',
      isVerdictScene: true,
      dialogues: [],
      verdictData: {
        outcome: 'lesson',
        title: 'HEARING CLOSED',
        subtitle: 'Alex M. — Hint 4 upheld. Pattern documented. Commitment recorded.',
        lessonTitle: 'You and Rodrigo Are the Same Person',
        lessonText:
          'In Case 1, you prosecuted Rodrigo Pérez for using eight years of experience to justify skipping the IVE screening. "I knew the client. The procedure was a formality for someone like me."\n\nIn Case 2, you defended Alex M. — an agent who skipped the verification step because he already knew the answer. "I was right every time. The step was unnecessary when I already knew the outcome."\n\nDifferent country. Different regulation. Different rank. Different justification. Same logic: "My knowledge exempts me from the procedure."\n\nIt does not.\n\nThe only argument that held in Case 2 was the one that admitted the truth and asked for the chance to build a different record. That is not a legal strategy. That is what you say when there is no good defense left.\n\nRegulatory compliance is non-delegable. Non-negotiable. And it does not negotiate with performance metrics.',
        regulationRef: 'OSFI Guideline E-21 / FINTRAC s.9.3',
      },
    },
  },
}

export const CASES: Case[] = [case1, case2]

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
