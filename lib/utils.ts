import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge has to be taught the Section 5 theme.
 *
 * Without this it cannot tell `text-caption` (a font size) from `text-paper`
 * (a colour), treats them as one class group, and silently drops one of them.
 * That produced a primary button with ink text on an ink background.
 * Registering the scale and the palette keeps merging correct.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'display-xl',
            'display-l',
            'h2',
            'h3',
            'body-l',
            'body',
            'caption',
            'mono-eyebrow',
          ],
        },
      ],
      'text-color': [
        {
          text: [
            'paper',
            'paper-raised',
            'paper-dark',
            'ink',
            'plane-public',
            'plane-protected',
            'boundary',
            'rule',
            'muted',
            'signal-red',
          ],
        },
      ],
      'bg-color': [
        {
          bg: [
            'paper',
            'paper-raised',
            'paper-dark',
            'ink',
            'plane-public',
            'plane-protected',
            'boundary',
            'rule',
            'muted',
            'signal-red',
          ],
        },
      ],
      rounded: [{ rounded: ['card', 'input', 'button'] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
