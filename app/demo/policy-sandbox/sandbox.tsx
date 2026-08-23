'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { AuditLine, DataFreshness, Eyebrow, IllustrativeBadge, PlaneTag } from '@/components/rumiq';
import { policySandboxCopy as copy } from '@/content/demo/policy-sandbox';
import {
  CONSENT_STATES,
  DESTINATIONS,
  PAGE_TYPES,
  POLICY_VERSION,
  PRESETS,
  TENANT,
  TOTAL_FIELDS,
  evaluate,
  getDestination,
  getPageType,
  type ConsentState,
  type DestinationId,
  type Evaluation,
  type FieldState,
  type PageTypeId,
} from '@/lib/demo/policy-sandbox';

/**
 * Policy Sandbox — Section 9.1. The site's signature interaction.
 *
 * The decision logic lives in lib/demo/policy-sandbox.ts and is pure; this
 * component only renders it. Controls are native radio inputs so the whole
 * thing is keyboard operable with arrow keys by default, state changes are
 * announced through an aria-live region, and the field reveal is CSS animation
 * only, which globals.css resolves instantly under prefers-reduced-motion.
 */

const CYCLE_MS = 6000;

/** Deterministic clock, so ledger lines do not depend on the wall clock and
 *  cannot cause a hydration mismatch. */
const LEDGER_EPOCH = Date.UTC(2026, 7, 23, 14, 2, 11);
const ledgerTimestamp = (index: number) =>
  new Date(LEDGER_EPOCH + index * 33_000).toISOString().replace('.000', '');

type LedgerEntry = {
  id: number;
  timestamp: string;
  evaluation: Evaluation;
};

const stateStyle: Record<FieldState, string> = {
  allowed: 'text-plane-public',
  redacted: 'text-boundary-ink',
  blocked: 'text-boundary-ink',
  absent: 'text-muted',
};

const stateLabel: Record<FieldState, string> = {
  allowed: 'ALLOWED',
  redacted: 'REDACTED',
  blocked: 'BLOCKED',
  absent: 'NOT COLLECTED',
};

function ControlGroup<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (next: T) => void;
}) {
  return (
    <fieldset>
      <legend className="font-mono text-mono-eyebrow uppercase text-muted">{legend}</legend>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = option.id === value;
          return (
            <label key={option.id} className="cursor-pointer">
              <input
                type="radio"
                name={name}
                value={option.id}
                checked={checked}
                onChange={() => onChange(option.id)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  'inline-flex items-center rounded-button border px-3 py-2 text-caption transition-colors duration-120',
                  'peer-focus-visible:ring-2 peer-focus-visible:ring-ink peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-paper',
                  checked
                    ? 'border-ink bg-ink text-paper'
                    : 'border-rule bg-paper-raised text-muted hover:border-ink/40 hover:text-ink',
                )}
              >
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function PolicySandbox({ compact = false }: { compact?: boolean }) {
  const [pageType, setPageType] = React.useState<PageTypeId>(PRESETS[0]!.pageType);
  const [destination, setDestination] = React.useState<DestinationId>(PRESETS[0]!.destination);
  const [consent, setConsent] = React.useState<ConsentState>(PRESETS[0]!.consent);
  const [interacted, setInteracted] = React.useState(false);
  const [ledger, setLedger] = React.useState<LedgerEntry[]>([]);
  const counter = React.useRef(0);

  const evaluation = React.useMemo(
    () => evaluate({ pageType, destination, consent }),
    [pageType, destination, consent],
  );

  // Append a ledger line on every change, including the first render and each
  // preset step. Newest first, capped so the page stays readable.
  React.useEffect(() => {
    const index = counter.current;
    counter.current += 1;
    setLedger((previous) =>
      [{ id: index, timestamp: ledgerTimestamp(index), evaluation }, ...previous].slice(0, compact ? 3 : 8),
    );
  }, [evaluation, compact]);

  // Idle preset cycle. Any interaction stops it permanently: the effect depends
  // on `interacted`, and once true the interval is never created again.
  React.useEffect(() => {
    if (interacted) return;
    let step = 0;
    const id = window.setInterval(() => {
      step = (step + 1) % PRESETS.length;
      const preset = PRESETS[step]!;
      setPageType(preset.pageType);
      setDestination(preset.destination);
      setConsent(preset.consent);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [interacted]);

  const takeOver = <T,>(setter: (value: T) => void) => (value: T) => {
    setInteracted(true);
    setter(value);
  };

  const page = getPageType(pageType);
  const dest = getDestination(destination);

  return (
    <div className="rounded-card border border-rule bg-paper-raised">
      {/* Controls */}
      <div className={cn('grid gap-8 border-b border-rule p-6', compact ? '' : 'lg:grid-cols-3')}>
        <ControlGroup
          legend={copy.controls.pageType}
          name="page-type"
          options={PAGE_TYPES.map((p) => ({ id: p.id, label: p.label }))}
          value={pageType}
          onChange={takeOver(setPageType)}
        />
        <ControlGroup
          legend={copy.controls.destination}
          name="destination"
          options={DESTINATIONS.map((d) => ({ id: d.id, label: d.label }))}
          value={destination}
          onChange={takeOver(setDestination)}
        />
        <ControlGroup
          legend={copy.controls.consent}
          name="consent"
          options={CONSENT_STATES.map((c) => ({ id: c.id, label: c.label }))}
          value={consent}
          onChange={takeOver(setConsent)}
        />
      </div>

      {/* Decision summary */}
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-b border-rule bg-paper px-6 py-5">
        <p className="font-mono text-caption">
          <span className="text-muted">decision=</span>
          <span
            className={cn(
              'font-medium',
              evaluation.decision === 'ALLOW' ? 'text-plane-public' : 'text-boundary-ink',
            )}
          >
            {evaluation.decision}
          </span>
        </p>
        <p className="font-mono text-caption">
          <span className="text-muted">fields_sent=</span>
          <span className="tabular-nums">
            {evaluation.sent}/{TOTAL_FIELDS}
          </span>
        </p>
        <p className="font-mono text-caption">
          <span className="text-muted">reason=</span>
          {evaluation.reason}
        </p>
        <p className="font-mono text-caption">
          <span className="text-muted">page_class=</span>
          {evaluation.pageClass}
        </p>
        <PlaneTag
          plane={dest.class === 'internal' ? 'protected' : 'public'}
          label={dest.class === 'internal' ? 'PROTECTED PLANE' : 'PUBLIC PLANE'}
          className="ml-auto"
        />
      </div>

      {/* Payload */}
      <div className="p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>{copy.payloadHeading}</Eyebrow>
            <p className="mt-2 max-w-measure text-caption text-muted">{copy.payloadStandfirst}</p>
          </div>
          <IllustrativeBadge />
        </div>

        <div
          aria-live="polite"
          aria-atomic="true"
          className="mt-6 font-mono text-mono-eyebrow uppercase text-muted"
        >
          {evaluation.summary}
        </div>

        <table className="mt-6 w-full border-collapse text-left">
          <caption className="sr-only">
            Event payload for {page.label} sent to {dest.label} with consent {consent}
          </caption>
          <thead>
            <tr className="border-b border-rule">
              <th scope="col" className="py-3 pr-4 font-mono text-mono-eyebrow font-medium uppercase text-muted">
                {copy.columns.field}
              </th>
              <th scope="col" className="py-3 pr-4 font-mono text-mono-eyebrow font-medium uppercase text-muted">
                {copy.columns.state}
              </th>
              <th scope="col" className="py-3 pr-4 font-mono text-mono-eyebrow font-medium uppercase text-muted">
                {copy.columns.value}
              </th>
              <th
                scope="col"
                className={cn(
                  'py-3 font-mono text-mono-eyebrow font-medium uppercase text-muted',
                  compact && 'hidden',
                )}
              >
                {copy.columns.why}
              </th>
            </tr>
          </thead>
          <tbody>
            {evaluation.fields.map((field, index) => (
              <tr
                // Keying on the combination restarts the reveal on every change.
                key={`${pageType}-${destination}-${consent}-${field.name}`}
                style={{ animationDelay: `${index * 35}ms` }}
                className="animate-rise-in border-b border-rule align-top last:border-0"
              >
                <td className="py-3 pr-4 font-mono text-caption">{field.name}</td>
                <td className={cn('py-3 pr-4 font-mono text-mono-eyebrow uppercase', stateStyle[field.state])}>
                  {stateLabel[field.state]}
                </td>
                <td className="py-3 pr-4 font-mono text-caption">
                  {field.state === 'blocked' ? (
                    <span className="text-boundary-ink line-through decoration-boundary-ink">
                      {field.original}
                    </span>
                  ) : field.state === 'absent' ? (
                    <span className="text-muted">—</span>
                  ) : (
                    <span className={field.state === 'redacted' ? 'text-boundary-ink' : undefined}>
                      {field.value}
                    </span>
                  )}
                </td>
                <td className={cn('py-3 text-caption text-muted', compact && 'hidden')}>
                  {field.note ?? ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={cn('mt-6 flex flex-wrap items-center gap-x-6 gap-y-3', compact && 'hidden')}>
          {(['allowed', 'redacted', 'blocked', 'absent'] as FieldState[]).map((state) => (
            <p key={state} className="flex items-center gap-2 text-caption text-muted">
              <span className={cn('font-mono text-mono-eyebrow uppercase', stateStyle[state])}>
                {stateLabel[state]}
              </span>
              {copy.legend[state]}
            </p>
          ))}
        </div>

        {dest.class === 'internal' ? (
          <p className="mt-6 max-w-measure text-caption text-muted">{copy.internalNote}</p>
        ) : null}
      </div>

      {/* Ledger */}
      <div className="border-t border-rule bg-paper p-6">
        <Eyebrow>{copy.ledgerHeading}</Eyebrow>
        <p className="mt-2 max-w-measure text-caption text-muted">{copy.ledgerStandfirst}</p>
        <DataFreshness className="mt-4" source={`tenant=${TENANT} · policy=${POLICY_VERSION}`} updated="live" />
        <ol className="mt-6 space-y-4">
          {ledger.map((entry) => (
            <li key={entry.id}>
              <AuditLine
                timestamp={entry.timestamp}
                decision={entry.evaluation.decision}
                fields={{
                  tenant: TENANT,
                  policy: POLICY_VERSION,
                  dest: getDestination(entry.evaluation.destination).wire,
                  page_class: entry.evaluation.pageClass,
                  consent: entry.evaluation.consent,
                }}
                trailing={{
                  fields_sent: `${entry.evaluation.sent}/${entry.evaluation.total}`,
                  reason: entry.evaluation.reason,
                }}
              />
            </li>
          ))}
        </ol>
        <p className="mt-6 font-mono text-mono-eyebrow uppercase text-muted" aria-live="polite">
          {interacted ? copy.takenOver : copy.idleNotice}
        </p>
      </div>
    </div>
  );
}
