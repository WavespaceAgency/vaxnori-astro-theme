import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Content collections. Add a post or job by adding an .md/.mdx file to the folder –
 * the file name is the URL (src/content/blog/my-post.mdx → /blog/my-post).
 * Images are paths relative to the file (../../assets/images/...).
 */

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD");

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Optional split title for the post page: shortTitle (dark) + accent (pixel font). */
      shortTitle: z.string().optional(),
      accent: z.string().optional(),
      excerpt: z.string(),
      /** Must match one of the tabs in src/config/pages/blog.ts. */
      category: z.string(),
      date: isoDate,
      readingTime: z.string(),
      image: image(),
      imageAlt: z.string(),
      author: z.object({ name: z.string(), avatar: image() }),
      /** Shown large at the top of the blog page. */
      featured: z.boolean().optional(),
    }),
});

const careers = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/careers" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    team: z.string(),
    location: z.string(),
    type: z.string(),
    salary: z.string(),
    salaryShort: z.string(),
    equity: z.string(),
    function: z.string(),
    posted: isoDate,
    /** Sort order in the roles table (1 = first). */
    order: z.number(),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/legal" }),
  schema: z.object({
    title: z.string(),
    /** Last word(s) of the title, shown in the pixel font. */
    accent: z.string(),
    description: z.string(),
    updated: isoDate,
  }),
});

export const collections = { blog, careers, legal };
