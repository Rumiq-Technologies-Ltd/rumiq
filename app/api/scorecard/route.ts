import { NextResponse } from 'next/server';
import {
  HONEYPOT_FIELD,
  MAX_FILL_MS,
  MIN_FILL_MS,
  fieldErrors,
  serverSchemas,
} from '@/lib/forms/schemas';
import { scoreAnswers } from '@/lib/scorecard';
import { formCommon } from '@/content/forms';

/**
 * Section 10 and Section 11 — the scorecard submission.
 *
 * POST only. The email address travels in the request body, so it can never
 * appear in a URL, a query string, a referrer header or an access log line.
 *
 * The result is computed here from the answers rather than trusted from the
 * client, so the figure that gets emailed and the figure on screen are the same
 * figure. Nothing is persisted: submissions go to the configured webhook, and
 * if none is configured they are accepted and dropped rather than written to an
 * ungoverned store.
 */

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, message: formCommon.serverError }, { status: 400 });
  }

  const honeypot = body[HONEYPOT_FIELD];
  if (typeof honeypot === 'string' && honeypot.length > 0) {
    return NextResponse.json({ ok: false, message: formCommon.serverError }, { status: 400 });
  }

  const startedAt = typeof body.startedAt === 'number' ? body.startedAt : 0;
  const elapsed = Date.now() - startedAt;
  if (!startedAt || elapsed < MIN_FILL_MS) {
    return NextResponse.json({ ok: false, message: formCommon.tooFast }, { status: 422 });
  }
  if (elapsed > MAX_FILL_MS) {
    return NextResponse.json({ ok: false, message: formCommon.expired }, { status: 422 });
  }

  const parsed = serverSchemas.scorecard.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: formCommon.errorSummaryTitle, errors: fieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  const { email, answers } = parsed.data;
  const result = scoreAnswers(answers);

  const webhook = process.env.FORM_WEBHOOK_URL ?? process.env.SCORECARD_WEBHOOK_URL;
  let delivered = false;

  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: 'scorecard',
          receivedAt: new Date().toISOString(),
          submission: { email, answers, result },
        }),
      });
      delivered = response.ok;
      if (!delivered) {
        return NextResponse.json({ ok: false, message: formCommon.serverError }, { status: 502 });
      }
    } catch {
      return NextResponse.json({ ok: false, message: formCommon.serverError }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true, delivered, result });
}
