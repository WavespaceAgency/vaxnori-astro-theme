import { getCollection, type CollectionEntry } from "astro:content";

/**
 * Helpers for blog posts and job posts (content collections in src/content.config.ts).
 * Add a post: create src/content/blog/<slug>.mdx with frontmatter. The file name is the URL.
 */

export type Post = CollectionEntry<"blog">;
export type Job = CollectionEntry<"careers">;

/** All posts, newest first. */
export async function getPosts(): Promise<Post[]> {
  return (await getCollection("blog")).sort((a, b) => b.data.date.localeCompare(a.data.date));
}

/** All jobs, in their `order`. */
export async function getJobs(): Promise<Job[]> {
  return (await getCollection("careers")).sort((a, b) => a.data.order - b.data.order);
}

/** "2026-09-02" → "Sep 2, 2026" */
export function formatDate(iso: string, month: "short" | "long" = "short") {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month, day: "numeric", year: "numeric", timeZone: "UTC" });
}
