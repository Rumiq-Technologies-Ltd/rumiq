import { CalendarCheck, Check, Globe, Lock, MessageSquare, ShieldCheck, type LucideIcon } from 'lucide-react';

/*
 * TEMPORARY LANDING PAGE — "Compliance Check before we Start" as a review card.
 *
 * The three things the copy says are reviewed (website, social media, patient
 * access tools) are ticked off one after another; the last line, privacy and
 * accessibility, is the one still being worked on: amber (the system's policy
 * colour), dashed, and marked "In review". The ticks pop in turn on a loop
 * (compliance-* in globals.css); under reduced motion they are simply shown.
 */

const checked: { label: string; icon: LucideIcon }[] = [
  { label: 'Website', icon: Globe },
  { label: 'Social media', icon: MessageSquare },
  { label: 'Patient access', icon: CalendarCheck },
];

export function ComplianceReview({ label }: { label: string }) {
  return (
    <figure aria-label={label} className="rounded-card border border-rule bg-paper p-5 sm:p-6 md:p-8">
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-navy/30 bg-paper sm:size-11">
          <ShieldCheck aria-hidden="true" className="size-5 text-navy" strokeWidth={1.5} />
        </span>
        <span className="text-body font-medium text-ink sm:text-body-l">Compliance review</span>
      </div>

      <div role="list" className="mt-5 space-y-2.5">
        {checked.map((item, i) => {
          const Icon = item.icon;
          return (
            <div role="listitem" key={item.label} className="flex items-center gap-3 rounded-card bg-paper-raised px-3 py-2.5 sm:px-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-navy/25 bg-paper">
                <Icon aria-hidden="true" className="size-4 text-navy" strokeWidth={1.75} />
              </span>
              <span className="flex-1 text-caption font-medium text-ink sm:text-body">{item.label}</span>
              <span
                className="compliance-tick flex size-7 shrink-0 items-center justify-center rounded-full bg-teal/15"
                style={{ animationDelay: `${i * 0.6}s` }}
              >
                <Check aria-hidden="true" className="size-4 text-teal" strokeWidth={2.25} />
                <span className="sr-only">Checked</span>
              </span>
            </div>
          );
        })}

        <div role="listitem" className="flex items-center gap-3 rounded-card border border-dashed border-boundary/60 bg-boundary/[0.06] px-3 py-2.5 sm:px-4">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-boundary/60 bg-paper">
            <Lock aria-hidden="true" className="size-4 text-boundary-ink" strokeWidth={1.75} />
          </span>
          <span className="flex-1 text-caption font-medium text-ink sm:text-body">Privacy &amp; accessibility</span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-boundary/50 bg-boundary/10 px-2.5 py-0.5 text-[0.6875rem] font-medium text-boundary-ink sm:text-caption">
            <span aria-hidden="true" className="compliance-pending size-1.5 rounded-full bg-boundary" />
            In review
          </span>
        </div>
      </div>
    </figure>
  );
}
