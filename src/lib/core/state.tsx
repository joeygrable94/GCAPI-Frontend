import { createContext, createSignal, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import createCommonService from '~/lib/core/common';

const AppContext = createContext();

export default function AppProvider(props: any) {
  // app services
  const [appLoaded, setAppLoaded] = createSignal(false);

  // state manager
  const [state, setState] = createStore({
    appName: 'GCAPI',
    count: 0
  });

  // state actions
  const actions: any = {};

  // state proxy
  const store: any = [state, actions];

  // common services [mount/cleanup]
  createCommonService(actions, state, setState);

  return <AppContext.Provider value={store}>{props.children}</AppContext.Provider>;
}

export function useAppStore() {
  return useContext(AppContext);
}
