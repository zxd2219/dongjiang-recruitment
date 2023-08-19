<template>
  <NavigationBar class="heard" title="忘记密码" />
  <view class="flex-col items-center page">
    <view class="flex-col group-1">
      <text>忘记密码</text>
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
            v-model="passwordNew"
            style="width: 100%; padding-left: 20rpx"
            type="safe-password"
            placeholder="请输入新密码"
          />
        </view>
        <view class="items-center phone-number">
          <input
            v-model="passwordAffirm"
            style="width: 100%; padding-left: 20rpx"
            type="safe-password"
            placeholder="请确认密码"
          />
        </view>
      </view>
      <button
        class="justify-center items-center next"
        form-type="submit"
        @click="registeredAccount"
      >
        保存
      </button>
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

const email = ref<string>("");
const passwordNew = ref<string>("");
const passwordAffirm = ref<string>("");
const verification = ref<string>("");

const { refreshAsync: sendVerificationCode } =
  commonService.useSendVerificationCode(
    () => ({
      email: email.value,
    }),
    {
      manual: true,
      onSuccess() {
        uni.showToast({
          title: "验证码已发送",
          icon: "none",
          duration: 1500,
        });
      },
    }
  );

const { refreshAsync: forgetPassword } =
  authenticationService.useForgetPassword(
    () => ({
      requestBody: {
        userName: email.value,
        password: passwordNew.value,
        verificationCode: verification.value,
      },
    }),
    {
      manual: true,
      onSuccess() {
        uni.showToast({
          title: "修改成功",
          icon: "none",
          duration: 1500,
        });
        uni.navigateTo({ url: "/pages/account/denglu_zhuce/denglu" });
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
    // 检查电子邮件是否有效的正则表达式。
    !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email.value)
  ) {
    uni.showToast({
      title: "请输入正确的邮箱",
      icon: "none",
      duration: 1500,
    });
  } else {
    await sendVerificationCode();
  }
};

// 用于检查输入信息然后向服务器发送请求的函数。
const registeredAccount = async () => {
  if (
    email.value === "" ||
    passwordNew.value === "" ||
    passwordAffirm.value === ""
  ) {
    uni.showToast({
      title: "手机密码不能为空",
      icon: "none",
      duration: 1500,
    });
  } else if (verification.value === "") {
    uni.showToast({
      title: "验证码不能为空",
      icon: "none",
      duration: 1500,
    });
  } else if (passwordNew.value !== passwordAffirm.value) {
    uni.showToast({
      title: "两次密码不一致",
      icon: "none",
      duration: 1500,
    });
  } else {
    // 忘记密码调用接口
    await forgetPassword();
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
      height: auto;
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
