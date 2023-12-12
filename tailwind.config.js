/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        redbus: "#d74f57",
        offwhite: "#F2F2F2",
        blue: "#0D6EFD",
        lightblue: "#EAF2FF",
      }
    },
  },
  plugins: [],
}

