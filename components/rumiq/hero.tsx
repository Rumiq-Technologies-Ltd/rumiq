import Link from 'next/link';
import { cn } from '@/lib/utils';
import { heroDefaults } from '@/content/home';
import { Button } from './button';
import { Eyebrow } from './eyebrow';

/**
 * Section 8.1 — the hero is a component taking headline and subhead as props,
 * defaulting to the neutral homepage values. Each solutions page overrides them
 * from its sector config (Section 8.8). No hero copy is hardcoded here.
 *
 * The right column is passed in as children, so the homepage can embed the
 * Policy Sandbox without this component knowing anything about it.
 */
export function Hero({
  headline = heroDefaults.headline,
  subhead = heroDefaults.subhead,
  eyebrow = heroDefaults.eyebrow,
  primary,
  secondary,
  assurances,
  children,
  className,
}: {
  headline?: string;
  subhead?: string;
  eyebrow?: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  /** Monospace strip under the buttons. */
  assurances?: readonly string[];
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section data-plane="public" className={cn('border-b border-rule', className)}>
      <div
        className={cn(
          'mx-auto grid max-w-content gap-14 px-6 py-section-mobile lg:gap-16 lg:py-section lg:pl-gutter',
          // Two columns only when something is passed for the right-hand side.
          // Without it the copy holds the full measure instead of leaving a hole.
          children ? 'lg:grid-cols-2' : 'lg:grid-cols-1',
        )}
      >
        <div>
          {/* Staggered rise-in, 400ms, 60ms per line. Resolves instantly under
              prefers-reduced-motion via globals.css. */}
          <div className="animate-rise-in">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h1
            style={{ animationDelay: '60ms' }}
            className="animate-rise-in mt-6 max-w-measure text-display-l font-bold"
          >
            {headline}
          </h1>
          <p
            style={{ animationDelay: '120ms' }}
            className="animate-rise-in mt-7 max-w-measure text-body-l text-muted"
          >
            {subhead}
          </p>
          <div style={{ animationDelay: '180ms' }} className="animate-rise-in mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={primary.href}>{primary.label}</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          </div>
          {assurances?.length ? (
            <p
              style={{ animationDelay: '240ms' }}
              className="animate-rise-in mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-mono-eyebrow uppercase text-muted"
            >
              {assurances.map((item, index) => (
                <span key={item} className="flex items-center gap-3">
                  {index > 0 ? <span aria-hidden>·</span> : null}
                  {item}
                </span>
              ))}
            </p>
          ) : null}
        </div>

        {children ? <div className="min-w-0">{children}</div> : null}
      </div>
    </section>
  );
}
