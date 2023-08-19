<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive
      v-if="
        route.meta.keepAlive !== false &&
        mainStore.history.some((r) => r.path === route.path)
      "
    >
      <component :is="Component" />
    </keep-alive>
    <component v-else :is="Component" />
  </router-view>
</template>

<script setup lang="ts">
import { useMainStore } from "@/stores";

const mainStore = useMainStore();
</script>
