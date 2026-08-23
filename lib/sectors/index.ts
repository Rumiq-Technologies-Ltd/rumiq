import { dental } from './dental';
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
export const sectors: SectorConfig[] = [dental, transport];

export const defaultSectorId: SectorId = sectors[0]!.id;

/** Options for <SectorToggle>, which maps over whatever it is given. */
export const sectorOptions = sectors.map((sector) => ({ id: sector.id, label: sector.label }));

export function getSector(id: SectorId): SectorConfig {
  return sectors.find((sector) => sector.id === id) ?? sectors[0]!;
}

export type { SectorConfig, SectorId } from './types';
export type {
  CapacityCell,
  ConnectorHealth,
  NextBestAction,
  SectorHero,
  SectorRow,
  SectorVocabulary,
} from './types';
