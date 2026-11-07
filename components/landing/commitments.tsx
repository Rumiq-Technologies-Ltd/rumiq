import { BarChart3, Lock, ShieldCheck, type LucideIcon } from 'lucide-react';
import { Logo } from '@/components/rumiq';

/*
 * TEMPORARY LANDING PAGE — "Privacy First. Results Always" as three
 * commitments held by one company.
 *
 * Rumiq sits at the top of a spine; the three commitments branch off it in the
 * order the copy gives them, numbered to match the three items that follow in
 * the section (compliance, privacy, measurement). A dot runs down the spine and
 * each commitment lights as it passes, so the three read as one sequence that
 * repeats for every client. Labels are taken from the item's own text. Under
 * reduced motion nothing moves and all three are shown.
 */

const commitments: { label: string; icon: LucideIcon }[] = [
  { label: 'Check compliance first', icon: ShieldCheck },
  { label: 'Keep patient information protected', icon: Lock },
  { label: 'Report every result honestly', icon: BarChart3 },
];

export function Commitments({ label }: { label: string }) {
  return (
    <figure aria-label={label} className="rounded-card border border-rule bg-paper p-5 sm:p-6 md:p-8">
      <div className="flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-teal bg-paper">
          <Logo variant="mark" width={20} />
        </span>
        <span className="font-mono text-mono-eyebrow uppercase text-muted">Every client</span>
      </div>

      <div className="relative ml-[1.375rem] mt-2">
        {/* The spine, and the dot that runs down it. The rows grow with their text
            but share one height (auto-rows-fr), so the spine can stop exactly at the
            centre of the last row: half a row up from the bottom, where a row is
            (height - pt-3 - two gap-3) / 3. */}
        <span aria-hidden="true" className="absolute bottom-[calc((100%-2.25rem)/6)] left-0 top-0 w-px bg-navy/20">
          <span className="commit-dot motion-reduce:hidden absolute -left-[3.5px] size-2 rounded-full bg-teal" />
        </span>

        <ol className="grid auto-rows-fr gap-3 pt-3">
          {commitments.map((item, i) => {
            const Icon = item.icon;
            return (
              <li key={item.label} className="relative flex items-center pl-4 sm:pl-8">
                {/* Branch from the spine. */}
                <span aria-hidden="true" className="absolute left-0 top-1/2 h-px w-4 bg-navy/20 sm:w-8" />
                <span
                  className="commit-row flex min-h-14 flex-1 items-center gap-2.5 self-stretch rounded-card border border-rule bg-paper-raised px-3 py-2.5 sm:min-h-[3.75rem] sm:gap-4 sm:px-4"
                  style={{ animationDelay: `${(0.7 + i * 1.4).toFixed(1)}s` }}
                >
                  <span className="hidden size-8 shrink-0 items-center justify-center rounded-full border border-navy/25 bg-paper min-[400px]:flex sm:size-9">
                    <Icon aria-hidden="true" className="size-4 text-navy" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 flex-1 text-caption font-medium leading-snug text-ink sm:text-body sm:leading-snug">{item.label}</span>
                  {/* Below 400px the icon and number give way so the label keeps its room. */}
                  <span className="hidden shrink-0 font-mono text-mono-eyebrow text-muted min-[400px]:inline">{String(i + 1).padStart(2, '0')}</span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </figure>
  );
}
