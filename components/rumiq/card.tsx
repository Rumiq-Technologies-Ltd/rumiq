import { cn } from '@/lib/utils';

/**
 * Section 5.4 / 5.5 — 4px radius, hairline border. Interactive cards lift 2px
 * on hover over 120ms with a border shift. No growing shadows.
 */
export function Card({
  children,
  className,
  interactive = false,
  inverted = false,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  inverted?: boolean;
  as?: 'div' | 'li' | 'article' | 'section';
}) {
  return (
    <Tag
      className={cn(
        'rounded-card border',
        inverted ? 'border-paper/15 bg-paper/5' : 'border-rule bg-paper-raised',
        interactive &&
          'card-lift ' + (inverted ? 'hover:border-paper/40' : 'hover:border-navy/40'),
        className,
      )}
    >
      {children}
    </Tag>
  );
}
