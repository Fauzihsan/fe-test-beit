/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#2f3746",
        secondary: "#ff3d00",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
