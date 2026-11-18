// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

/**
 * The public URL of your site. Used for canonical links, Open Graph and the sitemap.
 * Set SITE_URL, or replace the fallback with your domain. On Vercel the production
 * URL is picked up automatically, so the demo needs no setup.
 */
const site =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://example.com");

// https://astro.build/config
export default defineConfig({
  site,
  trailingSlash: "ignore",
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
