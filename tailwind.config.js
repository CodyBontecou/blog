module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
    './src/**/*.md',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          ninja: '#4979ff',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
