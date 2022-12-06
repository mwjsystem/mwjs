/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/**/*.{html,ts,css,scss}',
     './libs/**/*.{html,ts,css,scss}'
  ],
  darkMode: false, // or 'media' or 'class'
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
