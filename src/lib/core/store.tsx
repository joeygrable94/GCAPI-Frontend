import {
  createComputed,
  createContext,
  createSignal,
  onMount,
  useContext
} from 'solid-js';
import { createStore } from 'solid-js/store';

const StoreContext = createContext();

export default function StoreProvider(props: any) {
  // app services
  const [appLoaded, setAppLoaded] = createSignal(false);

  // state manager
  const [state, setState] = createStore({
    get loadState() {
      return appLoaded();
    },
    appName: 'GCAPI',
    page: '',
    token: '',
    csrf: ''
  });

  // state actions
  const actions: any = {
    setLoadState: (s: boolean) => setAppLoaded(s)
  };

  // state proxy
  const store: any = [state, actions];

  onMount(() => {
    if (!state.token) {
      actions.setLoadState(true);
    } else {
      createComputed(() => actions.setLoadState(true));
    }
  });

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
