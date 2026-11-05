# Deployment gaps

Running list of what is missing or unresolved before and after the public launch
at https://rumiq.ai. Remove an item when it is closed; don't leave closed items
behind as history.

Status key: **Open** (not done), **Decision** (needs a call from the owner),
**Deferred** (agreed to wait).

---

## Readiness verdict (current)

**Ready to publish.** The production build passes, `npm audit` reports 0
vulnerabilities, and production serves only the landing page. Security headers
are strict, the public deployment is indexable, previews are not, and the sitemap,
robots, metadata and JSON-LD are correct.

**Resolved since the last review:**
- Privacy and Terms are now generic published notices with no placeholders and no
  draft banners. Each one says that the full document will replace it when it is
  finalised. Counsel should still review the full documents before they replace these.
- The entity name is "Rumiq Technologies (SMC-Private) Limited" in the footer, the copyright, the
  legal pages and the structured data.
- Job postings are sourced from the two supplied documents. Salary stays off the
  page, the close date is 12 November 2026, and the page avoids "HIPAA compliant".

**Still to be aware of:**
- The job postings' salary and the "Shared living and working space" wording are
  in the owner's hands. Confirm before the next change to the careers section.

**Repository hygiene before committing:**
- `.claude/` is now ignored in `.gitignore`. Local preview-tool files stay out of commits.
- `AGENTS.md` is untracked and was not created by this work. It is not ignored; decide whether it belongs.
- `package-lock.json` is untracked and must be committed so Vercel installs the same versions.
- `DEPLOYMENT-GAPS.md` and `DESIGN-BACKLOG.md` are working notes. Commit them only if the team wants them.

**Production configuration:**
- `NEXT_PUBLIC_BASE_URL=https://rumiq.ai` should be set in Vercel Production. The
  code falls back to that value, so this is recommended rather than required.
- `FORM_WEBHOOK_URL`, `SCORECARD_WEBHOOK_URL`, `MONGO_URL` and `DB_NAME` are not
  needed for the landing page. They only matter once the forms or the full site return.

**Deferred (agreed):** forms webhook, dead Mongo route, the full site's content
and legal review, and the full CSP. See the sections below.

## Done in the landing-page change

- **Production URL.** `lib/seo.ts` falls back to `https://rumiq.ai` when
  `NEXT_PUBLIC_BASE_URL` is unset in production. Canonicals, OG URLs, the sitemap
  and JSON-LD now point at the live domain. Setting `NEXT_PUBLIC_BASE_URL=https://rumiq.ai`
  in the Vercel Production environment is still advisable so the value is explicit.
- **Production headers.** Outside development, `next.config.js` sends
  `X-Frame-Options: DENY`, `frame-ancestors 'none'`, `nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, and a restricted
  `Permissions-Policy`. The wildcard CORS header is gone from production.
  Development keeps the permissive headers because the preview proxy embeds the app.
- **Indexing.** `NOINDEX = false` for the public deployment. Non-production
  deployments (Vercel previews, local dev) send `noindex` through the meta tag,
  `X-Robots-Tag` header and `robots.txt`, so previews are never indexed.
- **One package manager.** npm is the only manager. The `packageManager: yarn`
  field is removed, and yarn `resolutions` became npm `overrides`.
  `package-lock.json` is the lockfile.
- **npm audit is clean.** 0 vulnerabilities after a clean `npm ci`. The four
  high-severity findings were fixed by upgrading `zod` to 4.6.7 (form validation
  migrated: `errorMap` became `error`, and the validation messages were checked
  against the dev API), pinning `postcss` to 8.5.32 and `follow-redirects` to
  1.16.2, and removing `axios`, which nothing imported.
- **Route gate.** Outside `npm run dev`, only the landing page and its metadata
  files are served. Everything else returns 404.

---

## Blocking the full site (not the landing page)

- **Open. Form submissions are silently dropped.** `FORM_WEBHOOK_URL` is unset.
  `app/api/forms/[form]/route.ts` and `app/api/scorecard/route.ts` return
  `{ ok: true, delivered: false }` when no webhook is set, so leads are lost
  without any error. **Deferred:** the owner will handle forms later. Before the
  full site returns, decide where submissions go and make a missing webhook a
  hard failure in production.
- **Open. Mongo catch-all API has no callers.** `app/api/[[...path]]/route.js`
  uses `mongodb` and `MONGO_URL`, and nothing in the site calls it. It's gated off
  in production, but it's dead code with a `*` origin. Remove it along with the
  `mongodb` and `uuid` dependencies and the `serverExternalPackages` entry, or
  document why it stays.
- **Open. Subprocessor list is a scaffold.** `content/trust.ts` and
  `app/(site)/trust/page.tsx` say it is deliberately empty and needs legal review
  and vendor-by-vendor confirmation.
- **Open. Pilot proof is placeholder.** `app/(site)/full/page.tsx`,
  `components/rumiq/proof-slot.tsx`, `content/faq.ts` and
  `app/(site)/solutions/[sector]/page.tsx` all say real content is needed and
  pilot naming needs written client approval.
- **Open. FAQ copy is not final.** `app/(site)/styleguide/page.tsx` still holds
  placeholder FAQ entries. The real copy comes from Document 05.
- **Open. Full Content-Security-Policy.** Production sends only `frame-ancestors`.
  A full CSP needs a decision on nonces or hashes for Next's inline scripts
  before it can be applied.
- **Open. Security headers are not verified on the live domain.** Confirm
  HSTS and TLS on Vercel once the domain is attached.

## Dependencies and build hygiene

- **Expected. `npm ls` shows two "extraneous" packages.** `@img/sharp-wasm32` and
  `@emnapi/runtime` are optional WebAssembly fallbacks for the platform-specific
  sharp packages (for example FreeBSD). npm lists them because the platform
  packages that depend on them don't install on this machine. A clean `npm ci`
  and the production build both pass. Ignore this message.
- **Open. No lint or test script.** `package.json` has no `lint` or `test` script
  and there's no ESLint config. `tests/contrast.mjs` (WCAG audit) passes but is
  only run by hand.
- **Open. Package identity.** `package.json` is still named `nextjs-mongo-template`.
- **Open. Repository clutter.** Root-level Python tests (`backend_test.py`,
  `backend_test_build_verification.py`, `test_forms_scorecard.py`), `test_result.md`,
  `test_reports/`, and the `.emergent/` folder with platform cron scripts are
  committed. None of it ships in the build, but it confuses the repo.
- **Open. Untracked `AGENTS.md`.** It appeared during the session and is not part of
  this change. Decide whether to commit it or delete it.
- **Open. Dev-only warnings.** The MDX loader prints a deprecation warning for the
  classic JSX pragma, and `next.config.js` enables the `reactDebugChannel`
  experiment. Neither affects production, but both should be checked before a
  Next upgrade.

## Landing page: built, awaiting these decisions

The one-page site is built from the owner's copy (`content/landing/index.ts`) and
verified in production and dev. These items remain before or just after launch:

- **Open. Privacy and Terms are draft copy.** `content/landing/legal.ts` holds
  short pages with bracketed placeholders (registered address and company number,
  lawful basis, retention period, data protection contact, liability, governing
  law). Counsel must settle these before the pages are relied on. The draft banner
  stays until then.
- **Open. Legal entity name differs.** The owner's copy says "Rumiq Technologies
  Limited"; `content/site.ts` says "Rumiq Technologies (SMC-Private) Limited". The footer follows the
  copy. The structured data and legal text use `site.ts`. Confirm the registered
  name and make both match.
- **Resolved. JobPosting close date.** Set to 12 November 2026, the deadline in
  the job postings, for both roles.
- **Open. Two JobPosting nodes, no salary.** Both roles are published as
  structured data. Salary is left off, per the owner's rule. The job postings
  quote PKR 70,000–90,000 (Multimedia Designer) and PKR 150,000–180,000
  (Digital Marketing Specialist). Confirm that the postings stay the only place
  for salary.
- **Open. Job posting wording to confirm.** The Digital Marketing posting says
  "HIPAA compliant". The owner's brief asks for "HIPAA-conscious" on the public
  site, so the page avoids that phrase. The same posting says "Florida (US Eastern)
  hours", which is probably a slip for US Eastern hours. The page uses "US Eastern
  hours".
- **Open. Location wording.** The new postings say "Shared living and working
  space, Islamabad" and mention free accommodation. The owner's earlier copy named
  a co-working space in Gulberg Greens. The page uses the new wording and no longer
  names the building.
- **Open. Organisation address in structured data.** It uses the registered
  DIFC office, not the Islamabad team. Confirm that is the address to publish.
- **Open. Inferred section labels.** The eyebrows "What we do", "Who we work with",
  "How we work", "Careers" and "Contact" come from the owner's section names. The
  "Contact" eyebrow was added by me, not supplied. Confirm.
- **Open. Mobile navigation.** The anchor links are hidden below the large
  breakpoint, leaving only "We're hiring" in the header. Anchor links are still
  reachable by scrolling. Decide whether a mobile menu is needed.
- **Open. Landing has no cookie or consent handling.** It sets no cookies and
  loads no third-party scripts, so no consent banner is shown. Re-check this if
  analytics or chat are ever added. `lib/consent.ts` says no tracking scripts are
  permitted.
- **Open. Full-site legal pages moved.** They now live at `/legal/privacy` and
  `/legal/terms` in dev only, so the landing pages can own `/privacy` and `/terms`.
  Restore the original paths when the full site returns.

## Verification still to do

- Confirm the live domain serves the landing page and the headers after the Vercel
  deployment.
- Check the Vercel Production environment for `NEXT_PUBLIC_BASE_URL`. This is
  optional now but recommended.
- Confirm a Vercel Preview deployment sends `noindex` (it should, through
  `VERCEL_ENV`).
