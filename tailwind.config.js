/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Noir grayscale theme
        primary: '#121212',
        secondary: '#303030',
        accent: '#e0e0e0',
        'accent-light': '#f5f5f5',
        'accent-dark': '#a0a0a0',
        light: '#f5f5f5',
        dark: '#121212',
        'cyber-blue': '#a0a0a0',
        'cyber-purple': '#777777',
        'cyber-pink': '#9e9e9e',
        'cyber-green': '#c0c0c0',
        'sepia-100': '#f5f5f5',
        'sepia-200': '#e0e0e0',
        'sepia-300': '#d0d0d0',
        'sepia-400': '#b0b0b0',
        'sepia-500': '#909090',
        'sepia-600': '#707070',
        'sepia-700': '#505050',
        'sepia-800': '#303030',
        'sepia-900': '#121212'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        'cyber': ['BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(45deg, #121212, #505050, #121212)',
        'sepia-gradient': 'linear-gradient(to right, #f5f5f5, #b0b0b0, #707070)',
        'cyber-glow': 'linear-gradient(45deg, rgba(224, 224, 224, 0.3), rgba(160, 160, 160, 0.2), rgba(192, 192, 192, 0.3))',
      },
      boxShadow: {
        'cyber': '0 0 10px rgba(224, 224, 224, 0.5), 0 0 20px rgba(160, 160, 160, 0.3)',
        'cyber-text': '0 0 5px rgba(224, 224, 224, 0.7)',
        'inner-cyber': 'inset 0 0 8px rgba(224, 224, 224, 0.4)'
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'cyber-glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(224, 224, 224, 0.5), 0 0 10px rgba(160, 160, 160, 0.3)' },
          '100%': { boxShadow: '0 0 15px rgba(224, 224, 224, 0.8), 0 0 20px rgba(160, 160, 160, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}