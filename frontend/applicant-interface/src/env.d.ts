/// <reference types="vite/client" />
/// <reference types="pinia-plugin-persist-uni" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_CDN_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
