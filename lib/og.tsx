import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { tokenHex } from '@/lib/design-tokens';

/**
 * Section 13 — OG images, generated in-process.
 *
 * Nothing is fetched: no remote font, no remote image, no card-rendering
 * service (Section 4.3). The colours come from the token table rather than from
 * literals, so an OG card cannot drift from the palette (Section 12).
 *
 * The wordmark is the real asset, inlined as a data URI. Brand Guidelines v1.0
 * forbids redrawing it in type, so the card cannot simply set the word "rumiq"
 * in a font, and satori cannot fetch a remote image without making the
 * third-party request this site does not make.
 *
 * Satori cannot parse woff2, and every vendored face is woff2, so the headline
 * uses the renderer's own bundled face. The type on the card is therefore not
 * Manrope yet; a ttf subset would fix it.
 */

/** The reverse lockup, base64, read once per process. */
let logoDataUri: string | null = null;
function reverseLockup(): string {
  if (!logoDataUri) {
    const file = readFileSync(join(process.cwd(), 'public', 'brand', 'rumiq_logo_reverse_800.png'));
    logoDataUri = `data:image/png;base64,${file.toString('base64')}`;
  }
  return logoDataUri;
}

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
  // Teal, not amber: the card is brand, and amber here is a functional status
  // colour that means "policy stopped something".
  const accent = tokenHex('plane-public');
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
          borderLeft: `12px solid ${accent}`,
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={reverseLockup()} alt="Rumiq" width={216} height={60} />
          <div style={{ fontSize: 24, color: rule }}>{footer}</div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
