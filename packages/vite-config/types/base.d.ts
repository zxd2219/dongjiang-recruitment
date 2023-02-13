import postcssPresetEnv from "postcss-preset-env";
import { visualizer } from "rollup-plugin-visualizer";
import tailwindcss from "tailwindcss";
import autoImport from "unplugin-auto-import/vite";
import * as resolvers from "unplugin-vue-components/resolvers";
import components from "unplugin-vue-components/vite";
import { type UserConfigExport } from "vite";
import checker from "vite-plugin-checker";
import compression from "vite-plugin-compression";
import imagemin from "vite-plugin-imagemin";
export interface BaseOptions {
  autoImport?: Parameters<typeof autoImport>[0];
  components?: Parameters<typeof components>[0];
  checker?: Parameters<typeof checker>[0];
  imagemin?: Parameters<typeof imagemin>[0];
  compression?: Parameters<typeof compression>[0];
  visualizer?: Parameters<typeof visualizer>[0];
  tailwindcss?: Parameters<typeof tailwindcss>[0];
  postcssPresetEnv?: Parameters<typeof postcssPresetEnv>[0];
}
export declare function baseConfig(options?: BaseOptions): UserConfigExport;
export { resolvers };
