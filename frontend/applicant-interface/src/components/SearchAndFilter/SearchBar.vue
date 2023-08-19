<template>
  <!--  #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ -->
  <view class="bar" :style="'margin-top: ' + navigationBarTop + 'px'">
    <view
      class="items-center group"
      :style="
        'width: ' +
        navigationBarWidth +
        'px; height: ' +
        navigationBarHeight +
        'px'
      "
      ><view class="flex-row" style="width: 100%">
        <text class="city" @click="textOnClick">{{ city }}</text>
        <image
          src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16478528773197745663.png"
          class="image"
        />
        <view class="flex-row input">
          <image
            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16478528771387958614.png"
            class="search"
            @click="searchOnClick"
          />
          <input
            v-model="_searchContent"
            type="text"
            class="search-text"
            placeholder="请输入关键字"
          />
        </view>
        <text class="cancel" @click="text_1OnClick">取消</text>
      </view>
    </view>
  </view>
  <!-- #endif -->
  <!--  #ifndef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ -->
  <view class="bar">
    <view class="items-center group"
      ><view class="flex-row" style="width: 100%">
        <text class="city" @click="textOnClick">{{ city }}</text>
        <image
          src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16478528773197745663.png"
          class="image"
        />
        <view class="flex-row input">
          <image
            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16478528771387958614.png"
            class="search"
            @click="searchOnClick"
          />
          <input
            v-model="_searchContent"
            type="text"
            class="search-text"
            @confirm="searchOnClick"
            placeholder="请输入关键字"
          />
        </view>
        <text class="cancel" @click="text_1OnClick">取消</text>
      </view>
    </view>
  </view>
  <!-- #endif -->
</template>

<script lang="ts" setup>
import { useMainStore } from "@/stores";

const mainStore = useMainStore();

/* #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ */
// 获取小程序胶囊高度等
const navigationBarHeight = mainStore.menu.height;

const navigationBarTop = mainStore.menu.top - uni.upx2px(45);

const navigationBarWidth = mainStore.menu.left - uni.upx2px(20);
/* #endif */

const props = defineProps({
  searchContent: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  data: {
    type: Number,
    default: 1,
  },
});

const _searchContent = ref(props.searchContent);

const textOnClick = () => {
  uni.navigateTo({ url: "/pages/most/chengshixuanze/chengshixuanze" });
};
const searchOnClick = () => {
  if (_searchContent.value !== "") {
    uni.navigateTo({
      url:
        "/pages/detail/xiangguanzhiwei/xiangguanzhiwei?data=" +
        props.data +
        "&search=" +
        _searchContent.value +
        "&city=" +
        props.city,
    });
  } else {
    uni.showToast({
      title: "搜索内容不能为空",
      icon: "none",
      duration: 500,
    });
  }
};
// 当用户单击“取消”按钮时将调用的函数。
const text_1OnClick = () => {
  uni.switchTab({ url: "/pages/main/shouyeyemian/shouyeyemian" });
};
</script>

<style lang="scss" scoped>
.bar {
  position: relative;
  width: 100%;
  height: 120rpx;
  background-color: rgb(255 255 255);

  .group {
    position: absolute;
    top: 46rpx;
    right: 18rpx;
    left: 18rpx;
    padding-right: 21rpx;

    .city {
      align-self: center;
      font-size: 25rpx;
      line-height: 23rpx;
      color: rgb(0 0 0);
      white-space: nowrap;
    }

    .image {
      align-self: center;
      width: 15rpx;
      height: 8rpx;
    }

    .input {
      flex: 1 1 auto;
      height: 50rpx;
      padding: 11rpx 15rpx 12rpx;
      margin-left: 20rpx;
      line-height: 20rpx;
      white-space: nowrap;
      background-color: rgb(229 229 229);
      border-radius: 25rpx;
      box-shadow: 0rpx 4rpx 4rpx rgb(0 0 0 / 25%);

      .search {
        align-self: center;
        width: 25rpx;
        height: 25rpx;
      }

      .search-text {
        align-self: center;
        width: 90%;
        margin-left: 11rpx;
        font-size: 25rpx;
      }
    }

    .cancel {
      align-self: center;
      margin-left: 21rpx;
      font-size: 25rpx;
      line-height: 23rpx;
      color: rgb(0 0 0);
      white-space: nowrap;
    }
  }
}
</style>
