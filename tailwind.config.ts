import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        solaiman: ['SolaimanLipi', 'Noto Serif Bengali', 'Tiro Bangla', 'Hind Siliguri', 'serif'],
        siliguri: ['SolaimanLipi', 'Hind Siliguri', 'sans-serif'],
      },
      colors: {
        'primary-blue': '#3252eb',
        'header-red': '#d01923',
        'badge-green': '#00833a',
      },
    },
  },
  plugins: [],
};
export default config;
