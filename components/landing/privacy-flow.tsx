import { Globe, Lock, Megaphone, X, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/*
 * TEMPORARY LANDING PAGE — "HIPAA-conscious by default" as two lanes and a
 * boundary.
 *
 * An amber boundary (the system's policy colour: blocked, enforced) runs down
 * the middle. Two lanes cross towards the ad platforms:
 *
 *   Patient data   ─────▶ ✕          stopped at the boundary, every time
 *   Campaign data  ─────┊─────▶ Ad platforms
 *
 * Patient data sits inside a dashed "Stays in the practice" frame and its
 * pulse dies at the boundary; campaign data is the only thing that crosses.
 * The labels are the same four the earlier visual used, so no copy is added.
 * Same layout on every width; on phones the labels wrap under the icons.
 * Under reduced motion the pulses are hidden and the lanes stay drawn.
 *
 * Geometry: every node is a p-3 box with a 48px icon on top, so icon centres
 * sit 36px below each row's top. The lanes are drawn at that height, and the
 * boundary is one continuous line because the rows have no gap between them.
 */

const ICON_CENTRE = 'top-9'; // 12px padding + 24px half-icon = 36px

function Node({ icon: Icon, label, framed = false, children }: { icon: LucideIcon; label: string; framed?: boolean; children?: React.ReactNode }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-2 rounded-card border p-3 text-center',
        framed ? 'border-dashed border-navy/40 bg-navy/[0.03]' : 'border-transparent',
      )}
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-navy/30 bg-paper">
        <Icon aria-hidden="true" className="size-5 text-navy" strokeWidth={1.5} />
      </span>
      <span className="max-w-[6rem] text-caption font-medium leading-tight text-ink sm:max-w-none sm:whitespace-nowrap sm:text-body">
        {label}
      </span>
      {children}
    </div>
  );
}

/* The boundary segment for one row. Rows touch, so the segments read as one line. */
function Boundary() {
  return <span aria-hidden="true" className="absolute inset-y-0 left-[62%] border-l-2 border-dashed border-boundary/70" />;
}

export function PrivacyFlow({ label }: { label: string }) {
  return (
    <figure aria-label={label} className="rounded-card border border-rule bg-paper p-4 sm:p-6 md:p-8">
      <div className="grid grid-cols-[auto_minmax(4rem,1fr)_auto]">
        {/* Lane 1: patient data, stopped at the boundary. */}
        <div className="pb-5">
          <Node icon={Lock} label="Patient data" framed>
            <span className="mt-1 font-mono text-[0.625rem] uppercase leading-tight tracking-wide text-muted sm:text-mono-eyebrow">
              Stays in the practice
            </span>
          </Node>
        </div>
        <div className="relative">
          <Boundary />
          <span aria-hidden="true" className={cn('absolute left-0 h-px w-[62%] bg-navy/25', ICON_CENTRE)}>
            <span className="privacy-blocked motion-reduce:hidden absolute -top-1 left-0 size-2 rounded-full bg-navy" />
          </span>
          <span
            aria-hidden="true"
            className={cn(
              'privacy-stop absolute left-[62%] flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-boundary bg-paper',
              ICON_CENTRE,
            )}
          >
            <X className="size-3.5 text-boundary-ink" strokeWidth={2.5} />
          </span>
        </div>
        <div aria-hidden="true" />

        {/* Lane 2: campaign data, the only thing that crosses. */}
        <div>
          <Node icon={Megaphone} label="Campaign data" />
        </div>
        <div className="relative">
          <Boundary />
          <span aria-hidden="true" className={cn('absolute inset-x-0 h-px bg-navy/40', ICON_CENTRE)}>
            <span className="privacy-out motion-reduce:hidden absolute -top-1 left-0 size-2 rounded-full bg-teal" />
          </span>
          {/* Where the lane passes the boundary: an opening, not a stop. */}
          <span
            aria-hidden="true"
            className={cn('absolute left-[62%] size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-teal bg-paper', ICON_CENTRE)}
          />
        </div>
        <div>
          <Node icon={Globe} label="Ad platforms" />
        </div>
      </div>
    </figure>
  );
}
