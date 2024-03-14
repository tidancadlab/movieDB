/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-extraneous-dependencies
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      'scrollbar-width': 'none',
    },
    colors: {
      primary: {
        light: 'rgb(var(--color-primary-light) / <alpha-value>)',
        dark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
      },
      secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
      ...colors,
    },
  },
  plugins: [],
}
