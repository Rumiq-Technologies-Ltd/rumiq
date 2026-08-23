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
