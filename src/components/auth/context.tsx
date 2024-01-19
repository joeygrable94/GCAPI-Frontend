import { useNavigate } from '@solidjs/router';
import auth0, { WebAuth } from 'auth0-js';
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
import { SecureLocalStorage as SLS, error, getCookie, log, warn } from '~/utils';
import { defaultAuthState } from './constants';
import {
  AuthContextValue,
  AuthProps,
  IAuthActions,
  IAuthState,
  Organization
} from './types';
import { auth0FetchOAuthToken, auth0UserInfo, refresh } from './utils';

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
  const [isAuthenticated, setIsAuthenticated] = createSignal<boolean | undefined>();
  const [organization, setOrg] = createSignal<Organization | undefined>();
  const navigate = useNavigate();
  const logoutUrl: string =
    auth0config.logoutUrl || `http://${import.meta.env.VITE_APP_BASE_URL}/`;
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
  if (auth0config.organization) setOrg(auth0config.organization);
  const webAuth: WebAuth = new auth0.WebAuth(webAuth0Config);
  const stored: IAuthState = (SLS.get('gcapi-auth') as IAuthState) ?? defaultAuthState;
  const [state, setState] = createStore<IAuthState>(stored);
  const actions = {
    get webAuth() {
      return webAuth;
    },
    get organization() {
      return organization();
    },
    isAuthenticated: () => !!isAuthenticated(),
    isInitialized: () => isAuthenticated() !== undefined,
    authorize: async () => {
      await webAuth.authorize({ scope: scopes.join(' ') });
    },
    completeAuthorization: async (code: string, state: string) => {
      let baseUrl = import.meta.env.VITE_BASE_URL;
      if (import.meta.env.VITE_DEBUG) {
        log('baseUrl', baseUrl);
      }
      const cookies = getCookie(`com.auth0.auth.${state}`);
      const verification = JSON.parse(cookies);
      if (!verification) {
        warn('No verification cookie found');
      }
      if (import.meta.env.VITE_DEBUG) {
        log('state verification');
        log(state);
        log(verification);
      }
      if (code === undefined || code === null) {
        error('No code found');
      }

      if (state !== verification.state) {
        error('Code and state do not match verification');
      }
      let redirectUrl = import.meta.env.VITE_AUTH0_REDIRECT_URI;
      const jsonAuthToken = await auth0FetchOAuthToken(
        code,
        state,
        redirectUrl,
        verification.organization
      );
      const userInfo = await auth0UserInfo(jsonAuthToken.access_token);
      if (import.meta.env.VITE_DEBUG) {
        log('auth0FetchOAuthToken');
        log(jsonAuthToken);
        log('auth0UserInfo');
        log(userInfo);
      }
      if (userInfo === undefined) {
        warn('No user info found');
      }
      setState('accessToken', jsonAuthToken.access_token);
      if (jsonAuthToken.refresh_token) {
        setState('refreshToken', jsonAuthToken.refresh_token);
      }
      setState('idToken', jsonAuthToken.id_token);
      setState('scope', jsonAuthToken.scope);
      setState('tokenType', jsonAuthToken.accessToken_type);
      setState('user', {
        sub: userInfo.sub,
        picture: userInfo.picture,
        email: userInfo.email,
        email_verified: userInfo.email_verified,
        created_on:
          userInfo['https://github.com/dorinclisu/fastapi-auth0/created_on'] ?? '',
        updated_on: userInfo.updated_at,
        roles: userInfo['https://github.com/dorinclisu/fastapi-auth0/roles'] ?? []
      });
      setState('userId', userInfo.sub);
      setState('orgId', userInfo.orgId);
      return navigate('/', { replace: true });
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
      await webAuth.logout({
        returnTo: logoutUrl,
        clientID: auth0config.clientId
      });
      setState(defaultAuthState);
      // await redirect('/login');
    }
  } as IAuthActions;
  onMount(() => {});
  createEffect(() => SLS.set('gcapi-auth', state));
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
