import type { ImageMetadata } from "astro";

/**
 * Every image in src/assets/images, keyed by its public-style path
 * ("/images/home/hero-background.webp"). Config files keep simple string
 * paths; components pass them to `getImage()` and render with <Image />,
 * so Astro optimises them (AVIF/WebP, right sizes, width/height set).
 *
 * To add an image: drop it in src/assets/images/... and use its path.
 */
const files = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/**/*.{png,jpg,jpeg,webp,avif,svg}",
  { eager: true },
);

const images: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(files).map(([file, mod]) => [file.replace("/src/assets", ""), mod.default]),
);

export function getImage(path: string): ImageMetadata {
  const image = images[path];
  if (!image) {
    throw new Error(`Image not found: "${path}". Put it in src/assets${path}`);
  }
  return image;
}
