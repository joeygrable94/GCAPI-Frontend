import { Show } from "solid-js";
import { A } from "solid-start";
import { createServerAction$ } from "solid-start/server";
import { log } from "~/context/utils";
import { logout } from "~/db/session";


export default function Navigation(props: any) {
  const [, { Form }] = createServerAction$((f: FormData, { request }) => logout(request));

  if (props.currentUser === undefined) {
    props.currentUser = () => false;
  }

  return (
    <>
      <A href="/">Index</A>
      <Show when={props.currentUser()} fallback={
        <A href="/login">Login</A>
      }>
        <Form>
          <button name="logout" type="submit">Logout</button>
        </Form>
      </Show>
    </>
  );
}
