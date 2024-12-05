import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./slices/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var--font-dm-sans"],
        mono: ["var(--font-dm-mono)"],
        serifdisplay: ["var(--font-dm-serif-display)"],
        inter: ["var(--font-inter)"],
        ibmplexsans: ["var(--font-ibmplexsans)"],
        ibmplexsans400: ["var(--font-ibmplexsans_400)"],
      },
    },
  },
  plugins: [],
} satisfies Config;