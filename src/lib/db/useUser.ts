import { redirect } from 'solid-start';
import { getUser, logoutUser } from './session';

export async function getCurrentUser(request: Request, redirectTo: string = '/login') {
  // fetch user
  const user: any = await getUser(request);
  // if no current user, logout + redirect
  if (!user) {
    await logoutUser(request, redirectTo);
  }
  // return current user
  return user;
}

export async function belongsToUserOrIsSuperUserOrRedirect(
  request: Request,
  request_user_id: string
) {
  // fetch user
  const user: any = await getCurrentUser(request);
  // if the current user is NOT a super user and is NOT viewing their own id
  if (!user.is_superuser && user.id !== request_user_id) {
    throw redirect('/');
  }
  // return current user
  return user;
}
