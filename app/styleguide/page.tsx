import type { Metadata } from 'next';
import {
  colourTokens,
  componentInventory,
  contrastPairs,
  layoutRules,
  motionSpecs,
  typeScale,
  type ColourToken,
} from '@/lib/design-tokens';
import { FLAGS } from '@/lib/flags';
import {
  AuditLine,
  Button,
  Card,
  CTABand,
  DataFreshness,
  Eyebrow,
  FAQAccordion,
  FunnelTrack,
  IllustrativeBadge,
  ModuleCard,
  PlaneTag,
  ProofSlot,
  SectionHeader,
  StatBlock,
  type FaqEntry,
} from '@/components/rumiq';
import { PLANES, planeBg, planeDescription, planeLabel, type Plane } from '@/lib/planes';
import { clinicalFunnel, transportFunnel } from '@/content/funnels';
import { ConsentHarness } from './consent-harness';
import { SectorToggleDemo } from './sector-toggle-demo';
import { StatusChipDemo } from './status-chip-demo';

/*
 * Primary reader: the build team. Internal reference surface, not a public page.
 * Documents Section 5 in full: tokens, scale, layout, motion, component inventory.
 */

export const metadata: Metadata = {
  title: 'Styleguide',
  description: 'Internal reference for the Rumiq design system.',
};

const groups: { id: ColourToken['group']; title: string; note: string }[] = [
  { id: 'surface', title: 'Surfaces', note: 'Cool, clinical, slightly green-grey. Light mode only, with inverted sections.' },
  { id: 'plane', title: 'The two planes', note: 'Semantic. Teal only marks public-plane concepts, blue only marks protected-plane concepts.' },
  { id: 'boundary', title: 'The boundary', note: 'If amber appears on a button, something has gone wrong.' },
  { id: 'utility', title: 'Utility', note: 'Hairlines, secondary text and status signals.' },
];

/*
 * Placeholder FAQ entries. Section 15 forbids any FAQ entry that is not in
 * Document 05, so these are deliberately not FAQ copy: they exist to show the
 * component's behaviour until Document 05 arrives at Prompt 11.
 */
const demoFaq: FaqEntry[] = [
  {
    id: 'placeholder-1',
    question: 'Placeholder question one. Document 05 supplies this copy.',
    answer:
      'Placeholder answer. No FAQ copy is authored in this codebase. Every entry, and the page each entry appears on, comes from Document 05 and its placement map.',
  },
  {
    id: 'placeholder-2',
    question: 'Placeholder question two. Document 05 supplies this copy.',
    answer: 'Placeholder answer. The entry id is rendered under each answer so placement stays auditable.',
  },
];

const Section = ({
  id,
  eyebrow,
  title,
  standfirst,
  plane = 'public',
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  standfirst?: string;
  /** Declares the plane so <BoundaryRule> can track it on scroll. */
  plane?: Plane;
  children: React.ReactNode;
}) => (
  <section
    id={id}
    data-plane={plane}
    className="border-t border-rule py-section-mobile lg:py-section"
  >
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="mt-4 text-h2 font-semibold">{title}</h2>
    {standfirst ? <p className="mt-4 max-w-measure text-body-l text-muted">{standfirst}</p> : null}
    <div className="mt-12">{children}</div>
  </section>
);

const Demo = ({
  name,
  section,
  note,
  children,
}: {
  name: string;
  /** Specification section that governs the component. */
  section: string;
  note?: string;
  children: React.ReactNode;
}) => (
  <div className="border-t border-rule py-10 first:border-t-0 first:pt-0">
    <div className="flex flex-wrap items-baseline justify-between gap-3">
      <p className="font-mono text-caption font-medium">{`<${name}>`}</p>
      <p className="font-mono text-mono-eyebrow uppercase text-muted">Built · § {section}</p>
    </div>
    {note ? <p className="mt-3 max-w-measure text-caption text-muted">{note}</p> : null}
    <div className="mt-8">{children}</div>
  </div>
);

export default function StyleguidePage() {
  return (
    <main id="main" className="relative">
      <div className="mx-auto max-w-content px-6 lg:pl-gutter lg:pr-10">
        <header data-plane="public" className="py-section-mobile lg:py-section">
          <Eyebrow>DESIGN SYSTEM · SECTION 5 · INTERNAL</Eyebrow>
          <h1 className="mt-6 max-w-measure text-display-l font-semibold">Rumiq styleguide.</h1>
          <p className="mt-6 max-w-measure text-body-l text-muted">
            Every token, every step of the type scale, and one placeholder for each component in the
            Section 5.6 inventory. Nothing here is public copy. The visual concept is the boundary:
            one bold move, everything else quiet and disciplined.
          </p>

          <dl className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-3">
            {Object.entries(FLAGS).map(([name, value]) => (
              <div key={name} className="bg-paper-raised p-5">
                <dt className="font-mono text-mono-eyebrow uppercase text-muted">{name}</dt>
                <dd className="mt-3 font-mono text-body font-medium">{String(value)}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 font-mono text-caption text-muted">
            lib/flags.ts · exactly three flags · do not add a fourth
          </p>
        </header>

        {/* ---------------------------------------------------------------- */}
        <Section
          id="colour"
          eyebrow="SECTION 5.2"
          title="Colour tokens"
          standfirst="Declared once in app/globals.css and exposed to Tailwind through theme.extend. No component contains an inline hex value."
        >
          <div className="space-y-14">
            {groups.map((group) => (
              <div key={group.id}>
                <h3 className="text-h3 font-semibold">{group.title}</h3>
                <p className="mt-3 max-w-measure text-caption text-muted">{group.note}</p>
                <ul className="mt-6 grid border-l border-t border-rule md:grid-cols-2">
                  {colourTokens
                    .filter((t) => t.group === group.id)
                    .map((t) => (
                      <li key={t.name} className="flex gap-5 border-b border-r border-rule bg-paper-raised p-5">
                        <span
                          aria-hidden
                          className={`${t.swatchClass} h-16 w-16 shrink-0 rounded border border-rule`}
                        />
                        <div className="min-w-0">
                          <p className="font-mono text-caption font-medium">--{t.name}</p>
                          <p className="mt-1 font-mono text-caption uppercase text-muted">{t.hex}</p>
                          <p className="mt-2 text-caption text-muted">{t.usage}</p>
                          {t.semantic ? (
                            <p className="mt-2 font-mono text-mono-eyebrow uppercase text-boundary-ink">
                              Semantic · never decorative
                            </p>
                          ) : null}
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <h3 className="text-h3 font-semibold">Token pairs in use</h3>
            <p className="mt-3 max-w-measure text-caption text-muted">
              Section 13 requires AA contrast on every pair used, with particular attention to muted
              on paper and amber on dark.
            </p>
            <div className="mt-6 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-paper p-6">
                <p className="text-body">Ink on paper</p>
                <p className="mt-2 text-caption text-muted">Muted on paper</p>
              </div>
              <div className="bg-paper-raised p-6">
                <p className="text-body">Ink on raised</p>
                <p className="mt-2 text-caption text-muted">Muted on raised</p>
              </div>
              <div className="bg-paper-dark p-6">
                <p className="text-body text-paper">Paper on dark</p>
                <p className="mt-2 font-mono text-caption text-boundary">Amber on dark · policy only</p>
              </div>
              <div className="bg-plane-protected p-6">
                <p className="text-body text-paper">Paper on protected blue</p>
                <p className="mt-2 text-caption text-paper/80">Protected plane surface</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <p className="font-mono text-mono-eyebrow uppercase text-muted">Measured ratios</p>
            <dl className="mt-4 divide-y divide-rule border-y border-rule">
              {contrastPairs.map((c) => (
                <div key={c.pair} className="grid gap-2 py-4 sm:grid-cols-[260px_100px_1fr]">
                  <dt className="font-mono text-caption font-medium">{c.pair}</dt>
                  <dd className="font-mono text-caption">{c.ratio}</dd>
                  <dd className="text-caption text-muted">{c.note}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section
          id="type"
          eyebrow="SECTION 5.3"
          title="Typography"
          standfirst="Three faces, three jobs, all self-hosted as Latin-subset woff2 through next/font/local. Nothing is requested from a Google domain at runtime."
        >
          <div className="grid gap-px border border-rule bg-rule lg:grid-cols-3">
            <div className="bg-paper-raised p-6">
              <p className="font-mono text-mono-eyebrow uppercase text-muted">Display</p>
              <p className="mt-4 font-display text-h2 font-bold">Bricolage Grotesque</p>
              <p className="mt-3 font-mono text-caption text-muted">600 / 700 · H1–H3 · sentence case</p>
            </div>
            <div className="bg-paper-raised p-6">
              <p className="font-mono text-mono-eyebrow uppercase text-muted">Body</p>
              <p className="mt-4 text-h2 font-medium">Public Sans</p>
              <p className="mt-3 font-mono text-caption text-muted">
                400 / 500 · the US federal design system face
              </p>
            </div>
            <div className="bg-paper-raised p-6">
              <p className="font-mono text-mono-eyebrow uppercase text-muted">Data / utility</p>
              <p className="mt-4 font-mono text-h3 font-medium">IBM Plex Mono</p>
              <p className="mt-3 font-mono text-caption text-muted">
                400 / 500 · eyebrows, metrics, audit lines, field names
              </p>
            </div>
          </div>

          <ul className="mt-12 divide-y divide-rule border-y border-rule">
            {typeScale.map((step) => (
              <li key={step.name} className="grid gap-6 py-8 lg:grid-cols-[220px_1fr]">
                <div>
                  <p className="font-mono text-caption font-medium">{step.name}</p>
                  <p className="mt-2 font-mono text-caption text-muted">{step.size}</p>
                  <p className="font-mono text-caption text-muted">line-height {step.lineHeight}</p>
                  <p className="mt-2 text-caption text-muted">{step.face}</p>
                  {step.notes ? <p className="mt-2 text-caption text-muted">{step.notes}</p> : null}
                </div>
                <p className={`${step.className} max-w-measure`}>
                  {step.name === 'mono-eyebrow'
                    ? 'PLANE: PUBLIC → PROTECTED'
                    : 'Know which marketing actually produces patients.'}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section
          id="layout"
          plane="boundary"
          eyebrow="SECTION 5.4"
          title="Layout and radius"
          standfirst="A reserved 64px left gutter carries the boundary rule and its label, producing a deliberate asymmetry. Content starts after it."
        >
          <dl className="divide-y divide-rule border-y border-rule">
            {layoutRules.map((rule) => (
              <div key={rule.name} className="grid gap-2 py-4 sm:grid-cols-[220px_1fr]">
                <dt className="font-mono text-caption font-medium">{rule.name}</dt>
                <dd className="text-caption text-muted">{rule.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12">
            <p className="font-mono text-mono-eyebrow uppercase text-muted">12-column grid</p>
            <div aria-hidden className="mt-4 grid grid-cols-12 gap-2">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="h-16 border border-rule bg-paper-raised" />
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-end gap-8">
            <div>
              <p className="font-mono text-mono-eyebrow uppercase text-muted">Card · 4px</p>
              <div className="mt-3 h-24 w-40 rounded-card border border-rule bg-paper-raised" />
            </div>
            <div>
              <p className="font-mono text-mono-eyebrow uppercase text-muted">Input · 4px</p>
              <div className="mt-3 h-11 w-52 rounded-input border border-rule bg-paper-raised" />
            </div>
            <div>
              <p className="font-mono text-mono-eyebrow uppercase text-muted">Button · 2px</p>
              <div className="mt-3 flex h-11 w-40 items-center justify-center rounded-button bg-ink text-caption font-medium text-paper">
                Primary
              </div>
            </div>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section
          id="motion"
          plane="boundary"
          eyebrow="SECTION 5.5"
          title="Motion"
          standfirst="Deliberate and sparse. Under prefers-reduced-motion every one of these resolves instantly to its final state."
        >
          <dl className="divide-y divide-rule border-y border-rule">
            {motionSpecs.map((m) => (
              <div key={m.name} className="grid gap-2 py-4 sm:grid-cols-[220px_120px_1fr]">
                <dt className="font-mono text-caption font-medium">{m.name}</dt>
                <dd className="font-mono text-caption text-muted">{m.duration}</dd>
                <dd className="text-caption text-muted">{m.detail}</dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section
          id="components"
          plane="protected"
          eyebrow="SECTION 5.6"
          title="Component inventory"
          standfirst="Seventeen components, all built and all rendering below. Copy always arrives as props or from a content file, never from inside the component."
        >
          <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {componentInventory.map((c) => (
              <li
                key={c.name}
                className="flex items-baseline justify-between gap-4 rounded-card border border-rule bg-paper-raised px-4 py-3"
              >
                <span className="font-mono text-caption font-medium">{`<${c.name}>`}</span>
                <span className="font-mono text-mono-eyebrow uppercase text-muted">§ {c.ref}</span>
              </li>
            ))}
          </ul>

          <div className="mt-16">
            <Demo
              name="Eyebrow"
              section="5.3"
              note="Uppercase mono, 0.08em tracking. Three tones: muted, ink, and inverted for dark sections."
            >
              <div className="space-y-3">
                <Eyebrow>PLANE: PUBLIC → PROTECTED</Eyebrow>
                <Eyebrow tone="ink">THE OPERATIONAL REALITY</Eyebrow>
                <div className="bg-paper-dark p-4">
                  <Eyebrow tone="inverted">NEXT STEP</Eyebrow>
                </div>
              </div>
            </Demo>

            <Demo
              name="SectionHeader"
              section="5.6"
              note="Eyebrow, headline and standfirst. The heading level is a prop so a page keeps exactly one H1."
            >
              <SectionHeader
                eyebrow="THE JOURNEY WE MEASURE"
                headline="Marketing stops at the lead. The revenue doesn't happen until care is delivered."
                standfirst="Passed in as props. This component holds no copy of its own."
                as="h3"
              />
            </Demo>

            <Demo
              name="Button"
              section="5.4"
              note="Primary, secondary and ghost, in three sizes, each with an inverted set for dark sections. 2px radius, 120ms hover, buttons darken. No amber, ever."
            >
              <div className="flex flex-wrap items-center gap-3">
                <Button>Book a working session</Button>
                <Button variant="secondary">See the platform</Button>
                <Button variant="ghost">Read how engagements run</Button>
                <Button size="sm">Small</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3 bg-paper-dark p-5">
                <Button inverted>Get the scorecard</Button>
                <Button inverted variant="secondary">
                  Book a working session
                </Button>
                <Button inverted variant="ghost">
                  Read the method
                </Button>
              </div>
            </Demo>

            <Demo name="Card" section="5.5" note="Hairline border, 4px radius. Interactive cards lift 2px on hover and shift their border. No growing shadows.">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-5">
                  <p className="text-body">Static card.</p>
                  <p className="mt-2 text-caption text-muted">No hover behaviour.</p>
                </Card>
                <Card interactive className="p-5">
                  <p className="text-body">Interactive card.</p>
                  <p className="mt-2 text-caption text-muted">Hover to see the 2px lift.</p>
                </Card>
              </div>
            </Demo>

            <Demo name="PlaneTag" section="5.2" note="The colour carries the meaning, so the label is always present for anyone who cannot read colour.">
              <div className="flex flex-wrap gap-6">
                {PLANES.map((plane) => (
                  <PlaneTag key={plane} plane={plane} />
                ))}
              </div>
            </Demo>

            <Demo
              name="ModuleCard"
              section="8.2"
              note={'Plane tag, module name, one sentence. The third card is passed status="live" and renders no chip, because SHOW_MODULE_STATUS is false.'}
            >
              <div className="grid gap-4 md:grid-cols-3">
                <ModuleCard
                  plane="public"
                  name="Search, Local and AI Discovery"
                  description="Visibility for the services you sell, across search, maps, directories and AI assistants."
                  href="/platform/content"
                />
                <ModuleCard
                  plane="boundary"
                  name="Privacy and Data Gateway"
                  description="Classifies every event and decides what may leave, then logs the decision."
                  href="/platform/privacy-gateway"
                />
                <ModuleCard
                  plane="protected"
                  name="Patient Access Intelligence"
                  description="Calls, forms, chat and text, with the reason a booking did not happen."
                  status="live"
                  href="/platform/patient-access"
                />
              </div>
            </Demo>

            <Demo name="StatusChip" section="0.2" note="Four variants, built and shipped hidden.">
              <StatusChipDemo />
            </Demo>

            <Demo name="StatBlock" section="5.6" note="Mono figure, tabular numerals. Any synthetic figure sets illustrative, which renders the Section 4.1 label on screen.">
              <div className="grid gap-8 sm:grid-cols-3">
                <StatBlock label="Cost per attended patient" value="$184" detail="Synthetic figure from the demo dataset." illustrative />
                <StatBlock label="Unmapped source rate" value="14%" detail="The data-quality problem Rumiq exists to fix." illustrative />
                <StatBlock label="Pilots running" value="2" detail="A dental group and a transport operator. Not illustrative: this one is true." />
              </div>
            </Demo>

            <Demo name="ProofSlot" section="4.1" note="Where the design calls for social proof. No generated logos, testimonials, quotes, headshots, case studies or performance statistics.">
              <div className="grid gap-4 md:grid-cols-3">
                <ProofSlot intent="Pilot reference card. Requires written client approval before naming." />
                <ProofSlot intent="Second pilot reference card." />
                <ProofSlot intent="Team bio. Awaiting real content." />
              </div>
            </Demo>

            <Demo name="IllustrativeBadge" section="4.1" note="On-screen text, not a tooltip. Deliberately not amber: a synthetic-data label is honesty, not a policy decision.">
              <div className="flex flex-wrap items-center gap-4">
                <IllustrativeBadge />
                <div className="bg-paper-dark p-4">
                  <IllustrativeBadge inverted />
                </div>
              </div>
            </Demo>

            <Demo name="DataFreshness" section="9" note="Connector freshness on every demo panel. The palette has no green, so the public-plane teal carries the healthy state.">
              <div className="flex flex-col gap-3">
                <DataFreshness source="Curve Dental connector" updated="14 min ago" />
                <DataFreshness source="Paid media connector" updated="6 hours ago" state="stale" />
                <DataFreshness source="Review connector" updated="2 days ago" state="failed" />
              </div>
            </Demo>

            <Demo name="AuditLine" section="9.1" note="The disclosure ledger. The decision is the only coloured element: amber for anything the policy stopped or rewrote.">
              <div className="space-y-3 rounded-card border border-rule bg-paper-raised p-5">
                <AuditLine
                  timestamp="2026-08-23T14:02:11Z"
                  decision="ALLOW"
                  fields={{ tenant: 'demo', policy: 'v4.2', dest: 'ga4', page_class: 'marketing', consent: 'granted', fields_sent: '6/11' }}
                />
                <AuditLine
                  timestamp="2026-08-23T14:02:44Z"
                  decision="REDACT"
                  fields={{ tenant: 'demo', policy: 'v4.2', dest: 'google_ads', page_class: 'service_page', consent: 'granted', fields_sent: '5/11' }}
                />
                <AuditLine
                  timestamp="2026-08-23T14:03:02Z"
                  decision="BLOCK"
                  fields={{ tenant: 'demo', policy: 'v4.2', dest: 'google_ads', page_class: 'clinical_intake', consent: 'granted', fields_sent: '0/11', reason: 'default_deny_class' }}
                />
              </div>
              <p className="mt-4">
                <IllustrativeBadge />
              </p>
            </Demo>

            <Demo name="FAQAccordion" section="8.1" note="Component only. Every entry it renders comes from Document 05 verbatim. The two below are placeholders, not FAQ copy.">
              <FAQAccordion entries={demoFaq} />
            </Demo>

            <Demo name="SectorToggle" section="9.2" note="A map over the registry. Three options are passed here to prove a third sector needs no component change.">
              <SectorToggleDemo />
            </Demo>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section
          id="funnel"
          plane="public"
          eyebrow="SECTION 8.1 · 8.8"
          title="FunnelTrack"
          standfirst="One component, two arrays of different length. Horizontal scroll-snapping track from md up, vertical stack below it. The track is focusable so it can be scrolled from the keyboard."
        >
          <p className="font-mono text-mono-eyebrow uppercase text-muted">
            Clinical provider · 17 stages
          </p>
          <FunnelTrack className="mt-5" stages={clinicalFunnel} label="The clinical growth journey" />

          <p className="mt-16 font-mono text-mono-eyebrow uppercase text-muted">
            Transport operator · 7 stages
          </p>
          <FunnelTrack className="mt-5" stages={transportFunnel} label="The transport journey" />
          <p className="mt-6 max-w-measure text-caption text-muted">
            The transport array is deliberately generic. Section 4.5 forbids sector detail Rumiq has
            not confirmed, and the pilot architecture work has not started.
          </p>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section
          id="global"
          plane="boundary"
          eyebrow="SECTION 7 · 5.1"
          title="Global layout"
          standfirst="The header, footer, boundary rule and consent banner are live on this page rather than demonstrated in a frame. Scroll and the rule in the left gutter changes colour and its label travels with it."
        >
          <Demo
            name="BoundaryRule"
            section="5.1"
            note="A 1px rule in the reserved left gutter, full page height, with a monospace label that travels with it. It collapses to a 3px left-edge indicator on mobile, with no label. Sections declare their plane with a data-plane attribute, so the rule needs no registration API. Colour transitions over 600ms and resolves instantly under prefers-reduced-motion."
          >
            <ul className="grid gap-4 md:grid-cols-3">
              {PLANES.map((plane) => (
                <li key={plane} className="flex gap-4 rounded-card border border-rule bg-paper-raised p-5">
                  <span aria-hidden className={`w-px shrink-0 ${planeBg[plane]}`} />
                  <div>
                    <p className="font-mono text-mono-eyebrow uppercase">{planeLabel[plane]}</p>
                    <p className="mt-3 text-caption text-muted">{planeDescription[plane]}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Demo>

          <Demo
            name="Header"
            section="7.1"
            note="Sticky, 72px, paper at 92% with backdrop blur and a bottom hairline, compressing to 56px past 400px of scroll. Platform and Solutions open mega-menus; the Platform menu dims the planes you are not pointing at. Both open on hover and on click, close on Escape and on route change. Below lg it becomes a full-screen, plane-grouped overlay with a focus trap."
          >
            <p className="text-caption text-muted">Live at the top of this page.</p>
          </Demo>

          <Demo
            name="Footer"
            section="7.2"
            note="Four columns — Platform, Solutions, Company, Trust and regions — plus a base bar carrying the entity, the Section 4.2 disclaimer and copyright. Cookie preferences reopens the banner from the Trust column."
          >
            <p className="text-caption text-muted">Live at the bottom of this page.</p>
          </Demo>

          <Demo
            name="ConsentBanner"
            section="7.4"
            note="Bottom-anchored, not a modal. Necessary is locked on. Accept all and Reject all are the same variant at the same size, so neither is visually favoured. Manage preferences expands in place. The choice is written to a first-party cookie and can be reopened from the footer."
          >
            <ConsentHarness />
          </Demo>

          <Demo
            name="CTABand"
            section="7.3"
            note="Once at the bottom of every page except /contact. Inverted, and the boundary rule continues through it in amber because the band declares itself as the boundary plane. Copy comes from content/site.ts."
          >
            <p className="text-caption text-muted">Rendered full width below.</p>
          </Demo>
        </Section>

        <footer className="border-t border-rule py-16">
          <p className="max-w-measure text-caption text-muted">
            Nothing on this site is legal, regulatory or clinical advice. Regulatory obligations vary
            by jurisdiction and should be validated with counsel.
          </p>
          <p className="mt-4 font-mono text-caption text-muted">
            Rumiq Technologies Ltd · DIFC, Dubai
          </p>
        </footer>
      </div>

      <CTABand />
    </main>
  );
}
