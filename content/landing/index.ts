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
        title: "Brand & Content",
        services: [
          {
            label: "Brand Guidelines",
            body: "A clear, consistent look and voice, so every website, app, ad, post or video feels unmistakably like our client.",
          },
          {
            label: "LinkedIn",
            body: "Regular, thoughtful content that helps healthcare professionals become trusted, recognized voices in their field.",
          },
          {
            label: "Email Marketing & Newsletters",
            body: "Useful, well-timed emails and newsletters that keep patients informed and bring them back.",
          },
        ],
      },
      {
        title: "Web & App build",
        services: [
          {
            label: "Copywriting",
            body: "Clear, human writing for websites, apps, ads and emails that explains your products and services in plain language and sounds like you.",
          },
          {
            label: "Website Development",
            body: "Fast, accessible, mobile-first websites that make it easy for patients to find a practice, trust it and book.",
          },
          {
            label: "Mobile Apps",
            body: "User-friendly apps for iPhone and Android, from booking and portals to internal tools, built with privacy in mind.",
          },
        ],
      },
      {
        title: "Social & video",
        services: [
          {
            label: "Image & Video",
            body: "Image and video generation and editing, motion graphics and 3D, for clients’ ads, posts, websites and apps.",
          },
          {
            label: "Social Media",
            body: "Instagram, Facebook and TikTok content that builds trust in local communities and beyond.",
          },
          {
            label: "YouTube",
            body: "Short and long-form video that explains healthcare products and services, answers common questions and puts a friendly face to your business.",
          },
        ],
      },
      {
        title: "Access & growth",
        services: [
          {
            label: "AI Tools",
            body: "Practical AI that saves our clients time and resources, from workflows to smarter reporting.",
          },
          {
            label: "Patient Access & Messaging",
            body: "Making it easy for patients to call, message or book, and making sure every inquiry gets a fast, helpful reply.",
          },
          {
            label: "Analytics & Growth Intelligence",
            body: "Clear tracking and reporting that shows where new patients come from and where to invest next.",
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
    /* The open role, from its job posting document. Closed roles live in
       content/landing/careers-archive.ts. Salary is not published
       here; the owner's rule is that it goes in the job ad or to shortlisted
       candidates. Each role has its own closing date, start and application note. */
    facts: [
      { label: "Type", value: "Full-time, in person" },
      {
        label: "Location",
        value: "Shared living and working space, Islamabad",
      },
      {
        label: "Contract",
        value: "1 year, with regular performance reviews",
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
        id: "ai-video-producer",
        tabLabel: "AI Video Producer & Motion Designer",
        title: "AI Video Producer & Motion Designer",
        summary:
          "Take ideas from concept to finished cut with AI video tools and traditional craft, for social media, ads, LinkedIn, YouTube and presentations.",
        youllWorkOn: [
          "Produce reels, ads and videos for Instagram, Facebook, TikTok, LinkedIn and YouTube, plus longer videos for YouTube and presentations",
          "Create AI avatar and presenter videos in HeyGen, from script to finished edit",
          "Edit live-action footage of real people, such as interviews, testimonials and talking-head videos, using AI tools to clean up, enhance and speed up the edit",
          "Record, edit and mix human voiceovers, or produce AI voiceovers when they suit the piece better",
          "Create motion graphics, kinetic typography, logo animations and explainer videos",
          "Run our full AI video pipeline, and keep improving it as new tools appear",
          "Add music and sound design, and color-grade every video for a consistent brand look",
          "Create supporting graphics with AI tools when a campaign needs them",
          "Keep an organized library of reference images, prompts, templates and brand assets",
          "Manage several projects at once and deliver on time",
        ],
        youllBring: [
          "2–3 years in video editing and motion graphics, with a showreel that proves it",
          "Strong skills in Adobe Premiere Pro (or DaVinci Resolve) and After Effects",
          "Hands-on experience with at least one AI image tool and one AI video tool, such as Nano Banana, ChatGPT images, Midjourney, Kling, Runway, Veo or Higgsfield",
          "Experience with AI avatar tools such as HeyGen, or the ability to learn them quickly",
          "Experience editing live-action footage and working with human voiceovers",
          "A good grasp of Photoshop for preparing reference images and fixing details",
          "Storytelling ability: you know how to structure a 15–60 second video that holds attention",
          "Good written and spoken English",
        ],
        applySubject: "AI Video Producer – [Your Name]",
        start: "As soon as possible",
        applicationsClose: "2026-11-20",
        applicationsNote:
          "Applications close 20 November 2026, close of business (Pakistan time). We review applications as they arrive, so apply early.",
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
