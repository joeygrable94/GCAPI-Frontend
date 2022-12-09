import { createContext, createSignal, useContext } from "solid-js"
import { createStore } from "solid-js/store"
import createCommonService from "~/context/common"
import createAuthService from "~/context/auth"

const StoreContext = createContext()

export default function StoreProvider(props: any) {

  // app services
  const [appLoaded, setAppLoaded] = createSignal(false)
  
  // auth service
  let currentUser: any

  // state manager
  const [state, setState] = createStore({
    get loadState() {
      return appLoaded()
    },
    get currentUser() {
      return currentUser()
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

  // common services [mount/cleanup]
  createCommonService(actions, state, setState)

  // auth services
  currentUser = createAuthService(actions)

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  return useContext(StoreContext)
}
