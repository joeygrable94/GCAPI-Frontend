import { onCleanup, onMount } from 'solid-js';

/**
 * @description fixes the viewport height on mobile devices
 * @see https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
 *
 * @example
 *
 * * In Component:
 * viewportHeightStyles();
 *
 * * HTML:
 * <body>
 *   <div id="root"></div>
 * </body>
 *
 * * In CSS:
 * body,
 * #app,
 * .viewport-height {
 *   height: 100vh;
 *   height: calc(var(--vh, 1vh) * 100);
 * }
 */

const setViewportHeight = () => {
  'use client';
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

const viewportHeightStyles = () => {
  import('./viewport-height.css');
  setViewportHeight();
  onMount(() => {
    window.addEventListener('resize', setViewportHeight);
  });
  onCleanup(() => {
    window.removeEventListener('resize', setViewportHeight);
  });
};

export default viewportHeightStyles;
