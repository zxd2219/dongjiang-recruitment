<template>
  <NavigationBar />
  <view class="flex-col page">
    <view class="flex-col group-all">
      <text class="self-info">请完善个人信息（1/3）</text>
      <view class="group-self">
        <text class="text">姓名</text>
        <view class="flex-row">
          <view class="flex-row items-center" style="margin-left: 20rpx">
            <text>姓</text>
            <input
              v-model="userInfo.firstName"
              class="input"
              type="text"
              placeholder="请输入"
            />
          </view>
          <view class="flex-row items-center">
            <text>名</text>
            <input
              v-model="userInfo.lastName"
              class="input"
              type="text"
              placeholder="请输入"
            />
          </view>
        </view>
      </view>
      <view class="group-self">
        <text class="text">出生日期</text>
        <view class="flex-row justify-between items-center" @click="showDate">
          <text class="input">{{ userInfo.dateOfBirth }}</text>
          <image class="image" src="@/static/icons/arrow-right.png" />
        </view>
      </view>
      <view class="group-self justify-center items-center justify-between">
        <text class="text">性别</text>
        <view class="flex-row items-center" style="height: auto">
          <text
            class="sex"
            :class="changeSex ? 'active' : ''"
            @click="changeSex = true"
            >男</text
          >
          <text
            class="sex"
            :class="!changeSex ? 'active' : ''"
            @click="changeSex = false"
            >女</text
          >
        </view>
      </view>
      <view class="group-self">
        <text class="text">城市</text>
        <view class="flex-row justify-between items-center" @click="choseCity">
          <text class="input">{{ city }}</text>
          <image class="image" src="@/static/icons/arrow-right.png" />
        </view>
      </view>
      <view class="group-self">
        <text class="text">邮箱</text>
        <input
          v-model="userInfo.email"
          class="input"
          type="text"
          placeholder="请填写"
        />
      </view>
      <wybPopup
        ref="popup"
        :show-close-icon="true"
        :height="400"
        :radius="10"
        mode="size-auto"
        type="bottom"
      >
        <picker-view :value="value" class="picker-view" @change="bindChange">
          <picker-view-column>
            <view v-for="(item, index) in years" :key="index" class="item"
              >{{ item }}年</view
            >
          </picker-view-column>
          <picker-view-column>
            <view v-for="(item, index) in months" :key="index" class="item"
              >{{ item }}月</view
            >
          </picker-view-column>
          <picker-view-column>
            <view v-for="(item, index) in days" :key="index" class="item"
              >{{ item }}日</view
            >
          </picker-view-column>
        </picker-view>
      </wybPopup>
    </view>
    <view class="justify-center next-click">
      <button class="justify-center items-center next-box" @click="nextClick">
        下一步
      </button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import wybPopup from "@/components/wyb-popup/wyb-popup.vue";
import { useMainStore } from "@/stores";
import type { Applicant } from "@dongjiang-recruitment/service-common";

const mainStore = useMainStore();

const userInfo = ref<Applicant>(mainStore.applicant || ({} as Applicant));

const changeSex = ref(true); // 判断性别
const city = ref("请选择"); // 城市
/* 获取时间 */
const date = new Date();
const years = ref<number[]>([]);
let year = date.getFullYear();
const months = ref<number[]>([]);
let month = date.getMonth() + 1;
const days = ref<number[]>([]);
let day = date.getDate();
/*弹出层 */
const popup = ref();
const showDate = () => {
  popup.value.show();
};
for (let i = 1970; i <= date.getFullYear(); i++) {
  years.value.push(i);
}
for (let i = 1; i <= 12; i++) {
  months.value.push(i);
}
for (let i = 1; i <= 31; i++) {
  days.value.push(i);
}
const value = ref([9999, month - 1, day - 1]);
// 更改选择器视图时调用的函数。
const bindChange = (e: { detail: { value: any } }) => {
  const val = e.detail.value;
  year = years.value[val[0]];
  month = months.value[val[1]];
  day = days.value[val[2]];
  userInfo.value.dateOfBirth = year + "-" + month + "-" + day;
  userInfo.value.age = date.getFullYear() - year;
  value.value = [val[0], val[1], val[2]];
};

const choseCity = () => {
  uni.navigateTo({ url: "/pages/most/chengshixuanze/chengshixuanze" });
};
onLoad(() => {
  uni.$on("liveCity", (e) => {
    city.value = e;
  });
});

/* 判断信息是否填写完整*/
const nextClick = () => {
  /* 判断性别 */
  if (changeSex.value === true) {
    userInfo.value.sex = "男";
  } else {
    userInfo.value.sex = "女";
  }
  if (
    userInfo.value.firstName === "" ||
    userInfo.value.lastName === "" ||
    city.value === "请选择"
  ) {
    uni.showToast({
      title: "请完善个人信息",
      icon: "none",
      duration: 1500,
    });
  } else if (
    !/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
      userInfo.value.email
    )
  ) {
    uni.showToast({
      title: "邮箱格式不正确",
      icon: "none",
      duration: 1500,
    });
  } else {
    userInfo.value.cityName = city.value;
    userInfo.value.workingYears = 1;
    applicantService
      .updateApplicant({
        id: userInfo.value.id,
        requestBody: userInfo.value,
      })
      .then((res) => {
        mainStore.setApplicant(res);
        uni.navigateTo({
          url: "/pages/init/wanshanjiaoyujingli/wanshanjiaoyujingli",
        });
      });
  }
};
</script>

<style lang="scss" scoped>
.page {
  .active {
    background-color: rgb(35 193 158);
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
