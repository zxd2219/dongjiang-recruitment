<template>
  <NavigationBar title="我的查看" />
  <view class="flex-col page">
    <view class="flex-col list">
      <JobDetail
        v-for="(myView, i) in myViews"
        :key="i"
        :position="myView"
        @job-click="view_2OnClick(myView.company.id, myView.id)"
      />
    </view>
    <view v-if="emptyShow" class="justify-center image">
      <image src="@/static/icons/nodata.svg" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import JobDetail from "@/components/JobDetail/JobDetail.vue";
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import { useMainStore } from "@/stores";
import type { Position } from "@dongjiang-recruitment/service-common";

const mainStore = useMainStore();
const { data: inspectionRecords, loading } =
  applicantInspectionRecordService.useQueryUserInspectionRecord(
    {
      applicantId: mainStore.applicant!.id,
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
const myViews = computed(() => {
  const positions: Position[] = [];
  for (const item of inspectionRecords.value!.items) {
    positions.push(item.position);
  }
  return positions;
});
const emptyShow = computed(() => myViews.value.length === 0 && !loading.value);

const view_2OnClick = (c: string, p: string) => {
  uni.navigateTo({
    url:
      "/pages/detail/zhiweixiangqing/zhiweixiangqing?companyId=" +
      c +
      "&positionId=" +
      p,
  });
};
</script>
<style lang="scss" scoped>
.page {
  width: 710rpx;
  height: auto;

  .list {
    margin-top: 20rpx;
    margin-left: 20rpx;
  }
}
</style>
