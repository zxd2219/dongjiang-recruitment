<template>
  <NavigationBar right="保存" @right-click="saveAdvantage" />
  <view class="flex-col page">
    <view class="flex-col group-1">
      <text class="text-title">个人优势</text>
      <text class="title">展示你的特别之处，分享你在工作中取得的成绩</text>
    </view>
    <view class="group-2">
      <view class="flex-row text-input">
        <textarea
          v-model="inputValue"
          class="input"
          placeholder="请填写你的特点与优势，或你的求职目标"
          :maxlength="250"
        />
        <text class="items-end">({{ inputValue.length }}/250)</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import { useMainStore } from "@/stores";

const mainStore = useMainStore();

const inputValue = ref("");
// 添加个人优势
const saveAdvantage = () => {
  mainStore.applicant!.personalAdvantage = inputValue.value;
  applicantService
    .updateApplicant({
      id: mainStore.applicant!.id,
      requestBody: mainStore.applicant!,
    })
    .then(() => {
      uni.navigateBack({
        delta: 1,
      });
    });
};
</script>

<style lang="scss" scoped>
.page {
  .group-1 {
    width: 690rpx;
    height: auto;
    margin-left: 30rpx;
    line-height: 50rpx;

    .text-title {
      font-size: 35rpx;
      font-weight: 400;
    }

    .title {
      font-size: 30rpx;
      line-height: 40rpx;
      color: rgb(0 0 0 / 50%);
      white-space: normal;
    }
  }

  .group-2 {
    width: 710rpx;
    height: auto;
    margin-top: 30rpx;
    margin-left: 20rpx;

    .text-input {
      width: 100%;
      height: 500rpx;
      overflow: hidden;
      background-color: rgb(229 229 229 / 50%);
      border-radius: 10rpx;

      .input {
        height: 450rpx;
        padding-left: 20rpx;
        font-size: 28rpx;
        line-height: 50rpx;
      }
    }
  }
}
</style>
