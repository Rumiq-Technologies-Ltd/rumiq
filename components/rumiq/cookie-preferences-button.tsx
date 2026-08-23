'use client';

import { openConsentPreferences } from '@/lib/consent';
import { consentCopy } from '@/content/site';

/**
 * Section 7.4 — a persistent link to reopen preferences. Lives in the footer on
 * every page.
 */
export function CookiePreferencesButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentPreferences} className={className}>
      {consentCopy.reopen}
    </button>
  );
}
