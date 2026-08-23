import type { SectorConfig } from './types';

/** Hospital and health system marketing — Section 8.8. */
export const healthSystems: SectorConfig = {
  id: 'health-systems',
  label: 'Health systems',
  href: '/solutions/health-systems',
  vocabulary: {
    unit: 'patient',
    units: 'patients',
    outcome: 'Attended',
    capacityNoun: 'Clinic utilisation',
    siteNoun: 'Facility',
    serviceNoun: 'Service line',
    costPerOutcome: 'Cost per attended patient',
    costStageIndex: 2,
  },
  hero: {
    eyebrow: 'HOSPITAL AND HEALTH SYSTEM MARKETING',
    headline: 'Tracker restrictions took the conversion signal. Nothing replaced it.',
    subhead:
      'A governed measurement layer your privacy office can audit, so marketing can prove impact to finance without asking anyone to accept risk they should not accept.',
    sharpestProblem:
      'Marketing cannot prove impact to finance, and every proposed fix is blocked by compliance for good reason. The stalemate is the problem.',
    assurances: [
      'Default deny on sensitive page classes',
      'Disclosure ledger your privacy office can audit',
      'No certification claimed, roadmap available',
    ],
  },
  page: {
    problem: {
      eyebrow: 'THE PROBLEM',
      headline: 'Marketing and compliance are both right, which is why nothing moves.',
      body: 'Tracking was removed from the pages that mattered, and rightly so. What was never built is the governed replacement, so marketing reports on impressions while finance asks about patients.',
    },
    failureModes: [
      {
        title: 'Measurement removed, not replaced',
        body: 'Conversion signal disappeared from service and scheduling pages, and nothing took its place.',
        cost: 'Budget defended with impressions',
      },
      {
        title: 'Every fix fails legal review',
        body: 'Proposals depend on sending something that should not be sent, so they are refused, and the refusal is correct.',
        cost: 'Quarters lost to a stalemate nobody owns',
      },
      {
        title: 'No auditable record of what was sent',
        body: 'When the privacy office asks what left the estate last month, the honest answer is that nobody can say precisely.',
        cost: 'Risk that cannot be quantified, let alone reduced',
      },
    ],
    modules: {
      eyebrow: 'WHICH MODULES, IN WHAT ORDER',
      headline: 'Governance first. It is the only door that opens.',
      steps: [
        { name: 'Privacy and Data Gateway', why: 'Default deny, per-destination field policy, and a ledger the privacy office can audit.' },
        { name: 'Consent and Preference Service', why: 'Consent state resolved per destination, versioned so a decision can be explained later.' },
        { name: 'Healthcare Connector Layer', why: 'Read scheduling and attendance without new access to clinical systems.' },
        { name: 'Growth Intelligence', why: 'Internal attribution: the impact figure finance will accept.' },
        { name: 'Paid Media and Patient Acquisition', why: 'Optimise on cleared signals once governance is demonstrably in place.' },
      ],
    },
    first90: {
      eyebrow: 'THE FIRST 90 DAYS',
      headline: 'The privacy office is the first stakeholder, not the last.',
      phases: [
        { label: 'Days 1 to 30', body: 'BAA executed. Page classification agreed with the privacy office. Policy modelled in the sandbox before anything is connected.' },
        { label: 'Days 31 to 60', body: 'Gateway in place on one service line, with the disclosure ledger reviewed by compliance against the agreed policy.' },
        { label: 'Days 61 to 90', body: 'Internal attribution for that service line, presented to finance in cost per attended patient. Expansion decided on the evidence.' },
      ],
    },
    regulatory: {
      eyebrow: 'REGULATORY NOTES',
      headline: 'Precisely what is and is not claimed.',
      notes: [
        'The platform is designed to support HIPAA obligations. A BAA is executed before any PHI is processed.',
        'PHI handling is enabled in phases against named Security Rule control domains, not at signature.',
        'No SOC 2 or HITRUST certification is claimed. An assurance roadmap exists and carries no dates.',
        'Tracking-technology guidance continues to evolve. Nothing here is legal advice; validate with counsel.',
      ],
    },
    proofSlots: [
      'Health system reference. No client approval in place yet.',
      'Privacy office review summary, pending permission to publish.',
    ],
  },
};
