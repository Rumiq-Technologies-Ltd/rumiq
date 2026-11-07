import { CalendarCheck, MessageSquare, PhoneCall, Sparkles } from 'lucide-react';
import { Logo } from '@/components/rumiq';
import { cn } from '@/lib/utils';

/*
 * TEMPORARY LANDING PAGE — "Measured honestly" as a converging flow.
 *
 * Top to bottom, centred: inquiries, calls and bookings side by side; a line
 * from each converges on Rumiq; one line carries on down to a business
 * intelligence card of three plain findings, one of them (amber, the policy
 * colour) something that isn't working. It reads the same at every width.
 *
 * The connectors are one SVG that scales uniformly with the source row, so
 * the line ends stay under the icons. Everything runs on CSS, on one 4s loop
 * (measure-* in globals.css), so it all starts together whenever the visual
 * is shown: the three dots leave together and reach Rumiq together, Rumiq
 * pulses, a dot drops to the card and the findings light up in turn. The dot
 * keyframes are generated from `paths`: change one, regenerate the other.
 * Under reduced motion the dots are hidden and nothing pulses.
 */

const sources = [
  { label: 'Inquiries', icon: MessageSquare },
  { label: 'Calls', icon: PhoneCall },
  { label: 'Bookings', icon: CalendarCheck },
] as const;

/* In a 300 x 48 box: the three column centres (50, 150, 250) down to Rumiq at
   150. measure-dot-0/1/2 in globals.css follow these exact curves. */
const paths = ['M50 0 C50 30 150 18 150 48', 'M150 0 L150 48', 'M250 0 C250 30 150 18 150 48'];

const findings = [
  { text: 'Bookings are up', flag: false },
  { text: 'Calls: after-hours gap', flag: true },
  { text: 'Best source: search ads', flag: false },
];

export function MeasureFlow({ label }: { label: string }) {
  return (
    <figure aria-label={label} className="rounded-card border border-rule bg-paper p-5 sm:p-6 md:p-8">
      <div className="mx-auto max-w-[300px]">
        <ul className="grid grid-cols-3">
          {sources.map((source) => (
            <li key={source.label} className="flex flex-col items-center gap-2 text-center">
              <span className="flex size-10 items-center justify-center rounded-full border border-navy/25 bg-paper sm:size-11">
                <source.icon aria-hidden="true" className="size-5 text-navy" strokeWidth={1.6} />
              </span>
              <span className="text-caption font-medium leading-tight text-ink">{source.label}</span>
            </li>
          ))}
        </ul>

        <svg aria-hidden="true" viewBox="0 0 300 48" className="mt-2 block h-auto w-full overflow-visible">
          {paths.map((d) => (
            <path key={d} d={d} className="fill-none stroke-navy/25" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
          ))}
          {/* The dots sit at the origin and are moved along their paths by
              measure-dot-* (globals.css); hidden under reduced motion. */}
          <g className="hidden motion-safe:inline">
            {paths.map((d, i) => (
              <circle key={d} r={3.5} className={`measure-dot measure-dot-${i} fill-navy`} />
            ))}
          </g>
        </svg>
      </div>

      <div className="flex flex-col items-center">
        <span className="measure-hub flex size-14 items-center justify-center rounded-full border-2 border-navy bg-paper">
          <Logo variant="mark" width={28} />
          <span className="sr-only">Rumiq</span>
        </span>
        <span aria-hidden="true" className="relative h-5 w-px bg-navy/25">
          <span className="measure-out-dot absolute -left-[3px] top-0 hidden size-[7px] rounded-full bg-teal motion-safe:block" />
        </span>
      </div>

      <div className="rounded-card border border-teal/40 bg-teal/[0.06] p-3.5 sm:p-4">
        <p className="flex items-center justify-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-wider text-plane-public-ink">
          <Sparkles aria-hidden="true" className="size-3.5" />
          Business intelligence
        </p>
        <ul className="mt-2.5 space-y-1">
          {findings.map((finding, i) => (
            <li
              key={finding.text}
              className={cn(
                'flex items-center gap-2 rounded px-2 py-1 text-caption leading-snug text-ink',
                finding.flag ? 'measure-finding-flag' : 'measure-finding',
              )}
              style={{ animationDelay: `${i * 0.22}s` }}
            >
              <span aria-hidden="true" className={cn('size-1.5 shrink-0 rounded-full', finding.flag ? 'bg-boundary' : 'bg-teal')} />
              {finding.text}
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
