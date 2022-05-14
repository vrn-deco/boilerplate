/* eslint-env node */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.clickable': {
          '@apply cursor-pointer active:brightness-75': {},
        },
      })
    }),
  ],
}
