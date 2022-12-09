import { Navigator, useNavigate } from "@solidjs/router"
import { Component, createMemo, onMount, Show } from "solid-js"
import { useStore } from "~/context"

const UsersCurrent: Component = () => {
  
  const [{currentUser},]: any = useStore()
  const navigate: Navigator = useNavigate();

  onMount(() => {
    if (!currentUser) {
      navigate("/auth/login")
    }
  })

  return (
    <main class="container">
      <h1>Hello</h1>
      <Show when={currentUser}>
        <p>Welcome, {currentUser.email}!</p>
      </Show>
    </main>
  )
}

export default UsersCurrent
