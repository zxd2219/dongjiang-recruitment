import uni from "@dcloudio/vite-plugin-uni";
import postcssRemToResponsivePixel from "postcss-rem-to-responsive-pixel";
import { type UserConfigExport } from "vite";
import { type BaseOptions } from "./base";
interface UniOptions extends BaseOptions {
  uni?: Parameters<typeof uni>[0];
  postcssRemToResponsivePixel?: Parameters<
    typeof postcssRemToResponsivePixel
  >[0];
}
export declare function uniConfig(options?: UniOptions): UserConfigExport;
export {};
