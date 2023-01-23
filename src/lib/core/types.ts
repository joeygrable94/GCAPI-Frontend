import { UserAdmin, UserCreate, UserRead, UserUpdate } from '~/api';

export type AppStoreState = {
  readonly appLoaded: any;
  readonly users: any;
  appName: string;
  count: number;
  page: number;
};

export type AppStoreActions = {
  setCount: (n: number) => void;
  setPage: (page: number) => void;
  loadUser: (user_id: string) => void;
  loadUsers: (predicate: string) => void;
  findUserById: (
    users: UserAdmin[] | UserRead[] | null[],
    user_id: string
  ) => UserAdmin | UserRead | null;
  mapUsers: (users: UserAdmin[] | UserRead[]) => Map<string, UserAdmin | UserRead>;
  listUsers: (user_map: Map<string, UserAdmin | UserRead>) => UserAdmin[] | UserRead[];
  createUser: (data: UserCreate) => Promise<UserAdmin | UserRead | boolean>;
  updateUser: (user_id: string, data: UserUpdate) => Promise<UserRead | boolean>;
  deleteUser: (user_id: string) => Promise<boolean>;
};

export type AppStoreContextInitial = [state: AppStoreState, actions: object];
export type AppStoreContextValue = [state: AppStoreState, actions: AppStoreActions];

export interface IAppAgent {
  readonly Auth: IAuthAgent;
  readonly Users: IUserAgent;
}

export interface IAuthAgent {
  login: (email: string, password: string) => Promise<UserAdmin | UserRead | boolean>;
  logout: () => Promise<boolean>;
  register: (data: UserCreate) => Promise<UserRead | boolean>;
  verify: (email: string) => Promise<boolean>;
  confirm: (token: string, csrf: string) => Promise<boolean>;
  passwordForgot: (email: string) => Promise<boolean>;
  passwordReset: (
    password: string,
    token: string,
    csrf: string
  ) => Promise<UserRead | boolean>;
}

export interface IUserAgent {
  list: (page: number) => Promise<UserAdmin[] | UserRead[] | null[]>;
  create: (data: UserCreate) => Promise<UserAdmin | UserRead | boolean>;
  read: (id: string) => Promise<UserAdmin | UserRead | boolean>;
  update: (id: string, data: UserUpdate) => Promise<UserAdmin | UserRead | boolean>;
  delete: (id: string) => Promise<boolean>;
}
