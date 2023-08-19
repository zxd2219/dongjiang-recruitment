<template>
  <SearchBar :city="cityName"></SearchBar>
  <view class="page">
    <view class="justify-between group-1" @click="searchType">
      <text class="text-3">按职位类型搜索</text>
      <view class="flex-row group-2">
        <text>技术</text>
        <image
          src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16475932254581114841.png"
          class="image-2"
        />
      </view>
    </view>
    <view class="flex-col group-3">
      <text class="hot">热门搜索</text>
      <view class="flex-row list">
        <view
          v-for="(popularPosition, i) in popularPositions"
          :key="i"
          class="list-item1"
          @click="positionClick(i)"
        >
          <text class="text-5">{{ popularPosition }}</text>
        </view>
      </view>
    </view>
    <view class="flex-col group-5">
      <text class="hot">热门公司</text>
      <view class="flex-row list-1">
        <view
          v-for="(popularCompany, i) in popularCompanies"
          :key="i"
          class="list-item1"
          @click="companyClick(i)"
        >
          <text class="text-5">{{ popularCompany }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import SearchBar from "@/components/SearchAndFilter/SearchBar.vue";

const popularPositions = reactive([
  "java",
  "ios",
  "前端",
  "后端",
  "运维",
  "测试",
  "UI",
  "产品",
  "高级",
  "项目经理",
  "项目助理",
  "项目主管",
]);
const popularCompanies = reactive([
  "字节跳动",
  "美团",
  "腾讯",
  "网易",
  "百度",
  "贝壳",
  "北京京东世纪贸易有限公司",
  "快手",
  "安居客",
  "小米集团",
]);

const cityName = ref("");
const positionType = ref("");

onLoad((e) => {
  if (e!.city) {
    cityName.value = e!.city;
  }
  uni.$on("liveCity", (city: string) => {
    cityName.value = city;
  });
});

// 根据职位类型搜索
const searchType = () => {
  const value = true;
  uni.navigateTo({
    url:
      `/pages/most/zhiweileixing/zhiweileixing?value=` +
      value +
      `&city=` +
      cityName.value,
  });
};
// 搜索职位
const positionClick = (index: number) => {
  uni.navigateTo({
    url:
      "/pages/detail/xiangguanzhiwei/xiangguanzhiwei?data=" +
      1 +
      "&search=" +
      popularPositions[index] +
      "&type=" +
      positionType.value +
      "&city=" +
      cityName.value,
  });
};
// 搜索公司
const companyClick = (index: number) => {
  uni.navigateTo({
    url:
      "/pages/detail/xiangguanzhiwei/xiangguanzhiwei?data=" +
      2 +
      "&search=" +
      popularCompanies[index] +
      "&city=" +
      cityName.value,
  });
};
</script>

<style lang="scss" scoped>
.page {
  width: 710rpx;
  height: auto;
  margin-left: 20rpx;
  overflow-y: auto;
  background-color: rgb(255 255 255);

  .hot {
    font-size: 35rpx;
    font-weight: bold;
  }

  .group-1 {
    margin-top: 31rpx;

    .text-3 {
      font-size: 25rpx;
      line-height: 23rpx;
      color: rgb(0 0 0);
      white-space: nowrap;
    }

    .group-2 {
      margin-top: 2rpx;
      margin-right: 11rpx;
      font-size: 20rpx;
      line-height: 18rpx;
      color: rgb(163 154 154);
      white-space: nowrap;

      .image-2 {
        width: 4rpx;
        height: 14rpx;
        margin-top: 4rpx;
        margin-left: 28rpx;
      }
    }
  }

  .group-3 {
    margin-top: 50rpx;

    .list {
      flex-wrap: wrap;
      width: 710rpx;
      margin-top: 20rpx;

      .list-item1 {
        flex: none;
        height: 60rpx;
        margin-bottom: 15rpx;
        margin-left: 15rpx;
        border: solid 2rpx rgb(230 230 230);
        border-radius: 5rpx;

        .text-5 {
          padding: 0rpx 15rpx;
          font-size: 25rpx;
        }
      }
    }
  }

  .group-5 {
    margin-top: 30rpx;

    .list-1 {
      flex-wrap: wrap;
      width: 710rpx;
      margin-top: 20rpx;

      .list-item1 {
        flex: none;
        height: 60rpx;
        margin-bottom: 15rpx;
        margin-left: 15rpx;
        border: solid 2rpx rgb(230 230 230);
        border-radius: 5rpx;

        .text-5 {
          padding: 0rpx 15rpx;
          font-size: 25rpx;
        }
      }
    }
  }

  .text {
    align-self: center;
    font-size: 30rpx;
    line-height: 23rpx;
    color: rgb(0 0 0);
    white-space: nowrap;
  }

  .search {
    flex: 1 1 auto;
    margin-left: 3rpx;
    font-size: 20rpx;
    line-height: 19rpx;
    color: rgb(163 154 154);
    white-space: nowrap;

    .image {
      align-self: center;
      width: 25rpx;
      height: 12rpx;
      margin-left: 10rpx;
    }

    .section-1 {
      display: flex;
      flex: 1 1 auto;
      align-items: center;
      height: 75rpx;
      padding: 11rpx 15rpx 12rpx;
      margin-left: 20rpx;
      background-color: rgb(229 229 229);
      filter: drop-shadow(0 4rpx 2rpx rgb(0 0 0 / 25%));
      background-repeat: no-repeat;
      background-size: 100% 100%;
      border-radius: 25rpx;

      .image-1 {
        width: 35rpx;
        height: 35rpx;
      }

      .text-1 {
        margin-left: 25rpx;
      }
    }
  }

  .text-2 {
    align-self: center;
    margin-left: 21rpx;
    font-size: 30rpx;
    line-height: 23rpx;
    color: rgb(0 0 0);
    white-space: nowrap;
  }

  .image-3 {
    width: 138rpx;
    height: 35rpx;
  }
}
</style>
