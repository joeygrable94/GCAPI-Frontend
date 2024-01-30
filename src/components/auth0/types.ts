import { WebAuth } from 'auth0-js';
import { Accessor, ParentProps } from 'solid-js';
import { UserRead, UserReadAsAdmin, UserReadAsManager } from '~/backend';

export type AuthOrganization = { id: string; name: string };

export type AuthConfig = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  idToken: string;
};

export interface AuthConfigActions {
  currentUser: UserReadAsAdmin | UserReadAsManager | UserRead | undefined;
  webAuth: WebAuth;
  organization: AuthOrganization | undefined;
  isInitialized: Accessor<boolean>;
  isAuthenticated: Accessor<boolean>;
  authorize: () => Promise<void>;
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
