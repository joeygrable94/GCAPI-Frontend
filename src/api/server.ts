"use server";
import { redirect } from "@solidjs/router";
import { APIEvent, useSession } from "@solidjs/start/server";
import { getRequestEvent } from "solid-js/web";
import { log } from "~/utils";

export type UserInfo = {
  sub: string;
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  org_id: string;
  email: string;
  email_verified: boolean;
};

/*
  Note: This is the most basic form of SessionData, but sufficient for most of the times. Ideally, we should have built a discriminated union.
  One type would set the refreshToken as required when the scope is set to offline_access, and another type would ignore that field.
*/
export interface UserSessionData {
  accessToken: string;
  idToken: string;
  refreshToken?: string;
  scope: string;
  tokenType?: string;
  userInfo: UserInfo;
  userId: string;
  orgId: string;
  permissions?: unknown;
}

export function getSession(event: APIEvent | undefined = undefined) {
  let requestEvent = event ?? getRequestEvent();
  return useSession<UserSessionData>(requestEvent!, {
    password:
      import.meta.env.VITE_SESSION_SECRET ?? "areallylongsecretthatyoushouldreplace",
  });
}

export async function getUser() {
  const session = await getSession();
  const userId = session.data.userId;
  if (userId === undefined) throw redirect("/login");

  let user: UserInfo | undefined;
  try {
    log('Validate user session data and return user, or renew auth');
    log(session.data);
  } catch {
    log('Get user error');
  }
  if (!user) throw redirect("/login");
  return { id: user.sub, email: user.email };
}
