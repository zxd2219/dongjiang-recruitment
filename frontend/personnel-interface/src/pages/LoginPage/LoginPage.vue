<template>
  <div class="page">
    <div class="image-wrapper">
      <img
        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/62345e1d5a7e3f0310ddcb3c/623446ec62a7d9001102351f/16484562558205956397.png"
        class="image"
        alt=""
      />
    </div>
    <div class="alin">
      <div class="center">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input
              v-model="ruleForm.userName"
              type="text"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model.trim="ruleForm.password"
              type="password"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
        <router-link to="/enroll">还没有账号？点击注册</router-link>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import { useMainStore, useMessageStore } from "@/stores/main";
import {
  Company,
  request,
  type Personnel,
} from "@dongjiang-recruitment/service-common";
import { ElMessage, type FormInstance } from "element-plus";

const mainStore = useMainStore();
const messageStore = useMessageStore();
const ruleFormRef = ref<FormInstance>();
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else if (value.length < 6) {
    callback(new Error("密码长度不小于6位"));
  } else if (value.length > 16) {
    callback(new Error("密码长度不大于20位"));
  } else {
    if (ruleForm.userName !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入用户名"));
  } else if (
    !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
  ) {
    callback(new Error("错误的用户名"));
  } else {
    callback();
  }
};
const ruleForm = reactive({
  userName: "",
  verificationCode: "",
  password: "",
});
const rules = reactive({
  password: [{ validator: validatePass, trigger: "blur" }],
  userName: [{ validator: validatePass2, trigger: "blur" }],
});
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      authenticationService
        .loginAccount({
          requestBody: {
            ...ruleForm,
          },
        })
        .then((res) => {
          mainStore.jsonWebToken = res.token;
          mainStore.accountInformation = res.account;
          if (!res.account.detailId.personnel) {
            ElMessage.error("您的账号不是HR账号");
            ruleForm.userName = "";
            ruleForm.password = "";
          } else {
            request.config.TOKEN = res.token;
            personnelService
              .getPersonnel({
                id: mainStore.accountInformation.detailId.personnel!,
              })
              .then((res: Personnel) => {
                if (res.hrName !== null) {
                  if (res.company?.id) {
                    companyService
                      .getCompany({ id: res.company.id })
                      .then((res) => {
                        mainStore.companyInformation = res;
                        router.replace("/Manage");
                      });
                    mainStore.hrInformation = res;
                  } else {
                    mainStore.hrInformation = res;
                    mainStore.companyInformation = null as unknown as Company;
                    router.replace("/Home/Company");
                  }
                } else {
                  mainStore.hrInformation = null as unknown as Personnel;
                  mainStore.hrInformation = res;
                  mainStore.companyInformation = null as unknown as Company;
                  router.replace({
                    path: "/Home/Person",
                    params: { PersonEmail: ruleForm.userName },
                  });
                }
              });
          }
        });
    } else {
      ElMessage.warning("校验不通过!");
      return false;
    }
  });
};
</script>
<style scoped lang="scss">
a {
  color: rgb(0 179 139);
  text-decoration: none;
}

.page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: rgb(255 255 255);

  .image-wrapper {
    display: flex;
    height: 20%;
    padding: 60px 70px 61px;
    background-color: rgb(0 179 139);

    .image {
      width: 80px;
      height: 80px;
      margin-left: 20vw;
      border-radius: 5px;
    }
  }

  .alin {
    display: flex;

    // margin: auto;
    justify-content: center;

    // z-index: 1;
    margin-top: -10vh;

    .center {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 500px;
      height: 240px;
      background-color: rgb(255 255 255);
      border: solid 1px rgb(155 160 158 / 50%);
      border-radius: 5px;

      .el-form {
        margin-right: 18%;
      }
    }
  }

  .footer {
    height: 500px;
  }
}
</style>
