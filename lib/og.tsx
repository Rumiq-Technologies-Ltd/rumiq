import { ImageResponse } from 'next/og';
import { tokenHex } from '@/lib/design-tokens';

/**
 * Section 13 — OG images, generated in-process.
 *
 * Nothing is fetched: no remote font, no remote image, no card-rendering
 * service (Section 4.3). The colours come from the token table rather than from
 * literals, so an OG card cannot drift from the palette (Section 12).
 *
 * Satori cannot parse woff2, and every vendored face is woff2, so the cards use
 * the renderer's own bundled face. The typography is therefore not brand-exact.
 * Vendoring a ttf subset of Bricolage Grotesque is the fix, and is deliberately
 * left until the wordmark lockup is final.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = 'image/png';

export function ogImage({
  eyebrow,
  title,
  footer = 'rumiq.com',
}: {
  eyebrow: string;
  title: string;
  footer?: string;
}) {
  const ink = tokenHex('paper-dark');
  const paper = tokenHex('paper');
  const boundary = tokenHex('boundary');
  const rule = tokenHex('rule');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: ink,
          padding: '72px',
          borderLeft: `12px solid ${boundary}`,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: rule,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: title.length > 70 ? 60 : 76,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: paper,
              maxWidth: 960,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 40, letterSpacing: '-0.02em', color: paper }}>rumiq</div>
          <div style={{ fontSize: 24, color: rule }}>{footer}</div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
