import { redirect } from "solid-start";
import { getUser } from "./session";

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
