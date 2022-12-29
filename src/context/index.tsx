import { createContext, createSignal, useContext } from "solid-js"
import { createStore } from "solid-js/store"

const StoreContext = createContext()

export default function StoreProvider(props: any) {

  // app services
  const [appLoaded, setAppLoaded] = createSignal(false)

  // state manager
  const [state, setState] = createStore({
    get loadState() {
      return appLoaded()
    },
    appName: 'GCAPI',
    base: '',
    token: '',
    csrf: '',
    page: '',
  })

  // state actions
  const actions: any = {
    setLoadState: (s: boolean) => setAppLoaded(s),
  }

  // state proxy
  const store: any = [state, actions]

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  return useContext(StoreContext)
}
