import { cn } from '@/lib/utils';
import { SHOW_MODULE_STATUS } from '@/lib/flags';

/**
 * Section 0.2 — four variants, built now, shipped hidden.
 *
 * Nothing renders while SHOW_MODULE_STATUS is false, and the flag is false.
 * Any status shown publicly today would be wrong by launch. Turning statuses
 * on before launch is a single-line change in lib/flags.ts.
 *
 * The variants deliberately avoid teal, blue and amber: those three carry
 * plane and policy meaning (Section 5.2) and a build status is neither.
 */
export type ModuleStatus = 'live' | 'build' | 'design' | 'road';

const statusLabel: Record<ModuleStatus, string> = {
  live: 'Live',
  build: 'Build',
  design: 'Design',
  road: 'Road',
};

const statusStyle: Record<ModuleStatus, string> = {
  live: 'bg-navy text-paper border-navy',
  build: 'bg-transparent text-ink border-ink',
  design: 'bg-transparent text-muted border-muted',
  road: 'bg-transparent text-muted border-rule border-dashed',
};

const statusMeaning: Record<ModuleStatus, string> = {
  live: 'Running in a pilot today',
  build: 'Under construction',
  design: 'Specified, not yet built',
  road: 'On the roadmap',
};

export function StatusChip({
  status,
  className,
  /** Bypasses the flag. Styleguide documentation only — never set this on a page. */
  forceVisible = false,
}: {
  status: ModuleStatus;
  className?: string;
  forceVisible?: boolean;
}) {
  if (!SHOW_MODULE_STATUS && !forceVisible) return null;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-button border px-2 py-[2px] font-mono text-mono-eyebrow uppercase',
        statusStyle[status],
        className,
      )}
      title={statusMeaning[status]}
    >
      {statusLabel[status]}
    </span>
  );
}

export const moduleStatuses: ModuleStatus[] = ['live', 'build', 'design', 'road'];
export { statusLabel, statusMeaning };
