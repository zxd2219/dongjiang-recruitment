<template>
  <NavigationBar
    title="编辑项目经历"
    :right="deleteProject"
    @right-click="deleteProjectExperience"
  />
  <view class="flex-row page">
    <view class="group-all">
      <view class="group-box">
        <text class="text-title">项目名称</text>
        <input
          v-model="projectExperience.projectName"
          class="text-input"
          type="text"
          placeholder="请填写"
        />
      </view>
      <view class="group-box">
        <text class="text-title">项目描述</text>
        <input
          v-model="projectExperience.projectDescription"
          class="text-input"
          type="text"
          placeholder="请填写"
        />
      </view>
      <view class="group-box">
        <text class="text-title">你的成就</text>
        <input
          v-model="projectExperience.achievement"
          class="text-input"
          type="text"
          placeholder="请填写"
        />
      </view>
      <view class="group-box">
        <text class="text-title">项目时间</text>
        <view class="flex-row justify-between" @click="showTime">
          <view class="justify-center items-center" style="width: 50%">
            <text style="font-size: 28rpx">{{
              projectExperience.startTime
            }}</text>
          </view>
          <view class="justify-center items-center" style="width: 50%">
            <text style="font-size: 28rpx">{{
              projectExperience.endTime
            }}</text>
          </view>
        </view>
      </view>
      <view class="group-box">
        <text class="text-title">项目链接</text>
        <input
          v-model="projectExperience.projectLink"
          class="text-input"
          type="text"
          placeholder="请填写(选填)"
        />
      </view>
    </view>
    <view class="justify-center group-button">
      <view>
        <button
          class="justify-center items-center button-box"
          @click="saveProjectExperience"
        >
          保存
        </button>
      </view>
    </view>
    <WybPopup
      ref="popup"
      type="bottom"
      height="300"
      radius="6"
      mode="size-auto"
      :show-close-icon="false"
    >
      <view class="flex-row">
        <view
          class="flex-col justify-center items-center"
          style="width: 50%"
          @click="
            start = true;
            end = false;
          "
        >
          <text>开始时间</text>
          <text style="font-size: 25rpx" :class="start ? 'active' : ''">{{
            projectExperience.startTime
          }}</text>
        </view>
        <view
          class="flex-col justify-center items-center"
          style="width: 50%"
          @click="
            end = true;
            start = false;
          "
        >
          <text>结束时间</text>
          <text style="font-size: 25rpx" :class="end ? 'active' : ''">{{
            projectExperience.endTime
          }}</text>
        </view>
      </view>
      <picker-view
        v-if="start"
        :value="value1"
        class="picker-view"
        @change="bindChange"
      >
        <picker-view-column>
          <view v-for="(item, i) in years" :key="i" class="item">{{
            item
          }}</view>
        </picker-view-column>
        <picker-view-column>
          <view v-for="(item, i) in months" :key="i" class="item">{{
            item
          }}</view>
        </picker-view-column>
        <picker-view-column>
          <view v-for="(item, i) in days" :key="i" class="item">{{
            item
          }}</view>
        </picker-view-column>
      </picker-view>
      <picker-view
        v-if="end"
        :value="value2"
        class="picker-view"
        @change="bindChange"
      >
        <picker-view-column>
          <view v-for="(item, i) in years" :key="i" class="item">{{
            item
          }}</view>
        </picker-view-column>
        <picker-view-column>
          <view v-for="(item, i) in months" :key="i" class="item">{{
            item
          }}</view>
        </picker-view-column>
        <picker-view-column>
          <view v-for="(item, i) in days" :key="i" class="item">{{
            item
          }}</view>
        </picker-view-column>
      </picker-view>
    </WybPopup>
  </view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import WybPopup from "@/components/wyb-popup/wyb-popup.vue";
import { until } from "@/hooks";
import { useMainStore } from "@/stores";
import type { ProjectExperience } from "@dongjiang-recruitment/service-common";

const mainStore = useMainStore();

const projectExperience = ref<ProjectExperience>({
  projectName: "", //项目名称
  projectDescription: "", //项目描述
  achievement: "", //你的成就
  startTime: "开始时间", //项目开始时间
  endTime: "结束时间", //项目结束时间
  projectLink: "", //项目链接
} as ProjectExperience);

const start = ref(true);
const end = ref(false);

const popup = ref();
const showTime = () => {
  popup.value.show();
};
const date = new Date();
const years = ref<number[]>([]);
const months = ref<number[]>([]);
const days = ref<number[]>([]);
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
for (let i = 1960; i <= year; i++) {
  years.value.push(i);
}
for (let i = 1; i <= 12; i++) {
  months.value.push(i);
}
for (let i = 1; i <= 31; i++) {
  days.value.push(i);
}
const value1 = ref([years.value[0], months.value[0], days.value[0]]);
const value2 = ref([year, month - 1, day]);
// 更改选择器视图时调用的函数。
const bindChange = (e: { detail: { value: any } }) => {
  const val = e.detail.value;
  year = years.value[val[0]];
  month = months.value[val[1]];
  day = days.value[val[2]];
  if (start.value) {
    projectExperience.value.startTime = `${year}-${month}-${day}`;
    value1.value = [val[0], val[1], val[2]];
  } else {
    projectExperience.value.endTime = `${year}-${month}-${day}`;
    value2.value = [val[0], val[1], val[2]];
  }
};

const projectId = ref(); // 项目id
const deleteProject = ref(); // 删除项目
onLoad((e) => {
  projectId.value = e!.projectId;
  deleteProject.value = e!.deleteProject;
  /*查询项目经历*/
  until(
    computed(() => !!mainStore.applicant?.id),
    () => {
      if (projectId.value !== undefined) {
        applicantProjectExperienceService
          .getProjectExperience({
            applicantId: mainStore.applicant!.id,
            projectExperienceId: projectId.value,
          })
          .then((res) => {
            projectExperience.value = res as ProjectExperience;
          });
      }
    }
  );
});

// 添加、修改项目经历
const saveProjectExperience = () => {
  if (
    !projectExperience.value.projectName ||
    !projectExperience.value.projectDescription ||
    !projectExperience.value.achievement
  ) {
    uni.showToast({
      title: "请填写完整信息",
      icon: "none",
      duration: 1500,
    });
  } else if (
    projectExperience.value.startTime === "开始时间" ||
    projectExperience.value.endTime === "结束时间"
  ) {
    uni.showToast({
      title: "请选择项目时间",
      icon: "none",
      duration: 1500,
    });
  } else {
    if (projectId.value !== undefined) {
      // 修改项目经历
      applicantProjectExperienceService
        .updateProjectExperience({
          applicantId: mainStore.applicant!.id,
          id: projectId.value,
          requestBody: projectExperience.value,
        })
        .then(() => {
          uni.showToast({
            title: "修改成功",
            icon: "none",
            duration: 1500,
          });
          uni.navigateBack({ delta: 1 });
        });
    } else {
      // 添加项目经历
      applicantProjectExperienceService
        .addProjectExperience({
          applicantId: mainStore.applicant!.id,
          requestBody: projectExperience.value,
        })
        .then(() => {
          uni.showToast({
            title: "添加成功",
            icon: "none",
            duration: 1500,
          });
          uni.navigateBack({ delta: 1 });
        });
    }
  }
};
// 删除项目经历
const deleteProjectExperience = () => {
  uni.showModal({
    title: "提示",
    content: "确定删除该项目经历吗？",
    success: (res) => {
      if (res.confirm) {
        applicantProjectExperienceService
          .removeProjectExperience({
            applicantId: mainStore.applicant!.id,
            id: projectId.value,
          })
          .then(() => {
            uni.showToast({
              title: "删除成功",
              icon: "none",
              duration: 1500,
            });
            uni.navigateBack({ delta: 1 });
          });
      } else if (res.cancel) {
        return;
      }
    },
  });
};
</script>

<style lang="scss" scoped>
.page {
  .active {
    color: rgb(35 193 158);
  }

  .group-all {
    width: 710rpx;
    height: auto;
    margin-left: 20rpx;

    .group-box {
      width: 100%;
      height: 130rpx;
      margin-top: 20rpx;
      line-height: 60rpx;
      border: solid 2rpx rgb(210 210 210);
      border-radius: 10rpx;

      .text-title {
        padding-left: 20rpx;
        font-size: 30rpx;
      }

      .text-input {
        width: 670rpx;
        padding-left: 20rpx;
        overflow: hidden;
        font-size: 28rpx;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .group-button {
    position: fixed;
    bottom: 40rpx;
    width: 100%;
    height: 80rpx;

    .button-box {
      width: 600rpx;
      height: 100%;
      font-size: 30rpx;
      color: #fff;
      background-color: rgb(35 193 158);
      border-radius: 10rpx;
    }
  }

  .picker-view {
    width: 750rpx;
    height: 600rpx;
    margin-top: 20rpx;
  }

  .item {
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}
</style>
