/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'white_20' : '#ffffff33',
        'bgGradientColor1' : '#0000d0',
        'bgGradientColor2' : '#9393EB',
        'bgNavbar' : '#3861fb',
        'blueFaded' : "#ACC1D9"
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
      height: {
        'height_1px' : '1px',
      }
    },
  },
  plugins: [],
}

