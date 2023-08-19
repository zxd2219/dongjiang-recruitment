<template>
  <NavigationBar right="跳过" @right-click="skip" />
  <view class="flex-col page">
    <view class="flex-col group-all">
      <text class="self-info">请完善工作经历（3/3）</text>
      <view class="group-self">
        <text class="text">公司名称</text>
        <input
          v-model="companyName"
          class="input"
          type="text"
          placeholder="请输入"
        />
      </view>
      <view class="group-self">
        <text class="text">公司行业</text>
        <input
          v-model="companyType"
          class="input"
          type="text"
          placeholder="请输入"
        />
      </view>
      <view class="group-self">
        <text class="text">职位类型</text>
        <view class="flex-row justify-between" @click="subType">
          <text class="input">{{ subjectType[subject] }}</text>
          <image class="image" src="@/static/icons/arrow-right.png" />
        </view>
      </view>
      <view class="group-self">
        <text class="text">在职时间</text>
        <view class="flex-row" @click="showWorkTime">
          <view class="justify-center items-center school-time">
            <text>{{ startTime }}</text>
          </view>
          <view class="justify-center items-center school-time">
            <text>{{ endTime }}</text>
          </view>
        </view>
      </view>
      <wybPopup
        ref="popup"
        :show-close-icon="false"
        :height="400"
        :radius="10"
        mode="size-auto"
        type="bottom"
      >
        <view v-if="!sub">
          <view class="flex-row justify-between" style="margin-top: 20rpx">
            <view
              class="flex-col justify-center items-center"
              style="width: 50%; height: 60rpx"
              @click="start = !start"
              ><text>入职时间</text>
              <text style="font-size: 25rpx" :class="start ? 'active' : ''">{{
                startTime
              }}</text>
            </view>
            <view
              class="flex-col justify-center items-center"
              style="width: 50%; height: 60rpx"
              @click="start = !start"
              ><text>离职时间</text>
              <text style="font-size: 25rpx" :class="!start ? 'active' : ''">{{
                endTime
              }}</text>
            </view>
          </view>
          <picker-view
            v-if="start"
            :value="startValue"
            class="picker-view"
            @change="workChange"
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
            v-if="!start"
            :value="endValue"
            class="picker-view"
            @change="workChange"
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
        </view>
        <!-- 职位类型 -->
        <view v-if="sub">
          <picker-view class="picker-view" @change="workChange">
            <picker-view-column>
              <view v-for="(item, i) in subjectType" :key="i" class="item">{{
                item
              }}</view>
            </picker-view-column>
          </picker-view>
        </view>
      </wybPopup>
    </view>
    <view class="justify-center next-click">
      <view class="justify-center items-center next-box" @click="nextClick">
        <text>下一步</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import wybPopup from "@/components/wyb-popup/wyb-popup.vue";
import { useMainStore } from "@/stores";
import type { Company } from "@dongjiang-recruitment/service-common";

const mainStore = useMainStore();

const companyName = ref<Company["companyName"]>("");
const companyType = ref<Company["comprehensionName"]>("");
const subject = ref<0 | 1 | 2 | 3>(0);
const subjectType = ref(["请选择", "全职", "兼职", "实习"]);
const startTime = ref("入职时间");
const endTime = ref("离职时间");
const sub = ref(false);
const start = ref(true);

const popup = ref();
const subType = () => {
  sub.value = true;
  popup.value.show();
};
const showWorkTime = () => {
  sub.value = false;
  popup.value.show();
};

const date = new Date();
// const startYears = ref<number[]>([]);
// const endYears = ref<number[]>([]);
const years = ref<number[]>([]);
const months = ref<number[]>([]);
const days = ref<number[]>([]);
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
for (let i = 1970; i <= year; i++) {
  years.value.push(i);
}
for (let i = 1; i <= 12; i++) {
  months.value.push(i);
}
for (let i = 1; i <= 31; i++) {
  days.value.push(i);
}
const startValue = ref([year, month - 1, day - 1]); //选择器默认值
const endValue = ref([year, month - 1, day - 1]); //选择器默认值

// 用于更改选取器值的函数。
const workChange = (e: { detail: { value: number[] } }) => {
  const val = e.detail.value;
  year = years.value[val[0]];
  month = months.value[val[1]];
  day = days.value[val[2]];
  if (sub.value) {
    subject.value = val[0] as 0 | 1 | 2 | 3;
  } else {
    if (start.value) {
      startTime.value = `${year}-${month}-${day}`;
      startValue.value = [val[0], val[1], val[2]];
    } else {
      endTime.value = `${year}-${month}-${day}`;
      endValue.value = [val[0], val[1], val[2]];
    }
  }
};
// 下一步
const nextClick = () => {
  // 检查用户是否填写了所有信息。
  if (!companyName.value || !companyType.value || !subject.value) {
    uni.showToast({
      title: "请填写完整信息",
      icon: "none",
      duration: 1500,
    });
  } else if (startTime.value === "入职时间" || endTime.value === "离职时间") {
    uni.showToast({
      title: "请选择就职时间",
      icon: "none",
      duration: 1500,
    });
  } else {
    applicantWorkExperienceService
      .addWorkExperience({
        applicantId: mainStore.applicant!.id,
        requestBody: {
          companyName: companyName.value,
          companyIndustry: companyType.value,
          positionType: subject.value,
          startTime: startTime.value,
          endTime: endTime.value,
          departmentName: "",
          jobContent: "",
          positionName: "",
        },
      })
      .then(() => {
        uni.navigateTo({
          url: `/pages/info/qiuzhiqiwang/qiuzhiqiwang?data=` + 0,
        });
      });
  }
};

const skip = () => {
  uni.navigateTo({ url: "/pages/info/qiuzhiqiwang/qiuzhiqiwang?data=" + 0 });
};
</script>

<style lang="scss" scoped>
.page {
  .active {
    color: rgb(35 193 158);
  }

  .group-all {
    width: 710rpx;
    margin-left: 20rpx;

    .self-info {
      font-size: 30rpx;
      font-weight: 600;
    }

    .group-self {
      height: 120rpx;
      margin-top: 20rpx;
      line-height: 60rpx;
      border: 2rpx solid rgb(230 230 230);

      .text {
        padding-left: 20rpx;
        font-size: 30rpx;
      }

      .sex {
        padding: 3rpx 40rpx;
        margin-right: 15rpx;
        font-size: 25rpx;
        border: 2rpx solid rgb(230 230 230);
      }

      .school-time {
        width: 50%;
        font-size: 25rpx;
      }
    }
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

  .next-click {
    position: fixed;
    bottom: 40rpx;
    width: 100%;
    height: 80rpx;

    .next-box {
      width: 70%;
      font-size: 30rpx;
      background-color: rgb(35 193 158);
    }
  }

  .image {
    width: 35rpx;
    height: 35rpx;
  }

  .input {
    margin-left: 20rpx;
    font-size: 27rpx;
  }
}
</style>
