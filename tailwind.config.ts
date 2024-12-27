import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // extend: {
    //   colors: {
    //     background: "var(--background)",
    //     foreground: "var(--foreground)",
    //   },
    // },

    extend: {
      // fontFamily: {
      //   figtree: ["Figtree", ...defaultTheme.fontFamily.sans],
      //   poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
      // },
      colors: {
        primary: {
          50: "#fff1f1",
          100: "#ffe1e1",
          200: "#ffc8c8",
          300: "#ffa1a1",
          400: "#fe5b5b",
          500: "#f73c3c",
          600: "#e41e1e",
          700: "#c01515",
          800: "#9f1515",
          900: "#831919",
          950: "#480707",
        },
        transparent: "transparent",
      },
    },
    plugins: [require("@tailwindcss/forms")],
  },
  plugins: [],
} satisfies Config;
