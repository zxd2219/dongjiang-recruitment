<template>
  <view class="flex-col component">
    <JobDetail :position="collectionPosition!" @job-click="view_4OnClick" />
    <view class="flex-row group-8">
      <view
        class="flex-col items-center text-wrapper-2"
        @click="emit('stateClick')"
      >
        <test>{{ sendType }}</test>
      </view>
      <view class="flex-col items-center image-wrapper" @click="view_11OnClick">
        <text>联系HR</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import JobDetail from "@/components/JobDetail/JobDetail.vue";
import { until } from "@/hooks";
import { useMainStore, useMessageStore } from "@/stores";
import type { Position } from "@dongjiang-recruitment/service-common";
import type { PropType } from "vue";

const mainStore = useMainStore();
const messageStore = useMessageStore();
const messageKey = ref("");

const props = defineProps({
  collectionPosition: {
    type: Object as PropType<Position>,
  },
  sendType: {
    type: String,
  },
});
// 自定义事件
const emit = defineEmits(["stateClick"]);

// 获取消息密钥的方法。
until(
  computed(() => !!mainStore.applicant?.id),
  () => {
    if (props.collectionPosition) {
      for (const key in messageStore.messages[mainStore.applicant!.id]) {
        if (key === props.collectionPosition?.personnel.id) {
          messageKey.value = key;
        }
      }
    }
  }
);

const view_4OnClick = () => {
  const companyId = props.collectionPosition?.company.id;
  const positionId = props.collectionPosition?.id;
  uni.navigateTo({
    url:
      "/pages/detail/zhiweixiangqing/zhiweixiangqing?companyId=" +
      companyId +
      "&positionId=" +
      positionId,
  });
};
const view_11OnClick = () => {
  uni.navigateTo({
    url:
      "/pages/mine/liaotianyemian/liaotianyemian?Id=" +
      props.collectionPosition?.personnel.id +
      "&key=" +
      messageKey.value,
  });
};
</script>

<style lang="scss" scoped>
.component {
  height: auto;
  overflow: hidden;
  border: solid 2rpx rgb(229 229 229);
  border-radius: 5rpx;

  .group-8 {
    margin-top: 50rpx;
    font-size: 25rpx;
    line-height: 23rpx;
    color: rgb(163 154 154);
    letter-spacing: 2.5rpx;
    white-space: nowrap;

    .text-wrapper-2 {
      flex: 1 1 335rpx;
      height: 75rpx;
      padding: 25rpx 0 24rpx;
      overflow: hidden;
      border: solid 2rpx rgb(229 229 229);
    }

    .image-wrapper {
      flex: 1 1 335rpx;
      height: 75rpx;
      padding: 21rpx 0 17rpx;
      overflow: hidden;
      color: rgb(35 193 158);
      border: solid 2rpx rgb(229 229 229);

      .image-1 {
        width: 91rpx;
        height: 33rpx;
      }
    }
  }
}
</style>
