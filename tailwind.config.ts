import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        ink: "#0F1B2D",
        brass: "#B08D57",
        teal: "#1F6F5C",
        line: "#E4E1D9",
        overdue: "#B4432F",
        paper: "#F7F7F5",
        brandFrom: "#22D3C5",
        brandTo: "#152A44",
      },
    },
  },
  plugins: [],
};
export default config;