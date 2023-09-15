import { useNavigate } from '@solidjs/router';
import {
  Auth0DecodedHash,
  Auth0Error,
  Auth0ParseHashError,
  Auth0UserProfile
} from 'auth0-js';
import {
  createContext,
  createEffect,
  createSignal,
  onMount,
  ParentComponent,
  useContext
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { log, SecureLocalStorage, warn } from '~/utilities';
import { auth0Client } from './client';
import { AuthContextValue, AuthLogin, AuthRegister, IAuthState } from './types';

function createAuthState() {
  const navigate = useNavigate();

  const stored: IAuthState = SecureLocalStorage.get('gcapi_auth0')
    ? (SecureLocalStorage.get('gcapi_auth0') as IAuthState)
    : ({
        access: '',
        state: '',
        nonce: '',
        sub: '',
        expires: 0,
        user: null
      } as IAuthState);
  const [state, setState] = createStore<IAuthState>(stored);
  const [authReady, setAuthReady] = createSignal<boolean>(false);
  const captureAuth = () => {
    try {
      auth0Client.parseHash(
        (err: Auth0ParseHashError | null, authResult: Auth0DecodedHash | null) => {
          if (err) throw new Error('Auth context error:' + err.description);
          if (!authResult) throw new Error('Unauthenticated User');
          const token = authResult.accessToken ? authResult.accessToken : '';
          auth0Client.client.userInfo(
            token,
            (err: Auth0Error | null, user: Auth0UserProfile) => {
              if (err) throw new Error('Auth context error:' + err.description);
              setState((_) => {
                return {
                  access: authResult.accessToken,
                  state: authResult.state,
                  nonce: authResult.idTokenPayload.nonce,
                  sub: authResult.idTokenPayload.sub,
                  expires: authResult.expiresIn,
                  user: user
                } as IAuthState;
              });
            }
          );
        }
      );
    } catch (e: Auth0ParseHashError | Auth0Error | Error | any) {
      warn('Auth Capture Error:', e);
    } finally {
      setAuthReady(true);
    }
  };

  onMount(() => {
    log('Auth:', SecureLocalStorage.get('gcapi_auth0'));
  });

  createEffect(() => {
    captureAuth();
    SecureLocalStorage.set('gcapi_auth0', state);
    log(authReady());
  });

  return [
    state,
    {
      register(user: AuthRegister) {
        try {
          auth0Client.signupAndAuthorize(
            {
              connection: 'Username-Password-Authentication',
              username: user.username,
              email: user.email,
              password: user.password,
              userMetadata: {
                name: user.name
              }
            },
            (err, data) => {
              if (err) throw new Error('Auth context error:' + err.description);
              log('Auth Register Callback:', data);
            }
          );
        } catch (e) {
          warn('Auth Register Error:', e);
        }
      },
      login(user: AuthLogin) {
        try {
          auth0Client.login(
            {
              realm: 'Username-Password-Authentication',
              email: user.email,
              password: user.password
            },
            (err, data) => {
              if (err) throw new Error('Auth context error:' + err.description);
              log('Auth Login Callback:', data);
            }
          );
        } catch (e) {
          warn('Auth Login Error:', e);
        }
      },
      logout() {
        setState((_) => {
          return {
            access: '',
            state: '',
            nonce: '',
            sub: '',
            expires: 0,
            user: null
          } as IAuthState;
        });
      },
      refreshAuth() {
        try {
          auth0Client.renewAuth(
            {
              state: state.state,
              nonce: state.nonce
            },
            (err, data) => {
              if (err) throw new Error('Auth context error:' + err.description);
              log('Auth Refresh Callback:', data);
            }
          );
        } catch (e) {
          warn('Auth Refresh Error:', e);
        }
      },
      isAuthenticated() {
        return state.access.length > 0;
      }
    }
  ] as AuthContextValue;
}

const AuthContext = createContext<ReturnType<typeof createAuthState>>();

export const AuthProvider: ParentComponent = (props) => {
  const state = createAuthState();
  return <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>;
};

export function useAuth<AuthContextValue>() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('Auth context not set');
  return ctx;
}
