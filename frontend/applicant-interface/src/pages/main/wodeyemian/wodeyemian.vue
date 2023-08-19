<template>
  <view class="flex-col page">
    <view class="group-top">
      <view class="flex-row user-infos" @click="toSelfInfo">
        <image class="avatar" :src="VITE_CDN_URL + userInfos.avatarUrl" />
        <view class="flex-col user-info">
          <text class="name">{{ fullName }}</text>
          <text class="age-educate"
            >{{ userInfos.age }}岁/{{
              education[userInfos.education] || "未知"
            }}</text
          >
        </view>
      </view>
      <view class="flex-row justify-between apply-infos">
        <view class="flex-col items-center justify-center" @click="onClick_1">
          <text>投递简历</text>
          <text>{{ deliveryNum }}</text>
        </view>
        <view class="flex-col items-center justify-center" @click="onClick_2">
          <text>收藏职位</text>
          <text>{{ favoriteNum }}</text>
        </view>
        <view class="flex-col items-center justify-center" @click="onClick_3">
          <text>关注公司</text>
          <text>{{ focusNum }}</text>
        </view>
        <view class="flex-col items-center justify-center" @click="onClick_4">
          <text>待面试</text>
          <text>{{ interviewNum }}</text>
        </view>
      </view>
    </view>
    <view class="flex-col group-button">
      <view
        class="flex-row justify-between items-center set"
        @click="onClick_5"
      >
        <view class="items-center">
          <image class="image" src="@/static/icons/feeds.png" />
          <text class="interval">附件简历</text>
        </view>
        <image class="arrow-right" src="@/static/icons/arrow-right.png" />
      </view>
      <view
        class="flex-row justify-between items-center set"
        @click="onClick_6"
      >
        <view class="items-center">
          <image class="image" src="@/static/icons/compass.png" />
          <text class="interval">求职意向</text>
        </view>
        <image class="arrow-right" src="@/static/icons/arrow-right.png" />
      </view>
      <view
        class="flex-row justify-between items-center set"
        @click="onClick_7"
      >
        <view class="items-center">
          <image class="image" src="@/static/icons/suggestion.png" />
          <text class="interval">用户反馈</text>
        </view>
        <image class="arrow-right" src="@/static/icons/arrow-right.png" />
      </view>
      <view
        class="flex-row justify-between items-center set"
        @click="onClick_8"
      >
        <view class="items-center">
          <image class="image" src="@/static/icons/ali-clould.png" />
          <text class="interval">隐私设置</text>
        </view>
        <image class="arrow-right" src="@/static/icons/arrow-right.png" />
      </view>
      <view
        class="flex-row justify-between items-center set"
        @click="onClick_9"
      >
        <view class="items-center">
          <image class="image" src="@/static/icons/set.png" />
          <text class="interval">设置</text>
        </view>
        <image class="arrow-right" src="@/static/icons/arrow-right.png" />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { until } from "@/hooks";
import { useMainStore } from "@/stores";
import type {
  Applicant,
  AttentionRecord,
  DeliveryRecord,
  GarnerRecord,
} from "@dongjiang-recruitment/service-common";

const VITE_CDN_URL = import.meta.env.VITE_CDN_URL;
const mainStore = useMainStore();

const userInfos = ref<Applicant>({} as Applicant);
const education = ref(["未知", "大专", "本科", "硕士", "博士"]);
const fullName = ref();
const deliveryNum = ref(0);
// const deliveryRecords = ref<DeliveryRecord[]>([]);
const favoriteNum = ref(0);
const favoritePosition = ref<GarnerRecord[]>([]);
const focusNum = ref(0);
const focusCompany = ref<AttentionRecord[]>([]);
const interviewNum = ref(0);
const interviewPosition = ref<DeliveryRecord[]>([]);

const status = ref<(1 | 2 | 3 | 4 | 5)[]>([1, 2, 3, 4, 5]);
onShow(() => {
  until(
    computed(() => !!mainStore.applicant?.id),
    () => {
      userInfos.value = mainStore.applicant!;
      fullName.value = userInfos.value.firstName + userInfos.value.lastName;
      /* 投递记录 */
      applicantDeliveryRecordService
        .queryDeliveryRecord({
          applicantId: mainStore.applicant!.id,
          query: {
            status: ["$in", ...status.value],
          },
          size: 10,
        })
        .then((res) => {
          deliveryNum.value = res.total;
        });
      /* 收藏职位 */
      applicantGarnerRecordService
        .queryGarnerRecord({
          applicantId: mainStore.applicant!.id,
        })
        .then((res) => {
          favoriteNum.value = res.total;
          favoritePosition.value = res.items;
        });
      /* 关注公司 */
      applicantAttentionRecordService
        .queryAttentionRecord({
          applicantId: mainStore.applicant!.id,
        })
        .then((res) => {
          focusNum.value = res.total;
          focusCompany.value = res.items;
        });
      /* 待面试 */
      applicantDeliveryRecordService
        .queryDeliveryRecord({
          applicantId: mainStore.applicant!.id,
          query: {
            status: ["$eq", 4],
          },
        })
        .then((res) => {
          interviewNum.value = res.total;
          interviewPosition.value = res.items;
        });
    }
  );
});

/**跳转页面 */

// 编辑简历
const toSelfInfo = () => {
  uni.navigateTo({ url: "/pages/mine/bianjijianli/bianjijianli" });
};
// 投递记录
const onClick_1 = () => {
  applicantDeliveryRecordService
    .queryDeliveryRecord({
      applicantId: mainStore.applicant!.id,
      query: {
        status: ["$eq", 1],
      },
      size: 10,
    })
    .then((res) => {
      const item = encodeURIComponent(JSON.stringify(res.items));
      uni.navigateTo({
        url: "/pages/record/toudijilu/toudijilu?deliveryRecords=" + item,
      });
    });
};
// 收藏职位
const onClick_2 = () => {
  uni.navigateTo({
    url: "/pages/record/shoucangzhiwei/shoucangzhiwei",
  });
};
// 关注公司
const onClick_3 = () => {
  uni.navigateTo({
    url: "/pages/record/guanzhugongsi/guanzhugongsi",
  });
};
// 待面试
const onClick_4 = () => {
  uni.navigateTo({
    url: "/pages/record/daimianshi/daimianshi?",
  });
};
// 上传简历附件
const onClick_5 = () => {
  uni.navigateTo({ url: "/pages/info/shangchuanjianli/shangchuanjianli" });
};
// 求职期望
const onClick_6 = () => {
  uni.navigateTo({ url: "/pages/info/qiuzhiyixiang/qiuzhiyixiang" });
};
// 用户反馈
const onClick_7 = () => {
  uni.navigateTo({ url: "/pages/setting/yonghufankui/yonghufankui" });
};
// 隐私设置
const onClick_8 = () => {
  uni.navigateTo({ url: "/pages/setting/yinsishezhi/yinsishezhi" });
};
// 设置
const onClick_9 = () => {
  uni.navigateTo({ url: "/pages/mine/shezhiyemian/shezhiyemian" });
};
</script>

<style lang="scss" scoped>
.page {
  width: 750rpx;
  height: auto;

  .group-top {
    height: 430rpx;
    background-color: rgb(35 193 158);

    .user-infos {
      width: 650rpx;
      margin-top: 150rpx;
      margin-left: 50rpx;

      .avatar {
        width: 120rpx;
        height: 120rpx;
        border-radius: 100%;
      }

      .user-info {
        padding-left: 30rpx;
        line-height: 50rpx;

        .age-educate {
          font-size: 25rpx;
          white-space: 15rpx;
        }
      }
    }

    .apply-infos {
      width: 650rpx;
      height: 100rpx;
      margin-top: 50rpx;
      margin-left: 50rpx;
      font-size: 25rpx;
    }
  }

  .group-button {
    width: 710rpx;
    margin-top: 30rpx;
    margin-left: 20rpx;

    .set {
      width: 690rpx;
      height: 100rpx;
      padding-left: 10rpx;
      font-size: 30rpx;
      border-bottom: 2rpx solid rgb(200 200 200);

      .interval {
        padding-left: 25rpx;
      }
    }
  }

  .arrow-right {
    width: 25rpx;
    height: 25rpx;
  }

  .image {
    width: 50rpx;
    height: 50rpx;
  }
}
</style>
