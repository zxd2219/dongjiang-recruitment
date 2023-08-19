import postcssPresetEnv from "postcss-preset-env";
import { visualizer } from "rollup-plugin-visualizer";
import tailwindcss from "tailwindcss";
import autoImport from "unplugin-auto-import/vite";
import * as resolvers from "unplugin-vue-components/resolvers";
import components from "unplugin-vue-components/vite";
import { defineConfig, type PluginOption, type UserConfigExport } from "vite";
import checker from "vite-plugin-checker";
import compression from "vite-plugin-compression";
import imagemin from "vite-plugin-imagemin";

export interface BaseOptions {
  autoImport?: Parameters<typeof autoImport>[0];
  components?: Parameters<typeof components>[0];
  checker?: Parameters<typeof checker>[0] | false;
  imagemin?: Parameters<typeof imagemin>[0];
  compression?: Parameters<typeof compression>[0];
  visualizer?: Parameters<typeof visualizer>[0];
  tailwindcss?: Parameters<typeof tailwindcss>[0];
  postcssPresetEnv?: Parameters<typeof postcssPresetEnv>[0];
}
export function baseConfig(options?: BaseOptions): UserConfigExport {
  const autoImportPlugin = autoImport({
    dts: true,
    defaultExportByFilename: true,
    eslintrc: {
      enabled: true,
      filepath: ".eslintrc.auto",
    },
    ...options?.autoImport,
  }) as Exclude<PluginOption, Promise<PluginOption>>;

  const autoComponents = components({
    dts: true,
    ...options?.components,
  });

  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [
      {
        ...autoImportPlugin,
        enforce: "post",
        apply: "serve",
      } as PluginOption,
      {
        ...autoImportPlugin,
        enforce: "pre",
        apply: "build",
      } as PluginOption,
      {
        ...autoComponents,
        enforce: "post",
        apply: "serve",
      },
      {
        ...autoComponents,
        enforce: "pre",
        apply: "build",
      },
      options?.checker !== false
        ? checker({
            vueTsc: true,
            enableBuild: true,
            eslint: {
              lintCommand: "eslint **/*.{js,jsx,ts,tsx,vue} --fix",
            },
            stylelint: {
              lintCommand: "stylelint **/*.{css,scss,sass,less,styl,vue} --fix",
            },
            ...options?.checker,
          })
        : undefined,
      imagemin(options?.imagemin),
      compression(options?.compression),
      visualizer(options?.visualizer),
    ].filter(Boolean),
    css: {
      postcss: {
        plugins: [
          tailwindcss(options?.tailwindcss),
          postcssPresetEnv(options?.postcssPresetEnv),
        ].filter(Boolean),
      },
    },
  });
}

export { resolvers };
