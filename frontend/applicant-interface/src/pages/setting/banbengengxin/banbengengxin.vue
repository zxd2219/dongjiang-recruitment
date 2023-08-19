<template>
  <NavigationBar title="版本更新" />
  <view class="flex-col page">
    <view class="flex-col main">
      <image
        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16478529383979520523.png"
        class="logo"
      />
      <text class="version">当前版本 {{ versionNum }}</text>
      <view class="justify-between items-center bar-text" @click="checkVersion">
        <text>版本更新</text>
        <text style="padding-right: 10rpx; font-size: 25rpx">{{
          newVersion
        }}</text>
      </view>
      <view class="justify-between items-center bar-text">
        <text>新手指南</text>
        <image
          src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16478529383973147024.png"
          class="image-1"
        />
      </view>
      <view class="justify-between items-center bar-text">
        <text>经营资质</text>
        <image
          src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16478529383973147024.png"
          class="image-1"
        />
      </view>
    </view>
    <view class="flex-col footer">
      <view class="protocol-strategy">
        <text class="text-protocol" @click="text_7OnClick"
          >《东江网用户协议》</text
        >
        <text class="text-6">和</text>
        <text class="text-strategy" @click="text_9OnClick"
          >《东江网隐私政策》</text
        >
      </view>
      <view class="justify-center copyright-c">
        <text>东江网</text>
        <text class="right">版权所有</text>
      </view>
      <text class="copyright-e"
        >Copyright 2022-2222 Dongjiang. All Rights Reserved</text
      >
    </view>
  </view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";

const newVersion = ref("无最新版本");
const { data, refreshAsync } = commonService.useGetNewVersion();
const versionNum = computed(() => data.value || "");

// 查询版本更新
const checkVersion = async () => {
  await refreshAsync();
  uni.showToast({
    title: "已为最新版本",
    icon: "none",
    duration: 1500,
  });
};

const text_7OnClick = () => {
  uni.navigateTo({ url: "/pages/setting/yonghuxieyi/yonghuxieyi" });
};
const text_9OnClick = () => {
  uni.navigateTo({ url: "/pages/setting/yinsicelve/yinsicelve" });
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 1334rpx;
  overflow-y: auto;

  .main {
    width: 100%;
    height: auto;
    font-size: 30rpx;

    .logo {
      align-self: center;
      width: 200rpx;
      height: 200rpx;
    }

    .version {
      align-self: center;
      margin-top: 22rpx;
      font-size: 25rpx;
      line-height: 23rpx;
      color: rgb(0 0 0);
      white-space: nowrap;
    }

    .bar-text {
      width: 93%;
      height: 100rpx;
      margin-top: 20rpx;
      margin-left: 3%;
      font-size: 30rpx;
      border: solid 2rpx rgb(210 210 210);
      border-radius: 5rpx;

      .image-1 {
        width: 20rpx;
        height: 32rpx;
        margin-right: 10rpx;
      }
    }
  }

  .footer {
    position: relative;
    top: 200rpx;
    width: 100%;
    height: auto;

    .protocol-strategy {
      align-self: center;
      line-height: 22rpx;
      white-space: nowrap;

      .text-protocol {
        font-size: 24rpx;
        line-height: 23rpx;
        color: rgb(35 193 158);
      }

      .text-6 {
        font-size: 24rpx;
        line-height: 23rpx;
        color: rgb(0 0 0 / 60%);
      }

      .text-strategy {
        font-size: 24rpx;
        line-height: 23rpx;
        color: rgb(35 193 158);
      }
    }

    .copyright-c {
      margin-top: 17rpx;
      font-size: 25rpx;
      line-height: 23rpx;
      color: rgb(0 0 0 / 30%);
      white-space: nowrap;

      .right {
        margin-left: 12rpx;
      }
    }

    .copyright-e {
      align-self: center;
      margin-top: 18rpx;
      font-size: 25rpx;
      line-height: 24rpx;
      color: rgb(0 0 0 / 30%);
      white-space: nowrap;
    }
  }
}
</style>
