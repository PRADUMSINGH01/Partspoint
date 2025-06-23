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

    boxShadow: {
      // Light mode "outer" raised
      "neu-light": "8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff",
      // Dark mode "outer" raised
      "neu-dark": "8px 8px 16px #1a1a1a, -8px -8px 16px #2c2c2c",
      // Light mode "inner" inset
      "neu-light-inner":
        "inset 4px 4px 8px #c1c9d6, inset -4px -4px 8px #ffffff",
      // Dark mode "inner" inset
      "neu-dark-inner":
        "inset 4px 4px 8px #131313, inset -4px -4px 8px #2f2f2f",
    },
  },
  plugins: [],
} satisfies Config;
