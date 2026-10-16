import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0A0A12',
          deep: '#050507',
          card: '#0D0C18',
          elevated: '#121124',
          subtle: '#18162E',
        },
        brand: {
          violet: '#6D28D9',
          'violet-dark': '#581C87',
          'violet-light': '#7C3AED',
          indigo: '#4F46E5',
          'indigo-light': '#6366F1',
          lavender: '#C4B5FD',
          'lavender-light': '#DDD6FE',
          cyan: '#22D3EE',
          'cyan-glow': 'rgba(34, 211, 238, 0.4)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '18px',
        'card-lg': '22px',
        'pill': '9999px',
      },
      boxShadow: {
        'glow-violet': '0 0 40px -10px rgba(109, 40, 217, 0.45)',
        'glow-indigo': '0 0 50px -12px rgba(79, 70, 229, 0.45)',
        'glow-cyan': '0 0 30px -8px rgba(34, 211, 238, 0.4)',
        'glow-subtle': '0 0 25px -5px rgba(196, 181, 253, 0.15)',
        'card-hover': '0 12px 36px -8px rgba(109, 40, 217, 0.25)',
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(ellipse at 50% -20%, rgba(109, 40, 217, 0.35), transparent 70%)',
        'aurora-mesh': 'radial-gradient(circle at 20% 20%, rgba(109, 40, 217, 0.25) 0%, transparent 40%), radial-gradient(circle at 80% 30%, rgba(79, 70, 229, 0.2) 0%, transparent 45%), radial-gradient(circle at 50% 60%, rgba(34, 211, 238, 0.08) 0%, transparent 50%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'card-hover-gradient': 'linear-gradient(135deg, rgba(109, 40, 217, 0.15) 0%, rgba(79, 70, 229, 0.05) 100%)',
      },
      animation: {
        'beam-sweep': 'beamSweep 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'gradient-shift': 'gradientShift 10s ease infinite',
      },
      keyframes: {
        beamSweep: {
          '0%, 100%': { transform: 'translateX(-10%) scaleX(0.9)', opacity: '0.4' },
          '50%': { transform: 'translateX(10%) scaleX(1.1)', opacity: '0.9' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
