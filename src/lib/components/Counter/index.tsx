import { createMemo, createSignal, onMount } from 'solid-js';
import { useAppStore } from '~/lib/core';
import './Counter.scss';

export default function Counter() {
  const [state, actions]: any = useAppStore();
  const [count, setCount]: any = createSignal(0);

  const currentClickCount = createMemo(() => `Clicks: ${count()} [${state.count}]`);

  const updateCount = (v: number) => {
    let newCount = count() + v;
    setCount(newCount);
    actions.setCount(newCount);
  };

  onMount(() => setCount(state.count));
  return (
    <>
      <h2>{currentClickCount()}</h2>
      <button class="btn increment" onClick={() => updateCount(1)}>
        +
      </button>
      <button class="btn decrement" onClick={() => updateCount(-1)}>
        -
      </button>
    </>
  );
}
