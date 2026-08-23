import { bands, questions } from '@/content/scorecard';

/**
 * Section 10 — scoring, in one place, imported by the client component and by
 * the route handler. The browser can show a result without an email address,
 * and the server can compute the same result from the same answers, and they
 * cannot disagree.
 *
 * Ten questions, four options, nought to three. Equal weighting, stated on the
 * results screen: weighting the questions would imply we know which leak is
 * worst for this reader, and we do not.
 */

export const MAX_SCORE = questions.length * 3;

export type WeakArea = { id: string; area: string; score: number };

export type ScorecardResult = {
  total: number;
  max: number;
  band: { id: string; label: string; body: string };
  /** Worst first. Ties break on question order, so the result is stable. */
  weakest: WeakArea[];
};

export function scoreAnswers(answers: readonly (number | null)[]): ScorecardResult {
  const clean = questions.map((_question, index) => {
    const raw = answers[index];
    if (typeof raw !== 'number' || Number.isNaN(raw)) return 0;
    return Math.max(0, Math.min(3, Math.trunc(raw)));
  });

  const total = clean.reduce((sum, value) => sum + value, 0);
  const band = bands.find((candidate) => total <= candidate.max) ?? bands[bands.length - 1];

  const weakest = questions
    .map((question, index) => ({
      id: question.id,
      area: question.area,
      score: clean[index],
      index,
    }))
    .sort((a, b) => a.score - b.score || a.index - b.index)
    .slice(0, 5)
    .map(({ id, area, score }) => ({ id, area, score }));

  return {
    total,
    max: MAX_SCORE,
    band: { id: band.id, label: band.label, body: band.body },
    weakest,
  };
}
