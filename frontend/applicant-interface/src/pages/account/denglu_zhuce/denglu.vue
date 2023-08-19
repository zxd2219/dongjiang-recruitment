<template>
  <view class="flex-col justify-center items-center page">
    <view class="flex-col group-1">
      <text>登录</text>
      <view class="textarea">
        <view class="items-center phone-number">
          <input
            v-model="email"
            class="text-input"
            style="padding-left: 20rpx"
            type="text"
            placeholder="请输入你的邮箱"
          />
        </view>
        <view class="items-center verification">
          <input
            v-model="password"
            class="text-input"
            style="padding-left: 20rpx"
            :type="'password' as any"
            placeholder="请输入密码"
          />
        </view>
      </view>
      <view class="justify-center items-center" @click="login">
        <button class="justify-center items-center next">登录</button>
      </view>
      <view class="flex-row items-center justify-between other-type">
        <text @click="forget">忘记密码？</text>
        <text @click="throttle(register)()">注册账号</text>
      </view>
      <view class="flex-row items-center agree">
        <checkbox
          style="transform: scale(0.7)"
          :checked="isAgree"
          @click="isAgree = !isAgree"
        ></checkbox>
        <view
          >同意
          <navigator
            url="/pages/setting/yonghuxieyi/yonghuxieyi"
            open-type="navigate"
            style="display: inline-block; color: rgb(35 193 158)"
            >《东江用户协议》
          </navigator>
          和
          <navigator
            url="/pages/setting/yinsicelve/yinsicelve"
            open-type="navigate"
            style="display: inline-block; color: rgb(35 193 158)"
            >《东江登录政策》
          </navigator>
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
import { useMainStore } from "@/stores";
import { throttle } from "@/utils";

const mainStore = useMainStore();

const email = ref<string>("");
const password = ref<string>("");
const isAgree = ref<boolean>(false);

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
      mainStore.token = data.token;
    },
  }
);

// 当用户单击登录按钮时调用的函数。
const login = async () => {
  if (email.value === "" || password.value === "") {
    uni.showToast({
      title: "邮箱或密码不能为空",
      icon: "none",
      mask: true,
    });
  } else if (
    !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email.value)
  ) {
    uni.showToast({
      title: "邮箱错误",
      icon: "none",
      mask: true,
    });
  } else if (!isAgree.value) {
    uni.showToast({
      title: "请勾选同意协议",
      icon: "none",
      mask: true,
    });
  } else {
    await loginAccount();
    uni.switchTab({ url: "/pages/main/shouyeyemian/shouyeyemian" });
  }
};

const register = () => {
  uni.navigateTo({ url: "/pages/account/denglu_zhuce/zhucezhanghao" });
};
const forget = () => {
  uni.navigateTo({ url: "/pages/account/denglu_zhuce/wangjimima" });
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: auto;

  .group-1 {
    position: relative;
    top: 400rpx;
    width: 80%;
    font-size: 40rpx;

    .text-input {
      width: 100%;
    }

    .textarea {
      height: 160rpx;
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
          width: 200rpx;
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

    .other-type {
      margin-top: 20rpx;
      font-size: 25rpx;
      color: rgb(35 193 158);
    }

    .agree {
      width: 600rpx;
      margin-top: 30rpx;
      font-size: 25rpx;
    }
  }

  .group-2 {
    position: relative;
    top: 900rpx;
    font-size: 20rpx;
    line-height: 40rpx;
    color: rgb(163 154 154);
  }
}
</style>
