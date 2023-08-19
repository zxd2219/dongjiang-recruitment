<template>
  <view class="flex-row items-center info-box" @click="toChatPage">
    <image class="image-heard" :src="useResFullPath(personnel.avatarUrl)" />
    <view class="infos">
      <view class="flex-row justify-between name-time">
        <text>{{ personnel!.hrName }}</text>
        <text style="font-size: 25rpx">{{ time }}</text>
      </view>
      <view class="justify-between items-center flex-row">
        <view class="message">
          <text v-if="messageType === 1" style="white-space: nowrap">{{
            message
          }}</text>
          <text v-else-if="messageType === 2" style="white-space: nowrap"
            >[图片]</text
          >
        </view>
        <view v-if="!haveRead" class="is-read"></view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useResFullPath } from "@/hooks";
import type { Personnel } from "@dongjiang-recruitment/service-common";
import type { PropType } from "vue";

const props = defineProps({
  personnel: {
    type: Object as PropType<Personnel>,
    default: () => ({}),
  },
  message: {
    type: String,
    default: "",
  },
  messageType: {
    type: Number,
    default: 1,
  },
  haveRead: {
    type: Boolean,
    default: true,
  },
  time: {
    type: String,
    default: "",
  },
});

onShow(() => {
  return props.haveRead;
});

// 当用户单击消息时调用的函数。它会将消息更改为已阅读，然后导航到聊天页面。
const toChatPage = () => {
  const i = props.personnel.id;
  uni.navigateTo({
    url: "/pages/mine/liaotianyemian/liaotianyemian?Id=" + i,
  });
};
</script>

<style lang="scss" scoped>
.info-box {
  width: 94%;
  height: 130rpx;
  margin-left: 3%;

  .image-heard {
    width: 110rpx;
    height: 110rpx;
    border-radius: 50%;
  }

  .infos {
    width: 83%;
    height: auto;
    margin-left: 2%;
    line-height: 50rpx;

    .name-time {
      width: 100%;
      height: auto;
      font-size: 30rpx;
    }

    .message {
      width: 90%;
      overflow: hidden;
      font-size: 25rpx;
      text-overflow: ellipsis;
    }

    .is-read {
      width: 25rpx;
      height: 25rpx;
      font-size: 25rpx;
      color: white;
      background-color: rgb(247 25 13 / 99.5%);
      border-radius: 50%;
    }
  }
}
</style>
