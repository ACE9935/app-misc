import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        main:'#e91e63',
      },
      screens: {
        'xs': '430px',
        // => @media (min-width: 992px) { ... }
      },
    },
  },
  plugins: [],
};
export default config;
