<template>
  <view class="flex-col component">
    <CompanyDetail
      :company-detail="attentionCompany"
      @com-click="toCompanyInfo(attentionCompany!.id)"
    />
    <view class="flex-row group-4">
      <view
        class="flex-col items-center text-wrapper-1"
        @click="emit('unfocus')"
      >
        <text>{{ sendType }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import CompanyDetail from "@/components/CompanyDetail/CompanyDetail.vue";
import type { Company } from "@dongjiang-recruitment/service-common";
import type { PropType } from "vue";

defineProps({
  attentionCompany: {
    type: Object as PropType<Company>,
  },
  sendType: {
    type: String,
  },
});

// 用于发出事件的函数。
const emit = defineEmits(["unfocus"]);

const toCompanyInfo = (c: string) => {
  uni.navigateTo({
    url: "/pages/detail/gongsijieshao/gongsijieshao?companyId=" + c,
  });
};
const view_10OnClick = () => {
  uni.navigateTo({ url: "/pages/mine/liaotianyemian/liaotianyemian" });
};
</script>

<style lang="scss" scoped>
.component {
  height: auto;
  padding-top: 23rpx;
  overflow: hidden;
  border: solid 2rpx rgb(229 229 229);
  border-radius: 5rpx;

  .group-4 {
    font-size: 25rpx;
    line-height: 23rpx;
    color: rgb(255, 255, 255);
    background-color: rgb(35 193 158);
    letter-spacing: 2.5rpx;
    white-space: nowrap;

    .text-wrapper-1 {
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
      border: solid 2rpx rgb(229 229 229);
    }
  }
}
</style>
