/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />
/// <reference types="vite-plugin-pages/client" />

import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    menu?: boolean;
    icon?: string;
    title?: string;
  }
}

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
