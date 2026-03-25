// ── On the Field – Game Content ──────────────────────────────────────────────
// Caso 1: La Llamada — Guatemala City Football Club
// Player role: Asistente Técnico
// ─────────────────────────────────────────────────────────────────────────────

import type { Case } from '@/lib/gameData'
import { otfCase2 } from '@/lib/cases/otf-case2'

// ─────────────────────────────────────────────────────────────────────────────
// OTF CASE 1: LA LLAMADA
// Vestuario — Guatemala City, Guatemala
// ─────────────────────────────────────────────────────────────────────────────
export const otfCase1: Case = {
  id: 'otf-1',
  gameId: 'on-the-field',
  title: 'LA LLAMADA',
  subtitle: 'Vestuario — Guatemala City, Guatemala',
  jurisdiction: 'Guatemala',
  roleLabel: 'Asistente Técnico',
  playerName: 'Damian Garcia',

  briefing:
    '15 minutos antes del partido decisivo. Marco Reyes, el delantero estrella del equipo, ' +
    'se niega a salir al campo. Su agente, Rodrigo Vargas, exige un aumento del 35% o no juega. ' +
    'El alcalde municipal acaba de llamar vinculando una donación de Q350,000 con la alineación. ' +
    'El capitán Diego Fuentes está esperando afuera. Tienes 15 minutos para resolver el conflicto ' +
    'antes de que el DT tenga que tomar una decisión unilateral.',

  vocab: {
    credibilityLabel: 'Poder de Negociación',
    evidenceLabel: 'Informes',
    recordLabel: 'Informes del Vestuario',
    investigationLabel: 'Revisar Informes',
    trialLabel: 'Iniciar Reunión',
    briefingEyesOnly: 'Solo para el Asistente Técnico',
    correctEvidenceFeedback: '+{bonus} Negociación — La información presenta una perspectiva clave que cambia la dinámica.',
    wrongEvidenceFeedback: '-{penalty} Negociación — Esa información no es relevante en este momento. Reyes y Vargas lo notan.',
  },

  firstSceneId: 'otf1-reunion-inicial',
  postponedSceneId: 'otf1-verdict-sin-tiempo',

  verdictRoutes: [
    { minCredibility: 80, sceneId: 'otf1-verdict-acuerdo' },
    { minCredibility: 50, sceneId: 'otf1-verdict-tension' },
    { minCredibility: 20, sceneId: 'otf1-verdict-sacrificio' },
    { minCredibility: 0,  sceneId: 'otf1-verdict-crisis' },
  ],

  // ── 6 Informes del Vestuario ──────────────────────────────────────────────
  evidence: [
    {
      id: 'otf-ficha-rendimiento',
      title: 'Ficha de Rendimiento — Marco Reyes',
      description: 'Análisis estadístico — Último mes',
      detail: 'Marco Reyes registra una caída del 40% en rendimiento el último mes. Cero goles en los últimos cuatro partidos. Participación en jugadas de gol: 12% (vs. 38% promedio de temporada). Tarjetas amarillas: 3.',
      type: 'record',
      displayType: 'bank-record',
      bankRecordMeta: {
        systemLabel: 'Guatemala City FC — Sistema de Análisis de Rendimiento v2.1',
        date: 'Marzo 2026 — Temporada Regular',
        rows: [
          { label: 'Jugador', value: 'Marco Reyes — Delantero Centro' },
          { label: 'Goles (último mes)', value: '0', highlight: true },
          { label: 'Goles (promedio temporada)', value: '2.3 / mes' },
          { label: 'Rendimiento relativo', value: '-40%', highlight: true },
          { label: 'Participación en goles', value: '12% (vs 38% promedio)', highlight: true },
          { label: 'Tarjetas amarillas', value: '3 (último mes)' },
          { label: 'Minutos jugados', value: '342 de 360 posibles' },
          { label: 'Duelos ganados', value: '31% (vs 58% promedio)' },
        ],
        footer: 'NOTA: La caída en rendimiento comenzó tras el incidente del contrato en enero 2026.',
      },
    },
    {
      id: 'otf-contrato',
      title: 'Contrato Vigente — Marco Reyes / Vargas Sports Management',
      description: 'Contrato de representación y condiciones salariales actuales',
      detail: 'Contrato vigente: 18 meses restantes. Salario actual: Q320,000 anuales. Agente solicita aumento a Q432,000 (+35%). Cláusula Q2.4 establece que cualquier renegociación requiere aprobación de la Junta Directiva.',
      type: 'document',
      displayType: 'paper-doc',
      paperDocMeta: {
        docType: 'Contrato de Representación Deportiva',
        date: '15 de marzo de 2025',
        parties: ['Guatemala City FC', 'Marco Reyes', 'Vargas Sports Management (Rodrigo Vargas)'],
        body:
          'CONDICIONES ECONÓMICAS VIGENTES\n\nSalario anual: Q 320,000.00\nContrato vigente hasta: Septiembre 2027 (18 meses restantes)\nAgente autorizado: Rodrigo Vargas — Vargas Sports Management\n\nCLÁUSULA Q2.4 — RENEGOCIACIÓN SALARIAL:\nCualquier modificación al salario base requiere aprobación formal de la Junta Directiva del club con un mínimo de 30 días de anticipación. No se permiten acuerdos verbales ni compromisos no ratificados.\n\nDEMANDA ACTUAL DEL AGENTE:\nAumento solicitado: +35% (Q432,000 anuales)\nFecha límite de respuesta según Vargas: Hoy, antes del partido.',
        signature: 'Marco Reyes / Rodrigo Vargas / Directiva GCFC',
        signatureDate: '15 de marzo de 2025',
      },
    },
    {
      id: 'otf-pulso-vestuario',
      title: 'Encuesta de Pulso — Vestuario',
      description: 'Encuesta anónima de clima interno — Febrero 2026',
      detail: '7 de 11 titulares reportan que el ambiente en el vestuario se ha deteriorado significativamente desde enero. El factor principal citado: actitud de Reyes y su agente.',
      type: 'document',
      displayType: 'paper-doc',
      isKey: true,
      paperDocMeta: {
        docType: 'Encuesta de Clima Organizacional — Vestuario',
        date: 'Febrero 2026',
        parties: ['Guatemala City FC — Departamento Psicológico'],
        body:
          'RESULTADOS — ENCUESTA ANÓNIMA DE PULSO INTERNO\n\nParticipantes: 11 de 11 titulares\n\nPREGUNTA 1: ¿El ambiente en el vestuario es conducente al rendimiento colectivo?\n✗ NO: 7/11 (64%)\n✓ SÍ: 3/11 (27%)\n— NS/NR: 1/11\n\nFACTORES CITADOS (respuestas múltiples, anónimas):\n• "Actitud de un compañero afecta la concentración del equipo" — 6 respuestas\n• "Negociaciones del agente generan distracción" — 5 respuestas\n• "Falta de comunicación entre cuerpo técnico y plantel" — 4 respuestas\n\nNOTA DEL PSICÓLOGO: El problema no es individual. Es sistémico. Si el cuerpo técnico no aborda la dinámica colectiva, el rendimiento individual de Reyes es secundario al impacto en el grupo.\n\nESTATUS: Informe confidencial — Solo para Cuerpo Técnico',
        signature: 'Lic. Paola Méndez — Psicóloga Deportiva GCFC',
        signatureDate: '28 de febrero de 2026',
      },
    },
    {
      id: 'otf-situacion-financiera',
      title: 'Situación Financiera del Club — Q1 2026',
      description: 'Resumen ejecutivo — Directiva GCFC',
      detail: 'El club no tiene margen salarial para un aumento inmediato. Existe un bono condicional de Q60,000 disponible si el equipo clasifica al siguiente torneo.',
      type: 'record',
      displayType: 'bank-record',
      bankRecordMeta: {
        systemLabel: 'Guatemala City FC — Sistema Financiero Interno',
        date: 'Q1 2026 — Enero a Marzo',
        rows: [
          { label: 'Presupuesto salarial total', value: 'Q 2,800,000' },
          { label: 'Presupuesto ejecutado', value: 'Q 2,780,000 (99.3%)', highlight: true },
          { label: 'Margen salarial disponible', value: 'Q 20,000', highlight: true },
          { label: 'Aumento solicitado (Reyes)', value: 'Q 112,000 anuales — INVIABLE', highlight: true },
          { label: 'Bono de clasificación disponible', value: 'Q 60,000 (condicional)', },
          { label: 'Condición del bono', value: 'Clasificar al Torneo Nacional — Fase 2' },
          { label: 'Donación municipal pendiente', value: 'Q 350,000 (por confirmar)' },
        ],
        footer: 'NOTA DIRECTIVA: La donación municipal NO puede usarse para ajustes salariales según estatutos del club.',
      },
    },
    {
      id: 'otf-historial-disciplinario',
      title: 'Historial Disciplinario — Marco Reyes',
      description: 'Registro de incidentes — Temporadas anteriores',
      detail: 'Mismo incidente ocurrió hace 2 temporadas en el club anterior. El club anterior cedió al aumento. Reyes se fue al terminar la temporada de todas formas.',
      type: 'document',
      displayType: 'paper-doc',
      paperDocMeta: {
        docType: 'Historial Disciplinario y Contractual',
        date: 'Actualizado: Enero 2026',
        parties: ['Guatemala City FC — RRHH / Scouting'],
        body:
          'HISTORIAL — MARCO REYES\n\nCLUB ANTERIOR: Deportivo Xela FC (2022-2024)\n\nINCIDENTE — Temporada 2023:\nReyes se negó a jugar partido semifinal alegando desacuerdo contractual. El club cedió a un aumento del 28%. Reyes jugó el partido.\nRESULTADO: Reyes no renovó al terminar la temporada y se fue al mejor postor.\nNOTA DEL SCOUTING: "El patrón de comportamiento en momentos de presión es conocido. Ceder no garantiza lealtad."\n\nSALIDA DE DEPORTIVO XELA:\nDespués del aumento obtenido, Reyes rechazó renovar contrato y se transfirió a Guatemala City FC. El club anterior quedó sin delantero y sin los fondos comprometidos.\n\nCONCLUSIÓN: La estrategia de ceder ante presión no produce los resultados esperados a largo plazo.',
        signature: 'Depto. de Scouting — Guatemala City FC',
        signatureDate: '15 de enero de 2026',
      },
    },
    {
      id: 'otf-comunicado-municipal',
      title: 'Mensaje del Alcalde — Eduardo Mendoza',
      description: 'Comunicación directa — Alcaldía Municipal',
      detail: 'El alcalde Mendoza vincula directamente la donación municipal de Q350,000 con la alineación del "equipo completo" hoy.',
      type: 'document',
      displayType: 'email',
      isKey: true,
      emailMeta: {
        from: 'e.mendoza@municipalidad-gc.gob.gt',
        to: 'cuerpo.tecnico@guatemalacityfc.gt',
        date: 'Hoy, 13:45',
        subject: 'Donación Municipal — Condiciones para hoy',
        body:
          'Estimado Cuerpo Técnico:\n\nEspero confirmar nuestra reunión de la próxima semana para formalizar la donación de Q350,000 de la Alcaldía Municipal al club.\n\nComo hemos conversado informalmente, esta donación está asociada al compromiso del club con la comunidad. La comunidad espera ver al equipo completo en cancha hoy, especialmente a sus figuras principales.\n\nEntiendo que hay conversaciones contractuales en curso. Les dejo esta nota para que tengan en cuenta el contexto más amplio al tomar sus decisiones de hoy.\n\nEduardo Mendoza\nAlcalde Municipal — Guatemala City',
        hasReadReceipt: true,
      },
    },
  ],

  // ── Escenas ───────────────────────────────────────────────────────────────
  scenes: {

    // ── Escena 1: Reunión inicial ─────────────────────────────────────────
    'otf1-reunion-inicial': {
      id: 'otf1-reunion-inicial',
      dialogues: [
        {
          id: 'otf1-d1-narrador',
          speaker: 'Narrador',
          portrait: 'garcia-neutral',
          side: 'center',
          text: 'Vestuario. 15 minutos antes del partido. Marco Reyes está sentado en su locker, ropa de calle puesta. Su agente Rodrigo Vargas está de pie a su lado.',
        },
        {
          id: 'otf1-d1-reyes',
          speaker: 'Marco Reyes',
          portrait: 'reyes-arrogant',
          side: 'left',
          text: 'Ya sé por qué estás aquí. Si no hay aumento, no juego. El agente Vargas les explicó las condiciones hace tres semanas. Esperé.',
        },
        {
          id: 'otf1-d1-vargas',
          speaker: 'Rodrigo Vargas',
          portrait: 'vargas-agent-calm',
          side: 'left',
          text: 'Mi cliente es el mejor delantero que este club ha tenido en diez años. Un 35% de aumento no es una exigencia — es reconocer la realidad del mercado. ¿Cuál es la propuesta del club?',
          choices: [
            {
              id: 'c1-investigar',
              label: '"Marco, ¿qué está pasando realmente? Los últimos meses han sido difíciles para todos."',
              isCorrect: true,
              feedback: 'Abrir el diálogo con empatía crea espacio para una conversación real.',
              nextSceneId: 'otf1-capitan',
            },
            {
              id: 'c1-agresivo',
              label: '"Si no estás en cancha en 5 minutos, quedas fuera del equipo permanentemente."',
              isCorrect: false,
              wrongPenalty: 20,
              feedback: 'Amenazar a Reyes escala el conflicto. El vestuario entero se entera en segundos.',
              nextSceneId: 'otf1-wrong-c1-agresivo',
            },
            {
              id: 'c1-desesperado',
              label: '"¿Qué número necesitan para que Marco salga hoy?"',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'Preguntar el número primero cede terreno innecesariamente antes de entender la situación.',
              nextSceneId: 'otf1-wrong-c1-desesperado',
            },
          ],
        },
      ],
    },

    // ── Wrong: c1 agresivo ────────────────────────────────────────────────
    'otf1-wrong-c1-agresivo': {
      id: 'otf1-wrong-c1-agresivo',
      nextSceneId: 'otf1-capitan',
      dialogues: [
        {
          id: 'otf1-d-w1a-reyes',
          speaker: 'Marco Reyes',
          portrait: 'reyes-arrogant',
          side: 'left',
          text: '¿Me está amenazando? Voy a llamar a la prensa ahora mismo. Esto va a ser una noticia mucho más grande que un partido.',
        },
        {
          id: 'otf1-d-w1a-vargas',
          speaker: 'Rodrigo Vargas',
          portrait: 'vargas-agent-pressing',
          side: 'left',
          text: 'Esto ya llegó demasiado lejos. Llamamos a nuestros abogados.',
        },
      ],
    },

    // ── Wrong: c1 desesperado ─────────────────────────────────────────────
    'otf1-wrong-c1-desesperado': {
      id: 'otf1-wrong-c1-desesperado',
      nextSceneId: 'otf1-capitan',
      dialogues: [
        {
          id: 'otf1-d-w1d-vargas',
          speaker: 'Rodrigo Vargas',
          portrait: 'vargas-agent-pressing',
          side: 'left',
          text: 'Q432,000 anuales. Si lo tienen, hablamos. Si no, no hay partido.',
        },
        {
          id: 'otf1-d-w1d-reyes',
          speaker: 'Marco Reyes',
          portrait: 'reyes-arrogant',
          side: 'left',
          text: 'Lo que dijo Vargas.',
        },
      ],
    },

    // ── Escena 2: El capitán ──────────────────────────────���───────────────
    'otf1-capitan': {
      id: 'otf1-capitan',
      dialogues: [
        {
          id: 'otf1-d2-fuentes-entra',
          speaker: 'Narrador',
          portrait: 'garcia-neutral',
          side: 'center',
          text: 'La puerta del vestuario se abre. Diego Fuentes, el capitán, entra sin que nadie lo haya llamado.',
        },
        {
          id: 'otf1-d2-fuentes',
          speaker: 'Diego Fuentes',
          portrait: 'garcia-neutral',
          side: 'left',
          text: 'Con permiso. Marco, llevamos cuatro años juntos. Hemos ganado cosas importantes. El equipo necesita que salgas hoy. No como empleado — como compañero.',
        },
        {
          id: 'otf1-d2-vargas-cap',
          speaker: 'Rodrigo Vargas',
          portrait: 'vargas-agent-pressing',
          side: 'left',
          text: 'El discurso del compañerismo no paga la hipoteca de mi cliente. ¿Tienen algo concreto sobre la mesa o seguimos perdiendo el tiempo?',
          choices: [
            {
              id: 'c2-bono',
              label: '"Marco, existe un bono condicional de Q60,000 si clasificamos al torneo. Está en los libros financieros del club."',
              isCorrect: true,
              feedback: 'Presentar la opción real disponible es honesto y abre una negociación posible.',
              nextSceneId: 'otf1-alcalde',
            },
            {
              id: 'c2-full',
              label: '"Aceptamos el aumento completo. Lo formalizamos después del partido."',
              isCorrect: false,
              wrongPenalty: 20,
              feedback: 'Prometiste algo que el club no puede cumplir. Violas la cláusula Q2.4 del contrato y creas un problema legal.',
              nextSceneId: 'otf1-wrong-c2-full',
            },
            {
              id: 'c2-refuse',
              label: '"No hay dinero extra disponible. El contrato es el contrato."',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'Negarte a ofrecer cualquier alternativa cierra todas las puertas de negociación.',
              nextSceneId: 'otf1-wrong-c2-refuse',
            },
          ],
        },
      ],
    },

    // ── Wrong: c2 full ────────────────────────────────────────────────────
    'otf1-wrong-c2-full': {
      id: 'otf1-wrong-c2-full',
      nextSceneId: 'otf1-alcalde',
      dialogues: [
        {
          id: 'otf1-d-w2f-vargas',
          speaker: 'Rodrigo Vargas',
          portrait: 'vargas-agent-pressing',
          side: 'left',
          text: 'Entonces lo ponemos por escrito ahora mismo. Tengo un abogado disponible.',
        },
        {
          id: 'otf1-d-w2f-fuentes',
          speaker: 'Diego Fuentes',
          portrait: 'garcia-worried',
          side: 'left',
          text: 'Eso requiere aprobación de la Junta Directiva... No puedes comprometer eso ahora.',
        },
      ],
    },

    // ── Wrong: c2 refuse ──────────────────────────────────────────────────
    'otf1-wrong-c2-refuse': {
      id: 'otf1-wrong-c2-refuse',
      nextSceneId: 'otf1-alcalde',
      dialogues: [
        {
          id: 'otf1-d-w2r-reyes',
          speaker: 'Marco Reyes',
          portrait: 'reyes-arrogant',
          side: 'left',
          text: 'Si no hay nada nuevo sobre la mesa, no hay nada que hablar. Puedes irte.',
        },
      ],
    },

    // ── Escena 3: La llamada del alcalde ──────────────────────────────────
    'otf1-alcalde': {
      id: 'otf1-alcalde',
      dialogues: [
        {
          id: 'otf1-d3-narrador',
          speaker: 'Narrador',
          portrait: 'garcia-neutral',
          side: 'center',
          text: 'Tu teléfono vibra. La pantalla muestra: "Alcalde Eduardo Mendoza". Todos en el vestuario lo ven.',
        },
        {
          id: 'otf1-d3-alcalde',
          speaker: 'Alcalde Mendoza',
          portrait: 'mendoza-friendly',
          side: 'left',
          text: 'Buenas tardes. Solo quería confirmar que el equipo completo estará en cancha hoy, ¿verdad? La donación municipal de Q350,000 que hemos conversado... depende de que el partido sea representativo.',
          choices: [
            {
              id: 'c3-firme',
              label: '"Alcalde, con respeto: las decisiones técnicas del club son independientes de consideraciones externas."',
              isCorrect: true,
              feedback: 'Mantener la independencia técnica es lo correcto. Ceder a presión política compromete el club a largo plazo.',
              nextSceneId: 'otf1-evidencia',
            },
            {
              id: 'c3-cede',
              label: '"Sí, Alcalde. No se preocupe, Reyes saldrá al campo hoy."',
              isCorrect: false,
              wrongPenalty: 20,
              feedback: 'Cediste a la presión política sin autorización. Acabas de comprometer la independencia del cuerpo técnico.',
              nextSceneId: 'otf1-wrong-c3-cede',
            },
            {
              id: 'c3-ignora',
              label: '[Colgar sin responder]',
              isCorrect: false,
              wrongPenalty: 10,
              feedback: 'Ignorar al alcalde crea un problema político adicional que complica las negociaciones del club.',
              nextSceneId: 'otf1-wrong-c3-ignora',
            },
          ],
        },
      ],
    },

    // ── Wrong: c3 cede ────────────────────────────────────────────────────
    'otf1-wrong-c3-cede': {
      id: 'otf1-wrong-c3-cede',
      nextSceneId: 'otf1-evidencia',
      dialogues: [
        {
          id: 'otf1-d-w3c-alcalde',
          speaker: 'Alcalde Mendoza',
          portrait: 'mendoza-friendly',
          side: 'left',
          text: 'Excelente. Los medios municipales estarán cubriendo el partido. Hasta pronto.',
        },
        {
          id: 'otf1-d-w3c-reyes',
          speaker: 'Marco Reyes',
          portrait: 'reyes-arrogant',
          side: 'left',
          text: '¿Habló con el alcalde? ¿Qué les prometió exactamente?',
        },
      ],
    },

    // ── Wrong: c3 ignora ──────────────────────────────────────────────────
    'otf1-wrong-c3-ignora': {
      id: 'otf1-wrong-c3-ignora',
      nextSceneId: 'otf1-evidencia',
      dialogues: [
        {
          id: 'otf1-d-w3i-narrador',
          speaker: 'Narrador',
          portrait: 'garcia-neutral',
          side: 'center',
          text: 'Segundos después, llega un mensaje de texto del alcalde.',
        },
        {
          id: 'otf1-d-w3i-alcalde',
          speaker: 'Alcalde Mendoza',
          portrait: 'mendoza-threatening',
          side: 'left',
          text: 'No contestar llamadas de la Alcaldía no es aceptable. Espero resultados hoy. La donación está en revisión.',
        },
      ],
    },

    // ── Escena 4: Presentación de evidencia ───────────────────────────────
    'otf1-evidencia': {
      id: 'otf1-evidencia',
      isEvidencePresentScene: true,
      correctEvidenceIds: ['otf-pulso-vestuario'],
      relevantEvidenceIds: ['otf-pulso-vestuario', 'otf-situacion-financiera'],
      evidenceBonusCredibility: 10,
      evidencePenaltyCredibility: 8,
      nextSceneId: 'otf1-cierre',
      dialogues: [
        {
          id: 'otf1-d4-fuentes',
          speaker: 'Diego Fuentes',
          portrait: 'garcia-neutral',
          side: 'left',
          text: 'Tengo informaci��n del equipo que el cuerpo técnico recopiló el mes pasado. Podría cambiar la conversación si la presentamos correctamente.',
        },
        {
          id: 'otf1-d4-narrador',
          speaker: 'Narrador',
          portrait: 'garcia-neutral',
          side: 'center',
          text: 'Tienes acceso a los Informes del Vestuario. Hay un dato clave que podría cambiar la dinámica de esta negociación. ¿Cuál presentas?',
        },
      ],
    },

    // ── Escena 5: Cierre ──────────────────────────────────────────────────
    'otf1-cierre': {
      id: 'otf1-cierre',
      nextSceneId: 'otf1-verdict-stub',
      dialogues: [
        {
          id: 'otf1-d5-fuentes',
          speaker: 'Diego Fuentes',
          portrait: 'garcia-neutral',
          side: 'left',
          text: 'Siete de once titulares dijeron que el ambiente ya no es sostenible. Que la situación afecta la concentración de todos.',
        },
        {
          id: 'otf1-d5-reyes',
          speaker: 'Marco Reyes',
          portrait: 'reyes-backing-down',
          side: 'left',
          text: '...No sabía que era tan grave para el grupo. Pensé que era solo conmigo.',
        },
        {
          id: 'otf1-d5-vargas',
          speaker: 'Rodrigo Vargas',
          portrait: 'vargas-agent-calm',
          side: 'left',
          text: 'Necesito unos minutos para hablar en privado con Marco.',
        },
        {
          id: 'otf1-d5-narrador',
          speaker: 'Narrador',
          portrait: 'garcia-neutral',
          side: 'center',
          text: 'Sales del vestuario hacia el cuarto de la pizarra. El DT te espera. Es momento de hacer tu recomendación.',
        },
      ],
    },

    // ── Stub de veredicto (trigger para navigateToVerdict) ────────────────
    'otf1-verdict-stub': {
      id: 'otf1-verdict-stub',
      isVerdictScene: true,
      dialogues: [],
    },

    // ── Veredictos ────────────────────────────────────────────────────────

    'otf1-verdict-acuerdo': {
      id: 'otf1-verdict-acuerdo',
      isVerdictScene: true,
      dialogues: [],
      verdictData: {
        outcome: 'acuerdo',
        title: 'Acuerdo del Vestuario',
        subtitle: 'Marco Reyes acepta el bono condicional. El equipo sale al campo unido.',
        lessonTitle: 'El Liderazgo Técnico No Se Compra',
        lessonText:
          'Manejaste el conflicto con Marco Reyes sin ceder a presiones que el club no podía cumplir. Presentaste la única opción financieramente viable — el bono condicional — de manera que Reyes podía aceptar sin perder posición.\n\nCuando el alcalde intentó vincular la donación municipal con la alineación, mantuviste la independencia técnica. Esa decisión no es solo ética — es estratégica. Un club que cede a presión política externa pierde credibilidad ante sus propios jugadores.\n\nLa encuesta del vestuario fue la pieza clave. No porque cambiara a Reyes de inmediato, sino porque transformó el problema: dejó de ser "Reyes contra el club" y se convirtió en "¿qué es lo mejor para el equipo colectivamente?"\n\nEl liderazgo técnico efectivo no es imponer decisiones. Es crear las condiciones para que las personas correctas tomen las decisiones correctas.',
        regulationRef: 'FIFA Club Governance Handbook — Artículo 4.2: Independencia técnica y toma de decisiones / Principios de Gestión Deportiva',
      },
    },

    'otf1-verdict-tension': {
      id: 'otf1-verdict-tension',
      isVerdictScene: true,
      dialogues: [],
      verdictData: {
        outcome: 'tension-controlada',
        title: 'Tensión Controlada',
        subtitle: 'Reyes juega. El problema no está resuelto — está postergado.',
        lessonTitle: 'Resolver vs. Gestionar',
        lessonText:
          'Lograste que Reyes saliera al campo hoy. Eso es un resultado. Pero las condiciones que crearon este conflicto siguen intactas.\n\nAlgunos conflictos en organizaciones deportivas no se resuelven en 15 minutos — se gestionan. La diferencia está en qué tan claramente entiendes la distinción. Gestionar un conflicto sin resolverlo es válido cuando reconoces que estás comprando tiempo, no eliminando el problema.\n\nLo que necesitas hacer después del partido es más importante que lo que hiciste antes: conversación estructurada con Reyes, revisión del contrato con la Directiva, y seguimiento del clima del vestuario.\n\nUn liderazgo honesto reconoce cuándo "funcionó por hoy" no es lo mismo que "está solucionado".',
        regulationRef: 'Gestión de Conflictos en Organizaciones Deportivas — CIES Football Observatory',
      },
    },

    'otf1-verdict-sacrificio': {
      id: 'otf1-verdict-sacrificio',
      isVerdictScene: true,
      dialogues: [],
      verdictData: {
        outcome: 'sacrificio',
        title: 'Decisión Difícil',
        subtitle: 'Reyes no juega. El equipo sale al campo de todas formas.',
        lessonTitle: 'Cuando la Parte No Es el Todo',
        lessonText:
          'Reyes no salió al campo. Eso tiene consecuencias — para el partido de hoy, para la relación con el jugador, y posiblemente para la donación municipal.\n\nPero el equipo salió. Once jugadores que decidieron que el objetivo colectivo era más importante que el conflicto individual.\n\nLas organizaciones deportivas enfrentan esta tensión constantemente: ¿cuándo proteger al individuo estrella, y cuándo proteger al colectivo? No hay una respuesta universal. Hay principios.\n\nEl error que posiblemente cometiste no fue la decisión final — fue no haber construido suficiente cohesión antes de llegar a este punto. La encuesta del vestuario existía hace semanas. Esa información debió haber informado la conversación mucho antes de hoy.\n\nLas crisis de vestuario raramente son sorpresas. Casi siempre son señales que no se leyeron a tiempo.',
        regulationRef: 'Principios de Gestión de Equipos Deportivos — CONCACAF Leadership Development',
      },
    },

    'otf1-verdict-crisis': {
      id: 'otf1-verdict-crisis',
      isVerdictScene: true,
      dialogues: [],
      verdictData: {
        outcome: 'crisis',
        title: 'Crisis',
        subtitle: 'La negociación colapsó. El club enfrenta consecuencias en múltiples frentes.',
        lessonTitle: 'El Costo de la Escalada',
        lessonText:
          'La situación se salió de control. Reyes no juega, el vestuario está dividido, el alcalde está molesto, y Vargas ya está hablando con medios.\n\nUna crisis de vestuario que llega a este punto casi siempre tiene múltiples causas — y casi siempre había señales previas que no se atendieron. El conflicto de hoy no surgió esta mañana.\n\nHay tres errores que contribuyeron a este resultado: escalar el conflicto cuando debías bajar la temperatura, hacer compromisos que el club no podía cumplir, o ceder a presiones externas que comprometieron la credibilidad técnica.\n\nCuando retomes el trabajo la semana próxima — y habrá semana próxima — la pregunta no es "¿qué salió mal hoy?" La pregunta es "¿qué sistema de gestión de vestuario necesitamos para que esto no vuelva a pasar?"',
        regulationRef: 'Gestión de Crisis en Organizaciones Deportivas — FIFA Technical Development',
      },
    },

    'otf1-verdict-sin-tiempo': {
      id: 'otf1-verdict-sin-tiempo',
      isVerdictScene: true,
      dialogues: [],
      verdictData: {
        outcome: 'sin-tiempo',
        title: 'El DT Decide Solo',
        subtitle: 'El tiempo se agotó. Las decisiones se tomaron sin tu recomendación.',
        lessonTitle: 'La Urgencia También Es Información',
        lessonText:
          'El DT tuvo que tomar la decisión sin tu recomendación. No porque fallara la negociación — sino porque el tiempo de decisión se agotó antes de que pudieras llegar a una conclusión.\n\nEn gestión deportiva — como en cualquier gestión bajo presión — el tiempo es un recurso tan crítico como la información. Tener la respuesta correcta cinco minutos después del partido no es tener la respuesta correcta.\n\nAlgunos conflictos tienen ventanas de resolución muy cortas. Reconocer esa ventana y actuar dentro de ella es parte de las competencias de un cuerpo técnico efectivo.\n\nLa próxima vez que enfrentes una crisis de vestuario, la primera pregunta no es "¿cómo lo resuelvo?" La primera pregunta es "¿cuánto tiempo tengo, y cómo lo administro?"',
        regulationRef: 'Toma de Decisiones Bajo Presión — INEFC / CONCACAF Leadership Program',
      },
    },
  },
}

export const OTF_CASES: Case[] = [otfCase1, otfCase2]
export { otfCase2 }
