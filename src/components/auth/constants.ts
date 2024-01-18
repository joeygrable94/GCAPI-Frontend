import { IAuthState } from './types';

export const defaultAuthState: IAuthState = {
  accessToken: '',
  refreshToken: '',
  idToken: '',
  userId: '',
  state: '',
  nonce: '',
  sub: '',
  expires: 0,
  user: undefined
} as IAuthState;
