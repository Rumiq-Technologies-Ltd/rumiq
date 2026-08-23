import type { Plane } from '@/lib/planes';

/**
 * /platform copy — Specification Section 8.2.
 * Primary reader: the technically literate evaluator. Ten modules, three planes,
 * one canonical data model.
 */

export type PlatformModule = {
  id: string;
  name: string;
  /** One sentence on what it does. Section 8.2. */
  description: string;
  plane: Plane;
  /** Deep page, where one exists. Modules without one open a detail drawer. */
  href?: string;
  /** Drawer content for modules with no page yet. */
  detail: {
    problem: string;
    does: string[];
    boundary: string;
  };
};

export const platform = {
  hero: {
    eyebrow: 'THE PLATFORM',
    headline: 'Ten modules. Three planes. One boundary you can inspect.',
    subhead:
      'Rumiq is not a replacement for your operational system. It is the governed layer around it: it reads what it needs, decides what may leave, and gives you one view of growth from first search to delivered care.',
    primary: { label: 'Book a working session', href: '/contact' },
    secondary: { label: 'Open the Policy Sandbox', href: '/demo/policy-sandbox' },
    assurances: [
      'Deploy one module or all ten',
      'Your operational system stays the source of record',
      'Every disclosure logged with its policy version',
    ],
  },

  diagram: {
    eyebrow: 'THE ARCHITECTURE',
    headline: 'Where each module sits, and what crosses the line.',
    standfirst:
      'The public plane never sees patient data. The protected plane never talks to an ad platform. Everything between them is a decision, and every decision is recorded.',
  },

  planeSections: [
    {
      plane: 'public' as Plane,
      eyebrow: 'PUBLIC PLANE',
      title: 'Demand and engagement',
      standfirst:
        'Everything a prospective patient can see. No patient data lives here, and none is sent here.',
    },
    {
      plane: 'boundary' as Plane,
      eyebrow: 'BOUNDARY',
      title: 'Orchestration and governance',
      standfirst:
        'Where events are classified, consent is resolved, disclosures are decided and the record is written.',
    },
    {
      plane: 'protected' as Plane,
      eyebrow: 'PROTECTED PLANE',
      title: 'Operations and outcomes',
      standfirst:
        'Where care actually happens. Rumiq reads the minimum necessary and writes back nothing your system did not ask for.',
    },
  ],

  /** Section 1 — the ten modules, in their planes. */
  modules: [
    {
      id: 'discovery',
      name: 'Search, Local and AI Discovery',
      description:
        'Keeps your services findable across search, maps, directories and AI assistants, per location and per language.',
      plane: 'public',
      href: '/platform/content',
      detail: {
        problem: 'Patients now ask an assistant before they ask a search engine.',
        does: [
          'Service and location entity coverage',
          'Answer coverage for the questions patients actually ask',
          'Visibility tracking across search, maps and AI answers',
        ],
        boundary: 'Public plane only. Reads published information, never patient records.',
      },
    },
    {
      id: 'paid-media',
      name: 'Paid Media and Patient Acquisition',
      description:
        'Runs acquisition against attended-patient outcomes rather than form fills, using conversion signals the gateway has cleared.',
      plane: 'public',
      detail: {
        problem:
          'Ad platforms optimise for the events they receive. Feed them lead forms and you get lead forms.',
        does: [
          'Campaign structure by service, location and capacity',
          'Cleared conversion signals only, never patient detail',
          'Spend reallocation against downstream outcomes',
        ],
        boundary:
          'Receives only what the Privacy and Data Gateway permits for the destination in question.',
      },
    },
    {
      id: 'content-social',
      name: 'Content and Social Orchestration',
      description:
        'Plans, reviews and publishes clinical and service content with an approval trail, across languages and channels.',
      plane: 'public',
      detail: {
        problem: 'Clinical content needs review, and review is where publishing dies.',
        does: [
          'Editorial pipeline with named reviewers',
          'Multilingual variants, including Arabic',
          'Channel scheduling and reuse',
        ],
        boundary: 'Public plane only. No patient data is used to generate content.',
      },
    },
    {
      id: 'website',
      name: 'Website and Landing Journeys',
      description:
        'Service and location journeys built to convert, with sensitive pages classified before a single event is emitted.',
      plane: 'public',
      detail: {
        problem:
          'The page that converts best is often the page that must not be tracked in the usual way.',
        does: [
          'Service and location page structure',
          'Page classification at the point of publication',
          'Form and call handoff into patient access',
        ],
        boundary:
          'Page class travels with every event. Clinical intake and portal pages are denied by default.',
      },
    },
    {
      id: 'knowledge-graph',
      name: 'Healthcare Knowledge Graph',
      description:
        'The shared model of your services, locations, providers, payers and languages that every other module reads from.',
      plane: 'boundary',
      detail: {
        problem:
          'Every system spells your services differently, so nothing can be compared across them.',
        does: [
          'Canonical services, locations, providers and payer context',
          'Mapping from each source system\u2019s own vocabulary',
          'The join that makes cross-system measurement possible',
        ],
        boundary:
          'Holds structure, not patients. Identifiers are referenced, never duplicated into the public plane.',
      },
    },
    {
      id: 'privacy-gateway',
      name: 'Privacy and Data Gateway',
      description:
        'Classifies every event, decides what may leave for each destination, and logs the decision with its policy version.',
      plane: 'boundary',
      href: '/platform/privacy-gateway',
      detail: {
        problem: 'Most stacks decide what to send by default, and find out later what they sent.',
        does: [
          'Page and event classification',
          'Per-destination field policy with default deny',
          'Immutable disclosure ledger',
        ],
        boundary: 'This module is the boundary. Everything else routes through it.',
      },
    },
    {
      id: 'consent',
      name: 'Consent and Preference Service',
      description:
        'Holds the current consent and channel preference for each contact, and answers every routing question against it.',
      plane: 'boundary',
      detail: {
        problem: 'Consent captured in one channel is rarely honoured in the next.',
        does: [
          'Consent and preference state per contact and channel',
          'Versioned policy, so a decision can be explained after the fact',
          'Withdrawal that propagates rather than being filed',
        ],
        boundary:
          'No choice recorded means no permission. Absence of consent is never treated as consent.',
      },
    },
    {
      id: 'connectors',
      name: 'Healthcare Connector Layer',
      description:
        'Reads from operational systems, phones, forms and review sources, normalising each into the canonical model.',
      plane: 'boundary',
      href: '/platform/connectors',
      detail: {
        problem:
          'Every provider runs a different stack, and the interesting data is always in the one without an API.',
        does: [
          'Source-by-source ingestion with freshness reporting',
          'Normalisation into the knowledge graph',
          'Explicit handling of what a source cannot tell you',
        ],
        boundary:
          'Reads the minimum necessary. Where a source cannot be read cleanly, the gap is reported rather than estimated.',
      },
    },
    {
      id: 'patient-access',
      name: 'Patient Access Intelligence',
      description:
        'Measures calls, forms, chat and text against what happened next, including the reason a booking did not happen.',
      plane: 'protected',
      href: '/platform/patient-access',
      detail: {
        problem: 'The phone is the biggest leak in most practices, and the least measured.',
        does: [
          'Answered, missed and abandoned contact by hour and location',
          'Reason taxonomy for every enquiry',
          'Human correction of any machine classification',
        ],
        boundary:
          'Lives in the protected plane. Nothing from this module reaches an ad platform without passing the gateway.',
      },
    },
    {
      id: 'growth-intelligence',
      name: 'Growth Intelligence and Patient Voice',
      description:
        'Joins spend, access, attendance, delivered care and patient feedback into one view of where growth actually leaks.',
      plane: 'protected',
      href: '/platform/growth-intelligence',
      detail: {
        problem:
          'Marketing reports on leads, finance reports on revenue, and nobody owns the middle.',
        does: [
          'Cost per attended patient by service and location',
          'Stage-by-stage drop-off across the journey',
          'Patient feedback routed back to the operational owner',
        ],
        boundary:
          'Internal attribution only. What you are allowed to know is not the same as what you are allowed to send.',
      },
    },
  ] satisfies PlatformModule[],

  dataModel: {
    eyebrow: 'THE CANONICAL MODEL',
    headline: 'One data model, with a privacy class on every entity.',
    standfirst:
      'The privacy class is not documentation. It is what the gateway reads when it decides whether a field may leave, and it is why the same measurement layer can sit over a dental practice and a transport operator.',
    columns: {
      entity: 'Entity',
      fields: 'Representative fields',
      klass: 'Privacy class',
      plane: 'Lives in',
      note: 'Governing rule',
    },
    /** Colour coding: teal public, ink operational, amber policy, blue protected. */
    classes: [
      { id: 'public', label: 'Public', note: 'Publishable. No individual is identifiable.' },
      { id: 'operational', label: 'Operational', note: 'Internal business data. Not patient data.' },
      { id: 'policy', label: 'Policy-controlled', note: 'Governs what may leave. Read on every decision.' },
      { id: 'protected', label: 'Protected', note: 'Patient data. Never leaves the protected plane without an explicit permitted purpose.' },
    ],
    rows: [
      {
        entity: 'Service',
        fields: 'service_id, canonical_name, category, locations_offered',
        klass: 'public',
        plane: 'public' as Plane,
        note: 'Publishable. Generalised before it is sent to any ad destination.',
      },
      {
        entity: 'Location',
        fields: 'location_id, address, hours, capacity_profile',
        klass: 'public',
        plane: 'public' as Plane,
        note: 'Public, except capacity, which is operational.',
      },
      {
        entity: 'Provider',
        fields: 'provider_id, credentials, services, languages',
        klass: 'public',
        plane: 'public' as Plane,
        note: 'Published profile data only. Never joined to a named patient in the public plane.',
      },
      {
        entity: 'Campaign',
        fields: 'campaign_id, channel, spend, service_targeted, location_targeted',
        klass: 'operational',
        plane: 'public' as Plane,
        note: 'Spend is business data. It carries no patient signal.',
      },
      {
        entity: 'Session',
        fields: 'session_id, page_class, utm_source, gclid',
        klass: 'policy',
        plane: 'boundary' as Plane,
        note: 'Page class decides the default. Clinical intake and portal classes are denied outright.',
      },
      {
        entity: 'Consent record',
        fields: 'contact_ref, channel, state, policy_version, decided_at',
        klass: 'policy',
        plane: 'boundary' as Plane,
        note: 'No record means denied. Every disclosure decision cites the version that permitted it.',
      },
      {
        entity: 'Enquiry',
        fields: 'enquiry_id, channel, reason_code, outcome, confidence',
        klass: 'protected',
        plane: 'protected' as Plane,
        note: 'A generic conversion signal may leave. The reason and the free text may not.',
      },
      {
        entity: 'Appointment',
        fields: 'appointment_id, service_ref, location_ref, status, attended_at',
        klass: 'protected',
        plane: 'protected' as Plane,
        note: 'Counted internally. Never transmitted at the level of an individual.',
      },
      {
        entity: 'Episode of care',
        fields: 'episode_id, services_delivered, value, provider_ref',
        klass: 'protected',
        plane: 'protected' as Plane,
        note: 'The number the business runs on, and the one that must never leave.',
      },
      {
        entity: 'Patient voice',
        fields: 'feedback_id, source, sentiment, routed_to, resolved_at',
        klass: 'protected',
        plane: 'protected' as Plane,
        note: 'Reviews are public at source; the join back to an episode is not.',
      },
    ],
    note: 'Field names are illustrative. The shipped schema is defined per connector and per region.',
  },

  drawer: {
    problemLabel: 'The problem it addresses',
    doesLabel: 'What it does',
    boundaryLabel: 'Where the boundary sits',
    close: 'Close',
    noPage: 'No detail page yet. This is the working summary.',
  },
} as const;
