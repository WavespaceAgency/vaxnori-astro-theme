# Design and build decisions (Astro theme)

This theme is a port of the Vaxnori AI Next.js template
(github.com/WavespaceAgency/vaxnori-nextjs-template), which was built pixel-perfect from the Figma file.
All Figma decisions from that build still apply (missing frames, typo fixes, legal-safe content).
This file lists only what is new or different in the Astro version. It moves into the README at the end.

## Phase 0 – Rights (Astro rules)
- Design owned by Wavespace, not sold; images AI-made or own; fonts SIL OFL → free MIT release OK.
- **Email `hello@vaxnori.co` → `hello@example.com`** (Astro rejects real-looking contact data).
- Social links stay root domains only (linkedin.com, x.com, youtube.com). No Houston mascot.
- Footer credit "Designed & developed by Wavespace" (wavespace.agency) kept – remove it in `src/config/site.ts` if the reviewers object.

## Phase 2 – Setup
- **Astro 7.4.12** (latest stable), minimal starter, TypeScript strict, static output (no adapter, no env vars needed).
- Integrations: Tailwind CSS 4 (Vite plugin), `@astrojs/mdx`, `@astrojs/sitemap`. Prefetch on hover for all links.
- **Animations:** `motion` (MIT) plain-JS API (`animate`, `inView`) inside Astro `<script>` tags + CSS. No React (owner's choice).
- **Fonts:** Fontsource variable packages, self-hosted, with the axes Figma needs:
  Inter `opsz`, Google Sans Flex `opsz`, Geist Pixel `ELSH` (the "Line" style = 80).
- **Images** moved from `public/images` to `src/assets/images` so Astro optimises them (AVIF/WebP, sizes, no CLS).
  Config files keep simple paths (`/images/home/…`); `src/lib/images.ts` turns them into optimised images.
  Brand marks and SVG patterns stay in `public/` (used as plain URLs).
- **Content:** blog, careers and legal are content collections (`src/content.config.ts`). The Next.js
  `export const meta` blocks became YAML frontmatter; blog images use Astro's `image()` (relative paths).
- **Site URL:** `site` in `astro.config.mjs` = `SITE_URL` env, else the Vercel production URL, else `https://example.com`.
- **Share image:** a static `public/og.png` (1200×630) replaces the Next.js generated images for now.
- **Line icons** are plain SVG strings in `src/components/icons/line-icons.ts` (config files pick them by name).
- Node `>=22.23.4` (Astro 7 requirement), `.nvmrc` = 22.

## Phase 3 – Shared parts + Home page
- **Method:** every Next.js component was ported 1:1 (same Tailwind classes, same config data) and checked
  against the live Next.js demo (vaxnori-ai.vercel.app), which was already matched to Figma section by section.
  Result: all 10 Home sections + header + footer have **identical heights** at 1440, 402 and 320px;
  pixel difference 0.00–0.47% per section (font anti-aliasing only). Full page: 0.07% (1440), 0.12% (402), 0.14% (320).
- **Animations without React:** one shared script (`src/scripts/motion.ts`) reads data attributes:
  `data-reveal`, `data-stagger` / `data-stagger-item`, `data-count`, `data-fit` – same values as the Framer site.
  Loop helpers for the mockups live in `src/scripts/loop.ts` (`loop`, `rollNumber`, `swapText`, `appear`, `typeText`).
  Total JS on Home: 89 KB raw / ~32 KB gzip (Motion engine 25 KB gzip) – Next.js shipped React + Motion.
- **Mockups render their final frame in the HTML** (How-it-works cards, Launch/Grow/Run). Without JavaScript or with
  reduced motion they look complete; with motion the script resets them and plays the loop while on screen.
  The hero preview starts at step 1 (as in Next.js) and shows the "Live" step for reduced motion.
- **Scroll-reveal start state** is CSS (`html.js [data-reveal]`), so nothing is hidden without JavaScript.
- **ScaleToFit** sets its scale with a tiny inline script before first paint (no full-size flash on phones).
- **Footer email** `hello@example.com` is longer than the Figma email: it may wrap after the "@" on small phones
  (`<wbr>`), never mid-word.
- **Newsletter input stays 14px** on phones (Figma). Note: iOS Safari zooms in on inputs under 16px when focused.
  Change `text-sm` to `text-base` in `NewsletterForm.astro` if you prefer no zoom over the exact Figma size.
- **Whitespace:** Astro drops a plain space between `{expression}` and a tag inside JSX-style expressions –
  headings use explicit `{" "}` (fixed "A smarter way to build a company").
- **Lighthouse mobile (local production build):** Performance 99–100, Accessibility 97, Best Practices 100, SEO 100.
  TBT 10–20 ms, CLS 0.027 (font swap in the hero; preloading fonts made LCP slower, so it was not kept).
  The 97 is the accepted Figma choices: white on Primary `#ff4820` (3.4:1) and the grey placeholder logos.

## Phase 4 – About, How it works, Pricing
- Ported 1:1 from the Next.js build (same Figma decisions apply – see the Next.js DECISIONS).
  Check against the live Next.js demo (production build): identical page heights at 1440 and 402;
  pixel difference About 0.10% / 0.02%, How it works 0.10% / 0.36%, Pricing 0.02% / 0.06%.
  No sideways scroll at 320, 768, 1024, 1920. No console errors.
- **New shared parts:** `PageHero` (slot for extra content), `Principles`, `StorySection`, `TeamSection`,
  `VideoBlock`, `StepRows`, `PricingPlans`, `ComparisonTable`, `PromiseBand`.
- **Video dialog** uses the native `<dialog>` (focus stays inside, Esc closes, backdrop click closes).
  The video file / YouTube / Vimeo URL loads only when the dialog opens (no third-party requests before).
- **Billing switch** is a radiogroup (click or arrow keys); the orange pill slides and prices roll like the Next.js version.

## Phase 5 – Blog and Careers
- **Content collections** replace the Next.js MDX loader: `getPosts()` / `getJobs()` in `src/lib/content.ts`.
  The file name is the URL. 8 posts + 6 jobs are prerendered (20 pages in total so far).
- **MDX styles** live in `src/components/mdx/` (one small component per element) and are passed with
  `<Content components={mdxComponents} />`. Custom tags in MDX: `<Figure>`, `<Callout>`, `<Timeline>`.
- **Heading ids** come from Astro (github-slugger), e.g. `#day-one-name-and-paperwork`. The "On this page" list
  uses Astro's `headings` from `render()`, so ids always match.
- **Blog list:** every card is in the HTML (SEO, works without JS); the script filters by category and pages
  6 at a time ("Load older posts"). Same animations as the Next.js version.
- **Share image per post:** the post image cropped to 1200×630 JPG at build time (replaces the Next.js
  generated OG image with the title text).
- Pixel check vs the live Next.js demo (production build), identical heights (±1px from image rounding):
  Blog 0.05% / 0.18%, posts 0.04–1.33% / 0.17–0.38%, Careers 0.12% / 0.48%, job pages 0.65% / 0.90%
  (the job-page difference is photo re-encoding only).
- **Bug fixed (also present in the Next.js demo):** the active marker of the Careers "How we work" tabs had 0px
  height on desktop (`lg:bottom-auto` cancelled the full-height line), so it was invisible. Now a 1px black line
  marks the active tab, as intended. → Apply the same one-class fix to the Next.js repo
  (`src/components/careers/values-scroller.tsx`: remove `lg:bottom-auto`).
