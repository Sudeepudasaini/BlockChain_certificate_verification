module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F8F5FF',
          100: '#F0EBFF',
          200: '#DDD6FF',
          300: '#C7BEFF',
          400: '#B0A1FF',
          500: '#9984FF',
          600: '#4F46E5',
          700: '#3D39C7',
          800: '#2B27A0',
          900: '#1A167B',
        },
        secondary: {
          50: '#EFF6FF',
          100: '#E0EDFE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#3B82F6',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
      },
    },
  },
  darkMode: 'class',
}
