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

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 1
  run_ui: true

test_plan:
  current_focus:
    - "BoundaryRule scroll-linked signature element"
    - "Consent banner and consent gate"
    - "Global layout: header with mega-menus, footer, CTA band"
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
