import { FormError } from 'solid-start';
import { redirect } from 'solid-start/server';
import { createCookieSessionStorage } from 'solid-start/session';
import { Session } from 'solid-start/session/sessions';
import {
  ApiError,
  AuthService,
  BearerResponse,
  Body_auth_access_api_v1_auth_access_post,
  OpenAPI,
  UserRead,
  UsersService
} from '~/api';
import { validatePassword, validateUsername } from '~/lib/auth/validators';
import { log } from '~/lib/core/utils';

const sessionSecret = import.meta.env.VITE_SESSION_SECRET;

const storage = createCookieSessionStorage({
  cookie: {
    name: 'gcapitoksesh',
    // secure doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: true,
    secrets: ['gcapi', sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true
  }
});

export type AuthBearer = {
  readonly token: string;
  readonly csrf: string;
};

export type Authorized = {
  readonly user: UserRead;
  readonly access: AuthBearer;
};

export type Cookie = {
  'Set-Cookie': string;
};

export type HeaderCookie = {
  readonly headers: Cookie;
};

export function getUserSession(request: Request): Promise<Session> {
  // return cookie session
  return storage.getSession(request.headers.get('Cookie'));
}

export async function getUserAccessToken(request: Request): Promise<AuthBearer | null> {
  // get cookie session
  const session: Session = await getUserSession(request);
  // get cookie access token + csrf
  const token: string | null = session.get('accessToken');
  const csrf: string | null = session.get('accessTokenCSRF');
  // return token + csrf or null
  if (!token || typeof token !== 'string' || !csrf || typeof csrf !== 'string')
    return null;
  return { token, csrf } as AuthBearer;
}

export async function getUserRefreshToken(
  request: Request
): Promise<AuthBearer | null> {
  // get cookie session
  const session: Session = await getUserSession(request);
  // get cookie refresh token + csrf
  const token: string | null = session.get('refreshToken');
  const csrf: string | null = session.get('refreshTokenCSRF');
  // return token + csrf or null
  if (!token || typeof token !== 'string' || !csrf || typeof csrf !== 'string')
    return null;
  return { token, csrf } as AuthBearer;
}

export async function createUserSession(
  bearer: BearerResponse,
  redirectTo: string
): Promise<Response> {
  // get cookie session
  const session: Session = await storage.getSession();
  // set access token + csrf
  if (bearer.access_token) session.set('accessToken', bearer.access_token);
  if (bearer.access_token_csrf)
    session.set('accessTokenCSRF', bearer.access_token_csrf);
  // set refresh token + csrf
  if (bearer.refresh_token) session.set('refreshToken', bearer.refresh_token);
  if (bearer.refresh_token_csrf)
    session.set('refreshTokenCSRF', bearer.refresh_token_csrf);
  // return redirect with current user cookie set
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session)
    }
  } as HeaderCookie);
}

export async function getCurrentUser(request: Request): Promise<Authorized | null> {
  // get current user access via cookie session
  const authorized: AuthBearer | null = await getUserAccessToken(request);
  // verify access type
  if (typeof authorized?.token !== 'string' || typeof authorized?.csrf !== 'string') {
    return null;
  }
  // set OpenAPI token
  OpenAPI.TOKEN = authorized?.token || '';
  // fetch current user
  try {
    const user: UserRead = await UsersService.usersAuthorizedApiV1UsersMeGet();
    return { user, access: authorized } as Authorized;
  } catch (err: any) {
    if (import.meta.env.DEV) log('Error Fetching Current User:', err?.body?.detail);
    return null;
  }
}

export async function refreshCurrentUser(request: Request): Promise<Authorized | null> {
  // get current user access via cookie session
  const refreshed: AuthBearer | null = await getUserRefreshToken(request);
  // verify access type
  if (typeof refreshed?.token !== 'string' || typeof refreshed?.csrf !== 'string') {
    return null;
  }
  // set OpenAPI token
  OpenAPI.TOKEN = refreshed?.token || '';
  // fetch current user
  try {
    const user: UserRead = await UsersService.usersAuthorizedApiV1UsersMeGet();
    return { user, access: refreshed } as Authorized;
  } catch (err: any) {
    if (import.meta.env.DEV) log('Error Fetching Current User:', err?.body?.detail);
    return null;
  }
}

export async function resetUserHeaders(request: Request): Promise<HeaderCookie> {
  // get cookie session data
  const session: Session = await storage.getSession(request.headers.get('Cookie'));
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
      'Set-Cookie': await storage.destroySession(session)
    }
  } as HeaderCookie;
}

export async function loginUser(form: FormData): Promise<Response> {
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
  // return the current user session
  return createUserSession(access_token, redirectTo);
}

export async function logoutUser(request: Request): Promise<Response> {
  // reset authorization headers
  const authHeaders: HeaderCookie = await resetUserHeaders(request);
  // redirect to login page w/ blank cookie
  return redirect('/login', authHeaders);
}
