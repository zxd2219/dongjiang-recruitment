<template>
  <!--  #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ -->
  <view
    :style="'height: ' + (navigationBarHeight + navigationBarTop) + 'px'"
  ></view>
  <view
    class="header"
    :style="
      'padding-top: ' +
      navigationBarTop +
      'px; height: ' +
      (navigationBarHeight + navigationBarTop) +
      'px; width: ' +
      navigationBarWidth +
      'px;'
    "
  >
    <view class="text items-center justify-center">
      <text>{{ title }}</text>
    </view>
    <view
      class="component items-center justify-between"
      :style="
        'top: ' +
        navigationBarTop +
        'px; height: ' +
        navigationBarHeight +
        'px;'
      "
    >
      <image class="image" :src="leftUrl" @click="imageOnClick" />
      <text class="text-1" @click="emit('rightClick')">{{ right }}</text>
    </view>
  </view>
  <!-- #endif -->
  <!--  #ifndef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ -->
  <view
    style="height: var(--tab-bar-height); padding-top: var(-–status-bar-height)"
  ></view>
  <view class="header" style="padding-top: var(-–status-bar-height)">
    <view class="text items-center justify-center">
      <text>{{ title }}</text>
    </view>
    <view
      class="component items-center justify-between"
      style="top: 0rpx; height: 100%"
    >
      <image class="image" :src="leftUrl" @click="imageOnClick" />
      <text class="text-1" @click="emit('rightClick')">{{ right }}</text>
    </view>
  </view>
  <!-- #endif -->
</template>

<script lang="ts" setup>
import { useMainStore } from "@/stores";
const mainStore = useMainStore();

/* #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ */

// 获取小程序胶囊的高度、顶部和左侧。
const navigationBarHeight = mainStore.menu.height;

const navigationBarTop = mainStore.menu.top;

const navigationBarWidth = mainStore.menu.left;

/* #endif */

const props = defineProps({
  left: {
    type: String,
    default: "return",
  },
  title: {
    type: String,
    default: "",
  },
  right: {
    type: String,
    default: "",
  },
});

const pages = getCurrentPages();

// 自定义事件
const emit = defineEmits(["rightClick"]);

const leftUrl = computed(() => {
  return props.left === "return"
    ? "https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16481303716988161723.png"
    : "";
});

const imageOnClick = () => {
  if (pages.length <= 1) {
    uni.switchTab({
      url: "/pages/main/shouyeyemian/shouyeyemian",
    });
    return;
  }
  uni.navigateBack({
    delta: 1,
  });
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 750rpx;
  height: var(--tab-bar-height);
  padding: 0 40rpx;
  background-color: #fff;

  .component {
    position: absolute;
    width: calc(100% - 80rpx);
  }

  .image {
    width: 25rpx;
    height: 35rpx;
  }

  .text {
    width: 100%;
    height: 100%;
    font-size: 30rpx;
    line-height: 28rpx;
    color: rgb(0 0 0);
    text-align: center;
    white-space: nowrap;
  }

  .text-1 {
    font-size: 30rpx;
    line-height: 23rpx;
    color: rgb(35 193 158);
    letter-spacing: 2.5rpx;
    white-space: nowrap;
  }
}
</style>
