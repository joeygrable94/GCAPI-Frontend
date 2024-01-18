import type { Component } from 'solid-js';

import { viewportHeightStyles } from '~/utils';
import styles from './app.module.css';
import logo from './logo.svg';

const App: Component = () => {
  viewportHeightStyles();

  return (
    <div class={styles.app}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
};

export default App;
