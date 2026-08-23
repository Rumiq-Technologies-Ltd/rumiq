import { NextResponse } from 'next/server';
import { NOINDEX } from '@/lib/flags';

/**
 * Section 13 — the third noindex defence. A meta tag only helps once a crawler
 * has parsed the HTML; the header covers everything else this app serves,
 * including the OG images and the sitemap.
 */
export default function proxy() {
  const response = NextResponse.next();
  if (NOINDEX) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, noimageindex');
  }
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
