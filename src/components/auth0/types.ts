import { WebAuth } from 'auth0-js';
import { Accessor, JSX } from 'solid-js';
import { UserSessionData } from '~/api/server';

export type Organization = { id: string };

export type AuthContext = {
  auth0Client: WebAuth;
  isAuthenticated: () => boolean;
  isInitialized: () => boolean;
  organization: Accessor<Organization | undefined>;
  user: Accessor<UserSessionData['userInfo'] | undefined>;
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
