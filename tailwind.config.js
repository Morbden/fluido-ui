const { join } = require('path')

module.exports = {
  mode: 'jit',
  purge: [
    join(__dirname, 'components/**/.{js,ts,jsx,tsx}'),
    'components/**/.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  plugins: [],
}
