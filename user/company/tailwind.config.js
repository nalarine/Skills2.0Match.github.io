/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'nav-bg': '#E7E8EA',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        custom: '0 2px 8px 4px rgba(178,178,178,0.45)',
      },
    },
  },
  plugins: [],
}

