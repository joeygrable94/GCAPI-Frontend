import { Button } from '@kobalte/core/button';
import { createSession, signIn, signOut } from '@solid-mediakit/auth/client';
import { Show, VoidComponent } from 'solid-js';

export const AuthInterface: VoidComponent = () => {
  const session = createSession();
  return (
    <div class="flex flex-col items-center justify-center gap-4">
      <Show
        when={session()}
        fallback={
          <Button
            onClick={() => signIn('auth0', { redirectTo: '/' })}
            class="my-4 rounded-full bg-black/50 px-10 py-3 font-semibold text-white no-underline transition hover:bg-black/70"
          >
            Sign In
          </Button>
        }
      >
        {(session) => {
          return (
            <div class="my-4 text-center">
              <p class="text-xl text-black dark:text-white">
                Hello there {session()?.user?.name}
              </p>
              <Button
                onClick={() => signOut({ redirectTo: '/' })}
                class="rounded-full bg-black/50 px-10 py-3 font-semibold text-white no-underline transition hover:bg-black/70"
              >
                Sign out
              </Button>
            </div>
          );
        }}
      </Show>
    </div>
  );
};
