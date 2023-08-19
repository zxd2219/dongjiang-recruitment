<template>
  <NavigationBar title="注册账号" />
  <view class="flex-col items-center page">
    <view class="flex-col group-1">
      <text>注册账号</text>
      <view class="textarea">
        <view class="items-center phone-number">
          <input
            v-model="email"
            style="width: 100%; padding-left: 20rpx"
            type="text"
            placeholder="请输入你的邮箱"
          />
        </view>
        <view class="flex-row justify-between items-center verification">
          <input
            v-model="verification"
            style="width: 60%; padding-left: 20rpx"
            :maxlength="6"
            type="number"
            placeholder="请输入验证码"
          />
          <button
            class="justify-center items-center btn"
            @click="getVerifiable"
          >
            获取验证码
          </button>
        </view>
        <view class="items-center phone-number">
          <input
            v-model="password"
            style="width: 100%; padding-left: 20rpx"
            :type="'password' as any"
            placeholder="请输入密码(6-20位)"
          />
        </view>
      </view>
      <button
        class="justify-center items-center next"
        form-type="submit"
        @click="registeredAccount"
      >
        注册
      </button>
      <view class="flex-row items-center agree">
        <checkbox
          style="transform: scale(0.7)"
          :checked="isAgree"
          @click="isAgree = !isAgree"
        ></checkbox>
        <view
          >同意 <text style="color: rgb(35 193 158)">《东江用户协议》</text>和
          <text style="color: rgb(35 193 158)">《东江登录政策》</text>
        </view>
      </view>
    </view>
    <view class="flex-col group-2">
      <text>客服（投诉）电话：4008 2082 02（工作日9：00-18：00）</text>
      <text>违法和不良信息举报、未成年人投诉举报渠道同上</text>
      <text>客服邮箱：cc@dongjiang 北京市人社局电话：12333</text>
      <text>营业执照|人力资源服务许可证|增值电信业务经营许可证</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import { useMainStore } from "@/stores/main";

const mainStore = useMainStore();

const email = ref<string>("");
const password = ref<string>("");
const verification = ref<string>("");
const isAgree = ref<boolean>(false);

const { refreshAsync: registerAccount } =
  authenticationService.useRegisterAccount(
    () => ({
      requestBody: {
        accountType: 1,
        userName: email.value,
        password: password.value,
        verificationCode: verification.value,
      },
    }),
    {
      manual: true,
      async onSuccess() {
        await loginAccount();
      },
    }
  );
const { refreshAsync: loginAccount } = authenticationService.useLoginAccount(
  () => ({
    requestBody: {
      userName: email.value,
      password: password.value,
    },
  }),
  {
    manual: true,
    onSuccess(data) {
      mainStore.isInit = true;
      mainStore.token = data.token;
      uni.showToast({
        title: "注册成功",
        icon: "none",
        duration: 1500,
      });
      uni.reLaunch({
        url: "/pages/init/wanchengjianli/wanchengjianli",
      });
    },
  }
);

// 用于获取验证码的函数。
const getVerifiable = async () => {
  if (email.value === "") {
    uni.showToast({
      title: "请输入邮箱",
      icon: "none",
      duration: 1500,
    });
  } else if (
    // 用于检查电子邮件是否有效的正则表达式。
    !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email.value)
  ) {
    uni.showToast({
      title: "请输入正确的邮箱",
      icon: "none",
      duration: 1500,
    });
  } else {
    //调用验证码接口
    await commonService.sendVerificationCode({
      email: email.value,
    });
    uni.showToast({
      title: "验证码已发送",
      icon: "none",
      duration: 1500,
    });
  }
};
// 当用户单击注册按钮时调用的函数。
const registeredAccount = async () => {
  if (email.value === "" || password.value === "") {
    uni.showToast({
      title: "邮箱密码不能为空",
      icon: "none",
      duration: 1500,
    });
  } else if (verification.value === "") {
    uni.showToast({
      title: "验证码不能为空",
      icon: "none",
      duration: 1500,
    });
  } else if (isAgree.value === false) {
    uni.showToast({
      title: "请同意协议",
      icon: "none",
      duration: 1500,
    });
  } else if (password.value.length < 6) {
    uni.showToast({
      title: "密码不能小于6位",
      icon: "none",
      duration: 1500,
    });
  } else {
    await registerAccount();
  }
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;

  .heard {
    position: fixed;
    top: 0;
    left: 0;
  }

  .group-1 {
    position: relative;
    top: 200rpx;
    width: 600rpx;
    font-size: 40rpx;

    .textarea {
      height: 240rpx;
      margin-top: 30rpx;
      font-size: 30rpx;
      border-radius: 5rpx;

      .phone-number {
        height: 80rpx;
        border-bottom: 2rpx solid rgb(163 154 154);
      }

      .verification {
        height: 80rpx;
        border-bottom: 2rpx solid rgb(163 154 154);

        .btn {
          width: 40%;
          height: 60rpx;
          margin: 0;
          font-size: 25rpx;
          background-color: rgb(230 230 230);
          border-radius: 5rpx;
        }
      }
    }

    .next {
      width: 600rpx;
      height: 80rpx;
      margin-top: 30rpx;
      font-size: 30rpx;
      color: #fff;
      background-color: rgb(35 193 158);
      border-radius: 10rpx;
    }

    .agree {
      width: 600rpx;
      margin-top: 30rpx;
      font-size: 25rpx;
    }
  }

  .group-2 {
    position: relative;
    top: 800rpx;
    font-size: 20rpx;
    line-height: 40rpx;
    color: rgb(163 154 154);
  }
}
</style>
