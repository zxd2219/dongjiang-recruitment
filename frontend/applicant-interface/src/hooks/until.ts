import type { Ref } from "vue";

export const until = (ready: Ref<boolean>, callback: () => void) => {
  watch(ready, (value) => value && callback(), {
    immediate: true,
  });
};
