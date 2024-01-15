import { redirect } from "@solidjs/router";
import { useSession } from "@solidjs/start/server";
import { getRequestEvent } from "solid-js/web";

type UserSession = {
  userId?: number;
};

function getSession() {
  return useSession(getRequestEvent()!, {
    password: process.env.SESSION_SECRET!
  });
}

export async function login(formData: FormData) {
  const username = String(formData.get("username"));
  const password = String(formData.get("password"));
  // do validation
  try {
    const session = await getSession();
    // const user = await db.user.findUnique({ where: { username } });
    const user = { id: 1234123412341234, username: "test", password: "test" };
    if (!user || password !== user.password) return new Error("Invalid login");
    await session.update((d: UserSession) => (d.userId = user!.id));
  } catch (err) {
    return err as Error;
  }
  throw redirect("/");
}

export async function logout() {
  const session = await getSession();
  await session.update((d: UserSession) => (d.userId = undefined));
  throw redirect("/login");
}
