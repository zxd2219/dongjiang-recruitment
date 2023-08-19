<template>
  <div class="password">
    <span>登录账号：{{ store.accountInformation.userName }}</span>
    <div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
            placeholder="8-16位字母，数字，特殊符号组成"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            v-model="ruleForm.checkPass"
            type="password"
            autocomplete="off"
            placeholder="请再次输入密码"
          />
        </el-form-item>
        <el-form-item label="验证码">
          <el-input
            v-model="ruleForm.verificationCode"
            placeholder="输入验证码"
          >
            <template #append>
              <el-button v-if="!btn" @click="postverificationCode">{{
                vcode
              }}</el-button>
              <el-button v-if="btn" @click="message">{{ vcode }}</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateForm(ruleFormRef)"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
const ruleFormRef = ref<FormInstance>();
const store = useMainStore();
const vcode = ref("获取验证码");
const btn = ref(false);
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (ruleForm.checkPass !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};
const message = () => {
  ElMessage.warning("您已经发送过验证码，请等待");
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== ruleForm.password) {
    callback(new Error("两次密码不一致"));
  } else {
    callback();
  }
};
const rules = reactive({
  password: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
});
interface rlueAccount {
  password: string;
  checkPass: string;
  verificationCode: string;
}
const ruleForm = reactive<rlueAccount>({
  password: "",
  checkPass: "",
  verificationCode: "",
});

// 用于获取验证码的函数。
const postverificationCode = () => {
  commonService
    .sendVerificationCode({
      email: store.hrInformation.acceptEmail,
    })
    .then(() => {
      ElMessage.success("发送成功");
    });
  btn.value = true;
  let time = 60;
  const timer = setInterval(() => {
    time--;
    vcode.value = `${time}s`;
    if (time === 0) {
      clearInterval(timer);
      vcode.value = "获取验证码";
      btn.value = false;
    }
  }, 1000);
};
const updateForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      authenticationService
        .changePassword({
          id: store.accountInformation.id,
          requestBody: ruleForm,
        })
        .then((res) => {
          ruleForm.password = "";
          ruleForm.checkPass = "";
          ruleForm.verificationCode = "";
          ElMessage.success("修改成功");
        });
    } else {
      return false;
    }
  });
};
</script>

<style scoped lang="scss">
.password {
  margin: 40px 0;

  .el-form {
    margin: 40px 0;

    .el-form-item {
      margin: 40px 0;

      .el-button {
        width: 100px;
      }
    }
  }
}
</style>
