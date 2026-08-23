import { cn } from '@/lib/utils';

/**
 * Section 4.1 — any illustrative number anywhere on the site carries a visible
 * label. On-screen text, not a tooltip.
 *
 * Deliberately not amber: amber is reserved for policy moments (Section 5.2)
 * and a synthetic-data label is an honesty device, not a policy decision.
 */
export function IllustrativeBadge({
  className,
  label = 'Illustrative data',
  inverted = false,
}: {
  className?: string;
  label?: string;
  inverted?: boolean;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-button border px-2 py-[2px] font-mono text-mono-eyebrow uppercase',
        inverted ? 'border-paper/40 text-paper/80' : 'border-ink/40 text-ink',
        className,
      )}
    >
      {label}
    </span>
  );
}
