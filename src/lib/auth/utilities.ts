import { FormError, redirect } from 'solid-start';
import { Session } from 'solid-start/session/sessions';
import {
  ApiError,
  AuthService,
  BearerResponse,
  Body_auth_access_api_v1_auth_access_post,
  OpenAPI,
  UserReadSafe,
  UsersService
} from '~/api';
import { authorizedCookieStorage } from '~/lib/auth/session';
import {
  AuthBearer,
  Authorized,
  AuthorizedHeader,
  CheckAuthorized,
  Unauthorized
} from '~/lib/auth/types';
import { validatePassword, validateUsername } from '~/lib/auth/validators';
import { log } from '~/lib/core/utils';

export const isAuthorized = (tbd: any): tbd is Authorized => true;
export const isUnauthorized = (tbd: any): tbd is Unauthorized => true;

export function determineAuthorized(tbd: CheckAuthorized): boolean {
  if ((tbd as Authorized).access) {
    return true;
  }
  return false;
}

export function getUserSession(request: Request): Promise<Session> {
  // return cookie session
  return authorizedCookieStorage.getSession(request.headers.get('Cookie'));
}

export async function createAuthorizedSession(
  bearer: BearerResponse
): Promise<AuthorizedHeader> {
  // get cookie session
  const session: Session = await authorizedCookieStorage.getSession();
  // set access token + csrf
  if (bearer.access_token) session.set('accessToken', bearer.access_token);
  if (bearer.access_token_csrf)
    session.set('accessTokenCSRF', bearer.access_token_csrf);
  44;
  // set refresh token + csrf
  if (bearer.refresh_token) session.set('refreshToken', bearer.refresh_token);
  if (bearer.refresh_token_csrf)
    session.set('refreshTokenCSRF', bearer.refresh_token_csrf);
  // return redirect with current user cookie set
  return {
    headers: {
      'Set-Cookie': await authorizedCookieStorage.commitSession(session)
    }
  } as AuthorizedHeader;
}

export async function destroyAuthorizedSession(
  request: Request
): Promise<AuthorizedHeader> {
  // get cookie session data
  const session: Session = await authorizedCookieStorage.getSession(
    request.headers.get('Cookie')
  );
  // logout user from api auth service
  let access_token: BearerResponse | null = null;
  try {
    // fetch access token
    access_token = await AuthService.authLogoutApiV1AuthLogoutDelete();
  } catch (err: ApiError | any) {
    if (import.meta.env.DEV) log('Error Logging Out:', err?.body?.detail);
  }
  // reset OpenAPI token
  OpenAPI.TOKEN = access_token?.access_token || '';
  // redirect to login and empty cookies
  return {
    headers: {
      'Set-Cookie': await authorizedCookieStorage.destroySession(session)
    }
  } as AuthorizedHeader;
}

export async function getAuthorizedAccessToken(request: Request): Promise<AuthBearer> {
  // get cookie session
  const session: Session = await getUserSession(request);
  // get cookie access token + csrf
  const token: string | null = session.get('accessToken');
  const csrf: string | null = session.get('accessTokenCSRF');
  // return token + csrf or null
  if (!token || typeof token !== 'string' || !csrf || typeof csrf !== 'string')
    return { token: false, csrf: false } as AuthBearer;
  return { token, csrf } as AuthBearer;
}

export async function getCheckAuthorized(request: Request): Promise<CheckAuthorized> {
  // get current user access via cookie session
  const authorized: AuthBearer = await getAuthorizedAccessToken(request);
  // verify access type
  if (typeof authorized?.token !== 'string' || typeof authorized?.csrf !== 'string') {
    return { user: false, access: false } as CheckAuthorized;
  }
  // set OpenAPI token
  OpenAPI.TOKEN = authorized?.token || '';
  // fetch current user
  try {
    const user: UserReadSafe = await UsersService.usersCurrentUserApiV1UsersMeGet();
    return { user, access: authorized } as CheckAuthorized;
  } catch (err: any) {
    if (import.meta.env.DEV) log('Error Fetching Current User:', err?.body?.detail);
  }
  return { user: false, access: false } as CheckAuthorized;
}

export async function authenticate(form: FormData): Promise<Response> {
  // form input params
  const redirectTo: FormDataEntryValue | string = form.get('redirectTo') || '/';
  const username: FormDataEntryValue | null = form.get('username');
  const password: FormDataEntryValue | null = form.get('password');
  // verify form inputs types
  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof redirectTo !== 'string'
  ) {
    throw new FormError(`Form not submitted correctly.`);
  }
  // validate form inputs entries
  const fields: any = { username, password };
  const fieldErrors: any = {
    username: validateUsername(username),
    password: validatePassword(password)
  };
  // display form inputs errors
  if (Object.values(fieldErrors).some(Boolean)) {
    throw new FormError('Fields invalid', { fieldErrors, fields });
  }
  // fetch access token
  let access_token: BearerResponse | null = null;
  try {
    access_token = await AuthService.authAccessApiV1AuthAccessPost({
      formData: {
        username: username,
        password: password
      } as Body_auth_access_api_v1_auth_access_post
    });
  } catch (err: any) {
    if (import.meta.env.DEV) log('Error Logging In:', err?.body?.detail);
  }
  // verify access token received
  if (!access_token) {
    throw new FormError(`Username/Password combination is incorrect`, {
      fields
    });
  }
  // set authorization headers
  const authHeaders: AuthorizedHeader = await createAuthorizedSession(access_token);
  // return the current user session
  return redirect(redirectTo, authHeaders);
}

export async function deauthenticate(request: Request): Promise<Response> {
  // reset authorization headers
  const unauthHeaders: AuthorizedHeader = await destroyAuthorizedSession(request);
  // redirect to login page w/ blank cookie
  return redirect('/login', unauthHeaders);
}
