<template>
  <view class="flex-col page">
    <view class="group-top">
      <view class="justify-between items-center top-box">
        <text class="info-title">消息</text>
        <text class="items-center info-del" @click="allRead">一键已读</text>
      </view>
    </view>
    <view class="justify-center group-cent">
      <view class="flex-row justify-between group-button">
        <view class="flex-col items-center button-box" @click="toMyDelivery">
          <image
            style="width: 45rpx; height: 45rpx"
            src="@/static/icons/deliver.png"
          />
          <text class="text-1">我的投递</text>
        </view>
        <view class="flex-col items-center button-box" @click="toBeViewed">
          <image
            style="width: 60rpx; height: 45rpx"
            src="@/static/icons/eye_color.png"
          />
          <text class="text-1">谁看过我</text>
        </view>
        <view class="flex-col items-center button-box" @click="toFootprint">
          <image
            style="width: 45rpx; height: 45rpx"
            src="@/static/icons/footprint.png"
          />
          <text class="text-1">我的查看</text>
        </view>
      </view>
    </view>
    <view class="group-end">
      <view class="flex-row justify-between px-4">
        <view class="flex-row items-center info">
          <text>消息沟通</text>
          <image
            class="image-down"
            src="@/static/icons/arrow-down-filling.png"
          />
        </view>
        <text class="items-center info-del" @click="deleteAll">清空消息</text>
      </view>
      <scroll-view class="group-infos" :scroll-y="true">
        <view v-if="messages.length">
          <view v-for="message in messages" :key="message.personnel.id">
            <MailBar
              :personnel="message.personnel"
              :message-type="getLastMessage(message.messages).messageType"
              :message="getLastMessage(message.messages).content"
              :have-read="getLastMessage(message.messages).haveRead"
              :time="useTimeChange(getLastMessage(message.messages).createdAt)"
            />
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import MailBar from "@/components/MailBar/MailBar.vue";
import type { Message } from "@/interfaces";
import { useMainStore, useMessageStore } from "@/stores";
import { useTimeChange } from "@/utils";
import type {
  DeliveryRecord,
  Personnel,
} from "@dongjiang-recruitment/service-common";

const mainStore = useMainStore();
const messageStore = useMessageStore();
const personnel = ref<Map<string, Personnel>>(new Map());
const messages = ref<
  Array<{
    messages: Message[];
    personnel: Personnel;
  }>
>([]);

const getLastMessage = (messages: Message[]) => {
  return messages[messages.length - 1];
};

watch(
  () => messageStore.messages,
  async (newVal) => {
    const _messages = [] as Array<{
      messages: Message[];
      personnel: Personnel;
    }>;
    for (const key in newVal) {
      if (key === "undefined") continue;
      const _personnel =
        personnel.value.get(key) ||
        (await personnelService.getPersonnel({ id: key }));
      personnel.value.set(key, _personnel);
      _messages.push({
        messages: newVal[key],
        personnel: _personnel,
      });
    }
    messages.value = _messages;
  },
  {
    immediate: true,
    deep: true,
  }
);

// 一键已读
const allRead = () => {
  for (const key in messageStore.messages) {
    messageStore.messages[key].forEach((item) => {
      item.haveRead = true;
    });
  }
};

const deleteAll = () => {
  messageStore.messages = {};
};

/* 投递记录 */
const toMyDelivery = () => {
  let deliveryRecords = <DeliveryRecord[]>[];
  applicantDeliveryRecordService
    .queryDeliveryRecord({
      applicantId: mainStore.applicant!.id,
      query: {
        status: ["$eq", 1],
      },
    })
    .then((res) => {
      deliveryRecords = res.items;
    });
  let item = encodeURIComponent(JSON.stringify(deliveryRecords));
  uni.navigateTo({
    url: "/pages/record/toudijilu/toudijilu?deliveryRecords=" + item,
  });
};
const toBeViewed = () => {
  uni.navigateTo({ url: "/pages/record/shuikanguowo/shuikanguowo" });
};
const toFootprint = () => {
  uni.navigateTo({ url: "/pages/record/wodechakan/wodechakan" });
};
</script>

<style lang="scss" scoped>
.page {
  .group-top {
    width: 100%;
    height: 230rpx;
    background-color: rgb(35 193 158);

    .top-box {
      position: relative;
      top: 170rpx;
      width: 100%;
      height: auto;

      .info-title {
        padding-left: 30rpx;
        font-size: 40rpx;
        color: #fff;
      }

      .info-del {
        padding: 2rpx 15rpx;
        margin-right: 20rpx;
        font-size: 25rpx;
        color: #fff;
        border: 2rpx solid #fff;
        border-radius: 20rpx;
      }
    }
  }

  .group-cent {
    width: 100%;
    height: 100rpx;
    margin-top: 30rpx;

    .group-button {
      width: 70%;

      .button-box {
        .text-1 {
          font-size: 28rpx;
        }
      }
    }
  }

  .group-end {
    margin-top: 20rpx;

    .info {
      font-size: 25rpx;
      font-weight: 600;

      .image-down {
        width: 25rpx;
        height: 25rpx;
        margin-left: 10rpx;
      }
    }

    .group-infos {
      // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ
      height: 800rpx;

      // #endif
      // #ifndef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ
      height: 1100rpx;

      // #endif
      overflow: hidden;
    }
  }
}
</style>
