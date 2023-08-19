<template>
  <NavigationBar class="group" />
  <view class="flex-row page">
    <view class="flex-col items-center equal-division-item">
      <image
        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16481303738707613285.png"
        class="image-1"
      />
      <text class="text-2">上传图片</text>
    </view>
    <image
      src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16481303737537221255.png"
      class="equal-division-item-1"
    />
    <image
      src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16481303737537221255.png"
      class="equal-division-item-2"
    />
  </view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
</script>

<style lang="scss" scoped>
.page {
  position: relative;
  width: 100%;
  height: 1334rpx;
  padding: 59rpx 20rpx 1004rpx;
  overflow-y: auto;
  background-color: rgb(255 255 255);

  .group {
    position: absolute;
    top: 59rpx;
    right: 20rpx;
    left: 20rpx;
  }

  .equal-division-item {
    position: absolute;
    top: 130rpx;
    left: 20rpx;
    width: 200rpx;
    height: 200rpx;
    padding: 60rpx 0 23rpx;
    overflow: hidden;
    font-size: 18rpx;
    line-height: 17rpx;
    color: rgb(0 0 0 / 50%);
    white-space: nowrap;
    background-color: rgb(229 229 229 / 50%);
    border-radius: 5rpx;

    .image-1 {
      width: 80rpx;
      height: 80rpx;
    }

    .text-2 {
      margin-top: 21rpx;
    }
  }

  .equal-division-item-1 {
    position: absolute;
    top: 130rpx;
    left: 50%;
    width: 200rpx;
    height: 200rpx;
    transform: translateX(-50%);
  }

  .equal-division-item-2 {
    position: absolute;
    top: 130rpx;
    right: 20rpx;
    width: 200rpx;
    height: 200rpx;
  }
}
</style>
