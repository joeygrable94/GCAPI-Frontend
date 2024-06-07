import { cookieStorage, makePersisted } from '@solid-primitives/storage';
import {
  createContext,
  createEffect,
  createSignal,
  onMount,
  splitProps,
  useContext
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { isServer } from 'solid-js/web';
import {
  AuthConfig,
  AuthConfigActions,
  AuthConfigProps,
  AuthContextProvider,
  AuthMode
} from '~/providers/auth';
import { OpenAPI } from '~/shared/api';
import { decryptData, encryptData } from '~/shared/utils';

export const AuthConfigContext = createContext<AuthContextProvider>();

export const AuthProvider = (props: AuthConfigProps) => {
  const [isAuthenticated, setIsAuthenticated] = createSignal<boolean | undefined>();
  const [authMode, setAuthMode] = createSignal<AuthMode>('server');
  const [authOptions] = splitProps(props, ['accessToken', 'refreshToken', 'expiresAt']);
  const [state, setState] = makePersisted(
    createStore<AuthConfig>({
      accessToken: authOptions.accessToken,
      refreshToken: authOptions.refreshToken,
      expiresAt: authOptions.expiresAt ? new Date(authOptions.expiresAt) : undefined
    }),
    {
      name: 'gcapi-auth',
      storage: cookieStorage,
      serialize: encryptData,
      deserialize: decryptData
    }
  );
  const actions: AuthConfigActions = {
    isInitialized: () => isAuthenticated() !== undefined,
    isAuthenticated: () => !!isAuthenticated(),
    getAuthMode: () => authMode(),
    setAccess: (accessToken: string, refreshToken: string, expires: string) => {
      setState({
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresAt: new Date(expires)
      });
      setIsAuthenticated(true);
    },
    revokeAccess: () => {
      setState({
        accessToken: undefined,
        refreshToken: undefined,
        expiresAt: undefined
      });
      setIsAuthenticated(false);
    }
  };
  const setOpenApiToken = (mode: AuthMode) => {
    setAuthMode(mode);
    if (authOptions.accessToken !== undefined && authOptions.accessToken?.length > 0) {
      OpenAPI.TOKEN = authOptions.accessToken;
    } else if (state.accessToken !== undefined && state.accessToken?.length > 0) {
      OpenAPI.TOKEN = state.accessToken;
    }
    // console.log(
    //   `SESSION TOKEN ${mode}`,
    //   OpenAPI.TOKEN?.length,
    //   authOptions.accessToken?.length,
    //   state.accessToken?.length
    // );
  };
  if (isServer) setOpenApiToken('server');
  onMount(() => setOpenApiToken('mount'));
  createEffect(() => setOpenApiToken('effect'));
  const store: AuthContextProvider = [state, actions];
  return (
    <AuthConfigContext.Provider value={store}>
      {props.children}
    </AuthConfigContext.Provider>
  );
};

export default AuthProvider;

export function useAuth(): AuthContextProvider {
  const ctx = useContext(AuthConfigContext);
  if (!ctx) throw new Error('<AuthProvider> not found wrapping the <App />.');
  return ctx as AuthContextProvider;
}
