import { cn } from '@/lib/utils';
import { planeBg, planeLabel, planeText, type Plane } from '@/lib/planes';

/**
 * Section 5.2 — marks a block as public plane, boundary or protected plane.
 * The colour is the meaning, so the label is always present for anyone who
 * cannot use colour to read it (Section 13).
 */
export function PlaneTag({
  plane,
  label,
  className,
  inverted = false,
}: {
  plane: Plane;
  /** Overrides the default plane label when a page uses sector vocabulary. */
  label?: string;
  className?: string;
  inverted?: boolean;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-mono text-mono-eyebrow uppercase',
        inverted && plane === 'protected' ? 'text-paper/70' : planeText[plane],
        className,
      )}
    >
      <span aria-hidden className={cn('h-3 w-px', planeBg[plane])} />
      {label ?? planeLabel[plane]}
    </span>
  );
}
