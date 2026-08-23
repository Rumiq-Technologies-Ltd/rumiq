import { cn } from '@/lib/utils';
import { Eyebrow } from './eyebrow';

/**
 * Section 5.6 — eyebrow, headline, optional standfirst.
 * `as` keeps the heading hierarchy correct: exactly one H1 per page (Section 13).
 */
export function SectionHeader({
  eyebrow,
  headline,
  standfirst,
  as: Tag = 'h2',
  size = 'h2',
  inverted = false,
  align = 'left',
  className,
}: {
  eyebrow?: string;
  headline: React.ReactNode;
  standfirst?: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  size?: 'display-xl' | 'display-l' | 'h2' | 'h3';
  inverted?: boolean;
  align?: 'left' | 'center';
  className?: string;
}) {
  const sizes = {
    'display-xl': 'text-display-xl font-bold',
    'display-l': 'text-display-l font-semibold',
    h2: 'text-h2 font-semibold',
    h3: 'text-h3 font-semibold',
  } as const;

  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? <Eyebrow tone={inverted ? 'inverted' : 'muted'}>{eyebrow}</Eyebrow> : null}
      <Tag
        className={cn(
          'max-w-measure',
          sizes[size],
          eyebrow && 'mt-4',
          inverted ? 'text-paper' : 'text-ink',
          align === 'center' && 'mx-auto',
        )}
      >
        {headline}
      </Tag>
      {standfirst ? (
        <div
          className={cn(
            'mt-5 max-w-measure text-body-l',
            inverted ? 'text-paper/70' : 'text-muted',
            align === 'center' && 'mx-auto',
          )}
        >
          {standfirst}
        </div>
      ) : null}
    </div>
  );
}
