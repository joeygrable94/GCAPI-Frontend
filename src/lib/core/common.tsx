import { createEffect, onMount } from 'solid-js';
import { g } from './utils';

export default function createCommonService(actions: any, state: any, setState: any) {
  // assign common service actions
  Object.assign(actions, {
    // count setter
    setCount: (n: number) => setState('count', n)
  });

  onMount(() => {
    // load local count
    let localCount: number = 0;
    if (g.localStorage.count) localCount = JSON.parse(g.localStorage.count);

    // TODO: validate values set to local storage (security risk)
    // set state from local
    actions.setCount(localCount);
  });

  // common state changes
  createEffect(() => {
    if (state.count) g.localStorage.count = JSON.stringify(state.count);
  });
}
