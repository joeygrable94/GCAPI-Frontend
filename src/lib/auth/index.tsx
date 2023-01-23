import {
  batch,
  createContext,
  createSignal,
  InitializedResource,
  ParentComponent,
  useContext
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { OpenAPI, UserAdmin, UserRead } from '~/api';
import createAuthService from '~/lib/auth/serviceAuth';
import {
  AuthorizedActions,
  AuthorizedContextValue,
  AuthorizedState
} from '~/lib/auth/types';
import { authenticate } from '~/lib/auth/utilities';
import { API_URL_BASE } from '../core/utils';

const defaultCheckAuthorized: AuthorizedState = {
  authLoadState: () => false,
  currentUser: () => false,
  token: '',
  csrf: ''
};

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
  }
]);

export const AuthorizedProvider: ParentComponent<{
  token?: string | undefined;
  csrf?: string | undefined;
}> = (props: any) => {
  if (props.token === undefined) props.token = '';
  if (props.csrf === undefined) props.csrf = '';

  const [authLoaded, setAuthLoaded] = createSignal<boolean>(false);

  let currentUser: InitializedResource<boolean | UserAdmin | UserRead>;

  const [state, setState] = createStore<AuthorizedState>({
    get authLoadState() {
      return authLoaded();
    },
    get currentUser() {
      return currentUser;
    },
    token: props.token ?? defaultCheckAuthorized.token,
    csrf: props.csrf ?? defaultCheckAuthorized.csrf
  });

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

  currentUser = createAuthService(actions, state, setState);

  return (
    <AuthorizedContext.Provider value={[state, actions]}>
      {props.children}
    </AuthorizedContext.Provider>
  );
};

// use the authorized context provider
export const useAuthorizedContext = () => useContext(AuthorizedContext);
