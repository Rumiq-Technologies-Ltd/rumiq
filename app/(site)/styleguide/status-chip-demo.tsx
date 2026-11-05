import { StatusChip, moduleStatuses } from '@/components/rumiq';
import { SHOW_MODULE_STATUS } from '@/lib/flags';

/**
 * Documents the four <StatusChip> variants. `forceVisible` is used here and
 * nowhere else: on the site itself the chip renders only when
 * SHOW_MODULE_STATUS is true, and it is false (Section 0.2).
 */
export function StatusChipDemo() {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        {moduleStatuses.map((status) => (
          <StatusChip key={status} status={status} forceVisible />
        ))}
      </div>
      <p className="mt-4 max-w-measure text-caption text-muted">
        Shown above only because the styleguide overrides the flag. SHOW_MODULE_STATUS is{' '}
        <span className="font-mono">{String(SHOW_MODULE_STATUS)}</span>, so no status chip renders
        anywhere on the site. The row below is a <span className="font-mono">&lt;ModuleCard&gt;</span>{' '}
        passed a status, rendering without one.
      </p>
    </div>
  );
}
