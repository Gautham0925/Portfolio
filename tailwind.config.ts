import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0f0f23",
        accent: {
          DEFAULT: "#8b5cf6",
          hover: "#7c3aed",
        },
        secondary: "#1e1b4b",
        tertiary: "#312e81",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
      },
      fontFamily: {
        primary: "var(--font-jetbrainsMono)",
      },
      container: {
        center: true,
        padding: "15px",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "960px",
          xl: "1140px",
          "2xl": "1320px",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [animate],
};

export default config;
