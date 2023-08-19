<template>
  <view class="flex-col bar">
    <view class="flex-row equal">
      <view class="items-center justify-center equal-div" @click="sort">
        <text>{{ sortValue }}</text>
        <image
          class="image"
          src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16478528775248822692.png"
        />
      </view>
      <view class="items-center justify-center equal-div" @click="filter">
        <text>筛选</text>
        <image
          src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16478528775248822692.png"
          class="image"
        />
      </view>
    </view>
    <z-paging
      ref="paging"
      use-page-scroll
      v-model="positions"
      :inside-more="true"
      :default-page-size="5"
      @query="queryList"
    >
      <JobDetail
        v-for="(JobDetailer, i) in positions"
        :key="i"
        class="list-item1"
        :position="JobDetailer"
        @job-click="toPositions(JobDetailer.id, JobDetailer.company.id)"
      />
    </z-paging>
  </view>
  <wybPopup
    ref="popup"
    :show-close-icon="false"
    :height="400"
    :radius="10"
    mode="size-auto"
    type="bottom"
  >
    <view class="sort-box">
      <view
        v-for="(item, i) in sortValueMap"
        :key="i"
        class="sort-value"
        :class="sortNum === i ? 'active' : ''"
        @click="sortChoose(i)"
      >
        {{ item }}
      </view>
    </view>
  </wybPopup>
</template>

<script lang="ts" setup>
import JobDetail from "@/components/JobDetail/JobDetail.vue";
import wybPopup from "@/components/wyb-popup/wyb-popup.vue";
import type { Position, Query } from "@dongjiang-recruitment/service-common";

const props = defineProps({
  workCityName: {
    type: String,
    default: "",
  },
  positionType: {
    type: String,
    default: "",
  },
  searchContent: {
    type: String,
    default: "",
  },
});

const positions = ref<Position[]>([]);
const sortValueMap = [
  "综合排序",
  "距离优先",
  "薪资待遇",
  "学历要求",
  "工作经验",
];
const sortValue = ref(sortValueMap[0]);
const jobFilter = ref({
  salary: "", // 期望薪资
  workingYears: <number[]>[], // 工作经验
  educations: <number[]>[], // 学历
  workTypes: <number[]>[], // 工作性质
  scales: <number[]>[], // 公司规模
  financingStages: <number[]>[], // 融资阶段
  comprehensions: <string[]>[], // 行业领域
});
const paging = ref<{
  complete: (param: Array<any> | boolean) => void;
  reload: () => void;
}>();
const queryList = async (pageNo: number, pageSize: number) => {
  const salaries = jobFilter.value.salary.endsWith("以下")
    ? ["0", jobFilter.value.salary.replace("以下", "")]
    : jobFilter.value.salary.split("-");
  const basicQuery: Query<Position> = {
    workCityName: props.workCityName ? ["$eq", props.workCityName] : undefined,
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
    positionType: props.positionType ? ["$eq", props.positionType] : undefined,
    "company.comprehensionName": jobFilter.value.comprehensions.length
      ? ["$in", ...jobFilter.value.comprehensions]
      : undefined,
    "company.scale": jobFilter.value.scales.length
      ? ["$in", ...jobFilter.value.scales]
      : undefined,
    "company.financingStage": jobFilter.value.financingStages.length
      ? ["$in", ...jobFilter.value.financingStages]
      : undefined,
    positionName: props.searchContent
      ? ["$like", `%${props.searchContent}%`]
      : undefined,
  };
  let queries = [basicQuery];
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
        sort: [
          sortValue.value === "距离优先"
            ? "workProvinceName,desc"
            : sortValue.value === "薪资待遇"
            ? "startingSalary,desc"
            : sortValue.value === "学历要求"
            ? "education,desc"
            : sortValue.value === "工作经验"
            ? "workingYears,desc"
            : "id,desc",
        ],
      })
    ).items
  );
};

watch(
  () => [
    jobFilter.value,
    props.workCityName,
    props.positionType,
    props.searchContent,
  ],
  () => {
    paging.value?.reload();
  }
);

// 在“shaixuanyemian”页面中发出的事件“filter”的监听器。
onMounted(() => {
  uni.$on("filter", (data: any) => {
    jobFilter.value = data;
  });
});

// 安装组件后调用的生命周期挂钩。
onUnmounted(() => {
  uni.$off("filter");
});

// 弹出层
const popup = ref();
const sort = () => {
  popup.value.show();
};
const sortNum = ref(0);

// 选择排序
const sortChoose = (index: number) => {
  sortNum.value = index;
  sortValue.value = sortValueMap[index];
  if (index === 1) {
    // 距离优先
    companyService
      .queryAllPosition({
        query: {
          positionType: ["$like", props.searchContent],
        },
        sort: ["workCityName,asc"],
      })
      .then((res) => {
        positions.value = res.items;
      });
  } else if (index === 2) {
    // 薪资待遇
    companyService
      .queryAllPosition({
        query: {
          positionType: ["$like", props.searchContent],
        },
        sort: ["startingSalary,asc"],
      })
      .then((res) => {
        positions.value = res.items;
      });
  } else if (index === 3) {
    // 学历要求
    companyService
      .queryAllPosition({
        query: {
          positionType: ["$like", props.searchContent],
        },
        sort: ["education,asc"],
      })
      .then((res) => {
        positions.value = res.items;
      });
  } else if (index === 4) {
    // 工作经验
    companyService
      .queryAllPosition({
        query: {
          positionType: ["$like", props.searchContent],
        },
        sort: ["workingYears,asc"],
      })
      .then((res) => {
        positions.value = res.items;
      });
  } else {
    // 综合排序
    companyService
      .queryAllPosition({
        query: {
          positionType: ["$like", props.searchContent],
        },
        sort: ["positionName,asc"],
      })
      .then((res) => {
        positions.value = res.items;
      });
  }
  popup.value.hide();
};

// 查看职位详情
const toPositions = (p: string, c: string) => {
  uni.navigateTo({
    url:
      "/pages/detail/zhiweixiangqing/zhiweixiangqing?companyId=" +
      c +
      "&positionId=" +
      p,
  });
};

// 筛选跳转
const filter = () => {
  uni.navigateTo({
    url:
      "/pages/most/shaixuanyemian/shaixuanyemian?filter=" +
      JSON.stringify(jobFilter.value),
  });
};
</script>

<style lang="scss" scoped>
.active {
  color: rgb(35 193 158);
}

.bar {
  .equal {
    width: 94%;
    height: 60rpx;
    margin-left: 3%;

    .equal-div {
      width: 130rpx;
      height: 60rpx;
      font-size: 28rpx;
      white-space: nowrap;

      .image {
        width: 10rpx;
        height: 7rpx;
        margin: 10rpx 0 7rpx 7rpx;
      }
    }
  }

  .job-scroll {
    width: 100%;
    height: auto;
    overflow-y: auto;
    background-color: rgb(240 240 240);
  }
}

.sort-box {
  width: 90%;
  height: auto;
  margin-top: 20rpx;
  margin-left: 5%;
  font-size: 35rpx;

  .sort-value {
    width: 100%;
    height: 60rpx;
    border-bottom: 3rpx solid rgb(240 240 240);
  }
}
</style>
