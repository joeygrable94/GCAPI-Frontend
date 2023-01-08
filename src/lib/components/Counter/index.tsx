import { useStore } from '~/lib/core/state';
import './Counter.css';

export default function Counter() {
  const [state, actions]: any = useStore();
  return (
    <>
      <h2>Clicks: {state.count}</h2>
      <button
        class="btn increment"
        onClick={() => actions.setCount(state.count + 1)}
      >
        +
      </button>
      <button
        class="btn decrement"
        onClick={() => actions.setCount(state.count - 1)}
      >
        -
      </button>
    </>
  );
}
