<template>
  <view class="flex-col component" @click="rootViewOnClick">
    <text class="text">{{ school }}</text>
    <view class="justify-between group-1">
      <text class="text-1">{{ levelAndProfession }}</text>
      <image
        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16481303724261238979.png"
        class="image"
      />
    </view>
    <text class="text-2">{{ date }}</text>
  </view>
</template>

<script lang="ts" setup>
const school = ref("电子科技大学");
const date = ref("2019.09 - 2022.06");
const levelAndProfession = ref("本科 | 计算机科学与技术");

const rootViewOnClick = () => {
  uni.navigateTo({ url: "/pages/info/jiaoyujingli/jiaoyujingli" });
};
</script>

<style lang="scss" scoped>
.component {
  padding: 3rpx 0 7rpx;

  .text {
    margin-left: 4rpx;
    font-size: 30rpx;
    line-height: 28rpx;
    color: rgb(0 0 0);
    white-space: nowrap;
  }

  .group-1 {
    margin-top: 13rpx;
    font-size: 25rpx;
    line-height: 24rpx;
    color: rgb(0 0 0 / 50%);
    white-space: nowrap;

    .text-1 {
      margin-top: 5rpx;
    }

    .image {
      width: 18rpx;
      height: 29rpx;
      margin-right: 18rpx;
    }
  }

  .text-2 {
    margin-top: 18rpx;
    font-size: 25rpx;
    line-height: 18rpx;
    color: rgb(0 0 0 / 51%);
    white-space: nowrap;
  }
}
</style>
