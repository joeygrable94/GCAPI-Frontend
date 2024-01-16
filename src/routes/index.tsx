import { createAsync, type RouteDefinition } from '@solidjs/router';
import { getUser } from '~/api';

export const route = {
  load: () => getUser()
} satisfies RouteDefinition;

export default function Home() {
  const user = createAsync(getUser, { deferStream: true });
  return (
    <main>
      <h2>Hello {user()?.email}</h2>
      <h3>Message board</h3>
      <button name="logout" type="submit">
        Logout Action
      </button>
    </main>
  );
}
