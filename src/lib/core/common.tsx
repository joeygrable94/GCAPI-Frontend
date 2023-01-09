import { batch, createEffect, onMount } from 'solid-js';
import { OpenAPI } from '~/api';
import { API_URL_BASE, g, log } from './utils';

export default function createCommonService(actions: any, state: any, setState: any) {
  // assign common service actions
  Object.assign(actions, {
    setApiBaseUrl: (s: string = API_URL_BASE) => (OpenAPI.BASE = s),
    // count setter
    setCount: (n: number) => setState('count', n),
    // token setter
    setToken: (token: string, csrf: string) => {
      setState('token', token);
      setState('csrf', csrf);
      OpenAPI.TOKEN = token;
    },
    // reset
    resetToken: () => {
      batch(actions.setToken('', ''));
    }
  });

  onMount(() => {
    log('Mounted Common Service');
    log('State Count:', state.count);

    // set initial state
    actions.setApiBaseUrl(API_URL_BASE);

    // load local count
    let localCount: number = 0;
    if (g.localStorage.count) localCount = JSON.parse(g.localStorage.count);
    log('Local Count:', localCount, state.count);

    // TODO: validate values set to local storage (security risk)
    // set state from local
    actions.setCount(localCount);

    log('State Count:', state.count);
  });

  // common state changes
  createEffect(() => {
    log(`${state.appName} Common Service State Changed`);

    if (state.count) g.localStorage.count = JSON.stringify(state.count);

    log('State Count:', state.count);
  });
}
