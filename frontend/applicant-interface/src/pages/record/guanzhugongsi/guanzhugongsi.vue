<template>
  <NavigationBar title="关注公司" />
  <view class="flex-col page">
    <view class="flex-col list">
      <CompanyPanel
        v-for="(attentionCompany, i) in attentionCompanies"
        :key="i"
        class="list-item1"
        :attention-company="attentionCompany"
        :send-type="unfocus"
        @unfocus="unsubscribe(attentionCompany.id)"
      />
    </view>
  </view>
  <view v-if="emptyShow" class="justify-center image">
    <image src="@/static/icons/nodata.svg" />
  </view>
</template>

<script lang="ts" setup>
import CompanyPanel from "@/components/CompanyPanel/CompanyPanel.vue";
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import { useMainStore } from "@/stores";

const mainStore = useMainStore();
const unfocus = ref("取消关注");

const {
  data: focus,
  loading,
  mutate,
} = applicantAttentionRecordService.useQueryAttentionRecord(
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
const attentionCompanies = computed(() =>
  focus.value!.items.map((item) => item.company)
);
const emptyShow = computed(
  () => attentionCompanies.value.length === 0 && !loading.value
);

// 删除关注记录
const unsubscribe = (id: string) => {
  const attentionRecordId = focus.value!.items.find((item) => {
    return item.company.id === id;
  });
  applicantAttentionRecordService
    .removeAttentionRecord({
      applicantId: attentionRecordId!.applicant.id,
      id: attentionRecordId!.id,
    })
    .then((res) => {
      const newFocus = focus.value!.items.filter((item) => {
        return item.company.id !== id;
      });
      mutate({
        total: newFocus.length,
        items: newFocus,
      });
    });
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
