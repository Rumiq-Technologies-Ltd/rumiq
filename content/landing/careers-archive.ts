/**
 * ARCHIVE — closed job postings, kept for reference. Nothing imports this file,
 * so none of it appears on the site, in the sitemap or in the structured data.
 *
 * To bring a role back:
 *   1. Move its entry from `archivedRoles` into `landing.careers.roles`
 *      in content/landing/index.ts.
 *   2. Move its entry from `archivedRoleDetails` into `roleDetails`
 *      in content/landing/careers.ts (the keys are the role ids).
 *   3. Check the closing date and start; the landing facts strip is shared.
 * The role page itself (components/landing/role-page.tsx) is generic and needs no change.
 */

import type { RoleDetail } from './careers';

export const archivedRoles = [
      {
        id: "digital-marketing-specialist",
        tabLabel: "Digital Marketing Specialist",
        title: "Digital Marketing Specialist",
        summary:
          "Own paid ads, organic social growth, SEO, AEO and local search for our clients during an intensive period of growth.",
        youllWorkOn: [
          "Plan, launch and optimize Google Ads campaigns",
          "Run Meta Ads for local lead generation, and TikTok Ads for national clients",
          "Grow client Facebook and Instagram accounts, plus TikTok for national clients",
          "Run SEO, local SEO and Google Business Profiles",
          "Lead AEO so clients are recommended by AI search and assistants",
          "Build an AI-assisted performance dashboard",
        ],
        youllBring: [
          "3–5 years in digital marketing, ideally including time at an agency",
          "Proven, hands-on results with Google Ads and Meta Ads, backed by numbers",
          "Hands-on SEO experience, plus a working understanding of AEO",
          "A track record of growing Instagram and Facebook accounts organically",
          "Fluent US English, written and spoken",
          "A fast, skilled AI user, able to show how AI has made their workflow more efficient",
          "Committed to patient privacy, and willing to learn HIPAA & other healthcare rules and build them into how you work",
        ],
        applySubject: "Digital Marketing Specialist – Islamabad",
        start: "Mid-November 2026",
        applicationsClose: "2026-11-12",
        applicationsNote:
          "Applications close 12 November 2026, close of business (Pakistan time). Only shortlisted candidates will be contacted.",
      },
] as const;

export const archivedRoleDetails: Record<string, RoleDetail> = {
  'digital-marketing-specialist': {
    apply: {
      headline: 'Send us your CV and portfolio.',
      steps: [
        { title: 'Email us.', body: 'Send your CV and portfolio, with the role in the subject line.' },
        { title: 'We review.', body: 'Only shortlisted candidates will be contacted.' },
        { title: 'You start.', body: 'The contract begins in mid-November 2026.' },
      ],
    },
    pitch:
      'You will run paid ads, organic social, SEO, AEO and local search for our healthcare clients, and see the results of your work quickly.',
    opportunity: {
      eyebrow: 'The opportunity',
      headline: 'Own the result, not one channel.',
      intro:
        'At many agencies, one person runs one channel. Here you run all of them for each client, and you see what each one brings in.',
      points: [
        {
          icon: 'layers',
          title: 'Every channel, one owner.',
          body: 'Google Ads, Meta Ads, TikTok Ads, SEO, local search and AEO, all planned together.',
        },
        {
          icon: 'chart',
          title: 'Results you can show.',
          body: 'You build a performance dashboard for each client, so the numbers are clear to them and to you.',
        },
        {
          icon: 'zap',
          title: 'Early on AEO.',
          body: 'Helping clients get recommended by AI search and assistants is a new and evolving field, and you will lead it.',
        },
        {
          icon: 'trending-up',
          title: 'Systems building.',
          body: 'Early marketers set the marketing approach of Rumiq and our clients. What you build now may become how future clients’ campaigns are run.',
        },
      ],
    },
    work: {
      headline: 'What you’ll work on, for each client.',
      intro: 'From the first campaign to the client dashboard.',
    },
    people: {
      eyebrow: 'Who we want',
      headline: 'The kind of person who fits.',
      intro: 'Skills get you shortlisted. These qualities decide whether you enjoy working with us.',
      qualities: [
        {
          icon: 'target',
          title: 'Numbers-minded.',
          body: 'You can say what you spent, what it brought back and what you changed because of it.',
        },
        {
          icon: 'wand',
          title: 'Quick with AI.',
          body: 'You use AI in your daily work and can show how it made you more efficient.',
        },
        {
          icon: 'shield-check',
          title: 'Careful with patient data.',
          body: 'Healthcare is different, and you are willing to learn HIPAA and other healthcare standards properly.',
        },
        {
          icon: 'handshake',
          title: 'Takes ownership.',
          body: 'You do not wait to be told. You find the next useful thing and do it.',
        },
      ],
    },
  },

};
