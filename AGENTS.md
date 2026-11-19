# AGENTS.md – notes for AI coding agents

Vaxnori AI is a static Astro theme (marketing site for an AI/SaaS product). Read this before changing code.

## Stack

- Astro 7, static output (no adapter, no server code, no environment variables required)
- Tailwind CSS 4 via `@tailwindcss/vite`; design tokens in `src/styles/global.css`
- TypeScript strict; MDX via `@astrojs/mdx`; sitemap and RSS
- Animations: `motion` (plain JS API) inside Astro `<script>` tags. **No React or other UI framework** – keep it that way.

## Commands

```bash
npm run dev       # dev server on http://localhost:4321 (use `astro dev --background` for a background server)
npm run check     # astro check – must report 0 errors
npm run build     # static build into dist/ – must finish without warnings
npm run preview   # serve dist/
```

Run `npm run check` and `npm run build` after every change.

## Where things live

| What | Where |
| --- | --- |
| Site name, nav, footer, socials, CTA | `src/config/site.ts` |
| All page text and data | `src/config/pages/*.ts` |
| Colours, fonts, type scale, radii | `src/styles/global.css` |
| Blog posts / jobs / legal pages | `src/content/{blog,careers,legal}/*.mdx` (schemas in `src/content.config.ts`) |
| Pages and routes | `src/pages/` |
| `<head>`, SEO, JSON-LD, header and footer | `src/layouts/BaseLayout.astro` |
| Sections / UI / layout components | `src/components/{sections,ui,layout}/` |
| MDX element styles and custom tags | `src/components/mdx/` |
| Scroll animations (data attributes) | `src/scripts/motion.ts` |
| Mockup loop helpers | `src/scripts/loop.ts` |
| Images (optimised) | `src/assets/images/`, looked up by path with `getImage()` from `src/lib/images.ts` |
| Build and design decisions | `docs/DECISIONS.md` |

## Rules

1. **Config-driven:** never hard-code visible text in components. Put it in `src/config/` or a content file and pass it as props.
2. **Use the tokens:** use the Tailwind classes generated from the tokens (`bg-brand`, `text-ink`, `border-line`, `font-heading-flex`,
   `text-h2`, `rounded-card` …) instead of new hex values.
3. **Images:** put new images in `src/assets/images/` and render them with `<Image />` from `astro:assets` (set `widths` and `sizes`).
4. **Animations:** prefer the data attributes (`data-reveal`, `data-stagger` + `data-stagger-item`, `data-count`).
   New scripts must respect reduced motion (`reduceMotion()` from `src/scripts/motion.ts`) and must not hide content without JavaScript.
5. **Accessibility:** one `h1` per page, headings in order, real `<a>` and `<button>`, labels on inputs, `aria-*` on toggles,
   visible focus. Keep the skip link.
6. **Whitespace in templates:** inside `{ … }` expressions Astro follows JSX whitespace rules – write `{" "}` between
   text and a following tag (for example `{title}{" "}<span>…</span>`).
7. **Placeholder data only:** emails and URLs use `example.com`; social links point to the platform home page.
8. Keep the theme dependency-light and every dependency public and MIT-compatible.

## Astro docs

https://docs.astro.build – routing, components, content collections, images, styling.
