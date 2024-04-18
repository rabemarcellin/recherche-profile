/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        text: ['"PT Sans"', 'Merriweather', '"Open Sans"', 'sans-serif'],
        content: ['"PT Serif"', 'serif']
      }
    },
  },
  plugins: [],
}

