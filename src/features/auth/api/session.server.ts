import { AuthConfig, defaultAuthConfig } from '~/features/auth';
import { getServerCookie } from '~/features/cookie/session.server';
import { decryptData } from '~/shared/utils';

export function useServerAuthCookie(name: string = 'gcapi_auth'): AuthConfig {
  const cookie = getServerCookie(name);
  const auth: AuthConfig = cookie?.length
    ? decryptData<AuthConfig>(cookie)
    : defaultAuthConfig;
  return auth;
}
