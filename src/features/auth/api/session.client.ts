import { AuthConfig, defaultAuthConfig } from '~/features/auth';
import { getClientCookie } from '~/features/cookie/session.client';
import { decryptData } from '~/shared/utils';

export function useClientAuthCookie(name: string = 'gcapi_auth'): AuthConfig {
  const cookie = getClientCookie(name);
  const auth: AuthConfig = cookie?.length
    ? decryptData<AuthConfig>(cookie)
    : defaultAuthConfig;
  return auth;
}
