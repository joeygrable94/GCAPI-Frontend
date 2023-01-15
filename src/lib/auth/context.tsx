import {
  batch,
  createContext,
  createSignal,
  InitializedResource,
  ParentComponent,
  useContext
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { OpenAPI, UserReadSafe } from '~/api';
import createAuthService from '~/lib/auth/service';
import {
  AuthorizedActions,
  AuthorizedContextValue,
  AuthorizedState
} from '~/lib/auth/types';
import { authenticate } from '~/lib/auth/utilities';
import { API_URL_BASE, log } from '../core/utils';

// default authorized state
const defaultCheckAuthorized: AuthorizedState = {
  authLoadState: () => false,
  currentUser: () => false,
  token: '',
  csrf: ''
};

// authorized context
const AuthorizedContext = createContext<AuthorizedContextValue>([
  defaultCheckAuthorized,
  {
    setApiBaseUrl: (s: string) => undefined,
    setAuthLoad: (s: boolean) => undefined,
    setToken: (token: string, csrf: string) => undefined,
    resetToken: () => undefined,
    authorizeUser: () => undefined,
    pullUser: () => undefined,
    fetchMe: () => undefined
  } as AuthorizedActions
]);

// authorized provider
export const AuthorizedProvider: ParentComponent<{
  token?: string | undefined;
  csrf?: string | undefined;
}> = (props: any) => {
  // ensure initial token and csrf are strings
  if (props.token === undefined) props.token = '';
  if (props.csrf === undefined) props.csrf = '';
  // auth state flag
  const [authLoaded, setAuthLoaded] = createSignal<boolean>(false);
  // service: current user
  let currentUser: InitializedResource<boolean | UserReadSafe>;
  // state store
  const [state, setState] = createStore({
    get authLoadState() {
      return authLoaded();
    },
    get currentUser() {
      return currentUser;
    },
    token: props.token ?? defaultCheckAuthorized.token,
    csrf: props.csrf ?? defaultCheckAuthorized.csrf
  });
  // store actions
  const actions: AuthorizedActions = {
    setApiBaseUrl: (s: string = API_URL_BASE) => (OpenAPI.BASE = s),
    setAuthLoad: (s: boolean) => setAuthLoaded(s),
    setToken: (token: string, csrf: string) => {
      setState('token', token);
      setState('csrf', csrf);
      OpenAPI.TOKEN = token;
    },
    resetToken: () => {
      batch(actions.setToken('', ''));
    },
    authorizeUser: async (form: FormData) => await authenticate(form),
    pullUser: () => undefined,
    fetchMe: () => undefined
  };
  // init current authorized user service
  currentUser = createAuthService(actions, state, setState);
  // return the authorized context provider
  return (
    <AuthorizedContext.Provider value={[state, actions]}>
      {props.children}
    </AuthorizedContext.Provider>
  );
};

// use the authorized context provider
export const useAuthorizedContext = () => useContext(AuthorizedContext);
