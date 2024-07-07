import { JSX, children, createComputed, on } from 'solid-js';
import { createStore } from 'solid-js/store';
import { AccordianItemProps } from './accordion.types';

export const getAccordionItems = (_children: JSX.Element) => {
  const parts = children(() => _children);
  const [items, setItems] = createStore<AccordianItemProps[]>([]);
  createComputed(
    on(parts, () => {
      for (const part of parts.toArray() as unknown as AccordianItemProps[]) {
        if (!part.value) {
          continue;
        }
        setItems((prev) => [...prev, part]);
      }
    })
  );
  return items;
};
