import { batch, createEffect, onMount } from 'solid-js';
import { OpenAPI } from '~/api';
import { g, log } from './utils';

export default function createCommonService(
  actions: any,
  state: any,
  setState: any
) {
  // assign common service actions
  Object.assign(actions, {
    // count setter
    setCount: (n: number) => setState('count', n),
    // token setter
    setToken: (token: string) => {
      setState('token', token);
      OpenAPI.TOKEN = token;
    },
    // csrf setter
    setTokenCSRF: (csrf: string) => {
      setState('csrf', csrf);
    },
    // reset
    resetState: () => {
      batch(() => {
        setState('count', 0);
        setState('token', '');
        setState('csrf', '');
      });
    }
  });

  onMount(() => {
    if (g.localStorage.count)
      setState('count', JSON.parse(g.localStorage.count));
    if (g.localStorage.jwt) setState('token', JSON.parse(g.localStorage.jwt));
    if (g.localStorage.csrf) setState('csrf', JSON.parse(g.localStorage.csrf));

    // common state changes
    createEffect(() => {
      if (state.count) g.localStorage.count = JSON.stringify(state.count);
      if (state.token) g.localStorage.jwt = JSON.stringify(state.token);
      if (state.csrf) g.localStorage.csrf = JSON.stringify(state.csrf);

      // debug
      if (import.meta.env.DEV && import.meta.env.SSR)
        log(`${state.appName} Common Service State Changed`);
    });
  });
}
