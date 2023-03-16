<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
      <input v-model="page" type="number" placeholder="页数" />
      <view>
        <view v-for="item in data?.body.items" :key="item.id">
          <text>{{ item.name }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const page = ref<number>(0);

const { data } = advertiserService.useQueryAdvertiser(
  () => ({
    size: 10,
    page: page.value,
    query: [
      {
        name: ["$like", "%总%"],
      },
    ],
  }),
  {
    refreshDeps: [page],
  }
);
const title = ref("Hello");
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 200rpx;
  height: 200rpx;
  margin: 200rpx auto 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
