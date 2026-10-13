/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#F8F4EC',
          200: '#EFE6D5',
          300: '#E4D5B9',
          400: '#D4BE98',
        },
        navy: {
          900: '#0A1128',
          950: '#050B14',
          800: '#101C3A',
          700: '#1A2951'
        },
        gold: {
          500: '#D4AF37',
          600: '#C59B27',
        }
      },
    },
  },
  plugins: [],
}