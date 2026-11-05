import { NextResponse } from 'next/server';
import { NOINDEX } from '@/lib/flags';
import { DEV_PREVIEW, PUBLIC_DEPLOY } from '@/lib/site-mode';

/*
 * Section 13 — the third noindex defence. A meta tag only helps once a crawler
 * has parsed the HTML; the header covers everything else this app serves,
 * including the OG images and the sitemap.
 *
 * TEMPORARY LANDING PAGE GATE (lib/site-mode.ts): outside `npm run dev`, only
 * the paths below are served. Everything else — the full site and its API
 * routes — answers 404 before any route code runs.
 */
const LANDING_ONLY_PATHS =
  /^\/(?:|privacy|terms|brand\/.*|robots\.txt|sitemap\.xml|opengraph-image.*|icon.*|apple-icon.*|favicon\.ico)$/;

export default function proxy(request: Request) {
  if (!DEV_PREVIEW && !LANDING_ONLY_PATHS.test(new URL(request.url).pathname)) {
    return new NextResponse('Not found', {
      status: 404,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    });
  }

  const response = NextResponse.next();
  if (NOINDEX || !PUBLIC_DEPLOY) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, noimageindex');
  }
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
