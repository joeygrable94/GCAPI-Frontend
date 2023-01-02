import { createComputed, createEffect, onCleanup, onMount } from 'solid-js';
import { OpenAPI } from '~/api';
import { API_URL_BASE, g, log } from '~/core/utils';

export default function createCommonService(
  actions: any,
  state: any,
  setState: any
) {
  // assign common service actions
  Object.assign(actions, {
    // token setter
    setToken: (token: string) => {
      setState('token', token);
      OpenAPI.TOKEN = token;
      if (g.localStorage) g.localStorage.setItem('jwt', token);
    },

    // csrf setter
    setTokenCSRF: (csrf: string) => {
      setState('csrf', csrf);
      if (g.localStorage) g.localStorage.setItem('csrf', csrf);
    },

    // api base url setter
    setApiUrl: (baseUrl: string = API_URL_BASE) => {
      setState('base', baseUrl);
      OpenAPI.BASE = baseUrl;
    }
  });

  // common startup actions
  onMount(() => {
    // set api url
    actions.setApiUrl();

    // load local jwt
    if (g.localStorage && g.localStorage.getItem('jwt')) {
      actions.setToken(g.localStorage.getItem('jwt'));
    }
    // load local csrf
    if (g.localStorage && g.localStorage.getItem('csrf')) {
      actions.setTokenCSRF(g.localStorage.getItem('csrf'));
    }
    // detect changes to jwt & csrf
    createEffect(() => {
      if (state.token) g.localStorage.setItem('jwt', state.token);
      else g.localStorage.removeItem('jwt');
      if (state.csrf) g.localStorage.setItem('csrf', state.token);
      else g.localStorage.removeItem('csrf');
    });
    // check state token
    if (!state.token) actions.setLoadState(true);
    else {
      // actions.pullUser()  // fetch current user
      // createComputed(() => state.currentUser && actions.setLoadState(true))
      createComputed(() => actions.setLoadState(true));
    }

    // debug
    log('app mounted');
  });

  // common shutdown actions
  onCleanup(() => {
    // resset api url
    actions.setApiUrl('');
  });
}
