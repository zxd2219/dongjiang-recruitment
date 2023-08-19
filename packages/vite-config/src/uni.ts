import uni from "@dcloudio/vite-plugin-uni";
import postcssRemToResponsivePixel from "postcss-rem-to-responsive-pixel";
import { mergeConfig, type UserConfigExport } from "vite";
import weappTailwindcss from "weapp-tailwindcss-webpack-plugin/vite";
import { baseConfig, type BaseOptions } from "./base";

const normal =
  process.env.UNI_PLATFORM && ["h5", "app"].includes(process.env.UNI_PLATFORM);

interface UniOptions extends BaseOptions {
  uni?: Parameters<typeof uni>[0];
  postcssRemToResponsivePixel?: Parameters<
    typeof postcssRemToResponsivePixel
  >[0];
}
export function uniConfig(options?: UniOptions): UserConfigExport {
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
        uni(options?.uni),
        !normal ? weappTailwindcss() : undefined,
      ].filter(Boolean),
      css: {
        modules: {
          localsConvention: "camelCaseOnly",
        },
        postcss: {
          plugins: !normal
            ? [
                postcssRemToResponsivePixel(
                  options?.postcssRemToResponsivePixel
                ),
              ]
            : [],
        },
      },
    }
  );
}
