<template>
  <view>
    <wyb-popup
      ref="popup"
      type="center"
      mode="size-fixed"
      :scroll-y="false"
      :width="width"
      :height="height"
      :radius="radius"
      :mask-click-close="maskClickClose"
      :mask-alpha="maskAlpha"
      :duration="duration"
      :center-anim="animation"
      :bg-color="bgColor"
      :slide-multi="slideMulti"
      :negative-top="negativeTop"
      :zoom-lessen-multi="zoomLessenMulti"
    >
      <view class="wyb-modal">
        <view
          v-if="showTitle"
          class="wyb-modal-title"
          :style="{ color: ftColor }"
        >
          {{ title }}
        </view>
        <view
          class="wyb-modal-content"
          :style="{
            paddingTop: padding![0] + 'rpx',
            paddingRight: padding![1] || padding![0] + 'rpx',
            paddingBottom: padding![2] || padding![0] + 'rpx',
            paddingLeft: padding![3] || padding![0] + 'rpx',
            lineHeight: lineHeight + 'rpx',
            color: ftColor,
          }"
        >
          <text v-if="!custom">{{ content }}</text>
          <view v-if="custom" @tap.stop.prevent @touchmove.stop.prevent>
            <slot />
          </view>
        </view>
        <view class="wyb-modal-btns">
          <view class="wyb-modal-line" :style="{ transform: scaleLine }" />
          <view class="wyb-modal-btn-box">
            <view
              v-if="showCancel"
              class="wyb-modal-cancel"
              hover-class="wyb-modal-cancel-hover"
              :hover-stay-time="100"
              :style="{
                color: cancelColor || ftColor,
                borderBottomLeftRadius: radius + 'px',
              }"
              @tap="onBtnsTap(0)"
            >
              {{ cancelText }}
            </view>
            <view
              class="wyb-modal-confirm"
              hover-class="wyb-modal-confirm-hover"
              :hover-stay-time="100"
              :style="{
                color: confirmColor,
                borderBottomRightRadius: radius + 'px',
              }"
              @tap="onBtnsTap(1)"
            >
              <text v-if="!confirmClick">{{ confirmText }}</text>
              <view v-if="asyncClose && confirmClick" class="wyb-modal-loading">
                <view
                  class="wyb-modal-loader"
                  :style="{
                    borderTop: '1.5px solid ' + loadingColor.top,
                    borderRight: '1.5px solid ' + loadingColor.right,
                    borderBottom: '1.5px solid ' + loadingColor.bottom,
                    borderLeft: '1.5px solid ' + loadingColor.left,
                    transform: 'scale(0.5)',
                  }"
                />
              </view>
            </view>
          </view>
        </view>
      </view>
    </wyb-popup>
  </view>
</template>

<script setup lang="ts">
/* eslint-disable */
import wybPopup from "@/components/wyb-popup/wyb-popup.vue";

const props = withDefaults(
  defineProps<{
    title: string;
    showTitle: boolean;
    content: string;
    confirmText: string;
    cancelText: string;
    confirmColor: string;
    cancelColor: string;
    showCancel: boolean;
    width: string | number;
    height: string | number;
    radius: string | number;
    maskClickClose: boolean;
    maskAlpha: number;
    duration: number;
    animation: string;
    bgColor: string;
    color: string;
    lineHeight: string | number;
    zoomLessenMulti: number;
    slideMulti: number;
    custom: boolean;
    negativeTop: number;
    asyncClose: boolean;
    padding?: number[];
  }>(),
  {
    title: "标题",
    showTitle: true,
    content: "内容",
    confirmText: "确认",
    cancelText: "取消",
    confirmColor: "#007aff",
    cancelColor: "#000",
    showCancel: true,
    width: 600,
    height: 350,
    radius: 5,
    maskClickClose: false,
    maskAlpha: 0.5,
    duration: 400,
    animation: "zoom-lessen",
    bgColor: "#fff",
    color: "",
    lineHeight: 30,
    zoomLessenMulti: 1.2,
    slideMulti: 0.15,
    custom: false,
    negativeTop: 0,
    asyncClose: false,
    padding: [20, 0, 20, 0] as any,
  }
);

const ftColor = ref(props.color || "#000");
const scaleLine = ref("scaleY(1)");
const confirmClick = ref(false);

const loadingColor = computed(() => {
  const color = props.confirmColor.slice();
  const rgbList = hexToRgb(color);
  const top =
    "rgba(" + rgbList[0] + "," + rgbList[1] + "," + rgbList[2] + ", 0.3)";
  const bottom =
    "rgba(" + rgbList[0] + "," + rgbList[1] + "," + rgbList[2] + ", 0.3)";
  const right =
    "rgba(" + rgbList[0] + "," + rgbList[1] + "," + rgbList[2] + ", 0.3)";
  const left = "rgb(" + rgbList[0] + "," + rgbList[1] + "," + rgbList[2] + ")";
  return {
    top,
    bottom,
    right,
    left,
  };
});

onMounted(() => {
  getFtColor();
});

const emit = defineEmits<{
  (event: "cancel"): void;
  (event: "confirm"): void;
}>();

const onBtnsTap = (idx: number) => {
  switch (idx) {
    case 0:
      hideModal();
      emit("cancel");
      break;
    case 1:
      if (!confirmClick) {
        emit("confirm");
      }
      if (props.asyncClose) {
        confirmClick.value = true;
      } else {
        hideModal();
      }
      break;
  }
};

const getFtColor = () => {
  let r = 0,
    g = 0,
    b = 0;
  if (props.bgColor.indexOf("#") !== -1) {
    const arr = hexToRgb(props.bgColor);
    (r = arr[0]), (g = arr[1]), (b = arr[2]);
  } else {
    const hasAlpha = props.bgColor.indexOf("a") !== -1;
    let root = props.bgColor.slice();
    const idx = root.indexOf("(") + 1;
    root = root.substring(idx);
    const firstDotIdx = root.indexOf(",");
    r = parseFloat(root.substring(0, firstDotIdx));
    root = root.substring(firstDotIdx + 1);
    const secondDotIdx = root.indexOf(",");
    g = parseFloat(root.substring(0, secondDotIdx));
    root = root.substring(secondDotIdx + 1);
    if (hasAlpha) {
      const thirdDotIdx = root.indexOf(",");
      b = parseFloat(root.substring(0, thirdDotIdx));
    } else {
      b = parseFloat(root);
    }
  }
  if (r * 0.299 + g * 0.578 + b * 0.114 >= 192) {
    //浅色
    ftColor.value = props.color || "#000";
    scaleLine.value = "scaleY(1)";
  } else {
    //深色
    ftColor.value = props.color || "#fff";
    scaleLine.value = "scaleY(0.5)";
  }
};

const hexToRgb = (color: string) => {
  if (color.length === 4) {
    let arr = color.split("");
    color = "#" + arr[1] + arr[1] + arr[2] + arr[2] + arr[3] + arr[3];
  }
  let color16List = [
    color.substring(1, 3),
    color.substring(3, 5),
    color.substring(5, 7),
  ];
  let r = parseInt(color16List[0], 16);
  let g = parseInt(color16List[1], 16);
  let b = parseInt(color16List[2], 16);
  return [r, g, b];
};

const RGBChange = (color: string, level: number, type: string) => {
  // hex转rgb
  if (color.length === 4) {
    let arr = color.split("");
    color = "#" + arr[1] + arr[1] + arr[2] + arr[2] + arr[3] + arr[3];
  }
  let color16List = [
    color.substring(1, 3),
    color.substring(3, 5),
    color.substring(5, 7),
  ];
  let r = parseInt(color16List[0], 16);
  let g = parseInt(color16List[1], 16);
  let b = parseInt(color16List[2], 16);
  let rgbc = [r, g, b];
  // 减淡或加深
  for (var i = 0; i < 3; i++)
    type === "light"
      ? (rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i]))
      : (rgbc[i] = Math.floor(rgbc[i] * (1 - level)));
  // rgb转hex
  let R = rgbc[0].toString(16);
  let G = rgbc[1].toString(16);
  let B = rgbc[2].toString(16);
  if (R.length === 1) R = "0" + R;
  if (G.length === 1) G = "0" + G;
  if (B.length === 1) B = "0" + B;
  return "#" + R + G + B;
};

const popup = ref<InstanceType<typeof wybPopup>>();

const showModal = () => {
  popup.value?.show();
};

const hideModal = () => {
  if (confirmClick) {
    confirmClick.value = false;
  }
  popup.value?.hide();
};

defineExpose({
  showModal,
  hideModal,
});
</script>

<style>
.wyb-modal {
  z-index: 10080;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.wyb-modal-title {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 70rpx;
  font-size: 35rpx;
}

.wyb-modal-content {
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 30rpx;
}

.wyb-modal-line {
  width: 100%;
  height: 1px;
  background-color: #f1f1f1;
}

.wyb-modal-btns {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100rpx;
}

.wyb-modal-btn-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 35rpx;
}

.wyb-modal-cancel,
.wyb-modal-confirm {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
}

.wyb-modal-cancel-hover {
  background-color: rgb(0 0 0 / 8%) !important;
}

.wyb-modal-confirm-hover {
  background-color: rgb(0 0 0 / 8%) !important;
}

.wyb-modal-loader {
  position: relative;
  width: 35rpx;
  height: 35rpx;
  animation: loading 0.75s infinite linear;
}

.wyb-modal-loader,
.wyb-modal-loader::after {
  border-radius: 50%;
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
