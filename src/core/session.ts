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
  // return cookie session
  return storage.getSession(request.headers.get('Cookie'));
}

export async function getUserAccessToken(request: Request) {
  // get cookie session
  const session = await getUserSession(request);
  // get cookie access token + csrf
  const token = session.get('accessToken');
  const csrf = session.get('accessTokenCSRF');
  // return token + csrf or null
  if (!token || typeof token !== 'string' || !csrf || typeof csrf !== 'string')
    return null;
  return { token, csrf };
}

export async function getUserRefreshToken(request: Request) {
  // get cookie session
  const session = await getUserSession(request);
  // get cookie refresh token + csrf
  const token = session.get('refreshToken');
  const csrf = session.get('refreshTokenCSRF');
  // return token + csrf or null
  if (!token || typeof token !== 'string' || !csrf || typeof csrf !== 'string')
    return null;
  return { token, csrf };
}

export async function createUserSession(
  bearer: BearerResponse,
  redirectTo: string
) {
  // get cookie session
  const session = await storage.getSession();
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
  });
}

export async function getUser(request: Request) {
  // get current user access via cookie session
  const authAccess = await getUserAccessToken(request);
  // verify access type
  if (
    typeof authAccess?.token !== 'string' ||
    typeof authAccess?.csrf !== 'string'
  ) {
    return null;
  }
  // fetch current user
  try {
    OpenAPI.TOKEN = authAccess?.token;
    const user: UserRead = await UsersService.usersCurrentUserApiV1UsersMeGet();
    return user;
  } catch (err: any) {
    await logoutUser(request);
    return null;
  }
}

export async function checkUserPermissionsOrRedirect(request: Request) {
  // fetch user
  const user: any = await getUser(request);
  // if no current user
  if (!user) {
    throw redirect('/login');
  }
  // return current user
  return user;
}

export async function checkSuperUserPermissionsOrRedirect(request: Request) {
  // fetch user
  const user: any = await checkUserPermissionsOrRedirect(request);
  // if the current user NOT is a super user
  if (!user.is_superuser) {
    throw redirect('/');
  }
  // return current user
  return user;
}

export async function belongsToUserOrIsSuperUserOrRedirect(request: Request, request_user_id: string) {
  // fetch user
  const user: any = await checkUserPermissionsOrRedirect(request);
  // if the current user is NOT a super user and is NOT viewing their own id
  if (!user.is_superuser && user.id !== request_user_id) {
    throw redirect('/');
  }
  // return current user
  return user;
}

export async function loginUser(form: FormData) {
  // form input params
  const redirectTo = form.get('redirectTo') || '/';
  const username = form.get('username');
  const password = form.get('password');
  // verify form inputs types
  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof redirectTo !== 'string'
  ) {
    throw new FormError(`Form not submitted correctly.`);
  }
  // validate form inputs entries
  const fields = { username, password };
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password)
  };
  // display form inputs errors
  if (Object.values(fieldErrors).some(Boolean)) {
    throw new FormError('Fields invalid', { fieldErrors, fields });
  }
  // fetch access token
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
  // verify access token received
  if (!access_token) {
    throw new FormError(`Username/Password combination is incorrect`, {
      fields
    });
  }
  // return the current user session
  return createUserSession(access_token, redirectTo);
}

export async function logoutUser(request: Request) {
  // get cookie session data
  const session = await storage.getSession(request.headers.get('Cookie'));
  // logout user from api auth service
  try {
    await AuthService.authLogoutApiV1AuthLogoutDelete();
  } catch (err: ApiError | any) {
    log('Error Logging Out:', err?.body?.detail);
  }
  // reset OpenAPI token
  OpenAPI.TOKEN = '';
  // redirect to login page
  return redirect('/login', {
    headers: {
      'Set-Cookie': await storage.destroySession(session)
    }
  });
}
