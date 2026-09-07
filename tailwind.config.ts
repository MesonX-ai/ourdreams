import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          50: '#fffbf0',
          100: '#fef3e2',
          700: '#b45309',
          800: '#92400e',
        },
      },
    },
  },
  plugins: [],
  important: true, // Override conflicting styles
};

export default config;
