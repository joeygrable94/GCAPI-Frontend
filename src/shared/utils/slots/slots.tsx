import { children, Component, createComputed, JSX, on } from 'solid-js';
import { createStore } from 'solid-js/store';

export const getSlots = (_children: JSX.Element) => {
  const parts = children(() => _children);
  const [slots, setSlots] = createStore<Record<string, JSX.Element>>({});
  createComputed(
    on(parts, () => {
      for (const part of parts.toArray() as unknown as SlotProps[]) {
        if (!part.name) {
          setSlots('default', () => part as unknown as JSX.Element);
          continue;
        }
        setSlots(part.name, () => part.children);
      }
    })
  );
  return slots;
};

interface SlotProps {
  name: string;
  children: JSX.Element;
}

const Slot: Component<SlotProps> = (props) => {
  return props as unknown as JSX.Element;
};

export default Slot;
