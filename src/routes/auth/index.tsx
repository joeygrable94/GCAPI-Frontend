import { Navigator, useNavigate } from "@solidjs/router"
import { Component, onMount } from "solid-js"
import { useStore } from "~/context"

const AuthDefault: Component = () => {
  
  const [{currentUser},]: any = useStore()
  const navigate: Navigator = useNavigate();

  onMount(() => {
    if (currentUser) {
      navigate("/")
    }
  })

  return (
    <main class="container">
      <h1>Authorization Required</h1>
      <p>Try to <a href="/auth/login">login</a>, or <a href="/auth/register">register</a> your account.</p>
    </main>
  )
}

export default AuthDefault
