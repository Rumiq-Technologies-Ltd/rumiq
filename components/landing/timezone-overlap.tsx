import { MapPin } from 'lucide-react';

/*
 * TEMPORARY LANDING PAGE — "two time zones" as two working windows.
 *
 * Pakistan hours and US Eastern time are two bands on a shared day. The band
 * where they overlap is marked, because that overlap is the point of the
 * principle. No hours are shown: the copy gives none, so none are invented.
 */
export function TimezoneOverlap({ label }: { label: string }) {
  return (
    <figure aria-label={label} className="rounded-card border border-rule bg-paper p-6 md:p-8">
      <div className="relative space-y-8 pt-6">
        {/* Overlap band, behind both rows. */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 top-0 left-[40%] w-[25%] rounded-button border border-dashed border-navy/40 bg-navy/5"
        />

        <div>
          <p className="relative z-10 flex w-fit items-center gap-2 bg-paper pr-2 text-body font-medium text-ink">
            <MapPin aria-hidden="true" className="size-4 text-navy" strokeWidth={1.5} />
            Pakistan hours
          </p>
          <div className="relative mt-3 h-3 rounded-full bg-rule">
            <span className="journey-window absolute left-[10%] top-0 h-full w-[55%] rounded-full bg-navy/60" />
          </div>
        </div>

        <div>
          <p className="relative z-10 flex w-fit items-center gap-2 bg-paper pr-2 text-body font-medium text-ink">
            <MapPin aria-hidden="true" className="size-4 text-navy" strokeWidth={1.5} />
            US Eastern time
          </p>
          <div className="relative mt-3 h-3 rounded-full bg-rule">
            <span className="journey-window absolute left-[40%] top-0 h-full w-[55%] rounded-full bg-navy" />
          </div>
        </div>
      </div>

      <p className="mt-8 text-center font-mono text-mono-eyebrow uppercase text-muted">Overlap, when clients need us</p>
    </figure>
  );
}
