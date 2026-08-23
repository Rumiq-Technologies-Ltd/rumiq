import { SHOW_PRICING } from '@/lib/flags';

/**
 * FAQ content — Document 05, verbatim.
 *
 * RULES (Section 15, restated in Document 05 itself):
 *  • Every answer below is Document 05 text as written. Nothing is rewritten,
 *    shortened, expanded or "improved", and no entry exists here that is not in
 *    that file.
 *  • No number, percentage or timeframe has been added to any answer that did
 *    not already carry one. The absence is deliberate.
 *  • `hipaa`, `proof` and `timeline` are not softened. Their directness is the
 *    point.
 *  • Answers are plain prose. The only inline emphasis anywhere is the two-part
 *    structure of `whats-included`, which is intentional.
 *  • Placement is the Document 05 placement map and nothing else. Order within
 *    a page matters: on a solutions page the segment's own objection comes
 *    first, because it is the one the visitor arrived with.
 *
 * Copy lives here rather than in a component (Section 12), and the accordion
 * renders whatever this file gives it.
 */

/* -------------------------------------------------------------------------- */
/* Flags                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * `always`       renders whenever the FAQ appears on a listed page.
 * `pricing-on`   renders only while SHOW_PRICING is true.
 * `pricing-off`  renders only while SHOW_PRICING is false.
 *
 * The last two are the two halves of the same switch: `cost-with-numbers` and
 * `cost-no-numbers` answer the same question and SHOW_PRICING selects between
 * them. They are never both rendered, and no second flag was introduced to
 * manage it — Section 12 allows exactly three flags and this is not a fourth.
 */
export type FaqFlag = 'always' | 'pricing-on' | 'pricing-off';

/**
 * NOT a feature flag: a content approval gate.
 *
 * `proof` and `sectors` name the two pilots. Until Rumiq confirms written
 * client approval, the generic variants Document 05 supplies in square brackets
 * are the ones that render.
 *
 * TODO: confirm pilot naming approval
 */
const PILOT_NAMING_APPROVED = false;

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type FaqPageId =
  | 'home'
  | 'platform'
  | 'trust'
  | 'approach'
  | 'contact'
  | 'solutions/independent'
  | 'solutions/dental'
  | 'solutions/multi-site'
  | 'solutions/transport'
  | 'solutions/health-systems';

export type FaqRecord = {
  /** The Document 05 entry id, so placement stays auditable. */
  id: string;
  question: string;
  /**
   * One string per paragraph. `**text**` marks the only inline emphasis in the
   * document, used by `whats-included`.
   */
  paragraphs: readonly string[];
  /** The Document 05 page list for this entry, as written. */
  pages: readonly string[];
  flag: FaqFlag;
  /** Plain text for the FAQPage structured data. Derived, never authored. */
  plainAnswer: string;
};

type FaqSource = Omit<FaqRecord, 'plainAnswer'>;

/* -------------------------------------------------------------------------- */
/* Part 1 — General                                                           */
/* -------------------------------------------------------------------------- */

const ALL = ['all pages'] as const;

const sources: FaqSource[] = [
  {
    id: 'residency',
    question: "Where does our patient data live? You're based in Dubai.",
    pages: ALL,
    flag: 'always',
    paragraphs: [
      'Data residency follows the provider, not us.',
      'For US customers, protected health information is hosted in US regions by default, encrypted in transit and at rest, with backups in approved regions. For Gulf customers, we work to the residency requirements that apply to them, including where a health authority or local law requires data to stay in-country.',
      "Rumiq Technologies is registered in the DIFC in Dubai. Where we work with US healthcare providers we operate to US requirements. The company's location and the data's location are separate decisions, and we've made the second one deliberately.",
    ],
  },
  {
    id: 'hipaa',
    question: 'Are you HIPAA compliant?',
    pages: ALL,
    flag: 'always',
    paragraphs: [
      "That phrase gets used loosely, so here's the precise answer.",
      'HIPAA compliance is not a certificate a vendor can hold. What matters is whether the right agreements and controls are in place before any protected health information moves. Ours work like this: a business associate agreement is executed before we process any PHI on your behalf, our platform is designed to the HIPAA Security Rule, and we phase PHI-handling capability behind that readiness rather than switching it all on at once.',
      'If a vendor tells you they\'re simply "HIPAA compliant" and leaves it there, ask them what their BAA covers and which controls are actually operational.',
    ],
  },
  {
    id: 'replace-system',
    question: 'Do we have to replace our current system?',
    pages: ALL,
    flag: 'always',
    paragraphs: [
      'No. Your practice management system, EHR or dispatch platform stays exactly where it is and remains your source of truth.',
      'Rumiq reads from it through a connector and never silently writes back to it. Where write access is needed at all, the fields we own are agreed explicitly and in advance. If you stopped using Rumiq tomorrow, your operational system would be untouched.',
    ],
  },
  {
    id: 'vs-agency',
    question: 'How is this different from our agency plus Google Analytics?',
    pages: ALL,
    flag: 'always',
    paragraphs: [
      'Your agency stops measuring at the lead. Analytics stops at the click. Neither can tell you whether the person who filled in the form ever arrived.',
      "That gap is where the money is. A channel producing cheap leads that don't convert to attended appointments is costing you more than an expensive channel that does. Without measurement running through to delivered care, you can't tell which is which, so budget gets allocated on the wrong signal.",
      'Rumiq closes that gap, and governs what leaves your systems while doing it. Most agencies are not equipped to do the second part, and most analytics tools actively make it worse.',
    ],
  },
  {
    id: 'single-location',
    question: "We're a single location. Is this built for us?",
    pages: ALL,
    flag: 'always',
    paragraphs: [
      "Yes, and it's priced for you.",
      "Most platforms in this space are built for health systems and priced accordingly, which leaves independent practices carrying the same regulatory exposure with none of the tooling. We think that's backwards. A single-site practice faces the same rules as a hospital network and usually has less support to handle them.",
      'The Essentials tier exists for exactly this. Smaller foundation, because there genuinely is less to build — one location, one set of hours, one system to connect. Same privacy architecture, same measurement, same boundary.',
    ],
  },
  {
    id: 'proof',
    question: 'Do you have proof this works?',
    pages: ALL,
    flag: 'always',
    paragraphs: [
      "We're early and we'd rather say so than manufacture evidence.",
      // TODO: confirm pilot naming approval
      PILOT_NAMING_APPROVED
        ? "Two pilots are running: a two-location dental group in Florida and a non-emergency medical transportation operator. We're not publishing performance figures from either, because a sample of two doesn't support a claim and you'd be right not to believe it if we did."
        : "Two pilots are running across different kinds of healthcare provider. We're not publishing performance figures from either, because a sample of two doesn't support a claim and you'd be right not to believe it if we did.",
      "What we can offer instead is a methodology you can inspect before committing, a documented architecture, design partner terms, and a twelve-month engagement with a genuine exit at ninety days. If you want certainty from a long track record, we're not the right vendor yet. If you want to see the reasoning and judge it yourself, we'll show you all of it.",
    ],
  },
  {
    id: 'sectors',
    question: 'Do you only work with dental practices?',
    pages: ALL,
    flag: 'always',
    paragraphs: [
      // TODO: confirm pilot naming approval
      PILOT_NAMING_APPROVED
        ? "No. We're currently running two pilots — a dental group and a non-emergency medical transportation operator — precisely because the platform isn't built around one kind of provider."
        : "No. We're currently running two pilots across very different kinds of healthcare provider — one clinical, one logistical — precisely because the platform isn't built around one kind of provider.",
      "The privacy gateway, the measurement layer and the knowledge base work the same way regardless of what the provider does. What changes is the connector to their operational system, and that's a deliberately swappable piece.",
    ],
  },

  /* ------------------------------------------------------------------------ */
  /* Part 2 — Pricing and contract                                            */
  /* ------------------------------------------------------------------------ */

  {
    id: 'cost-no-numbers',
    question: 'What does Rumiq cost?',
    pages: ALL,
    flag: 'pricing-off',
    paragraphs: [
      'Rumiq is priced in two parts: a one-time foundation engagement and a monthly platform and operations fee, scoped to your size and the systems being connected. For most providers the monthly figure lands inside the range they already spend on a marketing agency, and it replaces most of that scope. Advertising spend is separate and paid directly to the platforms. We never take a percentage of it.',
      "We'll give you a firm number after the working session, not before, because quoting without seeing your stack would be guessing.",
    ],
  },
  {
    id: 'cost-with-numbers',
    question: 'What does Rumiq cost?',
    pages: ALL,
    flag: 'pricing-on',
    paragraphs: [
      'Rumiq is priced in two parts: a one-time foundation engagement, and a monthly platform and operations fee.',
      'The foundation covers the work that has to happen before any measurement is trustworthy — building your verified knowledge base, defining what each metric actually means, cleaning up your referral source data, and standing up the privacy architecture. It starts at $4,500 for a single site and runs from $12,000 for multi-site groups, scaling with how many locations and systems are involved.',
      "The monthly fee starts at $2,200 for a single site. Multi-site groups typically land between $6,000 and $15,000, plus a per-location fee. That's the same band most providers already spend on a marketing agency, and it replaces most of what an agency does while adding the measurement an agency can't give you.",
      'Advertising spend is separate and goes directly to Google, Meta and the other platforms. We never mark it up or take a percentage of it.',
    ],
  },
  {
    id: 'pricing-unit',
    question: 'How is Rumiq priced — per location, per user, or per patient?',
    pages: ALL,
    flag: 'always',
    paragraphs: [
      'Per location, plus a platform fee. Not per user and not per patient.',
      'For transport operators and other providers where "location" doesn\'t mean much, we price per service area instead. The principle is the same: you pay for the footprint we\'re actually growing.',
      "We don't charge per seat because the people who most need to see this data — the practice manager, the treatment coordinator, the dispatcher, the clinician who wants to know why consults aren't converting — are exactly the people a per-seat model prices out. Add whoever needs access.",
      "We don't charge per patient record because that would give us a commercial reason to hold more patient data than necessary. Our architecture is built to hold as little as possible. The pricing shouldn't work against that.",
    ],
  },
  {
    id: 'contract-term',
    question: 'Is there a minimum contract?',
    pages: ALL,
    flag: 'always',
    paragraphs: [
      'Twelve months for the platform and operations engagement, with a genuine exit at 90 days.',
      "Twelve months because the work has a real sequence. Search equity, content, source taxonomy and system reconciliation don't produce reliable signal in a quarter, and a shorter term would mean selling you something we know won't have worked yet.",
      "The 90-day exit exists because you shouldn't have to take that on trust. At the start we agree what should be true by day 90 — usually that source attribution is working, that your referral data is clean, and that you can see the funnel through to attendance. If those aren't true, you can end the engagement and pay only for the foundation work delivered.",
    ],
  },
  {
    id: 'design-partner',
    question: 'What are design partner terms?',
    pages: ALL,
    flag: 'always',
    paragraphs: [
      "We're working with a small number of providers as design partners while the platform is being built.",
      'Design partners get a reduced monthly fee for the first twelve months and direct influence over what gets built and in what order. In exchange we ask for a twelve-month commitment, an hour a month with someone who actually uses the system, and permission to describe the work publicly — with your written approval on anything we publish, and the option to stay anonymous.',
      "The discount isn't the point. The point is that the roadmap gets shaped by providers rather than guessed at. If you have a specific problem you can't currently solve, that's the strongest reason to be a design partner.",
    ],
  },
  {
    id: 'whats-included',
    question: "What's included, and what isn't?",
    pages: ALL,
    flag: 'always',
    paragraphs: [
      '**Included:** the modules you deploy, implementation, the connector to your operational system, ongoing operations, all users, a business associate agreement where one is required, and support.',
      "**Not included:** advertising spend, third-party software licences you already hold or choose to keep, telephony and call recording costs where those are billed per minute, and any content production requiring an external crew such as video shoots. We'll quote those separately and at cost.",
    ],
  },
  {
    id: 'baa-cost',
    question: 'Do you charge for the BAA?',
    pages: ['all pages', '/trust'],
    flag: 'always',
    paragraphs: [
      "No. If we're processing protected health information on your behalf, a business associate agreement is a legal requirement, not a feature. Charging for one would be charging you to let us do our job lawfully.",
    ],
  },
  {
    id: 'data-exit',
    question: 'What happens to our data if we leave?',
    pages: ['all pages', '/trust'],
    flag: 'always',
    paragraphs: [
      "It's yours and you can take it. On termination we provide a full export of your knowledge base, your normalised marketing and access data, and your configuration, in open formats. We then delete our copies on the schedule set out in the agreement and confirm the deletion in writing.",
      'Your own system was always the source of truth. Nothing we do changes that, and nothing about leaving Rumiq touches it.',
    ],
  },
  {
    id: 'one-module',
    question: 'Can we start with just one module?',
    pages: ['all pages', '/platform'],
    flag: 'always',
    paragraphs: [
      'Yes, and most providers should. The two most common starting points are the privacy and measurement foundation, which fixes the data before you spend more on it, and patient access intelligence, which usually finds the fastest recoverable revenue.',
      "Every module shares the same knowledge, policy and audit foundation, so starting narrow doesn't create rework later.",
    ],
  },
  {
    id: 'timeline',
    question: 'How quickly will we see results?',
    pages: ALL,
    flag: 'always',
    paragraphs: [
      'Different things move at different speeds, so a single number would be misleading.',
      'Measurement gaps close first. Within the first phase you should be able to see which sources produce enquiries and where those enquiries stop, which most providers currently cannot see at all. Operational conversion — answered calls, response times, recovered enquiries — is usually next, because it depends on your team rather than on an algorithm. Search, content and paid performance take longer and depend on your market.',
      "We don't publish a percentage improvement figure, because we're early and we'd be quoting someone else's data.",
    ],
  },
];

/** Emphasis markers are presentation, so they are stripped for the structured data. */
const toPlain = (paragraphs: readonly string[]) =>
  paragraphs.join(' ').replace(/\*\*/g, '');

export const faqEntries: Record<string, FaqRecord> = Object.fromEntries(
  sources.map((source) => [source.id, { ...source, plainAnswer: toPlain(source.paragraphs) }]),
);

/* -------------------------------------------------------------------------- */
/* Placement map — Document 05                                                */
/* -------------------------------------------------------------------------- */

/**
 * The full set is too long for one page, so each page gets a subset, in this
 * order. `cost` is an alias resolved by SHOW_PRICING.
 */
export const faqPlacement: Record<FaqPageId, readonly string[]> = {
  home: ['vs-agency', 'single-location', 'hipaa', 'residency', 'contract-term', 'cost'],
  platform: ['replace-system', 'one-module', 'sectors', 'pricing-unit'],
  trust: ['hipaa', 'residency', 'baa-cost', 'data-exit', 'replace-system'],
  approach: ['contract-term', 'design-partner', 'timeline', 'whats-included'],
  'solutions/independent': ['single-location', 'cost', 'contract-term', 'vs-agency', 'timeline'],
  'solutions/dental': ['vs-agency', 'replace-system', 'contract-term', 'timeline'],
  'solutions/multi-site': ['pricing-unit', 'replace-system', 'contract-term', 'timeline'],
  'solutions/transport': ['sectors', 'replace-system', 'pricing-unit', 'contract-term'],
  'solutions/health-systems': ['hipaa', 'residency', 'vs-agency', 'data-exit', 'proof'],
  contact: ['contract-term', 'cost'],
};

/** `cost` resolves to one of the two alternatives. Never both. */
const resolveId = (id: string) =>
  id === 'cost' ? (SHOW_PRICING ? 'cost-with-numbers' : 'cost-no-numbers') : id;

const visible = (entry: FaqRecord) =>
  entry.flag === 'always' ||
  (entry.flag === 'pricing-on' ? SHOW_PRICING : !SHOW_PRICING);

/**
 * The entries for one page, in placement order. Unknown ids are skipped rather
 * than throwing, so a placement edit ahead of the entry it references cannot
 * break a build.
 */
export function faqFor(page: FaqPageId): FaqRecord[] {
  return (faqPlacement[page] ?? [])
    .map((id) => faqEntries[resolveId(id)])
    .filter((entry): entry is FaqRecord => Boolean(entry))
    .filter(visible);
}

export const faqHeadings = {
  eyebrow: 'QUESTIONS',
  headline: 'The questions buyers actually ask.',
} as const;
