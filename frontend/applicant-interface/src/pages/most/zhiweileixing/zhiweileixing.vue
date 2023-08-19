<template>
  <NavigationBar />
  <view class="flex-col page">
    <view class="flex-col">
      <view class="group-1">
        <text class="chose">选择你的职位类型</text>
        <view id="marTop" class="flex-row items-center group-input">
          <image class="image" src="@/static/icons/search.png" />
          <input
            v-model="inputValue"
            class="input"
            type="text"
            placeholder="请输入职位名"
          />
        </view>
      </view>
      <scroll-view class="group-2" :scroll-y="true">
        <view v-if="inputValue != ''">
          <view
            v-for="(position, i) in filteredPositionNames"
            :key="i"
            :class="activePositionIndex === i ? 'active' : ''"
            @click="positionType(i)"
            >{{ position }}</view
          >
        </view>
        <view v-else class="group-search">
          <view
            v-for="(field, i) in fields"
            :key="i"
            class="items-center justify-between group-type"
            @click="showDirections(i)"
          >
            <text>{{ field.fieldName }}</text>
            <image class="image" src="@/static/icons/arrow-right.png" />
          </view>
        </view>
      </scroll-view>
      <wybPopup
        v-if="inputValue === ''"
        ref="popup"
        :show-close-icon="false"
        :margin-top="marTop"
        :width="600"
        :radius="10"
        mode="size-fixed"
        type="right"
      >
        <view class="flex-row">
          <scroll-view class="group-3" :scroll-y="true">
            <view class="flex-col directions">
              <view
                v-for="(direction, i) in directions"
                :key="i"
                :class="activeDirectionIndex === i ? 'active' : ''"
                class="direction"
                @click="activeDirectionIndex = i"
                >{{ direction.directionName }}</view
              >
            </view>
          </scroll-view>
          <scroll-view class="group-4" :scroll-y="true">
            <view class="flex-col positions">
              <view
                v-for="(position, i) in positions"
                :key="i"
                :class="activePositionIndex === i ? 'active' : ''"
                class="position"
                @click="positiontypes(i)"
                >{{ position }}</view
              >
            </view>
          </scroll-view>
        </view>
      </wybPopup>
    </view>
  </view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import wybPopup from "@/components/wyb-popup/wyb-popup.vue";
import type { PositionTypes } from "@dongjiang-recruitment/service-common";

const popup = ref();

const activeFieldIndex = ref(0);
const activeDirectionIndex = ref(0);
const activePositionIndex = ref(0);

const fields = reactive<PositionTypes>([]);
const directions = computed(() => fields[activeFieldIndex.value].directions);
const positions = computed(
  () => directions.value[activeDirectionIndex.value].positions
);

commonService.getPositionTypes().then((res) => {
  fields.push(...res);
});

// 显示弹出层
const showDirections = (index: number) => {
  activeFieldIndex.value = index;
  nextTick(() => {
    popup.value.show();
  });
};

const inputValue = ref("");

// 一个计算属性，返回所有位置名称的数组。
const positionNames = computed(() => {
  const result = [];
  for (const searchType of fields) {
    for (const direction of searchType.directions) {
      for (const position of direction.positions) {
        result.push(position);
      }
    }
  }
  return result;
});

// 计算属性。
const filteredPositionNames = computed(() => {
  const result = [];
  for (const positionName of positionNames.value) {
    if (positionName.includes(inputValue.value)) {
      result.push(positionName);
    }
  }
  return result;
});

const value = ref();
const cityName = ref();
onLoad((e) => {
  value.value = e!.value;
  cityName.value = e!.city;
});

// 当用户单击搜索栏中的职位名称时调用的函数。它将 activePositionIndex 设置为被点击的位置名称的索引，发出一个名为 positiontypes
// 的事件，并将位置名称作为有效负载，然后导航回上一页。
const positionType = (index: number) => {
  activePositionIndex.value = index;
  uni.$emit("positiontypes", filteredPositionNames.value[index]);
  uni.navigateBack({
    delta: 1,
  });
};

// 当用户点击搜索栏中的职位名称时调用的函数。它将 activePositionIndex 设置为单击位置名称的索引，发出一个名为 positiontypes
// 的事件，并将位置名称作为有效负载，然后导航回一页。
const positiontypes = (index: number) => {
  activePositionIndex.value = index;
  uni.$emit("positiontypes", positions.value[index]);
  // 根据职位名搜索相关职位（搜索页面）
  if (value.value) {
    uni.navigateTo({
      url:
        "/pages/detail/xiangguanzhiwei/xiangguanzhiwei?type=" +
        positions.value[index] +
        "&data=" +
        1 +
        "&city=" +
        cityName.value,
    });
  } else {
    uni.navigateBack({
      delta: 1,
    });
  }
};

const marTop = ref(0);

onMounted(() => {
  const query = uni.createSelectorQuery();
  query
    .select("#marTop")
    .boundingClientRect((data) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      marTop.value =
        (data as UniApp.NodeInfo).top! + (data as UniApp.NodeInfo).height!;
    })
    .exec();
});
</script>

<style lang="scss" scoped>
.page {
  width: 710rpx;
  height: 80%;
  margin-left: 20rpx;

  .active {
    color: $app-color;
  }

  .group-1 {
    margin-left: 20rpx;

    .chose {
      font-size: 38rpx;
      font-weight: bold;
    }

    .group-input {
      width: 670rpx;
      height: 80rpx;
      margin-top: 20rpx;
      border-bottom: solid 2rpx rgb(230 230 230);

      .input {
        margin-left: 20rpx;
        font-size: 30rpx;
      }

      .input::placeholder {
        color: rgb(153 153 153);
      }
    }
  }

  .group-2 {
    width: 670rpx;
    height: 1000rpx;
    margin-top: 20rpx;
    margin-left: 20rpx;
    overflow-y: hidden;

    .group-search {
      .group-type {
        height: 80rpx;
        border-bottom: solid 2rpx rgb(230 230 230);
      }
    }

    .group-positions {
      height: 80rpx;
      border-bottom: solid 2rpx rgb(230 230 230);
    }
  }

  .group-3 {
    width: 50%;
    height: 500px;
    overflow-y: hidden;
    background-color: rgb(234 246 246);

    .directions {
      margin-left: 20rpx;

      .direction {
        flex-wrap: wrap;
        margin-top: 20rpx;
      }
    }
  }

  .group-4 {
    width: 50%;
    height: 500px;
    overflow-y: hidden;

    .positions {
      margin-left: 20rpx;

      .position {
        flex-wrap: wrap;
        margin-top: 20rpx;
      }
    }
  }

  .image {
    width: 32rpx;
    height: 32rpx;
  }
}
</style>
