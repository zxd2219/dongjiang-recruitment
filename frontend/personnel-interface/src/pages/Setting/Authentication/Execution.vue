<template>
  <div class="total">
    <!-- <div class="top">
            <span>个人实名信息认证：</span>
            <div class="content">
                <el-form ref="perFormRef" :model="personForm" status-icon label-width="120px" class="demo-ruleForm"
                    style="max-width: 600px">
                    <el-form-item label="姓名:" prop="user">
                        <el-input v-model="personForm.name" type="text" autocomplete="off" placeholder="请填写真实姓名" />
                    </el-form-item>
                    <el-form-item label="身份证号:" prop="pass">
                        <el-input v-model="personForm.hrId" type="password" autocomplete="off" placeholder="请填写身份证号" />
                    </el-form-item>
                </el-form>
                <div class="button">
                    <el-button type="primary" @click="confirmPerson(perFormRef)">{{ "完成认证" }}</el-button>
                </div>
            </div>
        </div> -->
    <div class="bottom">
      <span>企业实名信息认证：</span>
      <div class="content-bottom">
        <el-form
          ref="comFormRef"
          :model="companyForm"
          status-icon
          label-width="120px"
          class="demo-ruleForm"
          style="max-width: 600px"
        >
          <el-form-item label="公司全称:" prop="user">
            <el-input
              v-model="companyForm.fullName"
              type="text"
              autocomplete="off"
              placeholder="请填写公司全称"
            />
          </el-form-item>
          <el-form-item label="法人代表:" prop="pass">
            <el-input
              v-model="companyForm.legalRepresentative"
              type="text"
              autocomplete="off"
              placeholder="请填写法人代表"
            />
          </el-form-item>
          <el-form-item label="注册资本:" prop="user">
            <el-input
              v-model="companyForm.registeredCapital"
              type="text"
              autocomplete="off"
              placeholder="请填写注册资本"
            />
          </el-form-item>
          <el-form-item label="机构类型:" prop="pass">
            <el-input
              v-model="companyForm.organizationType"
              type="text"
              autocomplete="off"
              placeholder="请填写机构类型"
            />
          </el-form-item>
          <el-form-item label="成立时间" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker
                  v-model="companyForm.establishmentTime"
                  type="date"
                  placeholder="选择日期"
                  style="width: 81.5%"
                />
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-form>
        <div class="button">
          <el-button type="primary" @click="confirmCompany(comFormRef)">{{
            "完成认证"
          }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { useMainStore } from "@/stores/main";
import type { Company } from "@dongjiang-recruitment/service-common";
import { ElMessage, type FormInstance } from "element-plus";

const store = useMainStore();

const comFormRef = ref<FormInstance>();

const companyForm = reactive<Company>({
  ...store.companyInformation,
});

const confirmCompany = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      companyService
        .updateCompany({
          id: store.companyInformation.id,
          requestBody: companyForm,
        })
        .then((res) => {
          ElMessage.success("恭喜您，企业认证成功");
          store.companyInformation = res;
          router.replace({ name: "PublishJob" });
        });
    }
  });
};
</script>

<style lang="scss" scoped>
.total {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  // .top {
  //     display: flex;
  //     flex-direction: column;
  //     justify-content: space-around;
  //     margin: 50px 0;
  //     width: 80%;
  //     height: 250px;
  //     border: solid 1px #ccc;

  //     span {
  //         margin: 20px;
  //     }

  //     .content {
  //         display: flex;
  //         justify-content: space-around;

  //         .el-form {
  //             margin-top: -10%;
  //             margin-left: -10%;

  //             .el-form-item {
  //                 margin-top: 40px;
  //                 width: 40vw
  //             }
  //         }

  //         .el-button {
  //             margin-top: 10px;
  //         }
  //     }

  // }

  .bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 80%;
    height: 400px;
    margin: 80px 0;
    border: solid 1px #ccc;

    span {
      margin: 20px;
    }

    .content-bottom {
      display: flex;
      justify-content: space-around;

      .el-form {
        margin-top: -10%;
        margin-left: -10%;

        .el-form-item {
          width: 40vw;
          margin-top: 10px;

          .el-form-item {
            width: 40vw;
            margin-top: -5px;
          }
        }
      }

      .button {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        .el-button {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
