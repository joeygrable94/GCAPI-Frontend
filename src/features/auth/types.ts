import { Accessor } from 'solid-js';

export interface IAuthState {
  access: string;
  state: string;
  nonce: string;
  sub: string;
  expires: number;
  user: any;
}

export type AuthLogin = {
  email: string;
  password: string;
  remember: boolean | null;
};

export type AuthRegister = {
  name?: string;
  username: string;
  email: string;
  password: string;
};

export type AuthContextValue = [
  state: IAuthState,
  actions: {
    register: (user: AuthRegister) => Promise<void>;
    login: (user: AuthLogin) => Promise<void>;
    logout: () => Promise<void>;
    refreshAuth: () => Promise<void>;
    isAuthenticated: Accessor<boolean>;
  }
];
