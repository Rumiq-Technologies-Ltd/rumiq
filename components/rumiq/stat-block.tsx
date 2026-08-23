import { cn } from '@/lib/utils';
import { IllustrativeBadge } from './illustrative-badge';

/**
 * Section 5.6 — a single figure with its label. Any synthetic figure must set
 * `illustrative` so the Section 4.1 label renders on screen.
 */
export function StatBlock({
  value,
  label,
  detail,
  illustrative = false,
  inverted = false,
  className,
}: {
  value: string;
  label: string;
  detail?: string;
  illustrative?: boolean;
  inverted?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(className)}>
      <p className={cn('font-mono text-mono-eyebrow uppercase', inverted ? 'text-paper/60' : 'text-muted')}>
        {label}
      </p>
      <p
        className={cn(
          'mt-3 font-mono text-h2 font-medium tabular-nums',
          inverted ? 'text-paper' : 'text-ink',
        )}
      >
        {value}
      </p>
      {detail ? (
        <p className={cn('mt-2 max-w-measure text-caption', inverted ? 'text-paper/70' : 'text-muted')}>
          {detail}
        </p>
      ) : null}
      {illustrative ? (
        <span className="mt-3 inline-block">
          <IllustrativeBadge inverted={inverted} />
        </span>
      ) : null}
    </div>
  );
}
