import { Auth0UserProfile, WebAuth } from 'auth0-js';
import { Accessor, JSX } from 'solid-js';

export type Organization = { id: string };

export type AuthContext = {
  auth0Client: WebAuth;
  isAuthenticated: () => boolean;
  isInitialized: () => boolean;
  organization: Accessor<Organization | undefined>;
  user: Accessor<Auth0UserProfile | undefined>;
  userId: Accessor<string>;
  idToken: Accessor<string>;
  accessToken: Accessor<string>;
  authorize: () => Promise<void>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

export type AuthProps = {
  children: JSX.Element;
  domain: string;
  clientId: string;
  audience: string;
  redirectUri: string;
  logoutUrl: string;
  invitation?: string;
  organization?: Organization;
};

export type AuthorizedUser = {
  sub: string;
  picture: string;
  email: string;
  email_verified: boolean;
  created_on: string;
  updated_on: string;
  roles: string[];
};

export interface IAuthState {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  userId: string;
  user: AuthorizedUser | undefined;
  scope: string;
  tokenType: string;
  orgId: string;
  permissions: string[];
}

export interface IAuthActions {
  webAuth: WebAuth;
  organization: Organization | undefined;
  isInitialized: Accessor<boolean>;
  isAuthenticated: Accessor<boolean>;
  completeAuthorization: (code: string, state: string) => Promise<void>;
  authorize: () => Promise<void>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export type AuthLogin = {
  email: string;
  password: string;
  remember: boolean | null;
};

export type AuthRegister = {
  first_name: string;
  last_name: string;
  client_ref: string;
  email: string;
  password: string;
  password_conf: string;
};

export type AuthContextValue = [state: IAuthState, actions: IAuthActions];
