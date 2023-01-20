import { UserCreate, UserRead, UserReadSafe, UserUpdate } from '~/api';

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
  mapUsers: (users: UserRead[]) => Map<string, UserRead>;
  listUsers: (user_map: Map<string, UserRead>) => UserRead[];
  createUser: (data: UserCreate) => Promise<UserReadSafe | boolean>;
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
  login: (email: string, password: string) => Promise<UserReadSafe | boolean>;
  logout: () => Promise<boolean>;
  register: (data: UserCreate) => Promise<UserReadSafe | boolean>;
  verify: (email: string) => Promise<boolean>;
  confirm: (token: string, csrf: string) => Promise<boolean>;
  passwordForgot: (email: string) => Promise<boolean>;
  passwordReset: (
    password: string,
    token: string,
    csrf: string
  ) => Promise<UserReadSafe | boolean>;
}

export interface IUserAgent {
  list: (page: number) => Promise<UserRead[] | null[]>;
  read: (id: string) => Promise<UserRead | boolean>;
  update: (id: string, data: UserUpdate) => Promise<UserRead | boolean>;
  delete: (id: string) => Promise<boolean>;
}
