import { JSX, children, createComputed, on } from 'solid-js';
import { createStore } from 'solid-js/store';
import { TabItemProps } from './tabs.types';

export const getTabs = (_children: JSX.Element) => {
  const parts = children(() => _children);
  const [tabs, setTabs] = createStore<TabItemProps[]>([]);
  createComputed(
    on(parts, () => {
      for (const part of parts.toArray() as unknown as TabItemProps[]) {
        if (!part.value) {
          continue;
        }
        setTabs((prev) => [...prev, part]);
      }
    })
  );
  return tabs;
};
