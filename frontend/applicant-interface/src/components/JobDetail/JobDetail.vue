<template>
  <view class="group-all">
    <view class="justify-between group-border" @click="emits('jobClick')">
      <view class="flex-col group-1">
        <view class="flex-col job-infos">
          <text class="name">{{ position!.positionName }}</text>
          <view class="flex-row area-educate">
            <text class="area">{{ position!.workCityName }}</text>
            <text class="educate">{{ education[position!.education] }}</text>
          </view>
          <view class="flex-row items-center directions">
            <view
              v-for="(directionTag, i) in position!.directionTags"
              :key="i"
              class="flex-col text-wrapper tags"
            >
              <text class="tag">{{ directionTag }}</text>
            </view>
          </view>
        </view>
        <view v-if="companyInfo" class="flex-row company-infos">
          <view class="flex-row items-center name-info">
            <image
              v-if="companyInfo.logoUrl"
              class="logo"
              :src="VITE_CDN_URL + companyInfo.logoUrl"
            />
            <text class="company">{{ companyInfo.companyName }}</text>
            <text class="company">{{
              financingStage[companyInfo.financingStage]
            }}</text>
            <text class="company">{{ scale[companyInfo.scale] }}</text>
          </view>
        </view>
      </view>
      <view class="flex-col items-end group-2">
        <text class="salary"
          >{{ position!.startingSalary }}k-{{ position!.ceilingSalary }}k</text
        >
        <text class="date">{{ position!.createdAt.slice(5, 10) }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { Position } from "@dongjiang-recruitment/service-common";

const VITE_CDN_URL = import.meta.env.VITE_CDN_URL;

const props = defineProps<{
  position: Position;
}>();
const emits = defineEmits(["jobClick"]);

const companyInfo = computed(() => props.position.company);
// const { data: companyInfo } = companyService.useGetCompany(() => ({
//   id: props.position.company.id,
// }));

// 融资阶段
const financingStage = ref([
  "",
  "未融资",
  "天使轮",
  "A轮",
  "B轮",
  "C轮",
  "D轮及以上",
  "上市公司",
  "不需要融资",
]);
// 公司规模
const scale = ref([
  "",
  "少于15人",
  "15-50人",
  "50-150人",
  "150-500人",
  "500-2000人",
  "2000人以上",
]);
const education = ref(["","不要求", "大专", "本科", "硕士", "博士"]);
</script>

<style lang="scss" scoped>
.group-all {
  margin-bottom: 20rpx;
  background-color: #fff;

  .group-border {
    width: 92%;
    margin-left: 4%;
    background-color: #fff;

    .group-1 {
      width: 550rpx;

      .job-infos {
        width: 550rpx;
        line-height: 50rpx;

        .name {
          padding-top: 10rpx;
          font-size: 35rpx;
          font-weight: bold;
        }

        .area-educate {
          font-size: 28rpx;

          .educate {
            padding-left: 20rpx;
          }
        }

        .directions {
          width: 550rpx;
          overflow-y: auto;
          white-space: nowrap;

          .tags {
            margin-right: 15rpx;
            background-color: rgb(240 240 240);
            border-radius: 5rpx;

            .tag {
              padding: 5rpx 10rpx;
              font-size: 20rpx;
            }
          }
        }
      }

      .company-infos {
        width: 550rpx;
        margin-top: 10rpx;

        .company-logo {
          width: 150rpx;
          height: 100rpx;
        }

        .name-info {
          // width: 400rpx;
          overflow: hidden;
          font-size: 26rpx;
          text-overflow: ellipsis;
          white-space: nowrap;

          .company {
            padding-left: 10rpx;
          }

          .logo {
            width: 50rpx;
            height: 50rpx;
            border-radius: 50%;
          }
        }
      }
    }

    .group-2 {
      padding-top: 10rpx;
      font-size: 30rpx;
      color: rgb(35 193 158);
    }

    .date {
      font-size: 24rpx;
      color: rgb(0 0 0);
      text-align: center;
    }
  }
}
</style>
