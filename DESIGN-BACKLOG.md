# Design backlog

Suggestions from the design review of the one-page landing site (rumiq.ai),
kept so they can be picked up later. Nothing here is built unless it is marked
**Done**. Items marked **Needs copy approval** must not ship until the owner has
approved the wording.

Status key: **Done**, **Open** (ready to build), **Needs copy approval**,
**Needs assets** (photos or files from the owner), **Deferred** (agreed to wait).

---

## Done in the quick-wins pass

- **Principles set at body size** with 01 / 02 / 03 markers, so the key promises
  are readable.
- **Services grouped into four sets** with a small icon each: Search and
  discovery, Social and video, Content and brand, Patients and growth. The group
  titles are new wording. See the open item below.
- **Numbered section markers** (01 to 05) in the eyebrows, following section order.
- **Alternating section backgrounds.** The "Who we work with" section uses the
  raised paper tone, which gives the page a rhythm.
- **Mobile menu.** A disclosure button opens the five anchor links below the
  large breakpoint. It closes on Escape and on choosing a link, and returns focus
  to the button.
- **Scroll reveals** on the landing page, using the same motion as the full site.
  Reduced motion turns them off.

## Done since the quick-wins pass

- **Who we work with: business-to-patients flow.** Healthcare business, then
  Rumiq, then patients and families, with a pulse passing along each connector.
  It sits beside the text, in the same two-column layout.
- **How we work: a carousel of three principles.** A curved rail of stations
  (01, 02, 03) shows the reader's place, and the path draws up to the current
  station. Each principle has its own visual: the privacy boundary (patient data
  stays in the practice), the measurement flow (inquiries, calls, bookings, plain
  report), and the time-zone overlap (Pakistan hours and US Eastern time). Arrow
  keys, arrow buttons, dots and stations all navigate. It never advances by
  itself.
- The earlier journey flow was removed because its meaning was unclear.

## Open: needs the owner's wording

- **Needs copy approval. Service group titles.** "Search and discovery", "Social
  and video", "Content and brand" and "Patients and growth" are new wording,
  written for the grouping. Approve them or send replacements.
- **Needs copy approval. Second hero button for clients.** For example "Work with
  us", scrolling to the contact section. The current hero offers only "We're
  hiring", so clients have to scroll to find their way in.
- **Needs copy approval. Hiring process steps.** For example "Apply, short call,
  practical task, offer". This is new process copy and must not be published
  until the owner confirms the steps.
- **Needs copy approval. Carousel and flow labels.** "Stays in the practice",
  "Campaign data", "Plain report", "Overlap, when clients need us" and the
  "Principle 01 / 03" markers are new wording. Each restates the copy; check them.
- **Needs copy approval. Section eyebrow wording.** "Contact" was added by the
  build. Confirm it, or supply a label.

## Open: visual additions (ready to build)

- **Hero journey strip.** A simple first-search to booked-appointment strip drawn
  from the existing funnel component. It makes the subheadline visible and fills
  the empty right half of the desktop hero.
- **Privacy diagram.** Patient data stays inside the practice; ad platforms
  receive campaign data only. It explains the strongest claim on the page. Keep
  it to what the copy says; the wording of the boundary needs the owner's check.
- **Dual time-zone clock.** Islamabad and US Eastern time side by side, to make
  "two time zones" concrete. Needs one small first-party script, with no
  third-party request. Show a static fallback with JavaScript off.
- **Careers job card.** A structured card with chips for Full-time, On-site,
  Islamabad, One-year contract and Starts mid-November 2026, so the key facts can
  be read at a glance.

## Open: brand and polish

- **OG card in the brand typeface.** The social card currently uses the image
  renderer's bundled face, not Manrope. It needs a TTF version of the font, which
  the repository does not include yet.
- **Richer footer.** The footer is sparse. A short column of anchor links would
  help longer scrolling. Low priority for a single page.

## Needs assets

- **Real photography.** Team, co-working space or working scenes would make the
  page feel like a real company. These must be supplied by the owner. They should
  be stored locally, never embedded from another domain, to keep the no-tracking
  rule.
- **Client proof.** Logos or quotes from clients are not possible yet. No client
  names appear anywhere, by design.

## Deferred

- **Short contact form.** Forms are deferred until the webhook decision is made
  (see `DEPLOYMENT-GAPS.md`).
- **Salary on the job card.** Left off, as the owner asked. Revisit only if the
  owner changes that decision.

## Constraints to keep

- No client names, awards, statistics or certifications unless the owner has
  supplied them and approved them in writing.
- No third-party embeds: no video players, maps or externally hosted fonts.
- The wordmark is never redrawn, recoloured or restyled.
- Motion stays calm and respects reduced-motion preferences.
