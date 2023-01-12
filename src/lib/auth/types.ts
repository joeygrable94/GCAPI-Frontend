import { UserReadSafe } from '~/api';

export type AuthBearer = {
  readonly token: string | boolean;
  readonly csrf: string | boolean;
};

export type Cookie = {
  'Set-Cookie': string;
};

export type AuthorizedHeader = {
  readonly headers: Cookie;
};

export type Unauthorized = {
  readonly user: boolean;
  readonly access: boolean;
};

export type Authorized = {
  readonly user: UserReadSafe;
  readonly access: AuthBearer;
};

export type CheckAuthorized = Authorized | Unauthorized;

export type AuthorizedState = {
  readonly currentUser: any;
  readonly token: string;
  readonly csrf: string;
};

export type AuthorizedActions = {
  setAuthLoad: (s: boolean) => any;
  setToken: (token: string, csrf: string) => any;
  resetToken: () => any;
  authorizeUser: (form: FormData) => any;
  pullUser: () => any;
  fetchMe: () => any;
};

export type AuthorizedContextValue = [
  state: AuthorizedState,
  actions: AuthorizedActions
];
