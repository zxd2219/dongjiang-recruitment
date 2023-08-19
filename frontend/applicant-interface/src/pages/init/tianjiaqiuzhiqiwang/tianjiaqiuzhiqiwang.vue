<template>
  <NavigationBar />
  <view class="flex-col page">
    <text class="text">填写你的求职目标</text>
    <view class="section-1 flex-col view">
      <text class="text-1">期望职位</text>
      <view class="bottom-group justify-between view-1" @click="view_6OnClick">
        <text class="text-3">{{ jobExpectation }}</text>
        <image
          src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16481303716985504722.png"
          class="image-1"
        />
      </view>
    </view>
    <view class="section-1 flex-col">
      <text class="text-1">期望城市</text>
      <view class="bottom-group justify-between" @click="view_7OnClick">
        <text>{{ cityExpectation }}</text>
        <image
          src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16481303716985504722.png"
          class="image-1"
        />
      </view>
    </view>
    <view class="section-1 flex-col">
      <text class="text-1">期望月薪</text>
      <view class="bottom-group justify-between">
        <text>{{ salaryExpectation }}</text>
        <image
          src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16481303716985504722.png"
          class="image-1"
        />
      </view>
    </view>
    <view class="flex-col items-center button" @click="nextStep">
      <text>下一步</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";

const jobExpectation = ref("请选择");
const cityExpectation = ref("请选择");
const salaryExpectation = ref("请选择");

const view_6OnClick = () => {
  uni.navigateTo({ url: "/pages/most/zhiweileixing/zhiweileixing" });
};

const view_7OnClick = () => {
  uni.navigateTo({ url: "/pages/most/chengshixuanze/chengshixuanze" });
};

const nextStep = () => {
  uni.switchTab({ url: "/pages/main/shouyeyemian/shouyeyemian" });
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  padding-bottom: 50rpx;
  overflow-y: auto;
  background-color: rgb(255 255 255);

  .text {
    margin-top: 47rpx;
    margin-left: 31rpx;
    font-size: 35rpx;
    line-height: 32rpx;
    color: rgb(0 0 0);
    white-space: nowrap;
  }

  .section-1 {
    height: 125rpx;
    padding: 23rpx 0 21rpx 21rpx;
    margin: 18rpx 20rpx 0;
    overflow: hidden;
    border: solid 2rpx rgb(210 210 210 / 50%);
    border-radius: 5rpx;

    .text-1 {
      font-size: 30rpx;
      line-height: 28rpx;
      color: rgb(0 0 0 / 60%);
      letter-spacing: 6rpx;
      white-space: nowrap;
    }

    .bottom-group {
      margin-top: 27rpx;
      font-size: 25rpx;
      line-height: 23rpx;
      color: rgb(0 0 0 / 50%);
      white-space: nowrap;

      .text-3 {
        margin-bottom: 3rpx;
      }

      .image-1 {
        width: 15rpx;
        height: 24rpx;
        margin-right: 20rpx;
      }
    }

    .view-1 {
      margin-top: 26rpx;
    }
  }

  .view {
    margin: 44rpx 20rpx 0;
  }

  .button {
    align-self: center;
    width: 550rpx;
    height: 80rpx;
    padding: 25rpx 0 29rpx;
    margin-top: 549rpx;
    overflow: hidden;
    font-size: 30rpx;
    line-height: 28rpx;
    color: rgb(255 255 255);
    white-space: nowrap;
    background-color: rgb(35 193 158);
    border-radius: 15rpx;
  }
}
</style>
