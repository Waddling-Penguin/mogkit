import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://mogkit.com",
  trailingSlash: "never",
  integrations: [
    mdx(),
    tailwind({ applyBaseStyles: false }),
    react(),
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
