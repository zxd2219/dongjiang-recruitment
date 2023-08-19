import { uniConfig } from "@dongjiang-recruitment/vite-config";
import path from "node:path";
import { mergeConfig } from "vite";

export default mergeConfig(
  uniConfig({
    checker: false,
    autoImport: {
      imports: [
        "vue",
        "pinia",
        "uni-app",
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
  }),
  {
    base: "./",
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: (content: any, path: string) => {
            if (path.endsWith("src/style.scss")) {
              return content;
            }

            return `
              @import "~@/style.scss";
              ${content}
            `;
          },
        },
      },
    },
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
