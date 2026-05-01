import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0A1F44",
        gold: "#C9A961",
        ivory: "#FAF8F3",
        charcoal: "#1A1A1A",
        "navy-light": "#112952",
        "gold-light": "#D4B97A",
        "ivory-dark": "#F0EDE4",
        muted: "#6B7280",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
