<template>
  <view v-if="isShow">
    <view
      class="wyb-popup-box"
      :style="{
        transitionDuration: duration + 'ms',
        opacity: contentOpacity,
        transform: contentTransform || autoTransform,
        zIndex: zIndex,
        borderTopRightRadius:
          type === 'center' || type === 'bottom' || type === 'left'
            ? radius + 'px'
            : 0,
        borderTopLeftRadius:
          type === 'center' || type === 'bottom' || type === 'right'
            ? radius + 'px'
            : 0,
        borderBottomRightRadius:
          type === 'center' || type === 'top' || type === 'left'
            ? radius + 'px'
            : 0,
        borderBottomLeftRadius:
          type === 'center' || type === 'top' || type === 'right'
            ? radius + 'px'
            : 0,
        width: autoWidth,
        height: 'calc(' + autoHeight + ' - ' + marginTop + 'px)',
        minWidth: width + 'rpx',
        minHeight: height + 'rpx',
        top: sizeChange && type === 'center' ? winReTop : autoTop,
        bottom: autoBottom,
        left: autoLeft,
        right: autoRight,
        marginTop: marginTop + 'px',
        backgroundColor: bgColor,
      }"
      @tap.stop.prevent
      @touchmove.stop.prevent
    >
      <view
        v-if="showCloseIcon"
        class="wyb-popup-close"
        :style="{
          width: closeIcon ? closeIconSize + 'rpx' : 'auto',
          height: closeIcon ? closeIconSize + 'rpx' : 'auto',
          top:
            closeIconPos === 'top-right' || closeIconPos === 'top-left'
              ? vertOffset + 'rpx'
              : 'auto',
          bottom:
            closeIconPos === 'bottom-right' || closeIconPos === 'bottom-left'
              ? vertOffset + 'rpx'
              : 'auto',
          left:
            closeIconPos === 'bottom-left' || closeIconPos === 'top-left'
              ? horiOffset + 'rpx'
              : 'auto',
          right:
            closeIconPos === 'bottom-right' || closeIconPos === 'top-right'
              ? horiOffset + 'rpx'
              : 'auto',
        }"
      >
        <image
          v-if="showCloseIcon && closeIcon"
          class="wyb-popup-custom-close"
          :src="closeIcon"
          :style="{
            width: closeIconSize + 'rpx',
            height: closeIconSize + 'rpx',
          }"
          @tap="hide"
        />
        <view
          v-if="showCloseIcon && !closeIcon"
          class="iconfont icon-close"
          @tap="hide"
        />
      </view>

      <scroll-view
        class="wyb-popup-container"
        :style="{
          width: autoWidth,
          height: autoHeight,
        }"
        :enable-flex="true"
        :scroll-y="scrollY"
        :scroll-x="scrollX"
      >
        <view class="wyb-popup-slot">
          <slot></slot>
        </view>
      </scroll-view>
    </view>
    <view
      class="wyb-popup-mask"
      :style="{
        opacity: maskOpacity,
        transitionDuration: duration + 'ms',
        marginTop: marginTop + 'px',
        // height: 'calc(' + autoHeight + ' - ' + marginTop + 'px)',
        backgroundColor: 'rgba(0, 0, 0, ' + maskAlpha + ')',
        zIndex: +zIndex - 1,
      }"
      @tap.stop="close"
      @touchmove.stop.prevent
    />
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: string;
    mode?: string;
    height?: string | number;
    width?: string | number;
    radius?: string | number;
    zIndex?: string | number;
    maskClickClose?: boolean;
    maskAlpha?: number;
    duration?: number;
    showCloseIcon?: boolean;
    scrollY?: boolean;
    scrollX?: boolean;
    closeIconPos?: string;
    closeIcon?: string;
    closeIconSize?: string | number;
    vertOffset?: string | number;
    horiOffset?: string | number;
    centerAnim?: string;
    bgColor?: string;
    zoomLessenMulti?: number;
    slideMulti?: number;
    negativeTop?: number;
    marginTop?: number;
  }>(),
  {
    type: "bottom",
    mode: "size-auto",
    height: 400,
    width: 500,
    radius: 0,
    zIndex: 10076,
    maskClickClose: true,
    maskAlpha: 0.5,
    duration: 400,
    showCloseIcon: false,
    scrollY: false,
    scrollX: false,
    closeIconPos: "top-right",
    closeIcon: "",
    closeIconSize: "20",
    vertOffset: 0,
    horiOffset: 0,
    centerAnim: "zoom",
    bgColor: "#fff",
    zoomLessenMulti: 0.8,
    slideMulti: 0.5,
    negativeTop: 0,
    marginTop: 0,
  }
);

const emit = defineEmits<{
  (event: "close", ...args: any[]): void;
  (event: "open", ...args: any[]): void;
  (event: "hide", ...args: any[]): void;
  (event: "show", ...args: any[]): void;
}>();

const w = uni.getSystemInfoSync().screenWidth;
const h = uni.getSystemInfoSync().screenHeight;
const isShow = ref(false);
const winReBottom = ref("");
const winReTop = ref("");
const sizeChange = ref(false);
const contentOpacity = ref<number | null>(null);
const contentTransform = ref<string | null>(null);
const maskOpacity = ref(0);

const autoCenterTop = computed(() => {
  const statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
  const windowHeight = uni.getSystemInfoSync().windowHeight;
  const popupHeight = rpxToPx(+props.height);
  const navHeight = 44;
  const result = `${(windowHeight - popupHeight) / 2 - props.negativeTop}px`;
  return result;
});

const autoTransform = computed(() => {
  let result = "";
  switch (props.type) {
    case "center":
      if (props.centerAnim === "zoom-lessen") {
        result = `scale(${props.zoomLessenMulti})`;
      } else if (props.centerAnim === "slide-up") {
        result = `translateY(${100 * props.slideMulti}%)`;
      } else if (props.centerAnim === "slide-down") {
        result = `translateY(${-100 * props.slideMulti}%)`;
      } else if (props.centerAnim === "fade") {
        result = "auto";
      }
      break;
    case "bottom":
      result = "translateY(100%)";
      break;
    case "top":
      result = "translateY(-100%)";
      break;
    case "left":
      result = "translateX(-100%)";
      break;
    case "right":
      result = "translateX(100%)";
      break;
  }
  return result;
});

const autoWidth = computed(() => {
  if (props.type === "center") {
    return `${props.width}rpx`;
  } else {
    if (props.mode === "size-fixed") {
      if (props.type === "top" || props.type === "bottom") {
        return "100%";
      } else {
        return `${props.width}rpx`;
      }
    } else {
      if (props.type === "top" || props.type === "bottom") {
        return "100%";
      } else {
        return "auto";
      }
    }
  }
});

const autoHeight = computed(() => {
  if (props.type === "center") {
    return `${props.height}rpx`;
  } else {
    if (props.mode === "size-fixed") {
      if (props.type === "left" || props.type === "right") {
        return "100%";
      } else {
        return `${props.height}rpx`;
      }
    } else {
      if (props.type === "left" || props.type === "right") {
        return "100%";
      } else {
        return "auto";
      }
    }
  }
});

const autoTop = computed(() => {
  if (props.type === "center") {
    return autoCenterTop.value;
  } else if (props.type === "bottom") {
    return "auto";
  } else {
    return 0;
  }
});

const autoBottom = computed(() => {
  if (props.type === "center" || props.type === "top") {
    return "auto";
  } else {
    return 0;
  }
});

const autoLeft = computed(() => {
  if (props.type === "center") {
    return `${(w - rpxToPx(+props.width)) / 2}px`;
  } else if (props.type === "right") {
    return "auto";
  } else {
    return 0;
  }
});

const autoRight = computed(() => {
  if (props.type === "center" || props.type === "left") {
    return "auto";
  } else {
    return 0;
  }
});

onMounted(() => {
  // #ifdef H5
  const winHeight = uni.getSystemInfoSync().windowHeight;
  uni.onWindowResize((res) => {
    sizeChange.value = true;
    if (props.type === "bottom") {
      winReBottom.value = `${winHeight - res.size.windowHeight}px`;
    } else if (props.type === "center") {
      winReTop.value = `${
        (res.size.windowHeight - rpxToPx(+props.height)) / 2 - props.negativeTop
      }px`;
    }
  });
  // #endif
});

const close = () => {
  props.maskClickClose && hide();
};

const show = () => {
  isShow.value = true;
  // #ifndef H5
  void nextTick(() => {
    maskIn();
    contentIn();
    void wait(props.duration + 1).then(() => {
      emit("show", {
        pageScroll: false,
        overflow: "hidden",
      });
    });
  });
  // #endif
  // #ifdef H5
  void wait(10).then(() => {
    maskIn();
    contentIn();
    void wait(props.duration + 1).then(() => {
      emit("show", {
        pageScroll: false,
        overflow: "hidden",
      });
    });
  });
  // #endif
};

const hide = () => {
  contentOut();
  maskOut();
  void wait(props.duration + 1).then(() => {
    isShow.value = false;
    emit("hide", {
      pageScroll: true,
      overflow: "scroll",
    });
  });
};

const contentIn = () => {
  switch (props.type) {
    case "center":
      if (props.centerAnim === "zoom-lessen") {
        contentOpacity.value = 1;
        contentTransform.value = "scale(1)";
      } else if (
        props.centerAnim === "slide-up" ||
        props.centerAnim === "slide-down"
      ) {
        contentOpacity.value = 1;
        contentTransform.value = "translateY(0)";
      } else if (props.centerAnim === "fade") {
        contentOpacity.value = 1;
      }
      break;
    case "bottom":
    case "top":
      contentTransform.value = "translateY(0)";
      break;
    case "left":
    case "right":
      contentTransform.value = "translateX(0)";
      break;
  }
};

const contentOut = () => {
  contentOpacity.value = null;
  contentTransform.value = null;
};

const maskIn = () => {
  maskOpacity.value = 1;
};

const maskOut = () => {
  maskOpacity.value = 0;
};

const rpxToPx = (rpx: number) => {
  return (rpx / 750) * w;
};

const wait = (time: number | undefined) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

defineExpose({
  show,
  hide,
});
</script>

<style>
@import "./iconfont.css";

.wyb-popup-box {
  position: fixed;
  transition-timing-function: ease-out;
  transition-property: opacity, transform;
}

.wyb-popup-container {
  position: relative;
  box-sizing: border-box;
}

.wyb-popup-slot {
  width: 100%;
  height: 100%;
}

.wyb-popup-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition-timing-function: ease;
  transition-property: opacity, transform;
}

.wyb-popup-close {
  position: absolute;
  z-index: 20000;
  font-size: 40rpx;
  color: #808080;
}

.wyb-popup-custom-close {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
