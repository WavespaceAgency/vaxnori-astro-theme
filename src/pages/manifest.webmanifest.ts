import type { APIRoute } from "astro";
import { siteConfig } from "@/config/site";

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: siteConfig.name,
      short_name: siteConfig.name,
      description: siteConfig.description,
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#ff4820",
      icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
    }),
    { headers: { "Content-Type": "application/manifest+json" } },
  );
