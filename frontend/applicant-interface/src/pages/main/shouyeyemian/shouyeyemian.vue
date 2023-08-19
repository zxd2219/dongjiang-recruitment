<template>
  <view class="flex-col page">
    <z-paging
      ref="paging"
      v-model="positions"
      :inside-more="true"
      :default-page-size="5"
      @query="queryList"
    >
      <!--  #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ -->
      <view
        class="section-1"
        :style="'height: ' + navigationBarTop + 'px'"
      ></view>
      <view class="flex-col section-2" style="padding: 0 20rpx 20rpx">
        <view
          class="justify-between items-center"
          :style="
            'height: ' +
            navigationBarHeight +
            'px; width: ' +
            navigationBarWidth +
            'px'
          "
        >
          <scroll-view
            :scroll-x="true"
            :style="'width: ' + expectationWidth + 'px'"
          >
            <text
              v-for="jobExpectation in mainStore.jobExpectations?.items || []"
              :key="jobExpectation.id"
              class="list-item1"
              :class="activeJobExpectation === jobExpectation ? 'active' : ''"
              @click="activeJobExpectation = jobExpectation"
            >
              {{ jobExpectation.positionName }}
            </text>
          </scroll-view>
          <view class="flex-row">
            <image
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16475932254586402738.png"
              class="image"
              @click="image_5OnClick"
            />
            <image
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16475932254587111646.png"
              class="image image-2"
              @click="image_6OnClick"
            />
          </view>
        </view>
        <view class="justify-between group-2">
          <view class="flex-row group-3">
            <text
              v-for="(method, index) in methods"
              :key="index"
              style="margin-right: 20rpx"
              :class="activeMethod === method ? 'is-active' : ''"
              @click="activeMethod = method"
              >{{ method }}</text
            >
          </view>
          <view class="flex-row group-4">
            <view class="flex-row">
              <text @click="text_22OnClick">{{ workCityName || "不限" }}</text>
              <image
                src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16475959311313713900.png"
                class="image-3 image-4"
              />
            </view>
            <view class="flex-row group-6">
              <text @click="text_23OnClick">筛选</text>
              <image
                src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16475959311313713900.png"
                class="image-3 image-5"
              />
            </view>
          </view>
        </view>
        <swiper class="image-6">
          <swiper-item
            v-for="_advertise in advertise?.items || []"
            :key="_advertise.id"
          >
            <image
              class="w-full h-full"
              style="border-radius: 25rpx"
              :src="useResFullPath(_advertise.banner)"
              @click="gotoAdvertise(_advertise)"
            />
          </swiper-item>
        </swiper>
      </view>
      <!--  #endif -->
      <!--  #ifndef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ -->
      <view class="section-1"></view>
      <view class="flex-col section-2" style="padding: 0 10rpx 20rpx">
        <view style="width: 92%; height: auto; margin-left: 4%">
          <view class="justify-between items-center">
            <scroll-view :scroll-x="true" class="list">
              <view class="flex-row">
                <text
                  v-for="jobExpectation in mainStore.jobExpectations?.items ||
                  []"
                  :key="jobExpectation.id"
                  class="list-item1"
                  :class="
                    activeJobExpectation?.id === jobExpectation.id
                      ? 'active'
                      : ''
                  "
                  @click="activeJobExpectation = jobExpectation"
                >
                  {{ jobExpectation.positionName }}
                </text>
              </view>
            </scroll-view>
            <view class="flex-row">
              <image
                src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16475932254586402738.png"
                class="image"
                @click="image_5OnClick"
              />
              <image
                src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16475932254587111646.png"
                class="image image-2"
                @click="image_6OnClick"
              />
            </view>
          </view>
          <view class="justify-between group-2">
            <view class="flex-row group-3">
              <text
                v-for="(method, index) in methods"
                :key="index"
                style="margin-right: 20rpx"
                :class="activeMethod === method ? 'is-active' : ''"
                @click="activeMethod = method"
              >
                {{ method }}
              </text>
            </view>
            <view class="flex-row group-4">
              <view class="flex-row">
                <text @click="text_22OnClick">{{
                  workCityName || "不限"
                }}</text>
                <image
                  src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16475959311313713900.png"
                  class="image-3 image-4"
                />
              </view>
              <view class="flex-row group-6">
                <text @click="text_23OnClick">筛选</text>
                <image
                  src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16475959311313713900.png"
                  class="image-3 image-5"
                />
              </view>
            </view>
          </view>
          <swiper class="image-6">
            <swiper-item
              v-for="_advertise in advertise?.items || []"
              :key="_advertise.id"
            >
              <image
                class="w-full h-full"
                style="border-radius: 25rpx"
                :src="useResFullPath(_advertise.banner)"
                @click="gotoAdvertise(_advertise)"
              />
            </swiper-item>
          </swiper>
        </view>
      </view>
      <!--  #endif -->
      <job-detail
        v-for="position in positions"
        :key="position.id"
        :position="position"
        @job-click="jobDescription(position)"
      />
    </z-paging>
  </view>
</template>

<script lang="ts" setup>
import { useResFullPath } from "@/hooks";
import { useMainStore } from "@/stores";
import {
  Advertise,
  JobExpectation,
  type Position,
  type Query,
} from "@dongjiang-recruitment/service-common";
import dayjs from "dayjs";

const mainStore = useMainStore();

/* #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ */
const navigationBarHeight = mainStore.menu.height;
const navigationBarTop = mainStore.menu.top;
const navigationBarWidth = mainStore.menu.left - uni.upx2px(30);
const expectationWidth = mainStore.menu.left - uni.upx2px(170);
/* #endif */

const workCityName = ref("");
const workAreaName = ref<string[]>([]);
const jobFilter = ref({
  salary: "", // 期望薪资
  workingYears: <number[]>[], // 工作经验
  educations: <number[]>[], // 学历
  workTypes: <number[]>[], // 工作性质
  scales: <number[]>[], // 公司规模
  financingStages: <number[]>[], // 融资阶段
  comprehensions: <string[]>[], // 行业领域
});
const activeJobExpectation = ref<JobExpectation | undefined>(
  mainStore.jobExpectations?.items[0]
);
watch(
  () => mainStore.jobExpectations?.items,
  () => {
    activeJobExpectation.value = mainStore.jobExpectations?.items[0]!;
  },
  {
    immediate: true,
  }
);
watch(
  () => activeJobExpectation.value?.cityName,
  (cityName) => {
    workCityName.value = cityName || "";
  },
  {
    immediate: true,
  }
);
watch(
  () => mainStore.jobExpectations?.items[0],
  (newValue) => {
    if (newValue) {
      activeJobExpectation.value = newValue;
    }
  },
  {
    immediate: true,
  }
);

const { data: advertise } = advertiserService.useQueryAllAdvertise(
  () => ({
    query: {
      position: ["$eq", Advertise.position.Master],
      startTime: ["$lte", dayjs().format("YYYY-MM-DD HH:mm:ss")],
      endTime: ["$gte", dayjs().format("YYYY-MM-DD HH:mm:ss")],
      status: ["$eq", Advertise.status.Active],
    },
    page: 0,
    size: 99999999999,
  }),
  {
    initialData: {
      items: [],
      total: 0,
    },
    pollingInterval: 1000 * 60 * 60,
  }
);

const gotoAdvertise = (advertise: Advertise) => {
  uni.navigateTo({
    url: `/pages/most/webview/webview?url=${advertise.pageUrl}&title=${advertise.name}`,
  });
};

uni.$on("city", (city: string) => (workCityName.value = city));
uni.$on("place", (place: string[]) => (workAreaName.value = place));
uni.$on("filterValue", (filter) => {
  jobFilter.value = filter;
});

const positions = ref<Array<Position>>([]);
const methods = ref<Array<"推荐" | "附近" | "最新">>(["推荐", "附近", "最新"]);
const activeMethod = ref<"推荐" | "附近" | "最新">(methods.value[0]);
const paging = ref<{
  complete: (param: Array<any> | boolean) => void;
  reload: () => void;
}>();
const queryList = async (pageNo: number, pageSize: number) => {
  await new Promise<void>((resolve) =>
    watch(
      activeJobExpectation,
      () => {
        if (activeJobExpectation.value) {
          resolve();
        }
      },
      { immediate: true }
    )
  );
  const salaries = jobFilter.value.salary.endsWith("以下")
    ? ["0", jobFilter.value.salary.replace("以下", "")]
    : jobFilter.value.salary.split("-");
  const basicQuery: Query<Position> = {
    workCityName: workCityName.value ? ["$eq", workCityName.value] : undefined,
    startingSalary: salaries[0]
      ? ["$gte", parseInt(salaries[0]) / 1000]
      : undefined,
    ceilingSalary: salaries[1]
      ? ["$gte", parseInt(salaries[1]) / 1000]
      : undefined,
    workingYears: jobFilter.value.workingYears.length
      ? ["$in", ...jobFilter.value.workingYears]
      : undefined,
    education: jobFilter.value.educations.length
      ? ["$in", ...jobFilter.value.educations]
      : undefined,
    workType: jobFilter.value.workTypes.length
      ? ["$in", ...jobFilter.value.workTypes]
      : undefined,
    workAreaName: workAreaName.value.length
      ? ["$in", ...workAreaName.value]
      : undefined,
    positionType: activeJobExpectation.value?.positionName
      ? ["$eq", activeJobExpectation.value.positionName]
      : undefined,
    "company.comprehensionName": jobFilter.value.comprehensions.length
      ? ["$in", ...jobFilter.value.comprehensions]
      : undefined,
    "company.scale": jobFilter.value.scales.length
      ? ["$in", ...jobFilter.value.scales]
      : undefined,
    "company.financingStage": jobFilter.value.financingStages.length
      ? ["$in", ...jobFilter.value.financingStages]
      : undefined,
  };
  let queries = [];
  if (activeJobExpectation.value?.directionTags.length) {
    queries.push(
      ...(activeJobExpectation.value.directionTags.map(
        (item): Query<Position> => ({
          directionTags: ["$like", `%${item}%`],
          ...(basicQuery as any),
        })
      ) as any)
    );
  }
  queries = queries.length ? queries : [basicQuery];
  queries = queries
    .map((query) => {
      return Object.values(query).every((item) => !item)
        ? undefined
        : Object.fromEntries(
            Object.entries(query).filter(([, value]) => value)
          );
    })
    .filter(Boolean) as any;
  paging.value?.complete(
    (
      await companyService.queryAllPosition({
        query: queries.length ? queries : undefined,
        page: pageNo,
        size: pageSize,
        sort:
          activeMethod.value === "最新"
            ? ["createdAt,desc"]
            : activeMethod.value === "推荐"
            ? ["recommend,desc" as any]
            : undefined,
      })
    ).items
  );
};

watch(
  () => [
    workCityName.value,
    workAreaName.value,
    jobFilter.value,
    activeMethod.value,
    activeJobExpectation.value,
  ],
  () => {
    if (typeof paging.value?.reload === "function") {
      paging.value?.reload();
    }
  }
);

/** 添加求职期望 */
const image_5OnClick = () => {
  uni.navigateTo({ url: "/pages/info/qiuzhiyixiang/qiuzhiyixiang" });
};
/**
 * 搜索跳转
 */
const image_6OnClick = () => {
  uni.navigateTo({
    url: `/pages/most/sousuoyemian/sousuoyemian?city=${workCityName.value}`,
  });
};
/* 位置选择 */
const text_22OnClick = () => {
  uni.navigateTo({
    url:
      `/pages/most/weizhixuanze/weizhixuanze?city=` +
      workCityName.value +
      "&areas=" +
      JSON.stringify(workAreaName.value),
  });
};
const text_23OnClick = () => {
  uni.navigateTo({
    url:
      "/pages/most/shaixuanyemian/shaixuanyemian?filter=" +
      JSON.stringify(jobFilter.value),
  });
};
/* 查看职位详情 */
const jobDescription = ({ company: { id: companyId }, id }: Position) => {
  uni.navigateTo({
    url: `/pages/detail/zhiweixiangqing/zhiweixiangqing?companyId=${companyId}&positionId=${id}`,
  });
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: rgb(255 255 255);

  .section-1 {
    height: 45rpx;
    background-color: rgb(37 85 212);
  }

  .section-2 {
    width: 100%;
    height: auto;
    background-color: rgb(37 85 212);

    .group-2 {
      margin-top: 15rpx;

      .group-3 {
        font-size: 25rpx;
        line-height: 23rpx;
        color: rgb(209 205 205);
        white-space: nowrap;

        .is-active {
          color: rgb(255 255 255);
        }

        .text-4 {
          margin-left: 32rpx;
        }

        .text-5 {
          margin-left: 29rpx;
        }
      }

      .group-4 {
        margin-top: 5rpx;
        font-size: 20rpx;
        line-height: 17rpx;
        color: rgb(255 255 255);
        white-space: nowrap;

        .group-6 {
          margin-left: 27rpx;

          .image-5 {
            margin: 6rpx 0 5rpx 3rpx;
          }
        }

        .image-4 {
          margin: 7rpx 0 4rpx 3rpx;
        }

        .image-3 {
          width: 10rpx;
          height: 7rpx;
        }
      }
    }

    .image-6 {
      width: 100%;
      height: 200rpx;
      margin-top: 26rpx;
      border-radius: 25rpx;
      overflow: hidden;
    }

    .list {
      margin: 3rpx 0 9rpx;
      overflow: hidden;
      white-space: nowrap;

      .active {
        font-size: 35rpx !important;
        color: rgb(255 255 255) !important;
      }

      .list-item1 {
        margin-right: 12rpx !important;
        font-size: 28rpx;
        line-height: 32rpx;
        color: rgb(209 205 205);
        white-space: nowrap;
      }
    }

    .image {
      width: 45rpx;
      height: 44rpx;
    }

    .image-2 {
      margin-left: 30rpx;
    }
  }

  .footer {
    height: 101rpx;
    padding: 9rpx 49rpx 11rpx 56rpx;
    margin-top: 61rpx;
    overflow: hidden;
    border: solid 2rpx rgb(0 0 0);

    .group-15 {
      width: 79rpx;
      height: 76rpx;
      font-size: 20rpx;
      line-height: 19rpx;
      color: rgb(0 0 0);
      white-space: nowrap;

      .text-52 {
        margin-top: 3rpx;
      }
    }

    .group-16 {
      height: 77rpx;
      font-size: 20rpx;
      line-height: 18rpx;
      color: rgb(0 0 0);
      white-space: nowrap;

      .text-53 {
        margin-top: 4rpx;
      }
    }

    .group-17 {
      width: 79rpx;
      height: 72rpx;
      margin-top: 5rpx;
      font-size: 20rpx;
      line-height: 19rpx;
      color: rgb(0 0 0);
      white-space: nowrap;
    }

    .group-18 {
      width: 79rpx;
      height: 74rpx;
      margin-top: 3rpx;
      font-size: 20rpx;
      line-height: 19rpx;
      color: rgb(0 0 0);
      white-space: nowrap;
    }

    .image-12 {
      width: 54rpx;
      height: 54rpx;
    }
  }
}
</style>
