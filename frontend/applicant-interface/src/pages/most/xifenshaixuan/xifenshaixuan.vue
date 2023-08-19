<template>
  <NavigationBar />
  <view class="flex-row page">
    <scroll-view class="group-view" :scroll-y="true">
      <view class="flex-col group-top">
        <text class="text-title">选择职位细分标签</text>
        <text class="tag">根据您选择的期望职位，选择一下职位细分标签</text>
      </view>
      <view class="flex-row group-checked">
        <view
          v-for="(label, i) in checkedSubLabels"
          v-show="label.checked"
          :key="i"
          class="justify-center items-center text-checked"
          @click="
            label.checked = false;
            checkeds.splice(checkeds.indexOf(label.subLabelsName), 1);
          "
          >{{ label.subLabelsName }}
          <image class="icon-close" src="@/static/icons/close.svg" />
        </view>
      </view>
      <view
        v-for="(title, i) in checkedClassifyName"
        :key="i"
        class="group-tags"
      >
        {{ title.classificationName }}
        <view class="flex-row group-box">
          <view
            v-for="(segmentInfo, j) in title.subLabels"
            :key="j"
            class="justify-center items-center segment-tag"
            :class="segmentInfo.checked ? 'active' : ''"
            @click="
              if (segmentInfo.checked === false) {
                if (checkeds.length < 3) {
                  segmentInfo.checked = true;
                  checkeds.push(segmentInfo.subLabelsName);
                }
              } else {
                checkeds.splice(checkeds.indexOf(segmentInfo.subLabelsName), 1);
                segmentInfo.checked = false;
              }
              checkedInfo(segmentInfo.checked);
            "
          >
            {{ segmentInfo.subLabelsName }}
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="justify-center items-center btn-box">
      <button class="btn-submit" @click="saveTags">确定</button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";

interface subDivisionLabels {
  classificationName: string;
  subLabels: {
    subLabelsName: string;
    checked: boolean;
  }[];
}

const checkedClassifyName = ref<subDivisionLabels[]>([]);
const checkedSubLabels = ref<subDivisionLabels["subLabels"]>([]);

onMounted(() => {
  // 用于从服务器获取数据的函数。
  commonService
    .getDirectionTags({
      positionName: "撒辣椒粉",
    })
    .then((res) => {
      checkedClassifyName.value = res.map((classify) => {
        const checkedLabels = classify.subdivisionLabels.map((label) => {
          const checkableLabel = reactive({
            subLabelsName: label,
            checked: false,
          });
          checkedSubLabels.value.push(checkableLabel);
          return checkableLabel;
        });
        return {
          classificationName: classify.classificationName,
          subLabels: checkedLabels,
        };
      });
    });
});

const checkeds = ref<string[]>([]);
// 用于检查用户是否选择了超过 3 个标签的功能。
const checkedInfo = (check: boolean) => {
  if (checkeds.value.length === 3 && check === false) {
    uni.showToast({
      title: "最多只能选择3个",
      icon: "none",
      mask: true,
    });
  }
};

// 用于发出事件 `saveTags` 并将 `checkeds` 的值传递给父组件的函数。
const saveTags = () => {
  uni.$emit("saveTags", checkeds.value);
  uni.navigateBack({ delta: 1 });
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: auto;

  .active {
    color: rgb(35 193 158);
    background-color: rgb(240 255 240) !important;
    border: 1px solid rgb(35 193 158);
  }

  .group-view {
    width: 100%;
    height: 1240rpx;

    .group-top {
      margin-left: 20rpx;
      font-size: 30rpx;
      font-weight: 600;

      .tag {
        font-size: 23rpx;
        font-weight: bold;
      }
    }

    .group-checked {
      margin-top: 20rpx;
      margin-left: 20rpx;

      .text-checked {
        width: auto;
        height: 60rpx;
        margin: 10rpx;
        font-size: 22rpx;
        color: rgb(35 193 158);
        text-align: center;
        background-color: rgb(240 255 240);
        border: 1px solid rgb(35 193 158);
        border-radius: 10rpx;
      }

      .icon-close {
        width: 30rpx;
        height: 30rpx;
        margin-left: 10rpx;
      }
    }

    .group-tags {
      width: 710rpx;
      height: auto;
      margin-top: 20rpx;
      margin-left: 20rpx;
      font-size: 30rpx;

      .group-box {
        flex-wrap: wrap;
        margin-top: 10rpx;
        font-size: 25rpx;

        .segment-tag {
          flex-wrap: wrap;
          width: 210rpx;
          height: 60rpx;
          margin: 10rpx;
          text-align: center;
          background-color: rgb(230 230 230);
          border-radius: 10rpx;
        }
      }
    }
  }

  .btn-box {
    position: fixed;
    bottom: 10rpx;
    width: 100%;
    height: 80rpx;

    .btn-submit {
      width: 600rpx;
      height: 80rpx;
      font-size: 30rpx;
      font-weight: bold;
      color: #fff;
      background-color: rgb(35 193 158);
      border-radius: 10rpx;
    }
  }
}
</style>
