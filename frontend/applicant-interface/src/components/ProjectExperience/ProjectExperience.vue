<template>
  <view class="flex-col component" @click="rootViewOnClick">
    <text class="text">{{ project }}</text>
    <view class="justify-between group-1">
      <view class="flex-col group-2">
        <text class="text-1">{{ date }}</text>
        <text class="text-2">{{ work }}</text>
      </view>
      <image
        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16481303724261238979.png"
        class="image"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
const project = ref("LOL");
const date = ref("2020.02-2021.06");
const work = ref("完成召唤兽");

const rootViewOnClick = () => {
  uni.navigateTo({ url: "/pages/info/xiangmujingli/xiangmujingli" });
};
</script>

<style lang="scss" scoped>
.component {
  padding: 6rpx 0 7rpx;

  .text {
    margin-left: 3rpx;
    font-size: 30rpx;
    line-height: 22rpx;
    color: rgb(0 0 0);
    white-space: nowrap;
  }

  .group-1 {
    margin-top: 16rpx;

    .group-2 {
      margin-top: 3rpx;

      .text-1 {
        font-size: 30rpx;
        line-height: 22rpx;
        color: rgb(0 0 0 / 50%);
        white-space: nowrap;
      }

      .text-2 {
        margin-top: 15rpx;
        font-size: 30rpx;
        line-height: 28rpx;
        color: rgb(0 0 0 / 50%);
        white-space: nowrap;
      }
    }

    .image {
      width: 18rpx;
      height: 29rpx;
      margin-right: 18rpx;
    }
  }
}
</style>
