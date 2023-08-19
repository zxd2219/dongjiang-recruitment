import { webConfig } from "@dongjiang-recruitment/vite-config";
import path from "node:path";
import { mergeConfig } from "vite";

export default mergeConfig(
  webConfig({
    checker: false,
    postcssPxToRem: false,
    autoImport: {
      imports: [
        "vue",
        "pinia",
        "vue-router",
        "@vueuse/core",
        {
          "@dongjiang-recruitment/service-common": [
            "authenticationService",
            "authenticationAccountService",
            "authenticationAuthorityGroupService",
            "authenticationAuthorityService",
            "advertiserAdvertiseService",
            "advertiserService",
            "applicantAttentionRecordService",
            "applicantDeliveryRecordService",
            "applicantEducationExperienceService",
            "applicantGarnerRecordService",
            "applicantInspectionRecordService",
            "applicantService",
            "applicantJobExpectationService",
            "applicantProjectExperienceService",
            "applicantWorkExperienceService",
            "commonService",
            "companyService",
            "companyPositionService",
            "personnelInspectionRecordService",
            "personnelService",
          ],
        },
      ],
    },
    tailwindcss: path.resolve(__dirname, "./tailwind.config.js"),
  }),
  {
    base: "./",
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  }
);
