const defaultTheme = require('tailwindcss/defaultTheme')


/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'ping-slow': 'lightPulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        lightPulse: {
          '0%, 100%': { opacity: '1'},
          '50%': { opacity: '0.7' },
        }
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0,.84,.1,1.01)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}
