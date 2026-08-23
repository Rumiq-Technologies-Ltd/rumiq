import Link from 'next/link';
import { ctaBand } from '@/content/site';
import { Button } from './button';
import { SectionHeader } from './section-header';
import { cn } from '@/lib/utils';

/**
 * Section 7.3 — once at the bottom of every page except /contact.
 * Inverted, and the boundary rule continues through it in amber, which is why
 * the band declares itself as the boundary plane.
 */
export function CTABand({ className }: { className?: string }) {
  return (
    <section data-plane="boundary" className={cn('bg-paper-dark', className)}>
      <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
        <SectionHeader
          eyebrow={ctaBand.eyebrow}
          headline={ctaBand.headline}
          standfirst={ctaBand.body}
          inverted
        />
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild inverted>
            <Link href={ctaBand.primary.href}>{ctaBand.primary.label}</Link>
          </Button>
          <Button asChild variant="secondary" inverted>
            <Link href={ctaBand.secondary.href}>{ctaBand.secondary.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
