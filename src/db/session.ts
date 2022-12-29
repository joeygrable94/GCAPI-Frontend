import { redirect } from "solid-start/server";
import { createCookieSessionStorage } from "solid-start/session";
import {
  AuthService,
  BearerResponse,
  OpenAPI,
  UserRead,
  UsersService
} from "~/api";
import { log, API_URL_BASE } from "~/context/utils";

OpenAPI.BASE = API_URL_BASE

const sessionSecret = import.meta.env.VITE_SESSION_SECRET;

const storage = createCookieSessionStorage({
  cookie: {
    name: "gcapitoksesh",
    // secure doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: true,
    secrets: ["gcapi", sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserAccessToken(request: Request) {
  const session = await getUserSession(request);
  const token = session.get("accessToken");
  const csrf = session.get("accessTokenCSRF");
  if (!token || typeof token !== "string" || !csrf || typeof csrf !== "string") return null;
  return {token, csrf};
}

export async function getUser(request: Request) {
  const authAccess = await getUserAccessToken(request);
  if (
    typeof authAccess?.token !== "string" ||
    typeof authAccess?.csrf !== "string"
  ) {
    return null;
  }
  try {
    OpenAPI.TOKEN = authAccess?.token;
    const user: UserRead = await UsersService.usersCurrentUserApiV1UsersMeGet()
    return user;
  } catch(err: any) {
    OpenAPI.TOKEN = ""
    throw logout(request);
  }
}

export async function logout(request: Request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  try {
    await AuthService.authLogoutApiV1AuthLogoutDelete()
  } catch(err: any) {
    log(err)
  }
  OpenAPI.TOKEN = ""
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

export async function createUserSession(
  bearer: BearerResponse,
  redirectTo: string
) {
  const session = await storage.getSession();
  if (bearer.access_token) session.set("accessToken", bearer.access_token);
  if (bearer.access_token_csrf) session.set("accessTokenCSRF", bearer.access_token_csrf);
  if (bearer.refresh_token) session.set("refreshToken", bearer.refresh_token);
  if (bearer.refresh_token_csrf) session.set("refreshTokenCSRF", bearer.refresh_token_csrf);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}
