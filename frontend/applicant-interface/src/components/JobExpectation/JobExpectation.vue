<template>
  <view class="flex-col component" @click="rootViewOnClick">
    <view class="flex-row">
      <text class="text">{{ name }}</text>
      <text class="text-1">{{ salary }}</text>
    </view>
    <view class="justify-between group-2">
      <text class="text-2">{{ direction }}</text>
      <image
        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16481303724340497012.png"
        class="image"
      />
    </view>
    <view class="flex-row group-3">
      <text>{{ city }}</text>
      <text class="text-4">{{ entryTime }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
const name = ref("前段工程师");
const salary = ref("8K-9K");
const direction = ref("React");
const city = ref("重庆");
const entryTime = ref("1个月内入职");

const rootViewOnClick = () => {
  uni.navigateTo({ url: "/pages/info/qiuzhiqiwang/qiuzhiqiwang" });
};
</script>

<style lang="scss" scoped>
.component {
  padding: 3rpx 0 5rpx;

  .group-2 {
    padding: 0 2rpx;
    margin-top: 13rpx;
    font-size: 25rpx;
    line-height: 18rpx;
    color: rgb(0 0 0 / 50%);
    white-space: nowrap;

    .text-2 {
      margin: 8rpx 0 4rpx;
    }

    .image {
      width: 17rpx;
      height: 30rpx;
      margin-right: 17rpx;
    }
  }

  .group-3 {
    margin-top: 14rpx;
    font-size: 25rpx;
    line-height: 23rpx;
    color: rgb(0 0 0 / 50%);
    white-space: nowrap;

    .text-4 {
      margin-left: 13rpx;
    }
  }

  .text {
    font-size: 30rpx;
    line-height: 28rpx;
    color: rgb(0 0 0);
    white-space: nowrap;
  }

  .text-1 {
    margin: 4rpx 0 2rpx 15rpx;
    font-size: 30rpx;
    line-height: 22rpx;
    color: rgb(0 0 0);
    white-space: nowrap;
  }
}
</style>
