import { Show } from "solid-js";
import { FormError, useParams, useRouteData } from "solid-start";
import {
  createServerAction$, createServerData$, redirect,
} from "solid-start/server";
import { AuthService, BearerResponse, Body_auth_access_api_v1_auth_access_post, OpenAPI } from "~/api";
import Navigation from "~/components/Navigation";
import { createUserSession, getUser } from "~/db/session";

function validateUsername(username: unknown) {
  if (typeof username !== "string" || username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

export function routeData() {
  return createServerData$(async (_, { request }) => {
    if (await getUser(request)) {
      throw redirect("/");
    }
    return {};
  });
}

export default function Login() {

  const data = useRouteData<typeof routeData>();
  const params = useParams();

  const [loggingIn, { Form }] = createServerAction$(async (form: FormData) => {
    const redirectTo = form.get("redirectTo") || "/";
    const username = form.get("username");
    const password = form.get("password");

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      typeof redirectTo !== "string"
    ) {
      throw new FormError(`Form not submitted correctly.`);
    }

    const fields = { username, password };
    const fieldErrors = {
      username: validateUsername(username),
      password: validatePassword(password)
    };

    if (Object.values(fieldErrors).some(Boolean)) {
      throw new FormError("Fields invalid", { fieldErrors, fields });
    }

    const access_token: BearerResponse = await AuthService.authAccessApiV1AuthAccessPost({
      formData: {
        username: username,
        password: password,
      } as Body_auth_access_api_v1_auth_access_post
    });

    if (!access_token) {
      throw new FormError(`Username/Password combination is incorrect`, {
        fields
      });
    }

    return createUserSession(access_token, redirectTo);
  });

  return (
    <>
      <Navigation />
      <main>
        <h1>Login</h1>
        <Form>
          <input type="hidden" name="redirectTo" value={params.redirectTo ?? "/"} />
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
