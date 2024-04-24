/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          // DEFAULT: "#5f201b"
          // DEFAULT: "#bd5717"
          DEFAULT: "#1778bd"
          // CRIMSON
          // DEFAULT: "#dc143c"
        }
      }
    },
  },
  plugins: [],
}
