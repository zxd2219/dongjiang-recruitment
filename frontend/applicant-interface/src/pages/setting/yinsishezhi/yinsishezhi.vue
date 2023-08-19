<template>
  <NavigationBar title="隐私设置" />
  <view class="flex-col page">
    <view class="group-1">匿名展示</view>
    <view
      class="justify-between items-center group-2"
      @click="privacySet(Applicant.privacySettings.Anonymous)"
    >
      <view class="flex-row justify-center items-center group-box">
        <image :src="VITE_CDN_URL + applicant?.avatarUrl" class="image" />
        <text style="padding-left: 15rpx; font-size: 30rpx"
          >{{ applicant?.firstName }}{{ applicant?.lastName }}</text
        >
        <text
          style="padding-left: 15rpx; font-size: 28rpx; color: rgb(0 0 0 / 60%)"
          >(实名展示)</text
        >
      </view>
      <radio
        style="transform: scale(0.7)"
        value="1"
        :checked="
          applicant!.privacySettings === Applicant.privacySettings.Anonymous
        "
      />
    </view>
    <view
      class="justify-between items-center group-2"
      @click="privacySet(Applicant.privacySettings.RealName)"
    >
      <view class="flex-row justify-center items-center group-box">
        <image :src="VITE_CDN_URL + applicant?.avatarUrl" class="image" />
        <text style="padding-left: 15rpx; font-size: 30rpx"
          >{{ applicant?.firstName }}先生</text
        >
        <text
          style="padding-left: 15rpx; font-size: 28rpx; color: rgb(0 0 0 / 60%)"
          >(匿名展示)</text
        >
      </view>
      <radio
        style="transform: scale(0.7)"
        value="2"
        :checked="
          applicant!.privacySettings === Applicant.privacySettings.RealName
        "
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import { useMainStore } from "@/stores";
import { Applicant } from "@dongjiang-recruitment/service-common";
import { storeToRefs } from "pinia";
const VITE_CDN_URL = import.meta.env.VITE_CDN_URL;

const mainStore = useMainStore();
const { applicant } = storeToRefs(mainStore);

const { refreshAsync: updateApplicant } = applicantService.useUpdateApplicant(
  () => ({ id: applicant.value!.id, requestBody: applicant.value! }),
  { manual: true }
);

// 改变显示状态
const privacySet = async (privacySettings: Applicant.privacySettings) => {
  applicant.value!.privacySettings = privacySettings;
  await updateApplicant();
};
</script>

<style lang="scss" scoped>
.page {
  .group-1 {
    margin-left: 30rpx;
    font-size: 35rpx;
  }

  .group-2 {
    width: 710rpx;
    height: 100rpx;
    margin-top: 20rpx;
    margin-left: 20rpx;

    .group-box {
      padding-left: 10rpx;
    }
  }

  .image {
    width: 80rpx;
    height: 80rpx;
    border-radius: 100%;
  }
}
</style>
