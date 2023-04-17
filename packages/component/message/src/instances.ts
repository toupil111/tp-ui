import { createVNode, render, computed } from "vue";

import { shallowReactive } from "vue";

export const instances: any[] = shallowReactive([]);

export const getInstance = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id);
  const current = instances[idx];
  let prev: any | undefined;
  if (idx > 0) {
    prev = instances[idx - 1];
  }
  return { current, prev };
};
export const getLastOffset = (id: string): number => {
  const { prev } = getInstance(id);
  if (!prev) return 0;
  const idx = instances.findIndex((instance) => instance.id === prev.id);
  // 根据索引去乘offset
  if (idx < 0) return 0;
  const _offset = 60 * (idx + 1);
  return _offset;
};

export const getOffsetOrSpace = (id: string, offset: number) => {
  const idx = instances.findIndex((instance) => instance.id === id);
  return idx > 0 ? 20 : offset;
};
