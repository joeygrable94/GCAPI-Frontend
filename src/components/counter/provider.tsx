"use client";
import { createSignal } from "solid-js";
import counterContext from "./counter-context";

export default function Provider(props: any) {
  return (
    <counterContext.Provider value={createSignal(props.initialCount)}>
      {props.children}
    </counterContext.Provider>
  );
}
