<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme-overrides="themeOverrides"
    class="h-full w-full"
  >
    <n-notification-provider>
      <n-dialog-provider>
        <n-message-provider>
          <main-layout />
        </n-message-provider>
      </n-dialog-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import MainLayout from "@/layouts/main.vue";
import type { GlobalThemeOverrides } from "naive-ui";
import { dateZhCN, zhCN } from "naive-ui";

const themeOverrides: GlobalThemeOverrides = {
  Button: {
    textColorPrimary: "#36ad6a",
    textColorWarning: "#fcb040",
    textColorError: "#de576d",
  },
};

onMounted(() => {
  document.getElementById("loading")?.remove();
});
</script>
