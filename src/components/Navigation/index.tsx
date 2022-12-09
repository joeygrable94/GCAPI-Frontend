import { Component, Show } from "solid-js"
import { A } from "solid-start"
import { useStore } from "~/context"

const Navigation: Component = () => {
  const [state, actions]: any = useStore()
  return (
    <header class="header">
      <nav class="inner">
        <ul>
          <li><A href="/">{state.appName}</A></li>
          <Show when={state.currentUser}>
            <li><A href="/users">users</A>
              <ul>
                <li><A href="/users/me">current user</A></li>
                <li><A href={`/users/${state.currentUser.id}`}>view user (me)</A></li>
              </ul>
            </li>
          </Show>
          <li><A href="/auth">auth</A>
            <ul>
              <Show when={state.currentUser} fallback={
                <>
                  <li><A href="/auth/login">login</A></li>
                  <li><A href="/auth/register">register</A></li>
                </>
              }>
                <li><A href="/" onClick={actions.logout}>logout</A></li>
              </Show>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navigation
