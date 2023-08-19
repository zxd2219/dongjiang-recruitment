<template>
  <view class="flex-col user-bubble-box">
    <!-- <view class="justify-center items-center" style="width: 100%; height: auto">
      {{ time }}
    </view> -->
    <view class="flex-row" style="margin-top: 25rpx">
      <image
        :src="
          VITE_CDN_URL +
          (hrInfo.avatarUrl ? hrInfo.avatarUrl : '/image/heard2.jpg')
        "
        class="img"
      />
      <view class="flex-col">
        <view class="flex-row">
          <view v-if="type === 1" class="flex-row">
            <view class="user-box"></view>
            <view class="items-center bubble-box">{{ mes }}</view>
          </view>
          <view v-else-if="type === 2">
            <image :src="VITE_CDN_URL + mes" class="img-photo" />
          </view>
          <view v-else-if="type === 3">
            <image :src="mes" class="img-photo" />
          </view>
          <view v-else-if="type === 4" class="flex-row">
            <image
              src="@/static/icons/file.svg"
              class="img-file"
              @click="downFile(useResFullPath(mes))"
            />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useResFullPath } from "@/hooks";

const VITE_CDN_URL = import.meta.env.VITE_CDN_URL;

// 定义组件的 props。接收父组件传值
const props = defineProps({
  hrInfo: {
    type: Object,
    default: () => ({}),
  },
  mes: {
    type: String,
    default: "",
  },
  type: {
    type: Number,
    default: 1,
  },
  time: {
    type: String,
    default: "",
  },
});

// 下载文件的函数。
const downFile = (m: string) => {
  uni.downloadFile({
    url: m,
    success: (res) => {
      uni.saveFile({
        tempFilePath: res.tempFilePath,
        success: (res) => {
          uni.showToast({
            title: "下载成功",
            icon: "none",
            duration: 2000,
          });
        },
      });
    },
  });
};
</script>

<style lang="scss" scoped>
.user-bubble-box {
  width: auto;
  height: auto;
  margin-top: 30rpx;
  margin-left: 20rpx;

  .img {
    width: 95rpx;
    height: 95rpx;
    border-radius: 50%;
  }

  .bubble-box {
    max-width: 450rpx;
    height: auto;
    min-height: 80rpx;
    padding: 0 20rpx;
    letter-spacing: normal;
    word-break: break-all;
    background-color: rgb(39 156 234);
    border-radius: 15rpx;
  }

  .img-photo {
    width: 300rpx;
    height: 300rpx;
    margin-left: 15rpx;
    border-radius: 10rpx;
  }

  .img-file {
    width: 120rpx;
    height: 100rpx;
    margin-left: 10rpx;
    border-radius: 10rpx;
  }

  .user-box {
    width: 0;
    height: 0;
    margin-top: 10rpx;
    border: 15rpx solid;
    border-color: transparent rgb(39 156 234) transparent transparent;
  }
}
</style>
