import Link from 'next/link';
import { DEV_PREVIEW } from '@/lib/site-mode';

/*
 * TEMPORARY LANDING PAGE — dev-only switch between the landing page and the
 * full site. Renders nothing outside `npm run dev`. See lib/site-mode.ts.
 */
export function DevModeSwitch({ to, label }: { to: string; label: string }) {
  if (!DEV_PREVIEW) return null;

  return (
    <div
      data-dev-only="mode-switch"
      className="fixed bottom-4 right-4 z-50 border border-ink bg-paper px-4 py-2 font-mono text-mono-eyebrow uppercase text-ink shadow-sm"
    >
      <span className="mr-3 text-muted">Dev</span>
      <Link href={to} className="underline underline-offset-4">
        {label}
      </Link>
    </div>
  );
}
