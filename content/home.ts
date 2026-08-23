import type { Plane } from '@/lib/planes';

/**
 * Homepage copy — Specification Section 8.1, verbatim where the spec supplies
 * final copy. Section 12: no page copy inside components, because this will be
 * revised repeatedly over the next six months.
 *
 * Primary reader: owner / CEO / managing partner, with the marketing director
 * and the compliance reader served by the regions and boundary sections.
 */

/** The neutral default hero. Solutions pages override these from their sector
 *  config (Section 8.8); the component takes them as props. */
export const heroDefaults = {
  eyebrow: 'PLANE: PUBLIC → PROTECTED',
  headline:
    'Know which marketing actually produces patients. Without handing patient data to ad platforms.',
  subhead:
    'Rumiq connects your marketing, your phones and your operational systems into one governed view of growth. From first search to delivered care. Your systems stay yours. Only the minimum necessary crosses the line.',
} as const;

export const home = {
  hero: {
    primary: { label: 'Book a working session', href: '/contact' },
    secondary: { label: 'See the platform', href: '/platform' },
    /** Monospace strip under the buttons. Answers the three fastest objections. */
    assurances: [
      'US-region PHI hosting by default',
      'BAA before any PHI is processed',
      'Your systems remain the source of record',
    ],
  },

  benefits: [
    {
      title: 'See the whole journey',
      body: 'Most stacks stop at the lead. Rumiq measures through booking, attendance and delivered care, so you can tell the difference between a cheap lead and a patient who actually turned up.',
    },
    {
      title: 'Hold the boundary',
      body: 'Every event is classified before it routes anywhere. Sensitive pages and forms are blocked by default. Every disclosure is logged with the policy version that permitted it.',
    },
    {
      title: 'Grow where you have capacity',
      body: 'Demand is matched to the services, locations and teams that actually have room. The question stops being "which channel got the lead" and becomes "where should the next dollar go."',
    },
  ],

  problem: {
    eyebrow: 'THE OPERATIONAL REALITY',
    headline: 'Your growth data is scattered across systems that were never designed to talk.',
    body: 'Search, Google Business Profile, paid media, social, the website, calls, forms, scheduling, your operational system, reviews, email, WhatsApp. Each one holds a fragment. None holds the answer.',
    lead: 'So the questions that should be simple stay unanswerable:',
    questions: [
      'Which channels generate useful patient demand, not just clicks?',
      'Where are calls, forms and appointments leaking before a patient is seen?',
      'Which services and locations deserve more investment, given capacity?',
      'How do we manage multilingual, local and AI-driven discovery consistently?',
      'How do we measure marketing without exposing patient data to ad platforms?',
      'How does patient feedback get back into operational decisions?',
    ],
  },

  planes: {
    eyebrow: 'THE ARCHITECTURE',
    headline: 'Two planes, and a boundary you can inspect.',
    caption:
      'Ten modules. Deploy one or all of them. They share the same knowledge, policy and audit foundation.',
    link: { label: 'See the platform', href: '/platform' },
    hint: 'Point at a module to trace its data path across the planes.',
    columns: [
      {
        plane: 'public' as Plane,
        title: 'Public plane',
        modules: [
          'Search, Local and AI Discovery',
          'Paid media and patient acquisition',
          'Website and landing journeys',
          'Content and social',
        ],
      },
      {
        plane: 'boundary' as Plane,
        title: 'Orchestration',
        modules: [
          'Knowledge Graph',
          'Privacy and Data Gateway',
          'Consent and Preference Service',
          'Connector Layer',
          'Patient Access Intelligence',
          'Growth Intelligence',
        ],
      },
      {
        plane: 'protected' as Plane,
        title: 'Protected plane',
        modules: [
          'Operational system',
          'Appointments and trips',
          'Care delivered',
          'Retention and recall',
        ],
      },
    ],
  },

  funnel: {
    eyebrow: 'THE JOURNEY WE MEASURE',
    headline: "Marketing stops at the lead. The revenue doesn't happen until care is delivered.",
    label: 'The clinical growth journey, seventeen stages',
  },

  demoTeaser: {
    eyebrow: 'THE PRODUCT SURFACE',
    headline: 'A control surface, not a slide.',
    body: 'The Growth Intelligence dashboard, the Policy Sandbox and the call review interface all run in the browser on synthetic data. Nothing is a screenshot.',
    cta: { label: 'Explore the demo', href: '/demo/policy-sandbox' },
  },

  whoItsFor: {
    eyebrow: 'WHO IT IS FOR',
    headline: 'One governed layer. Very different operations.',
    cards: [
      {
        title: 'Independent single-site providers',
        problem:
          'You are the marketing department, and you already have a job. Clicks and maybe leads are visible. Which of it produced a patient who turned up is not.',
        href: '/solutions/independent',
      },
      {
        title: 'Dental practices, groups and DSOs',
        problem:
          'New patient volume stalls while call volume stays high. Treatment plan acceptance is invisible to marketing, so the practice optimises for cheap leads.',
        href: '/solutions/dental',
      },
      {
        title: 'Multi-site and specialty clinics',
        problem:
          'No consistent view of which location and service combination is profitable. Spend spreads evenly across locations that are not evenly full.',
        href: '/solutions/multi-site',
      },
      {
        title: 'Patient transport and NEMT',
        problem:
          'Completed trips and revenue are visible. Which relationships actually generate them, and where requests drop out of the booking chain, are not.',
        href: '/solutions/transport',
      },
      {
        title: 'Hospital and health system marketing',
        problem:
          'Tracker restrictions gutted the conversion signal. Marketing cannot prove impact to finance, and compliance blocks every proposed fix.',
        href: '/solutions/health-systems',
      },
    ],
  },

  regions: {
    eyebrow: 'WHERE THIS RUNS',
    headline: 'Two regions, two regulatory realities, one architecture.',
    panels: [
      {
        plane: 'public' as Plane,
        name: 'United States',
        residency: 'US-region PHI hosting by default.',
        framework:
          'Built for HIPAA obligations, with a BAA executed before any PHI is processed and phased PHI enablement against named Security Rule controls.',
        href: '/regions/united-states',
      },
      {
        plane: 'protected' as Plane,
        name: 'Gulf',
        residency: 'Designed around regional residency and cross-border transfer requirements.',
        framework:
          'UAE Federal Decree-Law No. 45 of 2021 and DIFC Data Protection Law No. 5 of 2020, with DHA, DoH Abu Dhabi and MOHAP requirements treated as design considerations. Arabic and multilingual patient access, and WhatsApp as a primary channel.',
        href: '/regions/gulf',
      },
    ],
    note: 'No certification or approval from any authority is claimed. Validate obligations with local counsel.',
  },

  proof: {
    eyebrow: 'WHERE WE ARE',
    headline: 'Two pilots running. A small number of design partner slots open.',
    body: 'Rumiq is being built with providers rather than at them. The first implementations are a two-location dental group in Florida and a non-emergency medical transportation operator. One runs on a dental practice management system, the other on dispatch software. Neither the measurement layer nor the privacy gateway needs to know the difference. That is the point.',
    second: 'Every decision made in either pilot becomes a reusable playbook, schema or platform requirement.',
    cta: { label: 'Read how engagements run', href: '/approach' },
    slots: [
      'Pilot reference card. Requires written client approval before either pilot is named.',
      'Second pilot reference card.',
      'Design partner terms summary, pending sign-off.',
    ],
  },

  faq: {
    eyebrow: 'QUESTIONS',
    headline: 'The questions buyers actually ask.',
    /** Section 15: no FAQ entry may exist that is not in Document 05, and
     *  Document 05 arrives at Prompt 11. The section renders its placeholder
     *  until then rather than inventing copy. */
    pending:
      'FAQ copy comes from Document 05 verbatim, placed by its placement map. Not yet supplied.',
  },
} as const;
