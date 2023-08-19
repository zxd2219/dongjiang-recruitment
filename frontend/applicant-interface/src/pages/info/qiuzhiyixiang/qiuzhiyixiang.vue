<template>
  <NavigationBar />
  <view class="flex-col page">
    <view class="job-expect">
      <text class="expect">求职期望</text>
      <br />
      <text class="recommend">每个求职意向都会有专属的职位推荐</text>
    </view>
    <view class="job-expectation">
      <view
        v-for="jobExpectation in mainStore.jobExpectations?.items || []"
        :key="jobExpectation.id"
        class="justify-between items-center job-expects"
        @click="jobExpectationClick(jobExpectation.id)"
      >
        <view>
          <text class="job-name">{{ jobExpectation.positionName }}</text>
          <view class="direct-box">
            <text
              v-for="(direction, j) in jobExpectation.directionTags"
              :key="j"
              class="job-direct"
              >{{ direction }}</text
            >
          </view>
          <view class="city-salary">
            <text class="job-city">{{ jobExpectation.cityName }}</text>
            <text class="job-salary"
              >{{ jobExpectation.startingSalary }}k-{{
                jobExpectation.ceilingSalary
              }}k</text
            >
          </view>
        </view>
        <image class="image" src="@/static/icons/arrow-right.png" />
      </view>
    </view>
    <view class="items-center justify-center button" @click="addExcept">
      <image class="image" src="@/static/icons/plus-circle.svg" />
      <text class="add">添加求职期望</text>
    </view>
    <view class="items-center justify-between entry-time" @click="jobStatus">
      <text>求职状态</text>
      <view class="flex-row justify-center items-center">
        <text class="time">{{ entryTime }}</text>
        <image class="image" src="@/static/icons/arrow-right.png" />
      </view>
    </view>
    <wybPopup
      ref="popup"
      :show-close-icon="false"
      :height="250"
      :radius="10"
      mode="size-auto"
      type="bottom"
    >
      <picker-view
        :value="definedValue"
        class="picker-view"
        @change="entryChange"
      >
        <picker-view-column>
          <view v-for="(start, i) in entryTimes" :key="i" class="item">{{
            start
          }}</view>
        </picker-view-column>
      </picker-view>
    </wybPopup>
  </view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import wybPopup from "@/components/wyb-popup/wyb-popup.vue";
import { useMainStore } from "@/stores";

const mainStore = useMainStore();

const entryTime = ref("请选择");
const entryTimes = ["请选择", "随时入职", "2周内入职", "一个月内入职"];
const definedValue = ref([mainStore.applicant?.jobStatus || 0]);

if (mainStore.applicant?.jobStatus) {
  entryTime.value = entryTimes[mainStore.applicant?.jobStatus];
}

/* 查看、修改、删除求职期望 */
const jobExpectationClick = (id: string) => {
  if (mainStore.jobExpectations?.items.length === 1) {
    uni.navigateTo({
      url: "/pages/info/qiuzhiqiwang/qiuzhiqiwang?id=" + id + "&type=" + 0,
    });
  } else {
    uni.navigateTo({
      url: "/pages/info/qiuzhiqiwang/qiuzhiqiwang?id=" + id + "&type=" + 1,
    });
  }
};

/* 添加求职期望 */
const addExcept = () => {
  if ((mainStore.jobExpectations?.items.length || 0) >= 3) {
    uni.showToast({
      title: "最多只能添加3个求职期望",
      icon: "none",
      duration: 1500,
    });
  } else {
    uni.navigateTo({ url: `/pages/info/qiuzhiqiwang/qiuzhiqiwang?data=` + 1 });
  }
};

const popup = ref<InstanceType<typeof wybPopup>>();
const jobStatus = () => {
  popup.value?.show();
};
// 当用户更改选取器的值时调用的函数。
const entryChange = (e: { detail: { value: number[] } }) => {
  entryTime.value = entryTimes[e.detail.value[0]];
  mainStore.applicant!.jobStatus = e.detail.value[0] as 1 | 2 | 3;
  definedValue.value = [e.detail.value[0] as 1 | 2 | 3];
  applicantService
    .updateApplicant({
      id: mainStore.applicant!.id,
      requestBody: mainStore.applicant!,
    })
    .then((res) => {
      mainStore.applicant = res;
    });
  popup.value?.hide();
};
</script>

<style lang="scss" scoped>
.page {
  width: 710rpx;
  height: 1334rpx;
  margin-right: 20rpx;
  margin-left: 20rpx;
  background-color: rgb(255 255 255);

  .header {
    position: relative;
  }

  .job-expect {
    width: 100%;

    .expect {
      font-size: 40rpx;
      font-weight: bold;
    }

    .recommend {
      font-size: 25rpx;
    }
  }

  .job-expectation {
    margin-top: 40rpx;

    .job-expects {
      padding-top: 20rpx;
      line-height: 40rpx;

      .job-name {
        font-size: 30rpx;
      }

      .direct-box {
        max-width: 600rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        .job-direct {
          margin-right: 20rpx;
          font-size: 25rpx;
          color: rgb(153 153 153);
        }
      }

      .city-salary {
        font-size: 25rpx;
        color: rgb(153 153 153);

        .job-salary {
          margin-left: 30rpx;
        }
      }

      .right {
        justify-content: right;
      }
    }
  }

  .button {
    height: 80rpx;
    margin-top: 40rpx;
    color: $app-color;
    background-color: rgb(212 251 236);
    border-radius: 5rpx;

    .add {
      margin-left: 20rpx;
      font-size: 28rpx;
    }
  }

  .entry-time {
    height: 60rpx;
    margin-top: 50rpx;

    .time {
      font-size: 25rpx;
    }
  }

  .image {
    width: 35rpx;
    height: 35rpx;
  }

  .picker-view {
    width: 750rpx;
    height: 400rpx;
    margin-top: 20rpx;

    .item {
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }
}
</style>
