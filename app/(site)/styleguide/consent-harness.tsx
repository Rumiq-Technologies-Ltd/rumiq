'use client';

import * as React from 'react';
import { Button } from '@/components/rumiq';
import {
  CONSENT_CHANGE_EVENT,
  CONSENT_COOKIE,
  clearConsent,
  hasConsent,
  openConsentPreferences,
  readConsent,
} from '@/lib/consent';

/**
 * Styleguide harness for the consent banner. Internal tooling, not a site
 * component: it exposes the recorded cookie so the Section 4.3 behaviour can be
 * verified without opening devtools.
 */
export function ConsentHarness() {
  const [record, setRecord] = React.useState<string>('reading…');

  const refresh = React.useCallback(() => {
    const current = readConsent();
    setRecord(
      current
        ? JSON.stringify(current)
        : 'no choice recorded — every non-essential category is denied',
    );
  }, []);

  React.useEffect(() => {
    refresh();
    window.addEventListener(CONSENT_CHANGE_EVENT, refresh);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, refresh);
  }, [refresh]);

  return (
    <div className="rounded-card border border-rule bg-paper-raised p-5">
      <p className="font-mono text-mono-eyebrow uppercase text-muted">
        Cookie {CONSENT_COOKIE}
      </p>
      <p className="mt-3 break-all font-mono text-caption">{record}</p>
      <dl className="mt-4 grid gap-2 font-mono text-caption sm:grid-cols-2">
        <div className="flex gap-2">
          <dt className="text-muted">hasConsent(analytics)</dt>
          <dd>{String(hasConsent('analytics'))}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-muted">hasConsent(marketing)</dt>
          <dd>{String(hasConsent('marketing'))}</dd>
        </div>
      </dl>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button size="sm" variant="secondary" onClick={openConsentPreferences}>
          Open preferences
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            clearConsent();
            refresh();
            openConsentPreferences();
          }}
        >
          Clear the choice and show the banner
        </Button>
        <Button size="sm" variant="ghost" onClick={refresh}>
          Re-read the cookie
        </Button>
      </div>
      <p className="mt-4 max-w-measure text-caption text-muted">
        There are no tracking scripts in this build, so nothing can fire either way. The gate in
        lib/consent.ts is the only route by which one could ever load, and it refuses until a choice
        is recorded.
      </p>
    </div>
  );
}
