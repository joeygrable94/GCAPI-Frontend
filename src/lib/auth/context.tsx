import {
  createContext,
  createSignal,
  InitializedResource,
  ParentComponent,
  useContext
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { UserReadSafe } from '~/api';
import createAuthService from '~/lib/auth/service';
import {
  AuthorizedActions,
  AuthorizedContextValue,
  AuthorizedState
} from '~/lib/auth/types';
import { authenticate } from '~/lib/auth/utilities';
import { log } from '../core/utils';

const defaultCheckAuthorized: AuthorizedState = {
  currentUser: () => false,
  token: '',
  csrf: ''
};

const AuthorizedContext = createContext<AuthorizedContextValue>([
  defaultCheckAuthorized,
  {
    setAuthLoad: (s: boolean) => undefined,
    setToken: (token: string, csrf: string) => undefined,
    resetToken: () => undefined,
    authorizeUser: () => undefined,
    pullUser: () => undefined,
    fetchMe: () => undefined
  } as AuthorizedActions
]);

export const AuthorizedProvider: ParentComponent<{
  token?: '';
  csrf?: '';
}> = (props) => {
  log('AuthorizedProvider token', props.token);
  log('AuthorizedProvider CSRF', props.csrf);
  const [authLoaded, setAuthLoaded] = createSignal<boolean>(false);
  let currentUser: InitializedResource<boolean | UserReadSafe>;
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

  const actions: AuthorizedActions = {
    setAuthLoad: (s: boolean) => setAuthLoaded(s),
    setToken: (token: string, csrf: string) => undefined,
    resetToken: () => undefined,
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

export const useAuthorizedContext = () => useContext(AuthorizedContext);
