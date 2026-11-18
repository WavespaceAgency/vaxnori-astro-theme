import { siteConfig } from "@/config/site";

export const defaultTitle = `${siteConfig.name} – From idea to launch, handled for you`;

/** Default share image (public/og.png, 1200×630). */
export const defaultOgImage = { src: "/og.png", width: 1200, height: 630 };

/** "Pricing" → "Pricing | Vaxnori AI". No title → the default site title. */
export function pageTitle(title?: string) {
  return title ? `${title} | ${siteConfig.name}` : defaultTitle;
}

/** Absolute URL for a path, using the `site` from astro.config.mjs. */
export function absoluteUrl(path: string) {
  return new URL(path, `${siteConfig.url}/`).toString();
}
