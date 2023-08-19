import postcssPxToRem from "@minko-fe/postcss-pxtorem";
import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { mergeConfig, type UserConfigExport } from "vite";
import cdnImport from "vite-plugin-cdn-import-async";
import { baseConfig, type BaseOptions } from "./base";

interface WebOptions extends BaseOptions {
  vue?: Parameters<typeof vue>[0];
  vueJsx?: Parameters<typeof vueJsx>[0];
  legacy?: Parameters<typeof legacy>[0];
  cdnImport?: Parameters<typeof cdnImport>[0];
  postcssPxToRem?: Parameters<typeof postcssPxToRem>[0] | false;
}
export function webConfig(options?: WebOptions): UserConfigExport {
  return mergeConfig(
    baseConfig({
      autoImport: options?.autoImport,
      checker: options?.checker,
      visualizer: options?.visualizer,
      components: options?.components,
      tailwindcss: options?.tailwindcss,
      postcssPresetEnv: options?.postcssPresetEnv,
    }),
    {
      plugins: [
        vue({
          reactivityTransform: true,
          ...options?.vue,
        }),
        vueJsx(options?.vueJsx),
        legacy(options?.legacy),
        cdnImport(
          options?.cdnImport || {
            modules: [
              {
                name: "vue",
                var: "Vue",
                path: `https://cdn.jsdelivr.net/npm/vue@3.2.45/dist/vue.runtime.global.prod.js`,
                css: [
                  "https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css",
                ],
              },
              {
                name: "vue-demi",
                var: "VueDemi",
                path: `https://cdn.jsdelivr.net/npm/vue-demi@0.13.11/lib/index.iife.min.js`,
              },
              {
                name: "vue-router",
                var: "VueRouter",
                path: `https://cdn.jsdelivr.net/npm/vue-router@4.1.6/dist/vue-router.global.min.js`,
              },
              {
                name: "pinia",
                var: "Pinia",
                path: "https://cdn.jsdelivr.net/npm/pinia@2.0.28/dist/pinia.iife.min.js",
              },
            ],
          }
        ),
      ].filter(Boolean),
      css: {
        modules: {
          localsConvention: "camelCaseOnly",
        },
        postcss: {
          plugins: [
            options?.postcssPxToRem !== false
              ? postcssPxToRem(
                  options?.postcssPxToRem || {
                    rootValue: 16,
                    unitPrecision: 5,
                    propList: ["*"],
                  }
                )
              : undefined,
          ].filter(Boolean),
        },
      },
    }
  );
}
