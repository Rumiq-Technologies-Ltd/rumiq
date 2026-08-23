import { cn } from '@/lib/utils';

/*
 * Section 4.1 — no fabricated proof.
 *
 * Where the design calls for social proof, this renders instead. Do not
 * replace it with generated logos, testimonials, quotes, headshots, case
 * studies, review counts or performance statistics.
 *
 * TODO: real content required before launch. Both pilot references need
 * written client approval first (Section 16.1).
 */
export function ProofSlot({
  /** What is eventually meant to sit here, so the slot is reviewable. */
  intent,
  className,
  inverted = false,
}: {
  intent?: string;
  className?: string;
  inverted?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex min-h-[168px] flex-col justify-between rounded-card border border-dashed p-5',
        inverted ? 'border-paper/30' : 'border-rule',
        className,
      )}
    >
      {/* TODO: real content required before launch */}
      <p
        className={cn(
          'font-mono text-mono-eyebrow uppercase',
          inverted ? 'text-paper/70' : 'text-muted',
        )}
      >
        Proof slot — pending client approval
      </p>
      {intent ? (
        <p className={cn('mt-4 text-caption', inverted ? 'text-paper/60' : 'text-muted')}>{intent}</p>
      ) : null}
    </div>
  );
}
