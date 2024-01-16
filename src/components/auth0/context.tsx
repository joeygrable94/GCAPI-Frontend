import { redirect } from '@solidjs/router';
import auth0 from 'auth0-js';
import * as jose from 'jose';
import {
  ParentComponent,
  createContext,
  createSignal,
  splitProps,
  useContext
} from 'solid-js';
import { getRequestEvent, isServer } from 'solid-js/web';
import { setCookie } from 'vinxi/server';
import { UserInfo, UserSessionData, getSession } from '~/api/server';
import refresh from './refresh';
import { AuthContext, AuthProps, Organization } from './types';

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
  const cookies = !isServer ? document.cookie : null;
  const logoutUrl: string =
    auth0config.logoutUrl || `${import.meta.env.VITE_APP_BASE_URL}/auth/logout`;

  const [isAuthenticated, setIsAuthenticated] = createSignal<boolean>(false);
  const [user, setUser] = createSignal<UserInfo | undefined>(undefined);
  const [accessToken, setAccessToken] = createSignal<string>('');
  const [idToken, setIdToken] = createSignal<string>('');
  const [userId, setUserId] = createSignal<string>('');
  const [organization, setOrganization] = createSignal<Organization | undefined>(
    undefined
  );

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
    responseType: 'code'
  };

  if (auth0config.organization) {
    setOrganization(auth0config.organization);
  }

  const webAuthn = new auth0.WebAuth(webAuth0Config);

  return {
    auth0Client: webAuthn,
    isAuthenticated: () => !!isAuthenticated(),
    isInitialized: () => isAuthenticated() !== undefined,
    organization,
    user,
    userId,
    idToken,
    accessToken,
    async authorize() {
      await webAuthn.authorize({ scope: scopes.join(' ') });
    },
    async login() {
      const session = await getSession();
      if (import.meta.env.VITE_DEBUG) {
        console.log('Session:');
        console.log(session);
      }
      if (session.data.userId && session.data.accessToken) {
        const jwt = session.data.accessToken;
        const JWKS = jose.createRemoteJWKSet(
          new URL(`https://${auth0config.domain}/.well-known/jwks.json`)
        );
        try {
          // Throws if the token is invalid
          await jose.jwtVerify(jwt, JWKS, {
            issuer: `https://${auth0config.domain}/`,
            audience: auth0config.audience
          });
          setAccessToken(session.data.accessToken);
          setIdToken(session.data.idToken);
          setUserId(session.data.userId);
          setUser(session.data.userInfo);
          setIsAuthenticated(true);
        } catch (err: any) {
          console.error(err);
          if (err.name === 'JWTExpired' || err.code === 'ERR_JWT_EXPIRED') {
            const refreshToken = session.data.refreshToken;
            if (refreshToken) {
              const tokens = await refresh(refreshToken);

              await session.update(
                (d: UserSessionData) => (d.accessToken = tokens.access_token)
              );
              await session.update(
                (d: UserSessionData) => (d.idToken = tokens.id_token)
              );
              setCookie(getRequestEvent()!, 'gcapi-auth0', session.id!);

              setAccessToken(tokens.access_token);
              setIdToken(tokens.access_token);
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
    async logout() {
      await webAuthn.logout({
        returnTo: logoutUrl,
        clientID: auth0config.clientId
      });
      await redirect('/login');
    }
  } as AuthContext;
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
