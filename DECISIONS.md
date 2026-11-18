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
