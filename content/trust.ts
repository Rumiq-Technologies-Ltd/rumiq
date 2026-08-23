/** /trust and the two region pages — Sections 8.9 and 8.10.
 *  Section 4.2 language rules apply strictly: no "HIPAA compliant", no SOC 2 or
 *  HITRUST claim, no certification, no dates on the assurance roadmap. */

export const trust = {
  hero: {
    eyebrow: 'TRUST CENTER',
    headline: 'What we do, what we do not do, and what we are not yet in a position to claim.',
    subhead:
      'Written for compliance, IT and the data protection officer. Dense on purpose. If something is not built yet, this page says so.',
    primary: { label: 'Book a technical review', href: '/contact' },
    secondary: { label: 'Open the Policy Sandbox', href: '/demo/policy-sandbox' },
    assurances: ['No certification claimed', 'BAA before any PHI', 'Default deny on sensitive classes'],
  },

  architecture: {
    eyebrow: '01 · ARCHITECTURE AND THE BOUNDARY',
    headline: 'Your operational system stays the source of record.',
    body: 'Rumiq is a governed layer around the systems you already run. It reads the minimum necessary, decides what may leave for each destination, and records the decision. It is not a system of record, and it does not write clinical data.',
    rows: [
      ['Public plane', 'Marketing, demand and published content', 'No patient data is stored or received here'],
      ['Boundary', 'Classification, consent resolution, disclosure decisions, audit', 'Every decision recorded with its policy version'],
      ['Protected plane', 'Appointments, attendance, delivered care, patient voice', 'Never transmitted to an advertising or analytics destination at individual level'],
    ],
  },

  dataHandling: {
    eyebrow: '02 · DATA HANDLING AND RESIDENCY',
    headline: 'Where data sits, and how little of it moves.',
    rows: [
      ['PHI hosting region', 'US-region hosting by default for US clients; regional residency for Gulf engagements'],
      ['Encryption', 'In transit and at rest, using platform-managed keys'],
      ['Minimisation', 'Read the minimum necessary for the measurement in scope, and no more'],
      ['Retention', 'Set per engagement and stated in the agreement; disclosure ledger retained for audit'],
      ['Free text', 'Never transmitted to an advertising or analytics destination, in any page class'],
      ['Deletion', 'On written request, subject to the retention obligations in the agreement'],
    ],
  },

  access: {
    eyebrow: '03 · ACCESS CONTROL',
    headline: 'Least privilege, and a record of who looked.',
    rows: [
      ['Authentication', 'Single sign-on with enforced multi-factor authentication for Rumiq personnel'],
      ['Authorisation', 'Role-based, scoped per tenant; production access is request-based and time-bound'],
      ['Separation', 'Tenant data is logically separated; no cross-tenant queries exist in the product'],
      ['Audit', 'Administrative and data-access events are logged'],
      ['Personnel', 'Background screening and confidentiality obligations for anyone with production access'],
    ],
  },

  consent: {
    eyebrow: '04 · CONSENT AND PREFERENCES',
    headline: 'Absence of a choice is never treated as consent.',
    body: 'Consent and channel preference are held per contact and read on every routing decision. No record means denied for every non-essential destination, whatever the page class. Withdrawal propagates rather than being filed.',
    rows: [
      ['Default', 'Denied until a choice is recorded'],
      ['Granularity', 'Per destination category and per channel'],
      ['Versioning', 'Every decision cites the policy version that permitted it'],
      ['Withdrawal', 'Takes effect for subsequent decisions and is recorded in the ledger'],
    ],
  },

  assurance: {
    eyebrow: '05 · ASSURANCE ROADMAP',
    headline: 'A roadmap. Not a certification, and not a date.',
    note:
      'Rumiq holds no SOC 2 report and no HITRUST certification, and claims neither. The items below are the intended sequence of work. No timeline is given, because giving one would be a claim we cannot support.',
    rows: [
      ['Control documentation', 'In progress', 'Written control descriptions mapped to HIPAA Security Rule domains'],
      ['Independent penetration test', 'Planned', 'Third-party test with remediation tracked to closure'],
      ['SOC 2 Type I readiness', 'Planned', 'Readiness assessment only. Not a report, and not an audit'],
      ['SOC 2 Type II', 'Intended', 'Requires an observation period that has not started'],
      ['HITRUST', 'Under consideration', 'No commitment made'],
    ],
  },

  subprocessors: {
    eyebrow: '06 · SUBPROCESSORS',
    headline: 'The list, once it is signed off.',
    // TODO: complete before launch. Requires legal review and confirmation of
    // every vendor, purpose, region and DPA status. Do not populate with
    // plausible-looking entries (Section 4.1).
    todo:
      'TODO — scaffold only. The subprocessor list requires legal review and vendor-by-vendor confirmation of purpose, processing region and data protection terms before publication. It is deliberately empty rather than indicative.',
    columns: ['Subprocessor', 'Purpose', 'Processing region', 'Terms in place'],
  },

  incident: {
    eyebrow: '07 · INCIDENT RESPONSE',
    headline: 'What happens, and how quickly you hear from us.',
    rows: [
      ['Detection', 'Alerting on availability, access anomalies and failed policy decisions'],
      ['Triage', 'Severity assigned, scope established, containment before communication where safe'],
      ['Notification', 'Contractual notification timelines are set in the agreement, including any obligations arising from a BAA'],
      ['Post-incident', 'Written summary of cause, impact and corrective action'],
      ['Contact', 'A named security contact is provided at contract signature'],
    ],
  },

  notClaimed: {
    eyebrow: '08 · WHAT WE DO NOT CLAIM',
    headline: 'The part most vendor trust pages leave out.',
    points: [
      'The platform is designed to support HIPAA obligations. It is not “HIPAA compliant”: compliance is a property of an organisation and its practices, not of software.',
      'A BAA is executed before any PHI is processed, and PHI handling is enabled in phases against named Security Rule control domains.',
      'No SOC 2 report and no HITRUST certification exists. Neither is claimed.',
      'No approval, registration or endorsement from any health authority in any jurisdiction is claimed.',
      'Rumiq is at an early stage, with two pilots running. Where something is not built, this site says so.',
      'Nothing on this site is legal, regulatory or clinical advice. Regulatory obligations vary by jurisdiction and should be validated with counsel.',
    ],
  },
} as const;

export const regions = {
  'united-states': {
    slug: 'united-states',
    hero: {
      eyebrow: 'REGION · UNITED STATES',
      headline: 'Built for the obligations you already carry.',
      subhead:
        'US-region PHI hosting by default, a BAA before any PHI is processed, and a disclosure ledger your privacy office can audit line by line.',
      assurances: ['US-region hosting by default', 'BAA before any PHI', 'Default deny on sensitive page classes'],
    },
    sections: [
      {
        eyebrow: 'FRAMEWORK',
        headline: 'HIPAA, and the tracking-technology problem underneath it.',
        rows: [
          ['Business Associate Agreement', 'Executed before any PHI is processed'],
          ['Security Rule', 'Controls documented against named administrative, physical and technical domains'],
          ['Tracking technologies', 'Sensitive page classes are denied by default; permitted disclosures are minimised and logged'],
          ['Breach notification', 'Contractual timelines set in the agreement and the BAA'],
          ['State law', 'State-level privacy and recording obligations differ and are your decision with counsel'],
        ],
      },
    ],
    counsel:
      'Federal and state obligations differ and continue to evolve, including guidance on tracking technologies. Validate your obligations with your own counsel. Nothing here is legal advice.',
  },

  gulf: {
    slug: 'gulf',
    hero: {
      eyebrow: 'REGION · GULF',
      headline: 'Regional residency, Arabic-first patient access, and WhatsApp as a front door.',
      subhead:
        'Designed around regional residency and cross-border transfer requirements, with the channels patients in the region actually use treated as primary rather than bolted on.',
      assurances: ['Regional residency by design', 'Arabic and multilingual patient access', 'Consent held per channel'],
    },
    sections: [
      {
        eyebrow: 'FRAMEWORK',
        headline: 'Federal, free zone and health authority requirements.',
        rows: [
          ['UAE Federal Decree-Law No. 45 of 2021', 'Personal data protection obligations treated as design requirements'],
          ['DIFC Data Protection Law No. 5 of 2020', 'Applies where processing sits within the DIFC'],
          ['Health authorities', 'DHA, DoH Abu Dhabi and MOHAP requirements treated as design considerations, not as approvals held'],
          ['Cross-border transfer', 'Residency and transfer conditions set per engagement before any processing begins'],
          ['Language', 'Arabic and English parity in patient-facing content and consent language'],
        ],
      },
    ],
    whatsapp: {
      eyebrow: 'WHATSAPP AS A PRIMARY CHANNEL',
      headline: 'In this region, WhatsApp is not a secondary channel. It is often the first one.',
      body: 'Patients enquire, reschedule and ask follow-up questions on WhatsApp, frequently before they ever call. Treating it as an afterthought means the majority of patient access goes unmeasured and ungoverned.',
      rows: [
        ['Consent per channel', 'Messaging consent is held separately from other channels, and withdrawal applies to the channel it was given on'],
        ['Measurement', 'Enquiries and outcomes are measured on the same definitions as calls and forms'],
        ['Content of messages', 'Message content stays in the protected plane and is never transmitted to an advertising or analytics destination'],
        ['Language', 'Arabic and English handling, including right-to-left content'],
        ['Platform terms', 'Business messaging platform terms and any healthcare-specific restrictions are the provider’s to accept, with counsel'],
      ],
    },
    counsel:
      'Requirements differ between the federal framework, the free zones and individual health authorities, and continue to evolve. Validate your obligations with local counsel. Nothing here is legal advice, and no approval or registration from any authority is claimed.',
  },
} as const;
