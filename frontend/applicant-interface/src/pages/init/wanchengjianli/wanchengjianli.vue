<template>
  <view class="flex-col page">
    <image
      src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16481303716980208668.png"
      class="image"
    />
    <view class="justify-center items-center button" @click="viewOnClick">
      <text>完善简历信息</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
const viewOnClick = () => {
  uni.navigateTo({ url: "/pages/init/wanshangerenxinxi/wanshangerenxinxi" });
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  padding: 236rpx 100rpx 381rpx;
  overflow-y: auto;
  background-color: rgb(255 255 255);

  .image {
    width: 450rpx;
    height: 571rpx;
    margin: 0 50rpx;
  }

  .button {
    height: 80rpx;
    padding: 25rpx 0 30rpx;
    margin-top: 66rpx;
    overflow: hidden;
    background-color: rgb(35 193 158);
    border-radius: 15rpx;
  }
}
</style>
