import type { Component } from "vue";

export function render(component: Component) {
  return () => h(component, null, {});
}
