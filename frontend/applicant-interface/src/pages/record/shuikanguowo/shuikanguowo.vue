<template>
  <NavigationBar title="谁看过我" />
  <view class="flex-col page">
    <view class="flex-col list">
      <CompanyDetail
        v-for="(lookForMe, i) in companyInfo"
        :key="i"
        class="list-item1"
        :company-detail="lookForMe"
        @com-click="view_2OnClick(lookForMe.id)"
      />
    </view>
  </view>
  <view v-if="emptyShow" class="justify-center image">
    <image src="@/static/icons/nodata.svg" />
  </view>
</template>

<script lang="ts" setup>
import CompanyDetail from "@/components/CompanyDetail/CompanyDetail.vue";
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import { useMainStore } from "@/stores";
import type { Company } from "@dongjiang-recruitment/service-common";

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
const companyInfo = computed(() => {
  const companies: Company[] = [];
  for (const item of inspectionRecords.value!.items) {
    companies.push(item.company);
  }
  return companies;
});
const emptyShow = computed(
  () => companyInfo.value.length === 0 && !loading.value
);

const view_2OnClick = (c: string) => {
  uni.navigateTo({
    url: "/pages/detail/gongsijieshao/gongsijieshao?companyId=" + c,
  });
};
</script>

<style lang="scss" scoped>
.page {
  width: 710rpx;
  height: auto;

  .list {
    position: absolute;
    top: 128rpx;
    right: 40rpx;
    left: 40rpx;

    .list-item1 {
      &:not(:first-of-type) {
        margin-top: 24rpx;
      }
    }
  }
}
</style>
