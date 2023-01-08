import { redirect } from 'solid-start';
import { Authorized, getCurrentUser, logoutUser } from './session';

export async function getAuthorized(request: Request): Promise<Authorized | null> {
  const authorized: Authorized | null = await getCurrentUser(request);
  if (!authorized) await logoutUser(request);
  return authorized;
}

export async function getAuthorizedSuperUser(
  request: Request
): Promise<Authorized | null> {
  const authorized: Authorized | null = await getAuthorized(request);
  if (!authorized?.user.is_superuser) {
    await logoutUser(request);
  }
  return authorized;
}

export async function getAuthorizedSuperUserOrBelongsToUser(
  request: Request,
  request_user_id: string
): Promise<Authorized> {
  const authorized: Authorized | null = await getAuthorized(request);
  // if the current user is NOT a super user and is NOT viewing their own id
  if (!authorized?.user.is_superuser && authorized?.user.id !== request_user_id) {
    throw redirect('/');
  }
  return authorized;
}
