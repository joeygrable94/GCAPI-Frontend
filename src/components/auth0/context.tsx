import auth0, { WebAuth } from 'auth0-js';
import * as jose from 'jose';
import {
  createContext,
  createEffect,
  createResource,
  createSignal,
  splitProps,
  useContext
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { getRequestEvent, isServer } from 'solid-js/web';
import { getCookie, setCookie } from 'vinxi/server';
import { OpenAPI, UsersService } from '~/backend';
import {
  error,
  getCookie as getCookieClient,
  log,
  setCookie as setCookieClient
} from '~/utils';
import { AUTH_COOKIE_MAX_AGE, defaultAuthConfig } from './constants';
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
  const [currentUser, { refetch }] = createResource(
    () => {
      return auth.accessToken.length && OpenAPI.TOKEN?.length;
    },
    UsersService.usersCurrentApiV1UsersMeGet,
    {
      initialValue: undefined
    }
  );
  const actions: AuthConfigActions = {
    get currentUser() {
      return currentUser();
    },
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
            if (import.meta.env.VITE_DEBUG) error('Login expired error:', err);
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
            if (import.meta.env.VITE_DEBUG) error('Login error:', err);
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
  // initialize server login and refetch user
  if (isServer && !actions.isAuthenticated()) actions.login();
  // initialize client login
  createEffect(async () => {
    if (!actions.isAuthenticated()) await actions.login();
  });
  // Set backend api token and fetch user
  createEffect(async () => {
    if (import.meta.env.VITE_DEBUG) log('Setting OpenAPI token...');
    OpenAPI.TOKEN = await auth.accessToken;
    if (import.meta.env.VITE_DEBUG) log('Fetching current user...');
    await refetch();
  });
  // Save cookie
  createEffect(() => {
    const serialized = JSON.stringify(auth);
    if (isServer) {
      if (import.meta.env.VITE_DEBUG) log('Set server auth cookie...');
      setCookie(getRequestEvent()!, 'gcapi_auth', serialized, {
        maxAge: AUTH_COOKIE_MAX_AGE
      });
    } else {
      if (import.meta.env.VITE_DEBUG) log('Set client auth cookie...');
      setCookieClient('gcapi_auth', serialized, AUTH_COOKIE_MAX_AGE);
    }
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

export function useAuthCookie(name: string = 'gcapi_auth') {
  let token: string | undefined;
  if (isServer) {
    token = getCookie(getRequestEvent()!, name);
  } else {
    token = getCookieClient(name);
  }
  if (token?.length) {
    return JSON.parse(token) as AuthConfig;
  }
  return defaultAuthConfig;
}
