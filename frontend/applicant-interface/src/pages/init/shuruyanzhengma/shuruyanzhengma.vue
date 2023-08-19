<template>
  <NavigationBar />
  <view class="flex-col page">
    <text class="text">请输入验证码</text>
    <view class="group">
      <text class="text-1">4位验证码已发送至:</text>
      <text class="text-2">{{ phonceNumber }}</text>
    </view>
    <view class="justify-evenly group-1">
      <view class="section-1"></view>
      <view class="section-2"></view>
      <view class="section-2"></view>
      <view class="section-2"></view>
    </view>
    <text class="text-3">重新发送验证码</text>
    <button @click="getPhoneNum">点击获取手机号</button>
  </view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";

const phonceNumber = ref("180******64");
const getPhoneNum = () => {
  uni.getStorage({
    key: "tel",
    success: (res) => {},
    fail: (error) => {},
  });
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  padding-bottom: 672rpx;
  overflow-y: auto;
  background-color: rgb(255 255 255);

  .text {
    margin-top: 134rpx;
    margin-left: 102rpx;
    font-size: 45rpx;
    line-height: 42rpx;
    color: rgb(0 0 0);
    white-space: nowrap;
  }

  .group {
    align-self: center;
    margin-top: 42rpx;
    line-height: 26rpx;
    white-space: nowrap;

    .text-1 {
      font-size: 30rpx;
      line-height: 26rpx;
      color: rgb(0 0 0 / 50%);
    }

    .text-2 {
      font-size: 30rpx;
      line-height: 22rpx;
      color: rgb(0 0 0);
    }
  }

  .group-1 {
    padding: 0 100rpx;
    margin-top: 86rpx;

    .section-1 {
      width: 138rpx;
      height: 131rpx;
      overflow: hidden;
      border: solid 2rpx rgb(35 193 158);
    }

    .section-2 {
      width: 138rpx;
      height: 131rpx;
      overflow: hidden;
      border: solid 2rpx rgb(196 196 196);
    }
  }

  .text-3 {
    margin-top: 57rpx;
    margin-left: 102rpx;
    font-size: 30rpx;
    line-height: 28rpx;
    color: rgb(0 0 0 / 50%);
    white-space: nowrap;
  }
}
</style>
