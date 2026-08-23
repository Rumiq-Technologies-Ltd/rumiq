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

/**
 * WCAG 2.2 AA, 1.4.1: the dot is never the only carrier of the state — the label
 * beside it is rendered on screen, not sr-only. 1.4.11: on a light surface the
 * amber dot uses the light form of the boundary token, since amber itself only
 * reaches 2.5:1 against paper.
 */
const dot: Record<FreshnessState, { light: string; inverted: string }> = {
  ok: { light: 'bg-plane-public', inverted: 'bg-plane-public' },
  stale: { light: 'bg-boundary-ink', inverted: 'bg-boundary' },
  failed: { light: 'bg-signal-red', inverted: 'bg-signal-red' },
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
      <span
        aria-hidden
        className={cn('h-2 w-2 rounded-full', dot[state][inverted ? 'inverted' : 'light'])}
      />
      <span className={inverted ? 'text-paper' : 'text-ink'}>{stateLabel[state]}</span>
      <span aria-hidden>·</span>
      {source}
      <span aria-hidden>·</span>
      updated {updated}
    </p>
  );
}

export { stateLabel as freshnessLabel };
