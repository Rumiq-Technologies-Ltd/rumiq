/**
 * Platform deep pages — Specification Sections 8.3 to 8.7.
 * All copy lives here (Section 12). Pages are composition only.
 */

type Step = { label: string; body: string };
type Callout = { eyebrow: string; body: string };

export const privacyGatewayPage = {
  hero: {
    eyebrow: 'PRIVACY AND DATA GATEWAY',
    headline: 'Default deny. Then prove it.',
    subhead:
      'Every event is classified before it routes anywhere. Sensitive page classes are blocked outright, health-adjacent values are redacted or generalised, and every decision is written to a ledger with the policy version that permitted it.',
    primary: { label: 'Book a working session', href: '/contact' },
    secondary: { label: 'See the platform', href: '/platform' },
    assurances: [
      'No choice recorded means no permission',
      'US-region PHI hosting by default',
      'BAA before any PHI is processed',
    ],
  },
  how: {
    eyebrow: 'HOW IT DECIDES',
    headline: 'Four questions, in this order, every time.',
    steps: [
      { label: 'What kind of page is this?', body: 'Marketing, service, conversion form, portal, clinical intake. The class travels with the event and decides the default.' },
      { label: 'What has this person permitted?', body: 'Consent and preference state is read per destination. No record means denied, for every non-essential destination.' },
      { label: 'Which fields may this destination receive?', body: 'Per-destination field policy. Health-adjacent values are redacted or generalised rather than passed through.' },
      { label: 'What just happened, and under which policy?', body: 'The decision, the field count and the policy version are appended to the disclosure ledger.' },
    ] satisfies Step[],
  },
  hardLine: {
    eyebrow: 'THE LINE',
    body: 'Internal attribution does not imply permission to transmit. What you are allowed to know is not the same as what you are allowed to send.',
  },
  assurance: {
    eyebrow: 'WHAT WE DO AND DO NOT CLAIM',
    headline: 'Designed for HIPAA obligations. Not certified by anybody.',
    points: [
      'The platform is designed to support HIPAA obligations, with a BAA executed before any PHI is processed.',
      'PHI handling is enabled in phases against named Security Rule control domains, not switched on at signature.',
      'No SOC 2 or HITRUST certification is claimed. An assurance roadmap exists and carries no dates.',
      'Nothing here is legal advice. Validate your obligations with counsel.',
    ],
    link: { label: 'Trust Center', href: '/trust' },
  },
} as const;

export const patientAccessPage = {
  hero: {
    eyebrow: 'PATIENT ACCESS INTELLIGENCE',
    headline: 'The phone is where growth leaks. It is also the least measured thing you own.',
    subhead:
      'Calls, forms, chat and text, measured against what happened next: answered or missed, new or existing, booked or not, and the reason it did not happen. Every machine label is open to human correction.',
    primary: { label: 'Book a working session', href: '/contact' },
    secondary: { label: 'Open the demo', href: '/demo/call-intelligence' },
    assurances: [
      'Runs alongside your existing phone system',
      'Eight-item reason taxonomy, human-correctable',
      'Nothing reaches an ad platform without passing the gateway',
    ],
  },
  how: {
    eyebrow: 'WHAT IT MEASURES',
    headline: 'Not call volume. What the call was worth.',
    steps: [
      { label: 'Answered, missed, abandoned', body: 'By hour, by line and by location, so the pattern behind the missed calls is visible rather than averaged away.' },
      { label: 'New against existing', body: 'A busy phone full of existing patients is a different problem from a busy phone full of new ones.' },
      { label: 'Reason for contact', body: 'An eight-item taxonomy, applied consistently, with a confidence score attached to every classification.' },
      { label: 'Why it did not book', body: 'The single most useful field in the system, and the one no reporting tool holds today.' },
    ] satisfies Step[],
  },
  /** Section 8.4 — the recording callout. Amber, because it is a policy moment. */
  recordingCallout: {
    eyebrow: 'CALL RECORDING AND JURISDICTION',
    body: 'Call recording and transcription obligations differ by jurisdiction, and in the United States they differ by state. Whether calls are recorded, what callers are told, and how long recordings are retained are the provider\u2019s decisions to make with counsel. Rumiq does not provide legal advice on recording consent, and the platform is designed to operate either way: with recordings and transcripts, or on call metadata and human-entered outcomes alone.',
  },
  humanLoop: {
    eyebrow: 'THE CORRECTION LOOP',
    headline: 'A classification nobody can overrule is a classification nobody trusts.',
    body: 'Anything below the confidence threshold is flagged for review rather than quietly counted. A human can change any label, the record shows the human answer, and the change is written to the audit trail with who made it and when.',
  },
} as const;

export const growthIntelligencePage = {
  hero: {
    eyebrow: 'GROWTH INTELLIGENCE AND PATIENT VOICE',
    headline: 'One number the whole business can argue about honestly.',
    subhead:
      'Spend, access, attendance, delivered care and patient feedback in one view, with the gaps shown rather than smoothed. Cost per attended patient, stage by stage drop-off, and the capacity you actually have.',
    primary: { label: 'Book a working session', href: '/contact' },
    secondary: { label: 'Open the demo', href: '/demo/dashboard' },
    assurances: [
      'Internal attribution only',
      'Unmapped demand is shown, not hidden',
      'Same measurement layer across sectors',
    ],
  },
  how: {
    eyebrow: 'WHAT IT JOINS',
    headline: 'The join marketing tools cannot make.',
    steps: [
      { label: 'Demand and spend', body: 'By channel, service and location, against the capacity that exists to serve it.' },
      { label: 'Access and conversion', body: 'Enquiries, bookings and the reasons bookings did not happen.' },
      { label: 'Attendance and delivered care', body: 'The point at which revenue exists, rather than the point at which a form was submitted.' },
      { label: 'Patient voice', body: 'What patients said, routed back to the operational owner who can act on it.' },
    ] satisfies Step[],
  },
  honesty: {
    eyebrow: 'WHAT A HONEST DASHBOARD LOOKS LIKE',
    headline: 'It shows you the number it cannot explain.',
    body: 'Every real dataset has demand that cannot be attributed. Most dashboards quietly redistribute it and present a clean picture. Rumiq shows it as its own row, with a data-quality warning, because a reallocation decision made on the attributable portion alone is a decision made on partial evidence.',
  },
} as const;

export const connectorsPage = {
  hero: {
    eyebrow: 'KNOWLEDGE GRAPH AND CONNECTOR LAYER',
    headline: 'Read the systems you already run. Change none of them.',
    subhead:
      'The connector layer reads operational systems, phones, forms and review sources; the knowledge graph turns each source\u2019s own vocabulary into one canonical model. Your system of record stays your system of record.',
    primary: { label: 'Book a working session', href: '/contact' },
    secondary: { label: 'See the data model', href: '/platform' },
    assurances: [
      'Read the minimum necessary',
      'Gaps reported, never estimated',
      'Freshness stated on every figure',
    ],
  },
  /** Section 8.6 — the two-pilot argument. Curve Dental may be named.
   *  Nothing on the transport side may be: no dispatch platform, no broker. */
  twoPilots: {
    eyebrow: 'WHY TWO VERY DIFFERENT PILOTS',
    headline: 'One runs on Curve Dental. The other runs on a dispatch platform.',
    body: 'Neither the measurement layer nor the privacy gateway needs to know the difference. That is the whole argument for building the connector layer and the knowledge graph before building anything sector-specific: if the same canonical model can carry a two-location dental group and a patient transport operator, it can carry the next one without a rewrite.',
    note: 'Naming beyond this is deliberate. The transport pilot\u2019s architecture work has not started, so no system, integration or partner is named on either side of it.',
  },
  how: {
    eyebrow: 'HOW A SOURCE IS ONBOARDED',
    headline: 'Read, map, verify, report the gaps.',
    steps: [
      { label: 'Read', body: 'Whatever the source will give: an API, an export, a report, a feed. The minimum necessary, no more.' },
      { label: 'Map', body: 'The source\u2019s own vocabulary is mapped to the canonical services, locations and providers.' },
      { label: 'Verify', body: 'Counts are reconciled against the source before any figure is shown to anyone.' },
      { label: 'Report the gaps', body: 'What this source cannot tell you is stated on the panel, next to what it can.' },
    ] satisfies Step[],
  },
  freshness: {
    eyebrow: 'FRESHNESS IS PART OF THE NUMBER',
    body: 'Every panel states which connector produced it and when it last ran. A stale figure presented as current is worse than no figure, because somebody will act on it.',
  },
} as const;

export const contentPage = {
  hero: {
    eyebrow: 'CONTENT AND DISCOVERY',
    headline: 'Patients ask an assistant before they ask you.',
    subhead:
      'Search, maps, directories and AI assistants now decide who gets considered. Rumiq treats healthcare content as an operational asset: reviewed, structured, multilingual, and measured on whether it produced patients.',
    primary: { label: 'Book a working session', href: '/contact' },
    secondary: { label: 'See the platform', href: '/platform' },
    assurances: [
      'Named clinical reviewer on every page',
      'Multilingual, including Arabic',
      'Public plane only, no patient data',
    ],
  },
  grader: {
    eyebrow: 'THE HEALTHCARE CONTENT GRADER',
    headline: 'Eight criteria. Most provider pages fail four of them.',
    standfirst:
      'The criteria are not a style guide. They are what determines whether a page gets surfaced by a search engine, cited by an assistant, and trusted by the person reading it.',
    criteria: [
      { name: 'Clinical accuracy and review', test: 'Is there a named, credentialed reviewer and a review date?' },
      { name: 'Answer completeness', test: 'Does the page answer the question a patient actually typed, in the first screen?' },
      { name: 'Machine-readable structure', test: 'Can a crawler tell what service this is, where it is offered and by whom?' },
      { name: 'Entity clarity', test: 'Are the service, location and provider unambiguous and consistently named across the site?' },
      { name: 'Language and reading level', test: 'Is it readable by the patient rather than by the clinician who wrote it?' },
      { name: 'Multilingual parity', test: 'Does the second language get a real page, or a machine translation nobody reviewed?' },
      { name: 'Local specificity', test: 'Does it say anything true about this location that a template could not say?' },
      { name: 'Conversion path', test: 'Can the reader do the next thing without leaving the page to find out how?' },
    ],
    note: 'Grading criteria, not scores. No page has been graded here, and no benchmark figure is claimed.',
  },
  discovery: {
    eyebrow: 'WHERE THIS SHOWS UP',
    headline: 'Four surfaces, one set of facts.',
    steps: [
      { label: 'Search', body: 'Service and location pages that answer the query rather than restating the service name.' },
      { label: 'Maps and local', body: 'Consistent entity data across profiles, hours and service lists, per location.' },
      { label: 'Directories', body: 'The listings patients trust, kept in step with what the practice actually offers.' },
      { label: 'AI assistants', body: 'Structured, attributable facts an assistant can cite without inventing the gaps.' },
    ] satisfies Step[],
  },
  boundary: {
    eyebrow: 'WHERE THE BOUNDARY SITS',
    body: 'Everything in this module lives in the public plane. No patient data is used to generate content, and no page in this module carries a patient identifier. What changes is the page class attached to each page, which is what the gateway reads when it decides whether an event may leave.',
  } satisfies Callout,
} as const;
