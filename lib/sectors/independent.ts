import type { SectorConfig } from './types';

/**
 * Independent single-site provider — Section 8.8, and Section 4.4's rule: this
 * is not a downgraded enterprise pitch. The buyer is the owner, the problem is
 * that nobody is doing the work at all, and the answer is different in kind.
 */
export const independent: SectorConfig = {
  id: 'independent',
  label: 'Independent provider',
  href: '/solutions/independent',
  vocabulary: {
    unit: 'patient',
    units: 'patients',
    outcome: 'Attended',
    capacityNoun: 'Chair utilisation',
    siteNoun: 'Location',
    serviceNoun: 'Service',
    costPerOutcome: 'Cost per attended patient',
    costStageIndex: 2,
  },
  hero: {
    eyebrow: 'INDEPENDENT SINGLE-SITE PROVIDERS',
    headline: 'You are the marketing department. You already have a job.',
    subhead:
      'You do not need a bigger dashboard. You need to know which of the four things you are paying for actually produced a patient who turned up, and which one to stop.',
    sharpestProblem:
      'Clicks and maybe leads are visible. Which of it produced a patient who attended is not, and there is nobody in the building whose job it is to find out.',
    assurances: [
      'One module is a valid starting point',
      'No in-house marketing team required',
      'Your practice system stays the source of record',
    ],
  },
  page: {
    problem: {
      eyebrow: 'THE PROBLEM',
      headline: 'The problem is not sophistication. It is that nobody is doing it.',
      body: 'A single-site provider is not a small enterprise. There is no analyst, no agency retainer worth the name, and no hour in the week to reconcile four platforms by hand. The reporting that exists measures the cheapest thing to measure.',
    },
    failureModes: [
      {
        title: 'Missed calls nobody counts',
        body: 'The phone rings while you are with a patient. Whether anyone called back, and whether they booked, is not written down anywhere.',
        cost: 'The single largest leak, and the cheapest one to fix',
      },
      {
        title: 'Spend defended by the person taking it',
        body: 'Reporting arrives from whoever runs the ads, framed in impressions and leads, and cannot be checked against attendance.',
        cost: 'No basis on which to stop anything',
      },
      {
        title: 'Invisible to local and AI discovery',
        body: 'Profiles, hours and service lists drift out of date, and the assistant answering the patient’s question has nothing accurate to cite.',
        cost: 'Demand that never reaches you at all',
      },
    ],
    modules: {
      eyebrow: 'WHICH MODULES, IN WHAT ORDER',
      headline: 'Two modules, then stop and look.',
      steps: [
        { name: 'Patient Access Intelligence', why: 'Start with the phone. It is the biggest leak and needs no new spend.' },
        { name: 'Search, Local and AI Discovery', why: 'Make sure the demand that already exists can find you.' },
        { name: 'Privacy and Data Gateway', why: 'Put the boundary in place before any measurement reaches a platform.' },
        { name: 'Growth Intelligence', why: 'Only once there is enough signal for the view to mean anything.' },
      ],
    },
    first90: {
      eyebrow: 'THE FIRST 90 DAYS',
      headline: 'Small, in your language, and no new work for you.',
      phases: [
        { label: 'Days 1 to 30', body: 'Agreements in place. Phone and enquiry baseline measured. One page of findings, written for an owner rather than an analyst.' },
        { label: 'Days 31 to 60', body: 'Missed-call handling and enquiry reasons put in place with whoever answers the phone, not around them.' },
        { label: 'Days 61 to 90', body: 'Local and discovery data corrected. First honest answer to what your existing spend actually produced.' },
      ],
    },
    regulatory: {
      eyebrow: 'REGULATORY NOTES',
      headline: 'The same obligations, without the compliance department.',
      notes: [
        'A BAA is executed before any PHI is processed, exactly as it would be for a larger group.',
        'Call recording obligations differ by jurisdiction and by US state. That decision stays with you and your counsel.',
        'No certification is claimed, and no approval from any authority.',
        'Nothing here is legal or clinical advice.',
      ],
    },
    proofSlots: [
      'Independent provider reference. No client approval in place yet.',
      'Before and after access figures, once a pilot permits publication.',
    ],
  },
};
