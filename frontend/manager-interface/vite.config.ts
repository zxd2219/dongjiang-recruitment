import { resolvers, webConfig } from "@dongjiang-recruitment/vite-config";
import path from "node:path";
import { mergeConfig } from "vite";

const { NaiveUiResolver } = resolvers;

export default mergeConfig(
  webConfig({
    autoImport: {
      imports: [
        "vue",
        "pinia",
        "vue-router",
        "@vueuse/core",
        {
          "naive-ui": [
            "useDialog",
            "useMessage",
            "useNotification",
            "useLoadingBar",
          ],
        },
      ],
    },
    components: {
      resolvers: [NaiveUiResolver()],
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
