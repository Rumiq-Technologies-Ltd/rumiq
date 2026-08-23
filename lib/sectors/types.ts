import type { Plane } from '@/lib/planes';
import type { FunnelStage } from '@/components/rumiq';

/**
 * SectorConfig — Specification Section 9.2.
 *
 * One file per sector in this directory, collected by ./index. The dashboard
 * toggle maps over the registry, so adding a third sector means adding a config
 * file and nothing else: no component changes, no switch statements.
 *
 * `hero` is included now even though only the solutions pages consume it
 * (Section 8.8), so adding those pages needs no change to this type.
 *
 * Every dataset in every config is synthetic and hardcoded. No connector, no
 * client system and no real record is involved anywhere.
 */

export type SectorId = string;

/** The sector's own language. Panels take their labels from here. */
export type SectorVocabulary = {
  /** What one unit of demand becomes: a patient, a journey. */
  unit: string;
  units: string;
  /** The stage that counts as delivered value. */
  outcome: string;
  /** What the capacity matrix measures. */
  capacityNoun: string;
  /** Row and column dimensions of the capacity matrix. */
  siteNoun: string;
  serviceNoun: string;
  /** Cost metric label, e.g. "Cost per attended patient". */
  costPerOutcome: string;
  /** Which funnel stage the cost metric divides by, so the label and the
   *  arithmetic cannot drift apart. */
  costStageIndex: 0 | 1 | 2 | 3;
};

export type SectorHero = {
  eyebrow: string;
  headline: string;
  subhead: string;
  /** The sharpest version of this sector's problem (Section 8.8). */
  sharpestProblem: string;
  assurances: readonly string[];
};

/** One row of the synthetic dataset. Filters narrow these rows, and every
 *  panel is computed from whatever survives, so the filters genuinely filter. */
export type SectorRow = {
  source: string;
  location: string;
  service: string;
  spend: number;
  /** Counts for the four funnel stages, in order. */
  stages: [number, number, number, number];
  /** Value of delivered outcomes, in the sector's currency unit. */
  value: number;
  /** True for the deliberate unmapped-source row (Section 9.2). */
  unmapped?: boolean;
};

export type CapacityCell = {
  location: string;
  service: string;
  /** Percentage of available capacity used. Over 100 is over-committed. */
  utilisation: number;
};

export type NextBestAction = {
  id: string;
  title: string;
  rationale: string;
  effect: string;
  location: string;
  service: string;
};

export type ConnectorHealth = {
  name: string;
  state: 'ok' | 'stale' | 'failed';
  updated: string;
  note: string;
};

export type FailureMode = { title: string; body: string; cost: string };
export type ModuleStep = { name: string; why: string };
export type Phase = { label: string; body: string };

/** Solutions page content — Section 8.8. One template, driven by this. */
export type SectorPage = {
  problem: { eyebrow: string; headline: string; body: string };
  failureModes: FailureMode[];
  modules: { eyebrow: string; headline: string; steps: ModuleStep[] };
  first90: { eyebrow: string; headline: string; phases: Phase[] };
  regulatory: { eyebrow: string; headline: string; notes: string[] };
  proofSlots: string[];
  /** Optional funnel for sectors whose journey differs from the clinical one. */
  funnel?: { label: string; stages: FunnelStage[] };
};

export type SectorConfig = {
  id: SectorId;
  label: string;
  /** Solutions page route, used by Prompt 8. */
  href: string;
  vocabulary: SectorVocabulary;
  hero: SectorHero;
  page: SectorPage;
  /** Present only for sectors with a demo dataset. Sectors without one still
   *  get a solutions page; they simply do not appear in the dashboard toggle. */
  dashboard?: {
    /** Stage labels, in the sector's own words. Length drives the funnel panel. */
    funnelStages: { label: string; plane: Plane }[];
    dateRanges: { id: string; label: string; multiplier: number }[];
    locations: string[];
    services: string[];
    rows: SectorRow[];
    capacity: CapacityCell[];
    actions: NextBestAction[];
    connectors: ConnectorHealth[];
    /** Currency or unit prefix for value figures. */
    valuePrefix: string;
  };
};
