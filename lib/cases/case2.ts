import type { Case } from '@/lib/types'

// ── Case 2: The Toronto File — OSFI Compliance Hearing ───────────────────────
// 5 independent branches — each with its own narrative path and unique verdict.
// Player: Nicolás — Defense Counsel for Alex M.
// Venue: OSFI Compliance Hearing, Toronto, March 2026
// The branch is chosen at Scene 1. Each choice leads to a fully independent path.

export const case2: Case = {
  id: 'case-2',
  gameId: 'compliance-court',
  title: 'The Toronto File',
  subtitle: 'OSFI Compliance Hearing — Defense of Alex M.',
  jurisdiction: 'OSFI — Office of the Superintendent of Financial Institutions',
  roleLabel: 'Defense Counsel',
  briefing: `Toronto, March 2026. You are Nicolás, defense counsel retained by the bank on behalf of Alex M. — a financial advisor five months into his role with a perfect client satisfaction record.\n\nOSFI has opened a formal compliance hearing. The file contains three documented coaching sessions and a call monitoring report showing systematic gaps in mandatory client verification under FINTRAC Section 9.3 and OSFI Guideline E-21.\n\nAlex insists the outcomes were correct, the clients were satisfied, and the procedures were unnecessary in context. You have 90 minutes before the hearing. You must decide your approach.`,
  firstSceneId: 's1-first-meeting',

  // ── Instructions video — appears as a button BEFORE the evidence list ──────
  preTrialVideo: {
    speakerName: 'Legal Advisor',
    speakerTitle: 'OSFI Compliance Hearing — Defense Counsel Instructions',
    videoSrc: 'https://drive.google.com/file/d/1leAZm5X0TLsOeHBjAFl4GKXh7gKMPNZ3/preview',
    lines: [],
  },

  // ── Evidence — 7 documents ──────────────────────────────────────────────────
  evidence: [
    {
      id: 'ev-fintrac',
      title: 'FINTRAC — Section 9.3',
      description: 'Mandatory client identity verification requirements for financial transactions.',
      detail: 'Section 9.3 requires that regulated entities verify client identity before completing any financial transaction, regardless of prior relationship or agent familiarity with the client.',
      type: 'regulation',
      displayType: 'legal-text',
      isKey: true,
      legalTextMeta: {
        source: 'Financial Transactions and Reports Analysis Centre of Canada (FINTRAC)',
        docTitle: 'Client Identification and Verification Requirements',
        articleRef: 'Section 9.3 — Verification Obligations',
        fullText: 'A reporting entity must verify the identity of every client before completing a financial transaction, regardless of the agent\'s prior knowledge of or relationship with the client. Verification must be conducted through prescribed methods documented in the entity\'s compliance procedures. No exception applies on the basis of agent familiarity, client history, or expected outcome. Failure to complete mandatory verification on any single transaction constitutes a reportable compliance incident under FINTRAC Regulations Part 3, subsection 11(1).',
      },
    },
    {
      id: 'ev-osfi-e21',
      title: 'OSFI Guideline E-21',
      description: 'Retail conduct expectations — suitability assessment and documentation.',
      detail: 'OSFI E-21 requires that regulated institutions maintain documentation of suitability assessments for each client interaction involving a financial product recommendation.',
      type: 'regulation',
      displayType: 'legal-text',
      isKey: true,
      legalTextMeta: {
        source: 'Office of the Superintendent of Financial Institutions — OSFI',
        docTitle: 'Guideline E-21: Conduct and Suitability Standards',
        articleRef: 'Section 4.2 — Conduct and Suitability Documentation',
        fullText: 'Regulated institutions must ensure that each client-facing interaction involving a financial product recommendation includes: (a) a completed suitability assessment, (b) documented client verification per applicable FINTRAC requirements, and (c) a record of the information relied upon in making the recommendation. The absence of any of these three elements from a client file constitutes a conduct deficiency subject to supervisory review. Institutions are responsible for ensuring their agents comply with these requirements at all times, regardless of outcome or client satisfaction.',
      },
    },
    {
      id: 'ev-coaching-1',
      title: 'Coaching Log — Week 1',
      description: 'Documented compliance incident: verification step absent — January 14.',
      detail: 'First formal coaching session following a call monitoring flag. TL Marcus Webb documented that Alex M. completed a product recommendation without conducting FINTRAC verification.',
      type: 'record',
      displayType: 'coaching-log',
      isKey: true,
      coachingLogMeta: {
        sessionNumber: 1,
        date: 'January 14, 2026',
        teamLeader: 'Marcus Webb',
        agent: 'Alex M.',
        hintLevel: 'Compliance Incident — Level 1',
        discussion: 'Call monitoring flagged that on January 12, Alex completed a TFSA contribution recommendation without conducting the mandatory FINTRAC verbal verification checklist. Alex stated he knew the client well and the recommendation outcome was correct. TL explained that agent familiarity with a client does not replace the mandatory verification requirement. FINTRAC Section 9.3 and bank procedure COMP-04 require verification on every transaction without exception.',
        agentAcknowledgment: 'I understand the requirement. I will complete the verification checklist on all calls going forward.',
        tlNote: 'Alex was receptive and understood the policy. No further action at this time. Monitoring to continue.',
        agentSignature: 'Alex M.',
        tlSignature: 'Marcus Webb',
      },
    },
    {
      id: 'ev-coaching-2',
      title: 'Coaching Log — Week 2',
      description: 'Second documented incident: same pattern repeated — January 29.',
      detail: 'Second coaching session. The same pattern occurred two weeks after the first coaching: Alex completed a product call without FINTRAC verification.',
      type: 'record',
      displayType: 'coaching-log',
      isKey: true,
      coachingLogMeta: {
        sessionNumber: 2,
        date: 'January 29, 2026',
        teamLeader: 'Marcus Webb',
        agent: 'Alex M.',
        hintLevel: 'Compliance Incident — Level 2',
        discussion: 'Call monitoring flagged a second incident on January 28. Alex again completed a product recommendation — RRSP contribution increase — without performing FINTRAC verification. Alex acknowledged the requirement from the prior coaching session but stated the client was a long-standing relationship and he did not feel the step was necessary. TL reinforced that the procedure does not have a familiarity exemption. This is the second documented incident within 30 days.',
        agentAcknowledgment: 'Understood. I accept this is my second incident and will prioritize the verification step.',
        tlNote: 'Second incident escalated to written record per compliance protocol. Formal documentation submitted to compliance team. Alex\'s performance metrics remain excellent — compliance behavior must improve.',
        agentSignature: 'Alex M.',
        tlSignature: 'Marcus Webb',
      },
    },
    {
      id: 'ev-coaching-3',
      title: 'Coaching Log — Week 3',
      description: 'Third documented incident: escalated to regulatory reporting — February 11.',
      detail: 'Third coaching session in four weeks. Pattern now qualifies for mandatory OSFI reporting under internal compliance protocol COMP-09.',
      type: 'record',
      displayType: 'coaching-log',
      isKey: true,
      coachingLogMeta: {
        sessionNumber: 3,
        date: 'February 11, 2026',
        teamLeader: 'Marcus Webb',
        agent: 'Alex M.',
        hintLevel: 'Compliance Incident — Level 3 (Escalated)',
        discussion: 'Third FINTRAC verification incident flagged by call monitoring on February 9. Alex completed an RESP product recommendation without verification. This constitutes a pattern of non-compliance under internal policy COMP-09. Matter has been escalated to regional compliance officer and reported to OSFI per mandatory reporting requirements. Alex was advised that this matter is now under regulatory review.',
        agentAcknowledgment: 'I understand this has now been escalated. I am confident my recommendations were always correct, but I acknowledge I did not follow the verification procedure.',
        tlNote: 'Third incident. Mandatory OSFI report filed February 12. OSFI has opened a compliance hearing scheduled for March 2026. Agent placed on monitored status.',
        agentSignature: 'Alex M.',
        tlSignature: 'Marcus Webb',
      },
    },
    {
      id: 'ev-call-report',
      title: 'Call Monitoring Report — Q1 2026',
      description: 'QA analysis of 47 monitored calls: 3 compliance flags for missing verification.',
      detail: 'Compliance monitoring identified 3 calls where the mandatory FINTRAC verification checklist was absent from the recorded interaction.',
      type: 'record',
      displayType: 'call-report',
      isKey: true,
      callReportMeta: {
        source: 'Regional Compliance QA Team — Toronto Branch',
        date: 'February 2026',
        calls: [
          {
            callId: 'TOR-2026-0112-AM',
            date: 'January 12, 2026',
            type: 'TFSA Contribution Recommendation',
            actionTimestamp: '09:14:22',
            verificationTimestamp: '—',
            gap: 'Verification absent',
            flag: 'FINTRAC 9.3 — No verification conducted',
          },
          {
            callId: 'TOR-2026-0128-AM',
            date: 'January 28, 2026',
            type: 'RRSP Contribution Increase',
            actionTimestamp: '14:31:07',
            verificationTimestamp: '—',
            gap: 'Verification absent',
            flag: 'FINTRAC 9.3 — No verification conducted',
          },
          {
            callId: 'TOR-2026-0209-AM',
            date: 'February 9, 2026',
            type: 'RESP Product Recommendation',
            actionTimestamp: '11:02:45',
            verificationTimestamp: '—',
            gap: 'Verification absent',
            flag: 'FINTRAC 9.3 — No verification conducted (3rd incident — escalated)',
          },
        ],
        summary: 'Agent Alex M. shows a pattern of omitting FINTRAC Section 9.3 mandatory verification steps on product recommendation calls. 3 flagged incidents across 47 monitored calls (6.4%). All recommendations were substantively appropriate. The compliance deficiency is procedural, not substantive. Pattern triggers mandatory OSFI reporting per internal policy COMP-09.',
      },
    },
    {
      id: 'ev-performance-record',
      title: 'Performance Record — Alex M.',
      description: 'Five-month record: 100% NPS, top-quartile production, 3 compliance incidents.',
      detail: 'Alex M. has an exceptional performance record by all client-facing metrics. His compliance record, however, shows a documented pattern of procedural non-compliance.',
      type: 'record',
      displayType: 'bank-record',
      isKey: false,
      bankRecordMeta: {
        systemLabel: 'Canadian Banking Group — HR Performance System',
        date: 'March 1, 2026',
        rows: [
          { label: 'Agent', value: 'Alex M.' },
          { label: 'Tenure', value: '5 months (October 2025 — present)' },
          { label: 'Client Satisfaction (NPS)', value: '100%', highlight: true },
          { label: 'Production Quartile', value: 'Top 15% (Branch)' },
          { label: 'Product Knowledge Score', value: '98/100 — Certified' },
          { label: 'Compliance Incidents (Q1 2026)', value: '3 documented incidents', highlight: true },
          { label: 'Coaching Sessions Received', value: '3 (January–February 2026)', highlight: true },
          { label: 'Current Status', value: 'Monitored — OSFI Hearing Pending', highlight: true },
        ],
        footer: 'Note: Mandatory OSFI compliance hearing scheduled March 2026. All financial recommendations reviewed and confirmed substantively appropriate. Compliance deficiency is procedural in nature.',
      },
    },
  ],

  vocab: {
    credibilityLabel: 'Defense Credibility',
    evidenceLabel: 'Case File',
    recordLabel: 'File',
    investigationLabel: 'Review Case File',
    trialLabel: 'Enter Hearing',
    briefingEyesOnly: 'Confidential — Defense Counsel Only',
    correctEvidenceFeedback: '+5 Credibility — relevant document reviewed',
    wrongEvidenceFeedback: '-5 Credibility — evidence misapplied',
  },

  scenes: {
    // ══════════════════════════════════════════════════════════════════════════
    // SCENE 1 — First meeting with Alex M.  (SHARED — ALL 5 BRANCHES START HERE)
    // ══════════════════════════════════════════════════════════════════════════
    's1-first-meeting': {
      id: 's1-first-meeting',
      legalAdvisorNote: 'OSFI compliance hearings are not criminal proceedings, but findings can result in mandatory training, monetary penalties, or restriction of the agent\'s ability to advise clients. Your first decision as defense counsel will set the direction of the entire case.',
      dialogues: [
        {
          id: 's1-d1',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'Toronto. March 2026. A conference room in the bank\'s regional compliance center. Alex M. is already seated when you arrive. He looks calm — more calm than you expected.',
        },
        {
          id: 's1-d2',
          speaker: 'Alex M.',
          portrait: 'alex-neutral',
          side: 'left',
          text: 'Nicolás. Good. I\'ve been looking forward to this. I need someone who actually understands what happened here — because OSFI clearly doesn\'t.',
        },
        {
          id: 's1-d3',
          speaker: 'Alex M.',
          portrait: 'alex-neutral',
          side: 'left',
          text: 'Five months. Perfect client scores. Every recommendation I made was right. Every single one. And now I\'m in a compliance hearing because I didn\'t read a checklist out loud to clients who already trust me completely.',
        },
        {
          id: 's1-d4',
          speaker: 'Alex M.',
          portrait: 'alex-neutral',
          side: 'left',
          text: 'The verification step is a formality. I know these people. I knew the answer before I picked up the phone. The procedure exists for agents who don\'t know what they\'re doing.',
        },
        {
          id: 's1-d5',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'The hearing is in 90 minutes. I\'ve seen the file summary. Three coaching sessions, a call monitoring report, and an OSFI notice. I need to decide how to approach this.',
          choices: [
            {
              id: 's1-c1',
              label: 'You\'re right — the outcomes were perfect. We\'ll challenge the procedural findings as disproportionate. Aggressive defense.',
              isCorrect: false,
              wrongPenalty: 10,
              feedback: 'You\'ve committed to an aggressive strategy before reviewing a single document. Alex feels validated — but you\'re walking into the hearing blind.',
              nextSceneId: 's2a-aggressive-prep',
            },
            {
              id: 's1-c2',
              label: 'Tell me everything from the beginning. Walk me through each of those three calls.',
              isCorrect: true,
              feedback: 'You listen carefully before forming a strategy. You\'ll understand Alex\'s perspective — though you still haven\'t seen the documentary record.',
              nextSceneId: 's2b-balanced-listen',
            },
            {
              id: 's1-c3',
              label: 'Before we discuss strategy, I need to review the complete file — all seven documents. Give me 20 minutes.',
              isCorrect: true,
              feedback: 'The right instinct. You understand the evidence before forming a defense. This is the foundation of good counsel.',
              nextSceneId: 's2c-evidence-review',
            },
            {
              id: 's1-c4',
              label: 'Alex, I need to be direct with you. If these coaching logs are accurate, the evidence against you is documented and signed by you. We need to talk about what that means.',
              isCorrect: true,
              feedback: 'Direct and honest — before reading the file. Your instinct about accountability is right, even if you\'re working from a summary.',
              nextSceneId: 's2d-honest-counsel',
            },
            {
              id: 's1-c5',
              label: 'Alex, with three documented incidents and your own signature on the coaching logs, I\'m not confident I can build a credible defense here. I\'m stepping back from this case.',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'You\'ve declined the case based on a summary alone — before reading a single document. Alex will face the OSFI hearing without representation.',
              nextSceneId: 's2e-refuse-case',
            },
          ],
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // BRANCH A — Aggressive defense (s1-c1)
    // ══════════════════════════════════════════════════════════════════════════
    's2a-aggressive-prep': {
      id: 's2a-aggressive-prep',
      legalAdvisorNote: 'You are building a defense around outcome quality. This is a risky approach — OSFI hearings evaluate procedural compliance, not substantive outcomes. The hearing panel will not accept "the advice was good" as a defense against documented procedural failures.',
      dialogues: [
        {
          id: 's2a-d1',
          speaker: 'Alex M.',
          portrait: 'alex-confident',
          side: 'left',
          text: 'Finally. Someone who gets it. Look at the numbers — 100% NPS, top 15% production. These clients were served perfectly. OSFI is chasing paperwork while I\'m actually helping people.',
        },
        {
          id: 's2a-d2',
          speaker: 'Nicolás',
          portrait: 'nicolas-neutral',
          side: 'right',
          text: 'I\'m reviewing the coaching logs now. Alex — you signed all three of them. You acknowledged the requirement each time.',
        },
        {
          id: 's2a-d3',
          speaker: 'Alex M.',
          portrait: 'alex-confident',
          side: 'left',
          text: 'I signed them to close the conversation. That doesn\'t mean I agreed the procedure made sense. The TL needed to check a box. I let him. It doesn\'t change what actually happened on those calls.',
        },
        {
          id: 's2a-d4',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'The hearing is in 40 minutes. I need to decide how to frame our opening position to the OSFI panel.',
          choices: [
            {
              id: 's2a-c1',
              label: 'Open by citing Alex\'s NPS scores and production ranking. Demonstrate the outcomes speak for themselves.',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'OSFI panels do not assess substantive outcomes — they assess procedural compliance. Opening with NPS scores signals that you misunderstand the hearing\'s scope.',
              nextSceneId: 's3a-hearing-aggressive',
            },
            {
              id: 's2a-c2',
              label: 'Open by acknowledging the procedural gaps but argue the coaching process itself was disproportionate and poorly communicated.',
              isCorrect: false,
              wrongPenalty: 10,
              feedback: 'Attacking the coaching process when Alex signed all three logs is a credibility risk. The panel will note the contradiction immediately.',
              nextSceneId: 's3a-hearing-aggressive',
            },
            {
              id: 's2a-c3',
              label: 'Pivot now — tell Alex the aggressive strategy is untenable. Reframe around acknowledgment and remediation before you enter the room.',
              isCorrect: true,
              feedback: 'You caught the problem before the hearing began. Changing course takes credibility — but it\'s far better than walking in with a losing argument.',
              nextSceneId: 's3a-hearing-aggressive',
            },
          ],
        },
      ],
    },

    's3a-hearing-aggressive': {
      id: 's3a-hearing-aggressive',
      legalAdvisorNote: 'The OSFI panel consists of three hearing officers. They have read the complete file. They will ask about the coaching log signatures. How you handle that moment will determine the outcome.',
      dialogues: [
        {
          id: 's3a-d1',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'The hearing room. Three OSFI officers behind a long table. A court reporter to the left. The file is open in front of the lead officer.',
        },
        {
          id: 's3a-d2',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'Counsel, we\'ve reviewed the file. Three documented incidents over 28 days. Your client signed each coaching log. The pattern is clear. What is your position?',
        },
        {
          id: 's3a-d3',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'I need to respond to the panel\'s direct question. My response here will define the tone of the entire hearing.',
          choices: [
            {
              id: 's3a-c1',
              label: '"Mr. M.\'s outcomes were exemplary. The procedural findings are disproportionate to an agent with a perfect client record." ',
              isCorrect: false,
              wrongPenalty: 20,
              feedback: 'The panel asked about documented procedural non-compliance. You responded with outcomes. The lead officer will note the deflection — and so will the record.',
              nextSceneId: 's4a-escalation',
            },
            {
              id: 's3a-c2',
              label: '"Mr. M. acknowledges the procedural gaps documented in the file. He is prepared to accept the panel\'s findings and demonstrate remediation."',
              isCorrect: true,
              feedback: 'A clean acknowledgment after a rocky preparation. You recovered. The panel will note the cooperation — it will factor into the remedy.',
              nextSceneId: 's4a-acknowledgment-test',
            },
            {
              id: 's3a-c3',
              label: '"We would like to challenge the admissibility of the coaching logs on the basis that the signing context was coercive."',
              isCorrect: false,
              wrongPenalty: 25,
              feedback: 'Alex signed the logs in formal documented sessions with a compliance TL. Arguing coercion here is not credible — and it will damage your standing with the panel for the rest of the hearing.',
              nextSceneId: 's4a-escalation',
            },
          ],
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // BRANCH B — Balanced listening (s1-c2)
    // ══════════════════════════════════════════════════════════════════════════
    's2b-balanced-listen': {
      id: 's2b-balanced-listen',
      legalAdvisorNote: 'You listened to Alex\'s account first. Now you need to compare it against the documentary record. Alex\'s version may be sincere — but the coaching logs are signed and timestamped. Your defense will need to reconcile both.',
      dialogues: [
        {
          id: 's2b-d1',
          speaker: 'Alex M.',
          portrait: 'alex-neutral',
          side: 'left',
          text: 'The first call — January 12 — I\'d spoken to that client dozens of times. Margaret. She\'s 67, she\'s been with the bank for 22 years. I knew her risk profile by heart. The verification felt absurd.',
        },
        {
          id: 's2b-d2',
          speaker: 'Alex M.',
          portrait: 'alex-neutral',
          side: 'left',
          text: 'The second one, same thing. The third — RESP recommendation for a young couple I\'d onboarded myself three months earlier. I had built their entire financial plan. I didn\'t need to verify who they were.',
        },
        {
          id: 's2b-d3',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'I\'ve heard Alex\'s account. Now I open the coaching logs. All three are signed. Alex acknowledged the requirement — in writing — after each incident.',
        },
        {
          id: 's2b-d4',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'Alex, I need to ask you something directly. After Coaching Session 1, you wrote: "I will complete the verification checklist on all calls going forward." Then there was a second incident. Then a third.',
        },
        {
          id: 's2b-d5',
          speaker: 'Alex M.',
          portrait: 'alex-neutral',
          side: 'left',
          text: 'I know. I meant it each time. But then you\'re on a call and the client is in front of you and you know the answer — it just doesn\'t happen.',
        },
        {
          id: 's2b-d6',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'The hearing begins in 30 minutes. Based on what I\'ve heard and read, I need to decide the core of our defense.',
          choices: [
            {
              id: 's2b-c1',
              label: 'Frame the defense around Alex\'s good faith — the omissions were contextual judgment calls, not deliberate non-compliance.',
              isCorrect: false,
              wrongPenalty: 10,
              feedback: 'Alex had three coaching sessions on the same issue. "Contextual judgment" after three documented acknowledgments will read as continued non-compliance to the panel.',
              nextSceneId: 's3b-hearing-listen',
            },
            {
              id: 's2b-c2',
              label: 'Build the defense around the procedural record: acknowledge the incidents, present the performance data as context, and focus on a specific remediation plan.',
              isCorrect: true,
              feedback: 'You\'ve balanced Alex\'s account against the documentary record and landed on a credible, evidence-based position. This is your strongest path into the hearing.',
              nextSceneId: 's3b-hearing-listen',
            },
            {
              id: 's2b-c3',
              label: 'Tell Alex that his account — while honest — is not a defense. The hearing outcome will likely be adverse and we should prepare him for that.',
              isCorrect: true,
              feedback: 'Honest and accurate. Managing Alex\'s expectations before the hearing is part of your job. It will also reduce the risk of Alex contradicting your position in the room.',
              nextSceneId: 's3b-hearing-listen',
            },
          ],
        },
      ],
    },

    's3b-hearing-listen': {
      id: 's3b-hearing-listen',
      legalAdvisorNote: 'You\'ve prepared a balanced defense. The panel will test whether Alex\'s acknowledgment is genuine — or whether he still believes the procedure was unnecessary.',
      dialogues: [
        {
          id: 's3b-d1',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'The hearing room. Lead Officer Chen opens directly with the central question.',
        },
        {
          id: 's3b-d2',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'Mr. M., after your first coaching session you acknowledged the requirement and committed to compliance. Two weeks later the same pattern occurred. Can you explain why?',
        },
        {
          id: 's3b-d3',
          speaker: 'Alex M.',
          portrait: 'alex-neutral',
          side: 'left',
          text: 'I understood the rule. In the moment — with clients I knew well — I made a judgment that the step wasn\'t necessary. That was wrong. I understand that now.',
        },
        {
          id: 's3b-d4',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'Counsel, what remediation does your client propose?',
        },
        {
          id: 's3b-d5',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'This is the moment the panel will form its view. My response determines whether the outcome is a formal finding with remediation, or an escalated sanction.',
          choices: [
            {
              id: 's3b-c1',
              label: '"Mr. M. proposes mandatory re-certification on FINTRAC 9.3, supervised monitoring for 90 days, and a written compliance commitment filed with this hearing."',
              isCorrect: true,
              feedback: 'A specific, structured remediation plan. The panel has something concrete to accept. This is the response that leads to a remediation outcome rather than a penalty.',
              nextSceneId: 's4b-plan-scrutinized',
            },
            {
              id: 's3b-c2',
              label: '"Mr. M.\'s performance record demonstrates his commitment to clients. We believe that record provides sufficient context for a finding of no further action."',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'The panel already noted three documented incidents. Arguing for no further action without a remediation plan will read as minimization — and likely result in a more formal sanction.',
              nextSceneId: 's4b-minimization-challenged',
            },
            {
              id: 's3b-c3',
              label: '"We propose a 30-day supervised monitoring period — Mr. M.\'s record speaks to his ability to meet that standard quickly."',
              isCorrect: true,
              feedback: 'A reasonable and proportionate proposal. The panel may negotiate the terms, but you\'ve demonstrated good faith. A workable outcome is likely.',
              nextSceneId: 's4b-plan-scrutinized',
            },
          ],
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // BRANCH C — Evidence review first (s1-c3)
    // ══════════════════════════════════════════════════════════════════════════
    's2c-evidence-review': {
      id: 's2c-evidence-review',
      legalAdvisorNote: 'You made the right call. Reviewing the evidence before forming a strategy is the foundation of competent defense counsel. The file tells a clear story — three documented incidents, three signed acknowledgments, a pattern that triggered mandatory OSFI reporting.',
      dialogues: [
        {
          id: 's2c-d1',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'You read the file carefully. The coaching logs are signed. The call monitoring report timestamps match the coaching session dates. Alex\'s acknowledgment language is explicit and consistent across all three sessions.',
        },
        {
          id: 's2c-d2',
          speaker: 'Nicolás',
          portrait: 'nicolas-neutral',
          side: 'right',
          text: 'Alex, I\'ve read the complete file. I need to be straight with you about what we\'re working with.',
        },
        {
          id: 's2c-d3',
          speaker: 'Nicolás',
          portrait: 'nicolas-neutral',
          side: 'right',
          text: 'The evidence is well-documented. Three incidents over 28 days. You signed each coaching log — in your own words: "I will complete the verification checklist on all calls going forward." Twice.',
        },
        {
          id: 's2c-d4',
          speaker: 'Alex M.',
          portrait: 'alex-neutral',
          side: 'left',
          text: 'I know what I signed. But I still don\'t think the procedure was designed for situations like mine. I had context those rules didn\'t anticipate.',
        },
        {
          id: 's2c-d5',
          speaker: 'Nicolás',
          portrait: 'nicolas-neutral',
          side: 'right',
          text: 'FINTRAC 9.3 explicitly states: "regardless of the agent\'s prior knowledge of or relationship with the client." That language was written for exactly the situation you\'re describing.',
        },
        {
          id: 's2c-d6',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'Based on the complete file, I need to decide the most effective path into this hearing.',
          choices: [
            {
              id: 's2c-c1',
              label: 'Present a full acknowledgment position with a structured remediation proposal — the documentary record leaves no room for challenge.',
              isCorrect: true,
              feedback: 'You\'ve read the file, you understand the law, and you\'ve chosen the only viable path. This is precise, prepared, and professional.',
              nextSceneId: 's3c-hearing-evidence',
            },
            {
              id: 's2c-c2',
              label: 'Argue that FINTRAC 9.3\'s "regardless of relationship" language was designed for anti-money-laundering contexts, not retail investment recommendations.',
              isCorrect: false,
              wrongPenalty: 10,
              feedback: 'The regulation text is unambiguous and covers all transactions. The OSFI panel will know the legislative history. This argument will not hold.',
              nextSceneId: 's3c-hearing-evidence',
            },
            {
              id: 's2c-c3',
              label: 'Request a short adjournment — you\'ve just reviewed the file and need time to confer further with Alex on remediation options.',
              isCorrect: true,
              feedback: 'A reasonable and professional request. It signals that you are taking the matter seriously and preparing a substantive response rather than a reactive one.',
              nextSceneId: 's3c-hearing-evidence',
            },
          ],
        },
      ],
    },

    's3c-hearing-evidence': {
      id: 's3c-hearing-evidence',
      legalAdvisorNote: 'You entered this hearing with the strongest possible preparation. The panel will test the specificity and credibility of your remediation proposal.',
      dialogues: [
        {
          id: 's3c-d1',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'The hearing room. You\'ve reviewed the complete file. Alex is seated beside you. Lead Officer Chen opens the hearing.',
        },
        {
          id: 's3c-d2',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'We\'ve reviewed the file. Three incidents, three coaching sessions, a mandatory reporting trigger. Counsel, is your client prepared to address the panel\'s findings?',
        },
        {
          id: 's3c-d3',
          speaker: 'Nicolás',
          portrait: 'nicolas-neutral',
          side: 'right',
          text: '"Yes, Officer Chen. Mr. M. acknowledges each of the three documented incidents. The coaching logs are accurate. He accepts the regulatory findings without contest."',
        },
        {
          id: 's3c-d4',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'We appreciate that. The question before us is appropriate remedy. What does your client propose?',
        },
        {
          id: 's3c-d5',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'I\'ve read the file. I\'ve identified three specific remediation measures that are proportionate to the findings and credible to this panel.',
          choices: [
            {
              id: 's3c-c1',
              label: '"We propose: (1) FINTRAC 9.3 re-certification, (2) 90-day supervised call monitoring with weekly compliance review, and (3) a written compliance plan filed with OSFI within 14 days."',
              isCorrect: true,
              feedback: 'Three specific, measurable, time-bound remediation steps. This is exactly what an OSFI panel needs to close a file. The outcome will be a formal remediation order — not a penalty.',
              nextSceneId: 's4c-plan-accepted',
            },
            {
              id: 's3c-c2',
              label: '"We propose a 30-day monitoring period and re-certification. Mr. M.\'s five-month record demonstrates he will meet the standard."',
              isCorrect: true,
              feedback: 'Solid and proportionate. The panel may extend the monitoring period, but the proposal demonstrates good faith and specificity.',
              nextSceneId: 's4c-plan-accepted',
            },
            {
              id: 's3c-c3',
              label: '"Given Mr. M.\'s exemplary performance record, we ask the panel to consider a finding with no formal remediation requirement."',
              isCorrect: false,
              wrongPenalty: 20,
              feedback: 'You\'ve read the file — you know this is not appropriate. Three documented incidents with a mandatory reporting trigger cannot close without a remediation order. This request will be denied and may affect the panel\'s view of your client.',
              nextSceneId: 's4c-recovery-attempt',
            },
          ],
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // BRANCH D — Honest counsel upfront (s1-c4)
    // ══════════════════════════════════════════════════════════════════════════
    's2d-honest-counsel': {
      id: 's2d-honest-counsel',
      legalAdvisorNote: 'You led with honesty before reading the file. That instinct was right. Now you have to read the documentary record and decide whether your frank assessment holds — and what Alex is prepared to do with it.',
      dialogues: [
        {
          id: 's2d-d1',
          speaker: 'Alex M.',
          portrait: 'alex-neutral',
          side: 'left',
          text: 'You haven\'t even seen the file and you\'re already telling me it\'s bad?',
        },
        {
          id: 's2d-d2',
          speaker: 'Nicolás',
          portrait: 'nicolas-neutral',
          side: 'right',
          text: 'I\'ve seen the summary. Three documented incidents. Three signed coaching logs. A mandatory OSFI reporting trigger. That\'s the structure of the case against you — and I need you to understand it clearly before we walk in.',
        },
        {
          id: 's2d-d3',
          speaker: 'Nicolás',
          portrait: 'nicolas-neutral',
          side: 'right',
          text: 'I\'m reading the coaching logs now. Your signature is on all three. Your exact words in Coaching 1: "I will complete the verification checklist on all calls going forward." Then it happened again.',
        },
        {
          id: 's2d-d4',
          speaker: 'Alex M.',
          portrait: 'alex-neutral',
          side: 'left',
          text: 'I know. I\'m not proud of that. But I genuinely didn\'t believe the step was necessary in those specific situations. I still don\'t think it was — but I understand it\'s the rule.',
        },
        {
          id: 's2d-d5',
          speaker: 'Nicolás',
          portrait: 'nicolas-neutral',
          side: 'right',
          text: '"I understand it\'s the rule." Alex — that\'s the most important thing you\'ve said. That\'s what we build from.',
        },
        {
          id: 's2d-d6',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'We have 25 minutes. I need to shape our position and prepare Alex for what the panel will ask.',
          choices: [
            {
              id: 's2d-c1',
              label: 'Prepare Alex to speak for himself — walk him through what the panel will ask and what a credible, accountable answer looks like.',
              isCorrect: true,
              feedback: 'Preparing your client to speak authentically is the strongest move when the documentary record is clear. The panel will form its view of Alex directly.',
              nextSceneId: 's3d-hearing-honest',
            },
            {
              id: 's2d-c2',
              label: 'Instruct Alex not to speak during the hearing — let you handle all responses to minimize the risk of an inconsistent statement.',
              isCorrect: false,
              wrongPenalty: 10,
              feedback: 'OSFI hearing panels typically require the respondent to address questions directly. Preventing Alex from speaking will be noted — and may raise questions about what he\'s avoiding.',
              nextSceneId: 's3d-hearing-honest',
            },
            {
              id: 's2d-c3',
              label: 'Present a written remediation plan to the panel before the hearing formally opens — demonstrate proactive compliance intent.',
              isCorrect: true,
              feedback: 'Submitting a written remediation plan before the hearing signals genuine accountability. The panel will likely receive it positively as evidence of good faith.',
              nextSceneId: 's3d-hearing-honest',
            },
          ],
        },
      ],
    },

    's3d-hearing-honest': {
      id: 's3d-hearing-honest',
      legalAdvisorNote: 'You prepared Alex to face the panel directly. The panel will test whether his acknowledgment is genuine — and whether your remediation proposal is specific enough to close the file.',
      dialogues: [
        {
          id: 's3d-d1',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'The hearing room. Alex is composed. You\'ve prepared him carefully. Lead Officer Chen looks up from the file.',
        },
        {
          id: 's3d-d2',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'Mr. M., I\'d like to ask you directly. You signed three coaching logs acknowledging the same procedural requirement. Why did the pattern continue?',
        },
        {
          id: 's3d-d3',
          speaker: 'Alex M.',
          portrait: 'alex-neutral',
          side: 'left',
          text: 'In the moment on each of those calls, I made a judgment that I knew the client well enough that the verification step wasn\'t necessary. I was wrong to substitute my judgment for the procedure. I understand the rule exists precisely to prevent that.',
        },
        {
          id: 's3d-d4',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'Counsel. Proposed remedy?',
        },
        {
          id: 's3d-d5',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'Alex answered the panel\'s question exactly as prepared. Now I need to land the remediation proposal.',
          choices: [
            {
              id: 's3d-c1',
              label: '"FINTRAC 9.3 re-certification within 10 business days. 60-day supervised monitoring. Written compliance report to OSFI at 30 and 60 days."',
              isCorrect: true,
              feedback: 'Specific, time-bound, and directly responsive to the panel\'s concern. This is a strong close after strong preparation. The panel has everything it needs to issue a remediation order.',
              nextSceneId: 's4d-proposal-probe',
            },
            {
              id: 's3d-c2',
              label: '"We propose re-certification and an open-ended monitoring arrangement to be defined by the bank\'s compliance team."',
              isCorrect: false,
              wrongPenalty: 10,
              feedback: 'The panel needs a concrete, measurable proposal — not an open-ended one. "To be defined" signals uncertainty and shifts the burden back to OSFI to design the remedy.',
              nextSceneId: 's4d-vagueness-challenge',
            },
            {
              id: 's3d-c3',
              label: '"Given the candor Mr. M. has shown in this hearing and the strength of his performance record, we request a finding of no formal sanction."',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'A strong hearing performance doesn\'t erase three documented incidents and a mandatory reporting trigger. This request is unlikely to succeed and may undermine the credibility you built.',
              nextSceneId: 's4d-vagueness-challenge',
            },
          ],
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // BRANCH E — Counsel refuses the case (s1-c5)
    // ══════════════════════════════════════════════════════════════════════════
    's2e-refuse-case': {
      id: 's2e-refuse-case',
      legalAdvisorNote: 'You declined to represent Alex based on a summary — before reading a single document. There are situations where declining a case is the right call. This was not one of them. Alex will face the OSFI hearing unrepresented.',
      dialogues: [
        {
          id: 's2e-d1',
          speaker: 'Alex M.',
          portrait: 'alex-neutral',
          side: 'left',
          text: 'You\'re walking away? The hearing is in 90 minutes.',
        },
        {
          id: 's2e-d2',
          speaker: 'Nicolás',
          portrait: 'nicolas-neutral',
          side: 'right',
          text: 'I\'m not in a position to build a credible defense given what I\'ve seen. I can\'t walk into a regulatory hearing without a strategy that holds.',
        },
        {
          id: 's2e-d3',
          speaker: 'Alex M.',
          portrait: 'alex-neutral',
          side: 'left',
          text: 'You haven\'t read the file. You\'ve seen a summary. You\'re telling me my case is unwinnable based on four sentences.',
        },
        {
          id: 's2e-d4',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'Alex M. enters the OSFI hearing unrepresented. The panel conducts the hearing per standard protocol. Without counsel to frame a remediation proposal, the panel has no basis for a structured remedy and issues a formal adverse finding with a monetary penalty.',
        },
        {
          id: 's2e-d5',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'I review the hearing transcript afterward. The case was defensible — not easy, but defensible. Alex acknowledged the incidents. A structured remediation proposal would have led to a very different outcome.',
          choices: [
            {
              id: 's2e-c1',
              label: 'Reflect: the file summary did not justify declining the case without a full review.',
              isCorrect: true,
              feedback: 'Correct. A summary is not a case. Declining representation before reading the documentary record was premature. Alex deserved counsel — and a hearing.',
              nextSceneId: 's3e-alex-desperate',
            },
          ],
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // BRANCH A — Tension scenes (5 new)
    // ══════════════════════════════════════════════════════════════════════════
    's4a-escalation': {
      id: 's4a-escalation',
      legalAdvisorNote: 'Officer Park is the compliance specialist on this panel. His questions tend to be precise and technical. Pushing back on the scope of the panel\'s mandate will be received very badly.',
      dialogues: [
        {
          id: 's4a-esc-d1',
          speaker: 'Officer Park',
          portrait: 'compliance-officer-neutral',
          side: 'left',
          text: 'Counsel — before we continue. You\'ve framed your client\'s case around outcomes. I want to be direct: this panel\'s mandate is procedural compliance under FINTRAC Section 9.3. Outcome quality is not within our scope. Do you understand that scope?',
        },
        {
          id: 's4a-esc-d2',
          speaker: 'Alex M.',
          portrait: 'alex-scared',
          side: 'left',
          text: '[to Nicolás, low] Tell him. Tell him about the NPS scores. He doesn\'t know what the clients said about those calls.',
        },
        {
          id: 's4a-esc-d3',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'Counsel. We\'re waiting for your response.',
        },
        {
          id: 's4a-esc-d4',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'Officer Park has cut to the core of the problem. I misread the hearing\'s scope. I have seconds to decide whether to finally acknowledge — or keep pushing.',
          choices: [
            {
              id: 's4a-esc-c1',
              label: '"Officer Park, I understand the scope. I withdraw the outcomes-based framing. Mr. M. acknowledges the procedural findings as documented."',
              isCorrect: true,
              feedback: 'A necessary pivot — late, but you made it. The panel notes the course correction. The credibility damage from the opening is real, but you\'ve stopped the slide.',
              nextSceneId: 's4a-alex-whisper',
            },
            {
              id: 's4a-esc-c2',
              label: '"Officer Park, while your mandate is procedural, context is relevant to proportionality. Outcome data speaks to that."',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'You\'ve challenged the scope of the panel\'s mandate. Officer Park will note the objection — and it will not be received well. The panel\'s authority over its own scope is absolute in this forum.',
              nextSceneId: 's4a-alex-whisper',
            },
          ],
        },
      ],
    },

    's4a-acknowledgment-test': {
      id: 's4a-acknowledgment-test',
      legalAdvisorNote: 'When a pivot happens mid-hearing, the panel will test whether it\'s genuine. Administrative panels are experienced at reading tactical versus substantive changes in position. Honesty about your own misstep is more credible than blaming the process.',
      dialogues: [
        {
          id: 's4a-at-d1',
          speaker: 'Officer Park',
          portrait: 'compliance-officer-neutral',
          side: 'left',
          text: 'Counsel, I want to note something for the record. Your initial position characterized the procedural findings as disproportionate. You\'ve now shifted to acknowledgment. Which reflects your client\'s actual position going into this hearing?',
        },
        {
          id: 's4a-at-d2',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'That\'s a fair question. Take your time.',
        },
        {
          id: 's4a-at-d3',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'The panel is testing whether the pivot is genuine. I need to answer honestly — in a way that doesn\'t make the acknowledgment look purely tactical.',
          choices: [
            {
              id: 's4a-at-c1',
              label: '"Officer Park, I\'ll be candid. My initial framing was poorly calibrated to this panel\'s mandate. Mr. M.\'s position has always been acknowledgment. I failed to present it that way at the outset."',
              isCorrect: true,
              feedback: 'An honest answer that takes personal responsibility rather than blaming the process. The panel will credit this. It\'s uncomfortable — but it\'s the right call.',
              nextSceneId: 's5a-document-shown',
            },
            {
              id: 's4a-at-c2',
              label: '"Officer Park, Mr. M.\'s position has evolved as the hearing clarified the panel\'s scope. This is now our genuine position."',
              isCorrect: false,
              wrongPenalty: 10,
              feedback: '"Evolved as the hearing clarified scope" reads as a tactical excuse. The panel knows you had the full file before you walked in. This answer will reduce your credibility further.',
              nextSceneId: 's5a-document-shown',
            },
          ],
        },
      ],
    },

    's4a-alex-whisper': {
      id: 's4a-alex-whisper',
      nextSceneId: 's5a-document-shown',
      legalAdvisorNote: 'Clients in high-stakes regulatory hearings sometimes attempt to help in ways that can cause serious harm. Managing your client is part of managing the room.',
      dialogues: [
        {
          id: 's4a-aw-d1',
          speaker: 'Alex M.',
          portrait: 'alex-scared',
          side: 'left',
          text: '[barely audible] I have something. Margaret — the client from January 12. She sent a letter to the bank last month saying the call was perfect. She has no complaint. I never told anyone about it.',
        },
        {
          id: 's4a-aw-d2',
          speaker: 'Nicolás',
          portrait: 'nicolas-shocked',
          side: 'right',
          text: 'A client satisfaction letter — produced now, undisclosed before the hearing. Irrelevant to procedural compliance. But Alex thinks it\'s his lifeline.',
        },
        {
          id: 's4a-aw-d3',
          speaker: 'Nicolás',
          portrait: 'nicolas-neutral',
          side: 'right',
          text: '[quiet, firm] Alex — that letter doesn\'t change the procedural analysis. Do not mention it. If you produce an undisclosed document now, the panel will question why it wasn\'t disclosed earlier. It will make things worse.',
        },
        {
          id: 's4a-aw-d4',
          speaker: 'Alex M.',
          portrait: 'alex-scared',
          side: 'left',
          text: 'But she says I was right. She says the call was perfect.',
        },
        {
          id: 's4a-aw-d5',
          speaker: 'Nicolás',
          portrait: 'nicolas-neutral',
          side: 'right',
          text: 'A satisfied client is not evidence that a regulatory procedure was followed. Stay still.',
        },
      ],
    },

    's5a-document-shown': {
      id: 's5a-document-shown',
      legalAdvisorNote: 'Call monitoring transcripts are among the most precise evidentiary tools in a compliance hearing. Every second is timestamped. When the panel produces one, minimizing it is the worst possible response.',
      dialogues: [
        {
          id: 's5a-ds-d1',
          speaker: 'Officer Park',
          portrait: 'compliance-officer-neutral',
          side: 'left',
          text: 'Counsel, I\'d like to draw your attention to Call TOR-2026-0112-AM. The QA transcript shows the product recommendation was completed at 09:14:22. The call ends at 09:17:03. There is no FINTRAC verification timestamp anywhere in that two-minute-forty-one-second recording.',
        },
        {
          id: 's5a-ds-d2',
          speaker: 'Officer Park',
          portrait: 'compliance-officer-neutral',
          side: 'left',
          text: 'Bank procedure COMP-04 requires a minimum of 45 seconds for verification. There is no window in this recording where it could have occurred. It did not happen.',
        },
        {
          id: 's5a-ds-d3',
          speaker: 'Alex M.',
          portrait: 'alex-defeated',
          side: 'left',
          text: '[quietly, to the table] No. I know. It didn\'t happen.',
        },
        {
          id: 's5a-ds-d4',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'The transcript is conclusive. Alex has just confirmed it to the panel directly — without being asked. I need to control what comes next.',
          choices: [
            {
              id: 's5a-ds-c1',
              label: '"Officer Park, the transcript is accurate. Mr. M. has confirmed the procedure was absent. We do not contest the finding. Our focus now is on a structured remediation proposal."',
              isCorrect: true,
              feedback: 'You\'ve pivoted from the transcript to the remedy. Clean, direct, and exactly what the panel needs to hear at this moment.',
              nextSceneId: 's5a-closing-statement',
            },
            {
              id: 's5a-ds-c2',
              label: '"Officer Park, the call was brief because the clients knew each other well. Context is relevant to whether the full 45-second procedure was practically necessary."',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'You\'ve argued against a timestamped transcript with a "context" argument — after multiple failed pivots. The panel has heard this framing and rejected it each time. This compounds the damage significantly.',
              nextSceneId: 's5a-closing-statement',
            },
          ],
        },
      ],
    },

    's5a-closing-statement': {
      id: 's5a-closing-statement',
      legalAdvisorNote: 'In regulatory hearings, the closing statement is the final signal the panel receives before deliberating on remedy. Even a damaged case can close respectably — if you acknowledge clearly and propose something concrete.',
      dialogues: [
        {
          id: 's5a-cs-d1',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'Before we deliberate on remedy — Counsel, do you have a final statement?',
        },
        {
          id: 's5a-cs-d2',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'This is my last moment to shape the outcome. The hearing has not gone well. But I can still determine whether this closes with a monetary penalty or a remediation order.',
          choices: [
            {
              id: 's5a-cs-c1',
              label: '"Mr. M. accepts the panel\'s findings in full. We propose FINTRAC re-certification within 15 business days and 90-day supervised monitoring. We ask the panel to consider a remediation order in place of a monetary penalty."',
              isCorrect: true,
              feedback: 'Despite a difficult hearing, a specific and proportionate remediation proposal at the close can still move the panel toward a remediation order. It won\'t fully repair the earlier damage — but it\'s the best ending available from this start.',
              nextSceneId: 'verdict-a-partial',
            },
            {
              id: 's5a-cs-c2',
              label: '"The hearing record speaks for itself. We rest on the arguments made."',
              isCorrect: false,
              wrongPenalty: 10,
              feedback: 'Resting on the arguments made means resting on a deflection strategy that failed. The panel has no remediation proposal to accept. A monetary penalty is now the only available outcome.',
              nextSceneId: 'verdict-a-loss',
            },
          ],
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // BRANCH B — Tension scenes (5 new)
    // ══════════════════════════════════════════════════════════════════════════
    's4b-plan-scrutinized': {
      id: 's4b-plan-scrutinized',
      legalAdvisorNote: 'Regulatory panels test the specificity of remediation proposals. A vague proposal — "monitoring" without defined parameters — will be questioned. Show that you understand what the monitoring actually entails.',
      dialogues: [
        {
          id: 's4b-ps-d1',
          speaker: 'Officer Park',
          portrait: 'compliance-officer-neutral',
          side: 'left',
          text: 'Counsel, the remediation proposal includes supervised monitoring. I need to understand the specifics. Who conducts the weekly compliance review? What triggers an escalation report? What metrics define compliance success?',
        },
        {
          id: 's4b-ps-d2',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'These are the details that distinguish a substantive proposal from a procedural gesture.',
        },
        {
          id: 's4b-ps-d3',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'Officer Park is testing whether I actually prepared this proposal — or just described its outline.',
          choices: [
            {
              id: 's4b-ps-c1',
              label: '"The regional compliance manager — Clara Torres — would conduct bi-weekly call audits. 100% FINTRAC completion on monitored calls is the baseline. Any missed step generates an immediate written report."',
              isCorrect: true,
              feedback: 'Precise, operational details. The panel can see that this proposal is real — not a formality. This is the kind of answer that moves a hearing toward resolution.',
              nextSceneId: 's4b-alex-commitment',
            },
            {
              id: 's4b-ps-c2',
              label: '"The monitoring structure would be defined in coordination with the bank\'s compliance team following the hearing\'s outcome."',
              isCorrect: false,
              wrongPenalty: 10,
              feedback: 'You\'ve proposed to define the monitoring after the hearing — which signals that no actual plan exists. Officer Park will note this. You need specifics now, not later.',
              nextSceneId: 's4b-alex-commitment',
            },
          ],
        },
      ],
    },

    's4b-minimization-challenged': {
      id: 's4b-minimization-challenged',
      legalAdvisorNote: 'Asking for "no further action" on a three-incident file with a mandatory reporting trigger is one of the most common — and damaging — errors in compliance defense. The panel will react strongly.',
      dialogues: [
        {
          id: 's4b-mc-d1',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'Counsel, I want to make sure I understand your position. You are asking this panel to issue a finding of no further action — on a file with three documented incidents, three signed coaching logs, and a mandatory OSFI reporting trigger?',
        },
        {
          id: 's4b-mc-d2',
          speaker: 'Officer Park',
          portrait: 'compliance-officer-neutral',
          side: 'left',
          text: 'The mandatory reporting threshold exists because three incidents within 30 days represents a pattern, not an isolated lapse. The pattern is precisely what this panel is here to address.',
        },
        {
          id: 's4b-mc-d3',
          speaker: 'Alex M.',
          portrait: 'alex-scared',
          side: 'left',
          text: '[quietly, to Nicolás] What do we do now?',
        },
        {
          id: 's4b-mc-d4',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'I proposed the wrong outcome. I need to reverse course before the panel loses all confidence in our position.',
          choices: [
            {
              id: 's4b-mc-c1',
              label: '"Officer Chen, I withdraw that request. Mr. M. acknowledges the panel\'s assessment. We propose a structured remediation: FINTRAC re-certification and 90-day supervised monitoring with bi-weekly review."',
              isCorrect: true,
              feedback: 'A direct reversal, stated without hedging. The panel will note the correction — it doesn\'t erase the error, but it stops the damage. You still have a workable path.',
              nextSceneId: 's4b-alex-commitment',
            },
            {
              id: 's4b-mc-c2',
              label: '"Officer Chen, we maintain that Mr. M.\'s exceptional performance record is sufficient context for a finding of no further action. We ask the panel to weigh that record."',
              isCorrect: false,
              wrongPenalty: 20,
              feedback: 'You\'ve maintained a position the panel has just explicitly told you is inconsistent with their mandate. This signals you are ignoring the regulatory framework. The outcome will be adverse.',
              nextSceneId: 'verdict-b-penalty',
            },
          ],
        },
      ],
    },

    's4b-alex-commitment': {
      id: 's4b-alex-commitment',
      nextSceneId: 's5b-webb-moment',
      legalAdvisorNote: 'When a panel speaks directly to a respondent rather than counsel, what the respondent says matters more than any argument. Alex\'s sincerity — or lack of it — will define how the panel remembers this file.',
      dialogues: [
        {
          id: 's4b-ac-d1',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'Mr. M. — not counsel. You. On January 14 you committed to completing the verification step on all calls. On January 29 you were coached again for the same failure. What happened in those two weeks?',
        },
        {
          id: 's4b-ac-d2',
          speaker: 'Alex M.',
          portrait: 'alex-neutral',
          side: 'left',
          text: 'I knew the requirement. When I got on the call with Mrs. Dubois on January 28 — I\'d onboarded her myself six weeks earlier. I knew her situation completely. In the moment I told myself it wasn\'t necessary. I was wrong.',
        },
        {
          id: 's4b-ac-d3',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'And the third incident — February 9?',
        },
        {
          id: 's4b-ac-d4',
          speaker: 'Alex M.',
          portrait: 'alex-neutral',
          side: 'left',
          text: 'Same thing. I made the same judgment. I was wrong each time. The rule isn\'t about whether I know the client. I understand that now.',
        },
        {
          id: 's4b-ac-d5',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'The panel is quiet for a moment. Officer Chen writes something in his notes. The answer was genuine — and the panel could hear it.',
        },
      ],
    },

    's5b-webb-moment': {
      id: 's5b-webb-moment',
      legalAdvisorNote: 'Marcus Webb is a compliance professional. His testimony carries independent weight. How you position his statement — whether as a character witness, a documentation authority, or both — affects its impact with the panel.',
      dialogues: [
        {
          id: 's5b-wm-d1',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'We have the coaching logs from Team Leader Marcus Webb on file. Mr. Webb is present. Officer Park — do you want to put a question to Mr. Webb?',
        },
        {
          id: 's5b-wm-d2',
          speaker: 'Officer Park',
          portrait: 'compliance-officer-neutral',
          side: 'left',
          text: 'Mr. Webb, in your professional judgment — based on your direct observations — do you believe Alex M. now understands the compliance requirement he was coached on?',
        },
        {
          id: 's5b-wm-d3',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: '[Marcus Webb, TL] "In my observation, Alex is a capable advisor who made a judgment error — repeatedly. He was always receptive in our sessions. I believe he understands the requirement. Whether the pattern is behind him, I can\'t say for certain. That\'s what monitoring is for."',
        },
        {
          id: 's5b-wm-d4',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'Webb\'s answer was honest — not a glowing endorsement, but credible. I need to decide whether to build on it or let it stand.',
          choices: [
            {
              id: 's5b-wm-c1',
              label: '"The panel will note Mr. Webb\'s assessment. His recommendation — supervised monitoring — aligns precisely with our proposed remedy. The monitoring structure exists to provide the certainty Mr. Webb appropriately noted."',
              isCorrect: true,
              feedback: 'You\'ve connected Webb\'s measured response directly to the remediation proposal. His acknowledgment that monitoring is the right tool reinforces your position without overstating it.',
              nextSceneId: 's5b-final-terms',
            },
            {
              id: 's5b-wm-c2',
              label: '"Mr. Webb\'s statement confirms that Alex has changed. We ask the panel to treat this as confirmation that further remediation may not be necessary."',
              isCorrect: false,
              wrongPenalty: 10,
              feedback: 'Webb specifically said monitoring is what\'s needed because he can\'t be certain. You\'ve overstated his assessment and asked for the opposite of what he recommended. The panel heard the same words you did.',
              nextSceneId: 's5b-final-terms',
            },
          ],
        },
      ],
    },

    's5b-final-terms': {
      id: 's5b-final-terms',
      legalAdvisorNote: 'Regulatory panels sometimes propose their own remedy terms rather than accepting counsel\'s proposal in full. When this happens, the question is whether to accept, negotiate, or object. Objecting without substantive grounds rarely succeeds.',
      dialogues: [
        {
          id: 's5b-ft-d1',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'The panel has considered the proposed remediation. We are prepared to issue a formal finding with the following remedy: FINTRAC re-certification within 10 business days, 120-day supervised monitoring — not 90 — and bi-monthly compliance reports filed with this office.',
        },
        {
          id: 's5b-ft-d2',
          speaker: 'Officer Park',
          portrait: 'compliance-officer-neutral',
          side: 'left',
          text: 'The monitoring period is extended from your proposal. The pattern in this file warrants additional oversight. Is your client prepared to accept these terms?',
        },
        {
          id: 's5b-ft-d3',
          speaker: 'Alex M.',
          portrait: 'alex-neutral',
          side: 'left',
          text: '[to Nicolás, quietly] 120 days. That\'s a long time. Can we negotiate?',
        },
        {
          id: 's5b-ft-d4',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: '120 days instead of 90. The panel has the authority to set these terms. I need to decide whether to accept or push back.',
          choices: [
            {
              id: 's5b-ft-c1',
              label: '"Yes, Officer Chen. Mr. M. accepts the panel\'s terms. 120-day monitoring, re-certification within 10 days, bi-monthly reports. He commits to full compliance."',
              isCorrect: true,
              feedback: 'The right call. The extended monitoring is proportionate to a three-incident pattern. Accepting without resistance signals genuine cooperation and closes the file cleanly — no monetary penalty.',
              nextSceneId: 'verdict-b-remediation',
            },
            {
              id: 's5b-ft-c2',
              label: '"Officer Chen, we appreciate the panel\'s position. However, 120 days is disproportionate given Mr. M.\'s five-month tenure. We propose 60 days as more appropriate."',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'The panel has just proposed terms after reviewing a three-incident file. Countering on the monitoring duration — without new information — signals you are not taking the pattern seriously. The panel may add a monetary penalty as a result.',
              nextSceneId: 'verdict-b-penalty',
            },
          ],
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // BRANCH C — Tension scenes (5 new)
    // ══════════════════════════════════════════════════════════════════════════
    's4c-plan-accepted': {
      id: 's4c-plan-accepted',
      legalAdvisorNote: 'Strong preparation creates strong entry points. But even the best-prepared hearing can encounter surprises. How you respond to an unexpected document determines whether your preparation holds up under pressure.',
      dialogues: [
        {
          id: 's4c-pa-d1',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'Counsel, we receive the acknowledgment and the remediation proposal. Before we move to terms — Officer Park has a question.',
        },
        {
          id: 's4c-pa-d2',
          speaker: 'Officer Park',
          portrait: 'compliance-officer-neutral',
          side: 'left',
          text: 'Our office received a QA flag on February 21 — a call not included in the monitored set provided to you. The call is currently being reviewed. Do you have knowledge of a fourth call that may fall outside the documented file?',
        },
        {
          id: 's4c-pa-d3',
          speaker: 'Alex M.',
          portrait: 'alex-scared',
          side: 'left',
          text: '[a barely visible reaction — a slight tensing of the jaw, eyes dropping to the table for half a second]',
        },
        {
          id: 's4c-pa-d4',
          speaker: 'Nicolás',
          portrait: 'nicolas-shocked',
          side: 'right',
          text: 'A potential fourth call — not in my file. Alex reacted. I need to decide how to handle this before it spirals.',
          choices: [
            {
              id: 's4c-pa-c1',
              label: '"Officer Park, this is the first we\'ve heard of a February 21 call. We ask that any additional material be shared with counsel before being raised at the hearing. We cannot address evidence that hasn\'t been disclosed to us."',
              isCorrect: true,
              feedback: 'A precise procedural objection. You\'re not denying the call — you\'re correctly asserting your right to review new material before responding to it. The panel will generally respect this.',
              nextSceneId: 's4c-unexpected-evidence',
            },
            {
              id: 's4c-pa-c2',
              label: '"Officer Park, I\'m not aware of a February 21 call. If OSFI has additional material, we ask the hearing to adjourn while we review it."',
              isCorrect: true,
              feedback: 'A reasonable position. Requesting an adjournment when new material surfaces mid-hearing is standard and defensible. The panel may grant it or elect to proceed on the existing file.',
              nextSceneId: 's4c-unexpected-evidence',
            },
          ],
        },
      ],
    },

    's4c-recovery-attempt': {
      id: 's4c-recovery-attempt',
      legalAdvisorNote: 'When the panel denies a request for no formal remediation, the only viable next move is an immediate pivot to a credible remediation proposal. Delay or continued argument will compound the damage.',
      dialogues: [
        {
          id: 's4c-ra-d1',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'Counsel, the request for a finding with no formal remediation requirement is denied. Three documented incidents with a mandatory reporting trigger cannot close without a structured remedy. That is not within our discretion to waive.',
        },
        {
          id: 's4c-ra-d2',
          speaker: 'Alex M.',
          portrait: 'alex-defeated',
          side: 'left',
          text: '[quietly] I thought... I thought the performance record would matter.',
        },
        {
          id: 's4c-ra-d3',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'I misread what the file could support — despite reading every document. I need to pivot immediately, or a penalty is certain.',
          choices: [
            {
              id: 's4c-ra-c1',
              label: '"Officer Chen, I understand. I should not have made that request. Mr. M. proposes FINTRAC re-certification within 10 business days, 90-day supervised monitoring, and a written compliance plan filed within 14 days."',
              isCorrect: true,
              feedback: 'A direct recovery. You had the knowledge — you just misapplied it. The panel will note the pivot. The outcome can still be a remediation order rather than a penalty if the proposal is specific enough.',
              nextSceneId: 's4c-unexpected-evidence',
            },
            {
              id: 's4c-ra-c2',
              label: '"Officer Chen, we understand the panel\'s position. We ask for a brief recess to confer on our alternative proposal."',
              isCorrect: false,
              wrongPenalty: 10,
              feedback: 'Requesting a recess after a proposal denial — when you have the complete file and should already know the alternative — signals unpreparedness. The panel will deny the recess and require you to proceed.',
              nextSceneId: 'verdict-c-penalty',
            },
          ],
        },
      ],
    },

    's4c-unexpected-evidence': {
      id: 's4c-unexpected-evidence',
      nextSceneId: 's5c-alex-reaction',
      legalAdvisorNote: 'When new potential evidence surfaces in a hearing, the disciplined response is: don\'t speculate about its content, assert your procedural rights, and focus on what you can confirm from the existing record.',
      dialogues: [
        {
          id: 's4c-ue-d1',
          speaker: 'Officer Park',
          portrait: 'compliance-officer-neutral',
          side: 'left',
          text: 'To clarify — the February 21 flag is preliminary. We are not presenting it as a fourth documented incident at this hearing. The existing file — three incidents — remains the basis for today\'s proceedings.',
        },
        {
          id: 's4c-ue-d2',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'However, the panel notes that additional monitoring will be important. This is one factor informing the scope of remediation we are prepared to accept.',
        },
        {
          id: 's4c-ue-d3',
          speaker: 'Alex M.',
          portrait: 'alex-scared',
          side: 'left',
          text: '[to Nicolás, barely audible] That call — February 21. I think I know which one it is. I did the same thing.',
        },
        {
          id: 's4c-ue-d4',
          speaker: 'Nicolás',
          portrait: 'nicolas-shocked',
          side: 'right',
          text: 'Alex has just confirmed — quietly, to me — that the February 21 call is another incident. Undisclosed. Not in the file. The panel doesn\'t know he just said that.',
        },
        {
          id: 's4c-ue-d5',
          speaker: 'Nicolás',
          portrait: 'nicolas-neutral',
          side: 'right',
          text: '[to Alex, very quietly] Say nothing. That call is not in today\'s proceedings. Your remediation proposal needs to be strong enough that February 21 doesn\'t change the outcome.',
        },
      ],
    },

    's5c-alex-reaction': {
      id: 's5c-alex-reaction',
      legalAdvisorNote: 'The remediation proposal needs to be robust enough to address not just what\'s documented, but what might surface. A strong, proactive proposal signals that the respondent is serious about compliance — regardless of what comes next.',
      dialogues: [
        {
          id: 's5c-ar-d1',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'Counsel, given the panel\'s note about potential additional monitoring, is your client prepared to accept a remediation framework that could be extended if additional material comes to light?',
        },
        {
          id: 's5c-ar-d2',
          speaker: 'Alex M.',
          portrait: 'alex-neutral',
          side: 'left',
          text: 'Yes. Whatever the panel requires. I\'m not here to minimize what happened.',
        },
        {
          id: 's5c-ar-d3',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'Alex answered cleanly. The panel is watching both of us. I need to close this with a proposal that matches the weight of the moment.',
          choices: [
            {
              id: 's5c-ar-c1',
              label: 'Frame the remediation as open to extension: "The 14-day compliance plan will specifically address any additional calls that surface in OSFI\'s review. Mr. M. commits to that process fully."',
              isCorrect: true,
              feedback: 'Proactively acknowledging the potential for additional findings — and building that into the proposal — is sophisticated compliance advocacy. The panel will credit both the foresight and the commitment.',
              nextSceneId: 's5c-final-close',
            },
            {
              id: 's5c-ar-c2',
              label: 'Keep the proposal contained: "The proposal as stated covers the three documented incidents. Additional findings would be addressed in a separate process."',
              isCorrect: false,
              wrongPenalty: 10,
              feedback: 'Alex just said "whatever the panel requires" — and you\'ve immediately limited the scope of the remedy. The inconsistency between your client\'s statement and yours will be noticed.',
              nextSceneId: 's5c-final-close',
            },
          ],
        },
      ],
    },

    's5c-final-close': {
      id: 's5c-final-close',
      legalAdvisorNote: 'The final moments of a regulatory hearing shape how the panel frames its written decision. A clear, professional, proportionate close — even on a difficult file — produces a better-written order.',
      dialogues: [
        {
          id: 's5c-fc-d1',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'The panel is ready to deliberate. Counsel, is there anything further you wish to place on the record?',
        },
        {
          id: 's5c-fc-d2',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'One final moment. Everything I\'ve built in this hearing either holds together here — or it doesn\'t.',
          choices: [
            {
              id: 's5c-fc-c1',
              label: '"Officer Chen, Mr. M. has acknowledged the findings without qualification. The remediation proposal is specific, time-bound, and designed to address the root pattern identified in the file. We ask the panel to accept it as the basis for closure."',
              isCorrect: true,
              feedback: 'A composed, professional close. You\'ve summarized the case without over-arguing it. The panel has everything it needs. The best outcome available from this file is within reach.',
              nextSceneId: 'verdict-c-best',
            },
            {
              id: 's5c-fc-c2',
              label: '"Officer Chen, we want to emphasize again that Mr. M.\'s client outcomes were exemplary throughout. We ask the panel to weigh that in its decision."',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'After everything in this hearing — the acknowledgment, the evidence review, the unexpected February 21 disclosure — you\'ve returned to the one argument the panel has already declined to accept. It undermines the entire close.',
              nextSceneId: 'verdict-c-penalty',
            },
          ],
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // BRANCH D — Tension scenes (5 new)
    // ══════════════════════════════════════════════════════════════════════════
    's4d-proposal-probe': {
      id: 's4d-proposal-probe',
      legalAdvisorNote: 'Panel members will challenge the specifics of any proposal. The 10-business-day window needs to be justified — not just stated. Regulators want to understand the reasoning behind timelines.',
      dialogues: [
        {
          id: 's4d-pp-d1',
          speaker: 'Officer Park',
          portrait: 'compliance-officer-neutral',
          side: 'left',
          text: 'Counsel, re-certification in 10 business days. Walk me through that timeline. Why 10 days and not 5? Why not immediate?',
        },
        {
          id: 's4d-pp-d2',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'It\'s a reasonable question. The detail matters.',
        },
        {
          id: 's4d-pp-d3',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'I set 10 days because it\'s operationally realistic. I need to explain that precisely.',
          choices: [
            {
              id: 's4d-pp-c1',
              label: '"10 business days allows the FINTRAC re-certification module to be scheduled through the bank\'s compliance training system — which operates on a weekly booking cycle. It\'s the minimum operationally feasible timeline."',
              isCorrect: true,
              feedback: 'A specific operational justification. You\'ve shown that the 10-day window isn\'t arbitrary — it reflects how re-certification actually works. The panel will note that the proposal was thought through.',
              nextSceneId: 's4d-alex-commitment',
            },
            {
              id: 's4d-pp-c2',
              label: '"10 days was selected as a balanced timeline that demonstrates urgency while allowing Mr. M. to prepare adequately for the assessment."',
              isCorrect: false,
              wrongPenalty: 5,
              feedback: 'This is a process answer with no operational substance. Officer Park asked a specific question and received a general answer. The panel will note the vagueness.',
              nextSceneId: 's4d-alex-commitment',
            },
          ],
        },
      ],
    },

    's4d-vagueness-challenge': {
      id: 's4d-vagueness-challenge',
      legalAdvisorNote: 'When a proposal is vague, the panel fills in the gaps with its own assumptions — which are typically more conservative. Your job is to define the terms before the panel does it for you.',
      dialogues: [
        {
          id: 's4d-vc-d1',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'Counsel, "to be defined by the bank\'s compliance team" — that\'s not a proposal we can accept as a remedy. This panel requires a specific, enforceable framework. What are the actual terms?',
        },
        {
          id: 's4d-vc-d2',
          speaker: 'Officer Park',
          portrait: 'compliance-officer-neutral',
          side: 'left',
          text: 'We need dates, thresholds, and reporting structure. If you don\'t have those today, we will set them ourselves — and they will be more conservative than what you would have proposed.',
        },
        {
          id: 's4d-vc-d3',
          speaker: 'Alex M.',
          portrait: 'alex-scared',
          side: 'left',
          text: '[to Nicolás, quietly] Just give them something specific. Anything.',
        },
        {
          id: 's4d-vc-d4',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'The panel has handed me an opening. I need to propose specific terms — right now.',
          choices: [
            {
              id: 's4d-vc-c1',
              label: '"Apologies, Officer Chen. Re-certification within 10 business days via the bank\'s FINTRAC module. 60-day supervised monitoring — all client calls flagged for QA review. Written compliance report at day 30 and day 60, filed with OSFI."',
              isCorrect: true,
              feedback: 'Specific terms, stated directly. You\'ve recovered from a vague proposal with a concrete one. The panel will note both the initial vagueness and the recovery — but the specific proposal now gives them something workable.',
              nextSceneId: 's4d-alex-commitment',
            },
            {
              id: 's4d-vc-c2',
              label: '"We\'ll need a brief recess to finalize the terms, Officer Chen. 20 minutes."',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'Requesting 20 minutes to "finalize terms" — in a hearing you\'ve been preparing for — confirms that no real plan exists. The panel will deny the recess and impose its own framework.',
              nextSceneId: 'verdict-d-partial',
            },
          ],
        },
      ],
    },

    's4d-alex-commitment': {
      id: 's4d-alex-commitment',
      nextSceneId: 's5d-bank-position',
      legalAdvisorNote: 'Administrative hearing panels often value a respondent\'s direct commitment more than any prepared statement from counsel. Alex\'s words here will be part of the written record.',
      dialogues: [
        {
          id: 's4d-ac-d1',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'Mr. M. — I\'d like to ask you something directly. If this panel issues a remediation order, are you committed to the specific timelines proposed by your counsel?',
        },
        {
          id: 's4d-ac-d2',
          speaker: 'Alex M.',
          portrait: 'alex-neutral',
          side: 'left',
          text: 'Yes. I am. I\'m not here to argue that the procedure was wrong. I made a judgment call — three times — that I shouldn\'t have made. I understand that. I\'m committed to the re-certification and the monitoring.',
        },
        {
          id: 's4d-ac-d3',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'Thank you, Mr. M. We\'ll now hear from the institution\'s representative.',
        },
        {
          id: 's4d-ac-d4',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'Officer Chen writes a brief note. In OSFI hearing practice, a respondent\'s direct commitment to remediation — stated on the record, in the respondent\'s own words — carries independent evidentiary weight.',
        },
      ],
    },

    's5d-bank-position': {
      id: 's5d-bank-position',
      legalAdvisorNote: 'When the institution\'s representative speaks, their position either reinforces or undercuts counsel\'s proposal. A bank compliance manager who introduces uncertainty can complicate a clean close.',
      dialogues: [
        {
          id: 's5d-bp-d1',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'Ms. Torres — regional compliance manager. Does the institution support the remediation framework proposed by Mr. M.\'s counsel?',
        },
        {
          id: 's5d-bp-d2',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: '[Clara Torres, Regional Compliance Manager] "The institution supports Mr. M.\'s continued employment. We are committed to the re-certification requirement. On the monitoring structure — we can accommodate the proposed framework, though we note the monitoring period may need to be extended if additional calls emerge from OSFI\'s ongoing review."',
        },
        {
          id: 's5d-bp-d3',
          speaker: 'Officer Park',
          portrait: 'compliance-officer-neutral',
          side: 'left',
          text: 'Counsel, Ms. Torres has introduced the possibility of additional calls under review. Your proposed monitoring period was 60 days. Is that still your position, given the institution\'s own statement?',
        },
        {
          id: 's5d-bp-d4',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'Torres has handed the panel an opening to extend the monitoring. I need to respond before the panel decides for me.',
          choices: [
            {
              id: 's5d-bp-c1',
              label: '"Officer Park, in light of Ms. Torres\'s statement, we revise our proposal to 90-day monitoring — extendable to 120 days if additional calls from OSFI\'s review warrant it. Mr. M. commits to that structure."',
              isCorrect: true,
              feedback: 'You\'ve proactively extended the proposal in response to new information — before the panel imposed an extension. This signals genuine cooperation and gives the panel a workable, flexible framework.',
              nextSceneId: 's5d-final-close',
            },
            {
              id: 's5d-bp-c2',
              label: '"Officer Park, the 60-day monitoring proposal is based on the three documented incidents before this panel today. Additional calls, if any, would be addressed in a separate proceeding."',
              isCorrect: false,
              wrongPenalty: 10,
              feedback: 'The institution just flagged that additional calls may exist — and you\'ve responded by limiting the remedy to what\'s currently on the record. The panel will impose a more conservative monitoring period than you proposed.',
              nextSceneId: 's5d-final-close',
            },
          ],
        },
      ],
    },

    's5d-final-close': {
      id: 's5d-final-close',
      legalAdvisorNote: 'The final moment of a well-prepared hearing is a confirmation — not a new argument. The panel already knows your position. End cleanly and let the record speak.',
      dialogues: [
        {
          id: 's5d-fc-d1',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'The panel will now deliberate. Counsel, anything to add to the record?',
        },
        {
          id: 's5d-fc-d2',
          speaker: 'Alex M.',
          portrait: 'alex-neutral',
          side: 'left',
          text: '[quietly, to Nicolás] How do you think it went?',
        },
        {
          id: 's5d-fc-d3',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'This is my final moment on the record.',
          choices: [
            {
              id: 's5d-fc-c1',
              label: '"The panel has heard from Mr. M. directly. His acknowledgment is on the record in his own words. The remediation proposal is specific and the institution supports it. We ask the panel to accept it as the framework for closure."',
              isCorrect: true,
              feedback: 'A tight, well-constructed close. You\'ve referenced Alex\'s direct testimony, the specificity of the proposal, and the institutional support — all in three sentences. The panel has what it needs.',
              nextSceneId: 'verdict-d-best',
            },
            {
              id: 's5d-fc-c2',
              label: '"Nothing further, Officer Chen. We trust the panel\'s judgment."',
              isCorrect: false,
              wrongPenalty: 5,
              feedback: '"We trust the panel\'s judgment" is passive where a clear, active summary would have reinforced the hearing\'s strongest moments. A minor missed opportunity — but it matters at the margin.',
              nextSceneId: 'verdict-d-partial',
            },
          ],
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // BRANCH E — Tension scenes (5 new)
    // ══════════════════════════════════════════════════════════════════════════
    's3e-alex-desperate': {
      id: 's3e-alex-desperate',
      nextSceneId: 's3e-corridor',
      legalAdvisorNote: 'Once a client understands what\'s at stake, desperation is a natural response. Counsel\'s refusal to engage — even when challenged — has professional and ethical implications that extend beyond this case.',
      dialogues: [
        {
          id: 's3e-ad-d1',
          speaker: 'Alex M.',
          portrait: 'alex-scared',
          side: 'left',
          text: 'Wait. Please. You\'re the third lawyer I\'ve spoken to this week. The others said the same thing from a distance — "too risky," "can\'t win." You haven\'t opened the file. You have seen a summary — four sentences.',
        },
        {
          id: 's3e-ad-d2',
          speaker: 'Nicolás',
          portrait: 'nicolas-neutral',
          side: 'right',
          text: 'Alex, the structure of the case — three signed acknowledgments, a mandatory reporting trigger—',
        },
        {
          id: 's3e-ad-d3',
          speaker: 'Alex M.',
          portrait: 'alex-scared',
          side: 'left',
          text: 'Is in seven documents in that folder. You haven\'t read them. I onboarded those clients myself. I know what\'s in those calls. You don\'t.',
        },
        {
          id: 's3e-ad-d4',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'He\'s right about one thing: I haven\'t read the file. But I\'ve made my decision.',
        },
        {
          id: 's3e-ad-d5',
          speaker: 'Alex M.',
          portrait: 'alex-defeated',
          side: 'left',
          text: 'The hearing is in 80 minutes. I have five months of perfect client scores. And I am going in there alone.',
        },
      ],
    },

    's3e-corridor': {
      id: 's3e-corridor',
      nextSceneId: 's4e-hearing-glimpse',
      dialogues: [
        {
          id: 's3e-co-d1',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'You walk out of the conference room into the building corridor. Through the glass partition you watch Alex gather the documents from the table — the same documents you declined to read.',
        },
        {
          id: 's3e-co-d2',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'He straightens the folder. He doesn\'t know how to organize it. He places the coaching logs on top — which is the worst thing to lead with in front of an OSFI panel.',
        },
        {
          id: 's3e-co-d3',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'I know enough about OSFI hearings to know that a respondent without counsel, leading with the coaching logs, is going to have a very short morning.',
        },
      ],
    },

    's4e-hearing-glimpse': {
      id: 's4e-hearing-glimpse',
      nextSceneId: 's4e-outcome-received',
      dialogues: [
        {
          id: 's4e-hg-d1',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'The hearing takes 38 minutes. You learn this from the clerk\'s timestamp when you request the file three days later.',
        },
        {
          id: 's4e-hg-d2',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: '38 minutes for a three-incident OSFI compliance matter. That is a short hearing. It means there was no structured exchange, no negotiated remediation, no proposal for the panel to deliberate over.',
        },
        {
          id: 's4e-hg-d3',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'Alex spoke for the first 12 minutes. He explained the client relationships. He talked about his NPS scores. He did not propose a remediation plan.',
        },
        {
          id: 's4e-hg-d4',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'Officer Chen asked once, on the record: "Does the respondent propose any specific remedial steps?" Alex said: "I\'m committed to following the procedure." The panel issued its finding 26 minutes later.',
        },
      ],
    },

    's4e-outcome-received': {
      id: 's4e-outcome-received',
      legalAdvisorNote: 'Post-hearing review — even when the outcome can no longer be changed — is an essential part of professional development. Understanding what happened in a hearing you declined is the only way to make a better decision next time.',
      dialogues: [
        {
          id: 's4e-or-d1',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'Three days later. The bank\'s compliance department sends you the OSFI written decision. Formal adverse finding. Monetary penalty: $12,000. Mandatory FINTRAC re-certification within 10 business days. 180-day supervised monitoring.',
        },
        {
          id: 's4e-or-d2',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: '180 days. The standard panel-imposed monitoring period when no defense counsel proposes an alternative. The number is not punitive — it is simply the default when no one offers anything better.',
        },
        {
          id: 's4e-or-d3',
          speaker: 'Nicolás',
          portrait: 'nicolas-shocked',
          side: 'right',
          text: 'I open the complete file for the first time. Seven documents. It takes me 18 minutes to read them.',
        },
        {
          id: 's4e-or-d4',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'I had an hour and a half before that hearing.',
          choices: [
            {
              id: 's4e-or-c1',
              label: 'Read the full file — understand what the defense could have been.',
              isCorrect: true,
              feedback: 'The right instinct — even now. Understanding what a defensible case looks like is the only lesson available from this outcome.',
              nextSceneId: 's4e-file-review',
            },
          ],
        },
      ],
    },

    's4e-file-review': {
      id: 's4e-file-review',
      dialogues: [
        {
          id: 's4e-fr-d1',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'The file is clear. The coaching logs are signed and the incidents are documented — but the acknowledgment language in all three sessions is explicit: Alex knew the requirement. He just didn\'t follow it.',
        },
        {
          id: 's4e-fr-d2',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'The performance record shows 100% NPS and top-15% production. The call monitoring report confirms that all three recommendations were substantively correct — the deficiency was procedural, not substantive.',
        },
        {
          id: 's4e-fr-d3',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'A respondent who acknowledged the incidents, accepted the findings, and presented a structured remediation plan — FINTRAC re-cert, 90-day monitoring, written compliance filing — would almost certainly have received a remediation order. No monetary penalty.',
        },
        {
          id: 's4e-fr-d4',
          speaker: 'Nicolás',
          portrait: 'nicolas-thinking',
          side: 'right',
          text: 'I read a summary and formed a conclusion. The file I didn\'t read had the information I needed to reach a different one.',
          choices: [
            {
              id: 's4e-fr-c1',
              label: 'Acknowledge: declining based on a file summary — without reviewing the full record — was the wrong decision.',
              isCorrect: true,
              feedback: 'The case was defensible. Not easy — but defensible. Reading the file was the only thing that mattered, and it was the one thing you didn\'t do.',
              nextSceneId: 'verdict-e-refused',
            },
          ],
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // VERDICTS — One per branch path
    // ══════════════════════════════════════════════════════════════════════════

    // — Branch A verdicts —
    'verdict-a-loss': {
      id: 'verdict-a-loss',
      isVerdictScene: true,
      verdictData: {
        outcome: 'guilty',
        title: 'Formal Adverse Finding — Monetary Penalty Assessed',
        subtitle: 'Alex M. — OSFI B-8 / FINTRAC compliance hearing — Branch A',
        lessonTitle: 'Procedural Deflection Backfires',
        lessonText: 'OSFI compliance hearings evaluate procedural compliance, not substantive outcomes. A defense that focuses on results rather than the regulatory framework will not succeed. Three signed coaching logs required acknowledgment — not challenge.\n\nThe aggressive strategy failed. The panel noted both the deflection and the absence of a remediation proposal. The outcome was more severe than it needed to be.',
        regulationRef: 'OSFI B-8 Guideline / FINTRAC PCMLTFA, s.9.6',
      },
      dialogues: [
        {
          id: 'vad1',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'The panel finds that counsel\'s position was not responsive to the procedural findings before us. We note that the respondent\'s counsel repeatedly redirected to substantive outcomes in a hearing concerning procedural compliance. A formal adverse finding is entered. Mr. M. is directed to complete mandatory FINTRAC re-certification and is placed on a 120-day supervised monitoring period. A monetary penalty will be assessed.',
        },
        {
          id: 'vad2',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'The aggressive strategy failed. The panel noted both the deflection and the absence of a remediation proposal. The outcome was more severe than it needed to be.',
          verdict: {
            outcome: 'adverse',
            title: 'Formal Adverse Finding — Monetary Penalty Assessed',
            summary: 'The panel issued a formal adverse finding. An aggressive defense strategy — focused on outcomes rather than procedural compliance — failed to address the documentary record. The absence of a remediation proposal resulted in a mandatory penalty and extended supervised monitoring.',
            lesson: 'OSFI compliance hearings evaluate procedural compliance, not substantive outcomes. A defense that focuses on results rather than the regulatory framework will not succeed. Three signed coaching logs required acknowledgment — not challenge.',
            credibilityImpact: -35,
          },
        },
      ],
    },

    'verdict-a-partial': {
      id: 'verdict-a-partial',
      isVerdictScene: true,
      verdictData: {
        outcome: 'guilty-reduced',
        title: 'Remediation Order — No Penalty',
        subtitle: 'Alex M. — OSFI B-8 / FINTRAC compliance hearing — Branch A',
        lessonTitle: 'Mid-Hearing Recovery',
        lessonText: 'It is always better to enter a regulatory hearing with the right strategy. Recovering mid-hearing is possible — but it costs credibility and limits your options. Read the file before forming a defense.\n\nYou recovered mid-hearing. The panel noted the change — but credited the acknowledgment. A workable outcome from a poor start.',
        regulationRef: 'OSFI B-8 Guideline / FINTRAC PCMLTFA, s.9.6',
      },
      dialogues: [
        {
          id: 'vap1',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'The panel notes counsel\'s pivot to an acknowledgment position during the hearing. This is a mitigating factor. We issue a formal finding with a structured remediation requirement: FINTRAC re-certification within 15 business days and 90-day supervised monitoring. No monetary penalty at this stage.',
        },
        {
          id: 'vap2',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'You recovered mid-hearing. The panel noted the change — but credited the acknowledgment. A workable outcome from a poor start.',
          verdict: {
            outcome: 'partial',
            title: 'Remediation Order — No Penalty',
            summary: 'Despite a flawed preparation strategy, a last-minute pivot to acknowledgment produced a workable outcome. The panel issued a remediation order rather than a monetary penalty, crediting the cooperation shown during the hearing.',
            lesson: 'It is always better to enter a regulatory hearing with the right strategy. Recovering mid-hearing is possible — but it costs credibility and limits your options. Read the file before forming a defense.',
            credibilityImpact: -10,
          },
        },
      ],
    },

    // — Branch B verdicts —
    'verdict-b-remediation': {
      id: 'verdict-b-remediation',
      isVerdictScene: true,
      verdictData: {
        outcome: 'acquitted',
        title: 'Remediation Order Accepted — No Penalty',
        subtitle: 'Alex M. — OSFI B-8 / FINTRAC compliance hearing — Branch B',
        lessonTitle: 'Listen, Read, Reconcile',
        lessonText: 'Effective defense counsel listens to the client and reads the record — then builds a strategy that reconciles both. In a regulatory hearing with documented incidents, a well-structured remediation proposal is often more valuable than a challenge.\n\nA solid outcome. You listened to Alex, read the record, identified the gap, and proposed a credible remedy. The panel had what it needed to close the file constructively.',
        regulationRef: 'OSFI B-8 Guideline / FINTRAC PCMLTFA, s.9.6',
      },
      dialogues: [
        {
          id: 'vbr1',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'The panel accepts the proposed remediation framework. We enter a formal finding with the following remedy: FINTRAC re-certification, supervised monitoring per the proposed period, and a written compliance commitment. No monetary penalty. The file will remain open pending completion of remediation milestones.',
        },
        {
          id: 'vbr2',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'A solid outcome. You listened to Alex, read the record, identified the gap, and proposed a credible remedy. The panel had what it needed to close the file constructively.',
          verdict: {
            outcome: 'success',
            title: 'Remediation Order Accepted — No Penalty',
            summary: 'By listening carefully to Alex\'s account and reconciling it against the documentary record, you built a credible, evidence-based defense position. A structured remediation proposal gave the panel a path to closure without a monetary penalty.',
            lesson: 'Effective defense counsel listens to the client and reads the record — then builds a strategy that reconciles both. In a regulatory hearing with documented incidents, a well-structured remediation proposal is often more valuable than a challenge.',
            credibilityImpact: 15,
          },
        },
      ],
    },

    'verdict-b-penalty': {
      id: 'verdict-b-penalty',
      isVerdictScene: true,
      verdictData: {
        outcome: 'guilty',
        title: 'Formal Finding — Monetary Penalty',
        subtitle: 'Alex M. — OSFI B-8 / FINTRAC compliance hearing — Branch B',
        lessonTitle: 'Wrong Outcome, Right Preparation',
        lessonText: 'In a regulatory hearing with documented and signed compliance incidents, the question is not whether a finding will be made — it\'s what the remedy will be. Proposing "no further action" signals minimization and invites a harsher outcome.\n\nYou prepared well but proposed the wrong outcome. The panel needed a remediation plan — not an acquittal.',
        regulationRef: 'OSFI B-8 Guideline / FINTRAC PCMLTFA, s.9.6',
      },
      dialogues: [
        {
          id: 'vbp1',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'The panel cannot issue a finding of no further action on a file with three documented incidents and a mandatory reporting trigger. A formal finding is entered with mandatory re-certification, 90-day monitoring, and a monetary penalty for the pattern of non-compliance.',
        },
        {
          id: 'vbp2',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'You prepared well but proposed the wrong outcome. The panel needed a remediation plan — not an acquittal. The documentary record required something concrete.',
          verdict: {
            outcome: 'adverse',
            title: 'Formal Finding — Monetary Penalty',
            summary: 'Despite balanced preparation, the decision to seek a "no further action" finding on a file with three documented incidents led to a penalty. The panel requires a remediation proposal — not an acquittal — when the record is this clear.',
            lesson: 'In a regulatory hearing with documented and signed compliance incidents, the question is not whether a finding will be made — it\'s what the remedy will be. Proposing "no further action" signals minimization and invites a harsher outcome.',
            credibilityImpact: -15,
          },
        },
      ],
    },

    // — Branch C verdicts —
    'verdict-c-best': {
      id: 'verdict-c-best',
      isVerdictScene: true,
      verdictData: {
        outcome: 'acquitted',
        title: 'Remediation Order — Optimal Outcome',
        subtitle: 'Alex M. — OSFI B-8 / FINTRAC compliance hearing — Branch C',
        lessonTitle: 'Read First, Then Strategize',
        lessonText: 'Reading the file first is not a luxury — it is the foundation of competent representation. When the documentary record is clear, acknowledgment combined with a credible remediation proposal consistently produces the best available outcome.\n\nThe best possible outcome from a difficult file. You read the evidence, understood the law, acknowledged the findings, and proposed a precise remedy.',
        regulationRef: 'OSFI B-8 Guideline / FINTRAC PCMLTFA, s.9.6',
      },
      dialogues: [
        {
          id: 'vcb1',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'The panel accepts the remediation proposal. Formal finding entered. Mr. M. is directed to complete FINTRAC re-certification within the proposed timeframe and to comply with the supervised monitoring schedule. Written compliance plan to be filed with OSFI within 14 days. No monetary penalty. This is the appropriate outcome given the cooperation demonstrated.',
        },
        {
          id: 'vcb2',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'The best possible outcome from a difficult file. You read the evidence, understood the law, acknowledged the findings, and proposed a precise remedy. The panel had no reason to escalate.',
          verdict: {
            outcome: 'success',
            title: 'Remediation Order — Optimal Outcome',
            summary: 'You reviewed the complete documentary record before forming a strategy, acknowledged the findings without contest, and presented a specific, time-bound remediation plan. The panel accepted the proposal in full. No monetary penalty was assessed.',
            lesson: 'Reading the file first is not a luxury — it is the foundation of competent representation. When the documentary record is clear, acknowledgment combined with a credible remediation proposal consistently produces the best available outcome.',
            credibilityImpact: 25,
          },
        },
      ],
    },

    'verdict-c-penalty': {
      id: 'verdict-c-penalty',
      isVerdictScene: true,
      verdictData: {
        outcome: 'guilty',
        title: 'Formal Finding — Penalty Assessed',
        subtitle: 'Alex M. — OSFI B-8 / FINTRAC compliance hearing — Branch C',
        lessonTitle: 'Knowledge Without Strategy',
        lessonText: 'Reading the file is necessary — but it must translate into the right strategy. When the record is unambiguous, a request for "no further action" signals minimization and undermines the credibility that thorough preparation had built.\n\nYou read the file — and then proposed the one outcome the file clearly could not support.',
        regulationRef: 'OSFI B-8 Guideline / FINTRAC PCMLTFA, s.9.6',
      },
      dialogues: [
        {
          id: 'vcp1',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'The request for no formal remediation is denied. Three documented incidents and a mandatory reporting trigger do not support that outcome. A formal finding is entered with mandatory re-certification, 90-day monitoring, and a monetary penalty. The panel notes that counsel reviewed the complete file and should have understood this outcome was unavailable.',
        },
        {
          id: 'vcp2',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'You read the file — and then proposed the one outcome the file clearly could not support. The panel found it inconsistent with the level of preparation shown.',
          verdict: {
            outcome: 'adverse',
            title: 'Formal Finding — Penalty Assessed',
            summary: 'Despite reviewing the complete documentary record, a request for "no formal remediation" on a file with three signed coaching logs and a mandatory OSFI reporting trigger was denied. The penalty assessed was worse than it would have been with a credible remediation proposal.',
            lesson: 'Reading the file is necessary — but it must translate into the right strategy. When the record is unambiguous, a request for "no further action" signals minimization and undermines the credibility that thorough preparation had built.',
            credibilityImpact: -20,
          },
        },
      ],
    },

    // — Branch D verdicts —
    'verdict-d-best': {
      id: 'verdict-d-best',
      isVerdictScene: true,
      verdictData: {
        outcome: 'acquitted',
        title: 'Remediation Order — No Penalty',
        subtitle: 'Alex M. — OSFI B-8 / FINTRAC compliance hearing — Branch D',
        lessonTitle: 'Honest Counsel, Prepared Client',
        lessonText: 'Honesty with your client — even when the news is difficult — enables better preparation and more credible hearing performance. A client who understands his position is more effective than one who walks in believing he has won.\n\nHonest counsel, a prepared client, and a specific remediation proposal. The panel credited all three.',
        regulationRef: 'OSFI B-8 Guideline / FINTRAC PCMLTFA, s.9.6',
      },
      dialogues: [
        {
          id: 'vdb1',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'The panel accepts the proposed remediation framework. Mr. M.\'s direct and candid response to the panel\'s question is noted as a mitigating factor. Formal finding entered. Re-certification, supervised monitoring, and written compliance reports as proposed. No monetary penalty.',
        },
        {
          id: 'vdb2',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'Honest counsel, a prepared client, and a specific remediation proposal. The panel credited all three. Alex faced the room — and the room responded to what it heard.',
          verdict: {
            outcome: 'success',
            title: 'Remediation Order — No Penalty',
            summary: 'Direct and honest counsel from the outset, combined with thorough preparation and a specific remediation proposal, produced the best outcome available. The panel credited Alex\'s candid response and counsel\'s structured proposal.',
            lesson: 'Honesty with your client — even when the news is difficult — enables better preparation and more credible hearing performance. A client who understands his position is more effective than one who walks in believing he has won.',
            credibilityImpact: 20,
          },
        },
      ],
    },

    'verdict-d-partial': {
      id: 'verdict-d-partial',
      isVerdictScene: true,
      verdictData: {
        outcome: 'guilty-reduced',
        title: 'Remediation Order — Suspended Penalty',
        subtitle: 'Alex M. — OSFI B-8 / FINTRAC compliance hearing — Branch D',
        lessonTitle: 'Specificity in Remediation',
        lessonText: 'Specificity in remediation proposals matters. The panel needs concrete, measurable, time-bound steps. Vague or open-ended proposals shift the burden back to OSFI and reduce the likelihood of a clean outcome.\n\nHonest preparation and a credible hearing performance — but the remediation proposal wasn\'t specific enough to close the file cleanly.',
        regulationRef: 'OSFI B-8 Guideline / FINTRAC PCMLTFA, s.9.6',
      },
      dialogues: [
        {
          id: 'vdp1',
          speaker: 'Lead Officer Chen',
          portrait: 'judge-stern',
          side: 'left',
          text: 'The panel notes the candor shown during the hearing. However, the remediation proposal was either insufficiently specific or sought an outcome the file does not support. A formal finding is entered with re-certification and a 90-day supervised monitoring period. A monetary penalty is suspended pending completion of remediation milestones.',
        },
        {
          id: 'vdp2',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'Honest preparation and a credible hearing performance — but the remediation proposal wasn\'t specific enough to close the file cleanly. A workable outcome, but not the best one available.',
          verdict: {
            outcome: 'partial',
            title: 'Remediation Order — Suspended Penalty',
            summary: 'Strong preparation and candid hearing performance were partially offset by a remediation proposal that lacked specificity. The panel issued a remediation order with a suspended penalty rather than a clean closure.',
            lesson: 'Specificity in remediation proposals matters. The panel needs concrete, measurable, time-bound steps. Vague or open-ended proposals shift the burden back to OSFI and reduce the likelihood of a clean outcome.',
            credibilityImpact: 5,
          },
        },
      ],
    },

    // — Branch E verdict —
    'verdict-e-refused': {
      id: 'verdict-e-refused',
      isVerdictScene: true,
      verdictData: {
        outcome: 'guilty',
        title: 'Unrepresented — Formal Adverse Finding and Penalty',
        subtitle: 'Alex M. — OSFI B-8 / FINTRAC compliance hearing — Branch E',
        lessonTitle: 'A File Summary Is Not a Case',
        lessonText: 'A file summary is not a case. Defense counsel\'s obligation is to review the complete record before forming any judgment about the viability of a defense. Declining representation based on incomplete information is a failure of professional judgment — not a defense of it.\n\nThe OSFI hearing proceeded without defense counsel. The case was defensible. A structured remediation proposal, delivered by counsel, would have produced a very different result.',
        regulationRef: 'OSFI B-8 Guideline / FINTRAC PCMLTFA, s.9.6',
      },
      dialogues: [
        {
          id: 've1',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'The OSFI hearing proceeded without defense counsel. The panel issued a formal adverse finding with a monetary penalty. Alex M. had no structured remediation proposal to offer. The file closed with the worst available outcome.',
        },
        {
          id: 've2',
          speaker: 'Narrator',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'You reviewed the hearing transcript afterward. The case was defensible. Three documented incidents — but Alex acknowledged each one. A structured remediation proposal, delivered by counsel, would have produced a very different result.',
          verdict: {
            outcome: 'adverse',
            title: 'Unrepresented — Formal Adverse Finding and Penalty',
            summary: 'Declining to represent Alex based on a file summary — without reading the documentary record — resulted in an unrepresented respondent facing an OSFI panel alone. The worst available outcome was issued. The case was defensible with proper preparation.',
            lesson: 'A file summary is not a case. Defense counsel\'s obligation is to review the complete record before forming any judgment about the viability of a defense. Declining representation based on incomplete information is a failure of professional judgment — not a defense of it.',
            credibilityImpact: -50,
          },
        },
      ],
    },
  },
}
