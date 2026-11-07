/**
 * TEMPORARY LANDING PAGE — copy for rumiq.ai's one-page site.
 *
 * Source: the copy supplied by the owner, converted to US English. Every
 * string on the landing page lives here. Components only compose.
 *
 * Wording to keep exactly as supplied: "HIPAA-conscious" (not "HIPAA compliant"),
 * and no client names and no salary anywhere on the page.
 */

export const landing = {
  /** Page-level metadata. The title is also the OG and JSON-LD headline. */
  meta: {
    title: "Digital marketing & tech for US healthcare",
    description:
      "Rumiq helps US healthcare businesses reach more patients and families, with digital marketing and tech solutions that respect patient privacy.",
  },

  nav: [
    { label: "What we do", href: "/#what-we-do" },
    { label: "Who we work with", href: "/#who-we-work-with" },
    { label: "How we work", href: "/#how-we-work" },
    { label: "Careers", href: "/#careers" },
    { label: "Contact", href: "/#contact" },
  ],

  hero: {
    headline:
      "Helping American healthcare providers get found, chosen & trusted.",
    /** The trailing phrase of `headline`, set in Rumiq Teal. */
    headlineHighlight: "found, chosen & trusted.",
    subheadline:
      "Rumiq helps US healthcare businesses reach more patients and families, with digital marketing and tech solutions that respect patient privacy.",
    primaryCta: { label: "We're hiring", href: "#careers" },
  },

  whatWeDo: {
    eyebrow: "What we do",
    headline: "Everything a healthcare business needs to be found online.",
    intro:
      "We run the full digital presence for our clients, from the first search to the booked appointment.",
    groups: [
      {
        title: "Search & discovery",
        services: [
          {
            label: "Local Search & Google Business Profiles",
            body: "Accurate listings, fresh posts and steady reviews, so nearby patients find our clients first.",
          },
          {
            label: "SEO & AI Search",
            body: "Websites and content structured to rank on Google and to be cited by AI assistants like ChatGPT and Gemini.",
          },
          {
            label: "Paid Media",
            body: "Google Ads and Meta Ads campaigns built around real inquiries, not vanity clicks.",
          },
        ],
      },
      {
        title: "Social & video",
        services: [
          {
            label: "Social Media",
            body: "Instagram, Facebook and TikTok content that builds trust in local communities and beyond.",
          },
          {
            label: "Image & Video",
            body: "Image and video generation and editing, motion graphics and 3D, for clients’ ads, posts and websites.",
          },
          {
            label: "YouTube",
            body: "Short and long-form video that explains healthcare options, answers common questions and puts a friendly face to the practice.",
          },
        ],
      },
      {
        title: "Brand & Content",
        services: [
          {
            label: "Brand Guidelines",
            body: "A clear, consistent look and voice, so every website, ad and post feels unmistakably like our client.",
          },
          {
            label: "LinkedIn",
            body: "Regular, thoughtful content that helps healthcare professionals become trusted, recognized voices in their field.",
          },
          {
            label: "Email Marketing & Newsletters",
            body: "Useful, well-timed emails that keep patients informed and bring them back.",
          },
        ],
      },
      {
        title: "Access & growth",
        services: [
          {
            label: "Patient Access & Messaging",
            body: "Making it easy for patients to call, book or message, and making sure every inquiry gets a fast, helpful reply.",
          },
          {
            label: "Analytics & Growth Intelligence",
            body: "Clear tracking and reporting that shows where new patients come from and where to invest next.",
          },
          {
            label: "AI Tools",
            body: "Practical AI that saves our clients time and resources, from workflows to smarter reporting.",
          },
        ],
      },
    ],
  },

  whoWeWorkWith: {
    eyebrow: "Who we work with",
    headline: "Built for American healthcare.",
    paragraphs: [
      "Our clients range from local practices to nationwide services, including physicians, specialists, dental care, pharmacies, laboratories, health spas, home and community care, and medical transport.",
      "What they share is simple: people rely on them, and those people need to find them, understand them and trust them. That is the job we do.",
    ],
  },

  howWeWork: {
    eyebrow: "How we work",
    headline: "What every client can count on.",
    principles: [
      {
        label: "Privacy First. Results Always.",
        body: "Three commitments guide every client we take on. We check compliance first, keep patient information protected, and report every result honestly.",
      },
      {
        label: "Compliance check before we start.",
        body: "Every new client starts with a compliance review of their website, social media and patient access tools. We flag privacy, accessibility and professional-guidance issues, and we fix them before we grow anything.",
      },
      {
        label: "HIPAA-conscious by default.",
        body: "We never pass patient data to ad platforms like Google or Meta. Every campaign is designed around that rule.",
      },
      {
        label: "Measured honestly.",
        body: "We report on inquiries, calls and bookings, and we tell clients plainly what is and isn’t working.",
      },
    ],
  },

  careers: {
    eyebrow: "Careers",
    headline: "Join us early. We're hiring.",
    intro:
      "Rumiq is a new company with real clients and real work from day one. We’re building a small, sharp team in Islamabad, and the people who join now will shape how we grow.",
    /* Both open roles, from the job posting documents. Salary is not published
       here; the owner's rule is that it goes in the job ad or to shortlisted
       candidates. Applications close 12 November 2026. */
    applicationsClose: "2026-11-12",
    applicationsNote:
      "Applications close 12 November 2026, close of business (Pakistan time). Only shortlisted candidates will be contacted.",
    facts: [
      { label: "Type", value: "Full-time, in person" },
      {
        label: "Location",
        value: "Shared living and working space, Islamabad",
      },
      {
        label: "Contract",
        value:
          "1 year from mid-November 2026, with regular performance reviews",
      },
      {
        label: "Hours",
        value: "Pakistan business hours, with US hours when needed",
      },
      {
        label: "Accommodation",
        value:
          "Free, in the shared living and working space, for the full contract",
      },
    ],
    roles: [
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
      },
      {
        id: "multimedia-designer",
        tabLabel: "Multimedia Designer",
        title: "Multimedia Designer",
        summary:
          "Create the videos, graphics and designs that bring our clients’ brands to life across social media, ads, Google Business Profiles and websites.",
        youllWorkOn: [
          "Edit Instagram Reels, TikToks and video ads, using AI tools for editing, captions and resizing",
          "Design posts, carousels, stories and ad creatives for Facebook, Instagram and TikTok",
          "Design website pages and app screens, then hand clean designs to our engineers",
          "Create simple animations and explainer videos, with AI video and avatar tools",
          "Build a brand kit and template library",
        ],
        youllBring: [
          "2–4 years as a graphic, video or multimedia designer, ideally at an agency or in-house",
          "A portfolio with a strong visual eye across video, social graphics and some web or app design",
          "Strong video editing skills (Premiere Pro, CapCut or DaVinci Resolve), and design skills in Figma, Photoshop, Illustrator or Canva",
          "A fast, skilled AI user, able to show how AI has made their workflow more efficient",
          "Good written and spoken English, for American audiences",
          "Committed to patient privacy, and willing to learn HIPAA & other healthcare rules and build them into how you work",
        ],
        applySubject: "Multimedia Designer – Islamabad",
      },
    ],
  },

  contact: {
    eyebrow: "Contact",
    headline: "Run a healthcare business in the US?",
    body: "We’re taking on a small number of new clients. Tell us about your business and we’ll get back to you within two working days.",
    cta: { label: "Get in touch" },
  },

  footer: {
    entity: "Rumiq Technologies (SMC-Private) Limited",
    copyright: "Rumiq Technologies © 2026",
    links: [
      { label: "Privacy Notice", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
    ],
  },

  /** General contact address: the Contact section and the legal pages. */
  email: "info@rumiq.ai",
  /** Applications for open roles. Both addresses are aliases that reach the same inbox. */
  careersEmail: "careers@rumiq.ai",
} as const;
