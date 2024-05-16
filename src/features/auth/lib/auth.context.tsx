import auth0 from 'auth0-js';
import * as jose from 'jose';
import {
  createContext,
  createEffect,
  createSignal,
  onMount,
  splitProps,
  useContext
} from 'solid-js';
import { createStore } from 'solid-js/store';
import {
  AuthConfig,
  AuthConfigActions,
  AuthConfigProps,
  AuthContextProvider,
  AuthOrganization,
  defaultAuthConfig,
  refreshAuthorization
} from '~/features/auth';
import { ApiError, OpenAPI } from '~/shared/api';
import { log, logError } from '~/shared/utils';

export const AuthConfigContext = createContext<AuthContextProvider>();

export const AuthProvider = (props: AuthConfigProps) => {
  const [authConfig] = splitProps(props, [
    'initialAuth',
    'domain',
    'clientId',
    'audience',
    'redirectUri',
    'logoutUrl',
    'organization',
    'invitation',
    'offlineAccess'
  ]);
  const [auth, setAuth] = createStore<AuthConfig>(authConfig.initialAuth);
  const [isAuthenticated, setIsAuthenticated] = createSignal<boolean | undefined>();
  const [organization, setOrg] = createSignal<AuthOrganization | undefined>();
  const [scopes, setScopes] = createSignal<string[]>(['openid', 'profile', 'email']);
  if (authConfig.offlineAccess) setScopes((s) => [...s, 'offline_access']);
  const baseUrl: string = import.meta.env.VITE_APP_BASE_URL;
  const logoutUrl: string = authConfig.logoutUrl || `http://${baseUrl}/auth/logout`;
  const webauthConfig: auth0.AuthOptions = {
    _sendTelemetry: false,
    domain: authConfig.domain,
    clientID: authConfig.clientId,
    audience: authConfig.audience,
    redirectUri: authConfig.redirectUri,
    responseType: 'code'
  };
  if (authConfig.organization) setOrg(authConfig.organization);
  const actions: AuthConfigActions = {
    get webAuth() {
      return webauthConfig;
    },
    get logoutUrl() {
      return logoutUrl;
    },
    get organization() {
      return organization();
    },
    get scopes() {
      return scopes();
    },
    isInitialized: () => isAuthenticated() !== undefined,
    isAuthenticated: () => !!isAuthenticated(),
    login: async () => {
      if (import.meta.env.VITE_DEBUG === 'true') log('Attempting to log in...');
      if (auth.accessToken) {
        if (import.meta.env.VITE_DEBUG === 'true')
          log('Logging in via state access token...');
        const jwt = auth.accessToken;
        const JWKS = jose.createRemoteJWKSet(
          new URL(`https://${authConfig.domain}/.well-known/jwks.json`)
        );
        try {
          // Throws if the token is invalid
          await jose.jwtVerify(jwt, JWKS, {
            issuer: `https://${authConfig.domain}/`,
            audience: authConfig.audience
          });
          if (import.meta.env.VITE_DEBUG === 'true') log('Login successful!');
          setIsAuthenticated(true);
        } catch (err: any) {
          if (err.name === 'JWTExpired' || err.code === 'ERR_JWT_EXPIRED') {
            if (import.meta.env.VITE_DEBUG === 'true')
              logError('Login expired error:', err);
            const refreshToken = auth.refreshToken;
            if (refreshToken) {
              const tokens = await refreshAuthorization(refreshToken);
              setAuth('accessToken', tokens.access_token);
              setAuth('idToken', tokens.id_token);
              setIsAuthenticated(true);
            } else {
              setIsAuthenticated(false);
              setAuth(defaultAuthConfig);
            }
          } else {
            if (import.meta.env.VITE_DEBUG === 'true') logError('Login error:', err);
            setIsAuthenticated(false);
            setAuth(defaultAuthConfig);
          }
        }
      } else {
        if (import.meta.env.VITE_DEBUG === 'true')
          log('The state has no access token set...');
        setIsAuthenticated(false);
      }
    },
    logout: async () => {
      setAuth(defaultAuthConfig);
    }
  };
  // initialize client login
  onMount(async () => {
    if (!actions.isAuthenticated()) await actions.login();
  });
  // Set backend api token
  OpenAPI.TOKEN = authConfig.initialAuth.accessToken;
  createEffect(() => {
    if (import.meta.env.VITE_DEBUG === 'true') log('Setting OpenAPI token...');
    OpenAPI.TOKEN = auth.accessToken;
  });
  // Set state & return context provider
  const state: AuthContextProvider = [auth, actions];
  return (
    <AuthConfigContext.Provider value={state}>
      {props.children}
    </AuthConfigContext.Provider>
  );
};

export default AuthProvider;

export function useAuth0(): AuthContextProvider {
  const ctx = useContext(AuthConfigContext);
  if (!ctx) throw new Error('<AuthProvider> not found wrapping the <App />.');
  return ctx as AuthContextProvider;
}
