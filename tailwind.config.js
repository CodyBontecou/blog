module.exports = {
  content: ['./src/.vitepress/**/*.{js,ts,vue}', './src/**/*.md'],
  options: {
    safelist: ['html', 'body'],
  },
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
