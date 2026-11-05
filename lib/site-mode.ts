/**
 * Site mode — TEMPORARY LANDING PAGE SWITCH.
 *
 * Decided by how the server was started, never by an environment variable, so
 * a deployment cannot be misconfigured into showing the wrong site:
 *
 *   npm run dev    NODE_ENV=development → the full site is reachable (dev only)
 *                  and the landing page links to it.
 *   npm run start  NODE_ENV=production  → only the one-page landing page is
 *   (and Vercel)                          served. Every other path returns 404
 *                                         from proxy.ts, and the full site's
 *                                         layout refuses to render.
 *
 * When the full site returns, delete this file's landing-only branches along
 * with app/(landing), components/landing and content/landing.
 */
export const DEV_PREVIEW = process.env.NODE_ENV === 'development';

/**
 * True only for the public deployment. Vercel Preview deployments are built in
 * production mode too, so VERCEL_ENV is what tells them apart: previews must
 * never be indexed. next.config.js repeats this check (it cannot import TS).
 */
export const PUBLIC_DEPLOY = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === 'production'
  : process.env.NODE_ENV === 'production';
