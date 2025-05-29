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
        // Enhanced Glowing Editorial System
        primary: 'rgb(var(--bg-primary))',
        secondary: 'rgb(var(--bg-secondary))',
        accent: 'rgb(var(--bg-accent))',
        'text-primary': 'rgb(var(--text-primary))',
        'text-secondary': 'rgb(var(--text-secondary))',
        'text-accent': 'rgb(var(--text-accent))',
        'border-subtle': 'rgb(var(--border-subtle))',
        'glow-primary': 'rgb(var(--glow-primary))',
        'glow-secondary': 'rgb(var(--glow-secondary))',
        'tech-cyan': 'rgb(var(--tech-cyan))',
        'tech-blue': 'rgb(var(--tech-blue))',
        'text-glow': 'rgb(var(--text-glow))',
        
        // Legacy support 
        'sepia-100': '#ffffff',
        'sepia-200': '#f5f5f5',
        'sepia-300': '#c8c8dc',
        'sepia-400': '#b4b4c8',
        'sepia-500': '#9090a0',
        'sepia-600': '#707080',
        'sepia-700': '#505060',
        'sepia-800': '#191928',
        'sepia-900': '#0f0f19'
      },
      fontFamily: {
        'display': ['Orbitron', 'Exo 2', 'monospace'],
        'body': ['Rajdhani', 'Exo 2', 'sans-serif'],
        'tech': ['Exo 2', 'sans-serif'],
        'mono': ['Orbitron', 'SF Mono', 'monospace'],
        sans: ['Rajdhani', 'Exo 2', 'sans-serif'],
        serif: ['Orbitron', 'monospace']
      },
      
      fontSize: {
        'display-lg': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'headline': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'subhead': ['1.5rem', { lineHeight: '1.3' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'caption': ['0.875rem', { lineHeight: '1.4' }]
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      boxShadow: {
        'editorial': '0 8px 32px rgba(120, 120, 255, 0.2), 0 4px 16px rgba(0, 0, 0, 0.3)',
        'editorial-lg': '0 20px 40px rgba(120, 120, 255, 0.2), 0 10px 20px rgba(180, 120, 255, 0.1), 0 0 60px rgba(120, 120, 255, 0.15)',
        'glow': '0 0 20px rgba(120, 120, 255, 0.4), 0 0 40px rgba(120, 120, 255, 0.2)',
        'glow-lg': '0 0 40px rgba(120, 120, 255, 0.5), 0 0 80px rgba(120, 120, 255, 0.3)',
        'focus': '0 0 0 2px rgba(120, 120, 255, 0.5)'
      },
      
      animation: {
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in': 'fadeIn 0.6s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
        'gradient-shift': 'gradientShift 15s ease infinite'
      },
      
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        glowPulse: {
          '0%': { boxShadow: '0 0 20px rgba(120, 120, 255, 0.4)' },
          '100%': { boxShadow: '0 0 40px rgba(120, 120, 255, 0.6), 0 0 60px rgba(120, 120, 255, 0.3)' }
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        }
      },
    }
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.text-balance': {
          'text-wrap': 'balance'
        }
      })
    }
  ]
}