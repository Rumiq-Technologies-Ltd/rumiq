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
    niceToHave: 'Nice to have:',
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
        body: 'It comes with regular performance reviews along the way.',
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
  },
} as const;

export type RoleDetail = {
  /** One-line pitch under the title. */
  pitch: string;
  opportunity: { eyebrow: string; headline: string; intro: string; points: Point[] };
  work: { headline: string; intro: string };
  people: { eyebrow: string; headline: string; intro: string; qualities: Point[] };
  /** Roles with a longer wish list show it under "You'll bring:". */
  niceToHave?: string[];
  /** How the role's work is made, step by step, then the standards it is held to. */
  pipeline?: {
    eyebrow: string;
    headline: string;
    intro: string;
    steps: { title: string; body: string }[];
    note: string;
    standardsTitle: string;
    standards: { title: string; body: string }[];
  };
  apply: {
    headline: string;
    /** What the email should contain. */
    include?: string[];
    steps: { title: string; body: string }[];
  };
};

export const roleDetails: Record<string, RoleDetail> = {
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

  'ai-video-producer': {
    pitch:
      'You will take ideas from concept to finished cut, with traditional production craft and AI video tools, and own our video and motion content for social media, ads, LinkedIn, YouTube and presentations.',
    opportunity: {
      eyebrow: 'The opportunity',
      headline: 'Own video from idea to final cut.',
      intro:
        'You will not just edit someone else’s footage. You take the idea all the way to the finished cut, and you choose the right tool for each story.',
      points: [
        {
          icon: 'layers',
          title: 'Idea to final cut.',
          body: 'Concept, storyboard, AI generation, finishing and edit, all in your hands.',
        },
        {
          icon: 'wand',
          title: 'The latest AI tools.',
          body: 'Work hands-on every day with the newest AI image, video and avatar tools.',
        },
        {
          icon: 'handshake',
          title: 'Direct access.',
          body: 'You work directly with our CEO and a small team, with real ownership of everything you make.',
        },
        {
          icon: 'trending-up',
          title: 'Systems building.',
          body: 'Early video producers set the production standard of Rumiq and our clients. What you build now may become how future clients’ videos are made.',
        },
      ],
    },
    work: {
      headline: 'What you’ll work on, for each client.',
      intro: 'Video and motion. Our developers handle UI and web design.',
    },
    pipeline: {
      eyebrow: 'How we make videos',
      headline: 'The pipeline you will run.',
      intro: 'A hybrid of production craft and AI tools, from first idea to final delivery.',
      steps: [
        {
          title: 'Concept and storyboard.',
          body: 'Develop the idea with the team, draft the script (AI tools help), and storyboard each shot, including which aspect ratios you need.',
        },
        {
          title: 'Product reference images.',
          body: 'Build clean, accurate reference images of the product or location in Photoshop, and basic 3D such as Cinema 4D or Blender where useful. These keep the product consistent when AI generates around it.',
        },
        {
          title: 'AI still images.',
          body: 'Generate on-brand stills with AI image tools such as Nano Banana (Google Gemini) or ChatGPT image generation, using the reference images as input.',
        },
        {
          title: 'Image-to-video.',
          body: 'Animate the stills in AI video tools such as Kling, Runway, Veo or Higgsfield.',
        },
        {
          title: 'Repair and finishing.',
          body: 'In After Effects, fix AI artifacts and add text, titles, logos and motion graphics.',
        },
        {
          title: 'Edit and assemble.',
          body: 'In Premiere Pro (or DaVinci Resolve), combine AI shots with live and stock footage, add voiceover (human or AI), music and sound design, then cut versions for each platform and for presentations.',
        },
        {
          title: 'Quality control.',
          body: 'Check every piece for accuracy and brand consistency before it goes out, while juggling several projects against deadlines.',
        },
      ],
      note: 'Not everything we make is fully AI-generated. Many videos feature real people, filmed footage and human voiceovers, which you edit and enhance with AI tools. We also make presenter-style videos with AI avatars in HeyGen. The right tool depends on the story, and part of your job is choosing it.',
      standardsTitle: 'Our production standards',
      standards: [
        {
          title: 'Product bible first.',
          body: 'Create 5–10 clean, consistently lit reference images of each product or location. Every AI generation starts from these.',
        },
        {
          title: 'Stills first, then animate.',
          body: 'Image-to-video gives far more control than text-to-video and wastes fewer credits.',
        },
        {
          title: 'Short shots.',
          body: 'AI quality drops in long clips, so keep shots to 5–10 seconds and stitch them together in the edit.',
        },
        {
          title: 'Prompts in a fixed order.',
          body: 'Subject, action, camera move, lighting, style, mood. Generate 3–4 variants of each shot and keep the best.',
        },
        {
          title: 'No AI-rendered logos or on-screen text.',
          body: 'AI garbles them. All text and logos are added in After Effects.',
        },
        {
          title: 'Plan for every format.',
          body: 'Deliver 9:16, 1:1 and 16:9 versions, and burn in captions, since most social video is watched on mute.',
        },
        {
          title: 'One look, one voice.',
          body: 'Use one color grade (LUT) and one voice across a series, so it feels like a single brand.',
        },
      ],
    },
    people: {
      eyebrow: 'Who we want',
      headline: 'The kind of person who fits.',
      intro: 'A strong showreel gets you shortlisted. These qualities decide whether you enjoy working with us.',
      qualities: [
        {
          icon: 'eye',
          title: 'Detail-obsessed.',
          body: 'You notice when a product looks slightly different from one shot to the next.',
        },
        {
          icon: 'sparkles',
          title: 'A sharp creative eye.',
          body: 'You have a strong sense of visual aesthetics, composition and pacing.',
        },
        {
          icon: 'wand',
          title: 'Curious about AI.',
          body: 'You enjoy trying new AI tools, and you learn them quickly.',
        },
        {
          icon: 'target',
          title: 'Takes ownership.',
          body: 'You are hard-working and reliable, and you see every piece through to delivery.',
        },
      ],
    },
    niceToHave: [
      'Basic 3D (Cinema 4D or Blender) for product references',
      'Product photography and lighting, or camera, gimbal and green-screen experience',
      'Motion tracking and rotoscoping, for example in Mocha',
      'Sound design and AI voiceover tools, for example ElevenLabs',
      'Experience creating content for healthcare, wellness or other regulated industries, and an understanding of patient privacy',
    ],
    apply: {
      headline: 'Send us your CV and showreel.',
      include: [
        'Your CV',
        'A link to your showreel or video portfolio (YouTube, Vimeo, Behance, Google Drive or Instagram)',
        'For one video you made with AI tools: a short note on the steps and tools you used',
        'Your earliest start date',
      ],
      steps: [
        { title: 'Email us.', body: 'Send everything listed, with the role in the subject line.' },
        {
          title: 'We review.',
          body: 'We read applications as they arrive. Applications without video work will not be considered.',
        },
        { title: 'Practical task.', body: 'Shortlisted candidates will be asked to complete a short practical task.' },
      ],
    },
  },
};
