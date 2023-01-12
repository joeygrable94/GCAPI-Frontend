import { redirect } from 'solid-start';
import { CheckAuthorized } from './types';
import { deauthenticate, getCheckAuthorized, isAuthorized } from './utilities';

export async function getAuthorized(request: Request): Promise<CheckAuthorized> {
  const authorized: CheckAuthorized = await getCheckAuthorized(request);
  if (!authorized?.user) await deauthenticate(request);
  return authorized;
}

export async function getAuthorizedSuperUser(
  request: Request
): Promise<CheckAuthorized> {
  const authorized: CheckAuthorized = await getAuthorized(request);
  if (!authorized?.user) await deauthenticate(request);
  return authorized;
}

export async function getAuthorizedSuperUserOrBelongsToUser(
  request: Request,
  request_user_id: string
): Promise<CheckAuthorized> {
  const authorized: CheckAuthorized = await getAuthorized(request);
  // if the current user is NOT a super user and is NOT viewing their own id
  if (
    isAuthorized(authorized) &&
    !authorized?.user.is_superuser &&
    authorized?.user.id !== request_user_id
  ) {
    throw redirect('/');
  }
  return authorized;
}
