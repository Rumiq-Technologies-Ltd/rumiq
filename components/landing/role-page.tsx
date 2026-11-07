import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CalendarCheck,
  Check,
  Eye,
  Globe,
  Handshake,
  Home,
  Layers,
  Mail,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  WandSparkles,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { Button, Eyebrow, SectionHeader } from '@/components/rumiq';
import { serviceTones } from '@/components/landing/service-tones';
import { careerShared, type IconName, type Point, type RoleDetail } from '@/content/landing/careers';
import { cn } from '@/lib/utils';

/*
 * TEMPORARY LANDING PAGE — one open role, in full.
 *
 * The landing page shows the basics; this page is where a candidate decides.
 * It runs: the role and its facts (navy), the startup story, the opportunity,
 * the work, the people we want, the package (navy), then how to apply. On
 * phones everything stacks and a slim Apply bar stays at the bottom, so the
 * next step is always one tap away. Same tokens and tones as the landing page.
 */

const icons: Record<IconName, LucideIcon> = {
  rocket: Rocket,
  users: Users,
  'trending-up': TrendingUp,
  sparkles: Sparkles,
  'shield-check': ShieldCheck,
  house: Home,
  'calendar-check': CalendarCheck,
  globe: Globe,
  target: Target,
  zap: Zap,
  handshake: Handshake,
  eye: Eye,
  chart: BarChart3,
  wand: WandSparkles,
  layers: Layers,
};

type Role = {
  id: string;
  title: string;
  summary: string;
  youllWorkOn: readonly string[];
  youllBring: readonly string[];
  applySubject: string;
};
type Fact = { label: string; value: string };

/* Section labels: the landing page's style, brand teal on light sections. */
const EYEBROW = 'text-[1.125rem] font-medium text-teal';
const EYEBROW_DARK = 'text-[1.125rem]';

const SECTION = 'mx-auto max-w-content px-6 py-section-mobile lg:py-24 lg:pl-gutter';

function PointIcon({ name, dark }: { name: IconName; dark?: boolean }) {
  const Icon = icons[name];
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex size-11 shrink-0 items-center justify-center rounded-card',
        dark ? 'bg-paper/10 text-teal' : 'bg-navy/[0.07] text-navy',
      )}
    >
      <Icon className="size-5" strokeWidth={1.75} />
    </span>
  );
}

export function RolePage({
  role,
  detail,
  otherRoles,
  facts,
  email,
  applicationsNote,
  closes,
}: {
  role: Role;
  detail: RoleDetail;
  otherRoles: readonly Role[];
  facts: readonly Fact[];
  email: string;
  applicationsNote: string;
  closes: string;
}) {
  const applyHref = `mailto:${email}?subject=${encodeURIComponent(role.applySubject)}`;
  const { startup, perks, apply, labels } = careerShared;

  return (
    <main id="main" className="scroll-mt-20 pb-20 lg:pb-0">
      {/* Hero */}
      <section className="border-b border-rule bg-paper-dark text-paper">
        <div className="mx-auto max-w-content px-6 pb-section-mobile pt-8 lg:pb-20 lg:pl-gutter lg:pt-10">
          <Link
            href="/#careers"
            className="inline-flex items-center gap-2 text-caption text-paper/75 transition-colors hover:text-paper"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            {labels.back}
          </Link>

          <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start lg:gap-16">
            <div>
              <Eyebrow tone="inverted" className="text-[1.125rem]">
                {labels.heroEyebrow}
              </Eyebrow>
              <h1 className="mt-4 text-display-l font-semibold text-paper">{role.title}</h1>
              <p className="mt-6 max-w-measure text-body-l text-paper/75">{detail.pitch}</p>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
                <Button asChild inverted size="lg">
                  <a href={applyHref}>
                    <Mail aria-hidden="true" className="size-5" />
                    {labels.apply}
                  </a>
                </Button>
                <p className="inline-flex items-center gap-2 text-caption text-paper/80">
                  <span aria-hidden="true" className="size-2 rounded-full bg-teal" />
                  Applications close {closes}
                </p>
              </div>
            </div>

            {/* The facts every role shares. */}
            <dl className="divide-y divide-paper/15 rounded-panel border border-paper/15 bg-paper/[0.06] px-5">
              {facts.map((fact) => (
                <div key={fact.label} className="py-4">
                  <dt className="font-mono text-mono-eyebrow uppercase text-paper/60">{fact.label}</dt>
                  <dd className="mt-1 text-caption text-paper">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Startup */}
      <section className="border-b border-rule">
        <div className={SECTION}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div>
              <SectionHeader
                eyebrow={startup.eyebrow}
                headline={startup.headline}
                headlineClassName="text-navy"
            eyebrowClassName={EYEBROW}
                standfirst={startup.intro}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {startup.points.map((point) => (
                <div key={point.title} className="flex gap-4 rounded-panel border border-rule bg-paper-raised p-5">
                  <PointIcon name={point.icon} />
                  <div>
                    <h3 className="text-body font-semibold text-ink">{point.title}</h3>
                    <p className="mt-1 text-caption text-muted">{point.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-10 max-w-measure border-l-[3px] border-teal pl-5 text-body text-ink">{startup.honesty}</p>
        </div>
      </section>

      {/* Opportunity */}
      <section className="border-b border-rule bg-paper-alt">
        <div className={SECTION}>
          <SectionHeader
            eyebrow={detail.opportunity.eyebrow}
            headline={detail.opportunity.headline}
            headlineClassName="text-navy"
            eyebrowClassName={EYEBROW}
            standfirst={detail.opportunity.intro}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12">
            {detail.opportunity.points.map((point, index) => {
              const tone = serviceTones[index % serviceTones.length];
              const Icon = icons[point.icon];
              return (
                <article key={point.title} className="overflow-hidden rounded-panel border border-rule bg-paper">
                  <div className={cn('flex items-center justify-between px-5 py-4', tone.strip, tone.dark ? 'text-paper' : 'text-navy')}>
                    <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
                    <span className="font-mono text-mono-eyebrow">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="text-h3 font-semibold text-navy">{point.title}</h3>
                    <p className="mt-2 text-body text-muted">{point.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* The work */}
      <section className="border-b border-rule">
        <div className={SECTION}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeader
                eyebrow={labels.workEyebrow}
                headline={detail.work.headline}
                headlineClassName="text-navy"
            eyebrowClassName={EYEBROW}
                standfirst={detail.work.intro}
              />
            </div>
            <ol className="grid gap-3">
              {role.youllWorkOn.map((item, index) => (
                <li key={item} className="flex items-start gap-4 rounded-card border border-rule bg-paper-raised p-4 sm:p-5">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-navy font-mono text-mono-eyebrow text-paper"
                  >
                    {index + 1}
                  </span>
                  <span className="pt-1 text-body text-ink">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* The people */}
      <section className="border-b border-rule bg-paper-alt">
        <div className={SECTION}>
          <SectionHeader
            eyebrow={detail.people.eyebrow}
            headline={detail.people.headline}
            headlineClassName="text-navy"
            eyebrowClassName={EYEBROW}
            standfirst={detail.people.intro}
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {detail.people.qualities.map((quality) => (
              <div key={quality.title} className="rounded-panel border border-rule bg-paper p-5">
                <PointIcon name={quality.icon} />
                <h3 className="mt-4 text-body font-semibold text-navy">{quality.title}</h3>
                <p className="mt-1 text-caption text-muted">{quality.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-panel border border-navy/15 bg-navy/[0.05] p-6 sm:p-8">
            <h3 className="text-h3 font-semibold text-navy">{labels.bring}</h3>
            <ul className="mt-5 grid gap-x-10 gap-y-4 md:grid-cols-2">
              {role.youllBring.map((item) => (
                <li key={item} className="flex items-start gap-3 text-body text-ink">
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-teal text-paper"
                  >
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="border-b border-rule bg-paper-dark text-paper">
        <div className={SECTION}>
          <SectionHeader inverted eyebrowClassName={EYEBROW_DARK} eyebrow={perks.eyebrow} headline={perks.headline} standfirst={perks.intro} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {perks.items.map((perk) => (
              <div key={perk.title} className="rounded-panel border border-paper/15 bg-paper/[0.05] p-5 sm:p-6">
                <PointIcon name={perk.icon} dark />
                <h3 className="mt-4 text-body-l font-semibold text-paper">{perk.title}</h3>
                <p className="mt-2 text-caption text-paper/75">{perk.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className="scroll-mt-20">
        <div className={SECTION}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div>
              <SectionHeader eyebrow={apply.eyebrow} headline={apply.headline} headlineClassName="text-navy" eyebrowClassName={EYEBROW} />
              <p className="mt-5 max-w-measure text-body-l text-muted">
                Email your CV and portfolio to{' '}
                <a
                  href={`mailto:${email}`}
                  className="break-all text-navy underline decoration-navy/40 underline-offset-4 hover:decoration-navy sm:break-normal"
                >
                  {email}
                </a>
                , with “{role.applySubject}” in the subject line.
              </p>
              <Button asChild size="lg" className="mt-8 w-full sm:w-auto">
                <a href={applyHref}>
                  <Mail aria-hidden="true" className="size-5" />
                  {labels.apply}
                </a>
              </Button>
              <p className="mt-4 text-caption text-muted">{applicationsNote}</p>
            </div>

            <ol className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {apply.steps.map((step, index) => (
                <li key={step.title} className="flex items-start gap-4 rounded-panel border border-rule bg-paper-raised p-5">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-navy/30 font-mono text-mono-eyebrow text-navy"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-body font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1 text-caption text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {otherRoles.length > 0 && (
            <div className="mt-16 border-t border-rule pt-8">
              <Eyebrow className={EYEBROW}>{labels.alsoHiring}</Eyebrow>
              <div className="mt-4 grid gap-3">
                {otherRoles.map((other) => (
                  <Link
                    key={other.id}
                    href={`/careers/${other.id}`}
                    className="group flex items-center gap-4 rounded-panel border border-rule bg-paper-raised p-5 transition-colors hover:border-navy/40"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-body-l font-semibold text-navy">{other.title}</span>
                      <span className="mt-1 block text-caption text-muted">{other.summary}</span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="size-5 shrink-0 text-navy transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Phones: the next step stays one tap away. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-paper/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-content items-center gap-3">
          <p className="min-w-0 flex-1 truncate text-caption font-medium text-ink">{role.title}</p>
          <Button asChild size="md" className="shrink-0">
            <a href={applyHref}>{labels.apply}</a>
          </Button>
        </div>
      </div>
    </main>
  );
}

export type { Point };
