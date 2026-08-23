import { cn } from '@/lib/utils';
import { Eyebrow } from './eyebrow';
import { SectionHeader } from './section-header';

/**
 * Shared blocks for the platform deep pages (Sections 8.3 to 8.7), so five
 * pages can be composition rather than five copies of the same markup.
 */

export function StepSection({
  eyebrow,
  headline,
  standfirst,
  steps,
  plane = 'boundary',
  columns = 2,
}: {
  eyebrow: string;
  headline: string;
  standfirst?: string;
  steps: readonly { label: string; body: string }[];
  plane?: 'public' | 'boundary' | 'protected';
  columns?: 2 | 4;
}) {
  return (
    <section data-plane={plane} className="border-b border-rule">
      <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
        <SectionHeader eyebrow={eyebrow} headline={headline} standfirst={standfirst} />
        <ol
          className={cn(
            'mt-12 grid border-l border-t border-rule',
            columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-4',
          )}
        >
          {steps.map((step, index) => (
            <li key={step.label} className="border-b border-r border-rule bg-paper-raised p-6">
              <span className="font-mono text-caption text-muted tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-h3 font-semibold">{step.label}</h3>
              <p className="mt-3 text-caption text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * A policy moment, so this is the one place amber belongs (Section 5.2):
 * jurisdictional obligations, boundary statements, what is and is not claimed.
 */
export function PolicyCallout({
  eyebrow,
  headline,
  body,
  note,
  children,
}: {
  eyebrow: string;
  headline?: string;
  body: string;
  note?: string;
  children?: React.ReactNode;
}) {
  return (
    <section data-plane="boundary" className="border-b border-rule">
      <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
        <div className="border-l-2 border-boundary pl-6">
          <Eyebrow>{eyebrow}</Eyebrow>
          {headline ? (
            <h2 className="mt-4 max-w-measure text-h2 font-semibold">{headline}</h2>
          ) : null}
          <p className="mt-5 max-w-measure text-body-l">{body}</p>
          {note ? <p className="mt-4 max-w-measure text-caption text-muted">{note}</p> : null}
          {children}
        </div>
      </div>
    </section>
  );
}

export function PointsSection({
  eyebrow,
  headline,
  points,
  plane = 'protected',
  inverted = false,
  children,
}: {
  eyebrow: string;
  headline: string;
  points: readonly string[];
  plane?: 'public' | 'boundary' | 'protected';
  inverted?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section data-plane={plane} className={cn('border-b border-rule', inverted && 'bg-paper-dark')}>
      <div className="mx-auto max-w-content px-6 py-section-mobile lg:py-section lg:pl-gutter">
        <SectionHeader eyebrow={eyebrow} headline={headline} inverted={inverted} />
        <ul className="mt-10 space-y-4">
          {points.map((point) => (
            <li
              key={point}
              className={cn(
                'max-w-measure border-b pb-4 text-body',
                inverted ? 'border-paper/15 text-paper/80' : 'border-rule text-muted',
              )}
            >
              {point}
            </li>
          ))}
        </ul>
        {children}
      </div>
    </section>
  );
}
