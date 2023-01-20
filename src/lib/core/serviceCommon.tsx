import { createEffect, onMount } from 'solid-js';
import { IAppAgent } from './types';
import { g } from './utils';

export default function createCommonService(
  agent: IAppAgent,
  actions: any,
  state: any,
  setState: any
) {
  Object.assign(actions, {
    setCount: (n: number) => setState('count', n)
  });

  onMount(() => {
    let localCount: number = 0;
    if (g.localStorage.count) localCount = JSON.parse(g.localStorage.count);

    // TODO: validate values set to local storage (security risk)
    actions.setCount(localCount);
  });

  createEffect(() => {
    if (state.count) g.localStorage.count = JSON.stringify(state.count);
  });
}
