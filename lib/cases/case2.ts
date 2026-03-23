// ── CASE 2: THE TORONTO FILE ──────────────────────────────────────────────────
// OSFI Compliance Hearing — Toronto, Ontario, Canada
// Nicolas plays: Defense Attorney
// ─────────────────────────────────────────────────────────────────────────────

import type { Case } from '@/lib/types'

export const case2: Case = {
  id: 'case-2',
  gameId: 'compliance-court',
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

  firstSceneId: 's2-berckand',

  scenes: {
    's2-berckand': {
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
