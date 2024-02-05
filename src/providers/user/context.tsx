import {
  createContext,
  createEffect,
  createResource,
  createSignal,
  useContext
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { AuthorizedUser, CurrentUser } from '~/providers/auth';
import { UsersService } from '~/shared/api';
import { defaultGuestUser } from '../auth/constants';
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
