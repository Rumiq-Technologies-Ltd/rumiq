/*
 * TEMPORARY LANDING PAGE — decorative arcs behind the hero.
 *
 * The brand's shape language is rounded arcs and asymmetric flow. These fill
 * the empty right half of the hero on wide screens without adding copy or a
 * claim. Purely decorative: aria-hidden, no pointer events, and on narrow
 * screens they sit faintly in the top corner so they never compete with text.
 * The arcs draw in once on load (hero-arc in globals.css).
 *
 * The dots orbit their rings. Each ring is drawn as an open arc, but its dot
 * follows a closed version of the same curve: the visible arc, then a short
 * loop back just beyond the SVG's right edge. That edge always sits off-screen
 * (the SVG overhangs the hero, which clips it), so the dot leaves at one end of
 * its ring and reappears at the other, and the motion reads as a full orbit.
 * SMIL animateMotion follows the path exactly. Inner rings orbit faster.
 *
 * With reduced motion the orbiting dots are hidden and still dots stand at
 * the rings' leftmost points instead.
 */

type Ring = {
  /** The visible arc. */
  d: string;
  /** The return loop, outside the right edge, closing the orbit. */
  back: string;
  stroke: string;
  width: number;
  delay: string;
  /** The dot on this ring, if any. */
  dot?: { r: number; fill: string; seconds: number; rest: [number, number] };
};

const rings: Ring[] = [
  {
    d: 'M600 60 C 360 60, 180 180, 180 330 S 360 600, 600 600',
    back: 'C 660 600, 660 60, 600 60 Z',
    stroke: 'stroke-navy/15',
    width: 1.5,
    delay: '0ms',
    dot: { r: 6, fill: 'fill-navy/30', seconds: 30, rest: [180, 330] },
  },
  {
    d: 'M600 130 C 410 130, 260 230, 260 340 S 400 540, 600 540',
    back: 'C 660 540, 660 130, 600 130 Z',
    stroke: 'stroke-navy/25',
    width: 1.5,
    delay: '120ms',
  },
  {
    d: 'M600 200 C 460 200, 340 270, 340 350 S 440 480, 600 480',
    back: 'C 660 480, 660 200, 600 200 Z',
    stroke: 'stroke-teal',
    width: 2,
    delay: '240ms',
    dot: { r: 7, fill: 'fill-teal', seconds: 18, rest: [340, 350] },
  },
  {
    d: 'M600 270 C 500 270, 420 310, 420 360 S 490 420, 600 420',
    back: 'C 660 420, 660 270, 600 270 Z',
    stroke: 'stroke-navy',
    width: 2,
    delay: '360ms',
    dot: { r: 7, fill: 'fill-navy', seconds: 11, rest: [420, 360] },
  },
];

/* Each dot starts near its ring's leftmost point, where the still dots stand. */
const START_SHARE = 0.42;

export function HeroArcs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 600 600"
      fill="none"
      className="pointer-events-none absolute -right-40 -top-24 size-[420px] opacity-40 sm:-right-24 sm:size-[520px] lg:-right-56 lg:top-1/2 lg:size-[600px] lg:-translate-y-1/2 lg:opacity-100 xl:-right-10 xl:size-[640px]"
    >
      <defs>
        {rings.map((ring, i) => (
          <path key={i} id={`hero-orbit-${i}`} d={`${ring.d} ${ring.back}`} />
        ))}
      </defs>

      {rings.map((ring, i) => (
        <path
          key={i}
          className={`hero-arc ${ring.stroke}`}
          strokeWidth={ring.width}
          d={ring.d}
          pathLength={1}
          style={{ animationDelay: ring.delay }}
        />
      ))}

      {rings.map((ring, i) =>
        ring.dot ? (
          <g key={i}>
            {/* Orbiting. */}
            <circle r={ring.dot.r} className={`${ring.dot.fill} motion-reduce:hidden`}>
              <animateMotion
                dur={`${ring.dot.seconds}s`}
                begin={`-${(ring.dot.seconds * START_SHARE).toFixed(2)}s`}
                repeatCount="indefinite"
                calcMode="paced"
              >
                <mpath href={`#hero-orbit-${i}`} />
              </animateMotion>
            </circle>
            {/* Still, for reduced motion. */}
            <circle cx={ring.dot.rest[0]} cy={ring.dot.rest[1]} r={ring.dot.r} className={`${ring.dot.fill} hidden motion-reduce:block`} />
          </g>
        ) : null,
      )}
    </svg>
  );
}
