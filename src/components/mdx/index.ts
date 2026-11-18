/**
 * Styles for all MDX content (blog posts, job posts, legal pages).
 * Write normal Markdown in src/content/*.mdx – these components style it.
 * Custom tags you can use inside MDX: <Figure />, <Callout />, <Timeline />.
 * Usage: <Content components={mdxComponents} />
 */
import A from "./A.astro";
import Blockquote from "./Blockquote.astro";
import Callout from "./Callout.astro";
import Figure from "./Figure.astro";
import H2 from "./H2.astro";
import H3 from "./H3.astro";
import Hr from "./Hr.astro";
import Ol from "./Ol.astro";
import P from "./P.astro";
import Strong from "./Strong.astro";
import Timeline from "./Timeline.astro";
import Ul from "./Ul.astro";

export const mdxComponents = {
  h2: H2,
  h3: H3,
  p: P,
  ul: Ul,
  ol: Ol,
  a: A,
  blockquote: Blockquote,
  strong: Strong,
  hr: Hr,
  Figure,
  Callout,
  Timeline,
};
