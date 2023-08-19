<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-logo flex justify-center">
          <img :src="LogoImage" alt="" />
        </div>
        <div class="view-account-top-desc">
          <h2>欢迎注册</h2>
          <p>请使用您的电子邮箱注册</p>
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
          <n-form-item path="password">
            <n-input
              v-model:value="formInline.password"
              type="password"
              showPasswordOn="click"
              placeholder="请输入密码"
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
              showPasswordOn="click"
              placeholder="请再次输入密码"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockClosedOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="captcha">
            <n-input
              v-model:value="formInline.captcha"
              placeholder="请输入验证码"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <FingerPrintOutline />
                </n-icon>
              </template>
            </n-input>
            <n-button
              :loading="VCodeLoading"
              type="primary"
              @click="getVcode"
              :disabled="timer > 0"
            >
              {{ timer === 0 ? "获取验证码" : `${timer}秒后重试` }}
            </n-button>
          </n-form-item>
          <n-form-item class="default-color">
            <div class="flex justify-between w-full">
              <div class="flex-initial">
                <a href="javascript:" @click="$router.push({ name: 'Login' })">
                  已有账号？登录
                </a>
              </div>
            </div>
          </n-form-item>
          <n-form-item>
            <n-button
              type="primary"
              @click="handleSubmit"
              size="large"
              :loading="loading"
              block
            >
              注册
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
  FingerPrintOutline,
  LockClosedOutline,
  PersonOutline,
} from "@vicons/ionicons5";
import type { FormItemRule, FormRules, NForm } from "naive-ui";

const formRef = ref();
const loading = ref(false);

const formInline = reactive({
  username: "",
  password: "",
  confirmPassword: "",
  captcha: "",
});

const rules: FormRules = {
  username: { required: true, message: "请输入用户名", trigger: "blur" },
  password: { required: true, message: "请输入密码", trigger: "blur" },
  confirmPassword: {
    required: true,
    trigger: "blur",
    message: "请再次输入密码",
    validator(rule: FormItemRule, value: string) {
      if (value !== formInline.password) {
        return Promise.reject("两次输入密码不一致");
      }
      return Promise.resolve();
    },
  },
  captcha: { required: true, message: "请输入验证码", trigger: "blur" },
};

const router = useRouter();
const timer = ref(0);
const { resume, pause } = useTimeoutPoll(
  () => {
    timer.value--;
    timer.value === 0 && pause();
  },
  1000,
  { immediate: false }
);

const { loading: VCodeLoading, refreshAsync: sendVCode } =
  commonService.useSendVerificationCode(
    () => ({
      email: formInline.username,
    }),
    {
      manual: true,
    }
  );

const getVcode = async () => {
  if (!formInline.username) {
    $message.error("请输入用户名");
    return;
  }
  await sendVCode();
  $message.success("验证码已发送，请注意查收");
  timer.value = 60;
  resume();
};

const handleSubmit = (e: Event) => {
  e.preventDefault();
  formRef.value.validate(async (errors: any) => {
    if (!errors) {
      const { username, password, captcha } = formInline;
      loading.value = true;
      try {
        await authenticationService.registerAccount({
          requestBody: {
            userName: username,
            password,
            accountType: 3,
            verificationCode: captcha,
          },
        });
        $message.success("注册成功，正在前往登录页面");
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
  height: 100%;
  overflow: auto;

  &-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
