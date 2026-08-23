import type { SectorConfig } from './types';

/**
 * Dental group. Synthetic data throughout.
 * Volumes are plausible for a two-location group but are not any client's.
 */
export const dental: SectorConfig = {
  id: 'dental',
  label: 'Dental group',
  href: '/solutions/dental',
  vocabulary: {
    unit: 'patient',
    units: 'patients',
    outcome: 'Treatment started',
    capacityNoun: 'Chair utilisation',
    siteNoun: 'Location',
    serviceNoun: 'Service',
    costPerOutcome: 'Cost per attended patient',
    costStageIndex: 2,
  },
  hero: {
    eyebrow: 'DENTAL PRACTICES, GROUPS AND DSOs',
    headline: 'Your phones are busy. Your new patient numbers are flat. Both are true.',
    subhead:
      'Rumiq measures the whole journey, from the search that started it to the treatment that was actually delivered, without sending patient detail to an ad platform.',
    sharpestProblem:
      'New patient volume stalls while call volume stays high. Treatment plan acceptance is invisible to marketing, so the practice keeps optimising for cheap leads.',
    assurances: [
      'Runs alongside your practice management system',
      'No patient detail leaves for any ad platform',
      'Every disclosure logged with its policy version',
    ],
  },
  page: {
    problem: {
      eyebrow: 'THE PROBLEM',
      headline: 'A busy phone is not the same thing as a growing practice.',
      body: 'Call volume holds up, the diary looks full, and new patient numbers are flat. The three places that happens are all invisible to the marketing reporting you have today.',
    },
    failureModes: [
      {
        title: 'The phone answers, but nobody books',
        body: 'Enquiries arrive and end without an appointment, for reasons nobody records. Price, coverage, no suitable time, wrong service. Each one has a different fix.',
        cost: 'Paid-for demand lost after you already paid for it',
      },
      {
        title: 'Treatment plans presented, not accepted',
        body: 'Marketing optimises to the booking. The practice earns on the plan that gets accepted. Nothing connects the two, so cheap leads look like good leads.',
        cost: 'Spend pushed toward the services with the worst acceptance',
      },
      {
        title: 'Two locations, one budget, no capacity view',
        body: 'Spend spreads evenly while one location runs a waiting list and the other has open chairs.',
        cost: 'Money spent creating demand you cannot serve',
      },
    ],
    modules: {
      eyebrow: 'WHICH MODULES, IN WHAT ORDER',
      headline: 'Access first. Attribution second. Acquisition last.',
      steps: [
        { name: 'Patient Access Intelligence', why: 'Measure the phone before spending another pound on demand.' },
        { name: 'Healthcare Connector Layer', why: 'Read Curve Dental so attendance and treatment start are visible.' },
        { name: 'Privacy and Data Gateway', why: 'Get the measurement in place without exposing patient detail.' },
        { name: 'Growth Intelligence', why: 'Cost per attended patient by service and location.' },
        { name: 'Paid Media and Patient Acquisition', why: 'Only once the outcomes are trustworthy enough to optimise against.' },
      ],
    },
    first90: {
      eyebrow: 'THE FIRST 90 DAYS',
      headline: 'Nothing is switched on at signature.',
      phases: [
        { label: 'Days 1 to 30', body: 'BAA executed. Read-only connection to the practice management system and the phone platform. Baseline measured, including the demand nobody can currently attribute.' },
        { label: 'Days 31 to 60', body: 'Reason taxonomy applied to calls and reviewed with the front desk. Page classification and the gateway policy configured and tested in the sandbox.' },
        { label: 'Days 61 to 90', body: 'Cost per attended patient by service and location. First reallocation decision made against capacity rather than lead volume.' },
      ],
    },
    regulatory: {
      eyebrow: 'REGULATORY NOTES',
      headline: 'What applies, and what we are not saying.',
      notes: [
        'A BAA is executed before any PHI is processed. PHI handling is enabled in phases against named HIPAA Security Rule control domains.',
        'Call recording and transcription obligations differ by jurisdiction and by US state. Those decisions are yours to make with counsel.',
        'No certification is claimed. No SOC 2, no HITRUST, no approval from any authority.',
        'Nothing here is legal or clinical advice.',
      ],
    },
    proofSlots: [
      'Dental pilot reference. Requires written client approval before naming.',
      'Before and after access figures, once the pilot permits publication.',
    ],
  },

  dashboard: {
    funnelStages: [
      { label: 'Enquiries', plane: 'boundary' },
      { label: 'Booked', plane: 'boundary' },
      { label: 'Attended', plane: 'protected' },
      { label: 'Treatment started', plane: 'protected' },
    ],
    dateRanges: [
      { id: '30d', label: 'Last 30 days', multiplier: 1 },
      { id: '90d', label: 'Last 90 days', multiplier: 2.8 },
      { id: '12m', label: 'Last 12 months', multiplier: 11.2 },
    ],
    locations: ['Riverside', 'Lakeview'],
    services: ['Implants', 'Orthodontics', 'Hygiene', 'Emergency'],
    valuePrefix: '$',
    rows: [
      { source: 'Google Ads', location: 'Riverside', service: 'Implants', spend: 4200, stages: [64, 31, 24, 9], value: 41400 },
      { source: 'Google Ads', location: 'Lakeview', service: 'Orthodontics', spend: 2600, stages: [41, 22, 17, 7], value: 22800 },
      { source: 'Google organic', location: 'Riverside', service: 'Hygiene', spend: 0, stages: [58, 39, 34, 31], value: 6100 },
      { source: 'Google Business Profile', location: 'Lakeview', service: 'Emergency', spend: 0, stages: [47, 34, 30, 28], value: 9400 },
      { source: 'Meta', location: 'Riverside', service: 'Orthodontics', spend: 1900, stages: [36, 12, 8, 3], value: 9600 },
      { source: 'Referral', location: 'Riverside', service: 'Implants', spend: 0, stages: [22, 18, 16, 11], value: 52800 },
      { source: 'Direct and repeat', location: 'Lakeview', service: 'Hygiene', spend: 0, stages: [69, 58, 52, 48], value: 9600 },
      {
        source: '(unmapped source)',
        location: 'Riverside',
        service: 'Hygiene',
        spend: 0,
        stages: [56, 33, 26, 18],
        value: 14200,
        unmapped: true,
      },
    ],
    capacity: [
      { location: 'Riverside', service: 'Implants', utilisation: 112 },
      { location: 'Riverside', service: 'Orthodontics', utilisation: 78 },
      { location: 'Riverside', service: 'Hygiene', utilisation: 94 },
      { location: 'Riverside', service: 'Emergency', utilisation: 52 },
      { location: 'Lakeview', service: 'Implants', utilisation: 48 },
      { location: 'Lakeview', service: 'Orthodontics', utilisation: 104 },
      { location: 'Lakeview', service: 'Hygiene', utilisation: 81 },
      { location: 'Lakeview', service: 'Emergency', utilisation: 57 },
    ],
    actions: [
      {
        id: 'd1',
        title: 'Move implant spend from Riverside to Lakeview',
        rationale:
          'Riverside implant chairs are over-committed at 112% while Lakeview sits at 48%. Riverside spend is buying a waiting list.',
        effect: 'Same spend, more attended implant consultations',
        location: 'Lakeview',
        service: 'Implants',
      },
      {
        id: 'd2',
        title: 'Fix the Meta orthodontics leak before spending more',
        rationale:
          '36 enquiries produced 8 attended patients. The drop-off is between enquiry and booking, not between click and enquiry.',
        effect: 'Recover attended patients already being paid for',
        location: 'Riverside',
        service: 'Orthodontics',
      },
      {
        id: 'd3',
        title: 'Resolve the unmapped source before the next budget review',
        rationale:
          '14% of enquiries cannot be attributed to any channel. Every reallocation decision is being made on the other 86%.',
        effect: 'Attribution you can defend to finance',
        location: 'Riverside',
        service: 'Hygiene',
      },
    ],
    connectors: [
      { name: 'Practice management system', state: 'ok', updated: '14 min ago', note: 'Appointments and attendance current.' },
      { name: 'Call platform', state: 'ok', updated: '9 min ago', note: 'All lines reporting.' },
      { name: 'Paid media', state: 'stale', updated: '6 hours ago', note: 'Cost figures lag the platform by one refresh.' },
      { name: 'Review sources', state: 'failed', updated: '2 days ago', note: 'Credential expired. Patient voice is incomplete.' },
    ],
  },
};
