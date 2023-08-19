/// <reference types="vite/client" />
/// <reference types="pinia-plugin-persist"  />

import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    keepAlive?: boolean;
    showHeader?: boolean;
    showMenu?: boolean;
    showNav?: boolean;
    onMenu?: boolean;
    icon?: () => VNodeChild;
    title?: string;
    pms?: string | string[];
  }
}

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_CDN_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

import type { DialogOptions, DialogReactive } from "naive-ui/es/dialog";
declare type ConfirmDialogOptions = DialogOptions & {
  confirm: () => void;
  cancel: () => void;
};

import type { DialogApiInjection } from "naive-ui/es/dialog/src/DialogProvider";
import type { MessageApiInjection } from "naive-ui/lib/message/src/MessageProvider";
declare global {
  interface window {
    $message: MessageApiInjection;
    $dialog: DialogApiInjection & {
      confirm: (options: ConfirmDialogOptions) => DialogReactive;
    };
  }
  const $message: MessageApiInjection;
  const $dialog: DialogApiInjection & {
    confirm: (options: ConfirmDialogOptions) => DialogReactive;
  };
}
