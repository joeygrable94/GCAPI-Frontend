import {
  createContext,
  createEffect,
  createResource,
  createSignal,
  useContext
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { isServer } from 'solid-js/web';
import { AuthorizedUser, CurrentUser } from '~/providers/auth';
import { UsersService } from '~/shared/api';
import { log, setClientCookie } from '~/shared/utils';
import { defaultGuestUser } from '../auth/constants';
import { USER_COOKIE_MAX_AGE } from './constants';
import { UserActions, UserConfigProps, UserContextProvider, UserState } from './types';
import {
  getUserRole,
  isAdmin,
  isGuest,
  isManager,
  isSuperAdmin,
  isUser
} from './utils';

export const UserConfigContext = createContext<UserContextProvider>();

export const defaultUserState: UserState = {
  user: defaultGuestUser,
  role: 'guest'
};

export const UserProvider = (props: UserConfigProps) => {
  const [isUserGuest, setIsUserGuest] = createSignal<boolean>(
    isGuest(props.initialUser)
  );
  const [currentUser, { mutate, refetch }] = createResource(
    () => !isUserGuest(),
    async () => {
      try {
        let user = (await UsersService.usersCurrentApiV1UsersMeGet()) as AuthorizedUser;
        log('UserProvider user...', user);
        return user;
      } catch (error) {
        return defaultGuestUser;
      }
    },
    {
      initialValue: props.initialUser,
      deferStream: true
    }
  );
  const [state, setState] = createStore({
    get user() {
      return currentUser() as CurrentUser;
    },
    role: getUserRole(currentUser())
  });
  const actions: UserActions = {
    isSuperAdmin: () => {
      return isSuperAdmin(state.user);
    },
    isAdmin: () => {
      return isAdmin(state.user);
    },
    isManager: () => {
      return isManager(state.user);
    },
    isUser: () => {
      return isUser(state.user);
    },
    isGuest: () => isUserGuest()
  };
  const store: UserContextProvider = [state, actions];
  // initialize server user state
  if (isServer) {
    if (import.meta.env.VITE_DEBUG)
      log('Server user initial state...', props.initialUser);
  } else {
    if (import.meta.env.VITE_DEBUG)
      log('Client user initial state...', props.initialUser);
  }
  createEffect(() => {
    if (import.meta.env.VITE_DEBUG) log('Client user set state...', currentUser());
    if (currentUser() === undefined) {
      setIsUserGuest(true);
      return;
    }
    setIsUserGuest(isGuest(currentUser() as CurrentUser));
  });
  // Save cookie
  createEffect(() => {
    log('user state...', state.user);
    const serialized = JSON.stringify(state.user);
    setClientCookie('gcapi_user', serialized, USER_COOKIE_MAX_AGE);
    if (import.meta.env.VITE_DEBUG) log('Set client user cookie...');
  });
  return (
    <UserConfigContext.Provider value={store}>
      {props.children}
    </UserConfigContext.Provider>
  );
};

export default UserProvider;

export function useUser(): UserContextProvider {
  const ctx = useContext(UserConfigContext);
  if (!ctx) throw new Error('<UserProvider> not found wrapping the <App />.');
  return ctx as UserContextProvider;
}
