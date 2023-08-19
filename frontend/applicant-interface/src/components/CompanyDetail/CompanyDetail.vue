<template>
  <view class="company-info">
    <view class="flex-row items-center component" @click="emit('comClick')">
      <image class="image" :src="useResFullPath(companyDetail?.logoUrl)" />
      <view class="flex-col group-1">
        <text class="text">{{ companyDetail!.companyName }}</text>
        <view class="flex-row group-2">
          <text>在招职位</text>
          <text class="text-2">{{ companyDetail!.recruitmentPosition }}</text>
        </view>
        <text class="text-3">
          {{ companyDetail!.cityName }} |
          {{ financingStages[companyDetail!.financingStage] }} |
          {{ scales[companyDetail!.scale] }}
        </text>
        <!-- <view class="flex-row group-3">
          <view
            v-for="(benefit, i) in companyDetail!.benefits"
            :key="i"
            class="left-text-wrapper flex-col items-center justify-center"
          >
            <text>{{ benefit }}</text>
          </view>
        </view> -->
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useResFullPath } from "@/hooks";
import type { Company } from "@dongjiang-recruitment/service-common";
import type { PropType } from "vue";

const props = defineProps({
  companyDetail: {
    type: Object as PropType<Company>,
  },
});

// 一个常量数组，用于将融资阶段映射到相应的字符串。
const financingStages = [
  "",
  "未融资",
  "天使轮",
  "A轮",
  "B轮",
  "C轮",
  "D轮及以上",
  "上市公司",
  "不需要融资",
];
// 一个常量数组，用于将公司规模映射到对应的字符串。
const scales = [
  "",
  "少于15人",
  "15-50人",
  "50-150人",
  "150-500人",
  "500-2000人",
  "2000人以上",
];

// 定义事件名称的函数。
const emit = defineEmits(["comClick"]);
</script>

<style lang="scss" scoped>
.company-info {
  width: 100%;
  height: auto;
  margin-top: 15rpx;
  background-color: #fff;
  border: 2rpx solid rgb(229 229 229);
  border-radius: 10rpx;

  .component {
    width: 92%;
    height: auto;
    margin-left: 4%;

    .image {
      width: 151rpx;
      height: 101rpx;
      border-radius: 5rpx;
    }

    .group-1 {
      width: 80%;
      height: 150rpx;
      margin-left: 20rpx;

      .text {
        font-size: 35rpx;
        font-weight: bold;
        white-space: nowrap;
      }

      .group-2 {
        font-size: 20rpx;
        white-space: nowrap;

        .text-2 {
          margin-left: 19rpx;
        }
      }

      .text-3 {
        font-size: 20rpx;
        letter-spacing: 2rpx;
        white-space: nowrap;
      }

      .group-3 {
        width: 78%;
        margin-top: 10rpx;
        overflow: hidden;
        font-size: 18rpx;
        letter-spacing: 3.2rpx;
        white-space: nowrap;

        .left-text-wrapper {
          width: 120rpx;
          height: 35rpx;
          margin-right: 10rpx;
          overflow: hidden;
          background-color: rgb(229 229 229);
          border-radius: 5rpx;
        }
      }
    }
  }
}
</style>
