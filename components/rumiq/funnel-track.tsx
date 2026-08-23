import { cn } from '@/lib/utils';
import { PlaneTag } from './plane-tag';
import { planeBg, type Plane } from '@/lib/planes';

/**
 * Section 8.1 / 8.8 / 15 — data-driven. Accepts an arbitrary stage array and
 * assumes nothing about its length: the homepage renders seventeen clinical
 * stages, the transport sector renders seven, and a sector added later renders
 * whatever its config supplies.
 *
 * Horizontal scroll-snapping track on desktop, vertical stack on mobile
 * (Section 8.1). The container is focusable so the track is keyboard-scrollable
 * (Section 13).
 */
export type FunnelStage = {
  id: string;
  /** Stage name, in the sector's own vocabulary. */
  name: string;
  /** One line on what gets measured at this stage. */
  measures: string;
  plane: Plane;
};

const pad = (n: number) => String(n).padStart(2, '0');

export function FunnelTrack({
  stages,
  label,
  showNumbers = true,
  className,
}: {
  stages: FunnelStage[];
  /** Accessible name for the track, for example "The dental growth journey". */
  label: string;
  showNumbers?: boolean;
  className?: string;
}) {
  if (!stages?.length) return null;

  return (
    <div className={cn('relative', className)}>
      <ol
        tabIndex={0}
        aria-label={label}
        className="flex flex-col gap-4 rounded-card focus-visible:outline-none md:snap-x md:snap-mandatory md:flex-row md:overflow-x-auto md:pb-6"
      >
        {stages.map((stage, index) => (
          <li
            key={stage.id}
            className="flex shrink-0 flex-col border-t border-rule bg-paper-raised p-5 md:w-[264px] md:snap-start"
          >
            <span aria-hidden className={cn('mb-4 -mt-5 h-[2px] w-10', planeBg[stage.plane])} />
            {showNumbers ? (
              <span className="font-mono text-caption text-muted tabular-nums">{pad(index + 1)}</span>
            ) : null}
            <h3 className="mt-2 text-h3 font-semibold">{stage.name}</h3>
            <p className="mt-3 flex-1 text-caption text-muted">{stage.measures}</p>
            <PlaneTag plane={stage.plane} className="mt-5" />
          </li>
        ))}
      </ol>
      <p className="mt-3 font-mono text-mono-eyebrow uppercase text-muted md:hidden">
        {stages.length} stages
      </p>
      <p className="mt-3 hidden font-mono text-mono-eyebrow uppercase text-muted md:block">
        {stages.length} stages · scroll or use the arrow keys
      </p>
    </div>
  );
}
