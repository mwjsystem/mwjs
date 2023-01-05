/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'media',
  theme: {
    extend: {},
    screens: {
      xs: { max: '599px' },
      'gt-xs': { min: '600px' }
    }
  },
  plugins: [],
  important: true
}
