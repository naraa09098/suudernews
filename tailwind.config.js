/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        gold:"#C6A45A",
        dark:"#0b0b0b"
      }
    },
  },
  plugins: [],
}