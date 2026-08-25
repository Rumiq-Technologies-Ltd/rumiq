import { cn } from '@/lib/utils';

/**
 * Section 9.1 — a line of the disclosure ledger. Monospace, key=value, and
 * appended on every policy decision.
 *
 * The decision is the only coloured element: amber for anything the policy
 * stopped or rewrote, teal for a permitted public-plane disclosure. Nothing
 * else here earns colour.
 */
export type AuditDecision = 'ALLOW' | 'REDACT' | 'BLOCK';

export type AuditFields = Record<string, string | number>;

/**
 * The dark surface is now Rumiq Navy rather than near-black, and against Navy
 * neither amber (4.0:1) nor teal (3.6:1) clears 4.5:1 as a small label. So on
 * dark the decision word is white and the colour is carried by the row accent,
 * which only has to reach 3:1. On light, each token uses its text form.
 */
const decisionStyle: Record<AuditDecision, { light: string; inverted: string }> = {
  ALLOW: { light: 'text-plane-public-ink', inverted: 'text-paper' },
  REDACT: { light: 'text-boundary-ink', inverted: 'text-paper' },
  BLOCK: { light: 'text-boundary-ink', inverted: 'text-paper' },
};

export function AuditLine({
  timestamp,
  decision,
  fields,
  trailing,
  className,
  inverted = false,
}: {
  /** ISO-8601, rendered as-is. */
  timestamp: string;
  decision: AuditDecision;
  fields: AuditFields;
  /** Rendered after the decision, so a line can read
   *  decision=BLOCK fields_sent=0/11 reason=default_deny_class (Section 9.1). */
  trailing?: AuditFields;
  className?: string;
  inverted?: boolean;
}) {
  return (
    <p
      className={cn(
        'flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-caption',
        inverted ? 'text-paper/70' : 'text-muted',
        className,
      )}
    >
      <span className={inverted ? 'text-paper' : 'text-ink'}>{timestamp}</span>
      {Object.entries(fields).map(([key, value]) => (
        <span key={key}>
          {key}=<span className={inverted ? 'text-paper' : 'text-ink'}>{value}</span>
        </span>
      ))}
      <span>
        decision=<span className={cn('font-medium', decisionStyle[decision][inverted ? 'inverted' : 'light'])}>{decision}</span>
      </span>
      {trailing
        ? Object.entries(trailing).map(([key, value]) => (
            <span key={key}>
              {key}=<span className={inverted ? 'text-paper' : 'text-ink'}>{value}</span>
            </span>
          ))
        : null}
    </p>
  );
}
