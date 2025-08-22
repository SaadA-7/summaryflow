/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
