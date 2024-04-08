const { nextui } = require('@nextui-org/react');

const tailwindConfig = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#1476ff",
        'secondary': "#f3f5ff",
        'light': "#f9faff",
      },
      backgroundColor: {
        'nav-bg': '#E7E8EA',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        custom: '0 2px 8px 4px rgba(178,178,178,0.45)',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};

module.exports = tailwindConfig;
