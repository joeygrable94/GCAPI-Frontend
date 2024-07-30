import {
  GcuiTwAccordion,
  GcuiTwAlert,
  GcuiTwAvatar,
  GcuiTwBreadcrumb,
  GcuiTwButton,
  GcuiTwCollapsable,
  GcuiTwCore,
  GcuiTwDialog,
  GcuiTwFormInput,
  GcuiTwLink,
  GcuiTwMenuDropdown,
  GcuiTwPagination,
  GcuiTwPopover,
  GcuiTwProgress,
  GcuiTwSeparator,
  GcuiTwTabs,
  GcuiTwToast,
} from '@getcommunity/gcui-tailwind';
import type { Config } from 'tailwindcss';

export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./src/**/*.{js,ts,jsx,tsx}', '@getcommunity/gcui'],
  theme: {
    extend: {}
  },
  plugins: [
    // Base TW Addons
    require('@tailwindcss/typography'),
    // GC Client Styles
    require('@getcommunity/client-styleguides'),
    // GCUI Kobalte
    require('@kobalte/tailwindcss'),
    // GCUI Core
    GcuiTwCore,
    // Components
    GcuiTwAccordion,
    GcuiTwAlert,
    GcuiTwAvatar,
    GcuiTwBreadcrumb,
    GcuiTwButton,
    GcuiTwCollapsable,
    GcuiTwDialog,
    GcuiTwFormInput,
    GcuiTwLink,
    GcuiTwMenuDropdown,
    GcuiTwPagination,
    GcuiTwPopover,
    GcuiTwProgress,
    GcuiTwSeparator,
    GcuiTwTabs,
    GcuiTwToast,
  ]
} satisfies Config;
