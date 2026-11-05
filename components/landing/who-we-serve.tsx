import {
  Activity,
  Ambulance,
  BookOpen,
  Droplets,
  FlaskConical,
  House,
  Pill,
  Search,
  ShieldCheck,
  Smile,
  Stethoscope,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/*
 * TEMPORARY LANDING PAGE — "Who we work with" as one job, many kinds of client.
 *
 * The section's copy makes two points, and the visual makes the same two:
 *
 *  1. The range of clients. Every client type the copy names is a chip, set on
 *     a scale from "Local practices" to "Nationwide" (the copy's own words).
 *     The chips light up one at a time, so each kind of business takes its turn.
 *  2. What they share. Whoever the client is, people need to find them,
 *     understand them and trust them. That is drawn as one path, Find →
 *     Understand → Trust → Patients and families, with a single dot relaying
 *     along it (the same relay timing as the other flows, globals.css).
 *
 * Every word here is taken from the section's copy; nothing is claimed that
 * the paragraphs do not already say. Under reduced motion nothing cycles or
 * travels and the picture is complete.
 */

const clientTypes: { label: string; icon: LucideIcon }[] = [
  { label: 'Physicians', icon: Stethoscope },
  { label: 'Specialists', icon: Activity },
  { label: 'Dental care', icon: Smile },
  { label: 'Pharmacies', icon: Pill },
  { label: 'Laboratories', icon: FlaskConical },
  { label: 'Health spas', icon: Droplets },
  { label: 'Home and community care', icon: House },
  { label: 'Medical transport', icon: Ambulance },
];

const journey: { label: string; icon: LucideIcon; end?: boolean }[] = [
  { label: 'Find', icon: Search },
  { label: 'Understand', icon: BookOpen },
  { label: 'Trust', icon: ShieldCheck },
  { label: 'Patients and families', icon: Users, end: true },
];

const SEGMENT_SECONDS = 1.4;
const segments = journey.length - 1;

export function WhoWeServe({ label }: { label: string }) {
  return (
    <figure aria-label={label} className="overflow-hidden rounded-panel border border-rule bg-paper">
      {/* 1 — the range of clients. */}
      <div className="p-5 sm:p-8">
        <ul className="flex flex-wrap gap-2">
          {clientTypes.map((client, i) => {
            const Icon = client.icon;
            return (
              <li
                key={client.label}
                className="client-chip inline-flex items-center gap-2 rounded-full border border-rule bg-paper px-3 py-1.5 text-caption font-medium text-ink"
                // Negative delays start every chip mid-cycle, so only one is lit from the first frame.
                style={{ animationDelay: `${i * 1.5 - 12}s` }}
              >
                <Icon aria-hidden="true" className="size-4 shrink-0 text-navy" strokeWidth={1.75} />
                {client.label}
              </li>
            );
          })}
        </ul>

        {/* The scale, in the copy's own words. */}
        <div className="mt-6 flex items-center gap-3 font-mono text-mono-eyebrow uppercase text-muted">
          <span className="shrink-0">Local practices</span>
          <span aria-hidden="true" className="relative h-px flex-1 bg-gradient-to-r from-navy/15 to-navy/60">
            <span className="absolute -right-0.5 -top-[3px] size-[7px] rotate-45 border-r border-t border-navy/60" />
          </span>
          <span className="shrink-0">Nationwide</span>
        </div>
      </div>

      {/* 2 — what they share: one path to the people who rely on them. */}
      <div className="relative border-t border-rule bg-paper-raised px-4 pb-6 pt-7 sm:px-8 sm:pb-8 sm:pt-9">
        <ol className="flex items-start">
          {journey.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === journey.length - 1;
            return (
              <li key={step.label} className="relative flex flex-1 flex-col items-center gap-3 text-center">
                {!isLast ? (
                  <span aria-hidden="true" className="absolute left-1/2 top-5 h-px w-full bg-navy/25 sm:top-6">
                    <span
                      className="journey-relay-x motion-reduce:hidden absolute -top-[0.1875rem] size-1.5 rounded-full bg-teal"
                      style={
                        {
                          '--relay-name-x': `relay-x-${segments}`,
                          '--relay-cycle': `${(segments + 0.5) * SEGMENT_SECONDS}s`,
                          '--relay-delay': `${index * SEGMENT_SECONDS}s`,
                        } as React.CSSProperties
                      }
                    />
                  </span>
                ) : null}
                <span
                  className={cn(
                    'relative z-10 flex size-10 items-center justify-center rounded-full border sm:size-12',
                    step.end ? 'border-navy bg-navy text-paper' : 'border-navy/30 bg-paper text-navy',
                  )}
                >
                  <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                </span>
                <span
                  className={cn(
                    'max-w-[6.5rem] text-caption font-medium leading-tight',
                    step.end ? 'text-navy' : 'text-ink',
                  )}
                >
                  {step.label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </figure>
  );
}
