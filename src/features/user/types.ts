import { ParentProps } from 'solid-js';
import { CurrentUser } from '~/features/auth';

export type UserRole = 'admin' | 'manager' | 'user' | 'guest';

export type UserState = {
  user: CurrentUser;
  role: UserRole;
};

export interface UserActions {
  isSuperAdmin: () => boolean;
  isAdmin: () => boolean;
  isManager: () => boolean;
  isUser: () => boolean;
  isGuest: () => boolean;
}

export type UserContextProvider = [state: UserState, actions: UserActions];

export interface UserConfigProps extends ParentProps {
  initialUser: CurrentUser;
}
