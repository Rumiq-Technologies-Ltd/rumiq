import { Database, Globe, Lock } from 'lucide-react';
import { Logo } from '@/components/rumiq';
import { cn } from '@/lib/utils';

/*
 * TEMPORARY LANDING PAGE — "HIPAA-conscious by default" as a filter.
 *
 * What Rumiq does with a client's data, in one picture:
 *
 *   Your Data ──▶ (Rumiq) ──▶ Ad Platforms
 *                      │
 *                      ▼
 *            Stays in the practice
 *
 * The client's data arrives as two kinds of information: patient information
 * (amber, the system's policy colour, with a lock) and business information.
 * Rumiq is the filter. Patient information drops off and stays in the
 * practice; only business information goes on as campaign data.
 *
 * One dot carries the data in. At the filter it splits: an amber dot drops to
 * "Stays in the practice", a teal dot carries on to the campaign. Timing and
 * the responsive layout live in globals.css (pf-*). On phones the flow runs
 * top to bottom with "Stays in the practice" beside the filter; from sm up it
 * runs left to right with it below. Under reduced motion the dots are hidden and
 * the picture is complete.
 */

/* Deliberately general: two kinds of information, not a list of fields, so
 * the picture never reads as an inventory of what is or isn't sent. */
type Tone = 'patient' | 'business';

const items: { label: string; tone: Tone }[] = [
  { label: 'Patient information', tone: 'patient' },
  { label: 'Business information', tone: 'business' },
];

function Chip({ label, tone, moved = false }: { label: string; tone: Tone; moved?: boolean }) {
  return (
    <span
      role="listitem"
      className={cn(
        'inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-[0.6875rem] font-medium leading-snug sm:text-caption',
        tone === 'patient' && 'border-boundary/50 bg-boundary/[0.06] text-boundary-ink',
        tone === 'business' && (moved ? 'border-teal/40 bg-teal/[0.06] text-ink' : 'border-rule bg-paper-raised text-ink'),
      )}
    >
      {tone === 'patient' ? <Lock aria-hidden="true" className="size-3 shrink-0" strokeWidth={2} /> : null}
      {label}
    </span>
  );
}

function CardTitle({ icon: Icon, children }: { icon: typeof Database; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-caption font-medium text-ink sm:text-body">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-navy/30 bg-paper">
        <Icon aria-hidden="true" className="size-3.5 text-navy" strokeWidth={1.75} />
      </span>
      {children}
    </span>
  );
}

/* A connector with its travelling dot. `a` runs down on phones and across from
 * sm up; `b` runs across on phones and down from sm up (globals.css). */
function Link({ area, axis, phase, className }: { area?: string; axis: 'a' | 'b'; phase: 'in' | 'out' | 'strip'; className?: string }) {
  return (
    <span aria-hidden="true" className={cn('pf-link', `pf-link-${axis}`, className)} style={area ? { gridArea: area } : undefined}>
      <span
        className={cn(
          `pf-dot pf-dot-${phase} motion-reduce:hidden`,
          phase === 'in' && 'bg-navy',
          phase === 'out' && 'bg-teal',
          phase === 'strip' && 'bg-boundary',
        )}
      />
    </span>
  );
}

export function PrivacyFlow({ label }: { label: string }) {
  return (
    <figure aria-label={label} className="flex items-center rounded-card border border-rule bg-paper p-4 sm:p-5 md:p-6">
      <div className="pf-grid w-full">
        {/* The client's data, as it arrives. */}
        <div style={{ gridArea: 'in' }} className="rounded-card border border-rule bg-paper p-3 sm:p-4">
          <CardTitle icon={Database}>Your Data</CardTitle>
          <div role="list" className="mt-3 flex flex-wrap gap-1.5">
            {items.map((item) => (
              <Chip key={item.label} label={item.label} tone={item.tone} />
            ))}
          </div>
        </div>

        <Link area="l1" axis="a" phase="in" className="text-navy/30" />

        {/* Rumiq, the filter. */}
        <div style={{ gridArea: 'f' }} className="relative flex items-center justify-center self-stretch">
          {/* From sm up: the drop from the filter's centre down to the tray, one unbroken line. */}
          <span aria-hidden="true" className="pf-filter-drop text-boundary/60">
            <span className="pf-dot pf-dot-strip bg-boundary motion-reduce:hidden" />
          </span>
          <span className="pf-filter relative z-[1] flex size-12 items-center justify-center rounded-full border-2 border-teal bg-paper sm:size-14">
            <Logo variant="mark" width={24} />
          </span>
        </div>

        {/* What the filter strips off: it stays in the practice. */}
        <div style={{ gridArea: 't' }} className="pf-tray-area">
          <Link axis="b" phase="strip" className="pf-tray-link text-boundary/60" />
          <div className="pf-tray flex flex-wrap items-center gap-x-2.5 gap-y-1.5 rounded-card border border-dashed border-boundary/60 bg-boundary/[0.04] px-2.5 py-2 sm:px-3">
            <span className="font-mono text-[0.5625rem] uppercase leading-tight tracking-wide text-boundary-ink sm:text-[0.625rem]">
              Stays in the practice
            </span>
            <span role="list" className="flex">
              <Chip label={items[0].label} tone="patient" />
            </span>
          </div>
        </div>

        <Link area="l2" axis="a" phase="out" className="text-teal/50" />

        {/* What goes on to the ad platforms. */}
        <div style={{ gridArea: 'out' }} className="pf-out rounded-card border border-teal/40 bg-paper p-3 sm:p-4">
          <CardTitle icon={Globe}>Ad Platforms</CardTitle>
          <div role="list" className="mt-3 flex flex-wrap gap-1.5">
            <Chip label={items[1].label} tone="business" moved />
          </div>
        </div>
      </div>
    </figure>
  );
}
