<template>
  <NavigationBar title="待面试" />
  <view class="flex-col page">
    <view class="flex-col list">
      <JobPanel
        v-for="(interviewedJob, i) in interviewedJobs"
        :key="i"
        class="list-item1"
        :collection-position="interviewedJob"
        :send-type="sendType"
        @state-click="stateClick(interviewedJob.id)"
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

const mainStore = useMainStore();
const sendType = ref("放弃面试");

const {
  data: interviewed,
  loading,
  mutate,
} = applicantDeliveryRecordService.useQueryDeliveryRecord(
  {
    applicantId: mainStore.applicant!.id,
    query: {
      status: ["$eq", 4],
    },
    size: 999999999,
  },
  {
    initialData: {
      total: 0,
      items: [],
    },
    ready: computed(() => !!mainStore.applicant?.id),
  }
);
const interviewedJobs = computed(() =>
  interviewed.value!.items.map((item) => item.position)
);
const emptyShow = computed(
  () => interviewedJobs.value.length === 0 && !loading.value
);

/* 放弃面试 */
const stateClick = (index: string) => {
  for (const delivery of interviewed.value!.items) {
    if (delivery.position.id === index) {
      applicantDeliveryRecordService
        .removeDeliveryRecord({
          applicantId: mainStore.applicant!.id,
          id: delivery.id,
        })
        .then(() => {
          const newInterviewed = interviewed.value!.items.filter(
            (item) => item.id !== delivery.id
          );
          mutate({
            total: newInterviewed.length,
            items: newInterviewed,
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: auto;

  .list {
    width: 690rpx;
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
