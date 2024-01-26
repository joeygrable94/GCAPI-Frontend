import { IAuthState } from './types';

export const defaultAuthState: IAuthState = {
  accessToken: '',
  refreshToken: '',
  tokenType: '',
  idToken: ''
} as IAuthState;
