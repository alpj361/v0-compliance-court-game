// ── OTF Caso 2 — Evidencia ────────────────────────────────────────────────────
// 15 items: 5 inbox · 5 archivo · 5 perfiles

import type { EvidenceCard } from '@/lib/types'

// ── BANDEJA DE ENTRADA (5 correos iniciales) ──────────────────────────────────

export const inboxEvidence: EvidenceCard[] = [
  {
    id: 'e2-comite-convocatoria',
    title: 'Convocatoria — Audiencia #0312',
    description: 'Comité de Ética · 25 mar 2026',
    detail: 'Convocatoria formal de audiencia del Comité de Ética.',
    type: 'document',
    displayType: 'email',
    emailFolder: 'inbox',
    emailMeta: {
      from: 'Comité de Ética <etica@corp.gt>',
      to: 'Nicolas García <n.garcia@corp.gt>',
      date: 'Mié, 25 mar 2026, 08:15',
      subject: 'Convocatoria Audiencia #0312 — Caso de Denuncia',
      body: `Estimado Lic. García,

Por medio de la presente, el Comité de Ética lo convoca a la Audiencia #0312, programada para hoy a las 10:00 h, en modalidad de videoconferencia.

Usted ha solicitado formalmente que el Comité evalúe la posibilidad de abrir una investigación sobre presuntas irregularidades de conducta en el Departamento de Archivo y Documentación.

La Lic. Lupita Morales no estará presente en esta sesión, ya que actualmente se encuentra en comisión de servicio fuera de la ciudad. Su participación podrá programarse en una sesión posterior si el Comité determina que es necesario.

Le solicitamos que prepare la documentación de respaldo que considere pertinente.

Atentamente,
Dra. Paz Herrera
Presidenta, Comité de Ética Corporativo`,
    },
  },

  {
    id: 'e2-email-carlos',
    title: 'Algo que necesito contarle',
    description: 'Carlos Menchú (Mensajería) · 20 mar 2026',
    detail: 'Carlos vio algo el 14 de febrero que no ha podido olvidar.',
    type: 'testimony',
    displayType: 'email',
    emailFolder: 'inbox',
    emailMeta: {
      from: 'Carlos Menchú <c.menchu@corp.gt>',
      to: 'Nicolas García <n.garcia@corp.gt>',
      date: 'Vie, 20 mar 2026, 17:42',
      subject: 'Algo que necesito contarle',
      body: `Don Nicolás,

Perdone que le escriba así, pero no sé a quién más decirle esto.

El 14 de febrero, como a las 6:45 pm, yo pasé por el pasillo del archivo porque olvidé mi suéter. Vi a Marco Valdés hablando con Lupita cerca de la puerta. Ella estaba pegada a la pared y él estaba muy cerca. Cuando yo apareí, Marco me miró y me dijo: "Carlos, hoy es tu día libre, ¿verdad? Qué bueno que descansas." Con una sonrisa. Pero yo no tenía día libre ese día.

Lupita no dijo nada. Se veía como si quisiera que yo me fuera.

Yo no quiero problemas, don Nicolás. Pero tampoco puedo quedarme callado si esto sigue.

Cuente conmigo si me necesita,
Carlos`,
    },
  },

  {
    id: 'e2-email-it-logs',
    title: 'Reporte de Accesos — Carpeta Compartida ARCHIVO-L',
    description: 'Soporte IT · 18 mar 2026',
    detail: 'IT detectó accesos fuera de horario a la carpeta de Lupita.',
    type: 'record',
    displayType: 'email',
    emailFolder: 'inbox',
    emailMeta: {
      from: 'Soporte IT <it@corp.gt>',
      to: 'Nicolas García <n.garcia@corp.gt>',
      date: 'Mié, 18 mar 2026, 11:05',
      subject: 'Reporte de Accesos Inusuales — Carpeta ARCHIVO-L',
      body: `Lic. García,

Tal como usted solicitó, adjuntamos el reporte de accesos a la carpeta compartida ARCHIVO-L (asignada a Lupita Morales) correspondiente a enero-marzo 2026.

Hallazgos relevantes:
• 14 accesos registrados fuera del horario laboral (después de 19:00 h o fines de semana)
• Usuario: MVALDES (Marco Valdés, AT2)
• Fechas concentradas: 14 feb, 21 feb, 7 mar, 12 mar, 15 mar
• Tipo de acceso: lectura y copia de archivos

Nota: El acceso a carpetas compartidas de otros usuarios fuera de horario no está prohibido técnicamente, pero sí es inusual y puede indicar un patrón de monitoreo no autorizado.

Quedo a sus órdenes,
Depto. de Soporte IT`,
    },
  },

  {
    id: 'e2-email-valentina',
    title: 'Re: Referencia — Marco Valdés',
    description: 'Valentina Cruz (Ex-colega) · 15 mar 2026',
    detail: 'Valentina trabajó con Marco en otra empresa. Tiene información.',
    type: 'testimony',
    displayType: 'email',
    emailFolder: 'inbox',
    emailMeta: {
      from: 'Valentina Cruz <v.cruz@externos.gt>',
      to: 'Nicolas García <n.garcia@corp.gt>',
      date: 'Dom, 15 mar 2026, 20:18',
      subject: 'Re: Referencia — Marco Valdés',
      body: `Lic. García,

Gracias por contactarme. Entiendo la sensibilidad de este asunto y le escribo con discreción.

Trabajé con Marco Valdés en Distribuidora del Norte S.A. entre 2019 y 2021. En 2021 hubo una queja verbal de una compañera de nombre Mariana Estrada. La queja describía comportamientos similares a lo que usted menciona: comentarios personales no solicitados, presencia intimidante, y un incidente después del horario laboral.

La queja fue archivada por RRHH como "conflicto interpersonal sin evidencia suficiente." Marco fue trasladado a otra sede dos semanas después. Mariana renunció ese mismo mes.

No sé si esto le es útil, pero quería que lo supiera.

Atentamente,
Valentina Cruz`,
    },
  },

  {
    id: 'e2-email-lupita-hoy',
    title: 'Necesito hablarle de algo',
    description: 'Lupita Morales · 24 mar 2026',
    detail: 'Lupita finalmente le escribió. Está asustada pero quiere que se sepa.',
    type: 'testimony',
    displayType: 'email',
    isKey: true,
    emailFolder: 'inbox',
    emailMeta: {
      from: 'Lupita Morales <l.morales@corp.gt>',
      to: 'Nicolas García <n.garcia@corp.gt>',
      date: 'Mar, 24 mar 2026, 22:47',
      subject: 'Necesito hablarle de algo',
      body: `Don Nicolás,

Le escribo tarde porque de día no me siento segura de escribir esto desde la oficina.

Lo que ha pasado estos tres meses no fue un malentendido. Marco Valdés lleva meses haciendo comentarios sobre mi ropa, sobre si tengo novio, sobre que "le caigo bien de una forma especial." Cuando le pedí que parara, me dijo que era una broma y que yo era muy sensible.

El 14 de febrero se quedó después de que todos se fueron. Yo estaba terminando un reporte. Me acorraló en el pasillo del archivo y me dijo que tenía que "hablar de nuestra situación." No pasó a mayores porque Carlos apareció, pero ese fue el momento en que decidí irme a casa sin terminar el reporte.

Intenté escribirle al Comité de Ética en marzo, pero borré el correo. Tenía miedo de que no me creyeran. Marco tiene 7 años en la empresa. Yo tengo 3.

No voy a estar en la audiencia porque RRHH me asignó una comisión de servicio. Sé que no es casualidad.

Si puede hacer algo, hágalo. Pero entienda que si esto sale mal, yo soy la que quedo mal parada.

Lupita`,
    },
  },
]

// ── ARCHIVO — 3 meses de historial ────────────────────────────────────────────

export const archiveEvidence: EvidenceCard[] = [
  {
    id: 'e2-thread-feb-incidente',
    title: 'Cadena: "Re: Reunión de seguimiento" — 14 feb',
    description: 'Cadena de correos del 14 de febrero. El mensaje de Marco es clave.',
    detail: 'Cadena que incluye el mensaje de Marco "solo bromeaba" — amenaza implícita.',
    type: 'document',
    displayType: 'email-thread',
    isKey: true,
    emailFolder: 'archive',
    emailThreadMeta: {
      subject: 'Re: Reunión de seguimiento — Feb 14',
      participants: ['Lupita Morales', 'Marco Valdés', 'Nicolas García (CC accidental)'],
      emails: [
        {
          id: 'th1',
          from: 'Lupita Morales <l.morales@corp.gt>',
          to: 'Marco Valdés <m.valdes@corp.gt>',
          date: 'Sáb, 14 feb 2026, 07:12',
          body: `Marco,

Necesito hablar contigo sobre lo de ayer. No me pareció apropiado lo que pasó en el pasillo. Por favor mantengamos una relación estrictamente profesional.

Lupita`,
        },
        {
          id: 'th2',
          from: 'Marco Valdés <m.valdes@corp.gt>',
          to: 'Lupita Morales <l.morales@corp.gt>; Nicolas García <n.garcia@corp.gt>',
          date: 'Sáb, 14 feb 2026, 09:34',
          body: `Lupita, lo de ayer fue una broma. No tienes que ponerte así.

Además, nadie va a creer lo que dices. Llevamos 7 años aquí y tú llevas 3. Solo cuídate.

Marco

[Nota: Nicolas García fue incluido en CC por error — correo reenviado automáticamente por la lista del grupo ARCHIVO-GENERAL]`,
          isHighlighted: true,
          highlightNote: '⚠ Amenaza implícita + referencia a años de servicio como factor de poder',
        },
        {
          id: 'th3',
          from: 'Lupita Morales <l.morales@corp.gt>',
          to: 'Marco Valdés <m.valdes@corp.gt>',
          date: 'Sáb, 14 feb 2026, 11:05',
          body: `Ok.`,
        },
      ],
    },
  },

  {
    id: 'e2-email-lupita-ausencia-feb',
    title: 'Justificación de ausencias — Lupita Morales',
    description: 'Lupita justifica 3 ausencias en febrero con certificados médicos.',
    detail: 'Lupita envía certificados médicos. RRHH los rechaza sin explicación.',
    type: 'record',
    displayType: 'email',
    emailFolder: 'archive',
    emailMeta: {
      from: 'Lupita Morales <l.morales@corp.gt>',
      to: 'RRHH <rrhh@corp.gt>',
      date: 'Lun, 23 feb 2026, 09:15',
      subject: 'Justificación de ausencias — 10, 14 y 21 de febrero',
      body: `Estimado Departamento de Recursos Humanos,

Por medio de la presente, adjunto los certificados médicos correspondientes a mis ausencias del 10, 14 y 21 de febrero de 2026, emitidos por el Dr. Arturo Méndez, médico general, Clínica Santa Lucía.

Las ausencias se debieron a un cuadro de estrés agudo con manifestaciones somáticas (cefalea intensa, náuseas). El médico recomendó reposo.

Quedo a la espera de su confirmación de recibido.

Atentamente,
Lupita Morales`,
    },
  },

  {
    id: 'e2-email-hr-llamado',
    title: 'Llamado de Atención — Lupita Morales (RRHH)',
    description: 'RRHH emite llamado de atención a Lupita por sus ausencias de febrero.',
    detail: 'RRHH sanciona a Lupita por ausencias documentadas con certificados médicos.',
    type: 'document',
    displayType: 'email',
    isKey: true,
    emailFolder: 'archive',
    emailMeta: {
      from: 'Roberto Salinas <r.salinas@corp.gt>',
      to: 'Lupita Morales <l.morales@corp.gt>',
      date: 'Mié, 25 feb 2026, 14:30',
      subject: 'Llamado de Atención Formal — Asistencia y Puntualidad',
      body: `Estimada Lic. Morales,

Por medio del presente se le notifica que ha acumulado 3 ausencias injustificadas durante el mes de febrero 2026 (días 10, 14 y 21), lo que constituye una falta al Reglamento Interior de Trabajo, Artículo 18, inciso b.

Esta comunicación queda registrada en su expediente como primer llamado de atención formal del año 2026.

Se le recuerda que una segunda acumulación de faltas en el trimestre podría resultar en medidas disciplinarias adicionales.

Roberto Salinas
Líder de Recursos Humanos`,
      hasReadReceipt: true,
    },
  },

  {
    id: 'e2-email-lupita-borrador',
    title: 'BORRADOR NO ENVIADO — Denuncia al Comité de Ética',
    description: 'Borrador encontrado en la carpeta ARCHIVO-L. Lupita nunca lo envió.',
    detail: 'Lupita redactó una denuncia formal en marzo pero nunca la envió.',
    type: 'document',
    displayType: 'email',
    isKey: true,
    emailFolder: 'archive',
    emailMeta: {
      from: 'Lupita Morales <l.morales@corp.gt>',
      to: '(sin destinatario — borrador guardado)',
      date: 'Dom, 1 mar 2026, 23:55',
      subject: '[BORRADOR] Denuncia formal — Conducta inapropiada AT2',
      body: `Estimado Comité de Ética,

Me dirijo a ustedes para reportar una situación de hostigamiento laboral por parte del Asistente Técnico 2, Marco Valdés (ID: EMP-0089), que se ha extendido desde enero de 2026.

Los hechos incluyen:
1. Comentarios reiterados de naturaleza personal no solicitados
2. Presencia intimidante después del horario laboral (incidente del 14 de febrero)
3. Amenaza implícita por correo electrónico del 14 de febrero: "Nadie va a creer lo que dices"
4. Accesos a mi carpeta de archivos fuera de horario laboral

Solicito que el Comité abra una investigación formal y garantice mi protección durante el proceso.

[BORRADOR — NO ENVIADO. Archivo encontrado en carpeta compartida ARCHIVO-L, guardado automáticamente por el sistema el 01-03-2026 23:55]`,
    },
  },

  {
    id: 'e2-email-hr-interno',
    title: 'RE: Situación Lupita — Salinas a Valdés (interno)',
    description: 'Correo interno de RRHH a Marco Valdés. Nunca debió llegar a archivo compartido.',
    detail: 'Salinas coordina con Marco para manejar la situación "internamente".',
    type: 'document',
    displayType: 'email',
    isKey: true,
    emailFolder: 'archive',
    emailMeta: {
      from: 'Roberto Salinas <r.salinas@corp.gt>',
      to: 'Marco Valdés <m.valdes@corp.gt>',
      date: 'Jue, 5 mar 2026, 17:58',
      subject: 'RE: Situación Lupita',
      body: `Marco,

Como te comenté en la reunión del martes, esto lo vamos a manejar internamente. No te preocupes.

La situación quedará documentada como "conflicto interpersonal bilateral" — sin señalar a ninguna de las dos partes. Los certificados médicos de Lupita ya fueron registrados como ausencias injustificadas, lo que le da un antecedente si decide escalar.

No respondas correos de ella directamente por un tiempo. Si el asunto sube al Comité, ya hablé con la presidenta para que lo traten con discreción.

Aquí entre nos: lleva 3 años, tú llevas 7. Las matemáticas son claras.

R.

[NOTA: Este correo fue archivado automáticamente en la carpeta GRUPO-ARCHIVO por un error de configuración del servidor — 05-03-2026]`,
      hasReadReceipt: false,
    },
  },
]

// ── PERFILES DE EMPLEADOS ─────────────────────────────────────────────────────

export const profileEvidence: EvidenceCard[] = [
  {
    id: 'e2-profile-marco',
    title: 'Perfil — Marco Valdés (AT2)',
    description: 'Asistente Técnico 2 · 7 años en la empresa',
    detail: 'Perfil de Marco Valdés. Historial positivo con un antecedente archivado.',
    type: 'record',
    displayType: 'employee-profile',
    emailFolder: 'profiles',
    employeeProfileMeta: {
      employeeId: 'EMP-0089',
      name: 'Marco Valdés',
      role: 'Asistente Técnico 2',
      department: 'Archivo y Documentación',
      yearsInCompany: 7,
      hireDate: '12 enero 2019',
      status: 'active',
      stats: [
        { label: 'Evaluación Q4 2025', value: '88/100', flag: 'positive' },
        { label: 'Evaluación Q1 2026', value: 'Pendiente', flag: 'neutral' },
        { label: 'Ausentismo 2025', value: '2 días', flag: 'positive' },
        { label: 'Capacitaciones completadas', value: '6/6', flag: 'positive' },
        { label: 'Quejas formales registradas', value: '0', flag: 'positive' },
      ],
      timeline: [
        { date: 'Ene 2019', event: 'Ingreso a la empresa como Aux. Técnico', type: 'neutral' },
        { date: 'Mar 2021', event: 'Ascenso a Asistente Técnico 2', type: 'positive' },
        { date: 'Jun 2021', event: 'Cambio de empresa anterior — Distrib. del Norte S.A.', type: 'neutral' },
        { date: 'Dic 2023', event: 'Reconocimiento "Empleado del Trimestre"', type: 'positive' },
        { date: 'Feb 2026', event: 'Correo con contenido cuestionable (en investigación interna, archivado)', type: 'warning' },
      ],
      hrNotes: 'Colaborador con buen desempeño histórico. La queja de febrero 2026 fue manejada internamente como "conflicto interpersonal bilateral" (ver nota R. Salinas, 05-mar-2026). Sin sanciones formales en expediente.',
      confidential: true,
    },
  },

  {
    id: 'e2-profile-lupita',
    title: 'Perfil — Lupita Morales (Secretaria)',
    description: 'Secretaria Ejecutiva · 3 años en la empresa',
    detail: 'Perfil de Lupita Morales. Excelente historial hasta enero 2026.',
    type: 'record',
    displayType: 'employee-profile',
    emailFolder: 'profiles',
    employeeProfileMeta: {
      employeeId: 'EMP-0134',
      name: 'Lupita Morales',
      role: 'Secretaria Ejecutiva',
      department: 'Archivo y Documentación',
      yearsInCompany: 3,
      hireDate: '3 marzo 2023',
      status: 'active',
      stats: [
        { label: 'Evaluación Q4 2025', value: '96/100', flag: 'positive' },
        { label: 'Evaluación Q1 2026', value: '62/100', flag: 'negative' },
        { label: 'Ausentismo Q4 2025', value: '0 días', flag: 'positive' },
        { label: 'Ausentismo Q1 2026', value: '5 días (3 certificados médicos)', flag: 'warning' },
        { label: 'Llamados de atención 2026', value: '1 (por ausentismo, feb)', flag: 'negative' },
      ],
      timeline: [
        { date: 'Mar 2023', event: 'Ingreso como Secretaria Ejecutiva Jr.', type: 'neutral' },
        { date: 'Dic 2023', event: 'Ascenso a Secretaria Ejecutiva', type: 'positive' },
        { date: 'Jul 2024', event: 'Evaluación anual: 94/100 — "Excelente desempeño"', type: 'positive' },
        { date: 'Dic 2025', event: 'Evaluación Q4: 96/100 — mejor puntaje del departamento', type: 'positive' },
        { date: 'Feb 2026', event: 'Primera ausencia médica — estrés agudo (certificado Dr. Méndez)', type: 'warning' },
        { date: 'Feb 2026', event: 'Llamado de atención por ausencias (RRHH — R. Salinas)', type: 'negative' },
        { date: 'Mar 2026', event: 'Evaluación Q1: caída a 62/100 — nota: "parece distraída"', type: 'negative' },
      ],
      hrNotes: 'Colaboradora con trayectoria impecable hasta Q1 2026. La caída de desempeño coincide temporalmente con el período reportado de conflicto interpersonal. Actualmente en comisión de servicio (asignada por RRHH el 23-mar-2026).',
      confidential: false,
    },
  },

  {
    id: 'e2-profile-salinas',
    title: 'Perfil — Roberto Salinas (Lider RRHH)',
    description: 'Líder de Recursos Humanos · 9 años en la empresa',
    detail: 'Perfil de Roberto Salinas. Tiene relación previa con Marco Valdés.',
    type: 'record',
    displayType: 'employee-profile',
    emailFolder: 'profiles',
    employeeProfileMeta: {
      employeeId: 'EMP-0055',
      name: 'Roberto Salinas',
      role: 'Líder de Recursos Humanos',
      department: 'Recursos Humanos',
      yearsInCompany: 9,
      hireDate: '14 agosto 2017',
      status: 'active',
      stats: [
        { label: 'Casos de RRHH gestionados 2025', value: '47', flag: 'neutral' },
        { label: 'Casos escalados a Comité de Ética', value: '1 (en 9 años)', flag: 'warning' },
        { label: 'Quejas sobre gestión RRHH', value: '2 (archivadas)', flag: 'warning' },
        { label: 'Relación con M. Valdés', value: 'Compañeros desde 2019', flag: 'neutral' },
      ],
      timeline: [
        { date: 'Ago 2017', event: 'Ingreso como Asistente de RRHH', type: 'neutral' },
        { date: 'Ene 2019', event: 'Marco Valdés ingresa — Salinas gestiona su onboarding', type: 'neutral' },
        { date: 'Jun 2022', event: 'Ascenso a Líder de RRHH', type: 'positive' },
        { date: 'Feb 2026', event: 'Registra ausencias de L. Morales como "injustificadas" pese a certificados médicos', type: 'negative' },
        { date: 'Mar 2026', event: 'Envía correo interno coordinando manejo del caso con M. Valdés', type: 'negative' },
        { date: 'Mar 2026', event: 'Asigna comisión de servicio a L. Morales (fecha: 3 días antes de la audiencia)', type: 'warning' },
      ],
      hrNotes: 'Historial profesional sin incidentes formales. Relación interpersonal documentada con Marco Valdés desde el ingreso de este en 2019. Su gestión del caso de febrero 2026 está bajo revisión.',
      confidential: true,
    },
  },
]

// ── Export combinado ──────────────────────────────────────────────────────────

export const otf2Evidence: EvidenceCard[] = [
  ...inboxEvidence,
  ...archiveEvidence,
  ...profileEvidence,
]
