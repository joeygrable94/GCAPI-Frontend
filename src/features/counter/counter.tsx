import { Button } from '@suid/material';
import { Component, createMemo, createSignal } from 'solid-js';

const Counter: Component<any> = () => {
  const [count, setCount] = createSignal(0);
  const clicksCount = createMemo(() => `Clicks: ${count()}`);
  return (
    <>
      <Button class="increment" onClick={() => setCount(count() + 1)}>
        {clicksCount()}
      </Button>
    </>
  );
};

export { Counter };
