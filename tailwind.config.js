/** @type {import('tailwindcss').Config} */
module.exports = {
  // prefix: 'tw-',
  purge: {
    content: ['./apps/**/*.{html,ts,css,scss}', './libs/**/*.{html,ts,css,scss}']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      xs: { max: '599px' },
      'gt-xs': { min: '600px' }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [],
  important: true
}
