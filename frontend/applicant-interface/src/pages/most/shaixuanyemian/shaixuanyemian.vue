<template>
  <NavigationBar title="筛选" />
  <view class="flex-col page">
    <scroll-view class="flex-col search" :scroll-y="true">
      <view class="flex-col expected-salary">
        <text class="salary">期望薪资</text>
        <view class="flex-row expects">
          <view
            v-for="(expectedSalary, i) in expectedSalaries"
            :key="i"
            class="justify-center items-center expect"
            :class="filterValue.salary === expectedSalary ? 'active' : ''"
            @click="activeSalaryOf(i)"
            >{{ expectedSalary }}</view
          >
        </view>
      </view>
      <view class="flex-col expected-salary">
        <text class="salary">工作经验</text>
        <view class="flex-row expects">
          <view
            v-for="(workExperience, i) in workExperiences"
            :key="i"
            class="justify-center items-center expect"
            :class="filterValue.workingYears.includes(i) ? 'active' : ''"
            @click="activeExpectOf(i)"
            >{{ workExperience }}</view
          >
        </view>
      </view>
      <view class="flex-col expected-salary">
        <text class="salary">学历</text>
        <view class="flex-row expects">
          <view
            v-for="(education, i) in degreeRequires"
            :key="i"
            class="justify-center items-center expect"
            :class="filterValue.educations.includes(i) ? 'active' : ''"
            @click="activeRequireOf(i)"
            >{{ education }}</view
          >
        </view>
      </view>
      <view class="flex-col expected-salary">
        <text class="salary">工作性质</text>
        <view class="flex-row expects">
          <view
            v-for="(jobNature, i) in jobNatures"
            :key="i"
            class="justify-center items-center expect"
            :class="filterValue.workTypes.includes(i) ? 'active' : ''"
            @click="activeNatureOf(i)"
            >{{ jobNature }}</view
          >
        </view>
      </view>
      <view class="flex-col expected-salary">
        <text class="salary">公司规模</text>
        <view class="flex-row expects">
          <view
            v-for="(companySize, i) in companySizes"
            :key="i"
            class="justify-center items-center expect"
            :class="filterValue.scales.includes(i) ? 'active' : ''"
            @click="activeSizeOf(i)"
            >{{ companySize }}</view
          >
        </view>
      </view>
      <view class="flex-col expected-salary">
        <text class="salary">融资阶段</text>
        <view class="flex-row expects">
          <view
            v-for="(financeStage, i) in financeStages"
            :key="i"
            class="justify-center items-center expect"
            :class="filterValue.financingStages.includes(i) ? 'active' : ''"
            @click="activeStageOf(i)"
            >{{ financeStage }}</view
          >
        </view>
      </view>
      <view class="flex-col expected-salary">
        <text class="salary">行业领域</text>
        <view class="flex-row expects">
          <view
            v-for="(industrySector, i) in industrySectors"
            :key="i"
            class="justify-center items-center expect"
            :class="
              filterValue.comprehensions.includes(industrySector)
                ? 'active'
                : ''
            "
            @click="activeSectorOf(i)"
          >
            <text>{{ industrySector }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="flex-row button">
      <button class="justify-center items-center reset" @click="replacement()">
        重置
      </button>
      <button class="justify-center items-center identify" @click="saveScreen">
        确认
      </button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import type { FilterCriteria } from "@dongjiang-recruitment/service-common";

const expectedSalaries = ref<FilterCriteria["expectedSalary"]>([]); // 期望薪资
const workExperiences = ref<FilterCriteria["workExperience"]>([]); // 工作经验
const degreeRequires = ref<FilterCriteria["education"]>([]); // 学历
const jobNatures = ref<FilterCriteria["natureWork"]>([]); // 工作性质
const companySizes = ref<FilterCriteria["companySize"]>([]); // 公司规模
const financeStages = ref<FilterCriteria["financingStage"]>([]); // 融资阶段
const industrySectors = ref<FilterCriteria["industryField"]>([]); // 行业领域

const filterValue = ref({
  salary: "", // 期望薪资
  workingYears: <number[]>[], // 工作经验
  educations: <number[]>[], // 学历
  workTypes: <number[]>[], // 工作性质
  scales: <number[]>[], // 公司规模
  financingStages: <number[]>[], // 融资阶段
  comprehensions: <string[]>[], // 行业领域
}); // 筛选值

onMounted(() => {
  commonService.getFilterCriteria().then((res) => {
    expectedSalaries.value.splice(
      0,
      expectedSalaries.value.length,
      ...res.expectedSalary
    );
    workExperiences.value.splice(
      0,
      workExperiences.value.length,
      ...res.workExperience
    );
    degreeRequires.value.splice(
      0,
      degreeRequires.value.length,
      ...res.education
    );
    jobNatures.value.splice(0, jobNatures.value.length, ...res.natureWork);
    companySizes.value.splice(0, companySizes.value.length, ...res.companySize);
    financeStages.value.splice(
      0,
      financeStages.value.length,
      ...res.financingStage
    );
    industrySectors.value.splice(
      0,
      industrySectors.value.length,
      ...res.industryField
    );
  });
});

// 期望薪资
const activeSalaryOf = (index: number) => {
  if (filterValue.value.salary === expectedSalaries.value[index]) {
    filterValue.value.salary = "";
  } else {
    filterValue.value.salary = expectedSalaries.value[index];
  }
};

// 工作经验
const activeExpectOf = (index: number) => {
  if (filterValue.value.workingYears.includes(index)) {
    filterValue.value.workingYears.splice(
      filterValue.value.workingYears.indexOf(index),
      1
    );
  } else {
    filterValue.value.workingYears.push(index);
  }
};

// 学历要求
const activeRequireOf = (index: number) => {
  if (filterValue.value.educations.includes(index)) {
    filterValue.value.educations.splice(
      filterValue.value.educations.indexOf(index),
      1
    );
  } else {
    filterValue.value.educations.push(index);
  }
};
// 工作性质
const activeNatureOf = (index: number) => {
  if (filterValue.value.workTypes.includes(index)) {
    filterValue.value.workTypes.splice(
      filterValue.value.workTypes.indexOf(index),
      1
    );
  } else {
    filterValue.value.workTypes.push(index);
  }
};

// 公司规模
const activeSizeOf = (index: number) => {
  if (filterValue.value.scales.includes(index)) {
    filterValue.value.scales.splice(filterValue.value.scales.indexOf(index), 1);
  } else {
    filterValue.value.scales.push(index);
  }
  // filterValue.value.scales = activeSize.value;
};

// 融资阶段
const activeStageOf = (index: number) => {
  if (filterValue.value.financingStages.includes(index)) {
    filterValue.value.financingStages.splice(
      filterValue.value.financingStages.indexOf(index),
      1
    );
  } else {
    filterValue.value.financingStages.push(index);
  }
  // filterValue.value.financingStages = activeStage.value;
};

// 行业领域
const activeSectorOf = (index: number) => {
  if (filterValue.value.comprehensions.includes(industrySectors.value[index])) {
    filterValue.value.comprehensions.splice(
      filterValue.value.comprehensions.indexOf(industrySectors.value[index]),
      1
    );
  } else {
    filterValue.value.comprehensions.push(industrySectors.value[index]);
  }
};

onLoad((e) => {
  if (e!.filter) {
    let p = JSON.parse(e!.filter);
    // 检查过滤器值是否为空。如果不为空，则会将值映射到
    // filterValue.value.workingYears、filterValue.value.educations、filterValue.value.workTypes、filterValue.value.scales、filterValue.value.financingStages。
    if (Object.keys(p).length) {
      filterValue.value.salary = p.salary;
      filterValue.value.workingYears = p.workingYears.map(
        (item: number) => item - 1
      );
      filterValue.value.educations = p.educations.map(
        (item: number) => item - 1
      );
      filterValue.value.workTypes = p.workTypes.map((item: number) => item - 1);
      filterValue.value.scales = p.scales.map((item: number) => item - 1);
      filterValue.value.financingStages = p.financingStages.map(
        (item: number) => item - 1
      );
    }
  }
});

// 重置
const replacement = () => {
  filterValue.value = {
    salary: "",
    workingYears: [],
    educations: [],
    workTypes: [],
    scales: [],
    financingStages: [],
    comprehensions: [],
  };
};

// 当用户点击“确认”按钮时调用的函数。用于保存过滤值并返回上一页。
const saveScreen = () => {
  filterValue.value.workingYears = filterValue.value.workingYears.map(
    (item) => item + 1
  );
  filterValue.value.educations = filterValue.value.educations.map(
    (item) => item + 1
  );
  filterValue.value.workTypes = filterValue.value.workTypes.map(
    (item) => item + 1
  );
  filterValue.value.scales = filterValue.value.scales.map((item) => item + 1);
  filterValue.value.financingStages = filterValue.value.financingStages.map(
    (item) => item + 1
  );
  const pages = getCurrentPages();
  if (pages.length > 1) {
    const beforePage = pages[pages.length - 2];
    if (beforePage.route === "pages/main/shouyeyemian/shouyeyemian") {
      uni.$emit("filterValue", filterValue.value); //首页筛选值
    } else {
      uni.$emit("filter", filterValue.value); //搜索页筛选值
    }
    uni.navigateBack({ delta: 1 });
  }
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;

  .active {
    color: $app-color;
    background-color: rgb(216 245 231) !important;
    border: solid 0.5rpx rgb(84 188 163);
  }

  .search {
    width: 94%;

    // #ifndef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ
    height: 830rpx;

    // #endif
    height: 1400rpx;
    margin-left: 3%;
    overflow: hidden;

    .expected-salary {
      margin-top: 20rpx;

      .salary {
        margin-left: 25rpx;
        font-size: 35rpx;
      }

      .expects {
        flex-wrap: wrap;

        .expect {
          width: 210rpx;
          height: 70rpx;
          margin: 10rpx;
          font-size: 30rpx;
          background-color: rgb(229 229 229);
          border-radius: 5rpx;
        }
      }
    }
  }

  .button {
    position: fixed;
    bottom: 10rpx;
    width: 100%;
    height: 80rpx;
    background-color: rgb(255 255 255);

    .reset {
      width: 30%;
      margin-left: 20rpx;
      font-size: 30rpx;
      background-color: rgb(229 229 229);
      border-radius: 5rpx;
    }

    .identify {
      width: 60%;
      margin-right: 20rpx;
      margin-left: 20rpx;
      font-size: 30rpx;
      background-color: rgb(84 188 163);
      border-radius: 5rpx;
    }
  }
}
</style>
