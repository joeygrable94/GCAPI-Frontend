import { Accessor, ParentProps } from 'solid-js';
import { UserRead, UserReadAsAdmin, UserReadAsManager } from '~/shared/api';

export type AuthorizedUser = UserReadAsAdmin | UserReadAsManager | UserRead;

export type GuestUser = { username: string };
export type CurrentUser = UserReadAsAdmin | UserReadAsManager | UserRead | GuestUser;
export type UnknownUser = CurrentUser | undefined;

export type AuthOrganization = { id: string; name: string };

export type AuthConfig = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  idToken: string;
};

export interface AuthConfigActions {
  webAuth: auth0.AuthOptions;
  logoutUrl: string;
  organization: AuthOrganization | undefined;
  scopes: string[];
  isInitialized: Accessor<boolean>;
  isAuthenticated: Accessor<boolean>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export type UpdatedAuthConfig = [boolean, AuthConfig];

export type AuthContextProvider = [AuthConfig, AuthConfigActions];

export interface AuthConfigProps extends ParentProps {
  initialAuth: AuthConfig;
  domain: string;
  clientId: string;
  audience: string;
  redirectUri: string;
  logoutUrl: string;
  invitation?: string;
  organization?: AuthOrganization;
}
