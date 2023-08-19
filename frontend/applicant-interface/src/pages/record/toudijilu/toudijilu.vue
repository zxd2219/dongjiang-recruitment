<template>
  <NavigationBar title="投递记录" right="清空" @right-click="clearRecord" />
  <view class="flex-col page">
    <view class="justify-between items-center group-1">
      <text
        v-for="(send, i) in sendType"
        v-show="send !== ''"
        :key="i"
        :class="sendId === i ? 'active' : ''"
        @click="sendTypeId(i)"
        >{{ send }}</text
      >
    </view>
    <view v-if="!loading" class="flex-col list">
      <JobPanel
        v-for="(deliveryRecord, i) in deliveryRecordPositions"
        :key="i"
        class="list-item1"
        :collection-position="deliveryRecord"
        :send-type="sendType[sendId]"
      />
    </view>
  </view>
  <view v-if="emptyShow" class="justify-center image">
    <image src="@/static/icons/nodata.svg" />
  </view>
</template>

<script lang="ts" setup>
import JobPanel from "@/components/JobPanel/JobPanel.vue";
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import { useMainStore } from "@/stores";
import type { DeliveryRecord } from "@dongjiang-recruitment/service-common";

const mainStore = useMainStore();

const sendType = ["", "待查看", "已查看", "通过初筛", "约面试", "不合格"];
const sendId = ref<DeliveryRecord["status"]>(1);

const {
  data: deliveryRecords,
  loading,
  mutate,
} = applicantDeliveryRecordService.useQueryDeliveryRecord(
  () => ({
    applicantId: mainStore.applicant!.id,
    query: {
      status: ["$eq", sendId.value],
    },
    size: 999999999,
  }),
  {
    initialData: {
      total: 0,
      items: [],
    },
    refreshDeps: [sendId],
    ready: computed(() => !!mainStore.applicant?.id),
  }
);
const deliveryRecordPositions = computed(() =>
  deliveryRecords.value!.items.map((item) => item.position)
);
const emptyShow = computed(
  () => deliveryRecordPositions.value.length === 0 && !loading.value
);

/* 查看不同状态记录 */
const sendTypeId = (index: DeliveryRecord["status"]) => {
  sendId.value = index;
};

/* 清空记录 */
const clearRecord = () => {
  for (const delivery of deliveryRecords.value!.items) {
    applicantDeliveryRecordService
      .removeDeliveryRecord({
        applicantId: mainStore.applicant!.id,
        id: delivery.id,
      })
      .then((res) => {
        const newDeliveryRecords = deliveryRecords.value!.items.filter(
          (item) => item.id !== delivery.id
        );
        mutate({
          total: newDeliveryRecords.length,
          items: newDeliveryRecords,
        });
      });
  }
};
</script>

<style lang="scss" scoped>
.page {
  position: relative;
  width: 100%;
  height: auto;

  .active {
    color: rgb(35 193 158);
  }

  .group-1 {
    width: 710rpx;
    height: 50rpx;
    margin-top: 30rpx;
    margin-left: 20rpx;
    font-size: 25rpx;
    color: rgb(0 0 0 / 50%);
  }

  .list {
    width: 690rpx;
    height: auto;
    margin-left: 30rpx;

    .list-item1 {
      &:last-of-type {
        margin-top: 18rpx;
      }
    }
  }
}

.image {
  width: 100%;
  height: auto;
  margin: 10rpx 0 7rpx 7rpx;
}
</style>
