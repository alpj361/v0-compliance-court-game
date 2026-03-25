// ── OTF Caso 2 — El Correo de Tres Meses ─────────────────────────────────────
// Caso principal: combina evidencia + escenas de audiencia

import type { Case } from '@/lib/types'
import { otf2Evidence } from './otf-case2-evidence'
import { otf2Scenes } from './otf-case2-hearing'

export const otfCase2: Case = {
  id: 'otf-2',
  gameId: 'on-the-field',
  title: 'EL CORREO DE TRES MESES',
  subtitle: 'Oficinas Corporativas — Guatemala City',
  jurisdiction: 'Guatemala',
  roleLabel: 'Investigador Interno — Damián García',

  useEmailClient: true,
  initialCredibility: 60,
  hearingStartId: 'otf2-hearing-intro',
  firstSceneId: 'otf2-email-browse',

  briefing:
    'Lupita Morales, analista del equipo de Back Office, ha levantado una queja informal contra su jefe directo, Marco Valdés. ' +
    'Según su relato, durante los últimos tres meses ha recibido correos fuera de horario con críticas al trabajo, ' +
    'exclusiones de reuniones de equipo, y mensajes que ella describe como amenazantes. ' +
    'HR archivó una queja anterior sin investigar. Ahora el Comité de Ética ha convocado una audiencia. ' +
    'Tienes acceso a la bandeja de correos internos. Reúne evidencia antes de enfrentar al Comité. ' +
    'Empieza en desventaja: el caso ya lleva semanas estancado y la credibilidad del proceso está en juego.',

  vocab: {
    credibilityLabel: 'Solidez del Caso',
    evidenceLabel: 'Correos',
    recordLabel: 'Expediente',
    investigationLabel: 'Revisar Correos',
    trialLabel: 'Iniciar Audiencia',
    briefingEyesOnly: 'Expediente Interno — Solo para Investigadores Autorizados',
    correctEvidenceFeedback: 'Evidencia relevante adjuntada — el Comité la toma en cuenta.',
    wrongEvidenceFeedback: 'Evidencia poco relevante — el Comité cuestiona tu criterio.',
  },

  evidence: otf2Evidence,
  scenes: otf2Scenes,

  // Veredictos basados en solidez final del caso
  verdictRoutes: [
    { minCredibility: 78, sceneId: 'otf2-verdict-investigacion' },
    { minCredibility: 52, sceneId: 'otf2-verdict-revision' },
    { minCredibility: 0,  sceneId: 'otf2-verdict-archivo' },
  ],
}
