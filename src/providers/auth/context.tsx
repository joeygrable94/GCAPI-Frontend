import auth0, { WebAuth } from 'auth0-js';
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
import { OpenAPI } from '~/shared/api';
import { log, logError } from '~/shared/utils';
import { defaultAuthConfig } from './constants';
import {
  AuthConfig,
  AuthConfigActions,
  AuthConfigProps,
  AuthContextProvider,
  AuthOrganization
} from './types';
import { refreshAuthorization } from './utils';

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
    'invitation'
  ]);
  const [auth, setAuth] = createStore<AuthConfig>(authConfig.initialAuth);
  const [isAuthenticated, setIsAuthenticated] = createSignal<boolean | undefined>();
  const [organization, setOrg] = createSignal<AuthOrganization | undefined>();
  const [scopes, setScopes] = createSignal<string[]>(['openid', 'profile', 'email']);
  if (import.meta.env.VITE_AUTH0_OFFLINE_ACCESS === 'true')
    setScopes((s) => [...s, 'offline_access']);
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
      const webAuth: WebAuth = new auth0.WebAuth(webauthConfig);
      return webAuth;
    },
    get organization() {
      return organization();
    },
    isInitialized: () => isAuthenticated() !== undefined,
    isAuthenticated: () => !!isAuthenticated(),
    authorize: async () => {
      const webAuth: WebAuth = new auth0.WebAuth(webauthConfig);
      await webAuth.authorize({ scope: scopes().join(' ') });
    },
    login: async () => {
      if (import.meta.env.VITE_DEBUG) log('Attempting to log in...');
      if (auth.accessToken) {
        if (import.meta.env.VITE_DEBUG) log('Logging in via state access token...');
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
          if (import.meta.env.VITE_DEBUG) log('Login successful!');
          setIsAuthenticated(true);
        } catch (err: any) {
          if (err.name === 'JWTExpired' || err.code === 'ERR_JWT_EXPIRED') {
            if (import.meta.env.VITE_DEBUG) logError('Login expired error:', err);
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
            if (import.meta.env.VITE_DEBUG) logError('Login error:', err);
            setIsAuthenticated(false);
            setAuth(defaultAuthConfig);
          }
        }
      } else {
        if (import.meta.env.VITE_DEBUG) log('The state has no access token set...');
        setIsAuthenticated(false);
      }
    },
    logout: async () => {
      const webAuth: WebAuth = new auth0.WebAuth(webauthConfig);
      await webAuth.logout({
        returnTo: logoutUrl,
        clientID: authConfig.clientId
      });
      setAuth(defaultAuthConfig);
    }
  };
  // initialize client login
  onMount(async () => {
    if (!actions.isAuthenticated()) await actions.login();
  });
  // Set backend api token
  OpenAPI.TOKEN = authConfig.initialAuth.accessToken;
  createEffect(async () => {
    if (import.meta.env.VITE_DEBUG) log('Setting OpenAPI token...');
    OpenAPI.TOKEN = await auth.accessToken;
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
