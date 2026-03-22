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
}

export interface VerdictData {
  outcome: 'guilty' | 'acquitted' | 'lesson'
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
            },
            {
              id: 'c1-c',
              label: '"¿Cuántas de esas cientos de transacciones anteriores sí completó el tamizaje?"',
              isCorrect: false,
              wrongPenalty: 10,
              feedback: 'Fuentes objeta: "Irrelevante, Su Señoría." El juez lo admite. Pierdes terreno.',
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
            },
            {
              id: 'c2-c',
              label: 'Presentar el Informe IVE de señalamiento de Villanueva.',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'Fuentes objeta: "Su Señoría, ese documento es prematuro. La obligación aún no ha sido establecida." Admitido. Credibilidad dañada.',
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
              nextSceneId: 's1-elena',
            },
            {
              id: 'c3-b',
              label: '"Otros agentes senior también deberían ser investigados si existe esa cultura."',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'Fuentes: "Su Señoría, el fiscal está ampliando la causa sin fundamento." Admitido. Pierde enfoque.',
            },
            {
              id: 'c3-c',
              label: '"Acepto que la discreción senior puede ser válida en situaciones urgentes."',
              isCorrect: false,
              wrongPenalty: 25,
              feedback: 'Catastrophic. Concedes el argumento central. La política escrita no puede ser anulada por costumbre informal.',
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
            },
            {
              id: 'c4-b',
              label: 'OBJECCIÓN — "La supervisora debió haber sido más específica en el correo."',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'Magistrado Morales: "Admitida la objeción de la defensa. Eso no es un argumento legal, Fiscal."',
            },
            {
              id: 'c4-c',
              label: '(No decir nada — dejar pasar la objeción)',
              isCorrect: false,
              wrongPenalty: 20,
              feedback: 'Silencio fatal. La objeción queda sin respuesta. Credibilidad dañada.',
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
            },
            {
              id: 'c5-c',
              label: 'OBJECCIÓN — "El cliente era culpable."',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'Magistrado Morales: "Fiscal, la culpa del cliente no es la cuestión ante este tribunal."',
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
            },
            {
              id: 'c2-1-b',
              label: '"The four violations occurred across different call types — this indicates a systemic training issue, not individual non-compliance."',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'Chen presents the Call Monitoring Report: "The call types differ. The skipped step is identical in all four. This is behavioral, not knowledge-based. The QA report uses that exact language."',
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
            },
            {
              id: 'c2-2-b',
              label: '"Did you consider that my client\'s high performance metrics might indicate the step was unnecessary for his specific call types?"',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'Chen objects immediately: "The step is required regardless of agent performance level. FINTRAC Section 9.3 does not provide a performance-based exemption." Sustained.',
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
              wrongPenalty: 0,
              feedback: 'outcome-argument',
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
