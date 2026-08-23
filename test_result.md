#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
  - task: "Section 8.11 /approach with the phase table rendered directly"
    implemented: true
    working: true
    file: "app/approach/page.tsx, content/approach.ts"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "200. Hero, four operating principles, then the six-phase table as a real <table> (sr-only caption, th scope=col, th scope=row per phase, plane-coloured left border per row) inside a focusable scroll region so it can be panned from the keyboard on a narrow viewport. Then what-this-is-not as an inverted points list, an amber stop-point policy callout, the FAQ slot and the CTA band. Verified by screenshot at 1920x1000. Copy is authored to the Section 8.11 structure and needs sign-off against the literal spec text."
  - task: "/demo with all three demos stacked under an illustrative-data banner"
    implemented: true
    working: true
    file: "app/demo/page.tsx, content/demo.ts"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "200. Banner is the first thing after the H1, on-screen text, above every figure. Browser check: 13 radios (sandbox), 4 selects (dashboard + call correction), 4 illustrative-data labels, exactly one H1, all three anchor targets present (#policy-sandbox, #dashboard, #call-review) with scroll-mt so the sticky header does not cover the heading. The three standalone demo pages still work."
  - task: "Section 8.14 /about with both pilots and what each proves"
    implemented: true
    working: true
    file: "app/about/page.tsx, content/about.ts"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "200. Two pilot cards (Florida dental group, NEMT operator) each with runs-on, the problem, a what-it-proves list and an explicit 'not named publicly until written client approval' status. Entity facts list states Certifications: None claimed. No headcount, funding, award or customer count anywhere. Careers section says there are no open roles rather than inventing any."
  - task: "Section 8.15 /contact - working session, never 'book a demo'"
    implemented: true
    working: true
    file: "app/contact/page.tsx, content/contact.ts"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "200. Form is high on the page with the agenda beside it. No shared CTA band on this page (Section 7.3). Browser-verified: submitting empty produces a role=alert error summary listing every field with its own message and 7 controls marked aria-invalid; a valid submission returns 200 and the success panel replaces the form in place with no redirect. Grep confirms the phrase 'book a demo' appears nowhere except in comments explaining that it must not."
  - task: "Section 8.13 /insights MDX index plus slug route"
    implemented: true
    working: true
    file: "app/insights/page.tsx, app/insights/[slug]/page.tsx, content/insights/*.mdx, mdx-components.tsx, next.config.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Index 200 with three pieces, each with plane tag, topic, date, reading time and intended reader; all three slugs 200; an unknown slug 404s. Article bodies are MDX compiled by @next/mdx and styled once in /mdx-components.tsx. One real trap: with the automatic JSX runtime the compiled MDX imports react/jsx-runtime, which resolves to React's react-server variant inside the RSC layer while the module's own react does not, and every article threw 'cannot read properties of undefined (reading recentlyCreatedOwnerStacks)'. Fixed by compiling MDX with the classic pragma (React.createElement) in next.config.js; @mdx-js prints a deprecation notice for that option, which is noise, not a fault. Article copy is authored and needs editorial sign-off."
  - task: "/privacy /cookies /terms legal scaffolds"
    implemented: true
    working: true
    file: "app/privacy/page.tsx, app/cookies/page.tsx, app/terms/page.tsx, content/legal.ts, components/rumiq/legal-scaffold.tsx"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "All three 200, so the footer legal links no longer 404. One shared component, so the AWAITING LEGAL REVIEW banner cannot be present on two pages and missing from the third. Each page states only facts that are true of this build and checkable in the source, then lists the sections counsel still has to write, numbered, so the gaps are visible rather than implied."
  - task: "Section 10 /scorecard page (was missing from the previous prompt)"
    implemented: true
    working: true
    file: "app/scorecard/page.tsx, app/scorecard/scorecard.tsx, content/scorecard.ts, lib/scorecard.ts"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Browser-verified end to end: start, answer all ten as radio groups (arrow keys work natively), progress bar with role=progressbar and a live announcement per question, gate appears only AFTER question ten, 'Show results without emailing them' walks around the gate, results show total out of 30, the band and the five weakest areas worst-first with observation, likely cost and first fix. Progress is held in React state plus one localStorage key (rumiq.scorecard.v1) and resumes on return. The email is POSTed in the body and never enters the URL."
  - task: "Section 13 SEO: titles, descriptions, canonicals, OG images, JSON-LD, sitemap, robots, noindex"
    implemented: true
    working: true
    file: "lib/seo.ts, app/robots.ts, app/sitemap.ts, proxy.ts, app/opengraph-image.tsx, lib/og.tsx, components/rumiq/json-ld.tsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Audited all 31 routes programmatically: every one has a unique title, a unique description, a self-referencing canonical and an og:image; no duplicates. JSON-LD: Organization and WebSite once site-wide, WebPage plus BreadcrumbList per page, Article on insight pages, CollectionPage on the index, and FAQPage only when Document 05 entries exist (so no empty node is emitted today). OG cards are generated in-process by next/og with no remote font or image; satori cannot read woff2 and every vendored face is woff2, so the cards use the renderer's bundled face and are not yet brand-exact. noindex is enforced three ways while NOINDEX is true: meta robots on every route, robots.txt disallowing everything, and an X-Robots-Tag header from proxy.ts (renamed from middleware.ts, which Next 16 deprecates). One gotcha fixed: Next only merges a file-based OG image into pages that do not declare their own openGraph object, and every page here does, so lib/seo.ts names the image route explicitly."
  - task: "WCAG 2.2 AA pass: contrast, keyboard, announcements"
    implemented: true
    working: true
    file: "tests/contrast.mjs, app/globals.css, tailwind.config.js, components/rumiq/form.tsx, components/rumiq/data-freshness.tsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "tests/contrast.mjs measures every token pair the site actually renders, reading hexes from lib/design-tokens.ts so it cannot drift. It now passes. Three real failures were found and fixed: (1) amber text on paper is 2.5:1, and amber text was used on light surfaces in all three demos, /platform and the solutions template - added --boundary-ink (#9C6200, 4.6:1 on paper) as the light-surface form of the boundary token and switched every light-surface use to it, keeping --boundary for fills, rules and dark surfaces; (2) form control borders used --rule at 1.4:1, below the 3:1 that 1.4.11 requires for an input's own boundary - now ink at 60% (4.5:1); (3) DataFreshness conveyed state by dot colour alone with an sr-only label, which fails 1.4.1 for sighted users - the state label is now rendered on screen. Called-out pairs: --muted on --paper is 5.06:1 PASS, amber on --paper-dark is 6.68:1 PASS. Keyboard: sandbox is radio fieldsets with a peer-focus-visible ring, dashboard and call correction are native selects inside labels, the call list is real buttons with aria-current, sector toggle uses a roving tabindex. Each demo has an aria-live region; the one that was missing (selecting a call silently replaced the whole detail column) now announces the selected call. Not yet done: no narrow-viewport (320-360px) pass and no reduced-motion pass - the screenshot harness pins the viewport wide."
  - task: "FAQ accordions on Home, /platform, /trust, /approach, /contact and all five solutions pages"
    implemented: true
    working: true
    file: "content/faq.ts, components/rumiq/faq-section.tsx, components/rumiq/faq-accordion.tsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Document 05 received and placed verbatim. Sixteen entries in content/faq.ts, nothing added, nothing rewritten, no number or timeframe attached to an answer that did not already carry one. Verified programmatically across all ten pages: entry count and ORDER match the placement map exactly on every one (home 6, platform 4, trust 5, approach 4, contact 2, independent 5, dental 4, multi-site 4, transport 4, health-systems 5). SHOW_PRICING is false, so cost resolves to cost-no-numbers and cost-with-numbers is built but hidden - grepped the rendered HTML of every page for the dollar figures and found none. No second flag was introduced for the cost pair; both variants read the one SHOW_PRICING flag, so lib/flags.ts still has exactly three. Pilot naming is gated by a content constant (not a flag) defaulting to false with the required TODO, so proof and sectors render the generic variants - confirmed no page renders the Florida naming through the FAQ. Two fixes while wiring it up: the accordion was printing an internal Document 05 id under every answer, which would have shown a buyer build metadata, now removed; and Radix was unmounting closed content, so no answer existed in the initial HTML - the content is now forceMounted and display:none when closed, which puts every answer in the HTML for a no-JS reader and any non-interacting crawler, at the cost of the close animation. FAQPage JSON-LD emits per page with the right question count and plain-text answers with emphasis markers stripped. Browser-verified on /trust: five triggers in order, aria-expanded flips, answer text renders as separate paragraphs, whats-included keeps its two-part bold and shows no asterisks."
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: true
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================
user_problem_statement: |
  Build the Rumiq Healthcare Growth Platform marketing website per the supplied
  Build Specification (Document 01, v2.0). Delivered one prompt at a time.
  Prompt 1: project setup, Section 5 design token system, self-hosted fonts,
  lib/flags.ts, and a /styleguide route. Build nothing else.

backend:
  - task: "Policy Sandbox decision matrix verification endpoint"
    implemented: true
    working: true
    file: "app/api/policy-sandbox/verify/route.ts, lib/demo/policy-sandbox.ts"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "GET /api/policy-sandbox/verify returns all 72 combinations (6 page types x 4 destinations x 3 consent states) from the pure engine in lib/demo/policy-sandbox.ts, each with per-field state, decision, reason and counts. Exists so the Section 9.1 matrix can be verified exhaustively rather than eyeballed. Read-only, synthetic data, no database. Needs testing against the specification table."
        - working: true
          agent: "testing"
          comment: "EXHAUSTIVE VERIFICATION COMPLETE - ALL TESTS PASSED (15/15). Verified GET /api/policy-sandbox/verify against Section 9.1 specification through both https://build-guide-127.preview.emergentagent.com/api/policy-sandbox/verify and http://localhost:3000/api/policy-sandbox/verify. Response structure correct: 72 evaluations (6 page types x 4 destinations x 3 consent states), correct field order (event_name, timestamp, page_url, page_class, utm_source, utm_campaign, gclid, service_interest, form_free_text, email, phone). A) CONSENT RULE VERIFIED: For consent denied/not_set with google_ads, meta, ga4: ALL 36 evaluations correctly BLOCK with sent=0, all present fields blocked, correct reasons (consent_denied/consent_not_recorded). This holds for ALL page types including homepage and blog_article. For internal destination: consent state does NOT affect outcome - decision, sent, redacted, blocked, and per-field states are byte-identical across granted/denied/not_set for all 6 page types. B) WITH CONSENT GRANTED VERIFIED: (1) homepage & blog_article to ads/ga4/internal: decision=ALLOW, 7 fields sent (event_name, timestamp, page_url, page_class, utm_source, utm_campaign, gclid), 0 redacted, 0 blocked, service_interest/form_free_text/email/phone absent. (2) service_page: to ads - service_interest and page_url redacted (not original 'dental_implants'), decision=REDACT; to ga4 - service_interest generalised, decision=REDACT; to internal - decision=ALLOW, no redactions. (3) appointment_form: to ads/ga4 - service_interest, form_free_text, email, phone ALL blocked, campaign fields pass for conversion attribution; to internal - all 11 fields allowed (sent=11, decision=ALLOW). (4) portal_login & (5) medical_intake: to ads/ga4 - fully blocked (sent=0, decision=BLOCK, reason=default_deny_class); to internal - allowed. C) INTEGRITY CHECKS VERIFIED: total always 11, sent+redacted counting coherent (allowed+redacted=sent, allowed+redacted+blocked+absent=11), decision=BLOCK iff sent=0, decision=REDACT only when redacted>0 and sent>0, no blocked field has non-null value. CRITICAL SECURITY ASSERTION VERIFIED: NO evaluation sends email, phone, or form_free_text to google_ads, meta, or ga4 under ANY page type or consent state (checked all 72 evaluations). Engine implementation is specification-compliant."
  - task: "Section 11 form submission endpoint (POST /api/forms/[form])"
    implemented: true
    working: true
    file: "app/api/forms/[form]/route.ts, lib/forms/schemas.ts, content/forms.ts"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "POST only. Handles two of the three Section 11 forms: form ids working-session and insights (the third, scorecard, has its own route because it also computes a result). Order of checks is deliberate: (1) honeypot field organisation_website must be empty, (2) timing - Date.now() minus startedAt must be at least 2000ms and at most 12h, (3) Zod validation using the same schema object the browser used. Honeypot failure returns 400 with a deliberately generic message; timing failures return 422; validation failures return 400 with a per-field errors map. Unknown form id returns 404. Delivery goes to FORM_WEBHOOK_URL if set; it is NOT set in this environment, so a valid submission must return {ok:true, delivered:false} and persist nothing. No CAPTCHA anywhere by design. Needs testing."
        - working: true
          agent: "testing"
          comment: "COMPREHENSIVE TESTING COMPLETE - ALL 16 TESTS PASSED. Tested POST /api/forms/[form] for both working-session and insights forms through http://localhost:3000 and https://build-guide-127.preview.emergentagent.com. VERIFIED: (1) Unknown form ID returns 404 with ok:false. (2) Malformed JSON returns 400 (not 500). (3) Honeypot: non-empty organisation_website returns 400 with generic message that does NOT leak the honeypot reason. (4) Timing gates work correctly: missing startedAt returns 422, < 2000ms returns 422 with 'too fast' message, > 12 hours returns 422 with expiry message. (5) Zod validation returns 400 with field-level errors map for: missing email (errors.email), malformed email 'notanemail' (errors.email), message < 20 chars (errors.message), consent:false (errors.consent), empty body (returns 422 as timing check runs first). (6) Valid submissions for both working-session and insights return 200 with {ok:true, delivered:false} as FORM_WEBHOOK_URL is unset. (7) GET/PUT/DELETE methods correctly return 405 (method not allowed). (8) External URL happy path verified: working-session form with realistic data returns 200 correctly. Order of checks (honeypot → timing → validation) is specification-compliant. No data persistence occurs when webhook is unset. All requirements met."
  - task: "Section 10 scorecard endpoint (POST /api/scorecard)"
    implemented: true
    working: true
    file: "app/api/scorecard/route.ts, lib/scorecard.ts, content/scorecard.ts"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "POST only so the email address can never appear in a URL, query string or referrer. Body: {email, consent:true, answers:[10 ints 0-3], startedAt, organisation_website}. Same honeypot and timing gates as the forms route, then Zod, then the score is computed SERVER-SIDE from the answers (never trusted from the client) and returned as {ok:true, delivered:false, result:{total, max:30, band:{id,label,body}, weakest:[5 areas worst-first]}}. Scoring rules: total is the sum of the ten answers (0-30); bands are severe 0-9, partial 10-17, solid 18-24, strong 25-30; weakest is the five lowest-scoring questions, ties broken by question order, each with id, area and score. GET must not be allowed. Needs testing."
        - working: true
          agent: "testing"
          comment: "COMPREHENSIVE TESTING COMPLETE - ALL 24 TESTS PASSED. Tested POST /api/scorecard through http://localhost:3000 and https://build-guide-127.preview.emergentagent.com. VERIFIED: (1) Honeypot and timing gates work identically to forms route: non-empty organisation_website returns 400, < 2000ms returns 422. (2) Zod validation returns 400 with field-level errors for: answers array length 9 or 11 (errors.answers), answer values 4 or -1 out of range (errors.answers), missing answers (errors.answers), consent:false (errors.consent), malformed email (errors.email). (3) GET method returns 405 (not allowed), including GET with email in query string - email can never appear in URL. (4) SERVER-SIDE SCORING VERIFIED: All 8 band boundary test cases correct: total=0 → severe, total=9 → severe (boundary), total=10 → partial (boundary), total=17 → partial (boundary), total=18 → solid (boundary), total=24 → solid (boundary), total=25 → strong (boundary), total=30 → strong. max is always 30. (5) Weakest 5 ordering verified with crafted test case [3,3,3,3,3,0,1,2,0,1]: returns [consent(0), discovery(0), pages(1), voice(1), ledger(2)] - ties correctly broken by question order (index). (6) Question IDs match content/scorecard.ts specification: calls, reason, attendance, capacity, attribution, consent, pages, ledger, discovery, voice. (7) Response structure correct: {ok:true, delivered:false, result:{total, max, band:{id,label,body}, weakest:[5 items with id/area/score]}}. (8) CRITICAL SECURITY ASSERTION: email address is NEVER reflected in response body - verified across all test cases. (9) External URL happy path verified: scorecard with total=15 correctly returns band 'partial'. All scoring is server-side, client cannot manipulate results. All requirements met."
  - task: "No backend work in Prompt 1"
    implemented: false
    working: "NA"
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "low"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Template route handler untouched. Forms and the scorecard (Sections 10, 11) need server routes but are out of scope until their prompts."

frontend:
  - task: "Next 16 + React 19 + TypeScript strict setup"
    implemented: true
    working: true
    file: "tsconfig.json, next.config.js, package.json"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Upgraded template from Next 15.5.18/React 18 to Next 16.3.2/React 19.2.8. tsconfig strict, allowJs for the existing shadcn .jsx primitives. Removed the template webpack watchOptions block (Turbopack is default in 16 and errored on a webpack config) and set turbopack:{}. npx tsc --noEmit passes clean. Dev server ready, / and /styleguide both 200."
  - task: "Section 5 design token system"
    implemented: true
    working: true
    file: "app/globals.css, tailwind.config.js, lib/design-tokens.ts"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "All Section 5.2 tokens declared as CSS custom properties in globals.css (canonical hex plus HSL triplet) and exposed to Tailwind via theme.extend as hsl(var(--x-hsl)/<alpha-value>) so opacity modifiers work for the 92% header. Fluid type scale, 12-col grid, max-w-content 1280 / bleed 1440 / measure 68ch, gutter 64px, section padding 120/72, radius 4px cards+inputs / 2px buttons. shadcn token contract remapped onto the Rumiq palette. Added one token beyond 5.2 -- signal-red -- required by the red chips in 9.2/9.3; flagged to the user. No inline hex in any component."
  - task: "Self-hosted fonts"
    implemented: true
    working: true
    file: "lib/fonts/index.ts, lib/fonts/files/*.woff2"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Bricolage Grotesque (variable, clamped 600-700), Public Sans (variable, clamped 400-500), IBM Plex Mono (static 400 and 500). Latin-subset woff2 vendored into the repo and loaded with next/font/local, display swap, preload. Verified rendered HTML preloads all four files from /_next/static/media and contains zero references to any Google domain."
  - task: "Feature flags"
    implemented: true
    working: true
    file: "lib/flags.ts"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Exactly three: SHOW_MODULE_STATUS=false, SHOW_PRICING=false, NOINDEX=true. NOINDEX drives the robots metadata in app/layout.tsx."
  - task: "/styleguide route"
    implemented: true
    working: true
    file: "app/styleguide/page.tsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Renders every colour token with hex and usage rule, semantic warnings on teal/blue/amber, measured WCAG contrast for every pair in use, all eight type scale steps with the three face specimens, layout and radius rules, the 12-col grid, the motion table, the flag panel, and a dashed placeholder for each of the 17 Section 5.6 components marked NOT BUILT. Verified by screenshot at 1920x800 across four scroll positions."

  - task: "Section 5.6 component library"
    implemented: true
    working: true
    file: "components/rumiq/*.tsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "All seventeen built and exported from components/rumiq/index.ts: Eyebrow, SectionHeader, Button (primary/secondary/ghost, three sizes, inverted set), Card, ModuleCard, PlaneTag, StatusChip, StatBlock, ProofSlot, FAQAccordion, CTABand, AuditLine, DataFreshness, BoundaryRule, IllustrativeBadge, SectorToggle, FunnelTrack. No component holds copy: everything arrives as props or from content/. FAQAccordion rebuilt directly on the Radix primitive because the template shadcn accordion.jsx has no usable prop types under TS strict."
  - task: "StatusChip hidden behind SHOW_MODULE_STATUS"
    implemented: true
    working: true
    file: "components/rumiq/status-chip.tsx, components/rumiq/module-card.tsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Four variants built (Live, Build, Design, Road), each deliberately avoiding teal, blue and amber since those carry plane and policy meaning. Returns null unless SHOW_MODULE_STATUS is true. Verified in the DOM: a ModuleCard passed status=live renders no chip. The styleguide is the only caller of the forceVisible documentation escape hatch."
  - task: "FunnelTrack with arbitrary stage arrays"
    implemented: true
    working: true
    file: "components/rumiq/funnel-track.tsx, content/funnels.ts"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Renders any length. Verified with the 17-stage clinical array and the 7-stage transport array from content/funnels.ts. Vertical stack below md, horizontal snap track above it, plane accent per stage, focusable container for keyboard scrolling. Transport stages kept generic per Sections 4.5 and 8.8."
  - task: "Global layout: header with mega-menus, footer, CTA band"
    implemented: true
    working: true
    file: "components/rumiq/header.tsx, footer.tsx, cta-band.tsx, app/layout.tsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Header sticky 72px compressing to 56px past 400px, paper/92 with backdrop blur and bottom hairline. Platform mega-menu is the three-plane diagram with hover/focus dimming; Solutions mega-menu lists the five live sectors. Verified both open by click and close on Escape through the preview URL. Mobile overlay is plane-grouped with a focus trap and closes on route change (code-verified; not screenshot-verified because the screenshot harness pins the viewport at 1920). Footer has the four Section 7.2 columns plus the base bar with the disclaimer. CTA band is inverted and declares data-plane=boundary so the rule continues through it in amber."
        - working: true
          agent: "testing"
          comment: "Verified Section 13 keyboard navigation requirements. Tab order is correct: (1) Skip to content link, (2) rumiq wordmark home link, (3) Platform button, (4) Solutions button, (5) Trust link, (6) Approach link, (7) Insights link, (8) Growth Leak Scorecard link, (9) Book a working session link. All focused elements have visible focus indicators via box-shadow (rgb(242,244,243) 0px 0px 0px 2px, rgb(15,31,28) 0px 0px 0px 4px) matching globals.css :focus-visible rule (ring-2 ring-ink ring-offset-2). No element has invisible focus (no cases where both outline and box-shadow are none). Skip link is visible when focused (fixed position, 151px x 30px at top-left, className includes focus:not-sr-only). Platform button opens #megamenu-platform with Enter key (aria-expanded changes from false to true). Escape closes megamenu without trapping focus. All Section 13 requirements met."
  - task: "BoundaryRule scroll-linked signature element"
    implemented: true
    working: true
    file: "components/rumiq/boundary-rule.tsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Sections declare data-plane and the rule tracks the section crossing 40% of the viewport, so no registration API is needed. Verified through the preview URL: label reads PUBLIC PLANE on the intro, PROTECTED PLANE over the component section, BOUNDARY with computed colour rgb(217,138,22) over the global-layout section. rAF-throttled scroll listener, 600ms colour transition, aria-hidden because every meaningful section also carries a PlaneTag."
        - working: true
          agent: "testing"
          comment: "Verified at 1440x900 viewport. Rule correctly changes color at all four scroll positions: teal rgb(14,124,107) at top (PUBLIC PLANE), amber rgb(217,138,22) at #layout (BOUNDARY), blue rgb(30,58,107) at #components (PROTECTED PLANE), teal at #funnel (PUBLIC PLANE). Label text matches expected values. Label position travels (4 unique vertical positions: 339.1px, 418.2px, 390.3px, 402.2px). Rule is 1px wide. CSS transition present with 600ms duration using cubic-bezier(0.16,1,0.3,1) easing. All Section 5.1 requirements met."
  - task: "Consent banner and consent gate"
    implemented: true
    working: true
    file: "components/rumiq/consent-banner.tsx, lib/consent.ts"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Verified end to end through the preview URL: banner appears when no choice is recorded, Manage preferences expands in place, Necessary is locked, toggling Analytics and saving writes rumiq_consent={necessary:true,analytics:true,marketing:false,decidedAt,version:1} as a first-party SameSite=Lax cookie, the banner hides, and Cookie preferences in the footer reopens it. Accept all and Reject all are the same variant at the same size. No tracking script exists in the build; lib/consent.ts whenConsented() is the only gate and refuses until a choice is recorded."
        - working: true
          agent: "testing"
          comment: "Verified Section 4.3 equal visual weight requirement. Accept all and Reject all buttons are identical in all computed properties: backgroundColor rgba(0,0,0,0), color rgb(15,31,28), borderColor rgba(15,31,28,0.25), borderWidth 1px, fontSize 16px, fontWeight 500, fontFamily fontBody, height 44px, paddingLeft/Right 20px, textDecorationLine none, opacity 1. Both use identical className (secondary variant). Only width differs due to text length (119px vs 113px). Manage preferences is correctly distinct with ghost variant (underlined, no border, borderWidth 0px). Neither button is visually de-emphasized. All requirements met."
  - task: "Preview-URL hydration fix (infrastructure)"
    implemented: true
    working: true
    file: "next.config.js, package.json"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: false
          agent: "main"
          comment: "Every client component rendered but never hydrated when loaded through the preview URL, while localhost:3000 was fine. No console errors, no failed requests. Two independent causes found."
        - working: true
          agent: "main"
          comment: "Cause 1: Next 16 dev passes a React debug channel that rides the HMR websocket, and the preview proxy cannot upgrade that socket (502), so the initial Flight stream never resolved and hydration never ran. Fixed with experimental.reactDebugChannel=false. Cause 2: Turbopack dev emits crossorigin on client chunk scripts, and the edge returns 403 for any Origin-bearing request to a path containing _next/static/chunks. Fixed by running dev with --webpack, which emits no crossorigin attribute. Also added allowedDevOrigins derived from NEXT_PUBLIC_BASE_URL (no hardcoded URL). Verified: React fibers present and all interactions work through the preview URL. A production build hydrates correctly either way."
  - task: "tailwind-merge taught the custom theme"
    implemented: true
    working: true
    file: "lib/utils.ts"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Real bug caught by screenshot: the header primary CTA rendered as an empty dark block. tailwind-merge could not tell text-caption (font size) from text-paper (colour), treated them as one group and dropped the colour, giving ink text on ink. Replaced lib/utils.js with a typed lib/utils.ts using extendTailwindMerge registering the Section 5.3 scale and the 5.2 palette for font-size, text-color, bg-color and rounded. Verified both classes now survive in the rendered markup."

  - task: "Homepage per Section 8.1"
    implemented: true
    working: true
    file: "app/page.tsx, content/home.ts, components/rumiq/hero.tsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "All eleven sections in the specified order: hero, benefit strip, problem (inverted), three-plane diagram, 17-stage FunnelTrack, demo teaser, who it is for (five cards, single-site first), regions, proof, FAQ, CTA band. Every string lives in content/home.ts; app/page.tsx is composition only. Each section declares data-plane so the boundary rule tracks it. Proof section renders three ProofSlot placeholders with a TODO; no logo, testimonial, statistic or customer count anywhere. FAQ section renders an awaiting-Document-05 placeholder rather than invented copy."
  - task: "Hero component with headline/subhead props"
    implemented: true
    working: true
    file: "components/rumiq/hero.tsx, content/home.ts"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Takes headline, subhead, eyebrow, both CTAs and the assurance strip as props, defaulting to heroDefaults in content/home.ts. No homepage wording inside the component, so a solutions page can pass its sector config copy unchanged. Right column is children, so the hero knows nothing about the demo it hosts. Staggered 400ms rise-in at 60ms per line."
  - task: "Hero LCP: server-rendered static first frame"
    implemented: true
    working: true
    file: "app/demo/policy-sandbox/static-frame.tsx, components/demo/policy-sandbox-embed.tsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "PolicySandboxStaticFrame is a pure server component rendering preset one exactly as the interactive version would. The embed renders only that during SSR and swaps in the interactive sandbox via a client-only dynamic import after mount, so the sandbox JavaScript is off the hero critical path. Verified: the SSR HTML contains the payload table with its ALLOWED rows, and after hydration the six page-type radios are present and operable."
  - task: "Interactive three-plane diagram"
    implemented: true
    working: true
    file: "components/rumiq/plane-diagram.tsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Verified through the preview URL: hovering a module dims the other two planes (2 columns measured below opacity 1) and draws an amber hairline across all three planes. Focus does the same, so it works from the keyboard. Dimming is lg-only, so touch gets the static layout; prefers-reduced-motion skips the draw and shows the path at full extent. Two iterations were needed on the path position - at the module mid-line it read as a strikethrough through the labels of other columns, so it now runs in the 8px inter-row gap below the active module, which every column shares."

  - task: "/platform per Section 8.2"
    implemented: true
    working: true
    file: "app/platform/page.tsx, app/platform/module-grid.tsx, content/platform.ts"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Hero, full-width interactive three-plane diagram, three stacked plane sections with ModuleCard grids, and the canonical data model table with privacy-class colour coding (teal public, ink operational, amber policy-controlled, blue protected). Verified through the preview URL: 10 module cards, 0 status chips rendered, 10 data model rows. Five cards link to deep pages (privacy-gateway, patient-access, growth-intelligence, connectors, content) and five open a detail drawer. NOTE: the five deep pages do not exist yet, so those links 404 until their prompts. Also added: Hero collapses to a single column when no right-hand child is passed, so the platform hero does not leave an empty half."
  - task: "Module detail drawer"
    implemented: true
    working: true
    file: "app/platform/module-grid.tsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Built on the Radix Dialog primitive. Verified: 5 drawer-opening cards, drawer opens, focus moves inside, Escape closes. Focus return needed two attempts - the trigger is a card rather than a Dialog.Trigger so Radix had nothing to restore to, and calling focus() from onOpenChange was overridden by Radix's own restoration. Fixed with onCloseAutoFocus + preventDefault, and verified focus lands back on the originating card with a visible ring."
  - task: "Platform mega-menu as a mini three-plane diagram"
    implemented: true
    working: true
    file: "components/rumiq/header.tsx, content/navigation.ts"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "The menu now opens with a plane rail (three coloured plane markers joined by hairlines) above three plane columns; pointing at a plane on the rail or at a column highlights that plane's modules and dims the others, and focusing a module link does the same for keyboard users. content/navigation.ts now derives platformMenu from content/platform.ts, so the mega-menu, the mobile overlay and /platform cannot disagree about what the platform contains. Modules with no deep page point at /platform, where their drawer lives."

  - task: "Sector registry (Section 9.2)"
    implemented: true
    working: true
    file: "lib/sectors/types.ts, lib/sectors/dental.ts, lib/sectors/transport.ts, lib/sectors/index.ts"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "One config file per sector, collected by index.ts. SectorConfig carries vocabulary, hero (included now so Prompt 8 needs no type change), and the whole dashboard dataset: funnel stage labels, date ranges, dimensions, rows, capacity cells, actions and connector health. Adding a sector means adding a file and one array entry; the dashboard has no switch statements and no sector names in it. Both datasets synthetic. Transport kept generic: no dispatch system named, no brokers, no structural claims. Added vocabulary.costStageIndex so the cost label and the arithmetic cannot drift (dental divides by attended, transport by completed)."
  - task: "Growth Intelligence dashboard demo (9.2)"
    implemented: true
    working: true
    file: "app/demo/dashboard/dashboard.tsx, app/demo/dashboard/page.tsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Five panels, all computed from the rows surviving the filters. Verified through the preview URL that filters genuinely filter: 393 enquiries all-locations, 157 for Lakeview, 440 at 90 days, 193 with Hygiene added. Sector switch changes vocabulary and dimensions (Location/Service to Service area/Journey type, Chair to Vehicle utilisation) with zero component changes. Unmapped-source row present in both sectors at 14% of enquiries with an amber data-quality warning in the table and in the data-quality strip. Capacity matrix has two over-committed amber cells and three under-used pale-teal cells per sector. IllustrativeBadge and DataFreshness on the panel; filter state announced via aria-live. Keyboard: radio-group toggle plus native selects."
  - task: "Call review demo (9.3)"
    implemented: true
    working: true
    file: "app/demo/call-intelligence/calls.tsx, lib/demo/calls.ts, app/demo/call-intelligence/page.tsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "Twelve synthetic calls verified in the DOM, eight-item reason taxonomy, two calls below the 70% threshold flagged for human review with amber confidence values. Verified the full correction flow: selecting c-1046, changing the label and pressing Correct this updated the list item, the detail heading and the classification row (now 100%, human), announced the change via aria-live, and appended an audit line reading tenant=demo actor=human call=c-1046 field=reason_not_booked from=Coverage not confirmed to=No suitable time offered decision=ALLOW source=manual_correction. Transcripts are generic summaries with no clinical content. Homepage demo teaser now links all three demo surfaces."

  - task: "Platform deep pages (Sections 8.3 to 8.7)"
    implemented: true
    working: true
    file: "app/platform/*/page.tsx, content/platform-pages.ts, components/rumiq/deep-page.tsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "All five built and returning 200: privacy-gateway (Policy Sandbox at full size, verified interactive with 6 page-type radios), patient-access (call review demo, 12 calls in the hero band), growth-intelligence (dashboard demo), connectors (two-pilot argument, Curve Dental named, verified no transport system/broker named anywhere outside prohibition comments), content (no demo; the eight grader criteria as the central visual, labelled criteria not scores). Section 8.4 recording-and-jurisdiction callout present verbatim and rendered as an amber policy callout. All copy in content/platform-pages.ts. Shared StepSection / PolicyCallout / PointsSection blocks so five pages are composition rather than five copies. DEVIATION worth noting: the demos render full width inside the hero band via a new Hero demo prop, not inside the hero right column - the dashboard and call review are unusable at 600px, and the hero copy keeps its measure this way. Also confirmed the five module cards on /platform no longer 404."

  - task: "Solutions pages from one template (Section 8.8)"
    implemented: true
    working: true
    file: "app/solutions/[sector]/page.tsx, app/solutions/page.tsx, lib/sectors/*.ts"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "One template at app/solutions/[sector]/page.tsx driven entirely by the sector config. Verified: /solutions/{independent,dental,multi-site,transport,health-systems} return 200 and /solutions/{behavioral,rehab,aesthetics,home-health,urgent-care} return 404, because findSectorBySlug returns undefined and the route calls notFound(). SectorConfig extended with a page block (problem, three failure modes with costs, module order, first 90 days, regulatory notes, proof slots, optional funnel) and dashboard made optional, so the three new sectors need no demo dataset; dashboardSectors is a narrowed type so the dashboard needs no guards. Independent page is written as its own problem (no analyst, no agency, nobody doing the work) rather than a downgraded enterprise pitch, and is first in the registry. Transport page renders its own seven-stage funnel and uses operator vocabulary throughout - 57 uses of journey, 25 booking, 10 referral source, 0 uses of patient/treatment/care-delivered in page copy; the Patient Access Intelligence module was renamed to Enquiry and booking intelligence for that page. The phrase still appears in the global footer module list, which is site chrome. Every page carries ProofSlot placeholders, an awaiting-Document-05 FAQ block and the CTA band."

  - task: "Trust Center and region pages (8.9, 8.10)"
    implemented: true
    working: true
    file: "app/trust/page.tsx, app/regions/[region]/page.tsx, content/trust.ts, components/rumiq/trust-table.tsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: true
          agent: "main"
          comment: "/trust 200 with all eight numbered sections and 7 dense tables (architecture, data handling, access control, consent, assurance roadmap, subprocessors, incident response) plus an inverted what-we-do-not-claim section. Assurance roadmap labelled a roadmap with states only (In progress / Planned / Intended / Under consideration) and no dates, and an explicit note that no SOC 2 report or HITRUST certification exists. Subprocessor table is a scaffold: headers rendered, a dashed PENDING LEGAL REVIEW row, a visible TODO note and a code TODO. Region pages from one template: /regions/united-states and /regions/gulf 200, unknown region 404. Gulf has the dedicated WhatsApp-as-primary-channel section (consent per channel, measurement, message content staying in the protected plane, Arabic/RTL, platform terms) and both pages end with an amber validate-with-local-counsel callout. Grepped the codebase: the only occurrence of the phrase HIPAA compliant is the sentence denying it."

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 1
  run_ui: true

test_plan:
  current_focus:
    - "Section 11 form submission endpoint (POST /api/forms/[form])"
    - "Section 10 scorecard endpoint (POST /api/scorecard)"
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
    - agent: "main"
      message: "Prompt 1 complete: design system, fonts, flags, styleguide. No backend change, so no backend testing required. Frontend testing not invoked -- awaiting user permission. Next prompt expected to cover the Section 5.6 component library."

    - agent: "main"
      message: "Prompt 2 complete: all seventeen Section 5.6 components, the Section 7 global layout, the boundary rule and the consent banner, all demonstrated live on /styleguide. Two infrastructure problems fixed along the way: client components never hydrated through the preview URL (Next 16 dev React debug channel on a websocket the proxy cannot upgrade, plus Turbopack crossorigin chunks the edge 403s), and tailwind-merge was silently dropping custom colour classes. No backend change, so no backend testing. Frontend testing agent NOT invoked - awaiting user permission. Mobile behaviour at 320-360px is code-complete but not screenshot-verified: the screenshot harness pins the viewport at 1920, so the mobile overlay, the 3px edge indicator and the vertical funnel stack still need a real narrow-viewport pass."

    - agent: "main"
      message: "User asked for verification of three specific behaviours on /styleguide. Delegating to the frontend testing agent: (1) the boundary rule tracks scroll and changes colour, (2) Reject all is visually identical in weight to Accept all, (3) keyboard tab order through the header is sane and focus is visible. No code change was made before this run - this is a verification pass on the Prompt 2 build."


    - agent: "testing"
      message: "Verification testing complete for three specific behaviors on /styleguide at viewport 1440x900. TEST 1 (Boundary Rule): PASS - Rule correctly changes color based on scroll position: teal rgb(14,124,107) at top (PUBLIC PLANE), amber rgb(217,138,22) at #layout (BOUNDARY), blue rgb(30,58,107) at #components (PROTECTED PLANE), teal again at #funnel (PUBLIC PLANE). Label text matches expected values at all positions. Label vertical position changes at each scroll state (4 unique positions: 339.1px, 418.2px, 390.3px, 402.2px), confirming the label travels as specified. Rule is 1px wide at desktop. CSS transition present with 600ms duration. TEST 2 (Consent Banner): PASS - Accept all and Reject all buttons have identical visual weight. All computed properties match: backgroundColor rgba(0,0,0,0), color rgb(15,31,28), borderColor rgba(15,31,28,0.25), borderWidth 1px, fontSize 16px, fontWeight 500, height 44px, padding 20px, textDecoration none, opacity 1. Both use identical className (secondary variant). Only width differs due to text length (119px vs 113px). Manage preferences is correctly distinct with ghost variant (underlined, no border). TEST 3 (Header Keyboard): PASS - Tab order is correct: (1) Skip to content, (2) rumiq wordmark, (3) Platform button, (4) Solutions button, (5) Trust link, (6) Approach link, (7) Insights link, (8) Growth Leak Scorecard link, (9) Book a working session link. All focused elements have visible focus indicators via box-shadow (2px ring with 2px offset). Skip link is visible when focused (fixed position, 151px x 30px at top-left). Platform button opens megamenu with Enter key (aria-expanded changes from false to true). Escape closes megamenu without trapping focus. All three behaviors verified and working as specified. Actual window.innerWidth confirmed at 1440px."

    - agent: "main"
      message: "Prompt 3: built the Policy Sandbox at /demo/policy-sandbox. Decision logic is a pure module (lib/demo/policy-sandbox.ts) and GET /api/policy-sandbox/verify exposes all 72 combinations for exhaustive checking. Please test that endpoint against the Section 9.1 matrix as written in the task instructions. UI behaviour already self-checked through the preview URL: idle preset cycle advances every 6s, any interaction stops it permanently, aria-live summary updates, ledger appends in the Section 9.1 format, blocked fields render struck through."


    - agent: "testing"
      message: "Policy Sandbox verification COMPLETE - ALL TESTS PASSED. Exhaustively tested GET /api/policy-sandbox/verify against Section 9.1 specification. Created comprehensive Python test script (/app/backend_test.py) that verifies all 72 combinations programmatically. Verified through both external URL (https://build-guide-127.preview.emergentagent.com/api/policy-sandbox/verify) and localhost (http://localhost:3000/api/policy-sandbox/verify). All 15 test sections passed: (1) Basic structure - 72 evaluations with correct field order, (2) Consent rule for non-essential destinations - all 36 evaluations with denied/not_set consent correctly BLOCK with sent=0, (3) Consent rule for internal - consent-independent across all 6 page types, (4) Marketing pages with consent - all allowed to all destinations, (5-7) Service page with consent - correct redaction/generalisation per destination, (8-9) Appointment form with consent - sensitive fields blocked to ads/ga4, all allowed to internal, (10) Protected pages with consent - fully blocked to ads/ga4, allowed to internal, (11) Integrity checks - all 72 evaluations have correct counts and decision logic, (12) Critical security assertion - NO email, phone, or form_free_text sent to google_ads, meta, or ga4 under ANY circumstances. The engine is fully specification-compliant. No issues found."

    - agent: "main"
      message: "Prompt 4 complete: homepage built to Section 8.1 with the Policy Sandbox in the hero right column, server-rendered static first frame for LCP, and the interactive three-plane diagram. No backend change, so no backend testing. Frontend testing agent NOT invoked - awaiting user permission. Outstanding across prompts 2-4: no narrow-viewport pass yet (screenshot harness pins the viewport at 1920), and no reduced-motion pass."

    - agent: "main"
      message: "Prompt 5 complete: /platform built to Section 8.2 with ten module cards, five deep links and five detail drawers, the canonical data model table with privacy-class colour coding, and the Platform mega-menu rebuilt as a mini three-plane diagram fed from the same module list. No backend change. Frontend testing agent NOT invoked - awaiting user permission. Still outstanding: narrow-viewport and reduced-motion passes."

    - agent: "main"
      message: "Prompt 6 complete: sector registry with dental and transport configs, the Section 9.2 dashboard (five panels, filters that really filter, unmapped-source row) and the Section 9.3 call review with working human correction and audit trail. No new API routes, so no backend testing. Frontend testing agent NOT invoked - awaiting user permission. Still outstanding: narrow-viewport and reduced-motion passes across all pages."

    - agent: "main"
      message: "Prompt 7 complete: five platform deep pages with their demos embedded, all copy in content files. No backend change. Frontend testing agent NOT invoked - awaiting user permission. Outstanding: narrow-viewport and reduced-motion passes."

    - agent: "main"
      message: "Prompt 8 complete: five live solutions pages from one template plus a /solutions index, five scaffolded sectors 404ing by design. No backend change. Frontend testing agent NOT invoked - awaiting user permission. Outstanding: narrow-viewport and reduced-motion passes."

    - agent: "main"
      message: "Prompt 9 complete: Trust Center with all eight sections and the region pages. No backend change. Frontend testing agent NOT invoked - awaiting user permission. Outstanding: narrow-viewport and reduced-motion passes."

    - agent: "main"
      message: "Prompt 12 (finish the site) complete in code: /approach with the phase table rendered directly, /demo with all three demos stacked under an illustrative-data banner, /about with both pilots and what each proves, /contact as a working-session request (never 'book a demo'), /insights as an MDX index plus a slug route, and /privacy /cookies /terms as scaffolds behind an AWAITING LEGAL REVIEW banner. Also the missing /scorecard page from the previous prompt. Three Section 11 forms now share one client runner and one Zod schema module, with a honeypot, a timing check and no CAPTCHA. SEO per Section 13: unique titles and descriptions, canonicals, OG images generated in-process, JSON-LD, sitemap, robots.txt, and noindex enforced three ways while NOINDEX is true. Accessibility: tests/contrast.mjs audits every token pair actually rendered and now passes; one new token (--boundary-ink) was needed because amber text on paper is 2.5:1. PLEASE TEST the two backend routes only: POST /api/forms/[form] and POST /api/scorecard. Both are in current_focus with the exact expected behaviour, including the honeypot, the timing gate, the field-level error maps and the server-side scoring. FORM_WEBHOOK_URL is intentionally unset, so a valid submission must answer delivered:false. Do not test the frontend - the user has not authorised a frontend run."

    - agent: "testing"
      message: "BACKEND TESTING COMPLETE - ALL 40 TESTS PASSED (100% success rate). Created comprehensive test script /app/test_forms_scorecard.py covering both routes. ROUTE 1 (POST /api/forms/[form]): 16 tests passed - unknown form ID returns 404, malformed JSON returns 400, honeypot detection works without leaking reason, timing gates (too fast/expired/missing) return 422, Zod validation returns 400 with field-level errors map for all invalid cases (missing email, malformed email, short message, consent false, empty body), valid submissions for both working-session and insights return 200 with {ok:true, delivered:false}, GET/PUT/DELETE methods correctly rejected with 405, external URL happy path verified. ROUTE 2 (POST /api/scorecard): 24 tests passed - honeypot and timing gates work correctly, validation returns 400 with errors for wrong array lengths (9/11), out-of-range values (4/-1), missing answers, consent false, bad email, GET method rejected including with query string (email never in URL), all 8 band boundary cases correct (0→severe, 9→severe, 10→partial, 17→partial, 18→solid, 24→solid, 25→strong, 30→strong), weakest 5 ordering correct with tie-breaking by question order verified with crafted test case, question IDs match specification (calls, reason, attendance, capacity, attribution, consent, pages, ledger, discovery, voice), email never reflected in response, external URL happy path verified. REGRESSION CHECK: GET /api/policy-sandbox/verify still returns 200 with 72 evaluations. Both routes are specification-compliant with no issues found."

    - agent: "main"
      message: "Backend testing returned 40/40 passing on both new routes, plus the policy-sandbox regression. Frontend NOT run through the testing agent - the user has not authorised it. I did verify the three highest-risk flows myself in a real browser: the scorecard end to end (ten questions, gate after the last one, skip-the-gate path, results), the working-session form (empty submit produces an error summary and 7 aria-invalid controls; valid submit replaces the form in place), and /demo (all three demos mount together, banner first, three anchors). Remaining gaps, both pre-existing: no 320-360px narrow-viewport pass and no prefers-reduced-motion pass."

    - agent: "main"
      message: "Document 05 placed. No backend change in this step, so no backend retest needed - the two form routes were already verified 40/40. Frontend still not run through the testing agent (no authorisation); I verified FAQ placement, order, flag gating and pilot-variant gating programmatically across all ten pages, plus a browser pass on /trust. Outstanding, unchanged: narrow-viewport pass, reduced-motion pass, legal copy, real contact addresses, TTF subset for brand-exact OG cards, and sign-off on the --boundary-ink token."
