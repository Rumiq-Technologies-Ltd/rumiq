'use client';

import * as React from 'react';
import {
  HONEYPOT_FIELD,
  fieldErrors,
  formSchemas,
  type FormFieldConfig,
  type FormId,
  type FormValues,
} from '@/lib/forms/schemas';
import { formCommon } from '@/content/forms';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Eyebrow } from './eyebrow';

/**
 * Section 11 — the one form runner. All three forms are this component with a
 * different field list and a different schema, so validation wording, error
 * placement, focus behaviour and the success state cannot drift apart.
 *
 * Behaviour that is deliberate:
 *  • noValidate, so the browser's own messages never replace ours.
 *  • Validation on submit and on blur-after-touch, never on every keystroke:
 *    telling someone their email is invalid while they are still typing it is
 *    hostile.
 *  • An error summary with real links, focused on failure, because on a nine
 *    field form an inline error can be off-screen.
 *  • The success state replaces the form in place. No redirect, so a mis-tap on
 *    back does not resubmit, and no toast, which a screen reader may miss.
 *
 * The schema is looked up from the form id rather than passed as a prop: a Zod
 * schema is a class instance and cannot cross the server/client boundary. The
 * id is the contract, so the browser and the route handler are guaranteed to be
 * validating with the same object.
 */

export type FormSuccessCopy = { eyebrow: string; headline: string; body: string };

export function RumiqForm({
  formId,
  endpoint,
  fields,
  submitLabel,
  success,
  note,
  extraPayload,
  onSuccess,
  className,
  inverted = false,
  layout = 'single',
}: {
  formId: FormId;
  /** Defaults to the Section 11 endpoint for this form id. */
  endpoint?: string;
  fields: readonly FormFieldConfig[];
  submitLabel: string;
  success: FormSuccessCopy;
  note?: string;
  /** Merged into the POST body. Used by the scorecard to send the answers. */
  extraPayload?: Record<string, unknown>;
  /** Called with the parsed response body once the server has accepted it. */
  onSuccess?: (data: unknown) => void;
  className?: string;
  inverted?: boolean;
  layout?: 'single' | 'two-column';
}) {
  const initial = React.useMemo<FormValues>(() => {
    const values: FormValues = {};
    for (const field of fields) values[field.name] = field.type === 'checkbox' ? false : '';
    return values;
  }, [fields]);

  const schema = formSchemas[formId];

  const [values, setValues] = React.useState<FormValues>(initial);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'error' | 'success'>('idle');
  const [formMessage, setFormMessage] = React.useState('');
  const [honeypot, setHoneypot] = React.useState('');

  // Set on mount rather than on first keystroke: a bot that posts the endpoint
  // directly never renders this, so it has no plausible value to send.
  const startedAt = React.useRef<number>(0);
  React.useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const summaryRef = React.useRef<HTMLDivElement>(null);
  const successRef = React.useRef<HTMLDivElement>(null);

  const validate = React.useCallback(
    (candidate: FormValues) => {
      const result = schema.safeParse(candidate);
      return result.success ? {} : fieldErrors(result.error);
    },
    [schema],
  );

  const setValue = (name: string, value: string | boolean) => {
    setValues((previous) => {
      const next = { ...previous, [name]: value };
      // Clearing an error as soon as it is fixed is the whole point of showing it.
      if (errors[name]) {
        const remaining = validate(next);
        setErrors((current) => {
          const copy = { ...current };
          if (!remaining[name]) delete copy[name];
          return copy;
        });
      }
      return next;
    });
  };

  const handleBlur = (name: string) => {
    setTouched((previous) => ({ ...previous, [name]: true }));
    const found = validate(values);
    setErrors((current) => (found[name] ? { ...current, [name]: found[name] } : current));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormMessage('');

    const found = validate(values);
    if (Object.keys(found).length) {
      setErrors(found);
      setStatus('error');
      setTouched(Object.fromEntries(fields.map((field) => [field.name, true])));
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setErrors({});
    setStatus('submitting');

    try {
      const response = await fetch(endpoint ?? `/api/forms/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          ...extraPayload,
          [HONEYPOT_FIELD]: honeypot,
          startedAt: startedAt.current,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string; errors?: Record<string, string> }
        | null;

      if (!response.ok || !data?.ok) {
        setStatus('error');
        if (data?.errors) setErrors(data.errors);
        setFormMessage(data?.message ?? formCommon.serverError);
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }

      setStatus('success');
      onSuccess?.(data);
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setStatus('error');
      setFormMessage(formCommon.serverError);
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  const shown = fields.filter((field) => touched[field.name] || status === 'error');
  const summary = shown
    .filter((field) => errors[field.name])
    .map((field) => ({ field, message: errors[field.name] }));

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className={cn(
          'rounded-card border p-8',
          inverted ? 'border-paper/20 bg-paper/5' : 'border-rule bg-paper-raised',
          className,
        )}
      >
        <Eyebrow tone={inverted ? 'inverted' : 'muted'}>{success.eyebrow}</Eyebrow>
        <p
          className={cn(
            'mt-4 max-w-measure font-display text-h3 font-semibold',
            inverted && 'text-paper',
          )}
        >
          {success.headline}
        </p>
        <p className={cn('mt-4 max-w-measure text-body', inverted ? 'text-paper/70' : 'text-muted')}>
          {success.body}
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className={cn('max-w-measure', className)}>
      {/* Announced to assistive technology without moving focus. */}
      <p aria-live="polite" className="sr-only">
        {status === 'submitting' ? formCommon.submitting : ''}
      </p>

      {summary.length || formMessage ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mb-8 rounded-card border-l-2 border-signal-red bg-paper-raised p-5"
        >
          <p className="font-mono text-mono-eyebrow uppercase text-signal-red">
            {formMessage || formCommon.errorSummaryTitle}
          </p>
          {summary.length ? (
            <ul className="mt-3 space-y-2">
              {summary.map(({ field, message }) => (
                <li key={field.name}>
                  <a
                    href={`#${formId}-${field.name}`}
                    className="text-caption underline decoration-rule underline-offset-4 hover:decoration-ink"
                  >
                    {field.label}: {message}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <div
        className={cn(
          'grid gap-6',
          layout === 'two-column' && 'md:grid-cols-2 md:[&>[data-span=full]]:col-span-2',
        )}
      >
        {fields.map((field) => {
          const id = `${formId}-${field.name}`;
          const error = touched[field.name] || status === 'error' ? errors[field.name] : undefined;
          const describedBy =
            [field.hint ? `${id}-hint` : null, error ? `${id}-error` : null]
              .filter(Boolean)
              .join(' ') || undefined;

          const control =
            'h-11 w-full rounded-input border bg-paper-raised px-3 text-body text-ink placeholder:text-muted';
          // 1.4.11: an input's own border is the only thing showing where to
          // type, so it needs 3:1 against the surface. --rule is a divider
          // colour at 1.5:1 and is not enough here; ink at 60% reaches 4.5:1.
          const borderClass = error ? 'border-signal-red' : 'border-ink/60';

          return (
            <div
              key={field.name}
              data-span={field.type === 'textarea' || field.type === 'checkbox' ? 'full' : undefined}
            >
              {field.type === 'checkbox' ? (
                <div className="flex items-start gap-3">
                  <input
                    id={id}
                    name={field.name}
                    type="checkbox"
                    checked={Boolean(values[field.name])}
                    onChange={(event) => setValue(field.name, event.target.checked)}
                    onBlur={() => handleBlur(field.name)}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={describedBy}
                    className={cn(
                      'mt-1 h-5 w-5 shrink-0 rounded-sm border accent-ink',
                      error ? 'border-signal-red' : 'border-ink/60',
                    )}
                  />
                  <label
                    htmlFor={id}
                    className={cn('text-caption', inverted ? 'text-paper/80' : 'text-muted')}
                  >
                    {field.label}
                  </label>
                </div>
              ) : (
                <>
                  <label
                    htmlFor={id}
                    className={cn(
                      'block font-mono text-mono-eyebrow uppercase',
                      inverted ? 'text-paper/70' : 'text-muted',
                    )}
                  >
                    {field.label}
                    {field.optional ? <span className="normal-case"> (optional)</span> : null}
                  </label>

                  {field.hint ? (
                    <p
                      id={`${id}-hint`}
                      className={cn('mt-2 text-caption', inverted ? 'text-paper/60' : 'text-muted')}
                    >
                      {field.hint}
                    </p>
                  ) : null}

                  {field.type === 'textarea' ? (
                    <textarea
                      id={id}
                      name={field.name}
                      rows={field.rows ?? 5}
                      value={String(values[field.name] ?? '')}
                      placeholder={field.placeholder}
                      onChange={(event) => setValue(field.name, event.target.value)}
                      onBlur={() => handleBlur(field.name)}
                      aria-invalid={error ? true : undefined}
                      aria-describedby={describedBy}
                      className={cn(
                        'mt-3 w-full rounded-input border bg-paper-raised p-3 text-body text-ink placeholder:text-muted',
                        borderClass,
                      )}
                    />
                  ) : field.type === 'select' ? (
                    <select
                      id={id}
                      name={field.name}
                      value={String(values[field.name] ?? '')}
                      onChange={(event) => setValue(field.name, event.target.value)}
                      onBlur={() => handleBlur(field.name)}
                      aria-invalid={error ? true : undefined}
                      aria-describedby={describedBy}
                      className={cn('mt-3', control, borderClass)}
                    >
                      {(field.options ?? []).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={id}
                      name={field.name}
                      type={field.type === 'email' ? 'email' : 'text'}
                      inputMode={field.type === 'email' ? 'email' : undefined}
                      autoComplete={field.autoComplete}
                      value={String(values[field.name] ?? '')}
                      placeholder={field.placeholder}
                      onChange={(event) => setValue(field.name, event.target.value)}
                      onBlur={() => handleBlur(field.name)}
                      aria-invalid={error ? true : undefined}
                      aria-describedby={describedBy}
                      className={cn('mt-3', control, borderClass)}
                    />
                  )}
                </>
              )}

              {error ? (
                <p id={`${id}-error`} className="mt-2 text-caption text-signal-red">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Honeypot. Off-screen rather than display:none, which some bots detect. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${formId}-${HONEYPOT_FIELD}`}>{formCommon.honeypotLabel}</label>
        <input
          id={`${formId}-${HONEYPOT_FIELD}`}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <Button type="submit" size="lg" inverted={inverted} disabled={status === 'submitting'} aria-busy={status === 'submitting'}>
          {status === 'submitting' ? formCommon.submitting : submitLabel}
        </Button>
        {note ? (
          <p className={cn('max-w-measure text-caption', inverted ? 'text-paper/60' : 'text-muted')}>
            {note}
          </p>
        ) : null}
      </div>
    </form>
  );
}
