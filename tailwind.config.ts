import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        solaiman: ['SolaimanLipi', 'Hind Siliguri', 'serif'],
        siliguri: ['SolaimanLipi', 'Hind Siliguri', 'sans-serif'],
        notoserif: ['Noto Serif Bengali', 'serif'],
        tiro: ['Tiro Bangla', 'serif'],
        roboto: ['Roboto', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        open: ['Open Sans', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
        serif: ['serif'],
        sans: ['sans-serif'],
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
