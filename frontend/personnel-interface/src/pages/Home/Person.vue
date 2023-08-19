<template>
  <div>
    <form action="#" class="over">
      <div class="left">
        <el-form
          ref="formRef"
          label-width="120px"
          :model="formLabelAlign"
          style="max-width: 500px"
          :rules="rule"
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
                  v-if="formLabelAlign.avatarUrl"
                  :src="VITE_CDN_URL + formLabelAlign.avatarUrl"
                  class="avatar"
                  alt="avatar"
                />
                <el-icon v-else class="avatar-uploader-icon" :size="30">
                  <Plus />
                </el-icon>
              </div>
              <span>
                建议使用招聘者真实头像提升真实性、专业性
                支持jpg、jpeg、gif、png，小于5MB
              </span>
            </div>
          </el-form-item>
          <el-form-item label="姓名" prop="hrName">
            <el-input
              v-model="formLabelAlign.hrName"
              placeholder="请填写你工作中的名字，便于向求职者展示"
            />
          </el-form-item>
          <el-form-item label="职位" prop="postName">
            <el-input
              v-model="formLabelAlign.postName"
              placeholder="请填写当前公司的任职职位"
            />
          </el-form-item>
          <el-form-item label="公司名称" prop="name">
            <el-input
              v-model="company.name"
              placeholder="请填写与营业执照名称/劳动合同/公司发票抬头一致的公司全称"
              @change="checkedCompany"
            />
          </el-form-item>
          <el-form-item
            label="接受简历邮箱"
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
            <el-input
              v-model="formLabelAlign.acceptEmail"
              placeholder="请填写常用邮箱，支持招聘设置中修改"
            />
          </el-form-item>
          <el-button type="primary" @click="confirmPerson(formRef)"
            >下一步</el-button
          >
        </el-form>
      </div>
      <div class="right">
        <div class="top">
          <img
            :src="
              VITE_CDN_URL +
              (formLabelAlign.avatarUrl
                ? formLabelAlign.avatarUrl
                : '/image/heard2.jpg')
            "
            class="avatar"
            alt="avatar"
          />
          <span>{{ formLabelAlign.hrName || "姓名" }}</span>
          <span>{{ formLabelAlign.postName || "职位" }}</span>
        </div>
        <div class="line"></div>
        <div class="bottom">
          <span>{{ company.name || "公司名称" }}</span>
          <span>{{ formLabelAlign.acceptEmail || "邮箱" }}</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import useAvatarUpload from "@/hooks/useAvatarUpload";
import router from "@/router";
import { useMainStore } from "@/stores/main";
import type { Personnel } from "@dongjiang-recruitment/service-common";
import { Plus } from "@element-plus/icons-vue";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
const route = useRoute();
const VITE_CDN_URL = import.meta.env.VITE_CDN_URL;
const formRef = ref<FormInstance>();

const store = useMainStore();
const formLabelAlign = ref<Personnel>({ ...store.hrInformation });
const company = ref({
  name: "",
});
// 将电子邮件地址设置为路由参数的值。
onMounted(() => {
  formLabelAlign.value.acceptEmail = route.params.PersonEmail as string;
});
const alive = ref(true);
// 更改公司名称时将调用的函数。它将检查公司名称是否已在数据库中。如果是，它将获取公司 id 并将其存储在 formLabelAlign.value.companyInformationId 中。
const checkedCompany = (val: string) => {
  return companyService
    .queryCompany({ query: { companyName: ["$eq", val] } })
    .then((res) => {
      if (res.total !== 0) {
        formLabelAlign.value.id = res.items[0].id;
      }
    });
};
//上传头像
const uploadInput = ref<HTMLElement | null>(null);
const dealfilechange = async (e: Event) => {
  const input = e.target as HTMLInputElement;
  let files = input.files;
  if (files) {
    if (useAvatarUpload(files[files.length - 1])) {
      formLabelAlign.value.avatarUrl = await commonService.uploadAvatar({
        avatar: files[files.length - 1],
      });
    }
  }
};
const uploadgogo = () => {
  let oBtn = uploadInput.value as HTMLInputElement;
  oBtn.click();
};
const rule = reactive({
  hrName: [{ required: true, message: "此项不能为空", trigger: "blur" }],
  avatar: [
    {
      required: true,
      message: "请上传头像",
      trigger: "blur",
    },
  ],
  postName: [{ required: true, message: "此项填入职位", trigger: "blur" }],
});

const confirmPerson = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (alive.value) {
        personnelService
          .updatePersonnel({
            id: formLabelAlign.value.id,
            requestBody: formLabelAlign.value,
          })
          .then((res) => {
            store.hrInformation = res;
            // 如果companyInformationId不为null，则获取公司信息并存储在store中。然后它将替换到管理的路线。如果 companyInformationId 为
            // null，它将替换到 Company 的路由。
            if (res.company?.id) {
              companyService
                .getCompany({ id: res.company.id })
                .then((response) => {
                  store.companyInformation = response;
                });

              router.replace({ name: "Manage" });
            } else {
              router.replace({
                name: "Company",
                params: { companyName: company.value.name },
              });
            }
          });
      } else {
        ElMessage.warning("该公司已存在，请重新输入");
      }
    } else {
      ElMessage.error("请填写完整信息");
    }
  });
};
</script>

<style scoped lang="scss">
a {
  display: block;
  width: 150px;
  text-decoration: none;
}

.over {
  display: flex;
  justify-content: space-around;
  margin-top: 40px;

  .left {
    .el-form {
      display: flex;
      flex-direction: column;

      .avatar {
        display: flex;
        flex-wrap: nowrap;

        img {
          width: 75px;
          height: 75px;
          border-radius: 50%;
        }

        .avatar-uploader-icon {
          padding: 20px;
          border: solid 1px #dcdfe6;
          border-radius: 50%;
        }

        span {
          margin-left: 15px;
          font-size: 8px;
          color: #999;
        }
      }

      .el-button {
        width: 150px;
        height: 42px;
        margin-left: 120px;
      }
    }
  }

  .right {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 235px;
    height: 235px;
    margin-right: 250px;
    font-size: 14px;
    background: #fff;
    border: 1px solid #eaedec;
    border-radius: 3px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 7%);

    .top {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img {
        width: 75px;
        height: 75px;
        margin: 20px 0 10px;
        border-radius: 50%;
      }

      :nth-child(3) {
        margin: 5px 0;
        font-size: 10px;
        color: #999;
      }
    }

    .line {
      width: 225px;
      height: 1px;
      margin: 15px 5px;
      background-color: rgb(0 0 0 / 5%);
    }

    .bottom {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      span {
        margin: 2px;
        font-size: 10px;
        color: #999;
      }
    }
  }
}
</style>
