import { Resource, Show } from 'solid-js';
import { Title, useParams, useRouteData } from 'solid-start';
import { createServerAction$, createServerData$ } from 'solid-start/server';
import { initialRouteAuthState, redirectAuthorizedUser } from '~/lib/auth/useAuth';
import { authenticate } from '~/lib/auth/utilities';
import { log } from '~/lib/core/utils';

export function routeData() {
  const authorized: Resource<object> = createServerData$(redirectAuthorizedUser, {
    initialValue: initialRouteAuthState
  });
  return { authorized };
}

export default function LoginPage() {
  const { authorized }: any = useRouteData<typeof routeData>();
  const params: any = useParams();
  const [loggingIn, { Form }]: any = createServerAction$(
    async (form: FormData) => await authenticate(form)
  );

  if (import.meta.env.DEV && !import.meta.env.SSR) log('<LoginPage>');
  return (
    <>
      <Title>Log In</Title>
      <main>
        <h1>Login</h1>
        <Form>
          <input type="hidden" name="redirectTo" value={params.redirectTo ?? '/'} />
          <div>
            <label for="username-input">Username</label>
            <input name="username" placeholder="username" />
          </div>
          <Show when={loggingIn.error?.fieldErrors?.username}>
            <p role="alert">{loggingIn.error.fieldErrors.username}</p>
          </Show>
          <div>
            <label for="password-input">Password</label>
            <input name="password" type="password" placeholder="password" />
          </div>
          <Show when={loggingIn.error?.fieldErrors?.password}>
            <p role="alert">{loggingIn.error.fieldErrors.password}</p>
          </Show>
          <Show when={loggingIn.error}>
            <p role="alert" id="error-message">
              {loggingIn.error.message}
            </p>
          </Show>
          <button type="submit">Login</button>
        </Form>
      </main>
    </>
  );
}
