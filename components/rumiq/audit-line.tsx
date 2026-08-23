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
 * On a dark surface the amber token itself is legible (6.7:1). On a light one it
 * is not (2.5:1), so the light form of the token is used there instead. Same
 * policy meaning, two surfaces.
 */
const decisionStyle: Record<AuditDecision, { light: string; inverted: string }> = {
  ALLOW: { light: 'text-plane-public', inverted: 'text-plane-public' },
  REDACT: { light: 'text-boundary-ink', inverted: 'text-boundary' },
  BLOCK: { light: 'text-boundary-ink', inverted: 'text-boundary' },
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
