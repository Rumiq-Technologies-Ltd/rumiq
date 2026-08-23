/**
 * Policy Sandbox decision engine — Specification Section 9.1.
 *
 * The Section 9.1 table is treated as a specification, not a guide. A technical
 * buyer will test this, so the rules are declared explicitly per page class and
 * destination class rather than inferred, and every consent case is handled.
 *
 * The engine is pure: no React, no DOM, no dates. GET /api/policy-sandbox/verify
 * runs it across all 72 combinations so the matrix can be checked exhaustively.
 *
 * All data here is synthetic. Nothing in this module touches a real payload.
 */

export type PageTypeId =
  | 'homepage'
  | 'service_page'
  | 'blog_article'
  | 'appointment_form'
  | 'portal_login'
  | 'medical_intake';

export type DestinationId = 'google_ads' | 'meta' | 'ga4' | 'internal';

export type ConsentState = 'granted' | 'denied' | 'not_set';

/** ALLOWED passes through with its value. REDACTED leaves with the value
 *  replaced. BLOCKED never leaves. ABSENT is not collected on this page. */
export type FieldState = 'allowed' | 'redacted' | 'blocked' | 'absent';

/** Section 9.1 payload fields, in payload order. Eleven, always. */
export const PAYLOAD_FIELDS = [
  'event_name',
  'timestamp',
  'page_url',
  'page_class',
  'utm_source',
  'utm_campaign',
  'gclid',
  'service_interest',
  'form_free_text',
  'email',
  'phone',
] as const;

export type FieldName = (typeof PAYLOAD_FIELDS)[number];

export const TOTAL_FIELDS = PAYLOAD_FIELDS.length; // 11

export const REDACTED_PLACEHOLDER = '[redacted by policy]';

export const POLICY_VERSION = 'v4.2';
export const TENANT = 'demo';

/* ------------------------------------------------------------------ */
/* Destinations                                                        */
/* ------------------------------------------------------------------ */

/** ads and analytics are non-essential third parties. internal is Rumiq's own
 *  first-party governed store, which is why consent state does not gate it —
 *  writing to your own warehouse is not a disclosure. Section 8.3: internal
 *  attribution does not imply permission to transmit. */
export type DestinationClass = 'ads' | 'analytics' | 'internal';

export type Destination = {
  id: DestinationId;
  label: string;
  wire: string;
  class: DestinationClass;
  essential: boolean;
};

export const DESTINATIONS: Destination[] = [
  { id: 'google_ads', label: 'Google Ads', wire: 'google_ads', class: 'ads', essential: false },
  { id: 'meta', label: 'Meta', wire: 'meta', class: 'ads', essential: false },
  { id: 'ga4', label: 'GA4', wire: 'ga4', class: 'analytics', essential: false },
  {
    id: 'internal',
    label: 'Rumiq internal warehouse',
    wire: 'rumiq_warehouse',
    class: 'internal',
    essential: true,
  },
];

/* ------------------------------------------------------------------ */
/* Page types and their synthetic payloads                             */
/* ------------------------------------------------------------------ */

export type PageType = {
  id: PageTypeId;
  label: string;
  /** The classification the gateway assigns. Drives the default-deny classes. */
  pageClass: string;
  /** Fields collected on this page. Anything omitted resolves to ABSENT. */
  values: Partial<Record<FieldName, string>>;
};

const SHARED_TIMESTAMP = '2026-08-23T14:02:11Z';

export const PAGE_TYPES: PageType[] = [
  {
    id: 'homepage',
    label: 'Homepage',
    pageClass: 'marketing',
    values: {
      event_name: 'page_view',
      timestamp: SHARED_TIMESTAMP,
      page_url: 'https://demo-provider.example/',
      page_class: 'marketing',
      utm_source: 'google',
      utm_campaign: 'brand-orlando',
      gclid: 'Cj0KCQiA6IWvBhCr',
    },
  },
  {
    id: 'service_page',
    label: 'Service page',
    pageClass: 'service',
    values: {
      event_name: 'page_view',
      timestamp: SHARED_TIMESTAMP,
      page_url: 'https://demo-provider.example/services/dental-implants',
      page_class: 'service',
      utm_source: 'google',
      utm_campaign: 'implants-orlando-q3',
      gclid: 'Cj0KCQiA6IWvBhCr',
      service_interest: 'dental_implants',
    },
  },
  {
    id: 'blog_article',
    label: 'Blog article',
    pageClass: 'marketing_editorial',
    values: {
      event_name: 'page_view',
      timestamp: SHARED_TIMESTAMP,
      page_url: 'https://demo-provider.example/insights/choosing-a-provider',
      page_class: 'marketing_editorial',
      utm_source: 'newsletter',
      utm_campaign: 'august-digest',
      gclid: 'Cj0KCQiA6IWvBhCr',
    },
  },
  {
    id: 'appointment_form',
    label: 'Appointment request form',
    pageClass: 'conversion_form',
    values: {
      event_name: 'form_submit',
      timestamp: SHARED_TIMESTAMP,
      page_url: 'https://demo-provider.example/request-appointment',
      page_class: 'conversion_form',
      utm_source: 'google',
      utm_campaign: 'implants-orlando-q3',
      gclid: 'Cj0KCQiA6IWvBhCr',
      service_interest: 'dental_implants',
      form_free_text: 'Free text entered by the visitor',
      email: 'j.rivera@example.com',
      phone: '+1 407 555 0142',
    },
  },
  {
    id: 'portal_login',
    label: 'Patient portal login',
    pageClass: 'patient_portal',
    values: {
      event_name: 'portal_login',
      timestamp: SHARED_TIMESTAMP,
      page_url: 'https://portal.demo-provider.example/login',
      page_class: 'patient_portal',
      email: 'j.rivera@example.com',
    },
  },
  {
    id: 'medical_intake',
    label: 'Medical history intake',
    pageClass: 'clinical_intake',
    values: {
      event_name: 'intake_submit',
      timestamp: SHARED_TIMESTAMP,
      page_url: 'https://demo-provider.example/intake/medical-history',
      page_class: 'clinical_intake',
      service_interest: 'dental_implants',
      form_free_text: 'Free text entered by the patient',
      email: 'j.rivera@example.com',
      phone: '+1 407 555 0142',
    },
  },
];

/** Page classes that are denied by default, whatever the consent state. */
export const DEFAULT_DENY_CLASSES = ['patient_portal', 'clinical_intake'] as const;

/* ------------------------------------------------------------------ */
/* Rules                                                              */
/* ------------------------------------------------------------------ */

export type Decision = 'ALLOW' | 'REDACT' | 'BLOCK';

export type FieldResult = {
  name: FieldName;
  state: FieldState;
  /** What actually leaves. Null when nothing does. */
  value: string | null;
  /** The original synthetic value, for the "what was withheld" column. */
  original: string | null;
  note?: string;
};

export type Evaluation = {
  pageType: PageTypeId;
  pageClass: string;
  destination: DestinationId;
  destinationClass: DestinationClass;
  consent: ConsentState;
  decision: Decision;
  reason: string;
  fields: FieldResult[];
  sent: number;
  redacted: number;
  blocked: number;
  absent: number;
  total: number;
  /** Plain-language summary, used by the aria-live region. */
  summary: string;
};

/* Field groupings the rules refer to. */
const CONTACT_FIELDS: FieldName[] = ['email', 'phone'];
const CAMPAIGN_FIELDS: FieldName[] = ['utm_source', 'utm_campaign', 'gclid'];

/** Generalised replacements used where the spec says a value is generalised
 *  rather than withheld outright. */
const GENERALISED: Partial<Record<FieldName, string>> = {
  service_interest: 'general_service_interest',
  page_url: 'https://demo-provider.example/services/[category]',
  event_name: 'conversion',
};

type Rule = (field: FieldName) => { state: FieldState; value?: string; note?: string };

/**
 * The Section 9.1 matrix, one rule per page class and destination class.
 * Read this next to the table in the specification: the mapping is one to one.
 */
function ruleFor(pageClass: string, destinationClass: DestinationClass): { rule: Rule; reason: string } {
  const allowAll: Rule = () => ({ state: 'allowed' });

  // Internal warehouse: Rumiq's own governed store.
  if (destinationClass === 'internal') {
    if ((DEFAULT_DENY_CLASSES as readonly string[]).includes(pageClass)) {
      return {
        rule: () => ({ state: 'allowed', note: 'protected plane only' }),
        reason: 'internal_protected_plane_only',
      };
    }
    return { rule: allowAll, reason: 'internal_first_party_full' };
  }

  switch (pageClass) {
    // Homepage and blog: allowed to every destination.
    case 'marketing':
    case 'marketing_editorial':
      return { rule: allowAll, reason: 'allow_public_plane' };

    // Service page: the service name is health-adjacent.
    case 'service':
      if (destinationClass === 'ads') {
        return {
          rule: (field) => {
            if (field === 'service_interest') {
              return { state: 'redacted', note: 'health-adjacent value' };
            }
            if (field === 'page_url') {
              return { state: 'redacted', note: 'service name appears in the path' };
            }
            return { state: 'allowed' };
          },
          reason: 'service_value_redacted',
        };
      }
      // GA4: allowed, service generalised.
      return {
        rule: (field) => {
          if (field === 'service_interest') {
            return {
              state: 'redacted',
              value: GENERALISED.service_interest,
              note: 'generalised, not withheld',
            };
          }
          if (field === 'page_url') {
            return { state: 'redacted', value: GENERALISED.page_url, note: 'path generalised' };
          }
          return { state: 'allowed' };
        },
        reason: 'service_value_generalised',
      };

    // Appointment request form: blocked except a generic conversion signal.
    // No service, no free text, no contact fields.
    case 'conversion_form':
      return {
        rule: (field) => {
          if (field === 'event_name') {
            return {
              state: 'redacted',
              value: GENERALISED.event_name,
              note: 'generic conversion signal',
            };
          }
          if (field === 'timestamp' || field === 'page_class') return { state: 'allowed' };
          if (CAMPAIGN_FIELDS.includes(field)) {
            return { state: 'allowed', note: 'attributes the click, carries no health signal' };
          }
          if (field === 'page_url') {
            return { state: 'redacted', note: 'form URL withheld, conversion signal only' };
          }
          if (field === 'service_interest') return { state: 'blocked', note: 'no service' };
          if (field === 'form_free_text') return { state: 'blocked', note: 'no free text' };
          if (CONTACT_FIELDS.includes(field)) return { state: 'blocked', note: 'no contact fields' };
          return { state: 'blocked' };
        },
        reason: 'conversion_signal_only',
      };

    // Patient portal and medical history intake: fully blocked.
    case 'patient_portal':
    case 'clinical_intake':
      return {
        rule: () => ({ state: 'blocked', note: 'default-deny page class' }),
        reason: 'default_deny_class',
      };

    default:
      // Unknown class fails closed.
      return { rule: () => ({ state: 'blocked', note: 'unclassified page' }), reason: 'fail_closed' };
  }
}

export function getPageType(id: PageTypeId): PageType {
  const page = PAGE_TYPES.find((p) => p.id === id);
  if (!page) throw new Error(`Unknown page type: ${id}`);
  return page;
}

export function getDestination(id: DestinationId): Destination {
  const destination = DESTINATIONS.find((d) => d.id === id);
  if (!destination) throw new Error(`Unknown destination: ${id}`);
  return destination;
}

export function evaluate(input: {
  pageType: PageTypeId;
  destination: DestinationId;
  consent: ConsentState;
}): Evaluation {
  const page = getPageType(input.pageType);
  const destination = getDestination(input.destination);

  // Consent gate first. Denied or not-yet-set blocks every non-essential
  // destination regardless of page type. This is the whole point of the demo
  // and must be demonstrably true (Section 9.1).
  const consentBlocks = input.consent !== 'granted' && !destination.essential;

  const { rule, reason: ruleReason } = ruleFor(page.pageClass, destination.class);
  const reason = consentBlocks
    ? input.consent === 'denied'
      ? 'consent_denied'
      : 'consent_not_recorded'
    : ruleReason;

  const fields: FieldResult[] = PAYLOAD_FIELDS.map((name) => {
    const original = page.values[name] ?? null;

    if (original === null) {
      return { name, state: 'absent', value: null, original: null, note: 'not collected here' };
    }

    if (consentBlocks) {
      return {
        name,
        state: 'blocked',
        value: null,
        original,
        note: input.consent === 'denied' ? 'consent denied' : 'no consent recorded',
      };
    }

    const outcome = rule(name);
    if (outcome.state === 'blocked') {
      return { name, state: 'blocked', value: null, original, note: outcome.note };
    }
    if (outcome.state === 'redacted') {
      return {
        name,
        state: 'redacted',
        value: outcome.value ?? REDACTED_PLACEHOLDER,
        original,
        note: outcome.note,
      };
    }
    return { name, state: 'allowed', value: original, original, note: outcome.note };
  });

  const count = (state: FieldState) => fields.filter((f) => f.state === state).length;
  const allowed = count('allowed');
  const redacted = count('redacted');
  const blocked = count('blocked');
  const absent = count('absent');

  // Anything allowed or redacted physically leaves, one of them with its value
  // replaced. Nothing leaving at all is a BLOCK.
  const sent = allowed + redacted;
  const decision: Decision = sent === 0 ? 'BLOCK' : redacted > 0 ? 'REDACT' : 'ALLOW';

  const summary =
    `${destination.label}. ${page.label}. Consent ${input.consent.replace('_', ' ')}. ` +
    `Decision ${decision}. ${sent} of ${TOTAL_FIELDS} fields sent, ` +
    `${redacted} redacted, ${blocked} blocked, ${absent} not collected. Reason ${reason}.`;

  return {
    pageType: page.id,
    pageClass: page.pageClass,
    destination: destination.id,
    destinationClass: destination.class,
    consent: input.consent,
    decision,
    reason,
    fields,
    sent,
    redacted,
    blocked,
    absent,
    total: TOTAL_FIELDS,
    summary,
  };
}

export const CONSENT_STATES: { id: ConsentState; label: string; wire: string }[] = [
  { id: 'granted', label: 'Granted', wire: 'granted' },
  { id: 'denied', label: 'Denied', wire: 'denied' },
  { id: 'not_set', label: 'Not yet set', wire: 'not_set' },
];

/** Section 9.1 — three preset scenarios cycled on idle. */
export const PRESETS: { pageType: PageTypeId; destination: DestinationId; consent: ConsentState }[] = [
  { pageType: 'blog_article', destination: 'ga4', consent: 'granted' },
  { pageType: 'service_page', destination: 'google_ads', consent: 'granted' },
  { pageType: 'medical_intake', destination: 'google_ads', consent: 'granted' },
];

/** Every combination, for the verification endpoint. */
export function evaluateAll(): Evaluation[] {
  const out: Evaluation[] = [];
  for (const page of PAGE_TYPES) {
    for (const destination of DESTINATIONS) {
      for (const consent of CONSENT_STATES) {
        out.push(evaluate({ pageType: page.id, destination: destination.id, consent: consent.id }));
      }
    }
  }
  return out;
}
