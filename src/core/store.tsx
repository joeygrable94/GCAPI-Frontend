import { createContext, createSignal, useContext } from "solid-js"
import { createStore, Store } from "solid-js/store"
import createCommonService from "~/core/serviceCommon"

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

  // services
  createCommonService(actions, state, setState)

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  return useContext(StoreContext)
}
