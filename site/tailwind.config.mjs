/** @type {import('tailwindcss').Config} */
// Voidchrome design system — tokens are declared as CSS variables in
// src/styles/global.css. Tailwind utility classes resolve through them so
// the entire palette can be retuned in one place.
export default {
  content: ["./src/**/*.{astro,html,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Voidchrome — neutral chromatics. Banned: pure #000 + pure #fff.
        void: "rgb(var(--void) / <alpha-value>)",
        obsidian: "rgb(var(--obsidian) / <alpha-value>)",
        graphite: "rgb(var(--graphite) / <alpha-value>)",
        ash: "rgb(var(--ash) / <alpha-value>)",
        chrome: "rgb(var(--chrome) / <alpha-value>)",
        halo: "rgb(var(--halo) / <alpha-value>)",
        mercury: "rgb(var(--mercury) / <alpha-value>)",
        // mogkit's existing green — kept as a tiny functional signal only
        // (tags, active state pills). Not decorative.
        accent: {
          400: "rgb(var(--accent-400) / <alpha-value>)",
          500: "rgb(var(--accent-500) / <alpha-value>)",
          600: "rgb(var(--accent-600) / <alpha-value>)",
          700: "rgb(var(--accent-700) / <alpha-value>)",
        },
      },
      fontFamily: {
        // Display: tight-tracked grotesk, low weight, large sizes
        display: [
          "Inter Tight",
          "InterVariable",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        // Body: standard Inter
        sans: [
          "Inter",
          "InterVariable",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        // Mono: JetBrains Mono — the native mogkit voice
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      transitionTimingFunction: {
        // Voidchrome — slow and weighty. Nothing bounces.
        voidchrome: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        450: "450ms",
        600: "600ms",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};
