<template>
  <NavigationBar title="预览简历"></NavigationBar>
  <view class="flex-col info-box">
    <text style="font-size: 45rpx; font-weight: bold"
      >{{ mainStore.applicant?.firstName
      }}{{ mainStore.applicant?.lastName }}</text
    >
    <text v-if="schoolName" style="font-size: 28rpx"
      >{{ schoolName }}/{{
        education[mainStore.applicant?.education || 0]
      }}</text
    >
    <text style="margin-top: 20rpx"
      >{{ workYear[mainStore.applicant?.workingYears || 0] }}/{{
        mainStore.applicant?.age
      }}岁</text
    >
  </view>
  <view class="flex-row resume-box">
    <view
      class="justify-center btn"
      :class="change ? 'active' : ''"
      @click="changeValue"
    >
      <text>在线简历</text>
    </view>
    <view
      class="justify-center btn"
      :class="!change ? 'active' : ''"
      @click="changeValue"
    >
      <text>联系方式</text>
    </view>
  </view>
  <view v-if="change">
    <view
      v-if="mainStore.applicant?.personalAdvantage"
      class="flex-col expectation"
    >
      <text style="font-size: 40rpx; font-weight: bold">我的优势</text>
      <text class="ascendent">{{
        mainStore.applicant?.personalAdvantage
      }}</text>
    </view>
    <view v-if="educationInfo.length" class="flex-col expectation">
      <text style="font-size: 40rpx; font-weight: bold">教育经历</text>
      <view
        v-for="(item, i) in educationInfo"
        :key="i"
        class="flex-col ex-info"
      >
        <text style="font-size: 32rpx; font-weight: bold">{{
          item.schoolName
        }}</text>
        <text class="items-center"
          >{{ education[item.education] }} | {{ item.majorName }}</text
        >
        <text>{{ item.admissionTime }}-{{ item.graduationTime }}</text>
      </view>
    </view>
    <view v-if="workInfo.length" class="flex-col expectation">
      <text style="font-size: 40rpx; font-weight: bold">工作经历</text>
      <view v-for="(item, i) in workInfo" :key="i" class="flex-col ex-info">
        <text style="font-size: 32rpx; font-weight: bold">{{
          item.companyName
        }}</text>
        <text>{{ item.positionName }}</text>
        <text>{{ item.startTime }}-{{ item.endTime }}</text>
        <text>所属部门：{{ item.departmentName }}</text>
        <text>{{ item.jobContent }}</text>
      </view>
    </view>
    <view v-if="positionInfo.length" class="flex-col expectation">
      <text style="font-size: 40rpx; font-weight: bold">项目经验</text>
      <view v-for="(item, i) in positionInfo" :key="i" class="flex-col ex-info">
        <text style="font-size: 32rpx; font-weight: bold">{{
          item.projectName
        }}</text>
        <text>{{ item.startTime }}-{{ item.endTime }}</text>
        <text>项目链接：{{ item.projectLink }}</text>
        <text>成就：{{ item.achievement }}</text>
        <text>{{ item.projectDescription }}</text>
      </view>
    </view>
  </view>
  <view v-if="!change">
    <view class="flex-row connect-box">
      <image :src="useResFullPath(userInformation.avatarUrl)" class="img" />
      <view class="flex-col" style="margin-left: 15rpx; line-height: 50rpx">
        <text>联系邮箱</text>
        <text>{{ mainStore.account!.userName }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import { until, useResFullPath } from "@/hooks";
import { useMainStore } from "@/stores";
import type {
Applicant,
EducationExperience,
ProjectExperience,
WorkExperience,
} from "@dongjiang-recruitment/service-common";

const mainStore = useMainStore();
const userInformation = ref<Applicant>({} as Applicant);

const educationInfo = ref<EducationExperience[]>([]);
const workInfo = ref<WorkExperience[]>([]);
const positionInfo = ref<ProjectExperience[]>([]);
const education = ["未知", "大专", "本科", "硕士", "博士"];
const workYear = [
  "",
  "无工作经验",
  "在校/应届",
  "3年及以下",
  "3-5年",
  "5-10年",
  "10年以上",
];
const schoolName = ref("");
const change = ref(true);

until(
  computed(() => !!mainStore.applicant?.id),
  () => {
    // 教育经历
    applicantEducationExperienceService
      .queryEducationExperience({
        applicantId: mainStore.applicant!.id,
      })
      .then((res) => {
        educationInfo.value = res.items;
        schoolName.value = educationInfo.value[0].schoolName;
      });
    // 工作经历
    applicantWorkExperienceService
      .queryWorkExperience({
        applicantId: mainStore.applicant!.id,
      })
      .then((res) => {
        workInfo.value = res.items;
      });
    // 项目经验
    applicantProjectExperienceService
      .queryProjectExperience({
        applicantId: mainStore.applicant!.id,
      })
      .then((res) => {
        positionInfo.value = res.items;
      });
  }
);
// 改变变化值的函数。
const changeValue = () => {
  change.value = !change.value;
};
</script>

<style lang="scss" scoped>
.active {
  color: rgb(35 193 158);
}

.info-box {
  width: 92%;
  height: auto;
  margin-left: 4%;
  line-height: 50rpx;
}

.resume-box {
  width: 92%;
  margin-top: 80rpx;
  margin-left: 4%;
  font-size: 30rpx;
  font-weight: bold;

  .btn {
    margin-right: 50rpx;
  }
}

.expectation {
  width: 92%;
  margin-top: 35rpx;
  margin-left: 4%;
  font-size: 30rpx;

  .ascendent {
    width: 100%;
    height: auto;
    line-height: 50rpx;
    white-space: nowrap;
  }

  .ex-info {
    width: 100%;
    height: auto;
    margin-top: 20rpx;
    line-height: 50rpx;
  }
}

.connect-box {
  width: 92%;
  height: auto;
  margin-top: 35rpx;
  margin-left: 4%;

  .img {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
  }
}
</style>
