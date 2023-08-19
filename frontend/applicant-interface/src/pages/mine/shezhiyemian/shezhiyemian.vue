<template>
  <NavigationBar title="设置" />
  <view class="flex-col page">
    <view class="justify-between items-center group-box" @click="toMyAccount">
      <text class="text-title">我的账户</text>
      <image class="image" src="@/static/icons/arrow-right.png" />
    </view>
    <view class="justify-between items-center group-box" @click="toPassWord">
      <text class="text-title">设置密码</text>
      <image class="image" src="@/static/icons/arrow-right.png" />
    </view>
    <!-- <view class="justify-between items-center group-box" @click="toNotice">
      <text class="text-title">通知设置</text>
      <image class="image" src="@/static/icons/arrow-right.png" />
    </view> -->
    <view
      class="justify-between items-center group-box"
      @click="toUserAgreement"
    >
      <text class="text-title">用户协议</text>
      <image class="image" src="@/static/icons/arrow-right.png" />
    </view>
    <view
      class="justify-between items-center group-box"
      @click="toPrivacyPolicy"
    >
      <text class="text-title">隐私政策</text>
      <image class="image" src="@/static/icons/arrow-right.png" />
    </view>
    <!-- <view class="justify-between items-center group-box">
      <text class="text-title">清除缓存</text>
    </view> -->
    <view class="justify-between items-center group-box" @click="toVersion">
      <text class="text-title">版本更新</text>
      <image class="image" src="@/static/icons/arrow-right.png" />
    </view>
    <view class="justify-center group-button">
      <view class="justify-center items-center button-box" @click="exitAccount">
        <text>退出当前账号</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import { useMainStore } from "@/stores";

const mainStore = useMainStore();

// 我的账户
const toMyAccount = () => {
  uni.navigateTo({ url: "/pages/setting/wodezhanghu/wodezhanghu" });
};
// 设置密码
const toPassWord = () => {
  uni.navigateTo({ url: "/pages/setting/shezhimima/shezhimima" });
};
const toNotice = () => {
  uni.navigateTo({ url: "/pages/setting/tongzhishezhi/tongzhishezhi" });
};
// 用户协议
const toUserAgreement = () => {
  uni.navigateTo({ url: "/pages/setting/yonghuxieyi/yonghuxieyi" });
};
// 隐私设置
const toPrivacyPolicy = () => {
  uni.navigateTo({ url: "/pages/setting/yinsicelve/yinsicelve" });
};
// 版本更新
const toVersion = () => {
  uni.navigateTo({ url: "/pages/setting/banbengengxin/banbengengxin" });
};
// 退出当前账号
const exitAccount = () => {
  // 清除存储中的数据。
  mainStore.token = "";
  mainStore.account = {} as any;
  mainStore.applicant = {} as any;
  mainStore.jobExpectations!.total = 0;
  uni.navigateTo({ url: "/pages/account/denglu_zhuce/denglu" });
};
</script>

<style lang="scss" scoped>
.page {
  .group-box {
    width: 710rpx;
    height: 100rpx;
    margin-top: 20rpx;
    margin-left: 20rpx;
    border: 2rpx solid rgb(200 200 200);
    border-radius: 10rpx;

    .text-title {
      padding-left: 20rpx;
      font-size: 30rpx;
    }
  }

  .group-button {
    position: fixed;
    bottom: 40rpx;
    width: 100%;
    height: 80rpx;

    .button-box {
      width: 500rpx;
      font-size: 30rpx;
      color: #fff;
      background-color: rgb(35 193 158);
      border-radius: 10rpx;
    }
  }

  .image {
    width: 50rpx;
    height: 32rpx;
    padding-right: 10rpx;
  }
}
</style>
