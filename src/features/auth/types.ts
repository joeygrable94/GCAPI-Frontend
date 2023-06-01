import { Accessor } from 'solid-js';

export interface IAuthState {
  access: string;
  state: string;
  nonce: string;
  user: string;
  expires: number;
}

export type AuthLogin = {
  email: string;
  password: string;
};

export type AuthRegister = {
  email: string;
  password: string;
  password_conf: string;
};

export type AuthContextValue = [
  state: IAuthState,
  actions: {
    login: (user: AuthLogin) => Promise<void>;
    logout: () => Promise<void>;
    refreshAuth: () => Promise<void>;
    isAuthenticated: Accessor<boolean>;
  }
];
