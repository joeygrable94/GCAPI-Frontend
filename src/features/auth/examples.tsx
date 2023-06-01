import { Accessor, Component, JSX, ParentComponent, Show, createContext, createEffect, createSignal, useContext } from "solid-js";
import { createStore } from "solid-js/store";





// -----------------------------------------------------------------------------
// Example 1

export interface AuthState {
  access: string;
  refresh: string;
}

type AuthContextValue = [
  state: () => AuthState,
  actions: {
    refreshAuth: () => Promise<void>;
    authenticated: Accessor<boolean>;
  }
];

const AuthContext = createContext<AuthContextValue>();

export const AuthProvider: ParentComponent<AuthContextProps> = (props) => {
  const content = children(() => props.children!);

  /// the local store.
  const [tokenStorage, setTokenStorage] = createLocalStorage({
    api: localStorage,
    prefix: "vista-auth-",
    deserializer: (data) => {
      if (!data || data == "undefined") {
        return "";
      }
      return data;
    },
    serializer: (value, _key, _options) => {
      return value;
    },
  });

  const [auth, setAuth] = createSignal<AuthState>({
    access: tokenStorage.access,
    refresh: tokenStorage.refresh,
  });

  // updates token storage.
  createEffect(() => {
    console.log("Updating token storage.");
    setTokenStorage("access", auth().access);
    setTokenStorage("refresh", auth().refresh);
  });
  const isAuthenticated = createMemo(() => {
    const hasAccessToken = auth().access.length > 0;
    const hasRefreshToken = auth().refresh.length > 0;
    return hasAccessToken || hasRefreshToken;
  });

  return (
    <AuthContext.Provider
      value={[
        auth,
        {
          refreshAuth: async () => {
            try {
              const tokens = await refreshTokens(auth().refresh);
              setAuth((_) => {
                return {
                  access: tokens.access_token,
                  refresh: tokens.refresh_token,
                };
              });
            } catch (e) {
              if (e instanceof UnauthorizedException) {
                setAuth((prev) => {
                  return {
                    access: "",
                    refresh: "",
                  };
                });
              }
            }
          },
          authenticated: isAuthenticated,
        },
      ]}
    >
      {content()}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);





// -----------------------------------------------------------------------------
// Example 2

// PROBLEM: `createContext` error.
export interface User {...};

type AuthData = {
  user: User | undefined
};

export const AuthContext = createContext<AuthData>({user: undefined});

export const AuthProvider: Component<{
  children: JSX.Element
}> = (props) => {
  const [currentUser, setCurrentUser] = createStore<{
    user: User | undefined
  }>({ user: undefined });
  const auth = [
    currentUser,
    {
      login(user: User) {
        setCurrentUser("user", (_) => user);
      },
      logout() {
        setCurrentUser('user', () => undefined);
      }
    }
  ];

  return (
    <AuthContext.Provider value={auth}> // ERROR HERE
      {props.children}
    </AuthContext.Provider>
  );
}

// SOLUTION
export interface User {...}

type AuthData = [{user: User | undefined}, {
  login(user: User): void,
  logout(): void
}];

export const AuthContext = createContext<AuthData>();

export const AuthProvider: Component<{
  children: JSX.Element
}> = (props) => {
  const [currentUser, setCurrentUser] = createStore<{user: User | undefined}>({user: undefined});
  const auth: AuthData = [
    currentUser,
    {
      login(user) {
        setCurrentUser("user", (_) => user);
      },
      logout() {
        setCurrentUser('user', () => undefined)
      },
    }
  ]
  return (
    <AuthContext.Provider value={auth}>
      {props.children}
    </AuthContext.Provider>
  );
}





// -----------------------------------------------------------------------------
// Example 3

function createAuthState() {
  const [currentUser, setCurrentUser] = createSignal<User | undefined>(undefined);

  return [
    currentUser,
    {
      login(user: User) {
        setCurrentUser(user);
      },
      logout() {
        document.cookie = "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        setCurrentUser(undefined);
      },
    },
  ] as const;
}

const AuthContext = createContext<ReturnType<typeof createAuthState>>();

export const AuthProvider: ParentComponent = (props) => {
  const state = createAuthState();
  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("Auth context not set");
  return ctx;
}

export const Main: Component = () => {
  let [user, {login,}] = useAuth();

  createEffect(() => {
    if (!user()) {
      new AuthSerivce().getCurrentUser()
      .then((r) => {
        if (r != null) {
          login(r);
        } else {
          console.log("Response with an error");
        }
      })
      .catch((e) => {
        console.log("Error fetching user");
      })
    }
  })

  return (
    <Show when={user()} fallback={<p>Login</p>}>
      {user => <Root user={user} />}
    </Show>
  );
}

const Root: Component<{
  user: Accessor<User | undefined>
}> = (props) => {
  // I know in react you could do something like this & set the state so the component will rerender on change, how can I achive this in Solid?
  // let [currentUser, _] = createSignal(props.user())
  // try a derived signal instead
  const currentUser = () => props.user()
  // ..... Router & other things
  return (
    <>
      <p>Root</p>
    </>
  );
}





/*
import axios from 'axios';
var options = {
  method: 'POST',
  url: 'https://{yourDomain}/oauth/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: new URLSearchParams({
    grant_type: 'password',
    username: '{username}',
    password: '{password}',
    audience: '{yourApiIdentifier}',
    scope: 'read:sample',
    client_id: '{yourClientId}',
    client_secret: '{yourClientSecret}'
  })
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
*/
