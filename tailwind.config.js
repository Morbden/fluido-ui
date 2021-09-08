const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: {
    enable: true,
    content: [
      './components/**/*.{js}',
      './effects/**/*.{js}',
      './hooks/**/*.{js}',
      './layouts/**/*.{js}',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: colors.emerald,
        accent: colors.fuchsia,
        canvas: colors.amber,
        neutral: colors.gray,
      },
      fontFamily: {
        display: ['Oswald', ...defaultTheme.fontFamily.sans],
        sans: [...defaultTheme.fontFamily.sans],
        serif: [...defaultTheme.fontFamily.serif],
        mono: [...defaultTheme.fontFamily.mono],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
