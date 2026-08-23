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

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="font-mono text-mono-eyebrow uppercase text-muted">{children}</p>
);

const Section = ({
  id,
  eyebrow,
  title,
  standfirst,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  standfirst?: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="border-t border-rule py-section-mobile lg:py-section">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="mt-4 text-h2 font-semibold">{title}</h2>
    {standfirst ? <p className="mt-4 max-w-measure text-body-l text-muted">{standfirst}</p> : null}
    <div className="mt-12">{children}</div>
  </section>
);

export default function StyleguidePage() {
  return (
    <main id="main" className="relative">
      {/* Static preview of the signature element. The real <BoundaryRule> is not built yet. */}
      <div aria-hidden className="pointer-events-none fixed inset-y-0 left-8 hidden w-px bg-plane-public lg:block" />

      <div className="mx-auto max-w-content px-6 lg:pl-gutter lg:pr-10">
        <header className="py-section-mobile lg:py-section">
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
                            <p className="mt-2 font-mono text-mono-eyebrow uppercase text-boundary">
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
          eyebrow="SECTION 5.6"
          title="Component inventory"
          standfirst="Seventeen components, to be built before any page. Placeholders only at this stage — nothing in this list exists yet."
        >
          <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {componentInventory.map((c) => (
              <li
                key={c.name}
                className="flex min-h-[168px] flex-col justify-between rounded-card border border-dashed border-rule bg-paper-raised/60 p-5"
              >
                <div>
                  <p className="font-mono text-caption font-medium">{`<${c.name}>`}</p>
                  <p className="mt-3 text-caption text-muted">{c.purpose}</p>
                </div>
                <p className="mt-5 font-mono text-mono-eyebrow uppercase text-muted">
                  Not built · § {c.ref}
                </p>
              </li>
            ))}
          </ul>
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
    </main>
  );
}
