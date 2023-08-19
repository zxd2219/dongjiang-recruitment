<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-logo flex justify-center">
          <img :src="LogoImage" alt="" />
        </div>
        <div class="view-account-top-desc">
          <h2>欢迎使用忘记密码</h2>
          <p>请使用您的电子邮箱重置密码</p>
        </div>
      </div>
      <div class="view-account-form">
        <n-form
          ref="formRef"
          label-placement="left"
          size="large"
          :model="formInline"
          :rules="rules"
        >
          <n-form-item path="username">
            <n-input
              v-model:value="formInline.username"
              placeholder="请输入电子邮箱"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <PersonOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="verifyCode">
            <n-input
              v-model:value="formInline.verifyCode"
              placeholder="请输入验证码"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <ShieldCheckmarkOutline />
                </n-icon>
              </template>
            </n-input>
            <n-button class="ml-2" @click="verificationCode">
              <span>获取验证码</span>
            </n-button>
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value="formInline.password"
              type="password"
              show-password-on="click"
              placeholder="请输入新密码"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockClosedOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="confirmPassword">
            <n-input
              v-model:value="formInline.confirmPassword"
              type="password"
              show-password-on="click"
              placeholder="请输入再次输入新密码"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockClosedOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item class="default-color">
            <div class="flex justify-between w-full">
              <div class="flex-initial">
                <a href="javascript:" @click="$router.push({ name: 'Login' })"
                  >前往登录</a
                >
              </div>
            </div>
          </n-form-item>
          <n-form-item>
            <n-button
              type="primary"
              size="large"
              :theme-overrides="{
                textColorPrimary: '#000',
              }"
              :loading="loading"
              block
              @click="handleSubmit"
            >
              重置
            </n-button>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LogoImage from "@/assets/images/logo.png";
import {
  LockClosedOutline,
  PersonOutline,
  ShieldCheckmarkOutline,
} from "@vicons/ionicons5";

const formRef = ref();
const loading = ref(false);

const formInline = reactive({
  username: "",
  verifyCode: "",
  password: "",
  confirmPassword: "",
});

const { refreshAsync: verificationCode } =
  commonService.useSendVerificationCode(
    () => ({
      email: formInline.username,
    }),
    {
      ready: computed(() => !!formInline.username),
      onBefore: () => {
        console.log(111);
      },
      manual: true,
    }
  );

const rules = {
  username: { required: true, message: "请输入用户名", trigger: "blur" },
  verifyCode: { required: true, message: "请输入验证码", trigger: "blur" },
  password: { required: true, message: "请输入密码", trigger: "blur" },
  confirmPassword: {
    required: true,
    message: "请再次输入密码",
    trigger: "blur",
  },
};

const router = useRouter();

const handleSubmit = (e: Event) => {
  e.preventDefault();
  formRef.value.validate(async (errors: any) => {
    if (!errors) {
      const { username, verifyCode, password, confirmPassword } = formInline;
      if (password !== confirmPassword) {
        $message.error("两次输入的密码不一致");
        return;
      }
      loading.value = true;
      try {
        await authenticationService.forgetPassword({
          requestBody: {
            userName: username,
            password,
            verificationCode: verifyCode,
          },
        });
        $message.success("重置密码成功，请重新登录");
        router.replace({ name: "Login" });
      } finally {
        loading.value = false;
      }
    } else {
      $message.error("请填写完整信息，并且进行验证码校验");
    }
  });
};
</script>

<style scoped lang="scss">
.view-account {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;

  &-container {
    flex: 1;
    min-width: 320px;
    max-width: 384px;
    padding: 32px 12px;
    margin: 0 auto;
  }

  &-top {
    padding: 32px 0;
    text-align: center;

    &-desc {
      font-size: 14px;
      color: #808695;
    }
  }

  &-other {
    width: 100%;
  }

  .default-color {
    color: #515a6e;

    .ant-checkbox-wrapper {
      color: #515a6e;
    }
  }
}

@media (min-width: 768px) {
  .view-account {
    background-image: url("@/assets/icons/login.svg");
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100%;
  }

  .page-account-container {
    padding: 32px 0 24px;
  }
}
</style>
