<template>
  <view class="flex-row equal">
    <view class="items-center justify-center equal-div" @click="sort">
      <text>{{ sortValue }}</text>
      <image
        class="image"
        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16478528775248822692.png"
      />
    </view>
    <!-- <view class="items-center justify-center equal-div" @click="filterCompany">
      <text>筛选</text>
      <image
        class="image"
        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16478528775248822692.png"
      />
    </view> -->
  </view>
  <z-paging
    ref="paging"
    use-page-scroll
    v-model="companies"
    :inside-more="true"
    :default-page-size="5"
    @query="queryList"
  >
    <CompanyDetail
      v-for="(attentionCompany, i) in companies"
      :key="i"
      class="list-item1"
      :company-detail="attentionCompany"
      @com-click="toCompanyInfo(attentionCompany.id)"
    />
  </z-paging>
  <wybPopup
    ref="popup"
    :show-close-icon="false"
    :height="300"
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
import CompanyDetail from "@/components/CompanyDetail/CompanyDetail.vue";
import wybPopup from "@/components/wyb-popup/wyb-popup.vue";
import type { Company } from "@dongjiang-recruitment/service-common";

const props = defineProps({
  workCityName: {
    type: String,
    default: "",
  },
  searchContent: {
    type: String,
    default: "",
  },
});

const companies = ref<Company[]>([]);
const sortValueMap = ["综合排序", "距离优先", "公司规模", "融资阶段"];
const sortValue = ref(sortValueMap[0]);
const paging = ref<{
  complete: (param: Array<any> | boolean) => void;
  reload: () => void;
}>();
const queryList = async (pageNo: number, pageSize: number) => {
  paging.value?.complete(
    (
      await companyService.queryCompany({
        query: [
          {
            fullName: ["$like", `%${props.searchContent}%`],
            cityName: props.workCityName
              ? ["$eq", props.workCityName]
              : undefined,
          },
          {
            companyName: ["$like", `%${props.searchContent}%`],
            cityName: props.workCityName
              ? ["$eq", props.workCityName]
              : undefined,
          },
        ],
        page: pageNo,
        size: pageSize,
        sort: [
          sortValue.value === "距离优先"
            ? "address,desc"
            : sortValue.value === "公司规模"
            ? "scale,desc"
            : sortValue.value === "融资阶段"
            ? "financingStage,desc"
            : "id,desc",
        ],
      })
    ).items
  );
};

watch(
  () => props.searchContent,
  () => {
    paging.value?.reload();
  }
);

// 监听事件`filter`然后从事件中获取数据，然后使用数据获取公司信息。
// uni.$on("filter", (data) => {
//   companyService
//     .queryCompany({
//       query: {
//         companyName: ["$eq", props.searchContent],
//         scale: ["$in", ...(data.size || [])],
//         financingStage: ["$in", ...(data.stage || [])],
//       },
//     })
//     .then((res) => {
//       companyInfos.value = res.items;
//     });
// });

// onMounted(() => {
//   uni.$off("filter");
// });

// const filterCompany = () => {
//   uni.navigateTo({ url: "/pages/most/shaixuanyemian/shaixuanyemian" });
// };
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
  popup.value.hide();
};

// 公司详情页面跳转
const toCompanyInfo = (c: string) => {
  uni.navigateTo({
    url: "/pages/detail/gongsijieshao/gongsijieshao?companyId=" + c,
  });
};
</script>

<style lang="scss" scoped>
.active {
  color: rgb(35 193 158);
}

.equal {
  width: 94%;
  height: 60rpx;
  margin-left: 3%;

  .equal-div {
    width: 130rpx;
    height: 60rpx;
    font-size: 28rpx;
    white-space: nowrap;
    cursor: pointer;

    .image {
      width: 10rpx;
      height: 7rpx;
      margin: 10rpx 0 7rpx 7rpx;
    }
  }
}

.company-detail {
  width: 100%;
  height: auto;
  margin-top: 20rpx;
  background-color: rgb(240 240 240);
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
