import { createSignal } from 'solid-js';

export default function createAuthService(actions: any) {
  // auth login signal
  const [loggedIn, setLoggedIn] = createSignal(false);
  let currentUser: any = async () => {
    await null;
    return { hello: 'world' };
  };

  // assign auth service actions
  Object.assign(actions, {
    // signal to fetch current user
    pullUser: () => setLoggedIn(true),
    isLoggedIn: () => loggedIn()
  });

  return currentUser;
}
