/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        script: ['"Dancing Script"', '"Segoe Script"', 'cursive'],
      },
      colors: {
        ink: {
          DEFAULT: '#0F172A',
          soft: '#334155',
          mute: '#64748B',
          faint: '#94A3B8',
        },
        canvas: '#F8FAFC',
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#3B82F6',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF',
          800: '#1E3A8A',
          900: '#172554',
        },
        glow: {
          sky: '#7DD3FC',
          rose: '#BFDBFE',
          peach: '#A5F3FC',
          mint: '#E0F2FE',
        },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15,23,42,.04), 0 8px 24px -6px rgba(15,23,42,.08)',
        lift: '0 2px 4px rgba(15,23,42,.04), 0 24px 48px -12px rgba(30,58,138,.18)',
        glow: '0 10px 30px -8px rgba(37,99,235,.55)',
        inset: 'inset 0 1px 0 rgba(255,255,255,.7)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(30px,-40px,0) scale(1.06)' },
          '66%': { transform: 'translate3d(-25px,20px,0) scale(.96)' },
        },
        drift: {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '10%': { opacity: '.9' },
          '90%': { opacity: '.9' },
          '100%': { transform: 'translateY(-110vh)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        spinslow: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        float: 'float 18s ease-in-out infinite',
        'float-slow': 'float 26s ease-in-out infinite',
        drift: 'drift linear infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        spinslow: 'spinslow 40s linear infinite',
      },
    },
  },
  plugins: [],
}
