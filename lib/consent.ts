/**
 * Consent — Section 4.3 and Section 7.4.
 *
 * A privacy platform with a leaky website is disqualifying, so this module is
 * the only route by which a non-essential script could ever load.
 *
 * State of play in this build: there are NO tracking scripts. No analytics
 * package, no session recording, no chat widget, no A/B testing script is
 * installed, and Section 12 forbids adding one. The gate below exists so that
 * if a script is ever added it cannot bypass a recorded choice, and so the
 * banner's behaviour is testable today.
 *
 * The record lives in a first-party cookie, readable by the server for future
 * SSR decisions. Nothing else about the visitor is stored. Section 11 permits
 * localStorage for the consent preference and scorecard progress only — the
 * cookie is used here because it is first-party, expirable and server-visible.
 */

export const CONSENT_COOKIE = 'rumiq_consent';
export const CONSENT_POLICY_VERSION = 1;
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

/** Necessary is always true and is not a choice. */
export type ConsentCategory = 'necessary' | 'analytics' | 'marketing';

export type ConsentRecord = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  /** ISO timestamp of the recorded choice */
  decidedAt: string;
  version: number;
};

export const CONSENT_CHANGE_EVENT = 'rumiq:consent-change';
export const CONSENT_OPEN_EVENT = 'rumiq:consent-open';

export const denyAll = (): ConsentRecord => ({
  necessary: true,
  analytics: false,
  marketing: false,
  decidedAt: new Date().toISOString(),
  version: CONSENT_POLICY_VERSION,
});

export const allowAll = (): ConsentRecord => ({
  necessary: true,
  analytics: true,
  marketing: true,
  decidedAt: new Date().toISOString(),
  version: CONSENT_POLICY_VERSION,
});

function parse(raw: string): ConsentRecord | null {
  try {
    const value = JSON.parse(decodeURIComponent(raw)) as Partial<ConsentRecord>;
    if (typeof value !== 'object' || value === null) return null;
    if (value.version !== CONSENT_POLICY_VERSION) return null; // re-ask when the policy moves
    return {
      necessary: true,
      analytics: value.analytics === true,
      marketing: value.marketing === true,
      decidedAt: typeof value.decidedAt === 'string' ? value.decidedAt : new Date().toISOString(),
      version: CONSENT_POLICY_VERSION,
    };
  } catch {
    return null;
  }
}

/** Returns null when no choice has been recorded. Null means deny. */
export function readConsent(): ConsentRecord | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.split('; ').find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
  if (!match) return null;
  return parse(match.slice(CONSENT_COOKIE.length + 1));
}

export function writeConsent(record: ConsentRecord): void {
  if (typeof document === 'undefined') return;
  const value = encodeURIComponent(JSON.stringify(record));
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${CONSENT_COOKIE}=${value}; Path=/; Max-Age=${ONE_YEAR_SECONDS}; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent<ConsentRecord>(CONSENT_CHANGE_EVENT, { detail: record }));
}

/** Clears the record. Used by the styleguide harness to re-test the banner. */
export function clearConsent(): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${CONSENT_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: null }));
}

export function hasConsent(category: ConsentCategory): boolean {
  if (category === 'necessary') return true;
  const record = readConsent();
  if (!record) return false; // no choice recorded means no permission
  return record[category] === true;
}

/**
 * The only permitted way to run anything non-essential. Refuses silently when
 * no choice has been recorded, and re-checks on every consent change.
 */
export function whenConsented(category: ConsentCategory, run: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  let ran = false;
  const attempt = () => {
    if (ran || !hasConsent(category)) return;
    ran = true;
    run();
  };
  attempt();
  window.addEventListener(CONSENT_CHANGE_EVENT, attempt);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, attempt);
}

export function openConsentPreferences(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}
