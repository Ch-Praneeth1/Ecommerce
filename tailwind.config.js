/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: { 
    extend: {
    gridTemplateRows: {
      '[auto,auto,1fr]': 'auto auto 1fr',
    },
  },
  },
  plugins: [  require('@tailwindcss/aspect-ratio'),
              require('@tailwindcss/forms'),
              function ({ addUtilities }) {
    const newUtilities = {
      '.hide-scrollbar::-webkit-scrollbar': {
        display: 'none',
      },
      '.hide-scrollbar': {
        '-ms-overflow-style': 'none',  // IE and Edge
        'scrollbar-width': 'none',     // Firefox
      },
    };

    addUtilities(newUtilities, ['responsive', 'hover']);
  },],
}

