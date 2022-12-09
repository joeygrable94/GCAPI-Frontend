import { Component, Show } from "solid-js"
import { useStore } from "~/context"

const Footer: Component = () => {
  const [state]: any = useStore()
  return (
    <>
      <pre style="background:black;color:white;padding:1em 2em;">
        App Name: {state.appName}<br/>
        App Token: {state.token}<br/>
        <Show when={state.currentUser}>
          Current User: {state.currentUser.email} ({state.currentUser.id})<br/>
        </Show>
      </pre>
    </>
  )
}

export default Footer
