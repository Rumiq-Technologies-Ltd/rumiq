/** @type {import('tailwindcss').Config} */

/*
 * Section 5 design system.
 *
 * Every colour is a CSS custom property declared in app/globals.css and
 * exposed here through theme.extend. There are no hex values in this file and
 * none may appear in a component (Section 12).
 *
 * Colours resolve as hsl(var(--token-hsl) / <alpha-value>) so opacity
 * modifiers work — the header needs --paper at 92% (Section 7.1).
 */

const token = (name) => `hsl(var(--${name}-hsl) / <alpha-value>)`;

module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,jsx,ts,tsx,mdx}',
    './components/**/*.{js,jsx,ts,tsx,mdx}',
    './lib/**/*.{js,jsx,ts,tsx,mdx}',
    './content/**/*.{md,mdx}',
    './mdx-components.tsx',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        /* Rumiq surfaces */
        paper: {
          DEFAULT: token('paper'),
          alt: token('paper-alt'),
          raised: token('paper-raised'),
          dark: token('paper-dark'),
        },
        ink: {
          DEFAULT: token('ink'),
          strong: token('ink-strong'),
        },
        /* Brand primaries, by their brand names, for the few places that read
           better said out loud than through a surface token. */
        navy: token('paper-dark'),
        teal: token('plane-public'),

        /* The two planes. Semantic, not decorative. */
        plane: {
          public: {
            DEFAULT: token('plane-public'),
            /* Rumiq Teal is 3.05:1 on white, so small teal words use this. */
            ink: token('plane-public-ink'),
          },
          protected: token('plane-protected'),
        },

        /* The boundary. Policy moments only. `boundary-ink` is the same token
           as text on a light surface, where the amber itself cannot reach
           4.5:1 (see app/globals.css). */
        boundary: {
          DEFAULT: token('boundary'),
          ink: token('boundary-ink'),
        },

        /* Utility */
        rule: token('rule'),
        muted: {
          DEFAULT: token('muted'),
          foreground: token('muted'),
        },
        'signal-red': token('signal-red'),

        /* shadcn/ui contract, mapped onto the Rumiq palette so imported
           primitives inherit the design system without restyling. */
        border: token('rule'),
        input: token('rule'),
        ring: token('paper-dark'),
        background: token('paper'),
        foreground: token('ink'),
        primary: { DEFAULT: token('paper-dark'), foreground: token('paper') },
        secondary: { DEFAULT: token('paper-raised'), foreground: token('ink') },
        accent: { DEFAULT: token('paper-raised'), foreground: token('ink') },
        destructive: { DEFAULT: token('signal-red'), foreground: token('paper') },
        card: { DEFAULT: token('paper-raised'), foreground: token('ink') },
        popover: { DEFAULT: token('paper'), foreground: token('ink') },
      },

      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },

      /* Section 5.3 — fluid scale, clamped between mobile and desktop. */
      fontSize: {
        /* Brand Guidelines type scale. Display XL 64-72, H1 48-56, H2 36-40,
           H3 26-30, Lead 20, Body 16, Small 14, Caption 12. Fluid between the
           stated bounds rather than stepped, and tracking kept restrained:
           the guidelines ask for no exaggerated tracking. */
        'display-xl': ['clamp(2.75rem, 5.5vw, 4.5rem)', { lineHeight: '1.04', letterSpacing: '-0.022em' }],
        'display-l': ['clamp(2.25rem, 4.2vw, 3.5rem)', { lineHeight: '1.07', letterSpacing: '-0.02em' }],
        h2: ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        h3: ['clamp(1.375rem, 2vw, 1.875rem)', { lineHeight: '1.28', letterSpacing: '-0.01em' }],
        'body-l': ['1.25rem', { lineHeight: '1.6' }],
        body: ['1rem', { lineHeight: '1.65' }],
        caption: ['0.875rem', { lineHeight: '1.55' }],
        /* Small uppercase labels, never headlines. Tracking pulled back from
           0.08em to 0.045em per the brand's note on exaggerated tracking. */
        'mono-eyebrow': ['0.75rem', { lineHeight: '1.25', letterSpacing: '0.045em' }],
      },

      /* Section 5.4 — nothing rounder than 4px. */
      /* Brand shape language: rounded arcs, not hard corners.
         Buttons 8, cards 12, large containers 16. */
      borderRadius: {
        none: '0px',
        sm: '4px',
        DEFAULT: '8px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        card: '12px',
        input: '8px',
        button: '8px',
        panel: '16px',
      },

      spacing: {
        18: '72px',
        13: '52px',
        gutter: '64px',
        section: '120px',
        'section-mobile': '72px',
      },

      maxWidth: {
        content: '1280px',
        bleed: '1440px',
        measure: '68ch',
      },

      borderWidth: { hairline: '1px', edge: '3px' },

      transitionDuration: {
        120: '120ms',
        300: '300ms',
        400: '400ms',
        600: '600ms',
      },

      transitionTimingFunction: {
        instrument: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      keyframes: {
        'rise-in': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'reveal-in': {
          from: { opacity: '0.08' },
          to: { opacity: '1' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },

      animation: {
        'rise-in': 'rise-in 400ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'reveal-in': 'reveal-in 300ms linear both',
        'accordion-down': 'accordion-down 200ms ease-out',
        'accordion-up': 'accordion-up 200ms ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
