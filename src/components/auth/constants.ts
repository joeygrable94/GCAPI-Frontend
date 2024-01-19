import { IAuthState } from './types';

export const defaultAuthState: IAuthState = {
  accessToken: '',
  refreshToken: '',
  tokenType: '',
  idToken: '',
  scope: '',
  userId: '',
  email: '',
  email_verified: false,
  picture: '',
  roles: [],
  created: '',
  updated: '',
  user: undefined,
  role: 'user'
} as IAuthState;
