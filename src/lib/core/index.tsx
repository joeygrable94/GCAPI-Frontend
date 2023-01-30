import { createContext, createSignal, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { UserCreate, UserUpdate } from '~/api';
import createCommonService from '~/lib/core/serviceCommon';
import createAgentService from './serviceAgent';
import createUsersService from './serviceUsers';
import {
  AppStoreActions,
  AppStoreContextInitial,
  AppStoreContextValue,
  AppStoreState,
  IAppAgent
} from './types';

const defaultAppStoreState: AppStoreState = {
  appLoaded: () => false,
  users: () => undefined,
  appName: 'App',
  count: 0,
  page: 1
};

const defaultAppStoreActions: object = {
  setCount: (n: number) => undefined,
  setPage: (page: number) => undefined,
  loadUser: (user_id: string) => undefined,
  loadUsers: (predicate: string) => undefined,
  createUser: (data: UserCreate) => undefined,
  updateUser: (user_id: string, data: UserUpdate) => undefined,
  deleteUser: (user_id: string) => undefined
};

const AppContext = createContext<AppStoreContextInitial | AppStoreContextValue>([
  defaultAppStoreState,
  defaultAppStoreActions
]);

export default function AppProvider(props: any) {
  const [appLoaded, setAppLoaded] = createSignal(false);

  let users: any;

  const [state, setState] = createStore<AppStoreState>({
    get appLoaded() {
      return appLoaded();
    },
    get users() {
      return users();
    },
    appName: 'GCAPI',
    count: 0,
    page: 1
  });

  const actions: object = {
    setLoadState: (s: boolean): boolean => setAppLoaded(s)
  };

  const agent: IAppAgent = createAgentService(actions, state);

  createCommonService(agent, actions, state, setState);

  users = createUsersService(agent, actions, state, setState);

  const store: AppStoreContextValue = [state, actions as AppStoreActions];

  return <AppContext.Provider value={store}>{props.children}</AppContext.Provider>;
}

export function useAppStore() {
  return useContext(AppContext) as AppStoreContextValue;
}