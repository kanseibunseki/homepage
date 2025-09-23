/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#333',
        secondary: '#666',
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Arial', 'Hiragino Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}