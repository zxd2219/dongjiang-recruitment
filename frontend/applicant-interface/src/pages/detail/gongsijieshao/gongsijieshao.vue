<template>
  <NavigationBar title="公司介绍" />
  <view class="flex-col page">
    <view class="flex-col company-description">
      <view class="flex-row items-center">
        <image class="logo" :src="VITE_CDN_URL + companyInfo.logoUrl" />
        <view class="flex-col name-require">
          <text style="font-size: 35rpx; font-weight: bold">{{
            companyInfo.companyName
          }}</text>
          <text class="items-center require"
            >{{ companyInfo.cityName }} |
            {{ financingStages[companyInfo.financingStage] }} |
            {{ scales[companyInfo.scale] }} |
            {{ companyInfo.comprehensionName }}</text
          >
          <view class="require">
            <text>福利:</text>
            <text
              v-for="(benefit, i) in companyInfo.benefits"
              :key="i"
              style="margin-left: 10rpx"
              >{{ benefit }}</text
            >
          </view>
        </view>
      </view>
      <view class="flex-col basic-profile">
        <view class="items-center profile">基本简介</view>
        <view v-if="companyInfo.about === ''" class="flex-col abstract">
          <text class="us">关于我们</text>
          <view class="abstract-info">
            <text>{{ companyInfo.about }}</text>
          </view>
        </view>
        <view class="flex-col business-information">
          <text class="bus-info">工商信息</text>
          <view class="information">
            <view class="flex-row">
              <text>公司全称</text>
              <text class="infos">{{ companyInfo.fullName }}</text>
            </view>
            <view class="flex-row">
              <text>法人代表</text>
              <text class="infos">{{ companyInfo.legalRepresentative }}</text>
            </view>
            <view class="flex-row">
              <text>注册资本</text>
              <text class="infos">{{ companyInfo.registeredCapital }}</text>
            </view>
            <view class="flex-row">
              <text>机构类型</text>
              <text class="infos">{{ companyInfo.organizationType }}</text>
            </view>
            <view class="flex-row">
              <text>成立时间</text>
              <text class="infos">{{ companyInfo.establishmentTime }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="flex-row justify-between items-center group-btn">
      <view class="flex-col justify-center items-center" style="width: 30%">
        <image
          v-if="!focus"
          class="image-focus"
          src="@/static/icons/collection.svg"
          @click="focusOn"
        />
        <image
          v-if="focus"
          class="image-focus"
          src="@/static/icons/collection-fill.svg"
          @click="focusOn"
        />
        <text>关注</text>
      </view>
      <view class="justify-center items-center" style="width: 70%">
        <button
          class="justify-center items-center btn-send-resume"
          @click="jobOpening"
        >
          在招职位
        </button>
      </view>
    </view>
    <map
      v-if="companyInfo.location"
      style="width: 100%; height: 300px; margin-top: 20rpx"
      :latitude="companyInfo.location.latitude"
      :longitude="companyInfo.location.longitude"
      :markers="markers as any"
    >
    </map>
  </view>
  <wybPopup
    ref="popup"
    :show-close-icon="false"
    :height="1200"
    :radius="10"
    mode="size-auto"
    type="bottom"
  >
    <JobDetail
      v-for="(position, i) in positionInfo"
      :key="i"
      :position="position"
      @job-click="jobClick(position.id, position.company.id)"
    />
    <view v-if="emptyShow" class="justify-center image">
      <image src="@/static/icons/nodata.svg" />
    </view>
  </wybPopup>
</template>

<script lang="ts" setup>
import JobDetail from "@/components/JobDetail/JobDetail.vue";
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import wybPopup from "@/components/wyb-popup/wyb-popup.vue";
import { until } from "@/hooks";
import { useMainStore } from "@/stores";
import type {
  Applicant,
  Company,
  Position,
} from "@dongjiang-recruitment/service-common";

const VITE_CDN_URL = import.meta.env.VITE_CDN_URL;
const mainStore = useMainStore();

const companyInfo = ref<Company>({} as Company);
const positionInfo = ref<Position[]>([]);
const companyId = ref();
const emptyShow = ref(false);
const markers = ref([
  {
    id: 1,
    latitude: 0,
    longitude: 0,
    iconPath: "../../static/icons/location.svg",
    width: 30,
    height: 30,
  },
]);
/* 融资阶段 */
const financingStages = [
  "",
  "未融资",
  "天使轮",
  "A轮",
  "B轮",
  "C轮",
  "D轮及以上",
  "上市公司",
  "不需要融资",
];
/* 规模 */
const scales = [
  "",
  "少于15人",
  "15-50人",
  "50-150人",
  "150-500人",
  "500-2000人",
  "2000人以上",
];
const focus = ref(false);
const focusId = ref();
/* 判断是否关注 */
onMounted(() => {
  until(
    computed(() => !!mainStore.applicant?.id),
    () => {
      applicantAttentionRecordService
        .queryAttentionRecord({
          applicantId: mainStore.applicant!.id,
          query: {
            "company.id": ["$eq", companyId.value],
          },
        })
        .then((res) => {
          if (res.total > 0) {
            focus.value = true;
            focusId.value = res.items[0].id;
          }
        });
    }
  );
});

// 一个生命周期钩子。它在页面加载时调用。
onLoad((options) => {
  if (options!.companyId) {
    companyId.value = options!.companyId;
    companyService
      .getCompany({
        id: companyId.value,
      })
      .then((res) => {
        companyInfo.value = res;
        markers.value[0].latitude = res.location.latitude;
        markers.value[0].longitude = res.location.longitude;
      });
  } else {
    uni.showToast({
      title: "参数错误",
      icon: "none",
      duration: 1500,
    });
  }
});
/* 关注公司 */
const focusOn = () => {
  focus.value = !focus.value;
  // 这是用于关注于公司的功能
  if (focus.value) {
    // 增加关注记录接口
    applicantAttentionRecordService
      .addAttentionRecord({
        applicantId: mainStore.applicant!.id,
        requestBody: {
          company: {
            id: companyId.value,
          } as Company,
          applicant: {
            id: mainStore.applicant!.id,
          } as Applicant,
        },
      })
      .then((res) => {
        uni.showToast({
          title: "关注成功",
          icon: "none",
          duration: 1500,
        });
        focusId.value = res.id;
      });
  } else {
    applicantAttentionRecordService
      .removeAttentionRecord({
        applicantId: mainStore.applicant!.id,
        id: focusId.value,
      })
      .then((res) => {
        uni.showToast({
          title: "取消关注",
          icon: "none",
          duration: 1500,
        });
        focusId.value = null;
      });
  }
};
/* 查看在招职位 */
const popup = ref();
const jobOpening = () => {
  companyPositionService
    .queryPosition({
      companyId: companyId.value,
    })
    .then((res) => {
      positionInfo.value = res.items;
      if (positionInfo.value.length === 0) {
        emptyShow.value = true;
      }
    });
  popup.value.show();
};

const jobClick = (p: string, c: string) => {
  uni.navigateTo({
    url:
      "/pages/detail/zhiweixiangqing/zhiweixiangqing?companyId=" +
      c +
      "&positionId=" +
      p,
  });
  popup.value.hide();
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: auto;
  overflow-y: auto;

  .company-description {
    width: 710rpx;
    margin-left: 2%;
    border-bottom: 2rpx solid rgb(230 230 230);

    .logo {
      width: 120rpx;
      height: 120rpx;
      border-radius: 10rpx;
    }

    .name-require {
      width: 570rpx;
      padding-left: 20rpx;
      line-height: 50rpx;

      .require {
        font-size: 25rpx;
      }
    }
  }

  .address {
    width: 710rpx;
    height: 80rpx;
    border-bottom: 2rpx solid rgb(230 230 230);
  }

  .basic-profile {
    margin-top: 30rpx;

    .profile {
      height: 80rpx;
      padding-left: 20rpx;
      border-bottom: 2rpx solid rgb(230 230 230);
    }

    .abstract {
      width: 670rpx;
      padding-left: 20rpx;

      .us {
        padding-top: 35rpx;
        font-weight: 700;
      }

      .abstract-info {
        padding-top: 25rpx;
        font-size: 25rpx;
        line-height: 50rpx;
      }
    }
  }

  .business-information {
    width: 670rpx;
    padding-left: 20rpx;
    margin-top: 35rpx;
    line-height: 60rpx;

    .bus-info {
      font-weight: 700;
    }

    .information {
      font-size: 25rpx;

      .infos {
        padding-left: 25rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .group-btn {
    position: fixed;
    bottom: 0;
    z-index: 999;
    width: 100%;
    height: 100rpx;
    background-color: #fff;

    .image-focus {
      width: 60rpx;
      height: 60rpx;
    }

    .btn-send-resume {
      width: 90%;
      height: 70rpx;
      margin: 0rpx;
      font-size: 30rpx;
      color: #fff;
      background-color: rgb(35 193 158);
      border-radius: 10rpx;
    }
  }

  .image {
    width: 45rpx;
    height: 45rpx;
  }
}
</style>
