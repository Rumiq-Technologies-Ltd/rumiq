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
          raised: token('paper-raised'),
          dark: token('paper-dark'),
        },
        ink: token('ink'),

        /* The two planes. Semantic, not decorative. */
        plane: {
          public: token('plane-public'),
          protected: token('plane-protected'),
        },

        /* The boundary. Policy moments only. */
        boundary: token('boundary'),

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
        ring: token('ink'),
        background: token('paper'),
        foreground: token('ink'),
        primary: { DEFAULT: token('ink'), foreground: token('paper') },
        secondary: { DEFAULT: token('paper-raised'), foreground: token('ink') },
        accent: { DEFAULT: token('paper-raised'), foreground: token('ink') },
        destructive: { DEFAULT: token('signal-red'), foreground: token('paper') },
        card: { DEFAULT: token('paper-raised'), foreground: token('ink') },
        popover: { DEFAULT: token('paper-raised'), foreground: token('ink') },
      },

      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },

      /* Section 5.3 — fluid scale, clamped between mobile and desktop. */
      fontSize: {
        'display-xl': ['clamp(2.75rem, 6vw, 5.25rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'display-l': ['clamp(2.25rem, 4.5vw, 3.75rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        h2: ['clamp(1.75rem, 3vw, 2.75rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        h3: ['clamp(1.25rem, 2vw, 1.625rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'body-l': ['1.125rem', { lineHeight: '1.6' }],
        body: ['1rem', { lineHeight: '1.65' }],
        caption: ['0.875rem', { lineHeight: '1.5' }],
        'mono-eyebrow': ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.08em' }],
      },

      /* Section 5.4 — nothing rounder than 4px. */
      borderRadius: {
        none: '0px',
        sm: '2px',
        DEFAULT: '4px',
        md: '4px',
        lg: '4px',
        xl: '4px',
        card: '4px',
        input: '4px',
        button: '2px',
      },

      spacing: {
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
      },

      animation: {
        'rise-in': 'rise-in 400ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'reveal-in': 'reveal-in 300ms linear both',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
