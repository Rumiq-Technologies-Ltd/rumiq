import { NextResponse } from 'next/server';
import {
  CONSENT_STATES,
  DESTINATIONS,
  PAGE_TYPES,
  PAYLOAD_FIELDS,
  TOTAL_FIELDS,
  evaluateAll,
} from '@/lib/demo/policy-sandbox';

/**
 * Verification surface for the Section 9.1 decision matrix.
 *
 * The engine is pure and runs client-side in the demo; this route exposes it so
 * all 72 combinations can be checked exhaustively against the specification
 * table rather than eyeballed in the UI. Read-only, synthetic data, no database.
 */
export async function GET() {
  const evaluations = evaluateAll();

  return NextResponse.json({
    meta: {
      pageTypes: PAGE_TYPES.map((p) => ({ id: p.id, label: p.label, pageClass: p.pageClass })),
      destinations: DESTINATIONS.map((d) => ({ id: d.id, class: d.class, essential: d.essential })),
      consentStates: CONSENT_STATES.map((c) => c.id),
      payloadFields: PAYLOAD_FIELDS,
      totalFields: TOTAL_FIELDS,
      combinations: evaluations.length,
    },
    evaluations: evaluations.map((e) => ({
      pageType: e.pageType,
      pageClass: e.pageClass,
      destination: e.destination,
      destinationClass: e.destinationClass,
      consent: e.consent,
      decision: e.decision,
      reason: e.reason,
      sent: e.sent,
      redacted: e.redacted,
      blocked: e.blocked,
      absent: e.absent,
      total: e.total,
      fields: e.fields.map((f) => ({
        name: f.name,
        state: f.state,
        value: f.value,
        note: f.note ?? null,
      })),
    })),
  });
}
