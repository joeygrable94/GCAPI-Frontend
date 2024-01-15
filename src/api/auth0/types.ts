import { WebAuth } from 'auth0-js';
import { Accessor, JSX } from 'solid-js';


export type UserInfo = {
  sub: string
  nickname: string
  name: string
  picture: string
  updated_at: string
  org_id: string
  email: string
  email_verified: boolean
}

/*
  Note: This is the most basic form of SessionData, but sufficient for most of the times. Ideally, we should have built a discriminated union.
  One type would set the refreshToken as required when the scope is set to offline_access, and another type would ignore that field.
*/
export interface UserSessionData {
  accessToken: string
  idToken: string
  refreshToken?: string
  scope: string
  tokenType?: string
  userInfo: UserInfo
  userId: string
  orgId: string
  permissions?: unknown
}

export type Organization = { id: string };

export type Auth0ContextState = {
  auth0Client: WebAuth;
  isAuthenticated: () => boolean;
  isInitialized: () => boolean;
  organization: Accessor<Organization| undefined>;
  user: Accessor<UserSessionData['userInfo'] | undefined>;
  userId: Accessor<string>;
  idToken: Accessor<string>;
  accessToken: Accessor<string>;
  authorize: () => Promise<void>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

export type Auth0Props = {
  children: JSX.Element;
  domain: string;
  clientId: string;
  audience: string;
  redirectUri: string;
  logoutUrl: string;
  invitation: string;
  organization?: Organization;
};
