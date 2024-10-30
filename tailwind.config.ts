import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        glow: "glow 20s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": { opacity: "0" },
          "2%": { opacity: "0.3" },
          "5%": { opacity: "0" },
          "7%": { opacity: "0.3" },
          "10%": { opacity: "0.25" },
          "15%": { opacity: "0" },
          "20%": { opacity: "0.45" },
          "60%": { opacity: "0.5" },
          "95%": { opacity: "0" },
        },
      },
      colors: {
        primary: "#989273",
        secondary: "#325964",
        background: "#2d2d2d",
        success: "#38d662",

        dark: "#1E1E1E",
      },
      fontFamily: {
        primary: ["Titillium Web", "sans-serif"],
        secondary: ["Quicksand", "sans-serif"],
        slogan: ["Caveat", "sans-serif"],
      },
      transitionDuration: {
        DEFAULT: "500ms",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), require("daisyui")],
};

export default config;
