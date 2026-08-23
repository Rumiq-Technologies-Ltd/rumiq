import { dental } from './dental';
import { healthSystems } from './health-systems';
import { independent } from './independent';
import { multiSite } from './multi-site';
import { transport } from './transport';
import type { SectorConfig, SectorId } from './types';

/**
 * The sector registry — Section 9.2.
 *
 * To add a sector: create the config file next to this one and add it to this
 * array. Nothing else changes. The dashboard toggle, the funnel, the capacity
 * matrix, the action cards and (from Prompt 8) the solutions page all read from
 * the registry, so no component needs to know how many sectors exist.
 */
// Single-site first (Section 4.4): the independent provider is not a smaller
// version of the enterprise buyer, and the order says so.
export const sectors: SectorConfig[] = [independent, dental, multiSite, transport, healthSystems];

/**
 * Sectors planned but not built. No config means no page: the route returns 404
 * rather than shipping an empty template (Section 12).
 */
export const scaffoldedSectorIds = [
  'behavioral',
  'rehab',
  'home-health',
  'aesthetics',
  'urgent-care',
] as const;

/** A sector that carries a demo dataset, narrowed so the dashboard does not
 *  have to guard every read. */
export type DashboardSector = SectorConfig & {
  dashboard: NonNullable<SectorConfig['dashboard']>;
};

const hasDashboard = (sector: SectorConfig): sector is DashboardSector =>
  sector.dashboard !== undefined;

/** Sectors carrying a demo dataset. Drives the dashboard toggle. */
export const dashboardSectors: DashboardSector[] = sectors.filter(hasDashboard);

export const defaultSectorId: SectorId = dashboardSectors[0]!.id;

/** Options for <SectorToggle>, which maps over whatever it is given. */
export const sectorOptions = dashboardSectors.map((sector) => ({
  id: sector.id,
  label: sector.label,
}));

export function getSector(id: SectorId): DashboardSector {
  return dashboardSectors.find((sector) => sector.id === id) ?? dashboardSectors[0]!;
}

/** Solutions pages look up by route slug. Returns undefined for a sector with
 *  no config, which the route turns into a 404. */
export function findSectorBySlug(slug: string): SectorConfig | undefined {
  return sectors.find((sector) => sector.href === `/solutions/${slug}`);
}

export type { SectorConfig, SectorId } from './types';
export type {
  CapacityCell,
  FailureMode,
  ModuleStep,
  Phase,
  SectorPage,
  ConnectorHealth,
  NextBestAction,
  SectorHero,
  SectorRow,
  SectorVocabulary,
} from './types';
