"use server";
import { redirect } from "@solidjs/router";
import { APIEvent, useSession } from "@solidjs/start/server";
import { getRequestEvent } from "solid-js/web";
// import { UserInfo, UserSessionData } from "../components/auth0/types";
import { log } from "~/utils";
import { db } from "./db";

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

async function login(username: string, password: string) {
  // const user = await db.user.findUnique({ where: { username } });
  // if (!user || password !== user.password) throw new Error("Invalid login");
  log("login", { username, password });
  // log(webAuthn);
  return {};
}

async function register(username: string, password: string) {
  const existingUser = await db.user.findUnique({ where: { username } });
  if (existingUser) throw new Error("User already exists");
  return db.user.create({
    data: { username: username, password },
  });
}

export async function loginOrRegister(formData: FormData) {
  const username = String(formData.get("username"));
  const password = String(formData.get("password"));
  const loginType = String(formData.get("loginType"));

  try {
    const user = await (loginType !== "login"
      ? register(username, password)
      : login(username, password));
    const session = await getSession();
    // await session.update((d: UserSessionData) => (d.userId = user!.id));
  } catch (err) {
    return err as Error;
  }
  throw redirect("/");
}

export async function logout() {
  const session = await getSession();
  // await session.update((d) => (d.userId = undefined));
  throw redirect("/login");
}

export async function getUser() {
  const session = await getSession();
  const userId = session.data.userId;
  if (userId === undefined) throw redirect("/login");

  let user: UserInfo | undefined;
  try {
    // user = await db.user.findUnique({ where: { id: userId } });
  } catch {
    logout();
  }
  if (!user) return logout();
  return { id: user.sub, username: user.email };
}
