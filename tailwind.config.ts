import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        plum: "rgb(var(--plum-rgb) / <alpha-value>)",
        champagne: "rgb(var(--champagne-rgb) / <alpha-value>)",
        gold: "rgb(var(--gold-rgb) / <alpha-value>)",
        blush: "rgb(var(--blush-rgb) / <alpha-value>)",
        cream: "rgb(var(--cream-rgb) / <alpha-value>)",
        sage: "rgb(var(--sage-rgb) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(18, 19, 26, 0.18)",
        glow: "0 0 0 1px rgba(232, 200, 126, 0.4), 0 20px 60px -24px rgba(42, 27, 61, 0.45)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-rev": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(4%,-6%,0) scale(1.08)" },
        },
        "pulse-edge": {
          "0%, 100%": { strokeDashoffset: "0" },
          "50%": { strokeDashoffset: "-12" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-rev": "marquee-rev 40s linear infinite",
        "fade-up": "fade-up 0.6s ease both",
        aurora: "aurora 18s ease-in-out infinite",
        "pulse-edge": "pulse-edge 1.2s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
