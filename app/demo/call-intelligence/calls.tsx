'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { AuditLine, Button, DataFreshness, Eyebrow, IllustrativeBadge } from '@/components/rumiq';
import {
  REASON_TAXONOMY,
  REVIEW_THRESHOLD,
  calls as seedCalls,
  needsReview,
  reasonLabel,
  type CallRecord,
  type ReasonId,
} from '@/lib/demo/calls';

/**
 * Call review interface — Specification Section 9.3.
 *
 * Twelve synthetic calls, a detail panel with confidence-scored classifications,
 * and an editable reason-not-booked label. Correcting it updates the record in
 * view and appends a line to the audit trail, because a classification a human
 * cannot overrule is not a classification anyone will trust.
 *
 * Keyboard: the list is a set of buttons in document order, the reason is a
 * native select, and the correction is announced through aria-live.
 */

type AuditEntry = { id: number; timestamp: string; callId: string; from: string; to: string };

const LEDGER_EPOCH = Date.UTC(2026, 7, 23, 15, 12, 0);
const auditTimestamp = (index: number) =>
  new Date(LEDGER_EPOCH + index * 41_000).toISOString().replace('.000', '');

const outcomeStyle = {
  booked: 'text-plane-public',
  not_booked: 'text-muted',
  missed: 'text-signal-red',
} as const;

const outcomeLabel = { booked: 'Booked', not_booked: 'Not booked', missed: 'Missed' } as const;

const duration = (seconds: number) =>
  seconds === 0 ? '—' : `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, '0')}s`;

export function CallIntelligence() {
  const [records, setRecords] = React.useState<CallRecord[]>(seedCalls);
  const [selectedId, setSelectedId] = React.useState(seedCalls[1]!.id);
  const [audit, setAudit] = React.useState<AuditEntry[]>([]);
  const [draft, setDraft] = React.useState<ReasonId>(seedCalls[1]!.reason);
  const [announcement, setAnnouncement] = React.useState('');
  const counter = React.useRef(0);

  const selected = records.find((call) => call.id === selectedId) ?? records[0]!;
  const flagged = records.filter(needsReview);

  const select = (call: CallRecord) => {
    setSelectedId(call.id);
    setDraft(call.reason);
  };

  const correct = () => {
    if (draft === selected.reason) return;
    const from = reasonLabel(selected.reason);
    const to = reasonLabel(draft);
    const index = counter.current;
    counter.current += 1;

    setRecords((previous) =>
      previous.map((call) =>
        call.id === selected.id
          ? {
              ...call,
              reason: draft,
              // The record now shows the human label, marked as such.
              classifications: call.classifications.map((c) =>
                c.field === 'reason_not_booked' ? { ...c, value: to, confidence: 1 } : c,
              ),
            }
          : call,
      ),
    );
    setAudit((previous) => [
      { id: index, timestamp: auditTimestamp(index), callId: selected.id, from, to },
      ...previous,
    ]);
    setAnnouncement(`${selected.id} reason changed from ${from} to ${to}. Audit line appended.`);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,380px)_1fr]">
      {/* Call list */}
      <div className="rounded-card border border-rule bg-paper-raised">
        <div className="border-b border-rule p-5">
          <Eyebrow>Calls</Eyebrow>
          <p className="mt-2 font-mono text-mono-eyebrow uppercase text-muted">
            {records.length} calls · {flagged.length} flagged for review
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <IllustrativeBadge />
            <DataFreshness source="Call platform" updated="9 min ago" />
          </div>
        </div>
        <ul className="max-h-[640px] overflow-y-auto">
          {records.map((call) => {
            const active = call.id === selected.id;
            const review = needsReview(call);
            return (
              <li key={call.id} className="border-b border-rule last:border-0">
                <button
                  type="button"
                  onClick={() => select(call)}
                  aria-current={active}
                  className={cn(
                    'w-full px-5 py-4 text-left transition-colors duration-120',
                    active ? 'bg-paper' : 'hover:bg-paper',
                  )}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-mono text-caption">{call.id}</span>
                    <span className={cn('font-mono text-mono-eyebrow uppercase', outcomeStyle[call.outcome])}>
                      {outcomeLabel[call.outcome]}
                    </span>
                  </div>
                  <p className="mt-2 text-caption">{reasonLabel(call.reason)}</p>
                  <p className="mt-1 font-mono text-mono-eyebrow uppercase text-muted">
                    {call.line} · {call.callerType} · {duration(call.durationSeconds)}
                  </p>
                  {review ? (
                    <p className="mt-2 font-mono text-mono-eyebrow uppercase text-boundary">
                      Flagged for human review
                    </p>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Detail */}
      <div className="space-y-4">
        <div className="rounded-card border border-rule bg-paper-raised p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <Eyebrow>Call {selected.id}</Eyebrow>
              <h2 className="mt-3 text-h3 font-semibold">{reasonLabel(selected.reason)}</h2>
            </div>
            <p className="font-mono text-caption text-muted">
              {selected.timestamp} · {selected.line} · {duration(selected.durationSeconds)}
            </p>
          </div>

          <h3 className="mt-8 font-mono text-mono-eyebrow uppercase text-muted">
            Machine classifications
          </h3>
          <table className="mt-4 w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-rule">
                {['Field', 'Value', 'Confidence'].map((h) => (
                  <th key={h} scope="col" className="py-2 pr-6 font-mono text-mono-eyebrow font-medium uppercase text-muted">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selected.classifications.map((c) => {
                const low = c.confidence < REVIEW_THRESHOLD;
                return (
                  <tr key={c.field} className="border-b border-rule last:border-0">
                    <td className="py-3 pr-6 font-mono text-caption">{c.field}</td>
                    <td className="py-3 pr-6 text-caption">{c.value}</td>
                    <td className="py-3 pr-6">
                      <span
                        className={cn(
                          'font-mono text-caption tabular-nums',
                          low ? 'text-boundary' : 'text-plane-public',
                        )}
                      >
                        {Math.round(c.confidence * 100)}%
                      </span>
                      {low ? (
                        <span className="ml-3 font-mono text-mono-eyebrow uppercase text-boundary">
                          Below {Math.round(REVIEW_THRESHOLD * 100)}% · review
                        </span>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <h3 className="mt-8 font-mono text-mono-eyebrow uppercase text-muted">Transcript</h3>
          <ol className="mt-4 space-y-2">
            {selected.transcript.map((line, index) => (
              <li key={index} className="border-l border-rule pl-4 text-caption text-muted">
                {line}
              </li>
            ))}
          </ol>
          <p className="mt-4 font-mono text-mono-eyebrow uppercase text-muted">
            Synthetic transcript · summary only, no clinical content
          </p>
        </div>

        {/* Correction */}
        <div className="rounded-card border border-rule bg-paper-raised p-6">
          <Eyebrow>Reason not booked</Eyebrow>
          <p className="mt-2 max-w-measure text-caption text-muted">
            The machine proposes. A human decides. The record shows the human answer, and the change
            is written to the audit trail.
          </p>
          <div className="mt-6 flex flex-wrap items-end gap-4">
            <label className="block">
              <span className="font-mono text-mono-eyebrow uppercase text-muted">Label</span>
              <select
                value={draft}
                onChange={(event) => setDraft(event.target.value as ReasonId)}
                className="mt-3 w-full min-w-[280px] rounded-input border border-rule bg-paper-raised px-3 py-2 text-caption"
              >
                {REASON_TAXONOMY.map((reason) => (
                  <option key={reason.id} value={reason.id}>
                    {reason.label}
                  </option>
                ))}
              </select>
            </label>
            <Button onClick={correct} disabled={draft === selected.reason}>
              Correct this
            </Button>
          </div>
          <p aria-live="polite" className="mt-4 font-mono text-mono-eyebrow uppercase text-muted">
            {announcement || 'No correction made in this session.'}
          </p>
        </div>

        {/* Audit trail */}
        <div className="rounded-card border border-rule bg-paper p-6">
          <Eyebrow>Audit trail</Eyebrow>
          {audit.length ? (
            <ol className="mt-5 space-y-3">
              {audit.map((entry) => (
                <li key={entry.id}>
                  <AuditLine
                    timestamp={entry.timestamp}
                    decision="ALLOW"
                    fields={{
                      tenant: 'demo',
                      actor: 'human',
                      call: entry.callId,
                      field: 'reason_not_booked',
                      from: entry.from,
                      to: entry.to,
                    }}
                    trailing={{ source: 'manual_correction' }}
                  />
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-4 text-caption text-muted">
              Empty until a label is corrected. Change the reason above and the line appears here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
