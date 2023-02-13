import { uniConfig } from "@dongjiang-recruitment/vite-config";
import path from "node:path";
import { mergeConfig } from "vite";

export default mergeConfig(
  uniConfig({
    autoImport: {
      imports: ["vue", "pinia", "uni-app"],
    },
  }),
  {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  }
);
