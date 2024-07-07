/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        '1/10': '10%',
        '3/20': '15%',
        '3/10': '30%',
        '7/10': '70%',
        '9/10': '90%',
      },
      colors: {
        'dialog-overlay': 'rgb(0 0 0 / 0.2)',
      },
      borderWidth: {
        '1': '1px',
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
        'spacing': 'margin, padding',
        'outline': 'outline',
      },
      keyframes: {
        'accordion-slide-down': {
          '0%': { height: 0 },
          '100%': { height: 'var(--kb-accordion-content-height);' }
        },
        'accordion-slide-up': {
          '0%': { height: 'var(--kb-accordion-content-height);' },
          '100%': { height: 0 },
        },
        'collapsable-slide-down': {
          '0%': { height: 0 },
          '100%': { height: 'var(--kb-collapsible-content-height);' }
        },
        'collapsable-slide-up': {
          '0%': { height: 'var(--kb-collapsible-content-height);' },
          '100%': { height: 0 },
        },
        'content-show': {
          '0%': { opacity: 0, transform: 'translateY(-8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        'content-hide': {
          '0%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(-8px)' }
        },
        'overlay-show': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        'overlay-hide': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 }
        },
        'overlay-content-show': {
          '0%': { opacity: 0, transform: 'scale(0.96)' },
          '100%': { opacity: 1, transform: 'scale(1)' }
        },
        'overlay-content-hide': {
          '0%': { opacity: 1, transform: 'scale(1)' },
          '100%': { opacity: 0, transform: 'scale(0.96)' }
        },
        'pulse-opacity': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 }
        },
      },
      animation: {
        'accordion-slide-down': 'accordion-slide-down 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        'accordion-slide-up': 'accordion-slide-up 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        'collapsable-slide-down': 'collapsable-slide-down 300ms ease-out',
        'collapsable-slide-up': 'collapsable-slide-up 300ms ease-out',
        'select-content-show': 'content-show 250ms ease-out',
        'select-content-hide': 'content-hide 250ms ease-in forwards',
        'dialog-overlay-show': 'overlay-show 250ms ease',
        'dialog-overlay-hide': 'overlay-hide 250ms ease 100ms forwards',
        'dialog-content-show': 'overlay-content-show 300ms ease-out',
        'dialog-content-hide': 'overlay-content-hide 300ms ease-in forwards',
        'progress-pulse': 'pulse-opacity 1s ease-in-out infinite',
      }
    }
  },
  plugins: [
    // default prefix is "ui", or with a custom prefix
		require("@kobalte/tailwindcss"),
    function({ addVariant }) {
      addVariant('children', '& > *');
      addVariant('children-hover', '& > *:hover');
    }
		// require("@kobalte/tailwindcss")({ prefix: "gc" }),
  ]
};
