import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      scrollBehavior: ["responsive"],
      colors: {
        primary: "black",
        secondary: "#10b981", // Turquoise
        accent: "#0d9488", // Teal
        neutral: "#334155", // Dark slate
        light: "#f8fafc", // Off-white
        border: "#e2e8f0",
      },
      fontFamily: {
        heading: "var(--font-rubik)",
        body: "var(--font-open-sans)",
      },
    },
    variants: {
      extend: {
        scrollBehavior: ["hover", "focus"],
      },
    },
  },
  plugins: [],
} satisfies Config;
