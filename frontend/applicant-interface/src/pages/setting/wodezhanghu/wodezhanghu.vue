<template>
  <NavigationBar title="我的账户" />
  <view class="flex-col page">
    <view class="justify-between items-center section">
      <text class="phone">账号</text>
      <text class="phone-num">{{ phoneNumber }}</text>
    </view>
    <view class="flex-col items-center button-box">
      <button class="justify-center items-center button" @click="showDelete">
        注销账号
      </button>
    </view>
    <wybPopup
      ref="popup"
      :mask-click-close="false"
      :show-close-icon="false"
      :width="wybWidth"
      :height="wybHeight"
      centerAnim="zoom-lessen"
      :duration="200"
      :radius="10"
      mode="size-auto"
      type="center"
    >
      <view v-if="isShow" style="width: 100%; height: 100%">
        <view
          class="justify-center items-center"
          style="width: 100%; height: 20%"
          >注销账号</view
        >
        <view
          class="justify-center items-center"
          style="width: 100%; height: 60%; font-size: small"
          >您确定注销账号吗？</view
        >
        <view
          class="justify-center items-center"
          style="width: 100%; height: 20%"
        >
          <button style="width: 50%" @click="cancel">取消</button>
          <button style="width: 50%; color: blue" @click="deleteAccount">
            确认
          </button>
        </view>
      </view>
      <view v-if="!isShow" class="flex-col justify-center code-box">
        <text style="font-size: 40rpx; font-weight: bold; text-align: center">{{
          errorMes || "请输入验证码"
        }}</text>
        <view class="flex-col justify-between" style="margin-top: 20rpx">
          <input
            v-model="code"
            class="text-input"
            :adjust-position="false"
            :auto-blur="true"
            :focus="focus"
            type="number"
            :maxlength="6"
            @blur="focus = false"
          />
          <view class="flex-row justify-between code-input" @click="codeNum">
            <view
              v-for="(item, i) in 6"
              :key="i"
              class="justify-center items-center input"
              >{{ code[i] }}</view
            >
          </view>
          <text style="margin-top: 10rpx" @click="sendVerification">{{
            send
          }}</text>
        </view>
        <view
          class="justify-between items-center"
          style="width: 100%; height: auto; margin-top: 20rpx"
        >
          <button
            class="items-center justify-center cancel-button"
            @click="cancelDelete"
          >
            取消
          </button>
          <button
            class="items-center justify-center confirm-button"
            @click="confirmDelete"
          >
            确认
          </button>
        </view>
      </view>
    </wybPopup>
  </view>
</template>
<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import wybPopup from "@/components/wyb-popup/wyb-popup.vue";
import { until } from "@/hooks";
import { useMainStore } from "@/stores";

const mainStore = useMainStore();

const phoneNumber = ref<string>("");
const code = ref<string>("");
const send = ref<string>("重新发送");
const wybWidth = ref<string>("600");
const wybHeight = ref<string>("380");
const focus = ref<boolean>(false);
const isShow = ref<boolean>(true);

until(
  computed(() => !!mainStore.account),
  () => {
    phoneNumber.value = mainStore.applicant!.email;
  }
);

const codeNum = () => {
  focus.value = true;
};

// 注销账号消息提示
const popup = ref<InstanceType<typeof wybPopup>>();
const showDelete = () => {
  popup.value?.show();
};

const cancel = () => {
  popup.value?.hide();
};

// 注销账号
const deleteAccount = async () => {
  await commonService.sendVerificationCode({ email: phoneNumber.value });
  uni.showToast({
    title: "验证码已发送",
    icon: "none",
    duration: 1500,
  });
  isShow.value = !isShow.value;
  wybWidth.value = "700";
  wybHeight.value = "400";
};
// 重新获取验证码
const sendVerification = async () => {
  await commonService.sendVerificationCode({ email: phoneNumber.value });
  uni.showToast({
    title: "验证码已发送",
    icon: "none",
    duration: 1500,
  });
  const timer = setInterval(function () {
    send.value = "已发送" + "(" + count.value + ")";
    count.value--;
    if (count.value < 0) {
      clearInterval(timer);
      send.value = "重新发送";
    }
  }, 1000);
};

const cancelDelete = () => {
  isShow.value = !isShow.value;
  popup.value?.hide();
  wybWidth.value = "600";
  wybHeight.value = "380";
};

const count = ref<number>(59);

const { refreshAsync: destroyAccount, error } =
  authenticationService.useDestroyAccount(
    () => ({
      id: mainStore.account!.id,
      verificationCode: code.value,
    }),
    {
      manual: true,
    }
  );
const errorMes = computed(() => error.value?.body.error);

// 注销账号并退出登录
const confirmDelete = async () => {
  if (code.value.length !== 6) {
    uni.showToast({
      title: "验证码错误",
      icon: "none",
      duration: 1500,
    });
    return;
  }
  await destroyAccount();
  mainStore.token = "";
  mainStore.account = {} as any;
  mainStore.applicant = {} as any;
  mainStore.jobExpectations!.total = 0;
  uni.navigateTo({
    url: "/pages/account/denglu_zhuce/denglu",
  });
  isShow.value = !isShow.value;
  popup.value?.hide();
  wybWidth.value = "600";
  wybHeight.value = "380";
};
</script>

<style lang="scss" scoped>
.page {
  width: 710rpx;
  margin-left: 20rpx;

  .section {
    width: 100%;
    height: 100rpx;
    border: 1rpx solid rgb(230 230 230);
    border-radius: 10rpx;

    .phone {
      padding-left: 20rpx;
      font-size: 30rpx;
    }

    .phone-num {
      padding-right: 20rpx;
      font-size: 28rpx;
      color: gray;
    }
  }

  .button-box {
    position: absolute;
    bottom: 40rpx;
    width: 710rpx;
    height: 80rpx;

    .button {
      width: 600rpx;
      height: 100%;
      font-size: 30rpx;
      color: #fff;
      background-color: rgb(35 193 158);
      border-radius: 10rpx;
    }
  }

  .code-box {
    width: 90%;
    height: auto;
    margin-top: 20rpx;
    margin-left: 5%;
    font-size: 30rpx;

    .text-input {
      position: absolute;
      left: -100rpx;
      width: 50rpx;
      height: 50rpx;
    }

    .code-input {
      width: 100%;
      height: auto;
      font-size: 40rpx;

      .input {
        width: 17%;
        height: 110rpx;
        border: 5rpx solid rgb(230 230 230);
        border-radius: 10rpx;
      }
    }

    .cancel-button {
      width: 30%;
      height: 80rpx;
      font-size: 30rpx;
      color: rgb(0 0 0);
      background-color: rgb(240 240 240);
      border-radius: 10rpx;
    }

    .confirm-button {
      width: 65%;
      height: 80rpx;
      font-size: 30rpx;
      color: #fff;
      background-color: rgb(35 193 158);
      border-radius: 10rpx;
    }
  }
}
</style>
