/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Crimson Pro"', 'serif'],
        sans: ['"DM Sans"', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: '#1a1a1a',
        background: '#fafafa',
        border: '#e0e0e0',
      },
    },
  },
  plugins: [],
}
