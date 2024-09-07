/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, rgb(126, 34, 206), rgb(88, 28, 135))',
      },
      fontFamily: {
        playfair: ["Playfair Display", "serift"],
      },
      colors: {
        "dark-purple": "#081A51",
        'light-white': 'rgba(255, 255, 255, 0.18)',
        'custom-purple': '#a517ba',
        'custom-dark-purple': '#5f1782'
      },
    },
  },
  plugins: [],
}
