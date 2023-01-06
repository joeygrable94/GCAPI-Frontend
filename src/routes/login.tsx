import { Show } from 'solid-js';
import { Title, useParams, useRouteData } from 'solid-start';
import {
  createServerAction$,
  createServerData$,
  redirect
} from 'solid-start/server';
import Navigation from '~/lib/components/Navigation';
import { getUser, loginUser } from '~/lib/db/session';

export function routeData() {
  return createServerData$(async (_, { request }) => {
    if (await getUser(request)) {
      throw redirect('/');
    }
    return {};
  });
}

export default function LoginMain() {
  const data: any = useRouteData<typeof routeData>();
  const params: any = useParams();

  const [loggingIn, { Form }]: any = createServerAction$(
    async (form: FormData) => await loginUser(form)
  );

  return (
    <>
      <Title>Log In</Title>
      <Navigation />
      <main>
        <h1>Login</h1>
        <Form>
          <input
            type="hidden"
            name="redirectTo"
            value={params.redirectTo ?? '/'}
          />
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
