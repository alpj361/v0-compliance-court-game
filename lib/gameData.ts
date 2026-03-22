// ── Compliance Court – All game content ──────────────────────────────────────
// Every scene, dialogue line, evidence card, and lesson lives here.
// Game engine components import from this file only.

export type Portrait =
  | 'judge-neutral'
  | 'judge-angry'
  | 'rodrigo-confident'
  | 'rodrigo-sweating'
  | 'rodrigo-cornered'
  | 'alex-neutral'
  | 'alex-scared'
  | 'alex-relieved'
  | 'prosecutor-neutral'
  | 'prosecutor-objecting'
  | 'nicolas-confident'
  | 'nicolas-thinking'
  | 'nicolas-shocked'
  | 'compliance-officer-neutral'

export type CharacterSide = 'left' | 'right' | 'center'

export interface DialogueLine {
  id: string
  speaker: string
  portrait: Portrait
  side: CharacterSide
  text: string
  // If defined, player must pick a choice here
  choices?: Choice[]
  // Dramatic overlay to show before/after this line
  overlay?: 'OBJECTION' | 'HOLD IT' | 'TAKE THAT'
}

export interface Choice {
  id: string
  label: string
  isCorrect: boolean
  wrongPenalty?: number   // credibility % to deduct (default 15)
  feedback: string        // brief reaction if wrong
  // if correct, advances to nextSceneId
  nextSceneId?: string
}

export interface EvidenceCard {
  id: string
  title: string
  description: string
  detail: string
  type: 'document' | 'record' | 'regulation' | 'testimony'
  isKey?: boolean         // highlighted in court record as critical
}

export interface Scene {
  id: string
  dialogues: DialogueLine[]
  nextSceneId?: string     // auto-advance after all dialogues
  isVerdictScene?: boolean
  verdictData?: VerdictData
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
  roleLabel: string         // e.g. "Prosecutor" or "Defense Attorney"
  briefing: string
  evidence: EvidenceCard[]
  firstSceneId: string
  scenes: Record<string, Scene>
}

// ─────────────────────────────────────────────────────────────────────────────
// CASE 1: THE RODRIGO GAMBIT
// Nicolas plays the prosecutor. He must take down a high-performing
// banker who skipped KYC on a big client — exactly the kind of
// overconfidence Nicolas himself shows.
// ─────────────────────────────────────────────────────────────────────────────
export const case1: Case = {
  id: 'case-1',
  title: 'THE RODRIGO GAMBIT',
  subtitle: 'Case No. 1 — The State vs. Rodrigo Morales',
  roleLabel: 'Prosecutor',
  briefing:
    'Senior banker Rodrigo Morales processed a $450,000 investment from a new client without completing the mandatory KYC (Know Your Customer) verification. He claims he "knew the client personally" and the deal was time-sensitive. The compliance department flagged the transaction three days later. Your job: prove that experience and personal relationships do not replace regulatory procedure.',

  evidence: [
    {
      id: 'e1-transaction',
      title: 'Wire Transfer Record',
      description: '$450,000 wire transfer dated March 3rd',
      detail:
        'Internal bank record showing the transaction was processed at 4:47 PM, 13 minutes before a KYC file was even opened for the client. The transfer was marked PRIORITY OVERRIDE by Morales himself.',
      type: 'record',
      isKey: true,
    },
    {
      id: 'e1-kyc-policy',
      title: 'KYC Policy — Section 4.2',
      description: 'Bank internal policy on new client verification',
      detail:
        'Section 4.2 states: "No transaction exceeding $10,000 shall be processed for a new client until a complete KYC file has been reviewed and approved by a compliance officer. No exceptions apply regardless of relationship history or time constraints."',
      type: 'regulation',
      isKey: true,
    },
    {
      id: 'e1-email',
      title: 'Morales Email — 4:31 PM',
      description: 'Email from Rodrigo to compliance, same day',
      detail:
        'Rodrigo emailed the compliance team at 4:31 PM: "I\'m going ahead with the Vargas transfer. I\'ve known Miguel for years. We can finish the paperwork tomorrow. The market window closes today." The transaction went through 16 minutes later.',
      type: 'document',
    },
    {
      id: 'e1-client-history',
      title: 'Client Background Check',
      description: 'Post-transaction due diligence on Miguel Vargas',
      detail:
        'Background check completed 72 hours after the transaction revealed that "Miguel Vargas" had two prior financial fraud investigations in neighboring jurisdictions. The KYC process would have surfaced this information before any funds moved.',
      type: 'document',
      isKey: true,
    },
    {
      id: 'e1-finad',
      title: 'FINRA Rule 4512',
      description: 'Customer Account Information — federal regulation',
      detail:
        'FINRA Rule 4512 requires member firms to maintain essential facts for each customer, including legal name, address, and the basis on which suitability determinations are made. This applies regardless of existing personal relationships.',
      type: 'regulation',
    },
  ],

  firstSceneId: 'scene-1-opening',

  scenes: {
    'scene-1-opening': {
      id: 'scene-1-opening',
      dialogues: [
        {
          id: 'd1',
          speaker: 'THE COURT',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'The court will come to order. This is the matter of improper transaction processing against Mr. Rodrigo Morales, Senior Account Manager. Prosecution, you may begin.',
        },
        {
          id: 'd2',
          speaker: 'Nicolas',
          portrait: 'nicolas-confident',
          side: 'left',
          text: 'Your Honor, on March 3rd, the defendant transferred $450,000 for a new, unverified client — bypassing every KYC safeguard our institution has. He did not make a judgment call. He made a gamble. And when bankers gamble with procedure, customers pay the price.',
        },
        {
          id: 'd3',
          speaker: 'Rodrigo Morales',
          portrait: 'rodrigo-confident',
          side: 'right',
          text: 'With all due respect, I have been in this industry for 14 years. I knew Miguel Vargas personally. The KYC is a formality in situations like this. I was protecting a valuable client relationship.',
        },
        {
          id: 'd4',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'The defense claims personal relationships are a substitute for procedure. Let\'s examine the timeline more closely.',
          choices: [
            {
              id: 'c1-correct',
              label: 'Present the Wire Transfer Record — the transaction happened BEFORE KYC was opened',
              isCorrect: true,
              feedback: '',
              nextSceneId: 'scene-1-timeline',
            },
            {
              id: 'c1-wrong-a',
              label: 'Ask Rodrigo how long he has known the client',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'The length of the relationship is irrelevant to whether procedure was followed. The Judge is unimpressed.',
            },
            {
              id: 'c1-wrong-b',
              label: 'Argue that $450,000 is an unusually large amount',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'KYC applies to all new clients at any amount over $10,000. Amount alone is not the issue here.',
            },
          ],
        },
      ],
      nextSceneId: undefined,
    },

    'scene-1-timeline': {
      id: 'scene-1-timeline',
      dialogues: [
        {
          id: 'd5',
          speaker: 'Nicolas',
          portrait: 'nicolas-confident',
          side: 'left',
          overlay: 'TAKE THAT',
          text: 'Your Honor — the Wire Transfer Record shows the transaction completed at 4:47 PM. The KYC file was not even opened until 5:00 PM. The "formality" he mentions? It happened AFTER the money was already gone.',
        },
        {
          id: 'd6',
          speaker: 'Rodrigo Morales',
          portrait: 'rodrigo-sweating',
          side: 'right',
          text: 'I... the timing was circumstantial. The compliance team was informed. I sent them an email.',
        },
        {
          id: 'd7',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'He claims the compliance team was informed. How do you respond to the email he sent at 4:31 PM?',
          choices: [
            {
              id: 'c2-correct',
              label: 'The email says he is going AHEAD regardless — it is a notification, not a request for approval',
              isCorrect: true,
              feedback: '',
              nextSceneId: 'scene-1-policy',
            },
            {
              id: 'c2-wrong-a',
              label: 'The email proves he tried to follow process',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'Notifying someone of a decision you have already made is not the same as seeking approval. The Judge notes the distinction.',
            },
            {
              id: 'c2-wrong-b',
              label: 'The email should be excluded — it is hearsay',
              isCorrect: false,
              wrongPenalty: 20,
              feedback: 'Internal bank emails are admissible business records. This objection backfires badly.',
            },
          ],
        },
      ],
    },

    'scene-1-policy': {
      id: 'scene-1-policy',
      dialogues: [
        {
          id: 'd8',
          speaker: 'Nicolas',
          portrait: 'nicolas-confident',
          side: 'left',
          overlay: 'OBJECTION',
          text: 'The email, Exhibit C, reads: "I\'m going ahead with the Vargas transfer." Not "I am requesting approval." Not "Please advise." He decided first, then told compliance. That is the opposite of procedure.',
        },
        {
          id: 'd9',
          speaker: 'Rodrigo Morales',
          portrait: 'rodrigo-sweating',
          side: 'right',
          text: 'But Section 4.2 has always been applied flexibly here. In practice, senior staff have always had discretion on urgent deals.',
        },
        {
          id: 'd10',
          speaker: 'THE COURT',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'Prosecution — the defendant claims there is a practice of discretionary exceptions. What is your response?',
        },
        {
          id: 'd11',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'The policy says "no exceptions." Does informal practice override written regulation?',
          choices: [
            {
              id: 'c3-correct',
              label: 'Present KYC Policy Section 4.2 — it explicitly states "No exceptions apply regardless of time constraints"',
              isCorrect: true,
              feedback: '',
              nextSceneId: 'scene-1-climax',
            },
            {
              id: 'c3-wrong-a',
              label: 'Argue that other senior staff should also be investigated',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'Spreading blame to others does not prove this defendant\'s violation. Stay focused.',
            },
            {
              id: 'c3-wrong-b',
              label: 'Agree that senior discretion is a valid defense in urgent situations',
              isCorrect: false,
              wrongPenalty: 25,
              feedback: 'This concedes the core argument. Written policy cannot be overridden by informal habit — ever.',
            },
          ],
        },
      ],
    },

    'scene-1-climax': {
      id: 'scene-1-climax',
      dialogues: [
        {
          id: 'd12',
          speaker: 'Nicolas',
          portrait: 'nicolas-confident',
          side: 'left',
          overlay: 'TAKE THAT',
          text: 'Your Honor — KYC Policy Section 4.2 could not be clearer: "No exceptions apply regardless of relationship history or time constraints." Mr. Morales did not exercise senior discretion. He simply ignored a rule he found inconvenient.',
        },
        {
          id: 'd13',
          speaker: 'Rodrigo Morales',
          portrait: 'rodrigo-cornered',
          side: 'right',
          text: '...',
        },
        {
          id: 'd14',
          speaker: 'Nicolas',
          portrait: 'nicolas-confident',
          side: 'left',
          text: 'And the client background check — completed three days too late — revealed prior fraud investigations. The procedure existed precisely to catch situations like this. Rodrigo\'s confidence in his own judgment cost the bank, and could have cost the client.',
        },
        {
          id: 'd15',
          speaker: 'THE COURT',
          portrait: 'judge-angry',
          side: 'center',
          text: 'I have heard enough. Mr. Morales — expertise does not grant immunity from procedure. The court finds the violation proven. This case is referred to the compliance review board.',
        },
      ],
      nextSceneId: 'scene-1-verdict',
    },

    'scene-1-verdict': {
      id: 'scene-1-verdict',
      isVerdictScene: true,
      dialogues: [],
      verdictData: {
        outcome: 'guilty',
        title: 'VIOLATION PROVEN',
        subtitle: 'Rodrigo Morales — KYC bypass, regulatory risk created',
        lessonTitle: 'The Mirror Principle',
        lessonText:
          'You just proved that 14 years of experience, personal relationships, and good intentions do not replace procedure. Rodrigo did not think he was cutting corners — he thought he was making a smart judgment call.\n\nThat distinction is exactly what makes compliance violations dangerous. The most experienced people are the most confident in their exceptions. And confidence, without protocol, is just speed toward the wrong outcome.\n\nBefore Case 2: ask yourself — when was the last time YOU knew something so well, you did not double-check?',
        regulationRef: 'FINRA Rule 4512 / KYC Policy Section 4.2',
      },
    },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// CASE 2: THE ALEX DEFENSE
// Nicolas plays the defense attorney for Alex — a junior teller who
// processed a transaction "because his manager told him to." This is the
// mirror: how do you defend someone doing exactly what Rodrigo did,
// but from the bottom of the hierarchy?
// ─────────────────────────────────────────────────────────────────────────────
export const case2: Case = {
  id: 'case-2',
  title: 'THE ALEX DEFENSE',
  subtitle: 'Case No. 2 — The State vs. Alex Reyes',
  roleLabel: 'Defense Attorney',
  briefing:
    'Junior teller Alex Reyes processed a $78,000 cash transaction for a walk-in client without flagging it for Currency Transaction Report (CTR) filing, as required for any cash transaction over $10,000. He claims his manager, Supervisor Brenda Torres, told him verbally: "Just process it, I\'ll handle the paperwork." Brenda Torres is not present. Alex is 23 years old and has worked at the bank for 8 months. Your job: defend him — but the evidence will show this defense is weaker than it looks.',

  evidence: [
    {
      id: 'e2-transaction-log',
      title: 'Transaction Log — Alex Reyes',
      description: 'Cash transaction record processed by teller #7',
      detail:
        'Log shows $78,000 cash received from walk-in client at 2:14 PM on April 7th. Teller ID: Alex Reyes. No CTR form filed. No supervisor approval code entered. Transaction marked as "standard."',
      type: 'record',
      isKey: true,
    },
    {
      id: 'e2-ctr-law',
      title: 'Bank Secrecy Act — CTR Requirement',
      description: 'Federal law: Currency Transaction Report over $10,000',
      detail:
        'The Bank Secrecy Act requires financial institutions to file a Currency Transaction Report (FinCEN Form 112) for every cash transaction exceeding $10,000. This is a federal obligation — not a bank policy. It cannot be delegated to a supervisor after the fact. The teller processing the transaction is responsible for triggering the report.',
      type: 'regulation',
      isKey: true,
    },
    {
      id: 'e2-verbal-order',
      title: 'Alex Reyes Statement',
      description: 'Written statement from Alex, given April 8th',
      detail:
        '"My supervisor Brenda told me verbally before the client arrived: just run the transaction, she would file the CTR herself. I trusted her. I have only been here 8 months. I did not know I was personally responsible regardless of what a manager says."',
      type: 'testimony',
    },
    {
      id: 'e2-training-record',
      title: 'Onboarding Training Certificate',
      description: 'Alex Reyes training completion — Module 3: Cash Transactions',
      detail:
        'Certificate dated September 14th shows Alex completed Module 3: Cash Transactions and CTR Filing. The module includes a section titled: "Individual Teller Responsibility: You are personally responsible for triggering CTR reports on qualifying transactions, regardless of supervisor instruction." Alex signed the acknowledgment.',
      type: 'document',
      isKey: true,
    },
    {
      id: 'e2-brenda-absence',
      title: 'HR Record — Brenda Torres',
      description: 'Supervisor schedule for April 7th',
      detail:
        'HR records show Brenda Torres was on approved medical leave from April 5th through April 12th. She was not present in the branch on April 7th. Her access card shows no entry. Alex\'s claim of receiving verbal instruction that day cannot be verified.',
      type: 'document',
      isKey: true,
    },
  ],

  firstSceneId: 'scene-2-opening',

  scenes: {
    'scene-2-opening': {
      id: 'scene-2-opening',
      dialogues: [
        {
          id: 'd20',
          speaker: 'THE COURT',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'This court will hear the matter of Currency Transaction Report non-compliance against teller Alex Reyes. Defense, your opening.',
        },
        {
          id: 'd21',
          speaker: 'Nicolas',
          portrait: 'nicolas-confident',
          side: 'left',
          text: 'Your Honor, Alex Reyes is 23 years old. 8 months on the job. He trusted his supervisor\'s instructions. He is not a criminal — he is a junior employee who made a mistake under authority.',
        },
        {
          id: 'd22',
          speaker: 'Prosecutor',
          portrait: 'prosecutor-neutral',
          side: 'right',
          text: 'The prosecution will show that regardless of any claimed verbal instruction, Mr. Reyes had a personal, non-delegable federal obligation to file a CTR. And that he was trained on this exact requirement.',
        },
        {
          id: 'd23',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'The defense strategy — what is the strongest opening argument?',
          choices: [
            {
              id: 'c4-correct',
              label: 'Challenge the prosecution to prove Alex knew the supervisor instruction was unlawful',
              isCorrect: true,
              feedback: '',
              nextSceneId: 'scene-2-training-reveal',
            },
            {
              id: 'c4-wrong-a',
              label: 'Argue that the supervisor bears full responsibility — the junior employee just followed orders',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'Federal law does not recognize "I followed orders" for non-delegable obligations. The prosecutor pounces on this.',
            },
            {
              id: 'c4-wrong-b',
              label: 'Argue that $78,000 is close to the $10,000 threshold, so the violation was minor',
              isCorrect: false,
              wrongPenalty: 10,
              feedback: '$78,000 is nearly 8x the threshold. This argument actually highlights the severity.',
            },
          ],
        },
      ],
    },

    'scene-2-training-reveal': {
      id: 'scene-2-training-reveal',
      dialogues: [
        {
          id: 'd24',
          speaker: 'Nicolas',
          portrait: 'nicolas-confident',
          side: 'left',
          text: 'My client had no reason to believe his supervisor\'s instruction was inappropriate. He had limited experience. He trusted—',
        },
        {
          id: 'd25',
          speaker: 'Prosecutor',
          portrait: 'prosecutor-objecting',
          side: 'right',
          overlay: 'OBJECTION',
          text: 'Your Honor — I present Exhibit D. Mr. Reyes completed onboarding Module 3 on CTR filing. He signed an acknowledgment stating, and I quote: "I am personally responsible for triggering CTR reports on qualifying transactions, regardless of supervisor instruction."',
        },
        {
          id: 'd26',
          speaker: 'Nicolas',
          portrait: 'nicolas-shocked',
          side: 'left',
          text: 'That... changes things.',
        },
        {
          id: 'd27',
          speaker: 'THE COURT',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'Defense — how do you respond to the training certificate?',
        },
        {
          id: 'd28',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'The training certificate is now in evidence. What is the best response?',
          choices: [
            {
              id: 'c5-correct',
              label: 'Acknowledge the training but argue the bank failed to reinforce it with real scenario practice',
              isCorrect: true,
              feedback: '',
              nextSceneId: 'scene-2-brenda-reveal',
            },
            {
              id: 'c5-wrong-a',
              label: 'Challenge the authenticity of the training certificate',
              isCorrect: false,
              wrongPenalty: 20,
              feedback: 'Bank records are authenticated. This looks desperate and damages credibility.',
            },
            {
              id: 'c5-wrong-b',
              label: 'Argue Alex was too overwhelmed by 8 months of new information to retain this specific module',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'The Judge notes that signing an explicit acknowledgment is not "retention" — it is formal notice.',
            },
          ],
        },
      ],
    },

    'scene-2-brenda-reveal': {
      id: 'scene-2-brenda-reveal',
      dialogues: [
        {
          id: 'd29',
          speaker: 'Nicolas',
          portrait: 'nicolas-confident',
          side: 'left',
          text: 'Even if Alex signed that form, the bank\'s culture normalized bypassing it. His supervisor gave him explicit contrary instruction. A junior employee should be able to trust—',
        },
        {
          id: 'd30',
          speaker: 'Prosecutor',
          portrait: 'prosecutor-objecting',
          side: 'right',
          overlay: 'HOLD IT',
          text: 'Your Honor — Exhibit E. HR records confirm Supervisor Brenda Torres was on approved medical leave April 5th through April 12th. She was not in the building on April 7th. She could not have given any instruction that day.',
        },
        {
          id: 'd31',
          speaker: 'Alex Reyes',
          portrait: 'alex-scared',
          side: 'left',
          text: 'I... I thought she was there. She had come in briefly in the morning—',
        },
        {
          id: 'd32',
          speaker: 'Nicolas',
          portrait: 'nicolas-shocked',
          side: 'left',
          text: 'The supervisor alibi has collapsed. What is the last viable defense?',
          choices: [
            {
              id: 'c6-correct',
              label: 'Concede the violation but argue for leniency — Alex self-reported and has no prior record',
              isCorrect: true,
              feedback: '',
              nextSceneId: 'scene-2-closing',
            },
            {
              id: 'c6-wrong-a',
              label: 'Demand Brenda Torres be brought to court to clarify — adjourn proceedings',
              isCorrect: false,
              wrongPenalty: 15,
              feedback: 'Torres is on medical leave and her access card evidence is irrefutable. This delays without helping.',
            },
            {
              id: 'c6-wrong-b',
              label: 'Argue the HR record could be incorrect — question its integrity',
              isCorrect: false,
              wrongPenalty: 20,
              feedback: 'Attacking verified HR records without evidence destroys credibility. The Judge\'s patience runs out.',
            },
          ],
        },
      ],
    },

    'scene-2-closing': {
      id: 'scene-2-closing',
      dialogues: [
        {
          id: 'd33',
          speaker: 'Nicolas',
          portrait: 'nicolas-thinking',
          side: 'left',
          text: 'Your Honor — I will not insult this court by pretending the violation did not occur. Alex Reyes failed to file a CTR. He was trained on his obligation. The supervisor alibi has not held.\n\nWhat I ask is this: Alex is 23 years old. He has no prior violations. When the compliance review began, he gave a full written statement immediately — no lawyer, no deflection. He is genuinely remorseful.',
        },
        {
          id: 'd34',
          speaker: 'Alex Reyes',
          portrait: 'alex-relieved',
          side: 'right',
          text: 'I should have filed the report myself. I knew the rule. I chose to trust someone else\'s word over my own training. That was wrong.',
        },
        {
          id: 'd35',
          speaker: 'THE COURT',
          portrait: 'judge-neutral',
          side: 'center',
          text: 'The court acknowledges the defense\'s candor. Mr. Reyes — a compliance violation is a compliance violation, regardless of instruction or experience level. However, the court notes your cooperation and refers this matter to the bank\'s internal review board rather than federal prosecution. Training remediation is mandated.',
        },
        {
          id: 'd36',
          speaker: 'Prosecutor',
          portrait: 'prosecutor-neutral',
          side: 'right',
          text: 'The prosecution accepts the court\'s disposition.',
        },
      ],
      nextSceneId: 'scene-2-verdict',
    },

    'scene-2-verdict': {
      id: 'scene-2-verdict',
      isVerdictScene: true,
      dialogues: [],
      verdictData: {
        outcome: 'lesson',
        title: 'CASE CLOSED',
        subtitle: 'Alex Reyes — violation confirmed, remorse noted, internal review ordered',
        lessonTitle: 'You and Rodrigo Are the Same Person',
        lessonText:
          'In Case 1, you prosecuted Rodrigo for using his 14 years of experience to justify skipping KYC. "I knew the client personally. The procedure is a formality for me."\n\nIn Case 2, you defended Alex for relying on his supervisor\'s word to skip CTR filing. "I trusted someone else. The procedure was someone else\'s job."\n\nDifferent rank. Different justification. Same outcome: procedure skipped, individual accountability abandoned.\n\nThe only defense that worked for Alex was admitting the truth and asking for mercy. That is not a legal strategy — that is what happens when there is no good defense left.\n\nRegulatory compliance is non-delegable and non-negotiable. Not for 14-year veterans. Not for 8-month juniors. Not for anyone in between.',
        regulationRef: 'Bank Secrecy Act / FinCEN Form 112 / CTR Filing Obligation',
      },
    },
  },
}

export const CASES: Case[] = [case1, case2]

// ── Debrief for Nicolas ───────────────────────────────────────────────────────
export const finalDebrief = {
  title: 'DEBRIEF: NICOLAS',
  lines: [
    'You have now argued both sides of the same case.',
    'Rodrigo Morales believed his experience made him the exception.',
    'Alex Reyes believed following orders made compliance someone else\'s job.',
    'Both were wrong. Both faced consequences.',
    'The question is not whether you know the rules.',
    'The question is whether you follow them even when you think you know better.',
    'That is the difference between a professional and a liability.',
  ],
  callToAction: 'What is one situation in the last 30 days where you relied on your own judgment instead of checking the procedure first?',
}
