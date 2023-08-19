<template>
  <NavigationBar
    title="求职期望"
    :right="deleteEx"
    @right-click="deleteExpectation"
  />
  <view class="flex-row page">
    <view class="group-all">
      <view
        class="flex-row items-center justify-between group-box"
        @click="expectJob"
      >
        <text class="text-title">期望职位</text>
        <view class="items-center text-right">
          <text>{{ jobExpectation.positionName }}</text>
          <image class="image" src="@/static/icons/arrow-right.png" />
        </view>
      </view>
      <view
        v-if="directionShow"
        class="flex-row items-center justify-between group-box"
        @click="directTag"
      >
        <text class="text-title">细分标签</text>
        <view class="items-center text-right">
          <text class="direction">{{ directionTag }}</text>
          <image class="image" src="@/static/icons/arrow-right.png" />
        </view>
      </view>
      <view
        class="flex-row items-center justify-between group-box"
        @click="expectSalary"
      >
        <text class="text-title">期望月薪</text>
        <view class="items-center text-right">
          <text>{{ salary }}</text>
          <image class="image" src="@/static/icons/arrow-right.png" />
        </view>
      </view>
      <view
        class="flex-row items-center justify-between group-box"
        @click="expectCity"
      >
        <text class="text-title">期望城市</text>
        <view class="items-center text-right">
          <text>{{ jobExpectation.cityName }}</text>
          <image class="image" src="@/static/icons/arrow-right.png" />
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
      <view class="flex-row justify-between" style="height: 80rpx">
        <view
          class="justify-center items-center"
          style="width: 25%; font-size: 30rpx"
        >
          <text style="color: gray" @click="popup.hide()">取消</text>
        </view>
        <view
          class="justify-center items-center"
          style="width: 25%; font-size: 30rpx"
        >
          <text>期望薪资</text>
        </view>
        <view
          class="justify-center items-center"
          style="width: 25%; font-size: 30rpx"
        >
          <text style="color: rgb(35 193 158)" @click="salaryExpectation"
            >确认</text
          >
        </view>
      </view>
      <picker-view :value="value" class="picker-view" @change="salaryChange">
        <picker-view-column>
          <view v-for="(item, i) in startSalary" :key="i" class="item"
            >{{ item }}k</view
          >
        </picker-view-column>
        <picker-view-column>
          <view v-for="(item, i) in endSalary" :key="i" class="item"
            >{{ item }}k</view
          >
        </picker-view-column>
      </picker-view>
    </wybPopup>
    <view class="justify-center button-box">
      <button class="button" @click="saveJobExcept">{{ saveBtn }}</button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import wybPopup from "@/components/wyb-popup/wyb-popup.vue";
import { until } from "@/hooks";
import { useMainStore } from "@/stores";
import type { JobExpectation } from "@dongjiang-recruitment/service-common";

const mainStore = useMainStore();

const jobExpectation = ref<JobExpectation>({
  id: "",
  createdAt: "",
  updatedAt: "",
  positionType: 1 as 1 | 2 | 3,
  positionName: "",
  directionTags: <string[]>[],
  startingSalary: 0,
  ceilingSalary: 0,
  cityName: "",
} as JobExpectation);
const salary = ref("");

const directionTag = ref("");
const directionShow = ref(false);
const saveBtn = ref("保存");
const saveOver = ref("完成");
const deleteEx = ref("");
const jobId = ref(""); // 求职期望id

const popup = ref();
const expectSalary = () => {
  popup.value.show();
};

const startSalary = ref<number[]>([]);
const endSalary = ref<number[]>([]);
let start = ref(0);
let end = ref(0);
for (let i = 1; i <= 90; i++) {
  startSalary.value.push(i);
}
for (let i = 5; i <= 100; i++) {
  endSalary.value.push(i);
}
const value = ref([5, 8]);
// 当用户更改选择器视图的值时调用的函数。
const salaryChange = (e: { detail: { value: number[] } }) => {
  let val = e.detail.value;
  start.value = startSalary.value[val[0]];
  end.value = endSalary.value[val[1]];
  value.value = [val[0], val[1]];
};
// 当用户单击弹出窗口中的“确认”按钮时调用的函数。
const salaryExpectation = () => {
  if (start.value === 0 || end.value === 0) {
    jobExpectation.value.startingSalary = 6;
    jobExpectation.value.ceilingSalary = 13;
    salary.value = "6k-13k";
  } else {
    jobExpectation.value.startingSalary = start.value;
    jobExpectation.value.ceilingSalary = end.value;
    salary.value = `${start.value}k-${end.value}k`;
  }
  popup.value.hide();
};
const d = ref(1);
onLoad((e) => {
  if (e!.id !== undefined) {
    jobId.value = e!.id;
  }
  if (e!.data) {
    d.value = parseInt(e!.data);
    if (parseInt(e!.data)) {
      saveBtn.value = "保存";
    } else {
      saveBtn.value = "完成";
    }
  }

  until(
    computed(() => !!mainStore.applicant?.id),
    () => {
      if (jobId.value) {
        if (e!.type) {
          if (parseInt(e!.type) === 1) {
            deleteEx.value = "删除";
          }
        } else {
          deleteEx.value = "";
        }
        // 获取工作期望信息的函数。
        applicantJobExpectationService
          .getJobExpectation({
            applicantId: mainStore.applicant!.id,
            id: jobId.value,
          })
          .then((res) => {
            jobExpectation.value = res;
            salary.value = `${
              jobExpectation.value.startingSalary
            }k-${`${jobExpectation.value.ceilingSalary}k`}`;
            if (jobExpectation.value.directionTags.length !== 0) {
              directionShow.value = true;
              for (const element of jobExpectation.value.directionTags) {
                directionTag.value += element + "、";
              }
              if (directionTag.value.length > 0) {
                directionTag.value = directionTag.value.substring(
                  0,
                  directionTag.value.length - 1
                );
              }
            }
          });
      }
    }
  );
  // 监听组件 `chengshixuanze` 发出的事件 `liveCity`。
  uni.$on("liveCity", (date) => {
    jobExpectation.value.cityName = date;
  });
  // 监听组件`zhiweileixing`发出的事件`positiontypes`。
  uni.$on("positiontypes", (t) => {
    jobExpectation.value.positionName = t;
    if (jobExpectation.value.positionName !== "") {
      directionShow.value = true;
    } else {
      directionShow.value = false;
    }
  });
  // 组件 `xifenshaixuan` 发出的事件 `saveTags` 的监听器。
  uni.$on("saveTags", (tag) => {
    if (tag.length !== 0) {
      directionTag.value = "";
      jobExpectation.value.directionTags.length = 0;
      for (const element of tag) {
        jobExpectation.value.directionTags.push(element as string);
        directionTag.value += element + "、";
      }
      if (directionTag.value.length > 0) {
        directionTag.value = directionTag.value.substring(
          0,
          directionTag.value.length - 1
        );
      }
    } else {
      for (const element of tag) {
        directionTag.value += element + "、";
      }
      if (directionTag.value.length > 0) {
        directionTag.value = directionTag.value.substring(
          0,
          directionTag.value.length - 1
        );
      }
    }
  });
});

// 保存求职期望
const saveJobExcept = () => {
  if (
    jobExpectation.value.positionName === "" ||
    salary.value === "" ||
    jobExpectation.value.cityName === ""
  ) {
    uni.showToast({
      title: "请填写完整信息",
      icon: "none",
      duration: 1500,
    });
  } else if (directionShow.value) {
    if (directionTag.value === "") {
      uni.showToast({
        title: "请填写完整信息",
        icon: "none",
        duration: 1500,
      });
    } else {
      if (jobId.value) {
        /* 修改求职期望 */
        applicantJobExpectationService
          .updateJobExpectation({
            applicantId: mainStore.applicant!.id,
            id: jobId.value,
            requestBody: jobExpectation.value,
          })
          .then((res) => {
            uni.showToast({
              title: "修改成功",
              icon: "none",
              duration: 1500,
            });
            mainStore.setJobExpectations({
              total: mainStore.jobExpectations?.total || 0,
              items:
                mainStore.jobExpectations?.items.map((item) => {
                  if (item.id === jobId.value) {
                    return jobExpectation.value;
                  } else {
                    return item;
                  }
                }) || [],
            });
          });
      } else {
        /* 新增求职期望 */
        applicantJobExpectationService
          .addJobExpectation({
            applicantId: mainStore.applicant!.id,
            requestBody: {
              positionType: jobExpectation.value.positionType,
              directionTags: jobExpectation.value.directionTags,
              positionName: jobExpectation.value.positionName,
              startingSalary: jobExpectation.value.startingSalary,
              ceilingSalary: jobExpectation.value.ceilingSalary,
              cityName: jobExpectation.value.cityName,
            },
          })
          .then((res) => {
            if (saveBtn.value === saveOver.value) {
              const newExpectations = [
                ...(mainStore.jobExpectations?.items || []),
                res,
              ];
              mainStore.setJobExpectations({
                total: newExpectations.length,
                items: newExpectations,
              });
              uni.switchTab({ url: "/pages/main/shouyeyemian/shouyeyemian" });
            } else {
              const newExpectations = [
                ...(mainStore.jobExpectations?.items || []),
                res,
              ];
              mainStore.setJobExpectations({
                total: newExpectations.length,
                items: newExpectations,
              });
              mainStore.isInit = false;
              uni.navigateBack({
                delta: 1,
              });
            }
          });
      }
    }
  }
};
// 删除求职期望
const deleteExpectation = () => {
  applicantJobExpectationService
    .removeJobExpectation({
      applicantId: mainStore.applicant!.id,
      id: jobId.value,
    })
    .then((id) => {
      uni.showToast({
        title: "删除成功",
        icon: "none",
        duration: 1500,
      });
      const newExpectations =
        mainStore.jobExpectations?.items.filter((item) => item.id !== id) || [];
      mainStore.setJobExpectations({
        total: newExpectations.length,
        items: newExpectations,
      });
      uni.navigateBack({
        delta: 1,
      });
    });
};

const expectJob = () => {
  uni.navigateTo({ url: "/pages/most/zhiweileixing/zhiweileixing" });
};
const directTag = () => {
  uni.navigateTo({ url: "/pages/most/xifenshaixuan/xifenshaixuan" });
};
const expectCity = () => {
  uni.navigateTo({ url: "/pages/most/chengshixuanze/chengshixuanze" });
};
</script>

<style lang="scss" scoped>
.page {
  height: auto;

  .group-all {
    .group-box {
      width: 710rpx;
      height: 120rpx;
      margin-top: 20rpx;
      margin-left: 20rpx;
      font-size: 30rpx;
      border: 1rpx solid rgb(210 210 210);
      border-radius: 10rpx;

      .text-title {
        padding-left: 20rpx;
      }

      .text-right {
        padding-right: 20rpx;
        color: rgb(153 153 153);

        .direction {
          max-width: 300rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
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

  .button-box {
    position: absolute;
    bottom: 30rpx;
    width: 100%;

    .button {
      width: 600rpx;
      height: 80rpx;
      font-size: 30rpx;
      color: #fff;
      background-color: rgb(35 193 158);
    }
  }

  .image {
    width: 30rpx;
    height: 30rpx;
  }
}
</style>
