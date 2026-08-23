import type { SectorConfig } from './types';

/** Multi-site and specialty clinics — Section 8.8. */
export const multiSite: SectorConfig = {
  id: 'multi-site',
  label: 'Multi-site clinics',
  href: '/solutions/multi-site',
  vocabulary: {
    unit: 'patient',
    units: 'patients',
    outcome: 'Attended',
    capacityNoun: 'Room utilisation',
    siteNoun: 'Location',
    serviceNoun: 'Service line',
    costPerOutcome: 'Cost per attended patient',
    costStageIndex: 2,
  },
  hero: {
    eyebrow: 'MULTI-SITE AND SPECIALTY CLINICS',
    headline: 'Spend spreads evenly across locations that are not evenly full.',
    subhead:
      'One governed view across every location and service line, with capacity next to demand, so growth goes where there is room to serve it.',
    sharpestProblem:
      'No consistent view of which location and service combination is profitable, so budget is allocated by history and volume rather than by capacity and outcome.',
    assurances: [
      'One model across every location',
      'Capacity shown next to demand',
      'Location-level reporting without location-level spreadsheets',
    ],
  },
  page: {
    problem: {
      eyebrow: 'THE PROBLEM',
      headline: 'Every location reports differently, so the group cannot compare anything.',
      body: 'Each site names its services its own way, runs its own local marketing and keeps its own view of the diary. The group rolls it up into an average that describes none of them.',
    },
    failureModes: [
      {
        title: 'Averages that hide both problems',
        body: 'Group utilisation looks healthy while one site turns work away and another sits half empty.',
        cost: 'Two opposite problems, neither addressed',
      },
      {
        title: 'Service lines that cannot be compared',
        body: 'The same procedure carries three names across four sites, so cost per attended patient cannot be calculated at all.',
        cost: 'Investment decided by anecdote',
      },
      {
        title: 'Local marketing nobody can audit',
        body: 'Individual sites run their own campaigns and their own tracking, each with a different idea of what counts as a conversion.',
        cost: 'Duplicate spend and unauditable disclosure',
      },
    ],
    modules: {
      eyebrow: 'WHICH MODULES, IN WHAT ORDER',
      headline: 'One vocabulary before any optimisation.',
      steps: [
        { name: 'Healthcare Knowledge Graph', why: 'One canonical name per service, location and provider. Nothing else works without it.' },
        { name: 'Healthcare Connector Layer', why: 'Read every site’s system into that one model.' },
        { name: 'Privacy and Data Gateway', why: 'One policy across every site, instead of one per agency.' },
        { name: 'Growth Intelligence', why: 'Cost per attended patient by location and service line, with capacity alongside.' },
        { name: 'Patient Access Intelligence', why: 'Compare access performance between sites on the same definitions.' },
      ],
    },
    first90: {
      eyebrow: 'THE FIRST 90 DAYS',
      headline: 'Two sites first, then the rest.',
      phases: [
        { label: 'Days 1 to 30', body: 'BAA executed. Canonical service and location model agreed with clinical and operational leads. Two representative sites connected read-only.' },
        { label: 'Days 31 to 60', body: 'Group policy configured in the gateway and tested. Access and attendance measured on shared definitions across those two sites.' },
        { label: 'Days 61 to 90', body: 'Remaining sites mapped in. First group-level reallocation made against capacity rather than site history.' },
      ],
    },
    regulatory: {
      eyebrow: 'REGULATORY NOTES',
      headline: 'One policy, applied consistently.',
      notes: [
        'A BAA is executed before any PHI is processed, covering every connected site.',
        'Disclosure policy is set once at group level and audited centrally, rather than per agency.',
        'No certification is claimed. No SOC 2, no HITRUST, no approval from any authority.',
        'Nothing here is legal or clinical advice.',
      ],
    },
    proofSlots: [
      'Multi-site reference. No client approval in place yet.',
      'Group-level capacity and cost comparison, pending publication rights.',
    ],
  },
};
