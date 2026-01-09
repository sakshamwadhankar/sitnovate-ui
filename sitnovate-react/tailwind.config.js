/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hp-gold': '#d4af37',
        'hp-dark': '#0a0f1c',
        'hp-blue': '#4169e1',
        'hp-crimson': '#2d160b', // Deep brown/crimson from styles
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'magical-gradient': 'linear-gradient(180deg, #0a0f1c 0%, #0f172a 100%)',
      }
    },
  },
  plugins: [],
}
