import { useLocation, useNavigate } from '@solidjs/router';
import auth0, { WebAuth } from 'auth0-js';
import { AES } from 'crypto-js';
import encUTF8 from 'crypto-js/enc-utf8';
import * as jose from 'jose';
import {
  ParentComponent,
  createContext,
  createEffect,
  createSignal,
  onMount,
  splitProps,
  useContext
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { getRequestEvent, isServer } from 'solid-js/web';
import { getCookie, setCookie } from 'vinxi/server';
import { OpenAPI } from '~/backend';
import {
  error,
  getCookie as getCookieClient,
  log,
  setCookie as setCookieClient
} from '~/utils';
import { defaultAuthState } from './constants';
import {
  AuthContext,
  AuthProps,
  IAuthActions,
  IAuthState,
  Organization,
  UpdatedAuthState
} from './types';
import { completeAuthorization, refresh } from './utils';

function createAuthState(props: AuthProps): AuthContext {
  const [auth0config] = splitProps(props, [
    'domain',
    'clientId',
    'audience',
    'redirectUri',
    'logoutUrl',
    'organization',
    'invitation'
  ]);
  const navigate = useNavigate();
  const location = useLocation();
  const [authCode, setAuthCode] = createSignal<string | undefined>(location.query.code);
  const [acState, setAcState] = createSignal<string | undefined>(location.query.state);
  const [isAuthenticated, setIsAuthenticated] = createSignal<boolean | undefined>();
  const [organization, setOrg] = createSignal<Organization | undefined>();
  const [scopes, setScopes] = createSignal<string[]>(['openid', 'profile', 'email']);
  const logoutUrl: string =
    auth0config.logoutUrl || `http://${import.meta.env.VITE_APP_BASE_URL}/auth/logout`;
  if (import.meta.env.VITE_AUTH0_OFFLINE_ACCESS === 'true')
    setScopes((s) => [...s, 'offline_access']);
  const webAuth0Config: auth0.AuthOptions = {
    _sendTelemetry: false,
    domain: auth0config.domain,
    clientID: auth0config.clientId,
    audience: auth0config.audience,
    redirectUri: auth0config.redirectUri,
    responseType: 'code'
  };
  if (auth0config.organization) setOrg(auth0config.organization);
  const getStoredState = (): IAuthState => {
    let token: string | undefined;
    let decrypted: string | undefined;
    if (isServer) {
      // check for token on server
      if (import.meta.env.VITE_DEBUG) log('Getting stored state from server...');
      token = getCookie(getRequestEvent()!, 'gcapi_auth');
      if (token?.length) {
        decrypted = AES.decrypt(token, import.meta.env.VITE_SESSION_SECRET).toString(
          encUTF8
        );
        if (decrypted) {
          return JSON.parse(decrypted) as IAuthState;
        }
      }
      if (import.meta.env.VITE_DEBUG) log('Loading default state from server...');
      return defaultAuthState;
    } else {
      // check for token in client cookies then local storage
      token = getCookieClient('gcapi_auth');
      decrypted = AES.decrypt(token, import.meta.env.VITE_SESSION_SECRET).toString(
        encUTF8
      );
      if (decrypted) {
        if (import.meta.env.VITE_DEBUG)
          log('Getting stored state from client cookies...');
        return JSON.parse(decrypted) as IAuthState;
      }
      if (import.meta.env.VITE_DEBUG) log('Loading default state from client...');
      return defaultAuthState;
    }
  };
  const resetAuthCookie = () => {
    if (isServer) {
      if (import.meta.env.VITE_DEBUG) log('Reset authorization on server...');
      setCookie(getRequestEvent()!, 'gcapi_auth', JSON.stringify(defaultAuthState), {
        encode: (v) => AES.encrypt(v, import.meta.env.VITE_SESSION_SECRET).toString()
      });
    } else {
      if (import.meta.env.VITE_DEBUG) log('Reset authorization on client...');
      setCookieClient(
        'gcapi_auth',
        AES.encrypt(
          JSON.stringify(defaultAuthState),
          import.meta.env.VITE_SESSION_SECRET
        ).toString(),
        86400
      );
    }
  };
  const stored: IAuthState = getStoredState();
  const [state, setState] = createStore<IAuthState>(stored);
  const actions = {
    get webAuth() {
      const webAuth: WebAuth = new auth0.WebAuth(webAuth0Config);
      return webAuth;
    },
    get organization() {
      return organization();
    },
    isInitialized: () => isAuthenticated() !== undefined,
    isAuthenticated: () => !!isAuthenticated(),
    authorize: async () => {
      const webAuth: WebAuth = new auth0.WebAuth(webAuth0Config);
      await webAuth.authorize({ scope: scopes().join(' ') });
    },
    login: async () => {
      if (import.meta.env.VITE_DEBUG) log('Attempting to log in...');
      if (state.accessToken) {
        if (import.meta.env.VITE_DEBUG) log('Logging in via state access token...');
        const jwt = state.accessToken;
        const JWKS = jose.createRemoteJWKSet(
          new URL(`https://${auth0config.domain}/.well-known/jwks.json`)
        );
        try {
          // Throws if the token is invalid
          await jose.jwtVerify(jwt, JWKS, {
            issuer: `https://${auth0config.domain}/`,
            audience: auth0config.audience
          });
          if (import.meta.env.VITE_DEBUG) log('Login successful!');
          setIsAuthenticated(true);
        } catch (err: any) {
          resetAuthCookie();
          if (err.name === 'JWTExpired' || err.code === 'ERR_JWT_EXPIRED') {
            if (import.meta.env.VITE_DEBUG) error('Login expired error:', err);
            const refreshToken = state.refreshToken;
            if (refreshToken) {
              const tokens = await refresh(refreshToken);
              setState('accessToken', tokens.access_token);
              setState('idToken', tokens.id_token);
              setIsAuthenticated(true);
            } else {
              setIsAuthenticated(false);
            }
          } else {
            if (import.meta.env.VITE_DEBUG) error('Login error:', err);
            setIsAuthenticated(false);
          }
        }
      } else {
        if (import.meta.env.VITE_DEBUG) log('The state has no access token set...');
        setIsAuthenticated(false);
      }
    },
    logout: async () => {
      const webAuth: WebAuth = new auth0.WebAuth(webAuth0Config);
      await webAuth.logout({
        returnTo: logoutUrl,
        clientID: auth0config.clientId
      });
      setState(defaultAuthState);
    }
  } as IAuthActions;
  const verifyAuthCode = async () => {
    if (acState() === undefined) return;
    if (authCode() === undefined) return;
    const cookies = getCookieClient(`com.auth0.auth.${state}`);
    const verification = JSON.parse(cookies);
    const url = isServer
      ? new URL('http://localhost.com/')
      : new URL(window.location.href);
    if (import.meta.env.VITE_DEBUG) log('Verifying auth code...');
    let [authenticated, newAuthState]: UpdatedAuthState = await completeAuthorization(
      authCode()!,
      acState()!,
      verification,
      url
    );
    setIsAuthenticated(authenticated);
    setState(newAuthState);
    setAuthCode(undefined);
    setAcState(undefined);
    return navigate('/', { replace: true });
  };
  if (isServer) {
    if (import.meta.env.VITE_DEBUG) log('Login server side?');
    if (!actions.isAuthenticated()) {
      actions.login();
    }
    if (!actions.isAuthenticated()) {
      setState(defaultAuthState);
    }
  }
  onMount(async () => {
    if (import.meta.env.VITE_DEBUG) log('Login client side?');
    if (!actions.isAuthenticated()) await actions.login();
  });
  createEffect(() => getStoredState());
  createEffect(async () => await verifyAuthCode());
  createEffect(() => (OpenAPI.TOKEN = state.accessToken));

  return [state, actions] as AuthContext;
}

const Auth0Context = createContext<ReturnType<typeof createAuthState>>();

const Auth0: ParentComponent<AuthProps> = (props) => {
  const state: AuthContext = createAuthState(props);
  return <Auth0Context.Provider value={state}>{props.children}</Auth0Context.Provider>;
};

export default Auth0;

export function useAuth0(): AuthContext {
  const ctx = useContext(Auth0Context);
  if (!ctx) throw new Error('<Auth0> not found wrapping the <App />.');
  return ctx as AuthContext;
}
