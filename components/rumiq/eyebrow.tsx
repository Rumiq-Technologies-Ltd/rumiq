import { cn } from '@/lib/utils';

/**
 * Section 5.3 — small uppercase monospace label above a statement headline.
 * Takes copy as children; never contains copy of its own.
 */
export function Eyebrow({
  children,
  className,
  tone = 'muted',
  as: Tag = 'p',
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'muted' | 'ink' | 'inverted';
  as?: 'p' | 'span' | 'div';
}) {
  const tones = {
    muted: 'text-muted',
    ink: 'text-ink',
    inverted: 'text-paper/60',
  } as const;

  return (
    <Tag className={cn('font-mono text-mono-eyebrow uppercase', tones[tone], className)}>
      {children}
    </Tag>
  );
}
