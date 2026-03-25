// ── OTF Caso 2 — Escenas de Audiencia ────────────────────────────────────────
// 6 rondas + intro + router + 3 veredictos

import type { Scene, VerdictData } from '@/lib/types'

// ─────────────────────────────────────────────────────────────────────────────
// ESCENA PLACEHOLDER — modo exploración de correos (nunca se renderiza)
// ─────────────────────────────────────────────────────────────────────────────
export const sceneEmailBrowse: Scene = {
  id: 'otf2-email-browse',
  dialogues: [],
  nextSceneId: 'otf2-hearing-intro',
}

// ─────────────────────────────────────────────────────────────────────────────
// INTRO: Comité se presenta y explica la audiencia
// ─────────────────────────────────────────────────────────────────────────────
export const sceneHearingIntro: Scene = {
  id: 'otf2-hearing-intro',
  isHearingScene: true,
  dialogues: [
    {
      id: 'intro-paz-1',
      speaker: 'Dra. Paz Herrera',
      portrait: 'paz-herrera-neutral',
      side: 'left',
      text: 'Buenos días, Lic. García. Soy Dra. Paz Herrera, presidenta del Comité de Ética. Me acompañan el Lic. Fernando Rojo, nuestro asesor legal, y la Ing. Clara Mendoza, nuestra analista técnica. Esta audiencia está siendo registrada.',
    },
    {
      id: 'intro-rojo-1',
      speaker: 'Lic. Fernando Rojo',
      portrait: 'fernando-rojo-neutral',
      side: 'left',
      text: 'Quiero aclarar que la Lic. Lupita Morales no está presente hoy. Según RRHH, se encuentra en comisión de servicio. Su ausencia es una limitante que tomaremos en cuenta al evaluar el peso de la evidencia presentada.',
    },
    {
      id: 'intro-paz-2',
      speaker: 'Dra. Paz Herrera',
      portrait: 'paz-herrera-neutral',
      side: 'left',
      text: 'Usted ha solicitado que abramos una investigación formal sobre presunto hostigamiento por parte del AT2 Marco Valdés. El Comité escuchará su caso y determinará si hay mérito suficiente. Tiene la palabra.',
    },
  ],
  nextSceneId: 'otf2-hearing-r1',
}

// ─────────────────────────────────────────────────────────────────────────────
// RONDA 1 — Evidencia directa (Dra. Paz Herrera)
// ─────────────────────────────────────────────────────────────────────────────
export const sceneHearingR1: Scene = {
  id: 'otf2-hearing-r1',
  isHearingScene: true,
  hearingEvidenceBonus: {
    correctIds: ['e2-thread-feb-incidente', 'e2-email-lupita-hoy'],
    bonus: 10,
    penalty: 4,
    feedback: 'La evidencia adjuntada refuerza el patrón que el Comité necesita ver.',
  },
  dialogues: [
    {
      id: 'r1-mendoza-1',
      speaker: 'Ing. Clara Mendoza',
      portrait: 'clara-mendoza-neutral',
      side: 'left',
      text: 'Antes de que comience, una aclaración de proceso: lo que usted presente hoy debe ser documentación. Impresiones personales sin respaldo no bastan para que el Comité actúe.',
    },
    {
      id: 'r1-paz-q',
      speaker: 'Dra. Paz Herrera',
      portrait: 'paz-herrera-neutral',
      side: 'left',
      text: '¿Tiene evidencia directa que establezca un patrón de conducta sistemática por parte de Marco Valdés? No incidentes aislados — un patrón documentado a lo largo del tiempo.',
      choices: [
        {
          id: 'r1-a',
          label: 'Sí. Tengo una cadena de correos del 14 de febrero donde el propio Marco Valdés escribe: "Nadie va a creer lo que dices. Llevamos 7 años aquí y tú llevas 3." Eso no es un chiste — es una amenaza que usa la antigüedad como palanca de poder.',
          isCorrect: true,
          feedback: 'Correcto: evidencia directa con cita exacta.',
          nextSceneId: 'otf2-hearing-r2',
        },
        {
          id: 'r1-b',
          label: 'Lo que vi con mis propios ojos durante tres meses es suficiente. Lupita cambió completamente. Eso no miente.',
          isCorrect: false,
          wrongPenalty: 12,
          feedback: 'El Comité necesita documentación, no impresiones personales.',
          nextSceneId: 'otf2-hearing-r2',
        },
        {
          id: 'r1-c',
          label: 'Tengo el correo electrónico que Marco envió accidentalmente en copia a mí, y el borrador de queja que Lupita nunca envió porque tenía miedo. Eso muestra el patrón: él amenaza, ella se paraliza.',
          isCorrect: true,
          feedback: 'Respuesta válida — conecta la causa con el efecto.',
          nextSceneId: 'otf2-hearing-r2',
        },
      ],
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// RONDA 2 — Procedimiento (Lic. Fernando Rojo)
// ─────────────────────────────────────────────────────────────────────────────
export const sceneHearingR2: Scene = {
  id: 'otf2-hearing-r2',
  isHearingScene: true,
  hearingEvidenceBonus: {
    correctIds: ['e2-email-lupita-borrador', 'e2-email-hr-llamado'],
    bonus: 10,
    penalty: 4,
    feedback: 'El borrador no enviado y el llamado de atención indebido son exactamente lo que el argumento de procedimiento necesita.',
  },
  dialogues: [
    {
      id: 'r2-rojo-1',
      speaker: 'Lic. Fernando Rojo',
      portrait: 'fernando-rojo-neutral',
      side: 'left',
      text: 'Entendemos el argumento. Pero el Reglamento Interior establece un proceso claro: primero RRHH, luego el Comité si RRHH no actúa. ¿Por qué estamos aquí directamente, sin que RRHH haya concluido un proceso formal?',
      choices: [
        {
          id: 'r2-a',
          label: 'Porque RRHH fue notificado informalmente y su respuesta fue sancionar a la víctima. Lupita Morales presentó certificados médicos válidos por sus ausencias. RRHH las registró como injustificadas y le emitió un llamado de atención formal. Eso no es "gestión del caso" — es represalia.',
          isCorrect: true,
          feedback: 'Argumento sólido: RRHH falló en su función protectora.',
          nextSceneId: 'otf2-hearing-r3',
        },
        {
          id: 'r2-b',
          label: 'El protocolo no sirve de nada cuando el propio Líder de RRHH es amigo personal del acusado.',
          isCorrect: false,
          wrongPenalty: 10,
          feedback: 'Acusación sin respaldo documental en este momento.',
          nextSceneId: 'otf2-hearing-r3',
        },
        {
          id: 'r2-c',
          label: 'Lupita intentó denunciar formalmente en marzo — tengo el borrador que redactó. No lo envió porque el ambiente de presión que Marco generó la paralizó. El proceso falló antes de iniciarse.',
          isCorrect: true,
          feedback: 'Correcta: el borrador es prueba de intención frustrada por miedo.',
          nextSceneId: 'otf2-hearing-r3',
        },
      ],
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// RONDA 3 — Datos y patrón (Ing. Clara Mendoza)
// ─────────────────────────────────────────────────────────────────────────────
export const sceneHearingR3: Scene = {
  id: 'otf2-hearing-r3',
  isHearingScene: true,
  hearingEvidenceBonus: {
    correctIds: ['e2-profile-lupita', 'e2-email-lupita-ausencia-feb'],
    bonus: 8,
    penalty: 4,
    feedback: 'Los datos del perfil y las ausencias construyen el caso de correlación que el Comité necesita.',
  },
  dialogues: [
    {
      id: 'r3-mendoza-q',
      speaker: 'Ing. Clara Mendoza',
      portrait: 'clara-mendoza-neutral',
      side: 'left',
      text: '¿Tiene datos objetivos que correlacionen el deterioro en el desempeño de la Lic. Morales con los incidentes reportados? Necesito ver si hay una correlación temporal estadísticamente significativa o si podría ser coincidencia.',
      choices: [
        {
          id: 'r3-a',
          label: 'Sí. Lupita Morales tenía 96/100 en su evaluación de Q4 2025, cero ausencias médicas, y cero antecedentes disciplinarios. En Q1 2026 — justo el período de los incidentes — cayó a 62/100, tuvo 5 ausencias médicas por estrés, y recibió un llamado de atención. La caída no es gradual: es abrupta y coincide exactamente con febrero.',
          isCorrect: true,
          feedback: 'Correlación temporal bien fundamentada en datos del expediente.',
          nextSceneId: 'otf2-hearing-marco',
        },
        {
          id: 'r3-b',
          label: 'Claramente se le nota que está mal. Cualquiera que la conozca lo ve.',
          isCorrect: false,
          wrongPenalty: 12,
          feedback: 'Observación subjetiva sin valor analítico para el Comité.',
          nextSceneId: 'otf2-hearing-marco',
        },
        {
          id: 'r3-c',
          label: 'Tengo los accesos del servidor: Marco Valdés accedió a la carpeta de Lupita 14 veces fuera de horario entre enero y marzo. El monitoreo constante es parte del patrón de control.',
          isCorrect: true,
          feedback: 'Evidencia técnica relevante — el patrón de vigilancia digital complementa el caso.',
          nextSceneId: 'otf2-hearing-marco',
        },
      ],
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// MOMENTO DRAMÁTICO — El correo de Marco llega a la audiencia
// ─────────────────────────────────────────────────────────────────────────────
export const sceneHearingMarco: Scene = {
  id: 'otf2-hearing-marco',
  isHearingScene: true,
  dialogues: [
    {
      id: 'marco-paz-1',
      speaker: 'Dra. Paz Herrera',
      portrait: 'paz-herrera-neutral',
      side: 'left',
      text: '…Un momento. Acabo de recibir un correo de Marco Valdés dirigido a este Comité.',
    },
    {
      id: 'marco-rojo-1',
      speaker: 'Lic. Fernando Rojo',
      portrait: 'fernando-rojo-neutral',
      side: 'left',
      text: 'Dice que tiene "el derecho de presentar su versión." Afirma que su relación con Lupita Morales fue siempre cordial y profesional, que el correo del 14 de febrero fue un chiste de mal gusto que ella malinterpretó, y que RRHH ya revisó el asunto y lo cerró.',
    },
    {
      id: 'marco-rojo-2',
      speaker: 'Lic. Fernando Rojo',
      portrait: 'fernando-rojo-neutral',
      side: 'left',
      text: 'También menciona que Damián García tiene un "conflicto de interés personal" en este caso y que sus motivaciones para presentarlo son cuestionables.',
    },
    {
      id: 'marco-paz-2',
      speaker: 'Dra. Paz Herrera',
      portrait: 'paz-herrera-neutral',
      side: 'left',
      text: 'Lic. García: tiene la palabra para responder.',
    },
  ],
  nextSceneId: 'otf2-hearing-r4',
}

// ─────────────────────────────────────────────────────────────────────────────
// RONDA 4 — Rebatir la versión de Marco (momento más difícil)
// ─────────────────────────────────────────────────────────────────────────────
export const sceneHearingR4: Scene = {
  id: 'otf2-hearing-r4',
  isHearingScene: true,
  hearingEvidenceBonus: {
    correctIds: ['e2-email-hr-interno'],
    bonus: 15,
    penalty: 5,
    feedback: 'El correo interno de Salinas a Marco es la prueba más contundente de coordinación para suprimir la denuncia.',
  },
  dialogues: [
    {
      id: 'r4-q',
      speaker: 'Dra. Paz Herrera',
      portrait: 'paz-herrera-neutral',
      side: 'left',
      text: '¿Cómo responde a la afirmación de que RRHH ya gestionó este asunto y que usted tiene un conflicto de interés?',
      choices: [
        {
          id: 'r4-a',
          label: 'El correo que adjunto muestra que la "gestión de RRHH" fue un correo de 2 oraciones de Roberto Salinas a Marco Valdés que termina así: "Aquí entre nos: lleva 3 años, tú llevas 7. Las matemáticas son claras." Eso no es gestión — es coordinación para silenciar.',
          isCorrect: true,
          feedback: 'Respuesta más efectiva: cita textual del correo interno que destruye el argumento de Marco.',
          nextSceneId: 'otf2-hearing-r5',
        },
        {
          id: 'r4-b',
          label: 'Marco Valdés está mintiendo y Salinas lo está cubriendo. Es obvio para cualquiera que revise los hechos.',
          isCorrect: false,
          wrongPenalty: 15,
          feedback: 'Acusación directa sin presentar la evidencia que la sostiene — pierde impacto ante el Comité.',
          nextSceneId: 'otf2-hearing-r5',
        },
        {
          id: 'r4-c',
          label: 'En cuanto a mi supuesto conflicto de interés: fui incluido en ese correo de Marco por error. No busqué este caso. Lo que busco es que el Comité revise la evidencia objetivamente, no las motivaciones de quien la presenta.',
          isCorrect: false,
          wrongPenalty: 8,
          feedback: 'Defenderse en lugar de atacar con evidencia — oportunidad perdida para el argumento más fuerte.',
          nextSceneId: 'otf2-hearing-r5',
        },
      ],
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// RONDA 5 — Argumento de cierre
// ─────────────────────────────────────────────────────────────────────────────
export const sceneHearingR5: Scene = {
  id: 'otf2-hearing-r5',
  isHearingScene: true,
  hearingEvidenceBonus: {
    correctIds: ['e2-email-lupita-hoy', 'e2-thread-feb-incidente'],
    bonus: 8,
    penalty: 3,
    feedback: 'El correo de Lupita y la cadena del 14 de febrero son la narrativa humana que cierra el argumento técnico.',
  },
  dialogues: [
    {
      id: 'r5-paz-cierre',
      speaker: 'Dra. Paz Herrera',
      portrait: 'paz-herrera-neutral',
      side: 'left',
      text: 'El Comité deliberará en breve. Antes de que lo hagamos: ¿qué le pide específicamente al Comité de Ética? Sea preciso.',
      choices: [
        {
          id: 'r5-a',
          label: 'Pedimos que el Comité abra una investigación formal bajo el Artículo 23 del Reglamento Interior: acceso a registros de IT, entrevistas independientes a Carlos Menchú y Valentina Cruz, y que se garantice que Lupita Morales pueda declarar en un entorno donde no haya presiones de RRHH.',
          isCorrect: true,
          feedback: 'Solicitud precisa, procesalmente correcta, con referencias específicas.',
          nextSceneId: 'otf2-hearing-router',
        },
        {
          id: 'r5-b',
          label: 'Pedimos que suspendan a Marco Valdés de forma preventiva mientras se investiga, y que se sancione a Roberto Salinas por obstrucción.',
          isCorrect: false,
          wrongPenalty: 15,
          feedback: 'Pedir sanciones antes de una investigación formal es prejudiciar el resultado — el Comité no puede proceder así.',
          nextSceneId: 'otf2-hearing-router',
        },
        {
          id: 'r5-c',
          label: 'Pedimos que hablen directamente con Lupita Morales para que ella decida si quiere continuar con el proceso.',
          isCorrect: false,
          wrongPenalty: 5,
          feedback: 'Respuesta razonable pero insuficiente — no formaliza el proceso ni protege a Lupita.',
          nextSceneId: 'otf2-hearing-router',
        },
      ],
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// ROUTER — Decide veredicto según solidez final
// ─────────────────────────────────────────────────────────────────────────────
export const sceneHearingRouter: Scene = {
  id: 'otf2-hearing-router',
  isHearingScene: true,
  isCredibilityRouterScene: true,
  dialogues: [],
  credibilityRoutes: [
    { minCredibility: 78, sceneId: 'otf2-verdict-investigacion' },
    { minCredibility: 52, sceneId: 'otf2-verdict-revision' },
    { minCredibility: 0,  sceneId: 'otf2-verdict-archivo' },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// VEREDICTOS
// ─────────────────────────────────────────────────────────────────────────────

export const verdictInvestigacion: Scene = {
  id: 'otf2-verdict-investigacion',
  isVerdictScene: true,
  dialogues: [],
  verdictData: {
    outcome: 'investigacion-abierta',
    title: 'INVESTIGACIÓN FORMAL ABIERTA',
    subtitle: 'El Comité de Ética vota 3-0 abrir investigación formal bajo Art. 23 del Reglamento Interior',
    lessonTitle: 'Lo que esto significa',
    lessonText:
      'El hostigamiento laboral rara vez deja huellas evidentes. Se construye en silencio: un comentario, una mirada, un mensaje enviado a las 11 pm. Lo que hiciste hoy fue convertir ese silencio en documentación. La investigación apenas comienza — pero Lupita ahora tiene lo que nunca tuvo: un proceso formal que la obliga a ser escuchada.',
    regulationRef: 'Reglamento Interior, Artículo 23 — Procedimiento de Denuncia ante el Comité de Ética',
  },
}

export const verdictRevision: Scene = {
  id: 'otf2-verdict-revision',
  isVerdictScene: true,
  dialogues: [],
  verdictData: {
    outcome: 'revision-preliminar',
    title: 'REVISIÓN PRELIMINAR APROBADA',
    subtitle: 'El Comité ordena una revisión informal de 30 días antes de decidir si abre investigación formal',
    lessonTitle: 'La zona gris del proceso',
    lessonText:
      'El Comité te creyó. Pero creer no es suficiente para activar el Artículo 23. La evidencia que presentaste construyó un caso sólido, pero hubo momentos donde la argumentación pudo ser más precisa. La revisión preliminar protege a Lupita temporalmente — pero 30 días pueden ser suficientes para que alguien destruya evidencia. El proceso importa tanto como los hechos.',
    regulationRef: 'Reglamento Interior, Artículo 21 — Revisión Preliminar de Denuncias',
  },
}

export const verdictArchivo: Scene = {
  id: 'otf2-verdict-archivo',
  isVerdictScene: true,
  dialogues: [],
  verdictData: {
    outcome: 'caso-archivado',
    title: 'CASO ARCHIVADO',
    subtitle: 'El Comité determina que la evidencia presentada es insuficiente para abrir una investigación formal',
    lessonTitle: 'Por qué esto importa',
    lessonText:
      'El Comité de Ética no pudo actuar — no porque no haya pasado nada, sino porque lo que pasó no quedó suficientemente documentado en el momento correcto. El hostigamiento laboral es difícil de probar precisamente porque el hostigador sabe cómo moverse dentro del sistema. Lupita seguirá trabajando en el mismo espacio que Marco Valdés. Eso es consecuencia de un proceso incompleto, no de una persona malvada.',
    regulationRef: 'Reglamento Interior, Artículo 20 — Archivo de Denuncias por Insuficiencia de Evidencia',
  },
}

// ── Export de todas las escenas ───────────────────────────────────────────────

export const otf2Scenes: Record<string, Scene> = {
  [sceneEmailBrowse.id]:        sceneEmailBrowse,
  [sceneHearingIntro.id]:       sceneHearingIntro,
  [sceneHearingR1.id]:          sceneHearingR1,
  [sceneHearingR2.id]:          sceneHearingR2,
  [sceneHearingR3.id]:          sceneHearingR3,
  [sceneHearingMarco.id]:       sceneHearingMarco,
  [sceneHearingR4.id]:          sceneHearingR4,
  [sceneHearingR5.id]:          sceneHearingR5,
  [sceneHearingRouter.id]:      sceneHearingRouter,
  [verdictInvestigacion.id]:    verdictInvestigacion,
  [verdictRevision.id]:         verdictRevision,
  [verdictArchivo.id]:          verdictArchivo,
}
