import { IAuthState } from './types';

export const defaultAuthState: IAuthState = {
  accessToken: '',
  refreshToken: '',
  idToken: '',
  userId: '',
  user: undefined,
  scope: '',
  tokenType: '',
  orgId: '',
  permissions: []
} as IAuthState;
