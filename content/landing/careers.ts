/**
 * TEMPORARY LANDING PAGE — copy for the role pages (/careers/[slug]).
 *
 * The basics of every role (title, summary, the two lists, the subject line)
 * stay in content/landing/index.ts. This file holds what only the role page
 * says: why join early, the opportunity, the people we want, the package and
 * how to apply. Written in the landing page's voice: plain, warm, concrete,
 * short sentences, no hype. Nothing here states a salary, a client name or a
 * benefit the job postings do not support.
 */

export type IconName =
  | 'rocket'
  | 'users'
  | 'trending-up'
  | 'sparkles'
  | 'shield-check'
  | 'house'
  | 'calendar-check'
  | 'globe'
  | 'target'
  | 'zap'
  | 'handshake'
  | 'eye'
  | 'chart'
  | 'wand'
  | 'layers';

export type Point = { title: string; body: string; icon: IconName };

/** Said on every role page, in this order. */
export const careerShared = {
  labels: {
    back: 'All roles',
    heroEyebrow: 'Careers · Islamabad',
    workEyebrow: 'The job',
    bring: 'You’ll bring:',
    alsoHiring: 'Also hiring',
    apply: 'Apply by email',
  },

  startup: {
    eyebrow: 'Where we are',
    headline: 'Early enough to shape it.',
    intro:
      'Rumiq is new, and so is every process we have. Our clients are real, the work starts on day one, and the team is small enough that everyone’s work is seen.',
    points: [
      {
        icon: 'rocket',
        title: 'Real clients from day one.',
        body: 'You work on live campaigns for real healthcare businesses from your first week.',
      },
      {
        icon: 'users',
        title: 'A small, sharp team.',
        body: 'Everyone is close to the work, so good ideas get used quickly.',
      },
      {
        icon: 'trending-up',
        title: 'Build together.',
        body: 'The people who join now will shape how we work and how we grow.',
      },
    ] satisfies Point[],
    honesty:
      'We are still setting up how we work, so not everything has a fixed process yet. If you like helping build things from the start, you will enjoy it here.',
  },

  perks: {
    eyebrow: 'What you get',
    headline: 'What comes with the role.',
    intro: 'No surprises. This is the package as it appears in the job posting.',
    items: [
      {
        icon: 'house',
        title: 'Free accommodation.',
        body: 'You live in our shared living and working space in Islamabad, at no cost, for the full contract.',
      },
      {
        icon: 'calendar-check',
        title: 'A one-year contract.',
        body: 'It starts in mid-November 2026, with regular performance reviews.',
      },
      {
        icon: 'users',
        title: 'Work in person.',
        body: 'You work next to the team, so questions get answered and feedback is quick.',
      },
      {
        icon: 'globe',
        title: 'US healthcare clients.',
        body: 'Pakistan business hours, with US hours when needed.',
      },
      {
        icon: 'sparkles',
        title: 'AI in your workflow.',
        body: 'We expect you to use AI to work faster and better, and we want to see how you do it.',
      },
      {
        icon: 'shield-check',
        title: 'Privacy skills that last.',
        body: 'You learn HIPAA and other healthcare standards, and build them into how you work.',
      },
    ] satisfies Point[],
  },

  apply: {
    eyebrow: 'How to apply',
    headline: 'Send us your CV and portfolio.',
    steps: [
      { title: 'Email us.', body: 'Send your CV and portfolio, with the role in the subject line.' },
      { title: 'We review.', body: 'Only shortlisted candidates will be contacted.' },
      { title: 'You start.', body: 'The contract begins in mid-November 2026.' },
    ],
  },
} as const;

export type RoleDetail = {
  /** One-line pitch under the title. */
  pitch: string;
  opportunity: { eyebrow: string; headline: string; intro: string; points: Point[] };
  work: { headline: string; intro: string };
  people: { eyebrow: string; headline: string; intro: string; qualities: Point[] };
};

export const roleDetails: Record<string, RoleDetail> = {
  'digital-marketing-specialist': {
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
          body: 'The way you run marketing now may become the way Rumiq runs marketing.',
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

  'multimedia-designer': {
    pitch:
      'You will create the videos, graphics and designs for our healthcare clients, from a short Reel to a full website page, using AI tools to move fast.',
    opportunity: {
      eyebrow: 'The opportunity',
      headline: 'Tell visual stories that people remember.',
      intro:
        'You will not make one kind of asset on repeat. You move between video, images, socials, ads & web design, for real clients.',
      points: [
        {
          icon: 'layers',
          title: 'Range, not repetition.',
          body: 'Short-form video, social graphics, ad creatives, website pages and app screens.',
        },
        {
          icon: 'wand',
          title: 'AI as a creative tool.',
          body: 'Edit, caption, resize and animate with AI video and avatar tools.',
        },
        {
          icon: 'eye',
          title: 'Your eye on the brand.',
          body: 'You build the brand kit and template library for each client.',
        },
        {
          icon: 'trending-up',
          title: 'Systems building.',
          body: 'Early designers set the look of the company. What you make now may become how Rumiq looks.',
        },
      ],
    },
    work: {
      headline: 'What you’ll work on, for each client.',
      intro: 'A mix of video, social and web design.',
    },
    people: {
      eyebrow: 'Who we want',
      headline: 'The kind of person who fits.',
      intro: 'A strong portfolio gets you shortlisted. These qualities decide whether you enjoy working with us.',
      qualities: [
        {
          icon: 'eye',
          title: 'A good visual eye.',
          body: 'You know what good looks like, and your portfolio shows it.',
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
          title: 'Easy to hand work to.',
          body: 'You hand over clean files and clear designs, so our engineers can build on them.',
        },
      ],
    },
  },
};
