<template>
  <NavigationBar title="设置密码" />
  <view class="flex-col page">
    <view class="group-box">
      <text class="text-title">设置密码</text>
      <view class="flex-row justify-between items-center">
        <input
          v-model="password"
          class="text-input"
          :type="seen ? 'text' : 'password' as any"
          placeholder="请输入新密码"
        />
        <image
          v-if="seen"
          class="image"
          src="@/static/icons/eye.png"
          @click="changeWord"
        />
        <image
          v-else
          class="image"
          src="@/static/icons/no_eye.png"
          @click="changeWord"
        />
      </view>
    </view>
    <view class="group-box">
      <text class="text-title">确认密码</text>
      <view class="flex-row justify-between items-center">
        <input
          v-model="password2"
          class="text-input"
          :type="seen2 ? 'text' : 'password' as any"
          placeholder="请再次输入密码"
        />
        <image
          v-if="seen2"
          class="image"
          src="@/static/icons/eye.png"
          @click="changeWord2"
        />
        <image
          v-else
          class="image"
          src="@/static/icons/no_eye.png"
          @click="changeWord2"
        />
      </view>
    </view>
    <view class="group-box">
      <view class="flex-row justify-between items-center">
        <view>
          <text class="text-title">输入验证码</text>
          <view class="flex-row justify-between items-center">
            <input
              v-model="vCode"
              class="text-input"
              type="number"
              placeholder="请输入验证码"
              :maxlength="6"
            />
          </view>
        </view>
        <button
          class="justify-center items-center btn"
          @click="getVerification"
        >
          获取验证码
        </button>
      </view>
    </view>
    <view class="justify-center group-button">
      <view class="justify-center items-center group-box" @click="savePassWord">
        <text>保存</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import { useMainStore } from "@/stores/main";

const mainStore = useMainStore();

const password = ref("");
const password2 = ref("");
const vCode = ref("");
const seen = ref(false);
const seen2 = ref(false);

const { refreshAsync: sendVerificationCode } =
  commonService.useSendVerificationCode(
    () => ({
      email: mainStore.account!.userName,
    }),
    {
      manual: true,
    }
  );
const { refreshAsync: changePassword } =
  authenticationService.useChangePassword(
    () => ({
      id: mainStore.account!.id,
      requestBody: {
        password: password.value,
        verificationCode: vCode.value,
      },
    }),
    {
      manual: true,
    }
  );

// 获取验证码
const getVerification = async () => {
  await sendVerificationCode();
  uni.showToast({
    title: "验证码已发送",
    duration: 1500,
    icon: "none",
  });
};
// 修改密码并进行判断
const savePassWord = async () => {
  if (password.value !== password2.value) {
    uni.showToast({
      title: "两次密码不一致",
      icon: "none",
      duration: 1500,
    });
  } else if (password.value === "" || password2.value === "") {
    uni.showToast({
      title: "密码不能为空",
      icon: "none",
      duration: 1500,
    });
  } else if (password.value.length < 6) {
    uni.showToast({
      title: "密码长度不能小于6位",
      icon: "none",
      duration: 1500,
    });
  } else if (vCode.value.length !== 6) {
    uni.showToast({
      title: "请输入6位验证码",
      icon: "none",
      duration: 1500,
    });
  } else {
    await changePassword();
    uni.showToast({
      title: "修改成功",
      icon: "none",
      duration: 1500,
    });
    uni.navigateBack({
      delta: 1,
    });
  }
};
const changeWord = () => {
  seen.value = !seen.value;
};
const changeWord2 = () => {
  seen2.value = !seen2.value;
};
</script>

<style lang="scss" scoped>
.page {
  .group-box {
    width: 710rpx;
    height: auto;
    margin-top: 20rpx;
    margin-left: 20rpx;
    line-height: 60rpx;
    border: 2rpx solid rgb(210 210 210);
    border-radius: 10rpx;

    .text-title {
      padding-left: 20rpx;
      font-size: 28rpx;
    }

    .text-input {
      padding-left: 20rpx;
      font-size: 32rpx;
    }

    .btn {
      width: 200rpx;
      height: 60rpx;
      margin: 0;
      font-size: 25rpx;
      background-color: rgb(230 230 230);
      border-radius: 5rpx;
    }
  }

  .group-button {
    position: fixed;
    bottom: 40rpx;
    width: 100%;
    height: 100rpx;

    .group-box {
      width: 500rpx;
      font-size: 30rpx;
      background-color: rgb(35 193 158);
    }
  }

  .image {
    width: 35rpx;
    height: 35rpx;
    margin-right: 20rpx;
  }
}
</style>
