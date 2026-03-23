// ── CASE 1: EL EXPEDIENTE PÉREZ ──────────────────────────────────────────────
// Sala de lo Penal — Guatemala City, Guatemala
// Nicolas plays: The Prosecutor
// ─────────────────────────────────────────────────────────────────────────────

import type { Case } from '@/lib/types'

export const case1: Case = {
  id: 'case-1',
  gameId: 'compliance-court',
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
      // The judge already speaks the verdict aloud in this scene's dialogues.
      // bypassVerdictRouting prevents the engine from re-routing via credibility-based
      // verdictRoutes, so the player always lands on 's1-verdict' (CULPABLE) here.
      // The credibility-gated routes (perfect/good/bad/null) are only reachable when
      // the player fails to reach this scene (wrong answer branches → navigateToVerdict).
      bypassVerdictRouting: true,
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

    // Credibility router: wrong-c5 branches arrive here after Nicolas fumbles
    // the final argument. The judge's reaction and final verdict depend on how
    // much credibility Nicolas accumulated over the whole trial.
    's1-closing-gate': {
      id: 's1-closing-gate',
      dialogues: [],
      isCredibilityRouterScene: true,
      credibilityRoutes: [
        { minCredibility: 65, sceneId: 's1-verdict-scene-high' },
        { minCredibility: 35, sceneId: 's1-verdict-scene-mid' },
        { minCredibility: 0,  sceneId: 's1-verdict-scene-low' },
      ],
    },

    // High credibility path (≥65): judge convinced despite the weak closing,
    // evidence already built a solid case — CULPABLE but with a note of doubt
    // about the final argument.
    's1-verdict-scene-high': {
      id: 's1-verdict-scene-high',
      bypassVerdictRouting: true,
      dialogues: [
        {
          id: 'd1-vsh-01',
          speaker: 'Magistrado Morales',
          portrait: 'morales-judge-neutral',
          side: 'center',
          text: 'El tribunal ha analizado el expediente completo. El argumento final de la fiscalía no fue el más sólido — pero la evidencia acumulada a lo largo de este juicio habla por sí sola.',
        },
        {
          id: 'd1-vsh-02',
          speaker: 'Magistrado Morales',
          portrait: 'judge-angry',
          side: 'center',
          text: 'El Decreto 67-2001, el protocolo firmado, el correo leído y no respondido, los antecedentes documentados — en conjunto, prueban más allá de toda duda razonable que el señor Pérez conocía su obligación y la ignoró. El tribunal declara culpable al acusado.',
        },
        {
          id: 'd1-vsh-03',
          speaker: 'Lic. Marco Fuentes (Defensa)',
          portrait: 'fuentes-rattled',
          side: 'right',
          text: '...',
        },
      ],
      nextSceneId: 's1-verdict-perfect',
    },

    // Mid credibility path (35-64): judge acknowledges the case but notes the
    // argumentative gaps — CULPABLE with reduced sentence, Fuentes wins partial points.
    's1-verdict-scene-mid': {
      id: 's1-verdict-scene-mid',
      bypassVerdictRouting: true,
      dialogues: [
        {
          id: 'd1-vsm-01',
          speaker: 'Magistrado Morales',
          portrait: 'morales-judge-neutral',
          side: 'center',
          text: 'La fiscalía estableció los hechos básicos, pero hubo momentos en este juicio donde el argumento fue débil y la defensa lo capitalizó. El tribunal no puede ignorar esas grietas.',
        },
        {
          id: 'd1-vsm-02',
          speaker: 'Magistrado Morales',
          portrait: 'morales-judge-neutral',
          side: 'center',
          text: 'Dicho esto: el paso obligatorio no fue completado. El señor Pérez firmó el protocolo. Fue advertido. El tribunal declara culpable al acusado — con atenuantes en consideración a los argumentos de la defensa respecto al contexto institucional.',
        },
        {
          id: 'd1-vsm-03',
          speaker: 'Lic. Marco Fuentes (Defensa)',
          portrait: 'fuentes-smug',
          side: 'right',
          text: 'El tribunal ha reconocido lo que yo argumenté desde el inicio. Mi cliente acepta la resolución.',
        },
      ],
      nextSceneId: 's1-verdict-good',
    },

    // Low credibility path (<35): judge is skeptical, the case barely held together,
    // the argument was so weak Fuentes almost won — ABSUELTO.
    's1-verdict-scene-low': {
      id: 's1-verdict-scene-low',
      bypassVerdictRouting: true,
      dialogues: [
        {
          id: 'd1-vsl-01',
          speaker: 'Magistrado Morales',
          portrait: 'judge-angry',
          side: 'center',
          text: 'Este tribunal ha presenciado una presentación fiscal con serias deficiencias. Argumentos concedidos sin necesidad, evidencia presentada en orden incorrecto, silencios en momentos críticos.',
        },
        {
          id: 'd1-vsl-02',
          speaker: 'Lic. Marco Fuentes (Defensa)',
          portrait: 'fuentes-smug',
          side: 'right',
          text: 'La fiscalía no logró sostener la carga probatoria con el rigor que esta causa requería, Su Señoría.',
        },
        {
          id: 'd1-vsl-03',
          speaker: 'Magistrado Morales',
          portrait: 'judge-angry',
          side: 'center',
          text: 'El tribunal coincide. La evidencia documental existía — pero no fue presentada con suficiente solidez argumental para sustentar una condena. Se declara al acusado Rodrigo Pérez absuelto por insuficiencia probatoria de la fiscalía.',
        },
        {
          id: 'd1-vsl-04',
          speaker: 'Rodrigo Pérez',
          portrait: 'rodrigo-confident',
          side: 'right',
          text: '...',
        },
      ],
      nextSceneId: 's1-verdict-bad',
    },


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
      nextSceneId: 's1-closing-gate',
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
      nextSceneId: 's1-closing-gate',
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
