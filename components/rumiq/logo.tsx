import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * The Rumiq logo, per Brand Guidelines v1.0.
 *
 * Four assets, no CSS recreations: the wordmark is never redrawn in type, never
 * recoloured, never stretched, and never given a shadow, glow, stroke or bevel.
 *
 *  • `primary`     full colour lockup. White and pale backgrounds only.
 *  • `reverse`     white lockup. Navy and dark backgrounds only.
 *  • `mark`        the wing symbol alone, for anything below the 120px minimum
 *                  width of the full lockup, and for square contexts.
 *  • `markReverse` the same symbol on dark.
 *
 * Minimum size: the guidelines set 120px for the full horizontal lockup and
 * prefer 160px or more. Asked for a lockup below 120 this component renders the
 * symbol instead, which is exactly what the print rule says to do below 30mm.
 */

const ASSETS = {
  primary: { src: '/brand/rumiq_logo_primary_800.png', w: 800, h: 222 },
  reverse: { src: '/brand/rumiq_logo_reverse_800.png', w: 800, h: 222 },
  mark: { src: '/brand/rumiq_mark_256.png', w: 256, h: 223 },
  markReverse: { src: '/brand/rumiq_mark_reverse_3000.webp', w: 3000, h: 2613 },
} as const;

const LOCKUP_MIN_WIDTH = 120;

export function Logo({
  variant = 'primary',
  width = 148,
  className,
  priority = false,
}: {
  variant?: 'primary' | 'reverse' | 'mark' | 'markReverse';
  /** Rendered width in px. Lockups below 120 fall back to the symbol. */
  width?: number;
  className?: string;
  priority?: boolean;
}) {
  const isLockup = variant === 'primary' || variant === 'reverse';
  const resolved =
    isLockup && width < LOCKUP_MIN_WIDTH
      ? variant === 'reverse'
        ? 'markReverse'
        : 'mark'
      : variant;

  const asset = ASSETS[resolved];
  const height = Math.round((width * asset.h) / asset.w);

  return (
    <Image
      src={asset.src}
      alt="Rumiq"
      width={width}
      height={height}
      priority={priority}
      sizes={`${width}px`}
      className={cn('h-auto', className)}
      style={{ width, height }}
    />
  );
}
