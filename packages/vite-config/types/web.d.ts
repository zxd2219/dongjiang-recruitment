import postcssPxToRem from "@minko-fe/postcss-pxtorem";
import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { type UserConfigExport } from "vite";
import cdnImport from "vite-plugin-cdn-import-async";
import { type BaseOptions } from "./base";
interface WebOptions extends BaseOptions {
  vue?: Parameters<typeof vue>[0];
  vueJsx?: Parameters<typeof vueJsx>[0];
  legacy?: Parameters<typeof legacy>[0];
  cdnImport?: Parameters<typeof cdnImport>[0];
  postcssPxToRem?: Parameters<typeof postcssPxToRem>[0];
}
export declare function webConfig(options?: WebOptions): UserConfigExport;
export {};
