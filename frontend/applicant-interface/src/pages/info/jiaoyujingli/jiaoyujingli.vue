<template>
  <NavigationBar
    title="编辑教育经历"
    :right="deleteEd"
    @right-click="deleteEducation"
  />
  <view class="flex-row page">
    <view class="group-all">
      <view class="group-box">
        <text class="text-title">学校名称</text>
        <input
          v-model="schoolName"
          class="text-input"
          type="text"
          placeholder="请填写"
        />
      </view>
      <view class="flex-col group-box">
        <text class="text-title">学历</text>
        <view
          class="flex-row justify-between items-center"
          @click="showEducate"
        >
          <text class="text-input">{{ educations[education] }}</text>
          <image class="image" src="@/static/icons/arrow-right.png" />
        </view>
      </view>
      <view class="group-box">
        <text class="text-title">专业名称</text>
        <input
          v-model="subject"
          class="text-input"
          type="text"
          placeholder="请填写"
        />
      </view>
      <view class="group-box">
        <text class="text-title">在校时间</text>
        <view class="flex-row" @click="showSchool">
          <view class="justify-center items-center sch-time">{{
            startTime
          }}</view>
          <view class="justify-center items-center sch-time">{{
            overTime
          }}</view>
        </view>
      </view>
    </view>
    <view class="justify-center group-button">
      <button
        class="justify-center items-center button-box"
        @click="saveEducation"
      >
        保存
      </button>
    </view>
    <WybPopup
      ref="popup"
      type="bottom"
      height="300"
      radius="6"
      mode="size-auto"
      :show-close-icon="false"
    >
      <view v-if="educate === false" class="flex-row">
        <view
          class="flex-col justify-center items-center"
          style="width: 50%"
          @click="
            start = true;
            end = false;
          "
        >
          <text>入学时间</text>
          <text style="font-size: 25rpx" :class="start ? 'active' : ''">{{
            startTime
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
          <text>毕业时间</text>
          <text style="font-size: 25rpx" :class="end ? 'active' : ''">{{
            overTime
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
      <picker-view
        v-if="educate"
        :value="defaultEducation"
        class="picker-view"
        @change="bindChange"
      >
        <picker-view-column>
          <view v-for="(item, i) in educations" :key="i" class="item">{{
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
import type { EducationExperience } from "@dongjiang-recruitment/service-common";
const mainStore = useMainStore();

const schoolName = ref(""); // 学校名称
const education = ref<1 | 2 | 3 | 4>(0 as 1); // 学历

const subject = ref(""); // 专业名称
const startTime = ref("入学时间"); // 入学时间
const overTime = ref("结束时间"); /* 毕业时间 */
/* 学历高度 */
const educations = ref(["请选择", "大专", "本科", "硕士", "博士"]);

const start = ref(false);
const end = ref(false);
const educate = ref(false);
const popup = ref();
// 选择学历
const showEducate = () => {
  educate.value = true;
  start.value = false;
  end.value = false;
  popup.value.show();
};
// 选择在校时间
const showSchool = () => {
  educate.value = false;
  start.value = true;
  end.value = false;
  popup.value.show();
};
const date = new Date();
const years = ref<number[]>([]);
const months = ref<number[]>([]);
const days = ref<number[]>([]);
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
for (let i = 1960; i <= year + 5; i++) {
  years.value.push(i);
}
for (let i = 1; i <= 12; i++) {
  months.value.push(i);
}
for (let i = 1; i <= 31; i++) {
  days.value.push(i);
}
const value1 = ref([year - 1960, month - 1, day - 1]); /* 默认入学时间 */
const value2 = ref([year, month - 1, day - 1]); /* 默认毕业时间 */
const defaultEducation = ref([education.value]); /* 默认学历 */
const bindChange = (e: any) => {
  const val = e.detail.value;
  year = years.value[val[0]];
  month = months.value[val[1]];
  day = days.value[val[2]];
  if (start.value) {
    startTime.value = `${year}-${month}-${day}`;
    value1.value = [val[0], val[1], val[2]];
  } else if (end.value) {
    overTime.value = `${year}-${month}-${day}`;
    value2.value = [val[0], val[1], val[2]];
  } else {
    education.value = val[0] as 1 | 2 | 3 | 4;
    defaultEducation.value = [val[0]];
  }
};

const educateId = ref(); // 教育经历id
const deleteEd = ref(); // 删除
onLoad((e) => {
  educateId.value = e!.educateId;
  deleteEd.value = e!.deleteEducate;
  // 查询教育经历
  until(
    computed(() => !!mainStore.applicant?.id),
    () => {
      if (educateId.value !== undefined) {
        applicantEducationExperienceService
          .getEducationExperience({
            applicantId: mainStore.applicant!.id,
            id: educateId.value,
          })
          .then((res) => {
            schoolName.value = res.schoolName;
            education.value = res.education as 1 | 2 | 3 | 4;
            subject.value = res.majorName;
            startTime.value = res.admissionTime;
            overTime.value = res.graduationTime;
          });
      }
    }
  );
});
// 增加、修改教育经历
const saveEducation = () => {
  if (!schoolName.value || !subject.value) {
    uni.showToast({
      title: "请填写完整信息",
      icon: "none",
      duration: 1500,
    });
  } else if (startTime.value === "入学时间" || overTime.value === "结束时间") {
    uni.showToast({
      title: "请选择在校时间",
      icon: "none",
      duration: 1500,
    });
  } else {
    if (educateId.value !== undefined) {
      //修改教育经历
      applicantEducationExperienceService
        .updateEducationExperience({
          applicantId: mainStore.applicant!.id,
          id: educateId.value,
          requestBody: {
            schoolName: schoolName.value,
            education: education.value,
            majorName: subject.value,
            admissionTime: startTime.value,
            graduationTime: overTime.value,
            id: educateId.value,
          } as EducationExperience,
        })
        .then((res) => {
          uni.navigateBack({ delta: 1 });
        });
    } else {
      applicantEducationExperienceService
        .addEducationExperience({
          applicantId: mainStore.applicant!.id,
          requestBody: {
            schoolName: schoolName.value,
            education: education.value,
            majorName: subject.value,
            admissionTime: startTime.value,
            graduationTime: overTime.value,
          },
        })
        .then((res) => {
          uni.navigateBack({ delta: 1 });
        });
    }
  }
};
// 删除教育经历
const deleteEducation = () => {
  uni.showModal({
    title: "提示",
    content: "确定删除该教育经历吗？",
    showCancel: true,
    success: (res) => {
      if (res.confirm) {
        applicantEducationExperienceService
          .removeEducationExperience({
            applicantId: mainStore.applicant!.id,
            id: educateId.value,
          })
          .then(() => {
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

  .image {
    width: 35rpx;
    height: 35rpx;
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
      border: 2rpx solid rgb(210 210 210 / 50%);
      border-radius: 5rpx;

      .text-title {
        padding-left: 20rpx;
        font-size: 30rpx;
      }

      .text-input {
        padding-left: 20rpx;
        font-size: 28rpx;
      }

      .sch-time {
        width: 50%;
        font-size: 28rpx;
      }
    }
  }

  .group-button {
    position: fixed;
    bottom: 40rpx;
    width: 100%;
    height: 80rpx;

    .button-box {
      width: 500rpx;
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
