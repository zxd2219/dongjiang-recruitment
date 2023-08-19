<template>
  <NavigationBar />
  <view class="flex-col page">
    <view class="flex-col section-1">
      <text class="text-2">你的社交主页</text>
      <text class="text-3">{{ socialHomepage }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";

const socialHomepage = ref("https://dribbble.com");
</script>

<style lang="scss" scoped>
.page {
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 1204rpx;
  overflow-y: auto;
  background-color: rgb(255 255 255);

  .section-1 {
    position: absolute;
    top: 130rpx;
    right: 20rpx;
    left: 20rpx;
    height: 125rpx;
    padding: 23rpx 20rpx 19rpx;
    overflow: hidden;
    background-color: rgb(255 255 255);
    border: solid 2rpx rgb(210 210 210);
    border-radius: 5rpx;

    .text-2 {
      font-size: 30rpx;
      line-height: 28rpx;
      color: rgb(0 0 0);
      letter-spacing: 6rpx;
      white-space: nowrap;
    }

    .text-3 {
      margin-top: 32rpx;
      font-size: 25rpx;
      line-height: 24rpx;
      color: rgb(0 0 0 / 20%);
      white-space: nowrap;
    }
  }
}
</style>
