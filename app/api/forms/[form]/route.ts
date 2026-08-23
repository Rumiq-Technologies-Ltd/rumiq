import { NextResponse } from 'next/server';
import {
  HONEYPOT_FIELD,
  MAX_FILL_MS,
  MIN_FILL_MS,
  fieldErrors,
  isFormId,
  serverSchemas,
} from '@/lib/forms/schemas';
import { formCommon } from '@/content/forms';

/**
 * Section 11 — server-side form handling.
 *
 * POST only, so nothing a visitor types can end up in a URL, a query string,
 * a referrer or a server access log line.
 *
 * Order of operations matters: the honeypot and the timing check run before
 * validation, and both fail closed with a deliberately unhelpful message, so a
 * bot learns nothing about which control caught it.
 *
 * Delivery goes to FORM_WEBHOOK_URL. If that variable is unset the submission
 * is accepted and discarded rather than being written anywhere: better a lost
 * lead than a silent, ungoverned store of contact details.
 */

export const dynamic = 'force-dynamic';

export async function POST(request: Request, { params }: { params: Promise<{ form: string }> }) {
  const { form } = await params;

  if (!isFormId(form)) {
    return NextResponse.json({ ok: false, message: 'Unknown form.' }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, message: formCommon.serverError }, { status: 400 });
  }

  // 1 — honeypot. Anything in it at all is a bot.
  const honeypot = body[HONEYPOT_FIELD];
  if (typeof honeypot === 'string' && honeypot.length > 0) {
    return NextResponse.json({ ok: false, message: formCommon.serverError }, { status: 400 });
  }

  // 2 — timing. Too fast is a script; too old is a stale tab.
  const startedAt = typeof body.startedAt === 'number' ? body.startedAt : 0;
  const elapsed = Date.now() - startedAt;
  if (!startedAt || elapsed < MIN_FILL_MS) {
    return NextResponse.json({ ok: false, message: formCommon.tooFast }, { status: 422 });
  }
  if (elapsed > MAX_FILL_MS) {
    return NextResponse.json({ ok: false, message: formCommon.expired }, { status: 422 });
  }

  // 3 — the same schema the browser used.
  const parsed = serverSchemas[form].safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: formCommon.errorSummaryTitle, errors: fieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  const { [HONEYPOT_FIELD]: _honeypot, startedAt: _startedAt, ...submission } = parsed.data as Record<
    string,
    unknown
  >;

  const webhook = process.env.FORM_WEBHOOK_URL;
  let delivered = false;

  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form,
          receivedAt: new Date().toISOString(),
          submission,
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

  return NextResponse.json({ ok: true, delivered });
}
