import { FormError, redirect } from 'solid-start';
import { Session } from 'solid-start/session/sessions';
import {
  ApiError,
  AuthService,
  BearerResponse,
  Body_auth_access_api_v1_auth_access_post,
  OpenAPI,
  UserRead,
  UserReadAdmin,
  UsersService
} from '~/api';
import { authorizedCookieStorage } from '~/lib/auth/session';
import {
  AuthBearer,
  Authorized,
  AuthorizedHeader,
  CheckAuthorized,
  Cookie,
  Unauthorized
} from '~/lib/auth/types';
import { validatePassword, validateUsername } from '~/lib/auth/validators';
import { log } from '~/lib/core/utils';

export const isAuthorized = (tbd: any): tbd is Authorized => true;
export const isUnauthorized = (tbd: any): tbd is Unauthorized => true;

export function determineAuthorized(tbd: CheckAuthorized): boolean {
  if ((tbd as Authorized).access?.token.length > 0) {
    return true;
  }
  return false;
}

export function getUserSession(request: Request): Promise<Session> {
  return authorizedCookieStorage.getSession(request.headers.get('Cookie'));
}

export async function createAuthorizedSession(
  bearer: BearerResponse
): Promise<AuthorizedHeader> {
  const session: Session = await authorizedCookieStorage.getSession();
  if (bearer.access_token) session.set('accessToken', bearer.access_token);
  if (bearer.access_token_csrf)
    session.set('accessTokenCSRF', bearer.access_token_csrf);
  if (bearer.refresh_token) session.set('refreshToken', bearer.refresh_token);
  if (bearer.refresh_token_csrf)
    session.set('refreshTokenCSRF', bearer.refresh_token_csrf);
  return {
    headers: {
      'Set-Cookie': await authorizedCookieStorage.commitSession(session)
    } as Cookie
  } as AuthorizedHeader;
}

export async function destroyAuthorizedSession(
  request: Request
): Promise<AuthorizedHeader> {
  const session: Session = await authorizedCookieStorage.getSession(
    request.headers.get('Cookie')
  );
  let access_token: BearerResponse | null = null;
  try {
    access_token = await AuthService.authLogoutApiV1AuthLogoutDelete();
  } catch (err: ApiError | any) {
    if (import.meta.env.DEV) log('Error Logging Out:', err?.body?.detail);
  }
  OpenAPI.TOKEN = access_token?.access_token || '';
  return {
    headers: {
      'Set-Cookie': await authorizedCookieStorage.destroySession(session)
    } as Cookie
  } as AuthorizedHeader;
}

export async function getAuthorizedAccessToken(request: Request): Promise<AuthBearer> {
  const session: Session = await getUserSession(request);
  const token: string | null = session.get('accessToken');
  const csrf: string | null = session.get('accessTokenCSRF');
  if (!token || typeof token !== 'string' || !csrf || typeof csrf !== 'string')
    return { token: '', csrf: '' } as AuthBearer;
  return { token, csrf } as AuthBearer;
}

export async function getCheckAuthorized(request: Request): Promise<CheckAuthorized> {
  const authorized: AuthBearer = await getAuthorizedAccessToken(request);
  if (authorized?.token.length <= 0 || authorized?.csrf.length <= 0) {
    return {
      user: false,
      access: { token: '', csrf: '' } as AuthBearer
    } as Unauthorized;
  }
  OpenAPI.TOKEN = authorized?.token || '';
  try {
    const user: UserReadAdmin | UserRead =
      await UsersService.usersCurrentUserApiV1UsersMeGet();
    return { user, access: authorized } as Authorized;
  } catch (error: ApiError | any) {
    if (import.meta.env.DEV) log('Error Fetching Current User:', error?.body?.detail);
  }
  return {
    user: false,
    access: { token: '', csrf: '' } as AuthBearer
  } as Unauthorized;
}

export async function authenticate(form: FormData): Promise<Response> {
  const redirectTo: FormDataEntryValue | string = form.get('redirectTo') || '/';
  const username: FormDataEntryValue | null = form.get('username');
  const password: FormDataEntryValue | null = form.get('password');
  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof redirectTo !== 'string'
  ) {
    throw new FormError(`Form not submitted correctly.`);
  }
  const fields: any = { username, password };
  const fieldErrors: any = {
    username: validateUsername(username),
    password: validatePassword(password)
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    throw new FormError('Fields invalid', { fieldErrors, fields });
  }
  let access_token: BearerResponse | null = null;
  try {
    access_token = await AuthService.authAccessApiV1AuthAccessPost({
      formData: {
        username: username,
        password: password
      } as Body_auth_access_api_v1_auth_access_post
    });
  } catch (error: ApiError | any) {
    if (import.meta.env.DEV) log('Error Logging In:', error?.body?.detail);
  }
  if (!access_token) {
    throw new FormError(`Username/Password combination is incorrect`, {
      fields
    });
  }
  const authHeaders: AuthorizedHeader = await createAuthorizedSession(access_token);
  return redirect(redirectTo, authHeaders);
}

export async function deauthenticate(request: Request): Promise<Response> {
  const unauthHeaders: AuthorizedHeader = await destroyAuthorizedSession(request);
  return redirect('/login', unauthHeaders);
}
