import { transportFunnel } from '@/content/funnels';
import type { SectorConfig } from './types';

/**
 * Transport operator. Synthetic data throughout.
 *
 * Deliberately generic (Sections 0.3, 4.5, 8.8): the pilot architecture work
 * has not started, so this makes no claim about how a real transport operation
 * is structured, names no dispatch system and mentions no brokers. Volumes are
 * plausible and nothing more.
 */
export const transport: SectorConfig = {
  id: 'transport',
  label: 'Transport operator',
  href: '/solutions/transport',
  vocabulary: {
    unit: 'journey',
    units: 'journeys',
    outcome: 'Completed',
    capacityNoun: 'Vehicle utilisation',
    siteNoun: 'Service area',
    serviceNoun: 'Journey type',
    costPerOutcome: 'Cost per completed journey',
    costStageIndex: 3,
  },
  hero: {
    eyebrow: 'PATIENT TRANSPORT AND NEMT',
    headline: 'Journeys get completed. Nobody can say which relationships produced them.',
    subhead:
      'Rumiq measures demand through to completed journeys, so you can see which relationships are growing, which are quietly shrinking, and where requests drop out.',
    sharpestProblem:
      'Completed journeys and revenue are visible. Which relationships actually generate them, and where requests drop out of the booking chain, are not.',
    assurances: [
      'Works alongside your existing dispatch platform',
      'No patient detail leaves for any ad platform',
      'Every disclosure logged with its policy version',
    ],
  },
  page: {
    problem: {
      eyebrow: 'THE PROBLEM',
      headline: 'You know how many journeys you completed. You do not know which relationships produced them.',
      body: 'Completed journeys and revenue are visible at the end of the month. Where the work came from, and where requests fell out of the chain before dispatch ever saw them, is not.',
    },
    failureModes: [
      {
        title: 'Enquiries that never become requests',
        body: 'A call or a form arrives, and no booking follows. Nobody records whether it was capacity, timing, coverage or a service you do not run.',
        cost: 'Demand lost before dispatch is even involved',
      },
      {
        title: 'Referral sources that quietly stop',
        body: 'A relationship that used to send regular work sends less, and the drift is only noticed when a quarter is already down.',
        cost: 'Months of decline before anyone can name it',
      },
      {
        title: 'Growth sold into full vehicles',
        body: 'New work is chased in the areas and journey types already at capacity, while quieter capacity goes unsold.',
        cost: 'Reliability spent on journeys you could not comfortably take',
      },
    ],
    modules: {
      eyebrow: 'WHICH MODULES, IN WHAT ORDER',
      headline: 'Booking chain first. Relationships second.',
      steps: [
        { name: 'Healthcare Connector Layer', why: 'Read the booking and scheduling record you already keep, whatever it runs on.' },
        // Sector-facing name for Patient Access Intelligence. This page uses the
        // operator's vocabulary, not clinical vocabulary (Section 8.8).
        { name: 'Enquiry and booking intelligence', why: 'Measure enquiries and requests against completed journeys.' },
        { name: 'Privacy and Data Gateway', why: 'Keep passenger detail inside the operation while measurement happens.' },
        { name: 'Growth Intelligence', why: 'Completed journeys by area, journey type and referral source.' },
        { name: 'Search, Local and AI Discovery', why: 'Only once you know which work is worth attracting.' },
      ],
    },
    first90: {
      eyebrow: 'THE FIRST 90 DAYS',
      headline: 'Read-only first, and slowly.',
      phases: [
        { label: 'Days 1 to 30', body: 'Agreements in place. Read-only view of enquiries, bookings and completed journeys. Baseline measured, including the requests with no traceable source.' },
        { label: 'Days 31 to 60', body: 'Enquiry reasons captured consistently at the point of contact, reviewed with the booking team rather than imposed on them.' },
        { label: 'Days 61 to 90', body: 'Completed journeys by area, journey type and referral source, with capacity shown alongside. First relationship review run on evidence.' },
      ],
    },
    regulatory: {
      eyebrow: 'REGULATORY NOTES',
      headline: 'Deliberately unspecific, because the work has not been done.',
      notes: [
        'This engagement is at pilot stage. The architecture work has not started, so no integration, system or partner is named here.',
        'Where passenger information is involved, agreements are executed before any of it is processed.',
        'No certification or approval from any authority is claimed.',
        'Nothing here is legal advice. Validate your obligations with counsel.',
      ],
    },
    proofSlots: [
      'Transport pilot reference. Requires written client approval before naming.',
      'Booking chain figures, once the pilot permits publication.',
    ],
    funnel: { label: 'The journey, seven stages', stages: transportFunnel },
  },

  dashboard: {
    funnelStages: [
      { label: 'Enquiries', plane: 'boundary' },
      { label: 'Requests', plane: 'boundary' },
      { label: 'Scheduled', plane: 'protected' },
      { label: 'Completed', plane: 'protected' },
    ],
    dateRanges: [
      { id: '30d', label: 'Last 30 days', multiplier: 1 },
      { id: '90d', label: 'Last 90 days', multiplier: 2.9 },
      { id: '12m', label: 'Last 12 months', multiplier: 11.6 },
    ],
    locations: ['North area', 'South area'],
    services: ['Scheduled', 'Recurring', 'Same-day'],
    valuePrefix: '$',
    rows: [
      { source: 'Facility relationships', location: 'North area', service: 'Recurring', spend: 0, stages: [186, 174, 168, 161], value: 48300 },
      { source: 'Facility relationships', location: 'South area', service: 'Scheduled', spend: 0, stages: [142, 121, 112, 104], value: 31200 },
      { source: 'Search', location: 'North area', service: 'Same-day', spend: 1400, stages: [88, 44, 36, 29], value: 8700 },
      { source: 'Directory listings', location: 'South area', service: 'Same-day', spend: 600, stages: [54, 27, 22, 18], value: 5400 },
      { source: 'Inbound phone', location: 'North area', service: 'Scheduled', spend: 0, stages: [96, 71, 66, 61], value: 18300 },
      { source: 'Repeat requester', location: 'South area', service: 'Recurring', spend: 0, stages: [124, 118, 114, 109], value: 32700 },
      {
        source: '(unmapped source)',
        location: 'North area',
        service: 'Scheduled',
        spend: 0,
        stages: [115, 84, 77, 69],
        value: 20800,
        unmapped: true,
      },
    ],
    capacity: [
      { location: 'North area', service: 'Scheduled', utilisation: 96 },
      { location: 'North area', service: 'Recurring', utilisation: 108 },
      { location: 'North area', service: 'Same-day', utilisation: 54 },
      { location: 'South area', service: 'Scheduled', utilisation: 57 },
      { location: 'South area', service: 'Recurring', utilisation: 101 },
      { location: 'South area', service: 'Same-day', utilisation: 58 },
    ],
    actions: [
      {
        id: 't1',
        title: 'Recurring work in the north area is over-committed',
        rationale:
          'Recurring journeys are running at 108% of available vehicle time while same-day sits at 54%. Growth here costs reliability.',
        effect: 'Protect on-time performance on the work you already hold',
        location: 'North area',
        service: 'Recurring',
      },
      {
        id: 't2',
        title: 'Half of same-day enquiries never become requests',
        rationale:
          '88 enquiries produced 36 scheduled journeys. The loss is at the request stage, before dispatch is involved at all.',
        effect: 'More completed journeys with no additional demand spend',
        location: 'North area',
        service: 'Same-day',
      },
      {
        id: 't3',
        title: 'Name the unmapped source before the next relationship review',
        rationale:
          '14% of enquiries cannot be traced to a relationship, which is exactly the number the review depends on.',
        effect: 'Relationship reporting you can take into a meeting',
        location: 'North area',
        service: 'Scheduled',
      },
    ],
    connectors: [
      { name: 'Dispatch platform', state: 'ok', updated: '22 min ago', note: 'Scheduled and completed journeys current.' },
      { name: 'Call platform', state: 'ok', updated: '11 min ago', note: 'All lines reporting.' },
      { name: 'Paid media', state: 'stale', updated: '7 hours ago', note: 'Cost figures lag by one refresh.' },
      { name: 'Directory listings', state: 'failed', updated: '3 days ago', note: 'Feed rejected. Listing performance incomplete.' },
    ],
  },
};
