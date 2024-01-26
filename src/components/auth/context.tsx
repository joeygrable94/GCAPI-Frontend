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
  splitProps,
  useContext
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { getRequestEvent, isServer } from 'solid-js/web';
import { getCookie } from 'vinxi/server';
import { OpenAPI } from '~/backend';
import {
  SecureLocalStorage as SLS,
  error,
  getCookie as getCookieClient
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
    auth0config.logoutUrl || `http://${import.meta.env.VITE_APP_BASE_URL}/`;
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
      token = getCookie(getRequestEvent()!, 'gcapi_auth');
      if (token?.length) {
        decrypted = AES.decrypt(token, import.meta.env.VITE_SESSION_SECRET).toString(
          encUTF8
        );
      }
    } else {
      token = getCookieClient('gcapi_auth');
      decrypted = AES.decrypt(token, import.meta.env.VITE_SESSION_SECRET).toString(
        encUTF8
      );
    }
    if (decrypted) {
      return JSON.parse(decrypted) as IAuthState;
    } else {
      return !isServer ? SLS.get('gcapi_auth') ?? defaultAuthState : defaultAuthState;
    }
  };
  const stored: IAuthState = getStoredState();
  const [state, setState] = createStore<IAuthState>(stored);
  const actions = {
    get webAuth() {
      // if (isServer) return;
      const webAuth: WebAuth = new auth0.WebAuth(webAuth0Config);
      return webAuth;
    },
    get organization() {
      return organization();
    },
    isAuthenticated: () => !!isAuthenticated(),
    isInitialized: () => isAuthenticated() !== undefined,
    authorize: async () => {
      // if (isServer) return;
      const webAuth: WebAuth = new auth0.WebAuth(webAuth0Config);
      await webAuth.authorize({ scope: scopes().join(' ') });
    },
    login: async () => {
      if (state.accessToken) {
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
          setIsAuthenticated(true);
        } catch (err: any) {
          error(err);
          if (err.name === 'JWTExpired' || err.code === 'ERR_JWT_EXPIRED') {
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
            error(err);
            setIsAuthenticated(false);
          }
        }
      } else {
        setIsAuthenticated(false);
      }
    },
    logout: async () => {
      // if (isServer) return;
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
    let newAuthState: UpdatedAuthState = await completeAuthorization(
      authCode()!,
      acState()!
    );
    setIsAuthenticated(newAuthState[0]);
    setState(newAuthState[1]);
    setAuthCode(undefined);
    setAcState(undefined);
    return navigate('/', { replace: true });
  };
  createEffect(() => getStoredState());
  createEffect(() => SLS.set('gcapi_auth', state));
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
