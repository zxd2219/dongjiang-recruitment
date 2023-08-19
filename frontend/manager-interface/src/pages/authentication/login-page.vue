<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-logo flex justify-center">
          <img :src="LogoImage" alt="" />
        </div>
        <div class="view-account-top-desc">
          <h2>欢迎登录</h2>
          <p>请使用您的电子邮箱登录</p>
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
          <n-form-item class="default-color">
            <div class="flex justify-between w-full">
              <div class="flex-initial">
                <a href="javascript:" @click="$router.push({ name: 'Forget' })"
                  >忘记密码?</a
                >
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
              登录
            </n-button>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LogoImage from "@/assets/images/logo.png";
import { useMainStore } from "@/stores";
import { LockClosedOutline, PersonOutline } from "@vicons/ionicons5";
import type { NForm } from "naive-ui";

const formRef = ref();
const loading = ref(false);

const formInline = reactive({
  username: "",
  password: "",
});

const rules = {
  username: { required: true, message: "请输入用户名", trigger: "blur" },
  password: { required: true, message: "请输入密码", trigger: "blur" },
};

const mainStore = useMainStore();
const router = useRouter();

const handleSubmit = (e: Event) => {
  e.preventDefault();
  formRef.value.validate(async (errors: any) => {
    if (!errors) {
      const { username, password } = formInline;
      loading.value = true;
      try {
        const { token } = await authenticationService.loginAccount({
          requestBody: {
            userName: username,
            password,
          },
        });
        mainStore.token = token;
        $message.success("登录成功，即将进入系统");
        router.replace("/");
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
