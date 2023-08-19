<template>
  <NavigationBar :title="title" />
  <web-view :src="url" style="margin-top: 100rpx"></web-view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";

const url = ref("");
const title = ref("");

onLoad((options) => {
  url.value = options!.url;
  title.value = options!.title;
});
</script>

<style lang="scss" scoped></style>
