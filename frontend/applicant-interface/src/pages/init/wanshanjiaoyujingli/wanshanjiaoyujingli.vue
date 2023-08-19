<template>
  <NavigationBar right="跳过" @right-click="skip" />
  <view class="flex-col page">
    <view class="flex-col group-all">
      <text class="self-info">请完善教育经历（2/3）</text>
      <view class="group-self">
        <text class="text">学校名称</text>
        <input
          v-model="schoolName"
          class="input"
          type="text"
          placeholder="请输入"
        />
      </view>
      <view class="group-self">
        <text class="text">学历</text>
        <view
          class="flex-row justify-between items-center"
          @click="showEducation"
        >
          <text class="input">{{ educationValue[educationId] }}</text>
          <image class="image" src="@/static/icons/arrow-right.png" />
        </view>
      </view>
      <view class="group-self">
        <text class="text">专业名称</text>
        <input
          v-model="subject"
          class="input"
          type="text"
          placeholder="请输入"
        />
      </view>
      <view class="group-self">
        <text class="text">在校时间</text>
        <view class="flex-row" @click="showSchool">
          <view class="justify-center items-center school-time">
            <text>{{ startSchool }}</text>
          </view>
          <view class="justify-center items-center school-time">
            <text>{{ endSchool }}</text>
          </view>
        </view>
      </view>
      <wybPopup
        ref="popup"
        :show-close-icon="true"
        :height="400"
        :radius="10"
        mode="size-auto"
        type="bottom"
      >
        <picker-view v-if="isShowEd" class="picker-view" @change="edChange">
          <picker-view-column>
            <view
              v-for="(educate, i) in educationValue"
              :key="i"
              class="item"
              >{{ educate }}</view
            >
          </picker-view-column>
        </picker-view>
        <view v-if="isShowSchool">
          <view class="flex-row">
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
                startSchool
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
                endSchool
              }}</text>
            </view>
          </view>
          <picker-view
            v-show="start"
            :value="startValue"
            class="picker-view"
            @change="schoolChange"
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
            v-show="end"
            :value="endValue"
            class="picker-view"
            @change="schoolChange"
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

const mainStore = useMainStore();

const schoolName = ref("");
const educationId = ref<0 | 1 | 2 | 3 | 4>(0);
const subject = ref("");
const startSchool = ref("入学时间");
const endSchool = ref("毕业时间");
const educationValue = ref(["请选择", "大专", "本科", "硕士", "博士"]);

const popup = ref();

const isShowEd = ref(false);
const isShowSchool = ref(false);
const start = ref(true); // 入学时间
const end = ref(false); // 毕业时间
const showEducation = () => {
  isShowEd.value = true;
  isShowSchool.value = false;
  popup.value.show();
};
// 显示弹出层
const showSchool = () => {
  isShowEd.value = false;
  isShowSchool.value = true;
  popup.value.show();
};
// 学历
const edChange = (e: { detail: { value: number[] } }) => {
  educationId.value = e.detail.value[0] as 0 | 1 | 2 | 3 | 4;
  popup.value.hide();
};

const date = new Date();
const years = ref<number[]>([]);
const months = ref<number[]>([]);
const days = ref<number[]>([]);
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
for (let i = 1970; i <= year + 5; i++) {
  years.value.push(i);
}
for (let i = 1; i <= 12; i++) {
  months.value.push(i);
}
for (let i = 1; i <= 31; i++) {
  days.value.push(i);
}
// 选择器默认值
const startValue = ref([year - 1970, month - 1, day - 1]);
const endValue = ref([year, month - 1, day - 1]);
// 选择在校时间
const schoolChange = (e: { detail: { value: any } }) => {
  const val = e.detail.value;
  year = years.value[val[0]];
  month = months.value[val[1]];
  day = days.value[val[2]];
  if (start.value) {
    startSchool.value = `${year}-${month}-${day}`;
    startValue.value = [val[0], val[1], val[2]];
  } else {
    endSchool.value = `${year}-${month}-${day}`;
    endValue.value = [val[0], val[1], val[2]];
  }
};
// 下一步
const nextClick = () => {
  if (!schoolName.value || !educationId.value || !subject.value) {
    uni.showToast({
      title: "请填写完整信息",
      icon: "none",
      duration: 1500,
    });
  } else if (
    startSchool.value === "入学时间" ||
    endSchool.value === "毕业时间"
  ) {
    uni.showToast({
      title: "请选择在校时间",
      icon: "success",
      duration: 1500,
    });
  } else {
    applicantEducationExperienceService
      .addEducationExperience({
        applicantId: mainStore.applicant!.id,
        requestBody: {
          schoolName: schoolName.value,
          education: educationId.value,
          majorName: subject.value,
          admissionTime: startSchool.value,
          graduationTime: endSchool.value,
        },
      })
      .then((res) => {
        mainStore.applicant!.education = res.education;
        uni.navigateTo({
          url: "/pages/init/wanshangongzuojingli/wanshangongzuojingli",
        });
      });
  }
};

const skip = () => {
  uni.navigateTo({
    url: "/pages/init/wanshangongzuojingli/wanshangongzuojingli",
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
