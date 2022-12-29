import { Title, useRouteData } from "solid-start";
import { createServerAction$, createServerData$, redirect } from "solid-start/server";
import Counter from "~/components/Counter";
import Navigation from "~/components/Navigation";
import { getUser, logout } from "~/db/session";

export function routeData() {
  return createServerData$(async (_, { request }) => {
    const user = await getUser(request);

    if (!user) {
      throw redirect("/login");
    }

    return user;
  })
}

export default function Home() {
  const user = useRouteData<typeof routeData>();

  return (
    <>
      <Navigation currentUser={user} />
      <main>
        <Title>Hello World</Title>
        <h1>Hello, {user()?.email}!</h1>
        <h2>Welcome to GCAPI.</h2>
        <Counter />
      </main>
    </>
  );
}
