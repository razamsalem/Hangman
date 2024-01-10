/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#19A7CE",
        "light": "#BFCFE7",
        "lighter": "#F8EDFF"
      }
    },
  },
  plugins: [],
}

