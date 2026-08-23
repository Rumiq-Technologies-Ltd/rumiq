import type { Plane } from '@/lib/planes';
import { platform } from './platform';

/**
 * Navigation and mega-menu content — Sections 6, 7.1 and 7.2.
 * Copy lives here, not in the header or footer components.
 */

export type NavLink = { label: string; href: string; description?: string };

export type MegaMenuPlane = {
  plane: Plane;
  title: string;
  /** The modules that sit in this plane, per Section 1. */
  modules: { name: string; href?: string }[];
};

/**
 * Section 1 — the ten modules, grouped into three planes. Derived from
 * content/platform.ts so the mega-menu, the mobile overlay and /platform can
 * never disagree about what the platform contains. Modules without a deep page
 * point at /platform, where their detail drawer lives.
 */
export const platformMenu: MegaMenuPlane[] = platform.planeSections.map((section) => ({
  plane: section.plane,
  title: section.title,
  modules: platform.modules
    .filter((module) => module.plane === section.plane)
    .map((module) => ({ name: module.name, href: module.href ?? '/platform' })),
}));

/** Section 6 — five live solution pages. The scaffolded five are not listed. */
export const solutionsMenu: NavLink[] = [
  {
    label: 'Independent single-site providers',
    href: '/solutions/independent',
    description: 'You are the marketing department, and you already have a job.',
  },
  {
    label: 'Dental practices, groups and DSOs',
    href: '/solutions/dental',
    description: 'Call volume holds up while new patient volume stalls.',
  },
  {
    label: 'Multi-site and specialty clinics',
    href: '/solutions/multi-site',
    description: 'Spend spreads evenly across locations that are not evenly full.',
  },
  {
    label: 'Patient transport and NEMT',
    href: '/solutions/transport',
    description: 'Trips get completed. Nobody can say which relationship produced them.',
  },
  {
    label: 'Hospital and health system marketing',
    href: '/solutions/health-systems',
    description: 'Tracker restrictions gutted the conversion signal.',
  },
];

export const platformOverview: NavLink = {
  label: 'Platform overview',
  href: '/platform',
  description: 'Ten modules, three planes, one governed layer.',
};

/** Section 6 — primary navigation. */
export const primaryNav: { label: string; href: string; menu?: 'platform' | 'solutions' }[] = [
  { label: 'Platform', href: '/platform', menu: 'platform' },
  { label: 'Solutions', href: '/solutions', menu: 'solutions' },
  { label: 'Trust', href: '/trust' },
  { label: 'Approach', href: '/approach' },
  { label: 'Insights', href: '/insights' },
];

export const headerCtas = {
  secondary: { label: 'Growth Leak Scorecard', href: '/scorecard' },
  primary: { label: 'Book a working session', href: '/contact' },
} as const;

/** Section 7.2 — four columns plus a base bar. */
export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Privacy & Data Gateway', href: '/platform/privacy-gateway' },
      { label: 'Patient Access Intelligence', href: '/platform/patient-access' },
      { label: 'Growth Intelligence', href: '/platform/growth-intelligence' },
      { label: 'Knowledge Graph & Connectors', href: '/platform/connectors' },
      { label: 'Content & Discovery', href: '/platform/content' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Independent providers', href: '/solutions/independent' },
      { label: 'Dental, groups & DSOs', href: '/solutions/dental' },
      { label: 'Multi-site & specialty', href: '/solutions/multi-site' },
      { label: 'Patient transport & NEMT', href: '/solutions/transport' },
      { label: 'Health systems', href: '/solutions/health-systems' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Approach', href: '/approach' },
      { label: 'Insights', href: '/insights' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/about' },
    ],
  },
  {
    title: 'Trust & regions',
    links: [
      { label: 'Trust Center', href: '/trust' },
      { label: 'United States', href: '/regions/united-states' },
      { label: 'Gulf', href: '/regions/gulf' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Cookies', href: '/cookies' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];
