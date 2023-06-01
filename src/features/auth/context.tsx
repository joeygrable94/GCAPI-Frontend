import { createContext, createEffect, ParentComponent, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useNavigate } from 'solid-start';
import { GLOBAL } from '~/features';
import { auth0Client } from './client';
import { AuthContextValue, AuthLogin, IAuthState } from './types';

function createAuthState() {
  const navigate = useNavigate();

  const stored: string = !import.meta.env.SSR
    ? GLOBAL.localStorage.getItem('gcapi_auth0')
      ? (GLOBAL.localStorage.getItem('gcapi_auth0') as string)
      : JSON.stringify({ access: '', state: '', nonce: '', user: '', expires: 0 })
    : JSON.stringify({ access: '', state: '', nonce: '', user: '', expires: 0 });
  const [state, setState] = createStore<IAuthState>(JSON.parse(stored));

  const captureAuth = () => {
    try {
      auth0Client.parseHash((err, authResult) => {
        if (err) throw new Error('Error parsing hash: ' + err.description);
        if (!authResult) throw new Error('Error fetching authResult: ' + authResult);
        const token = authResult.accessToken ? authResult.accessToken : '';
        auth0Client.client.userInfo(token, (err, user) => {
          if (err) throw new Error('Error fetch userInfo' + err.description);
          setState((_) => {
            return {
              access: authResult.accessToken,
              state: authResult.state,
              nonce: authResult.idTokenPayload.nonce,
              user: authResult.idTokenPayload.sub,
              expires: authResult.expiresIn
            };
          });
        });
      });
    } catch (e) {
      console.log(e);
    } finally {
      navigate('/');
    }
  };

  createEffect(() => {
    captureAuth();
    GLOBAL.localStorage.setItem('gcapi_auth0', JSON.stringify(state));
  });

  return [
    state,
    {
      login(user: AuthLogin) {
        try {
          auth0Client.login(
            {
              realm: 'Username-Password-Authentication',
              email: user.email,
              password: user.password
            },
            (err, data) => {
              if (err) throw new Error('login callback error');
              console.log('login callback', data);
            }
          );
        } catch (e) {
          console.error(e);
        }
      },
      logout() {
        // TODO: reset cookie.
        console.log('logout');
      },
      refreshAuth() {
        try {
          auth0Client.renewAuth(
            {
              state: state.state,
              nonce: state.nonce
            },
            (err, data) => {
              console.log('renewAuth callback', err, data);
            }
          );
        } catch (e) {
          console.error(e);
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

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('Auth context not set');
  return ctx;
}
