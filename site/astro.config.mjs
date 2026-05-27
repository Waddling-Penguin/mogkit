import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://mogkit.dev",
  trailingSlash: "never",
  integrations: [
    mdx(),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  build: {
    format: "directory",
  },
  vite: {
    server: {
      watch: { ignored: ["**/dist/**", "**/.netlify/**", "**/pagefind/**"] },
    },
  },
});
