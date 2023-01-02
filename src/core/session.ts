import { FormError } from 'solid-start';
import { redirect } from 'solid-start/server';
import { createCookieSessionStorage } from 'solid-start/session';
import {
  ApiError,
  AuthService,
  BearerResponse,
  Body_auth_access_api_v1_auth_access_post,
  OpenAPI,
  UserRead,
  UsersService
} from '~/api';
import { log } from '~/core/utils';
import { validatePassword, validateUsername } from '~/core/validators';

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

export function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'));
}

export async function getUserAccessToken(request: Request) {
  const session = await getUserSession(request);
  const token = session.get('accessToken');
  const csrf = session.get('accessTokenCSRF');
  if (!token || typeof token !== 'string' || !csrf || typeof csrf !== 'string')
    return null;
  return { token, csrf };
}

export async function getUser(request: Request) {
  const authAccess = await getUserAccessToken(request);
  if (
    typeof authAccess?.token !== 'string' ||
    typeof authAccess?.csrf !== 'string'
  ) {
    return null;
  }
  try {
    OpenAPI.TOKEN = authAccess?.token;
    const user: UserRead = await UsersService.usersCurrentUserApiV1UsersMeGet();
    return user;
  } catch (err: any) {
    return await logoutUser(request);
  }
}

export async function loginUser(form: FormData) {
  const redirectTo = form.get('redirectTo') || '/';
  const username = form.get('username');
  const password = form.get('password');

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof redirectTo !== 'string'
  ) {
    throw new FormError(`Form not submitted correctly.`);
  }

  const fields = { username, password };
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password)
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    throw new FormError('Fields invalid', { fieldErrors, fields });
  }

  let access_token: BearerResponse | undefined = undefined;
  try {
    access_token = await AuthService.authAccessApiV1AuthAccessPost({
      formData: {
        username: username,
        password: password
      } as Body_auth_access_api_v1_auth_access_post
    });
  } catch (err: any) {
    log('Error Logging In:', err?.body?.detail);
  }

  if (!access_token) {
    throw new FormError(`Username/Password combination is incorrect`, {
      fields
    });
  }
  return createUserSession(access_token, redirectTo);
}

export async function logoutUser(request: Request) {
  const session = await storage.getSession(request.headers.get('Cookie'));
  try {
    await AuthService.authLogoutApiV1AuthLogoutDelete();
  } catch (err: ApiError | any) {
    log('Error Logging Out:', err?.body?.detail);
  }
  OpenAPI.TOKEN = '';
  log(session.get('accessToken'));
  log(session.get('accessTokenCSRF'));
  return redirect('/login', {
    headers: {
      'Set-Cookie': await storage.destroySession(session)
    }
  });
}

export async function createUserSession(
  bearer: BearerResponse,
  redirectTo: string
) {
  const session = await storage.getSession();
  if (bearer.access_token) session.set('accessToken', bearer.access_token);
  if (bearer.access_token_csrf)
    session.set('accessTokenCSRF', bearer.access_token_csrf);
  if (bearer.refresh_token) session.set('refreshToken', bearer.refresh_token);
  if (bearer.refresh_token_csrf)
    session.set('refreshTokenCSRF', bearer.refresh_token_csrf);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session)
    }
  });
}
