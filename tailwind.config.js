/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#0E0E1A',
          soft: '#3B3B52',
          mute: '#6E6E87',
          faint: '#A3A3B8',
        },
        canvas: '#F7F7FB',
        brand: {
          50: '#F1F0FF',
          100: '#E5E3FF',
          200: '#CDC9FF',
          300: '#ABA3FF',
          400: '#8A7DFB',
          500: '#6D5DF5',
          600: '#5B47E8',
          700: '#4B38C8',
          800: '#3D2FA1',
          900: '#2E2475',
        },
        glow: {
          sky: '#7DD3FC',
          rose: '#F9A8D4',
          peach: '#FDBA74',
          mint: '#86EFAC',
        },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16,16,40,.04), 0 8px 24px -6px rgba(16,16,40,.08)',
        lift: '0 2px 4px rgba(16,16,40,.04), 0 24px 48px -12px rgba(40,30,120,.18)',
        glow: '0 10px 30px -8px rgba(109,93,245,.55)',
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
