/// <reference types="vite/client" />
/// <reference types="amap-js-api" />
/// <reference types="amap-js-sdk" />

import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    menu?: boolean;
    icon?: string;
    title?: string;
  }
}

declare global {
  interface ImportMetaEnv {
    readonly VITE_BASE_URL: string;
    readonly VITE_CDN_URL: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
