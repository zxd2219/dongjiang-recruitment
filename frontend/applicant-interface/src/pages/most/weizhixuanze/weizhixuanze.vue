<template>
  <NavigationBar :title="country" right="切换城市" @right-click="changeCity" />
  <view class="flex-col page">
    <view class="flex-row group-all">
      <view class="justify-center group-left">商圈</view>
      <scroll-view class="flex-row group-center" :scroll-y="true">
        <view class="flex-col">
          <view
            v-for="(con, i) in countries"
            :key="i"
            class="cities"
            :class="countriesIndex == i ? 'active' : ''"
            @click="countriesIndexOf(i)"
          >
            <text>{{ con.countyName }}</text>
          </view>
        </view>
      </scroll-view>
      <scroll-view class="flex-row group-right" :scroll-y="true">
        <view class="flex-col items-center">
          <view
            v-for="(area, i) in areas"
            :key="i"
            class="toponym"
            :class="
              filterValue.includes(area)
                ? 'active'
                : '' || countriesIndex == 0
                ? 'active'
                : ''
            "
            @click="areasIndexOf(i)"
          >
            <text>{{ area }}</text>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="flex-row justify-between button">
      <view
        class="flex-col items-center justify-center reset"
        @click="replacement"
      >
        <text>重置</text>
      </view>
      <view
        class="flex-row items-center justify-center identify"
        @click="savePlace"
      >
        <text>确定</text>
        <text v-if="filterValue.length" style="margin-left: 5rpx">{{
          filterValue.length
        }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import type { Areas } from "@dongjiang-recruitment/service-common";

const countries = ref<Areas>([
  {
    countyName: "不限",
    areas: ["不限"],
  },
]);
const areas = ref<string[]>([]);
const countriesIndex = ref(0);
const country = ref("位置");
const filterValue = ref<string[]>([]);
const c = ref();

onLoad((e) => {
  // 这是加载页面时执行的代码。
  if (e!.city) {
    country.value = e!.city;
    c.value = e!.city;
    commonService
      .getAreas({
        cityName: country.value,
      })
      .then((res) => {
        countries.value.splice(1, countries.value.length - 1);
        countries.value.push(...res);
        if (e!.areas) {
          // filterValue.value = JSON.parse(e!.areas);
          if (filterValue.value.length) {
            const count = countries.value.map((item) => item.countyName);
            countriesIndex.value = count.indexOf(c.value);
            areas.value = countries.value[countriesIndex.value].areas;
          } else {
            countriesIndex.value = 0;
            areas.value = countries.value[countriesIndex.value].areas;
          }
        }
      });
  }
  // 监听事件`liveCity`，当它被触发时，会执行回调函数。
  uni.$on("liveCity", (city) => {
    countriesIndex.value = 0;
    country.value = city;
    commonService
      .getAreas({
        cityName: country.value,
      })
      .then((res) => {
        countries.value.splice(1, countries.value.length - 1);
        countries.value.push(...res);
        // mainStore.areas = res;
      });
  });
});
// 卸载页面时调用的函数。
onUnload(() => {
  uni.$off("liveCity");
});

// 选择地区
const countriesIndexOf = (index: number) => {
  // countriesIndex.value = index;
  // country.value = countries.value[index].countyName;
  // areas.value = countries.value[index].areas;
  // filterValue.value = [];
  uni.showToast({
    title: "暂未开放,请点击切换城市",
    icon: "none",
  });
};

// 选择范围
const areasIndexOf = (index: number) => {
  // if (filterValue.value.includes(areas.value[index])) {
  //   filterValue.value.splice(filterValue.value.indexOf(areas.value[index]), 1);
  // } else {
  //   filterValue.value.push(areas.value[index]);
  // }
  uni.showToast({
    title: "暂未开放,请点击切换城市",
    icon: "none",
  });
};
/* 重置筛选 */
const replacement = () => {
  filterValue.value.length = 0;
  country.value = c.value;
};
// 存储选择的地区
const savePlace = () => {
  uni.$emit("city", country.value === "不限" ? "" : country.value);
  // uni.$emit("place", filterValue.value);
  uni.navigateBack({ delta: 1 });
};

const changeCity = () => {
  uni.navigateTo({
    url: "/pages/most/chengshixuanze/chengshixuanze",
  });
};
</script>

<style lang="scss" scoped>
.page {
  width: 94%;
  height: auto;
  padding: 60rpx 0 21rpx;
  margin-top: -50rpx;
  margin-left: 3%;
  background-color: rgb(255 255 255);

  .group-all {
    // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ
    height: 1120rpx;

    // #endif
    // #ifndef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ
    height: 1400rpx;

    // #endif

    .active {
      color: rgb(84 188 163);
    }

    .group-left {
      width: 31%;
      font-size: 30rpx;
      font-weight: bold;
      background-color: rgb(244 250 255);
    }

    .group-center {
      width: 248.5rpx;
      overflow-y: hidden;

      .cities {
        width: 200rpx;
        height: 60rpx;
        margin-left: 24rpx;
        overflow: hidden;
        font-size: 30rpx;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .group-right {
      width: 248.5rpx;
      overflow-y: hidden;

      .toponym {
        width: 200rpx;
        height: 60rpx;
        margin-left: 24rpx;
        overflow: hidden;
        font-size: 30rpx;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .button {
    position: fixed;
    bottom: 20rpx;
    width: 710rpx;
    height: 80rpx;
    font-size: 30rpx;
    background-color: rgb(255 255 255);

    .reset {
      width: 30%;
      background-color: rgb(229 229 229);
      border-radius: 10rpx;
    }

    .identify {
      width: 65%;
      margin-left: 20rpx;
      color: #fff;
      background-color: rgb(84 188 163);
      border-radius: 10rpx;
    }
  }
}
</style>
