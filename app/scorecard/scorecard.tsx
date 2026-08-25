'use client';

import * as React from 'react';
import Link from 'next/link';
import { questions, scorecardCopy as copy, scorecardGateFields } from '@/content/scorecard';
import { MAX_SCORE, scoreAnswers, type ScorecardResult } from '@/lib/scorecard';
import { Button } from '@/components/rumiq/button';
import { Eyebrow } from '@/components/rumiq/eyebrow';
import { RumiqForm } from '@/components/rumiq/form';
import { cn } from '@/lib/utils';

/**
 * Growth Leak Scorecard — Section 10.
 *
 * Deliberate decisions:
 *  • One question at a time. Ten questions on one page reads as a form and gets
 *    abandoned; one at a time reads as a conversation.
 *  • Answers live in React state and in exactly one localStorage key, so a
 *    reader who closes the tab at question seven does not start again.
 *  • The email gate sits after the last question, never before it. Asking for an
 *    address before any value has been delivered is the reason nobody finishes
 *    these things.
 *  • The results can be seen without giving an address at all. A gate that
 *    cannot be walked around is a wall.
 *  • The email is POSTed in the request body. It never enters the URL.
 *  • Radio groups, so arrow keys, Home and End work without any JavaScript of
 *    ours, and every stage change is announced.
 */

const STORAGE_KEY = 'rumiq.scorecard.v1';

type Stage = 'intro' | 'questions' | 'gate' | 'results';
type Answers = (number | null)[];

const emptyAnswers = (): Answers => questions.map(() => null);

function readStored(): { answers: Answers; index: number } | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { answers?: unknown; index?: unknown };
    if (!Array.isArray(parsed.answers) || parsed.answers.length !== questions.length) return null;
    const answers = parsed.answers.map((value) =>
      typeof value === 'number' && value >= 0 && value <= 3 ? value : null,
    );
    const index =
      typeof parsed.index === 'number' && parsed.index >= 0 && parsed.index < questions.length
        ? parsed.index
        : 0;
    return answers.some((value) => value !== null) ? { answers, index } : null;
  } catch {
    return null;
  }
}

export function Scorecard() {
  const [stage, setStage] = React.useState<Stage>('intro');
  const [index, setIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Answers>(emptyAnswers);
  const [resumed, setResumed] = React.useState(false);
  const [prompt, setPrompt] = React.useState('');
  const [result, setResult] = React.useState<ScorecardResult | null>(null);

  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const firstOptionRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const stored = readStored();
    if (stored) {
      setAnswers(stored.answers);
      setIndex(stored.index);
      setResumed(true);
    }
  }, []);

  const persist = React.useCallback((next: Answers, nextIndex: number) => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ answers: next, index: nextIndex }),
      );
    } catch {
      // Private browsing, or storage disabled. The assessment still works in
      // memory; it simply will not survive a reload.
    }
  }, []);

  const clearStored = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* nothing to clean up */
    }
  };

  const answered = answers.filter((value) => value !== null).length;
  const question = questions[index];
  const localResult = React.useMemo(() => scoreAnswers(answers), [answers]);
  const shown = result ?? localResult;

  function choose(score: number) {
    setPrompt('');
    setAnswers((previous) => {
      const next = [...previous];
      next[index] = score;
      persist(next, index);
      return next;
    });
  }

  function goTo(nextIndex: number) {
    setIndex(nextIndex);
    persist(answers, nextIndex);
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  function next() {
    if (answers[index] === null) {
      setPrompt(copy.results.chooseFirst);
      firstOptionRef.current?.focus();
      return;
    }
    if (index + 1 < questions.length) {
      goTo(index + 1);
      return;
    }
    setStage('gate');
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  function restart() {
    clearStored();
    setAnswers(emptyAnswers());
    setIndex(0);
    setResult(null);
    setResumed(false);
    setPrompt('');
    setStage('questions');
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  /* --------------------------------------------------------------- intro */

  if (stage === 'intro') {
    return (
      <div className="rounded-card border border-rule bg-paper-raised p-8">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <p className="mt-4 max-w-measure text-body-l">{copy.subhead}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button
            size="lg"
            onClick={() => {
              setStage('questions');
              requestAnimationFrame(() => headingRef.current?.focus());
            }}
          >
            {resumed ? 'Continue where you left off' : copy.start}
          </Button>
          {resumed ? (
            <Button variant="ghost" onClick={restart}>
              {copy.results.restart}
            </Button>
          ) : null}
        </div>
        {resumed ? (
          <p className="mt-6 font-mono text-mono-eyebrow uppercase text-muted">
            {copy.results.resumed} {answered} of {questions.length} answered.
          </p>
        ) : null}
      </div>
    );
  }

  /* ----------------------------------------------------------- questions */

  if (stage === 'questions') {
    const percent = Math.round((answered / questions.length) * 100);

    return (
      <div className="rounded-card border border-rule bg-paper-raised">
        <div className="border-b border-rule px-6 py-5 sm:px-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <Eyebrow>
              {copy.results.ofTen} {index + 1} of {questions.length} · {question.area}
            </Eyebrow>
            <span className="font-mono text-mono-eyebrow uppercase tabular-nums text-muted">
              {answered}/{questions.length} answered
            </span>
          </div>
          <div
            role="progressbar"
            aria-label={copy.results.progressLabel}
            aria-valuemin={0}
            aria-valuemax={questions.length}
            aria-valuenow={answered}
            aria-valuetext={`${answered} of ${questions.length} answered`}
            className="mt-4 h-1 w-full bg-rule"
          >
            <div
              className="h-1 bg-navy transition-[width] duration-300 ease-instrument motion-reduce:transition-none"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        <div className="px-6 py-8 sm:px-8">
          <p aria-live="polite" className="sr-only">
            {`${copy.results.ofTen} ${index + 1} of ${questions.length}. ${question.question}`}
          </p>

          <fieldset>
            <legend
              ref={headingRef as unknown as React.RefObject<HTMLLegendElement>}
              tabIndex={-1}
              className="max-w-measure font-display text-h3 font-semibold"
            >
              {question.question}
            </legend>

            <div className="mt-8 grid gap-3">
              {question.options.map((option, optionIndex) => {
                const id = `q-${question.id}-${optionIndex}`;
                const selected = answers[index] === option.score;
                return (
                  <label
                    key={id}
                    htmlFor={id}
                    className={cn(
                      'flex cursor-pointer items-start gap-4 rounded-card border p-4 transition-colors duration-120',
                      selected ? 'border-navy bg-navy/5' : 'border-rule hover:border-ink/40',
                    )}
                  >
                    <input
                      ref={optionIndex === 0 ? firstOptionRef : undefined}
                      id={id}
                      type="radio"
                      name={`question-${question.id}`}
                      value={option.score}
                      checked={selected}
                      onChange={() => choose(option.score)}
                      className="mt-1 h-4 w-4 shrink-0 accent-ink"
                    />
                    <span className="text-body">{option.label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {prompt ? (
            <p role="alert" className="mt-6 text-caption text-signal-red">
              {prompt}
            </p>
          ) : null}

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button size="lg" onClick={next}>
              {index + 1 === questions.length ? copy.results.finish : copy.results.next}
            </Button>
            {index > 0 ? (
              <Button variant="secondary" onClick={() => goTo(index - 1)}>
                {copy.results.back}
              </Button>
            ) : null}
            <Button variant="ghost" onClick={restart}>
              {copy.results.restart}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- gate */

  if (stage === 'gate') {
    return (
      <div className="rounded-card border border-rule bg-paper-raised p-8">
        <Eyebrow>{copy.gate.eyebrow}</Eyebrow>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="mt-4 max-w-measure text-h2 font-semibold"
        >
          {copy.gate.headline}
        </h2>
        <p className="mt-5 max-w-measure text-body-l text-muted">{copy.gate.body}</p>
        <p className="mt-4 max-w-measure text-caption text-muted">{copy.gate.wont}</p>

        <RumiqForm
          className="mt-10"
          formId="scorecard"
          endpoint="/api/scorecard"
          fields={scorecardGateFields}
          submitLabel={copy.gate.submit}
          extraPayload={{ answers: answers.map((value) => value ?? 0) }}
          success={{
            eyebrow: copy.results.eyebrow,
            headline: 'Sent. Your results are below.',
            body: 'The one-page version is on its way to that address. The full breakdown is on this page — you do not need the email to read it.',
          }}
          onSuccess={(data) => {
            const payload = data as { result?: ScorecardResult };
            if (payload?.result) setResult(payload.result);
            setStage('results');
          }}
        />

        <div className="mt-8 border-t border-rule pt-6">
          <Button
            variant="ghost"
            onClick={() => {
              setStage('results');
              requestAnimationFrame(() => headingRef.current?.focus());
            }}
          >
            {copy.gate.skip}
          </Button>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------- results */

  const byId = new Map(questions.map((entry) => [entry.id, entry]));

  return (
    <div>
      <div className="rounded-card border border-rule bg-paper-raised p-8">
        <Eyebrow>{copy.results.eyebrow}</Eyebrow>
        <h2 ref={headingRef} tabIndex={-1} className="mt-4 flex flex-wrap items-baseline gap-3">
          <span className="font-display text-display-l font-bold tabular-nums">{shown.total}</span>
          <span className="font-mono text-mono-eyebrow uppercase text-muted">
            {copy.results.outOf}
          </span>
        </h2>
        <p className="mt-6 max-w-measure text-h3 font-display font-semibold">{shown.band.label}</p>
        <p className="mt-4 max-w-measure text-body text-muted">{shown.band.body}</p>
        <div
          aria-hidden
          className="mt-8 h-1 w-full bg-rule"
        >
          <div className="h-1 bg-navy" style={{ width: `${Math.round((shown.total / MAX_SCORE) * 100)}%` }} />
        </div>
      </div>

      <h3 className="mt-14 text-h2 font-semibold">{copy.results.weakest}</h3>
      <ol className="mt-8 grid gap-4">
        {shown.weakest.map((area, position) => {
          const source = byId.get(area.id);
          if (!source) return null;
          return (
            <li key={area.id} className="rounded-card border border-rule bg-paper-raised p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="font-mono text-mono-eyebrow uppercase text-muted">
                  {String(position + 1).padStart(2, '0')} · {source.area}
                </p>
                <p className="font-mono text-mono-eyebrow uppercase tabular-nums text-muted">
                  {area.score} / 3
                </p>
              </div>
              <dl className="mt-5 grid gap-5">
                <div>
                  <dt className="font-mono text-mono-eyebrow uppercase text-muted">
                    {copy.results.observation}
                  </dt>
                  <dd className="mt-2 max-w-measure text-body">{source.observation}</dd>
                </div>
                <div>
                  <dt className="font-mono text-mono-eyebrow uppercase text-muted">
                    {copy.results.cost}
                  </dt>
                  <dd className="mt-2 max-w-measure text-body text-muted">{source.cost}</dd>
                </div>
                <div>
                  <dt className="font-mono text-mono-eyebrow uppercase text-muted">
                    {copy.results.fix}
                  </dt>
                  <dd className="mt-2 max-w-measure text-body">{source.fix}</dd>
                </div>
              </dl>
            </li>
          );
        })}
      </ol>

      <p className="mt-10 max-w-measure text-caption text-muted">{copy.results.note}</p>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Button asChild size="lg">
          <Link href="/contact">{copy.results.cta}</Link>
        </Button>
        <Button variant="ghost" onClick={restart}>
          {copy.results.restart}
        </Button>
      </div>
    </div>
  );
}
