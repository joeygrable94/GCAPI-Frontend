import { WebAuth } from 'auth0-js';
import { Accessor, JSX } from 'solid-js';

export type Organization = { id: string; name: string };

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

export interface IAuthState {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  idToken: string;
  scope: string;
  userId: string;
  email: string;
  email_verified: boolean;
  picture: string;
  roles: string[];
  created: string;
  updated: string;
}

export interface IAuthActions {
  webAuth: WebAuth;
  organization: Organization | undefined;
  isInitialized: Accessor<boolean>;
  isAuthenticated: Accessor<boolean>;
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

export type UpdatedAuthState = [boolean, IAuthState];

export type AuthContext = [state: IAuthState, actions: IAuthActions];
