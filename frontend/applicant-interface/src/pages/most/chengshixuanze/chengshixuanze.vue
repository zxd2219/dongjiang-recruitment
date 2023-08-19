<template>
  <NavigationBar title="选择城市" />
  <view class="flex-col page">
    <view class="flex-row">
      <scroll-view class="group-left" :scroll-y="true">
        <view class="flex-col province-name">
          <view
            v-for="(province, i) in provinces"
            :key="i"
            class="justify-center province"
            :class="provinceIndexOf === i ? 'active' : ''"
            @click="provinceIndexOf = i"
            >{{ province.provinceName }}</view
          >
        </view>
      </scroll-view>
      <view class="group-right">
        <view class="flex-row cities">
          <view
            v-for="(city, i) in cities"
            :key="i"
            class="justify-center items-center city"
            @click="cityIndex(i)"
            >{{ city }}</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import { useMainStore } from "@/stores";

const mainStore = useMainStore();

const provinces = mainStore.cities!;
const provinceIndexOf = ref(0);

// 计算属性。它是一个基于另一个属性的值返回值的函数。
const cities = computed(() => provinces[provinceIndexOf.value].cities);

// 单击城市时调用的函数。它将导航回上一页并发出一个名为 liveCity 的事件。
const cityIndex = (index: number) => {
  const city = `${provinces[provinceIndexOf.value].provinceName},${
    cities.value[index]
  }`;
  uni.$emit("liveCity", city);
  uni.navigateBack({ delta: 1 });
};
</script>

<style lang="scss" scoped>
.page {
  width: 94%;
  height: auto;
  margin-left: 3%;

  .active {
    font-weight: bold;
  }

  .group-left {
    width: 30%;

    // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ
    height: 1190rpx;

    // #endif
    // #ifndef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ
    height: 1520rpx;

    // #endif
    overflow-y: hidden;
    background-color: rgb(244 243 243);
    border-radius: 5rpx;

    .province-name {
      width: 170rpx;
      margin-left: 20rpx;

      .province {
        margin-top: 15rpx;
        font-size: 28rpx;
        white-space: nowrap;
      }
    }
  }

  .group-right {
    width: 70%;

    // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ
    height: 1190rpx;

    // #endif
    // #ifndef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ
    height: 1520rpx;

    // #endif

    .cities {
      flex-wrap: wrap;
      margin-left: 20rpx;

      .city {
        width: 139rpx;
        height: 60rpx;
        margin-top: 15rpx;
        margin-left: 15rpx;
        font-size: 28rpx;
        border: solid 2rpx rgb(241 242 241);
        border-radius: 5rpx;
      }
    }
  }

  .button {
    position: fixed;
    bottom: 20rpx;
    background-color: rgb(255 255 255);

    .reset {
      width: 230rpx;
      height: 60rpx;
      font-size: 30rpx;
      background-color: rgb(229 229 229);
      border-radius: 5rpx;
    }

    .identify {
      width: 460rpx;
      margin-left: 20rpx;
      font-size: 30rpx;
      background-color: rgb(84 188 163);
      border-radius: 5rpx;
    }
  }
}
</style>
