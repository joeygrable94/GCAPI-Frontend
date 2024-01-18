import auth0, {
  Auth0DecodedHash,
  Auth0Error,
  Auth0ParseHashError,
  Auth0UserProfile,
  WebAuth
} from 'auth0-js';
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
import { SecureLocalStorage as SLS, log, warn } from '~/utils';
import { defaultAuthState } from './constants';
import { AuthContextValue, AuthProps, IAuthActions, IAuthState } from './types';
import { refresh } from './utils';

function createAuthState(props: AuthProps): AuthContextValue {
  const [auth0config] = splitProps(props, [
    'domain',
    'clientId',
    'audience',
    'redirectUri',
    'logoutUrl',
    'organization',
    'invitation'
  ]);
  const logoutUrl: string =
    auth0config.logoutUrl || `${import.meta.env.VITE_APP_BASE_URL}/logout`;
  const scopes = ['openid', 'profile', 'email'];
  if (import.meta.env.VITE_AUTH0_OFFLINE_ACCESS === 'true') {
    scopes.push('offline_access');
  }
  const webAuth0Config: auth0.AuthOptions = {
    _sendTelemetry: false,
    domain: auth0config.domain,
    clientID: auth0config.clientId,
    audience: auth0config.audience,
    redirectUri: auth0config.redirectUri,
    responseType: 'code' // 'token id_token'
  };
  const webAuth: WebAuth = new auth0.WebAuth(webAuth0Config);
  const [isAuthenticated, setIsAuthenticated] = createSignal<boolean | undefined>();
  const stored: IAuthState = (SLS.get('gcapi-auth') as IAuthState) ?? defaultAuthState;
  const [state, setState] = createStore<IAuthState>(stored);
  const actions = {
    get webAuth() {
      return webAuth;
    },
    isAuthenticated: () => !!isAuthenticated(),
    isInitialized: () => isAuthenticated() !== undefined,
    authorize: async () => {
      await webAuth.authorize({ scope: scopes.join(' ') });
    },
    login: async () => {
      if (state.userId && state.accessToken) {
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
          console.error(err);
          if (err.name === 'JWTExpired' || err.code === 'ERR_JWT_EXPIRED') {
            const refreshToken = state.refreshToken;
            if (refreshToken) {
              const tokens = await refresh(refreshToken);
              setState((d: IAuthState) => (d.accessToken = tokens.access_token));
              setState((d: IAuthState) => (d.idToken = tokens.id_token));
              setIsAuthenticated(true);
            } else {
              setIsAuthenticated(false);
            }
          } else {
            console.error(err);
            setIsAuthenticated(false);
          }
        }
      } else {
        setIsAuthenticated(false);
      }
    },
    logout: async () => {
      await webAuth.logout({
        returnTo: logoutUrl,
        clientID: auth0config.clientId
      });
      setState(defaultAuthState);
      // await redirect('/login');
    },
    captureAuth: async () => {
      try {
        await webAuth.parseHash(
          async (
            err: Auth0ParseHashError | null,
            authResult: Auth0DecodedHash | null
          ) => {
            if (err) throw err;
            if (!authResult) throw authResult;
            if (authResult.accessToken === undefined)
              throw new Error('No access token');
            await webAuth.client.userInfo(
              authResult.accessToken,
              (err: Auth0Error | null, user: Auth0UserProfile) => {
                if (err) throw err;
                log('Auth Capture Callback:', user);
                setIsAuthenticated(true);
                setState({
                  accessToken: authResult.accessToken,
                  refreshToken: authResult.refreshToken ?? '',
                  idToken: authResult.idToken ?? '',
                  userId: user.user_id,
                  state: authResult.state,
                  nonce: authResult.idTokenPayload.nonce,
                  sub: authResult.idTokenPayload.sub,
                  expires: authResult.expiresIn,
                  user: user
                } as IAuthState);
              }
            );
          }
        );
      } catch (e: Auth0ParseHashError | Auth0Error | Error | any) {
        setIsAuthenticated(false);
        warn('Auth Capture Error:', e);
      }
      setState(defaultAuthState);
    }
  } as IAuthActions;
  createEffect(async () => await actions.captureAuth());
  createEffect(() => SLS.set('gcapi_auth0', state));
  return [state, actions] as AuthContextValue;
}

const Auth0Context = createContext<ReturnType<typeof createAuthState>>();

const Auth0: ParentComponent<AuthProps> = (props) => {
  const state: AuthContextValue = createAuthState(props);
  return <Auth0Context.Provider value={state}>{props.children}</Auth0Context.Provider>;
};

export default Auth0;

export function useAuth0(): AuthContextValue {
  const ctx = useContext(Auth0Context);
  if (!ctx) throw new Error('<Auth0> not found wrapping the <App />.');
  return ctx as AuthContextValue;
}
