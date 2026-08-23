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
##   run_ui: false
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

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 0
  run_ui: false

test_plan:
  current_focus:
    - "/styleguide route"
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
    - agent: "main"
      message: "Prompt 1 complete: design system, fonts, flags, styleguide. No backend change, so no backend testing required. Frontend testing not invoked -- awaiting user permission. Next prompt expected to cover the Section 5.6 component library."
