import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        body:    ["var(--font-body)",    "'Outfit'",            "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)",    "'Geist Mono'",        "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
