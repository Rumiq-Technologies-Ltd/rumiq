import { DevModeSwitch } from '@/components/landing/dev-mode-switch';
import { LandingFooter } from '@/components/landing/landing-footer';
import { LandingHeader } from '@/components/landing/landing-header';
import { ScrollReveal } from '@/components/rumiq';

/*
 * TEMPORARY LANDING PAGE — shell for every page in app/(landing). Header and
 * footer come from components/landing. ScrollReveal is the same motion the
 * full site uses; it respects prefers-reduced-motion.
 */
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LandingHeader />
      {children}
      <LandingFooter />
      <ScrollReveal />
      <DevModeSwitch to="/full" label="Open full site" />
    </>
  );
}
