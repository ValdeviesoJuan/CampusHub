/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: 'media',
  theme: {
    extend: {
      boxShadow: {
        'inner-darker': 'inset 10px 15px -3px rgba(0, 0, 0, 0.5)',
        'right-custom': '25px 0 50px -12px rgba(0, 0, 0, 0.5)',
        'right-custom-rotated': '25px 25px 50px -12px rgba(0, 0, 0, 0.5)',
      },
      colors: {
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
      },
      backgroundImage: {
        'custom-image': "url('stripes.png')",
        'footer-gradient': 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)'
      },
    },
  },
  plugins: [],
}
