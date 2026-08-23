import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card } from './card';
import { PlaneTag } from './plane-tag';
import { StatusChip, type ModuleStatus } from './status-chip';
import type { Plane } from '@/lib/planes';

/**
 * Section 8.2 — plane tag, module name, one sentence on what it does.
 *
 * `status` is optional and the chip renders only when SHOW_MODULE_STATUS is
 * true (Section 0.2). The flag is false, so no status renders anywhere on the
 * site in this phase, whatever is passed in.
 */
export function ModuleCard({
  name,
  description,
  plane,
  status,
  href,
  className,
}: {
  name: string;
  description: string;
  plane: Plane;
  status?: ModuleStatus;
  href?: string;
  className?: string;
}) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-4">
        <PlaneTag plane={plane} />
        {status ? <StatusChip status={status} /> : null}
      </div>
      <h3 className="mt-5 text-h3 font-semibold">{name}</h3>
      <p className="mt-3 text-caption text-muted">{description}</p>
    </>
  );

  return (
    <Card interactive={Boolean(href)} className={cn('p-5', className)}>
      {href ? (
        <Link href={href} className="block rounded-card">
          {body}
        </Link>
      ) : (
        body
      )}
    </Card>
  );
}
