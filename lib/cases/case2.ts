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

  // ── Evidence — 7 documents + 1 instructional video ─────────────────────────
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
    {
      id: 'ev-video-osfi',
      title: 'Legal Advisor — OSFI Hearing Process',
      description: 'Video guide: OSFI compliance hearing rules and your role as defense counsel.',
      detail: 'The Legal Advisor explains the OSFI compliance hearing process, your obligations as defense counsel, and the procedural options available to Alex M.',
      type: 'document',
      displayType: 'video',
      isKey: true,
      videoMeta: {
        src: 'https://drive.google.com/file/d/1leAZm5X0TLsOeHBjAFl4GKXh7gKMPNZ3/preview',
        title: 'OSFI Compliance Hearing: Rules of the Process',
        description: 'The Legal Advisor explains OSFI hearing procedures, defense counsel obligations, and the options available when facing documented compliance incidents.',
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
              nextSceneId: 'verdict-a-loss',
            },
            {
              id: 's3a-c2',
              label: '"Mr. M. acknowledges the procedural gaps documented in the file. He is prepared to accept the panel\'s findings and demonstrate remediation."',
              isCorrect: true,
              feedback: 'A clean acknowledgment after a rocky preparation. You recovered. The panel will note the cooperation — it will factor into the remedy.',
              nextSceneId: 'verdict-a-partial',
            },
            {
              id: 's3a-c3',
              label: '"We would like to challenge the admissibility of the coaching logs on the basis that the signing context was coercive."',
              isCorrect: false,
              wrongPenalty: 25,
              feedback: 'Alex signed the logs in formal documented sessions with a compliance TL. Arguing coercion here is not credible — and it will damage your standing with the panel for the rest of the hearing.',
              nextSceneId: 'verdict-a-loss',
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
              nextSceneId: 'verdict-b-remediation',
            },
            {
              id: 's3b-c2',
              label: '"Mr. M.\'s performance record demonstrates his commitment to clients. We believe that record provides sufficient context for a finding of no further action."',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'The panel already noted three documented incidents. Arguing for no further action without a remediation plan will read as minimization — and likely result in a more formal sanction.',
              nextSceneId: 'verdict-b-penalty',
            },
            {
              id: 's3b-c3',
              label: '"We propose a 30-day supervised monitoring period — Mr. M.\'s record speaks to his ability to meet that standard quickly."',
              isCorrect: true,
              feedback: 'A reasonable and proportionate proposal. The panel may negotiate the terms, but you\'ve demonstrated good faith. A workable outcome is likely.',
              nextSceneId: 'verdict-b-remediation',
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
              nextSceneId: 'verdict-c-best',
            },
            {
              id: 's3c-c2',
              label: '"We propose a 30-day monitoring period and re-certification. Mr. M.\'s five-month record demonstrates he will meet the standard."',
              isCorrect: true,
              feedback: 'Solid and proportionate. The panel may extend the monitoring period, but the proposal demonstrates good faith and specificity.',
              nextSceneId: 'verdict-c-best',
            },
            {
              id: 's3c-c3',
              label: '"Given Mr. M.\'s exemplary performance record, we ask the panel to consider a finding with no formal remediation requirement."',
              isCorrect: false,
              wrongPenalty: 20,
              feedback: 'You\'ve read the file — you know this is not appropriate. Three documented incidents with a mandatory reporting trigger cannot close without a remediation order. This request will be denied and may affect the panel\'s view of your client.',
              nextSceneId: 'verdict-c-penalty',
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
              nextSceneId: 'verdict-d-best',
            },
            {
              id: 's3d-c2',
              label: '"We propose re-certification and an open-ended monitoring arrangement to be defined by the bank\'s compliance team."',
              isCorrect: false,
              wrongPenalty: 10,
              feedback: 'The panel needs a concrete, measurable proposal — not an open-ended one. "To be defined" signals uncertainty and shifts the burden back to OSFI to design the remedy.',
              nextSceneId: 'verdict-d-partial',
            },
            {
              id: 's3d-c3',
              label: '"Given the candor Mr. M. has shown in this hearing and the strength of his performance record, we request a finding of no formal sanction."',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'A strong hearing performance doesn\'t erase three documented incidents and a mandatory reporting trigger. This request is unlikely to succeed and may undermine the credibility you built.',
              nextSceneId: 'verdict-d-partial',
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
      isVerdict: true,
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
      isVerdict: true,
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
      isVerdict: true,
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
      isVerdict: true,
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
      isVerdict: true,
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
      isVerdict: true,
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
      isVerdict: true,
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
      isVerdict: true,
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
      isVerdict: true,
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
