<template>
  <NavigationBar title="通知设置" />
  <view class="flex-col page">
    <view class="justify-between items-center group-box">
      <text class="text-title">新消息通知</text>
      <switch style="transform: scale(0.7)" />
    </view>
    <view class="justify-between items-center group-box">
      <text class="text-title">声音</text>
      <switch style="transform: scale(0.7)" />
    </view>
    <view class="justify-between items-center group-box">
      <text class="text-title">震动</text>
      <switch style="transform: scale(0.7)" />
    </view>
    <view class="justify-between items-center group-box">
      <text class="text-title">勿扰模式</text>
      <switch
        :checked="disturb"
        style="transform: scale(0.7)"
        @click="disturb = !disturb"
      />
    </view>
    <view v-if="disturb" class="justify-between items-center group-box">
      <view class="flex-col">
        <text class="text-title">勿扰时间</text>
        <text style="padding-left: 20rpx; font-size: 20rpx"
          >开启后，指定时间类将不再接收相关信息推送</text
        >
      </view>
      <text style="padding-right: 10rpx; font-size: 25rpx" @click="showTime">{{
        noDisturbTime
      }}</text>
    </view>
    <WybPopup
      ref="popup"
      type="bottom"
      height="300"
      radius="6"
      mode="size-auto"
      :show-close-icon="false"
    >
      <picker-view class="picker-view" @change="bindChange">
        <picker-view-column>
          <view v-for="(item, i) in hours" :key="i" class="item"
            >{{ item }}时</view
          >
        </picker-view-column>
        <picker-view-column>
          <view v-for="(item, i) in minutes" :key="i" class="item"
            >{{ item }}分</view
          >
        </picker-view-column>
        <picker-view-column>
          <view v-for="(item, i) in hours" :key="i" class="item"
            >{{ item }}时</view
          >
        </picker-view-column>
        <picker-view-column>
          <view v-for="(item, i) in minutes" :key="i" class="item"
            >{{ item }}分</view
          >
        </picker-view-column>
      </picker-view>
    </WybPopup>
  </view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import WybPopup from "@/components/wyb-popup/wyb-popup.vue";

const noDisturbTime = ref("22：00-7：00");
const disturb = ref(false);

const popup = ref<InstanceType<typeof WybPopup>>();
const showTime = () => {
  popup.value?.show();
};

const date = new Date();
const hours = ref<string[]>([]);
const hour1 = ref<string>();
const hour2 = ref<string>();
const minute1 = ref<string>();
const minute2 = ref<string>();
const minutes = ref<string[]>([]);
for (let i = 1; i <= 24; i++) {
  let h = String(i);
  if (i < 10) {
    h = `0${i}`;
  }
  hours.value.push(h);
}
for (let i = 0; i <= 59; i++) {
  let m = String(i);
  if (i < 10) {
    m = `0${i}`;
  }
  minutes.value.push(m);
}

const bindChange = (e: { detail: { value: any } }) => {
  const val = e.detail.value;
  hour1.value = hours.value[val[0]];
  hour2.value = hours.value[val[2]];
  minute1.value = minutes.value[val[1]];
  minute2.value = minutes.value[val[3]];
  noDisturbTime.value = `${hour1.value}:${minute1.value}-${hour2.value}:${minute2.value}`;
};
</script>

<style lang="scss" scoped>
.page {
  .group-box {
    width: 710rpx;
    height: 100rpx;
    margin-top: 20rpx;
    margin-left: 20rpx;
    line-height: 40rpx;
    border: 2rpx solid rgb(200 200 200);
    border-radius: 10rpx;

    .text-title {
      padding-left: 20rpx;
      font-size: 30rpx;
    }
  }

  .picker-view {
    width: 750rpx;
    height: 450rpx;
    margin-top: 20rpx;
  }

  .item {
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}
</style>
