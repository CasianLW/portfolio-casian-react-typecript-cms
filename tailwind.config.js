/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        fraunces: ['Fraunces', 'sans-serif'],
        secondary: ['Minerva Modern', 'sans-serif'],
      },
      colors: {
        'cas-black': {
          400: '#262626',
          500: '#1c1c1c',
          600: '#151515',
        },
        'cas-white': {
          100: '#ffffff',
          300: '#949494',
        },
        'cas-gradient': {
          purple: '#6c52ee',
          orangeLight: '#f5d8a4',
          orangeDark: '#b08676',
          blue: '#a8c5de',
          rose: '#c79dde',
        },
        'cas-gradient-purple': '#9b23ea',
        'cas-gradient-orange': '#2A3B7C',
        'cwr-yellow': '#F8AE00',
        'cwr-green': '#009642',
        'cwr-purple': '#9065A8',
        'cwr-pink': '#EB608E',
      },
      boxShadow: {
        'btn-dark': '2px 2px 0px 1px #000000',
        'btn-light': '2px 2px 0px 1px #ffffff',
        'faq-detail': 'inset 0px 0px 0px 1px #0079b7',
        'choice-label': 'inset 0px 0px 0px 2px #0079b7',
      },
      dropShadow: {
        '1logo': '0px 1px 11px 5px #000000',
        '5xl': ['0 35px 35px rgba(0, 0, 0, 0.25)', '0 45px 65px rgba(0, 0, 0, 0.15)'],
      },
      animation: {
        'move-point': 'move-point 1.5s cubic-bezier(0.42, 0.04, 0.14, 0.99) infinite',
      },
      keyframes: {
        pulse_tst: {
          '0%, 20%, 80%, 100%': { transform: 'none', opacity: '0' },
          '30%, 70%': { transform: 'none', opacity: '1' },
          '50%': { transform: 'translateY(150%)', opacity: '1' },
        },
        movePoint: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-550%)',
          },
          '20%': {
            opacity: '1',
          },
          '80%': {
            opacity: '1',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(-50%)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
