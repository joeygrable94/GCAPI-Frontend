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
import { decryptData, encryptData, setOpenApiToken } from '~/shared/utils';

export const AuthConfigContext = createContext<AuthContextProvider>();

export const AuthProvider = (props: AuthConfigProps) => {
  const [isAuthenticated, setIsAuthenticated] = createSignal<boolean | undefined>();
  const [authMode, setAuthMode] = createSignal<AuthMode>('server');
  const [authOptions] = splitProps(props, ['accessToken', 'refreshToken', 'expires']);
  const [state, setState] = makePersisted(
    createStore<AuthConfig>({
      accessToken: authOptions.accessToken ?? '',
      refreshToken: authOptions.refreshToken ?? '',
      expires: authOptions.expires ? new Date(authOptions.expires) : undefined
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
    setAccess: (
      accessToken: string,
      refreshToken: string,
      expires: Date | string | undefined
    ) => {
      setState({
        accessToken: accessToken,
        refreshToken: refreshToken,
        expires: expires
          ? typeof expires === 'string'
            ? new Date(expires)
            : expires
          : undefined
      });
      setIsAuthenticated(true);
    },
    revokeAccess: () => {
      setState({
        accessToken: undefined,
        refreshToken: undefined,
        expires: undefined
      });
      setIsAuthenticated(false);
    }
  };
  const setAuthProviderOpenApiToken = async (mode: AuthMode) => {
    setAuthMode(mode);
    if (authOptions.accessToken !== undefined && authOptions.accessToken?.length > 0) {
      setOpenApiToken(mode, authOptions.accessToken);
      setIsAuthenticated(true);
    }
    if (state.accessToken !== undefined && state.accessToken?.length > 0) {
      setOpenApiToken(mode, state.accessToken);
      setIsAuthenticated(true);
    }
  };
  if (isServer) {
    setAuthProviderOpenApiToken('server');
  } else {
    setAuthProviderOpenApiToken('client');
  }
  onMount(() => setAuthProviderOpenApiToken('mount'));
  createEffect(() => setAuthProviderOpenApiToken('effect'));
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
