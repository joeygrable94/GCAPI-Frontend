import {
  createContext,
  createEffect,
  createResource,
  createSignal,
  useContext
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { isServer } from 'solid-js/web';
import {
  AuthorizedUser,
  CurrentUser,
  UserActions,
  UserConfigProps,
  UserContextProvider,
  defaultGuestUser,
  getUserRole,
  isAdmin,
  isGuest,
  isManager,
  isSuperAdmin,
  isUser
} from '~/features/auth';
import { UsersService } from '~/shared/api';
import { log } from '~/shared/utils';

export const UserConfigContext = createContext<UserContextProvider>();

export const UserProvider = (props: UserConfigProps) => {
  const [isUserGuest, setIsUserGuest] = createSignal<boolean>(
    isGuest(props.initialUser)
  );
  const [currentUser, { mutate, refetch }] = createResource(
    () => !isUserGuest(),
    async () => {
      try {
        return (await UsersService.usersCurrentApiV1UsersMeGet()) as AuthorizedUser;
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
    if (import.meta.env.VITE_DEBUG) log('Server user initial state...', currentUser());
  } else {
    if (import.meta.env.VITE_DEBUG) log('Client user initial state...', currentUser());
  }
  createEffect(() => {
    if (currentUser() === undefined) {
      setIsUserGuest(true);
      return;
    }
    setIsUserGuest(isGuest(currentUser() as CurrentUser));
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
