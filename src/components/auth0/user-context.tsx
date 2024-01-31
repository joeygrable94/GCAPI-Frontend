import {
  createContext,
  createEffect,
  createResource,
  createSignal,
  useContext
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { UsersService } from '~/backend';
import { defaultGuestUser } from './constants';
import {
  AuthorizedUser,
  CurrentUser,
  UserActions,
  UserConfigProps,
  UserContextProvider,
  UserState
} from './types';
import { getUserRole, isGuest } from './utils';

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
    isAdmin: () => {
      return state.role === 'admin';
    },
    isManager: () => {
      return state.role === 'admin';
    },
    isUser: () => {
      return state.role === 'user';
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
