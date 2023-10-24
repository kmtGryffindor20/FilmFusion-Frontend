/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "purple": "#BB86FC",
        "primary": "#121212",
        "secondary": "#1F1B24",
      },
      fontFamily:{
        "sans": ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
}

