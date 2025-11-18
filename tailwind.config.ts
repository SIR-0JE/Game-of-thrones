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
        // Primary Colors
        primary: {
          500: "#3B82F6", // Blue 500
          600: "#2563EB", // Blue 600
          700: "#1D4ED8", // Blue 700
        },
        // Secondary Colors
        secondary: {
          500: "#8B5CF6", // Violet 500
          600: "#7C3AED", // Violet 600
          700: "#6D28D9", // Violet 700
        },
        // Accent Colors
        success: {
          500: "#10B981", // Green 500
          600: "#059669", // Green 600
          700: "#047857", // Green 700
        },
        warning: {
          500: "#F59E0B", // Amber 500
        },
        error: {
          500: "#EF4444", // Red 500
        },
        info: {
          500: "#3B82F6", // Blue 500
        },
        // Text Colors
        "primary-text": "#0F172A", // Slate 900
        "secondary-text": "#475569", // Slate 600
        "tertiary-text": "#64748B", // Slate 500
        // Background Colors
        "card-bg": "#FFFFFF",
        // House Colors
        stark: {
          DEFAULT: "#94A3B8", // Slate 400
          light: "#CBD5E1", // Slate 300
          dark: "#64748B", // Slate 500
        },
        baratheon: {
          DEFAULT: "#FBBF24", // Amber 400
          light: "#FCD34D", // Amber 300
          dark: "#F59E0B", // Amber 500
        },
        greyjoy: {
          DEFAULT: "#1E293B", // Slate 800
          light: "#334155", // Slate 700
          dark: "#0F172A", // Slate 900
        },
        lannister: {
          DEFAULT: "#DC2626", // Red 600
          light: "#EF4444", // Red 500
          dark: "#B91C1C", // Red 700
        },
        targaryen: {
          DEFAULT: "#F43F5E", // Rose 500
          light: "#FB7185", // Rose 400
          dark: "#E11D48", // Rose 600
        },
      },
    },
  },
  plugins: [],
};
export default config;

