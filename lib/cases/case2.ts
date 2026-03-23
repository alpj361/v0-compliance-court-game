import type { Case } from '@/lib/types'

// ── Caso 2: El Conflicto de Interés ──────────────────────────────────────────
// Escenario de oficina. Sin revisión obligatoria de evidencia.
// 5 opciones por decisión. 5 niveles de veredicto.
// Notas del asesor legal por escena. Diálogos pre-veredicto de Webb.

export const case2: Case = {
  id: 'case-2',
  gameId: 'compliance-court',
  title: 'El Conflicto de Interés',
  subtitle: 'Un ejecutivo oculta vínculos con un proveedor estratégico',
  jurisdiction: 'Compliance Corporativo',
  roleLabel: 'Oficial de Cumplimiento',
  briefing: `Has recibido una denuncia anónima: el Director de Compras, Rodrigo Mendez, habría adjudicado contratos millonarios a Suministros Valverde S.A. — empresa propiedad de su cuñado — sin revelar el vínculo familiar al comité de ética ni en el registro de conflictos de interés.\n\nTienes acceso al contrato firmado, el registro de declaraciones juradas y los correos internos. Debes conducir la revisión de cumplimiento, confrontar al Director y determinar si procede sanción, recomendación o archivo.`,
  firstSceneId: 's1-apertura',
  evidence: [
    {
      id: 'ev-contrato',
      title: 'Contrato Suministros Valverde',
      description: 'Contrato de servicios por Q4.2M firmado por Rodrigo Mendez.',
      detail: 'Contrato de servicios marco por Q4,200,000 suscrito entre la empresa y Suministros Valverde S.A. Firmante por parte de la empresa: Rodrigo Mendez, Director de Compras. Fecha: 14 de marzo del año en curso.',
      type: 'document',
      displayType: 'paper-doc',
      isKey: true,
      paperDocMeta: {
        docType: 'Contrato de Servicios Marco',
        date: '14 de marzo',
        parties: ['Empresa (Rodrigo Mendez, Dir. Compras)', 'Suministros Valverde S.A.'],
        body: 'Por medio del presente instrumento, la empresa contrata los servicios de suministro y logística de Suministros Valverde S.A. por un monto de Q4,200,000 anuales, renovable automáticamente. El proceso de cotización se realizó con tres proveedores; Valverde presentó la oferta más baja.',
        signature: 'Rodrigo Mendez',
        signatureDate: '14 de marzo',
      },
    },
    {
      id: 'ev-declaracion',
      title: 'Declaración Jurada de Conflictos',
      description: 'Formulario anual de declaración de conflictos de interés de Mendez.',
      detail: 'Formulario de declaración jurada de conflictos de interés firmado por Rodrigo Mendez el 2 de enero. El campo "Vínculos familiares con proveedores" aparece marcado como "Ninguno".',
      type: 'record',
      displayType: 'paper-doc',
      isKey: true,
      paperDocMeta: {
        docType: 'Declaración Jurada — Conflictos de Interés',
        date: '2 de enero',
        parties: ['Rodrigo Mendez'],
        body: 'Declaro bajo juramento que no tengo vínculos familiares, financieros ni comerciales con ningún proveedor actual o potencial de la empresa. Vínculos familiares con proveedores: NINGUNO.',
        signature: 'Rodrigo Mendez',
        signatureDate: '2 de enero',
      },
    },
    {
      id: 'ev-correo',
      title: 'Correo interno — Negociación de precio',
      description: 'Correo entre Mendez y Valverde discutiendo condiciones antes del proceso formal.',
      detail: 'Correo encontrado en el servidor. Mendez escribe a carlos.valverde@suministrosvalverde.com: "Carlos, como acordamos en el almuerzo del jueves, prepara tu cotización en Q4.2M. Eso nos da margen para aprobar sin pasar por el comité ejecutivo."',
      type: 'document',
      displayType: 'email',
      isKey: true,
      emailMeta: {
        from: 'rodrigo.mendez@empresa.com',
        to: 'carlos.valverde@suministrosvalverde.com',
        date: '8 de febrero, 11:42 AM',
        subject: 'RE: Propuesta marco de servicios',
        body: 'Carlos,\n\nComo acordamos en el almuerzo del jueves, prepara tu cotización en Q4.2M. Eso nos da margen para aprobar sin pasar por el comité ejecutivo. Los otros dos proveedores que invitamos no van a llegar a ese precio.\n\nSaludos,\nRodrigo',
      },
    },
    {
      id: 'ev-registro-rrhh',
      title: 'Registro de parentesco — RRHH',
      description: 'Ficha de RRHH que identifica a Carlos Valverde como cuñado de Mendez.',
      detail: 'El sistema de RRHH registra que Rodrigo Mendez declaró en su ficha personal que su esposa es Lucía Valverde. Carlos Valverde Ochoa figura como hermano de Lucía Valverde en el árbol familiar declarado voluntariamente en 2019.',
      type: 'record',
      displayType: 'paper-doc',
      paperDocMeta: {
        docType: 'Ficha de Personal — Datos Familiares',
        date: '12 de junio de 2019',
        parties: ['Rodrigo Mendez'],
        body: 'Cónyuge: Lucía Valverde de Mendez. Familiares declarados: Carlos Valverde Ochoa (cuñado). Nota: declaración voluntaria para directorio de emergencias.',
        signature: 'Rodrigo Mendez',
        signatureDate: '12 de junio de 2019',
      },
    },
    {
      id: 'ev-politica',
      title: 'Política de Conflictos de Interés',
      description: 'Artículo 7 de la política interna sobre divulgación obligatoria.',
      detail: 'Art. 7 — Todo colaborador que tenga vínculo familiar de primer o segundo grado con cualquier proveedor o candidato a proveedor debe declararlo antes de participar en cualquier proceso de selección, negociación o aprobación de contratos. El incumplimiento constituye falta grave.',
      type: 'regulation',
      displayType: 'legal-text',
      isKey: true,
      legalTextMeta: {
        source: 'Política Interna de Ética y Cumplimiento',
        docTitle: 'Manual de Conflictos de Interés',
        articleRef: 'Artículo 7 — Divulgación Obligatoria',
        fullText: 'Todo colaborador que tenga vínculo familiar de primer o segundo grado con cualquier proveedor o candidato a proveedor debe declararlo ante el Comité de Ética antes de participar en cualquier proceso de selección, negociación o aprobación de contratos relacionados con dicho proveedor. El incumplimiento de esta obligación de divulgación constituye falta grave y podrá resultar en medidas disciplinarias que van desde amonestación escrita hasta terminación de la relación laboral, independientemente del resultado económico del contrato.',
      },
    },
    {
      id: 'ev-video-asesor',
      title: 'Video — Conflictos de Interés: Lo que debes saber',
      description: 'Explicación del Asesor Legal sobre la normativa de conflictos de interés y el proceso de revisión de cumplimiento.',
      detail: 'Video explicativo del Asesor Legal sobre la Política de Conflictos de Interés, Art. 7, y el protocolo correcto de revisión.',
      type: 'document',
      displayType: 'video',
      isKey: true,
      videoMeta: {
        src: '/videos/asesor-legal-conflicto-interes.mp4',
        title: 'Conflictos de Interés: Lo que debes saber',
        description: 'El Asesor Legal explica qué es un conflicto de interés, cuándo debe declararse, y cómo debe conducirse una revisión de cumplimiento. Referencia: Política Interna de Ética — Art. 7.',
      },
    },
  ],
  vocab: {
    credibilityLabel: 'Integridad del Proceso',
    evidenceLabel: 'Documentos',
    recordLabel: 'Expediente',
    investigationLabel: 'Revisar Documentos',
    trialLabel: 'Iniciar Revisión',
    briefingEyesOnly: 'Solo para el Oficial de Cumplimiento',
    correctEvidenceFeedback: '+5 Integridad — evidencia relevante presentada',
    wrongEvidenceFeedback: '-8 Integridad — evidencia fuera de contexto',
  },
  verdictRoutes: [
    { minCredibility: 85, sceneId: 's-verdict-pristine' },
    { minCredibility: 65, sceneId: 's-verdict-solid' },
    { minCredibility: 45, sceneId: 's-verdict-mixed' },
    { minCredibility: 25, sceneId: 's-verdict-weak' },
    { minCredibility: 0,  sceneId: 's-verdict-collapse' },
  ],
  scenes: {
    // ── ESCENA 1: Apertura — El caso llega a tu escritorio ───────────────────
    's1-apertura': {
      id: 's1-apertura',
      nextSceneId: 's2-decision-alcance',
      legalAdvisorVideoUrl: '/videos/asesor-legal-conflicto-interes.mp4',
      legalAdvisorNote: 'Una denuncia anónima no es prueba, pero sí obliga a abrir una revisión formal. El Art. 7 de la Política de Conflictos de Interés exige declaración previa a cualquier proceso de adjudicación en el que exista vínculo familiar.',
      dialogues: [
        {
          id: 's1-d1',
          speaker: 'Narrador',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'Lunes, 8:15 AM. Tu oficina de Cumplimiento. Un sobre sin remitente espera sobre tu teclado.',
        },
        {
          id: 's1-d2',
          speaker: 'Narrador',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'Dentro: una copia del contrato con Suministros Valverde S.A. y una nota manuscrita: "Revisa quién firma y a quién le compra."',
        },
        {
          id: 's1-d3',
          speaker: 'Rodrigo Mendez',
          portrait: 'rodrigo-confident',
          side: 'left',
          text: '—Buenos días. ¿Necesitas algo? Veo que tienes papeles de mi área sobre la mesa.',
        },
        {
          id: 's1-d4',
          speaker: 'Tú (Oficial de Cumplimiento)',
          portrait: 'compliance-officer-neutral',
          side: 'right',
          text: 'Rodrigo, acabo de recibir una denuncia anónima relacionada con el contrato de Suministros Valverde. Necesito agendar tiempo contigo hoy.',
        },
        {
          id: 's1-d5',
          speaker: 'Rodrigo Mendez',
          portrait: 'rodrigo-confident',
          side: 'left',
          text: '—Claro, no tengo nada que ocultar. Ese contrato fue el más competitivo del mercado. ¿A qué hora?',
        },
      ],
    },

    // ── ESCENA 2: Decisión de alcance — ¿Cómo abres la revisión? ─────────────
    's2-decision-alcance': {
      id: 's2-decision-alcance',
      nextSceneId: 's3-confrontacion',
      legalAdvisorVideoUrl: '/videos/asesor-legal-conflicto-interes.mp4',
      legalAdvisorNote: 'El protocolo de revisión de conflictos exige confidencialidad hasta tener hallazgos preliminares. Notificar a terceros (RRHH, Gerencia) antes de tiempo puede contaminar el proceso o alertar al sujeto investigado.',
      dialogues: [
        {
          id: 's2-d1',
          speaker: 'Narrador',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'Tienes 30 minutos antes de la reunión. ¿Cómo formalizas la apertura de esta revisión?',
        },
        {
          id: 's2-d2',
          speaker: 'Tú (Oficial de Cumplimiento)',
          portrait: 'compliance-officer-neutral',
          side: 'right',
          text: 'Antes de sentarme con Mendez, debo definir el alcance y el protocolo de esta revisión.',
          choices: [
            {
              id: 's2-c1',
              label: 'Abro un expediente formal de revisión bajo el protocolo de conflictos de interés y documento la denuncia.',
              isCorrect: true,
              feedback: 'Correcto. Documentar desde el inicio protege la integridad del proceso y cumple el protocolo interno.',
              nextSceneId: 's3-confrontacion',
            },
            {
              id: 's2-c2',
              label: 'Llamo primero a RRHH para que me confirmen si Mendez tiene familiares en Valverde.',
              isCorrect: false,
              wrongPenalty: 10,
              feedback: 'Incorrecto. Involucrar a RRHH sin haber abierto el expediente formal puede filtrar información prematuramente y comprometer la confidencialidad.',
            },
            {
              id: 's2-c3',
              label: 'Envío un correo a la Gerencia General informando que hay una investigación abierta contra Mendez.',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'Incorrecto. Informar a la Gerencia antes de tener hallazgos preliminares viola el principio de presunción de inocencia y puede obstruir el proceso.',
            },
            {
              id: 's2-c4',
              label: 'Reviso el expediente del contrato y los documentos disponibles antes de hacer cualquier contacto.',
              isCorrect: true,
              feedback: 'Aceptable. Revisar la evidencia documental es un buen primer paso, aunque también debes abrir el expediente formal para que la revisión sea oficial.',
              nextSceneId: 's3-confrontacion',
            },
            {
              id: 's2-c5',
              label: 'Espero a tener más información antes de formalizar nada — no quiero crear un problema si no hay nada.',
              isCorrect: false,
              wrongPenalty: 12,
              feedback: 'Incorrecto. Demorar la apertura del expediente ante una denuncia con documentación de respaldo incumple el deber de diligencia del área de cumplimiento.',
            },
          ],
        },
      ],
    },

    // ── ESCENA 3: Confrontación — La reunión con Mendez ──────────────────────
    's3-confrontacion': {
      id: 's3-confrontacion',
      nextSceneId: 's4-la-declaracion',
      legalAdvisorVideoUrl: '/videos/asesor-legal-conflicto-interes.mp4',
      legalAdvisorNote: 'En una entrevista de cumplimiento, el objetivo es obtener la versión del sujeto sin revelar toda la evidencia de golpe. Pregunta abierta primero, luego contrasta con los documentos. Nunca amenaces ni prometas confidencialidad que no puedas garantizar.',
      dialogues: [
        {
          id: 's3-d1',
          speaker: 'Narrador',
          portrait: 'judge-neutral',
          side: 'center',
          text: '10:00 AM. Sala de reuniones B. Rodrigo Mendez llega puntual, sin abogado, con una sonrisa tranquila.',
        },
        {
          id: 's3-d2',
          speaker: 'Rodrigo Mendez',
          portrait: 'rodrigo-confident',
          side: 'left',
          text: '—Mira, ya revisé el contrato esta mañana. Todo está en orden: tres cotizaciones, Valverde fue la más baja, proceso limpio.',
        },
        {
          id: 's3-d3',
          speaker: 'Tú (Oficial de Cumplimiento)',
          portrait: 'compliance-officer-neutral',
          side: 'right',
          text: 'Rodrigo, el proceso de cotización no es lo que me preocupa en este momento.',
          choices: [
            {
              id: 's3-c1',
              label: '¿Tienes algún vínculo familiar o personal con alguien en Suministros Valverde S.A.?',
              isCorrect: true,
              feedback: 'Correcto. Pregunta directa y abierta que le da la oportunidad de declarar voluntariamente, lo que es un paso procesal fundamental.',
              nextSceneId: 's4-la-declaracion',
            },
            {
              id: 's3-c2',
              label: 'Sé que Carlos Valverde es tu cuñado. ¿Por qué no lo declaraste?',
              isCorrect: false,
              wrongPenalty: 8,
              feedback: 'Incorrecto. Revelar toda la evidencia de entrada cierra el espacio para que el entrevistado se contradiga o se autoincrimine espontáneamente.',
            },
            {
              id: 's3-c3',
              label: 'Necesito que me firmes una nueva declaración jurada de conflictos ahora mismo.',
              isCorrect: false,
              wrongPenalty: 10,
              feedback: 'Incorrecto. Solicitar una declaración jurada en este momento sin contexto puede ser considerado coacción y complica el proceso.',
            },
            {
              id: 's3-c4',
              label: 'Cuéntame cómo conociste a Suministros Valverde y cómo llegaron a ser proveedores.',
              isCorrect: true,
              feedback: 'Correcto. Pregunta abierta sobre los hechos que puede revelar inconsistencias sin alertar al entrevistado sobre el hallazgo central.',
              nextSceneId: 's4-la-declaracion',
            },
            {
              id: 's3-c5',
              label: 'Esto es solo rutina, no te preocupes. ¿Me puedes explicar el proceso de selección?',
              isCorrect: false,
              wrongPenalty: 6,
              feedback: 'Incorrecto. Minimizar la gravedad de la revisión ("solo rutina") puede ser visto como engaño al entrevistado y afecta la credibilidad del proceso.',
            },
          ],
        },
      ],
    },

    // ── ESCENA 4: La Declaración — Mendez miente ─────────────────────────────
    's4-la-declaracion': {
      id: 's4-la-declaracion',
      nextSceneId: 's5-el-correo',
      legalAdvisorVideoUrl: '/videos/asesor-legal-conflicto-interes.mp4',
      legalAdvisorNote: 'Cuando un sujeto niega un vínculo que la evidencia documental establece claramente, no lo interrumpas de inmediato. Deja que complete su declaración. La contradicción entre lo declarado y los documentos es tu herramienta más poderosa.',
      dialogues: [
        {
          id: 's4-d1',
          speaker: 'Rodrigo Mendez',
          portrait: 'rodrigo-confident',
          side: 'left',
          text: '—No, ningún vínculo. Suministros Valverde es una empresa que encontramos en el directorio de proveedores certificados. No conozco personalmente a nadie ahí.',
        },
        {
          id: 's4-d2',
          speaker: 'Narrador',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'Mendez acaba de contradecir tanto su ficha de RRHH como el correo en tu expediente. ¿Cómo respondes?',
        },
        {
          id: 's4-d3',
          speaker: 'Tú (Oficial de Cumplimiento)',
          portrait: 'compliance-officer-neutral',
          side: 'right',
          text: 'Entiendo. ¿Estás seguro de que no existe ninguna relación personal o familiar con nadie en esa empresa?',
          choices: [
            {
              id: 's4-c1',
              label: 'Tomo nota de su declaración y le informo que tengo documentos adicionales que vamos a revisar juntos.',
              isCorrect: true,
              feedback: 'Correcto. Documentar la negativa y luego contrastar con la evidencia es el procedimiento apropiado.',
              nextSceneId: 's5-el-correo',
            },
            {
              id: 's4-c2',
              label: 'Le muestro inmediatamente la ficha de RRHH con el nombre de su cuñado.',
              isCorrect: false,
              wrongPenalty: 7,
              feedback: 'Apresurado. Mostrar evidencia sin haber agotado la oportunidad de declaración espontánea puede alertarlo para preparar una defensa.',
            },
            {
              id: 's4-c3',
              label: 'Eso es una mentira. Tenemos documentos que prueban que Carlos Valverde es tu cuñado.',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'Incorrecto. Acusar de mentir durante una entrevista de cumplimiento sin proceso formal es improcedente y puede crear responsabilidad legal para la empresa.',
            },
            {
              id: 's4-c4',
              label: 'Perfecto. ¿Me puedes firmar aquí que confirmas no tener vínculos con ningún proveedor actual?',
              isCorrect: true,
              feedback: 'Correcto. Obtener una confirmación escrita de la negativa es una herramienta procesal útil, aunque debes proceder con cuidado.',
              nextSceneId: 's5-el-correo',
            },
            {
              id: 's4-c5',
              label: 'Gracias, Rodrigo. Eso es todo por ahora — te avisaré si necesito algo más.',
              isCorrect: false,
              wrongPenalty: 12,
              feedback: 'Incorrecto. Terminar la entrevista sin contrastar la negativa con la evidencia disponible es una falla grave del proceso de revisión.',
            },
          ],
        },
      ],
    },

    // ── ESCENA 5: El Correo — La evidencia decisiva ───────────────────────────
    's5-el-correo': {
      id: 's5-el-correo',
      nextSceneId: 's6-decision-sancion',
      legalAdvisorVideoUrl: '/videos/asesor-legal-conflicto-interes.mp4',
      legalAdvisorNote: 'Al confrontar con evidencia documental, presenta primero el documento y deja que el sujeto lo lea. No interpretes por él. Su reacción y explicación son parte del registro. Cualquier promesa de "solución en privado" debe ser rechazada formalmente.',
      dialogues: [
        {
          id: 's5-d1',
          speaker: 'Narrador',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'Colocas el correo impreso sobre la mesa. "RE: Propuesta marco de servicios — 8 de febrero."',
        },
        {
          id: 's5-d2',
          speaker: 'Rodrigo Mendez',
          portrait: 'rodrigo-sweating',
          side: 'left',
          text: '—Espera... ese correo está fuera de contexto. Carlos es amigo mío, sí, pero el proceso fue transparente.',
        },
        {
          id: 's5-d3',
          speaker: 'Rodrigo Mendez',
          portrait: 'rodrigo-sweating',
          side: 'left',
          text: '—Y mira, podemos resolver esto de otra manera. No tiene que llegar más arriba. Yo puedo explicarle a la junta que...',
        },
        {
          id: 's5-d4',
          speaker: 'Tú (Oficial de Cumplimiento)',
          portrait: 'compliance-officer-neutral',
          side: 'right',
          text: 'Rodrigo, necesito que entiendas que este proceso ya está documentado y no puede resolverse informalmente.',
          choices: [
            {
              id: 's5-c1',
              label: 'Le informo que la oferta de "resolver privadamente" queda registrada en el expediente como un intento de influenciar el proceso.',
              isCorrect: true,
              feedback: 'Correcto. Un intento de influenciar una revisión de cumplimiento es una infracción adicional que debe quedar documentada.',
              nextSceneId: 's6-decision-sancion',
            },
            {
              id: 's5-c2',
              label: 'Escucho qué tiene en mente. Si su explicación es razonable, podría considerar archivar el caso.',
              isCorrect: false,
              wrongPenalty: 18,
              feedback: 'Incorrecto. Considerar archivar el caso a cambio de una explicación informal ante evidencia documentada es una falla ética grave.',
            },
            {
              id: 's5-c3',
              label: 'Le pido que se retire y que consulte con un abogado antes de continuar con la entrevista.',
              isCorrect: true,
              feedback: 'Correcto. Ante una situación donde el sujeto podría autoincriminarse, sugerir asesoría legal es una práctica de debido proceso.',
              nextSceneId: 's6-decision-sancion',
            },
            {
              id: 's5-c4',
              label: 'Suspendo la entrevista y llamo a la Gerencia General de inmediato.',
              isCorrect: false,
              wrongPenalty: 8,
              feedback: 'Apresurado. Llamar a la Gerencia en este momento rompe el protocolo de confidencialidad antes de completar los hallazgos preliminares.',
            },
            {
              id: 's5-c5',
              label: 'Le digo que si coopera totalmente con la revisión, eso será considerado positivamente en la recomendación final.',
              isCorrect: false,
              wrongPenalty: 10,
              feedback: 'Incorrecto. Hacer promesas sobre el resultado final del proceso de cumplimiento compromete la imparcialidad del oficial.',
            },
          ],
        },
      ],
    },

    // ── ESCENA 6: Decisión de sanción — El informe final ─────────────────────
    's6-decision-sancion': {
      id: 's6-decision-sancion',
      nextSceneId: 's7-router',
      legalAdvisorVideoUrl: '/videos/asesor-legal-conflicto-interes.mp4',
      legalAdvisorNote: 'La recomendación de sanción debe estar proporcional a la gravedad de los hallazgos y respaldada por la política. Una sanción desproporcionada puede ser impugnada. Una sanción insuficiente puede generar responsabilidad para el área de cumplimiento.',
      dialogues: [
        {
          id: 's6-d1',
          speaker: 'Narrador',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'Dos días después. Tu oficina. Tienes el expediente completo: la declaración falsa, el correo coordinado, el registro de RRHH, la política Art. 7.',
        },
        {
          id: 's6-d2',
          speaker: 'Narrador',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'Es momento de emitir tu recomendación formal al Comité de Ética.',
        },
        {
          id: 's6-d3',
          speaker: 'Tú (Oficial de Cumplimiento)',
          portrait: 'compliance-officer-neutral',
          side: 'right',
          text: 'Con base en los hallazgos documentados, ¿cuál es mi recomendación al Comité?',
          choices: [
            {
              id: 's6-c1',
              label: 'Recomendar sanción por falta grave: suspensión sin goce de sueldo, revisión del contrato con Valverde y exclusión de futuros procesos de compras.',
              isCorrect: true,
              feedback: 'Correcto. La combinación de declaración falsa, coordinación previa de precio y vínculo familiar no declarado constituye falta grave bajo el Art. 7.',
              nextSceneId: 's7-router',
            },
            {
              id: 's6-c2',
              label: 'Recomendar solo una amonestación escrita y capacitación en conflictos de interés.',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'Insuficiente. La evidencia de coordinación deliberada de precio y declaración falsa exige una respuesta más fuerte que una amonestación.',
            },
            {
              id: 's6-c3',
              label: 'Recomendar terminación inmediata de la relación laboral y denuncia ante el Ministerio Público.',
              isCorrect: false,
              wrongPenalty: 8,
              feedback: 'Desproporcionado en este etapa. La terminación puede ser el resultado del proceso disciplinario, pero la recomendación inicial debe seguir el escalamiento interno.',
            },
            {
              id: 's6-c4',
              label: 'Recomendar auditoría completa de todos los contratos firmados por Mendez en los últimos 3 años, más proceso disciplinario.',
              isCorrect: true,
              feedback: 'Correcto. Ampliar el alcance de la auditoría es procedente cuando hay evidencia de un patrón, y el proceso disciplinario debe seguir su curso.',
              nextSceneId: 's7-router',
            },
            {
              id: 's6-c5',
              label: 'Archivar el caso condicionalmente: si Mendez firma una carta de compromiso y rectifica la declaración, no hay sanción.',
              isCorrect: false,
              wrongPenalty: 20,
              feedback: 'Incorrecto. Archivar ante evidencia documentada de violación grave de política a cambio de una carta compromete seriamente la integridad del área de cumplimiento.',
            },
          ],
        },
      ],
    },

    // ── ROUTER DE CREDIBILIDAD ────────────────────────────────────────────────
    's7-router': {
      id: 's7-router',
      isCredibilityRouterScene: true,
      dialogues: [],
      credibilityRoutes: [
        { minCredibility: 85, sceneId: 's-pre-verdict-pristine' },
        { minCredibility: 65, sceneId: 's-pre-verdict-solid' },
        { minCredibility: 45, sceneId: 's-pre-verdict-mixed' },
        { minCredibility: 25, sceneId: 's-pre-verdict-weak' },
        { minCredibility: 0,  sceneId: 's-pre-verdict-collapse' },
      ],
    },

    // ── PRE-VEREDICTOS: Diálogos del Comité antes del veredicto ──────────────

    's-pre-verdict-pristine': {
      id: 's-pre-verdict-pristine',
      nextSceneId: 's-verdict-pristine',
      bypassVerdictRouting: true,
      dialogues: [
        {
          id: 'pv-pristine-1',
          speaker: 'Presidenta del Comité de Ética',
          portrait: 'morales-judge-neutral',
          side: 'left',
          text: 'Hemos revisado su expediente. La documentación es impecable: apertura formal, entrevista estructurada, contraste con evidencia, rechazo documentado del intento de influencia.',
        },
        {
          id: 'pv-pristine-2',
          speaker: 'Presidenta del Comité de Ética',
          portrait: 'morales-judge-neutral',
          side: 'left',
          text: 'Este es el estándar al que aspiramos en nuestra función. El Comité aprueba la recomendación en su totalidad.',
        },
      ],
    },

    's-pre-verdict-solid': {
      id: 's-pre-verdict-solid',
      nextSceneId: 's-verdict-solid',
      bypassVerdictRouting: true,
      dialogues: [
        {
          id: 'pv-solid-1',
          speaker: 'Presidenta del Comité de Ética',
          portrait: 'morales-judge-neutral',
          side: 'left',
          text: 'El proceso fue sólido. Hay algunos pasos que pudieron haberse ejecutado con más precisión, pero los hallazgos son claros y la recomendación está bien fundamentada.',
        },
        {
          id: 'pv-solid-2',
          speaker: 'Presidenta del Comité de Ética',
          portrait: 'morales-judge-neutral',
          side: 'left',
          text: 'El Comité acepta la recomendación. Se iniciará el proceso disciplinario correspondiente.',
        },
      ],
    },

    's-pre-verdict-mixed': {
      id: 's-pre-verdict-mixed',
      nextSceneId: 's-verdict-mixed',
      bypassVerdictRouting: true,
      dialogues: [
        {
          id: 'pv-mixed-1',
          speaker: 'Presidenta del Comité de Ética',
          portrait: 'morales-judge-neutral',
          side: 'left',
          text: 'El expediente presenta inconsistencias procedimentales que dificultan nuestra deliberación. Hubo pasos que comprometieron la cadena de custodia del proceso.',
        },
        {
          id: 'pv-mixed-2',
          speaker: 'Presidenta del Comité de Ética',
          portrait: 'morales-judge-neutral',
          side: 'left',
          text: 'Aceptamos los hallazgos con observaciones. La sanción recomendada se aplicará, pero el expediente quedará sujeto a revisión interna.',
        },
      ],
    },

    's-pre-verdict-weak': {
      id: 's-pre-verdict-weak',
      nextSceneId: 's-verdict-weak',
      bypassVerdictRouting: true,
      dialogues: [
        {
          id: 'pv-weak-1',
          speaker: 'Presidenta del Comité de Ética',
          portrait: 'morales-judge-neutral',
          side: 'left',
          text: 'Este expediente es problemático. Los errores procedimentales son suficientes para que la defensa de Mendez cuestione la validez de los hallazgos.',
        },
        {
          id: 'pv-weak-2',
          speaker: 'Presidenta del Comité de Ética',
          portrait: 'morales-judge-neutral',
          side: 'left',
          text: 'Solo podremos aplicar una medida menor. El proceso tendrá que reiniciarse con un oficial diferente si queremos llegar a una sanción proporcional.',
        },
      ],
    },

    's-pre-verdict-collapse': {
      id: 's-pre-verdict-collapse',
      nextSceneId: 's-verdict-collapse',
      bypassVerdictRouting: true,
      dialogues: [
        {
          id: 'pv-collapse-1',
          speaker: 'Presidenta del Comité de Ética',
          portrait: 'morales-judge-neutral',
          side: 'left',
          text: 'No podemos actuar con base en este expediente. Las fallas procedimentales son tan graves que cualquier sanción sería impugnable. Mendez ya tiene abogado.',
        },
        {
          id: 'pv-collapse-2',
          speaker: 'Presidenta del Comité de Ética',
          portrait: 'morales-judge-neutral',
          side: 'left',
          text: 'Archivamos el caso por ahora. Esto no nos exime de responsabilidad si el asunto se hace público. El área de cumplimiento tendrá que rendir cuentas.',
        },
      ],
    },

    // ── VEREDICTOS FINALES ────────────────────────────────────────────────────

    's-verdict-pristine': {
      id: 's-verdict-pristine',
      isVerdictScene: true,
      dialogues: [],
      verdictData: {
        outcome: 'guilty',
        title: 'Proceso Impecable',
        subtitle: 'Sanción aprobada — Integridad del sistema preservada',
        lessonTitle: '¿Qué hiciste bien?',
        lessonText: 'Abriste el expediente formal desde el inicio, condujiste la entrevista con preguntas abiertas, contrastaste la negativa con la evidencia documentada, rechazaste el intento de influencia y emitiste una recomendación proporcional a los hallazgos. Eso es cumplimiento corporativo ejecutado correctamente.',
        regulationRef: 'Política Interna de Ética — Art. 7 (Divulgación Obligatoria)',
      },
    },

    's-verdict-solid': {
      id: 's-verdict-solid',
      isVerdictScene: true,
      dialogues: [],
      verdictData: {
        outcome: 'guilty-reduced',
        title: 'Proceso Sólido',
        subtitle: 'Sanción aplicada con observaciones menores',
        lessonTitle: '¿Qué puedes mejorar?',
        lessonText: 'Tu proceso fue correcto en lo esencial, pero hubo momentos donde la secuencia procedimental no fue la óptima. Recuerda: en revisiones de conflictos de interés, el orden importa tanto como los hallazgos. La evidencia correcta, en el momento correcto, con el registro correcto.',
        regulationRef: 'Política Interna de Ética — Art. 7 (Divulgación Obligatoria)',
      },
    },

    's-verdict-mixed': {
      id: 's-verdict-mixed',
      isVerdictScene: true,
      dialogues: [],
      verdictData: {
        outcome: 'tension-controlada',
        title: 'Resultado Mixto',
        subtitle: 'Sanción parcial — Expediente bajo revisión interna',
        lessonTitle: '¿Qué salió mal?',
        lessonText: 'Varios pasos del proceso comprometieron la cadena de custodia: alertar prematuramente a terceros, revelar evidencia antes de agotar la declaración espontánea, o hacer promesas sobre el resultado. La fortaleza de un expediente de cumplimiento depende de la precisión procedimental.',
        regulationRef: 'Política Interna de Ética — Art. 7 (Divulgación Obligatoria)',
      },
    },

    's-verdict-weak': {
      id: 's-verdict-weak',
      isVerdictScene: true,
      dialogues: [],
      verdictData: {
        outcome: 'postponed',
        title: 'Proceso Comprometido',
        subtitle: 'Medida menor aplicada — Proceso debe reiniciarse',
        lessonTitle: '¿Qué falló?',
        lessonText: 'Los errores acumulados durante el proceso — desde la apertura hasta la recomendación — debilitaron el expediente hasta el punto donde Mendez puede impugnar la sanción. En cumplimiento, cada decisión procedimental incorrecta es una herramienta que el sujeto investigado puede usar en su defensa.',
        regulationRef: 'Política Interna de Ética — Art. 7 (Divulgación Obligatoria)',
      },
    },

    's-verdict-collapse': {
      id: 's-verdict-collapse',
      isVerdictScene: true,
      dialogues: [],
      verdictData: {
        outcome: 'acquitted',
        title: 'Proceso Nulo',
        subtitle: 'Caso archivado — El sistema falló',
        lessonTitle: '¿Qué aprender de esto?',
        lessonText: 'Un conflicto de interés documentado quedó sin sanción porque el proceso de revisión fue ejecutado incorrectamente. La evidencia existía, pero el procedimiento la hizo inutilizable. En cumplimiento corporativo, el "cómo" es tan importante como el "qué". Un proceso mal ejecutado protege al infractor, no a la organización.',
        regulationRef: 'Política Interna de Ética — Art. 7 (Divulgación Obligatoria)',
      },
    },
  },
}
