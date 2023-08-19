<template>
  <NavigationBar
    title="工作经历"
    :right="deleteWork"
    @right-click="deleteWorkExperience"
  />
  <view class="flex-row page">
    <view class="group-all">
      <view class="group-box">
        <text class="text-title">公司名称</text>
        <input
          v-model="companyName"
          class="text-input"
          type="text"
          placeholder="请填写"
        />
      </view>
      <view class="group-box">
        <text class="text-title">公司行业</text>
        <input
          v-model="companyIndustry"
          class="text-input"
          type="text"
          placeholder="请填写"
        />
      </view>
      <view class="group-box">
        <text class="text-title">在职时间</text>
        <view
          class="flex-row justify-between items-center"
          @click="choosePositionTime"
        >
          <text style="width: 48%; margin-left: 20rpx; font-size: 28rpx">{{
            companyStartTime
          }}</text>
          <text style="width: 48%; font-size: 28rpx">{{ companyEndTime }}</text>
        </view>
      </view>
      <view class="group-box">
        <text class="text-title">职位名称</text>
        <view
          class="flex-row justify-between items-center"
          @click="getPosition"
        >
          <input
            v-model="positionName"
            class="text-input"
            type="text"
            placeholder="请选择"
          />
          <image class="image" src="@/static/icons/arrow-right.png" />
        </view>
      </view>
      <view class="group-box">
        <view>
          <text class="text-title">职位类型</text>
        </view>
        <view
          class="flex-row justify-between items-center"
          @click="choosePosition"
        >
          <input
            v-model="companyPositions[companyPosition]"
            class="text-input"
            type="text"
            placeholder="请选择"
          />
          <image class="image" src="@/static/icons/arrow-right.png" />
        </view>
      </view>
      <view class="group-box">
        <text class="text-title">所属部门</text>
        <input
          v-model="companyDepartment"
          class="text-input"
          type="text"
          placeholder="请填写"
        />
      </view>
      <view class="group-box">
        <text class="text-title">工作内容</text>
        <input
          v-model="companyContent"
          class="text-input"
          type="text"
          placeholder="请填写"
          @click="showTextarea"
        />
      </view>
    </view>
    <view class="justify-center group-button">
      <button
        class="justify-center items-center button-box"
        @click="saveWorkExperience"
      >
        保存
      </button>
    </view>
    <wybPopup
      ref="popup"
      :show-close-icon="false"
      :height="heightValue"
      :radius="10"
      mode="size-auto"
      type="bottom"
    >
      <view v-if="showTime">
        <view class="flex-row justify-between items-center">
          <view
            class="flex-col justify-center items-center"
            style="width: 50%"
            @click="start = true"
          >
            <text>入职时间</text>
            <text style="font-size: 25rpx" :class="start ? 'active' : ''">{{
              companyStartTime
            }}</text>
          </view>
          <view
            class="flex-col justify-center items-center"
            style="width: 50%"
            @click="start = false"
          >
            <text>离职时间</text>
            <text style="font-size: 25rpx" :class="!start ? 'active' : ''">{{
              companyEndTime
            }}</text>
          </view>
        </view>
        <picker-view
          v-if="start"
          :value="defaultStart"
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
          v-if="!start"
          :value="defaultEnd"
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
      </view>

      <view v-if="showPositionType">
        <picker-view class="picker-view" @change="positionChange">
          <picker-view-column>
            <view v-for="(item, i) in companyPositions" :key="i" class="item">{{
              item
            }}</view>
          </picker-view-column>
        </picker-view>
      </view>

      <view v-if="showPositionText">
        <view class="flex-row justify-between items-center btn-box">
          <text class="title">工作内容</text>
          <view>
            <text class="clear" @click="clearLength">清空</text>
            <text class="save" @click="saveTextarea">确认</text>
          </view>
        </view>
        <view class="job-content-box">
          <textarea
            v-model="companyContent"
            :maxlength="150"
            class="textarea"
            placeholder="请填写相关的工作内容"
          />
          <text class="justify-end">({{ companyContent.length }}/150)</text>
        </view>
      </view>
    </wybPopup>
  </view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import wybPopup from "@/components/wyb-popup/wyb-popup.vue";
import { until } from "@/hooks";
import { useMainStore } from "@/stores";
import type { WorkExperience } from "@dongjiang-recruitment/service-common";
const mainStore = useMainStore();

const companyName = ref(""); // 公司名称
const companyIndustry = ref(""); // 公司行业
const companyStartTime = ref("入职时间"); // 入职时间
const companyEndTime = ref("离职时间"); // 离职时间
const companyPosition = ref<1 | 2 | 3>(0 as 1); // 职位类型
const companyPositions = ["请选择", "全职", "兼职", "实习"]; // 职位类型
const showPositionType = ref(false); // 显示职位类型
const showPositionText = ref(false); // 显示工作内容
const showTime = ref(true); // 显示在职时间
const start = ref(true); // 开始时间
const positionName = ref(""); // 职位名称
const companyDepartment = ref(""); // 所属部门
const companyContent = ref(""); // 工作内容
const deleteWork = ref(); // 删除工作经历
const workId = ref(); // 工作经历id

// 获取职位名
const getPosition = () => {
  uni.navigateTo({ url: "/pages/most/zhiweileixing/zhiweileixing" });
};
onLoad((e) => {
  workId.value = e!.workId; // 工作经历id
  deleteWork.value = e!.deleteWork; // 删除工作经历
  /* 查询工作经历 */
  until(
    computed(() => !!mainStore.applicant?.id),
    () => {
      if (workId.value !== undefined) {
        applicantWorkExperienceService
          .getWorkExperience({
            applicantId: mainStore.applicant!.id,
            id: workId.value,
          })
          .then((res) => {
            companyName.value = res.companyName;
            companyIndustry.value = res.companyIndustry;
            companyStartTime.value = res.startTime;
            companyEndTime.value = res.endTime;
            companyPosition.value = res.positionType;
            positionName.value = res.positionName;
            companyDepartment.value = res.departmentName;
            companyContent.value = res.jobContent;
          });
      }
    }
  );
  /* 接收职位名*/
  uni.$on("positiontypes", (data) => {
    positionName.value = data;
  });
});
/* 就职时间 */
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
const defaultStart = ref([year, month - 1, day - 1]); /* 默认入职时间 */
const defaultEnd = ref([year, month, day]); /* 默认离职时间 */
// 选择器
const bindChange = (e: any) => {
  const val = e.detail.value;
  year = years.value[val[0]];
  month = months.value[val[1]];
  day = days.value[val[2]];
  if (start.value) {
    companyStartTime.value = `${year}-${month}-${day}`;
    defaultStart.value = [val[0], val[1], val[2]];
  } else {
    companyEndTime.value = `${year}-${month}-${day}`;
    defaultEnd.value = [val[0], val[1], val[2]];
  }
};

// 弹出层
const popup = ref();
const heightValue = ref();
/* 在职时间 */
const choosePositionTime = () => {
  popup.value.show();
  heightValue.value = 400;
  showTime.value = true;
  showPositionType.value = false;
  showPositionText.value = false;
};
/* 选择职位类型 */
const choosePosition = () => {
  popup.value.show();
  heightValue.value = 300;
  showTime.value = false;
  showPositionType.value = true;
  showPositionText.value = false;
};
const positionChange = (e: {
  detail: { value: WorkExperience["positionType"][] };
}) => {
  companyPosition.value = e.detail.value[0] as 1 | 2 | 3;
  popup.value.hide();
};
/* 工作内容 */
const showTextarea = () => {
  popup.value.show();
  heightValue.value = 700;
  showTime.value = false;
  showPositionType.value = false;
  showPositionText.value = true;
};
// 清除输入字段的函数。
const clearLength = () => {
  companyContent.value = "";
};
const saveTextarea = () => {
  popup.value.hide();
};

// 保存工作经历
const saveWorkExperience = () => {
  if (
    !companyName.value ||
    !companyIndustry.value ||
    !companyPosition.value ||
    !companyDepartment.value ||
    !companyContent.value
  ) {
    uni.showToast({
      title: "请填写完整信息",
      icon: "none",
      duration: 1500,
    });
  } else if (
    companyStartTime.value === "入职时间" ||
    companyEndTime.value === "离职时间"
  ) {
    uni.showToast({
      title: "请完善就职时间",
      icon: "none",
      duration: 1500,
    });
  } else {
    applicantWorkExperienceService
      .addWorkExperience({
        applicantId: mainStore.applicant!.id,
        requestBody: {
          companyName: companyName.value,
          companyIndustry: companyIndustry.value,
          startTime: companyStartTime.value,
          endTime: companyEndTime.value,
          positionName: positionName.value,
          positionType: companyPosition.value,
          departmentName: companyDepartment.value,
          jobContent: companyContent.value,
        },
      })
      .then((res) => {
        uni.showToast({
          title: "保存成功",
          icon: "none",
          duration: 1500,
        });
        uni.navigateBack({
          delta: 1,
        });
      });
  }
};

// 删除工作经历
const deleteWorkExperience = () => {
  uni.showModal({
    title: "提示",
    content: "确定删除该工作经历吗？",
    success: (res) => {
      if (res.confirm) {
        applicantWorkExperienceService
          .removeWorkExperience({
            applicantId: mainStore.applicant!.id,
            id: workId.value,
          })
          .then(() => {
            uni.showToast({
              title: "删除成功",
              icon: "none",
              duration: 1500,
            });
            uni.navigateBack({
              delta: 1,
            });
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
      border-radius: 5rpx;

      .text-title {
        padding-left: 20rpx;
        font-size: 30rpx;
      }

      .text-input {
        width: 690rpx;
        padding-left: 20rpx;
        overflow: hidden;
        font-size: 28rpx;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .group-button {
    position: absolute;
    bottom: 40rpx;
    width: 100%;
    height: 80rpx;

    .button-box {
      width: 600rpx;
      font-size: 30rpx;
      color: #fff;
      background-color: rgb(35 193 158);
      border-radius: 10rpx;
    }
  }

  .btn-box {
    width: 690rpx;
    margin-top: 10rpx;
    margin-left: 30rpx;

    .title {
      font-size: 30rpx;
      font-weight: bold;
    }

    .clear {
      padding-right: 10rpx;
      font-size: 28rpx;
      color: gray;
    }

    .save {
      padding-right: 10rpx;
      font-size: 28rpx;
      color: rgb(35 193 158);
    }
  }

  .image {
    width: 35rpx;
    height: 35rpx;
  }

  .job-content-box {
    width: 690rpx;
    height: 550rpx;
    margin-top: 20rpx;
    margin-left: 30rpx;
    line-height: 50rpx;
    background-color: rgb(240 240 240);
    border-radius: 10rpx;

    .textarea {
      width: 650rpx;
      height: 500rpx;
      padding-left: 20rpx;
      font-size: 28rpx;
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
}
</style>
