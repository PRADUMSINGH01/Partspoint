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
      boxShadow: {
        subtle:
          "0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)",
        panel:
          "0 4px 12px 0 rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
      },
      borderRadius: {
        md: "0.375rem", // default
        lg: "0.5rem",
        xl: "0.75rem",
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
