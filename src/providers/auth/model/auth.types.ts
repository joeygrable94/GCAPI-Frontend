import { Accessor, ParentProps } from 'solid-js';
import { UserRead, UserReadAsAdmin, UserReadAsManager } from '~/shared/api';

export type AuthMode = 'token' | 'session' | 'server' | 'mount' | 'effect';
export type UserRole = 'admin' | 'manager' | 'user' | 'guest';
export type AuthorizedUser = UserReadAsAdmin | UserReadAsManager | UserRead;

export type AuthConfig = {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  expiresAt: Date | undefined;
};

export interface AuthConfigActions {
  isInitialized: Accessor<boolean>;
  isAuthenticated: Accessor<boolean>;
  getAuthMode: () => AuthMode;
  setAccess: (accessToken: string, refreshToken: string, expires: string) => void;
  revokeAccess: () => void;
}

export type AuthContextProvider = [state: AuthConfig, actions: AuthConfigActions];

export type ISODateString = string;

export interface AuthConfigProps extends ParentProps {
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: ISODateString | undefined;
}
