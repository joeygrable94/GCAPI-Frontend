import { createSession, signIn, signOut } from '@solid-mediakit/auth/client';
import { Show, VoidComponent } from 'solid-js';

export const AuthInterface: VoidComponent = () => {
  const session = createSession();
  return (
    <div class="flex flex-col items-center justify-center gap-4">
      <Show
        when={session()}
        fallback={
          <button
            onClick={() => signIn('auth0', { redirectTo: '/' })}
            class="rounded-full bg-black/50 px-10 py-3 font-semibold text-white no-underline transition hover:bg-black/70"
          >
            Sign in
          </button>
        }
      >
        {(session) => {
          return (
            <>
              <span class="text-xl text-black">
                Hello there {session()?.user?.name}
              </span>
              <button
                onClick={() => signOut({ redirectTo: '/' })}
                class="rounded-full bg-black/50 px-10 py-3 font-semibold text-white no-underline transition hover:bg-black/70"
              >
                Sign out
              </button>
            </>
          );
        }}
      </Show>
    </div>
  );
};
