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

const decisionStyle: Record<AuditDecision, string> = {
  ALLOW: 'text-plane-public',
  REDACT: 'text-boundary',
  BLOCK: 'text-boundary',
};

export function AuditLine({
  timestamp,
  decision,
  fields,
  className,
  inverted = false,
}: {
  /** ISO-8601, rendered as-is. */
  timestamp: string;
  decision: AuditDecision;
  fields: AuditFields;
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
        decision=<span className={cn('font-medium', decisionStyle[decision])}>{decision}</span>
      </span>
    </p>
  );
}
