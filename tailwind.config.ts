import { ClientStylesGetCommunity } from '@getcommunity/client-styleguides';
import { GcuiTwCore } from '@getcommunity/gcui-tailwind';
import type { Config } from 'tailwindcss';

export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./src/**/*.{html,js,ts,jsx,tsx}', '@getcommunity/gcui'],
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
      zIndex: {
        '9999': '9999',
      },
      transitionProperty: {
        width: 'width',
        height: 'height',
        spacing: 'margin, padding',
        outline: 'outline',
      },
      keyframes: {
        'accordion-slide-down': {
          '0%': { height: '0' },
          '100%': { height: 'var(--kb-accordion-content-height);' },
        },
        'accordion-slide-up': {
          '0%': { height: 'var(--kb-accordion-content-height);' },
          '100%': { height: '0' },
        },
        'collapsable-slide-down': {
          '0%': { height: '0' },
          '100%': { height: 'var(--kb-collapsible-content-height);' },
        },
        'collapsable-slide-up': {
          '0%': { height: 'var(--kb-collapsible-content-height);' },
          '100%': { height: '0' },
        },
        'select-content-show': {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'select-content-hide': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-8px)' },
        },
        'overlay-show': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'overlay-hide': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'overlay-content-show': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'overlay-content-hide': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.96)' },
        },
        'pulse-opacity': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(calc(100% + 16px))' },
          '100%': { transform: 'translateX(0)' },
        },
        'swipe-out': {
          '0%': { transform: 'translateX(var(--kb-toast-swipe-end-x))' },
          '100%': { transform: 'translateX(calc(100% + 16px))' },
        },
      },
      animation: {
        'accordion-slide-down':
          'accordion-slide-down 300ms cubic-bezier(0.87,0,0.13,1)',
        'accordion-slide-up': 'accordion-slide-up 300ms cubic-bezier(0.87,0,0.13,1)',
        'collapsable-slide-down': 'collapsable-slide-down 300ms ease-out',
        'collapsable-slide-up': 'collapsable-slide-up 300ms ease-out',
        'select-content-show': 'select-content-show 250ms ease-out',
        'select-content-hide': 'select-content-hide 250ms ease-in forwards',
        'dialog-overlay-show': 'overlay-show 250ms ease',
        'dialog-overlay-hide': 'overlay-hide 250ms ease 100ms forwards',
        'dialog-content-show': 'overlay-content-show 300ms ease-out',
        'dialog-content-hide': 'overlay-content-hide 300ms ease-in forwards',
        'popover-content-show': 'overlay-content-show 250ms ease-out',
        'popover-content-hide': 'overlay-content-hide 250ms ease-in forwards',
        'progress-pulse': 'pulse-opacity 1s ease-in-out infinite',
        'toast-hide': 'overlay-hide 100ms ease-in',
        'toast-slide-in': 'slide-in 150ms cubic-bezier(0.16,1,0.3,1)',
        'toast-swipe-out': 'swipe-out 100ms ease-out',
      },
    },
  },
  plugins: [
    // Base TW Addons
    require('@tailwindcss/typography'),
    ClientStylesGetCommunity,
    // GCUI Kobalte
    require('@kobalte/tailwindcss'),
    // GCUI Core
    GcuiTwCore,
  ],
} satisfies Config;
