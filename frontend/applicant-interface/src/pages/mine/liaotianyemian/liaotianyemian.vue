<template>
  <view class="page">
    <!--  #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ -->
    <view
      class="flex-row items-center group-top"
      :style="
        'width: ' +
        navigationBarWidth +
        'px; margin-top: ' +
        navigationBarTop +
        'px'
      "
    >
      <image
        class="image-left"
        src="@/static/icons/arrow-left-blob.png"
        @click="goBack"
      />
      <view class="flex-col top-title">
        <text class="justify-center text-top">{{ hrInfo.hrName }}</text>
        <text class="text-bottom">{{ hrInfo.postName }}</text>
      </view>
    </view>
    <!-- #endif -->
    <!--  #ifndef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ -->
    <view style="height: 20rpx"></view>
    <view class="flex-row items-center group-top">
      <image
        class="image-left"
        src="@/static/icons/arrow-left-blob.png"
        @click="goBack"
      />
      <view class="flex-col top-title">
        <text class="justify-center text-top">{{ hrInfo.hrName }}</text>
        <text class="justify-center text-bottom">{{ hrInfo.postName }}</text>
      </view>
    </view>
    <!-- #endif -->
    <scroll-view class="group-info" :scroll-y="true" :scroll-top="scrollTop">
      <view id="messages">
        <view
          v-for="recode in messageStore.messages[hrInfo.id] || []"
          :key="recode.id"
        >
          <Left
            v-if="recode.initiateId === hrInfo.id"
            :mes="recode.content"
            :type="recode.messageType"
            :hr-info="hrInfo"
          ></Left>
          <Right
            v-else
            :mes="recode.content"
            :type="recode.messageType"
            :fail="recode.failed === true"
          ></Right
        ></view>
      </view>
    </scroll-view>
    <view class="flex-col group-end justify-center">
      <view class="flex-row justify-between items-end input-box">
        <view class="items-center text-input">
          <textarea
            v-model="inputValue"
            class="items-center input"
            :maxlength="100"
            :auto-height="true"
            @confirm="sendMes"
          />
        </view>
        <text class="items-center text-send" @click="sendMes"> 发送</text>
      </view>
      <view class="justify-between function-box">
        <image class="image" src="@/static/icons/audio-fill.svg" />
        <image
          class="image"
          src="@/static/icons/picture-fill.svg"
          @click="sendImage"
        />
        <image class="image" src="@/static/icons/camera.svg" />
        <image class="image" src="@/static/icons/emoji.svg" />
        <image class="image" src="@/static/icons/plus-circle.svg" />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Left from "@/components/BubbleBox/BubbleBoxHr.vue";
import Right from "@/components/BubbleBox/BubbleBoxUser.vue";
import { useApiFullPath } from "@/hooks";
import { sendMessage, useMainStore, useMessageStore } from "@/stores";
import type { Personnel } from "@dongjiang-recruitment/service-common";

const mainStore = useMainStore();
const messageStore = useMessageStore();

/* #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ */

const navigationBarTop = mainStore.menu.top;

const navigationBarWidth = mainStore.menu.left - uni.upx2px(30);

/* #endif */

const hrInfo = ref<Personnel>({} as Personnel);
const inputValue = ref("");
const scrollTop = ref(0);
const query = uni.createSelectorQuery();

watch(
  () => messageStore.messages[hrInfo.value.id]?.length,
  (val) => {
    nextTick(() => {
      query
        .select("#messages")
        .boundingClientRect((data) => {
          scrollTop.value = [data].flat()[0].height!;
        })
        .exec();
    });
  },
  { immediate: true }
);
onLoad((e) => {
  if (e!.Id) {
    personnelService
      .getPersonnel({
        id: e!.Id,
      })
      .then((res) => {
        hrInfo.value = res;
      });
  } else {
    uni.showToast({
      title: "参数错误",
      icon: "none",
      duration: 1500,
    });
    goBack();
  }
});

const goBack = () => {
  const pages = getCurrentPages();
  if (pages.length > 1) {
    uni.navigateBack({
      delta: 1,
    });
  } else {
    uni.switchTab({
      url: "/pages/main/shouyeyemian/shouyeyemian",
    });
  }
};

// 发送消息的函数。
const sendMes = () => {
  if (inputValue.value.length) {
    sendMessage({
      serviceId: hrInfo.value.id,
      serviceType: 2,
      content: inputValue.value,
      messageType: 1,
    });
    inputValue.value = "";
  } else {
    uni.showToast({
      title: "消息内容不能为空",
      icon: "none",
      duration: 1500,
    });
  }
};

// 发送图片
const sendImage = () => {
  uni.chooseImage({
    success: (res) => {
      const tempFilePath = res.tempFilePaths;
      uni.uploadFile({
        url: useApiFullPath("/common/files"),
        filePath: tempFilePath[0],
        name: "file",
        header: {
          Authorization: "Bearer " + mainStore.token,
        },
        success: (res) => {
          const response = JSON.parse(res.data) as {
            body: string;
            message: string;
            status: number;
            timestamp: string;
          };
          sendMessage({
            serviceId: hrInfo.value.id,
            serviceType: 2,
            content: response.body,
            messageType: 2,
          });
        },
        fail: (err) => {
          uni.showToast({
            title: "发送失败",
            icon: "none",
            duration: 1500,
          });
        },
      });
    },
  });
};
</script>

<style lang="scss" scoped>
.page {
  // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ
  height: 1334rpx;

  // #endif
  // #ifndef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ
  height: 1620rpx;

  // #endif
  overflow: hidden;
  background-color: rgb(235 235 235);

  .group-top {
    height: var(--tab-bar-height);

    .image-left {
      width: 25rpx;
      height: 35rpx;
      margin-left: 20rpx;
    }

    .top-title {
      width: 100%;
      height: var(--tab-bar-height);

      .text-top {
        height: 50%;
        font-size: 30rpx;
      }

      .text-bottom {
        height: 50%;
        font-size: 25rpx;
      }
    }
  }

  .group-info {
    width: 100%;

    // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ
    height: 1040rpx;

    // #endif
    // #ifndef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ
    max-height: 1300rpx;

    // #endif
  }

  .group-end {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: auto;

    .input-box {
      width: 94%;
      min-height: 70rpx;
      max-height: 350rpx;
      margin-left: 3%;

      .text-input {
        width: 600rpx;
        min-height: 70rpx;
        max-height: 350rpx;
        padding-left: 10rpx;
        background-color: #fff;
        border-radius: 30rpx;
      }

      .text-send {
        height: 60rpx;
        padding: 3rpx 25rpx;
        font-size: 30rpx;
        color: #fff;
        background-color: rgb(9 164 225);
        border-radius: 30rpx;
      }
    }

    .function-box {
      width: 94%;
      height: 60rpx;
      margin-top: 10rpx;
      margin-left: 3%;

      .image {
        width: 60rpx;
        height: 60rpx;
      }
    }
  }
}
</style>
