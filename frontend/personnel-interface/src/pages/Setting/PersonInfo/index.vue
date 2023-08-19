<template>
  <div class="person-info">
    <div class="top">
      <el-form
        ref="ruleFormRef"
        :model="formHr"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        style="max-width: 500px"
      >
        <el-form-item label="头像">
          <div class="avatar">
            <div @click="uploadgogo">
              <input
                ref="uploadInput"
                type="file"
                style="display: none"
                name="icon"
                @change="dealfilechange"
              />
              <img
                v-if="formHr.avatarUrl"
                :src="VITE_CDN_URL + formHr.avatarUrl"
                class="avatar"
                alt=""
              />
              <el-icon v-else class="avatar-uploader-icon" :size="30">
                <Plus />
              </el-icon>

              <span>
                建议使用招聘者真实头像提升真实性、专业性
                支持jpg、jpeg、gif、png，小于5MB
              </span>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="姓名" prop="hrName">
          <el-input
            v-model="formHr.hrName"
            placeholder="请填写你工作中的名字，便于向求职者展示"
          />
        </el-form-item>
        <el-form-item label="职位" prop="postName">
          <el-input v-model="formHr.postName" placeholder="请填写职位信息" />
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="acceptEmail"
          :rules="[
            {
              required: true,
              message: '此项不能为空',
              trigger: 'blur',
            },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-input v-model="formHr.acceptEmail" placeholder="请填写常用邮箱" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateHrinfo(ruleFormRef)"
            >修改信息</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="bottom">
      <div class="line"></div>
      <div class="password">
        <span @click="Topassword"> 修改密码>></span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useAvatarUpload from "@/hooks/useAvatarUpload";
import router from "@/router/index";
import { useMainStore } from "@/stores/main";
import type { Personnel } from "@dongjiang-recruitment/service-common";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage, type FormInstance } from "element-plus";
const VITE_CDN_URL = import.meta.env.VITE_CDN_URL;
const store = useMainStore();

const ruleFormRef = ref<FormInstance>();
const formHr = reactive<Personnel>({ ...store.hrInformation });
//上传头像
const uploadInput = ref<HTMLElement | null>(null);
const dealfilechange = async (e: Event) => {
  const input = e.target as HTMLInputElement;
  let files = input.files;
  if (files) {
    if (useAvatarUpload(files[files.length - 1])) {
      formHr.avatarUrl = await commonService.uploadAvatar({
        avatar: files[files.length - 1],
      });
    }
  }
};
const uploadgogo = () => {
  let oBtn = uploadInput.value as HTMLInputElement;
  oBtn.click();
};
const rules = reactive({
  hrName: [
    {
      required: true,
      message: "此项不能为空",
      trigger: "blur",
    },
  ],
  phoneNumber: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/,
      message: "请输入合法手机号/电话号",
      trigger: "blur",
    },
  ],
  postName: [
    {
      required: true,
      message: "请输入职位",
      trigger: "blur",
    },
  ],
  fullName: [
    {
      required: true,
      message: "请输入公司名称",
      trigger: "blur",
    },
  ],
});

const Topassword = () => {
  router.push("/Setting/Other");
};

const updateHrinfo = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      personnelService
        .updatePersonnel({
          id: store.accountInformation.detailId.personnel!,
          requestBody: formHr,
        })
        .then((res) => {
          store.hrInformation = res;
          ElMessage.success("修改成功");
        });
    }
  });
};
</script>

<style scoped lang="scss">
$pas-height: 4.9vh;
$info-width: 75vw;
$info-height: 85vh;

.person-info {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 75vw;
  min-height: $info-height;
  margin: 60px 30px;
  border: solid 1px #ccc;

  .top {
    width: $info-width;
    height: 700px;
    background-color: #fff;

    // height: $info-height - $pas-height;

    .el-form {
      display: flex;
      flex-direction: column;
      margin-top: 40px;

      .el-form-item {
        margin-top: 15px;

        .avatar {
          display: flex;
          flex-wrap: nowrap;

          img {
            width: 75px;
            height: 75px;
            border-radius: 0;
          }

          .avatar-uploader-icon {
            height: 40px;
            padding: 20px;
            border: solid 1px #dcdfe6;
            border-radius: 5px;
          }

          & > span {
            margin-left: 15px;
            font-size: 8px;
            color: #999;
          }
        }
      }
    }
  }

  .bottom {
    .line {
      width: $info-width;
      height: 1px;
      background-color: rgb(204 204 204 / 100%);
    }

    .password {
      width: $info-width;
      height: 50px;
      line-height: 50px;
      color: rgb(0 0 0);
      text-align: left;
      cursor: pointer;

      span {
        margin-left: 30px;

        &:hover {
          color: rgb(0 179 139);
        }
      }
    }
  }
}
</style>
