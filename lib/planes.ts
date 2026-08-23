/**
 * The two planes and the boundary between them — Section 5.2.
 *
 * Teal only marks public-plane concepts. Blue only marks protected-plane
 * concepts. Amber only appears where a policy decision is made or shown.
 * These maps exist so that no component builds a colour class from a string,
 * which would both break Tailwind's scanner and let the semantics drift.
 */

export type Plane = 'public' | 'boundary' | 'protected';

export const PLANES: Plane[] = ['public', 'boundary', 'protected'];

export const planeLabel: Record<Plane, string> = {
  public: 'PUBLIC PLANE',
  boundary: 'BOUNDARY',
  protected: 'PROTECTED PLANE',
};

export const planeShortLabel: Record<Plane, string> = {
  public: 'Public',
  boundary: 'Boundary',
  protected: 'Protected',
};

export const planeDescription: Record<Plane, string> = {
  public: 'Marketing, demand and public data. Nothing here is patient data.',
  boundary: 'Where every event is classified and every disclosure is decided and logged.',
  protected: 'The operational system, appointments, trips and delivered care. The source of record.',
};

export const planeBg: Record<Plane, string> = {
  public: 'bg-plane-public',
  boundary: 'bg-boundary',
  protected: 'bg-plane-protected',
};

export const planeText: Record<Plane, string> = {
  public: 'text-plane-public',
  boundary: 'text-boundary',
  protected: 'text-plane-protected',
};

export const planeBorder: Record<Plane, string> = {
  public: 'border-plane-public',
  boundary: 'border-boundary',
  protected: 'border-plane-protected',
};

/** Tint for surfaces that sit inside a plane. Alpha keeps it quiet. */
export const planeTint: Record<Plane, string> = {
  public: 'bg-plane-public/5',
  boundary: 'bg-boundary/5',
  protected: 'bg-plane-protected/5',
};

/** On an inverted surface the plane colours need lifting to stay legible. */
export const planeTextOnDark: Record<Plane, string> = {
  public: 'text-plane-public',
  boundary: 'text-boundary',
  protected: 'text-paper/70',
};
