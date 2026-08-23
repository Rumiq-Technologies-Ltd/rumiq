import { cn } from '@/lib/utils';

/**
 * Section 9 — every demo panel states how fresh its data is.
 *
 * `state` maps to the green / amber / red chips of Section 9.2. The palette has
 * no green, so the public-plane teal carries "ok" — connector freshness is a
 * public-plane operational signal. Amber is a genuine policy-adjacent warning
 * and red is the failure signal.
 */
export type FreshnessState = 'ok' | 'stale' | 'failed';

const dot: Record<FreshnessState, string> = {
  ok: 'bg-plane-public',
  stale: 'bg-boundary',
  failed: 'bg-signal-red',
};

const stateLabel: Record<FreshnessState, string> = {
  ok: 'Fresh',
  stale: 'Stale',
  failed: 'Failed',
};

export function DataFreshness({
  source,
  updated,
  state = 'ok',
  className,
  inverted = false,
}: {
  /** Which connector the figure came from. */
  source: string;
  /** Human-readable age, for example "14 min ago". */
  updated: string;
  state?: FreshnessState;
  className?: string;
  inverted?: boolean;
}) {
  return (
    <p
      className={cn(
        'inline-flex flex-wrap items-center gap-2 font-mono text-mono-eyebrow uppercase',
        inverted ? 'text-paper/70' : 'text-muted',
        className,
      )}
    >
      <span aria-hidden className={cn('h-2 w-2 rounded-full', dot[state])} />
      <span className="sr-only">{stateLabel[state]}.</span>
      {source}
      <span aria-hidden>·</span>
      updated {updated}
    </p>
  );
}

export { stateLabel as freshnessLabel };
