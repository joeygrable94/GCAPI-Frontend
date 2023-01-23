import { UserAdmin, UserRead } from '~/api';

export type AuthBearer = {
  readonly token: string;
  readonly csrf: string;
};

export type Cookie = {
  'Set-Cookie': string;
};

export type AuthorizedHeader = {
  readonly headers: Cookie;
};

export type Unauthorized = {
  readonly user: false;
  readonly access: AuthBearer;
};

export type Authorized = {
  readonly user: UserAdmin | UserRead;
  readonly access: AuthBearer;
};

export type CheckAuthorized = Authorized | Unauthorized;

export type AuthorizedState = {
  readonly authLoadState: any;
  readonly currentUser: any;
  token: string;
  csrf: string;
};

export type AuthorizedActions = {
  setApiBaseUrl: (s: string) => any;
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
