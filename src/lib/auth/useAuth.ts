import { redirect } from 'solid-start';
import { ApiError, UserRead, UsersService } from '~/api';
import {
  AuthBearer,
  Authorized,
  CheckAuthorized,
  Unauthorized
} from '~/lib/auth/types';
import {
  deauthenticate,
  determineAuthorized,
  getCheckAuthorized,
  isAuthorized
} from '~/lib/auth/utilities';
import { log } from '~/lib/core/utils';

export async function getAuthorized(request: Request): Promise<CheckAuthorized> {
  const authorized: CheckAuthorized = await getCheckAuthorized(request);
  if (!determineAuthorized(authorized) || !authorized?.user)
    await deauthenticate(request);
  return authorized;
}

export async function getAuthorizedSuperUser(
  request: Request
): Promise<CheckAuthorized> {
  const authorized: CheckAuthorized = await getAuthorized(request);
  if (isAuthorized(authorized) && !authorized?.user.is_superuser)
    await deauthenticate(request);
  return authorized;
}

export async function getAuthorizedSuperUserOrBelongsToUser(
  request: Request,
  request_user_id: string
): Promise<CheckAuthorized> {
  const authorized: CheckAuthorized = await getAuthorized(request);
  if (
    isAuthorized(authorized) &&
    !authorized?.user.is_superuser &&
    authorized?.user.id !== request_user_id
  ) {
    throw redirect('/');
  }
  return authorized;
}

export const initialRouteAuthState = {
  user: false,
  access: {
    token: '',
    csrf: ''
  } as AuthBearer
} as Unauthorized;

export async function redirectAuthorizedUser(
  _: any,
  { request }: any
): Promise<object> {
  const authorized: CheckAuthorized = await getAuthorized(request);
  if (determineAuthorized(authorized)) throw redirect('/');
  return {};
}

export async function returnAuthorizedUser(
  _: any,
  { request }: any
): Promise<CheckAuthorized> {
  const authorized: CheckAuthorized = await getAuthorized(request);
  if (!determineAuthorized(authorized)) return initialRouteAuthState;
  return authorized as Authorized;
}

export async function returnAuthorizedUserOrRedirect(
  _: any,
  { request }: any
): Promise<CheckAuthorized> {
  const authorized: CheckAuthorized = await getAuthorized(request);
  if (!determineAuthorized(authorized)) throw redirect('/');
  return authorized;
}

export async function returnAuthorizedUserOrRedirectToLogin(
  _: any,
  { request }: any
): Promise<CheckAuthorized> {
  const authorized: CheckAuthorized = await getAuthorized(request);
  if (!determineAuthorized(authorized))
    throw redirect('/login', await deauthenticate(request));
  return authorized;
}

export async function returnAuthorizedSuperUserOrRedirect(
  _: any,
  { request }: any
): Promise<CheckAuthorized> {
  const authorized: CheckAuthorized = await getAuthorizedSuperUser(request);
  if (isAuthorized(authorized) && !authorized?.user.is_superuser) throw redirect('/');
  return authorized;
}

export async function returnAuthorizedSuperUserOrBelongsToUserOrRedirect(
  key: any,
  { request }: any
): Promise<CheckAuthorized> {
  const authorized: CheckAuthorized = await getAuthorizedSuperUserOrBelongsToUser(
    request,
    key[0]
  );
  return authorized;
}

export async function returnFetchUserByKey(key: any): Promise<false | UserRead> {
  try {
    const found: UserRead = await UsersService.usersUserApiV1UsersIdGet({
      id: key[0]
    });
    return found;
  } catch (error: ApiError | any) {
    if (import.meta.env.DEV) log(error?.body?.detail);
  }
  return false;
}

export async function returnFetchUsersListByKey(
  key: any
): Promise<UserRead[] | null[]> {
  try {
    const users: UserRead[] | null[] = await UsersService.usersListUsersApiV1UsersGet({
      page: key[0]
    });
    return users;
  } catch (error: ApiError | any) {
    if (import.meta.env.DEV) log(error?.body?.detail);
    return [];
  }
}
