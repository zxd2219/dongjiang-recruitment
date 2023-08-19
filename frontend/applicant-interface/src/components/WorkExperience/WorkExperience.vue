<template>
  <view class="flex-col component" @click="rootViewOnClick">
    <view class="flex-row">
      <text class="text">{{ company }}</text>
      <text class="text-1">{{ direction }}</text>
    </view>
    <view class="justify-between group-2">
      <text class="text-2">{{ work }}</text>
      <image
        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16481303724340497012.png"
        class="image"
      />
    </view>
    <text class="text-3">{{ date }}</text>
  </view>
</template>

<script lang="ts" setup>
const date = ref("2020.03 - 2021.03");
const company = ref("命通科技");
const direction = ref("后端工程师");
const work = ref("开发后台");

const rootViewOnClick = () => {
  uni.navigateTo({ url: "/pages/info/gongzuojingli/gongzuojingli" });
};
</script>

<style lang="scss" scoped>
.component {
  padding: 3rpx 0 7rpx;

  .group-2 {
    margin-top: 13rpx;
    font-size: 25rpx;
    line-height: 23rpx;
    color: rgb(0 0 0 / 50%);
    white-space: nowrap;

    .text-2 {
      margin: 5rpx 0 3rpx;
    }

    .image {
      width: 17rpx;
      height: 30rpx;
      margin-right: 19rpx;
    }
  }

  .text-3 {
    margin-top: 17rpx;
    font-size: 25rpx;
    line-height: 18rpx;
    color: rgb(0 0 0 / 50%);
    white-space: nowrap;
  }

  .text {
    font-size: 30rpx;
    line-height: 28rpx;
    color: rgb(0 0 0);
    white-space: nowrap;
  }

  .text-1 {
    margin-top: 2rpx;
    margin-left: 15rpx;
    font-size: 25rpx;
    line-height: 23rpx;
    color: rgb(0 0 0 / 50%);
    white-space: nowrap;
  }
}
</style>
