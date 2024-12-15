/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          pink: '#af135c',
          saf: '#f08080',
          brown: '#ddd3c4',
          darbar: ' '
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
        fadeInOut: 'fadeInOut 20s infinite',
        slideUp: 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        shake: {
          '0%': { transform: 'translateX(-5px)' },
          '25%': { transform: 'translateX(5px)' },
          '50%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeInOut: {
          '0%, 100%': { opacity: 0 },
          '25%, 75%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
